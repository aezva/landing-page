import os
from dotenv import load_dotenv
from openai import OpenAI
import time
from typing import Dict, Any, Optional, List
import PyPDF2
import docx
import pandas as pd
from supabase import create_client, Client
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

load_dotenv()

router = APIRouter()

class DocumentProcessRequest(BaseModel):
    file_path: str
    user_id: str
    thread_id: Optional[str] = None

class BusinessRecommendationsRequest(BaseModel):
    user_id: str

@router.post("/process-document")
async def process_document(request: DocumentProcessRequest):
    try:
        assistant = AssistantAPI()
        result = assistant.process_document(request.file_path, request.user_id, request.thread_id)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/recommendations")
async def get_recommendations(request: BusinessRecommendationsRequest):
    try:
        assistant = AssistantAPI()
        result = assistant.get_business_recommendations(request.user_id)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class AssistantAPI:
    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY")
        self.assistant_id = os.getenv("OPENAI_ASSISTANT_ID")
        self.supabase_url = os.getenv("SUPABASE_URL")
        self.supabase_key = os.getenv("SUPABASE_KEY")

        if not self.api_key or not self.assistant_id:
            raise ValueError("OPENAI_API_KEY o OPENAI_ASSISTANT_ID no están configuradas en el .env")
        if not self.supabase_url or not self.supabase_key:
            raise ValueError("SUPABASE_URL o SUPABASE_KEY no están configuradas en el .env")

        self.client = OpenAI(api_key=self.api_key)
        self.supabase: Client = create_client(self.supabase_url, self.supabase_key)

    def extract_text_from_file(self, file_path: str) -> str:
        """Extrae texto de diferentes tipos de archivos."""
        file_extension = os.path.splitext(file_path)[1].lower()
        
        try:
            if file_extension == '.pdf':
                with open(file_path, 'rb') as file:
                    reader = PyPDF2.PdfReader(file)
                    text = ""
                    for page in reader.pages:
                        text += page.extract_text()
                return text
            
            elif file_extension == '.docx':
                doc = docx.Document(file_path)
                return "\n".join([paragraph.text for paragraph in doc.paragraphs])
            
            elif file_extension in ['.xlsx', '.xls']:
                df = pd.read_excel(file_path)
                return df.to_string()
            
            elif file_extension == '.txt':
                with open(file_path, 'r', encoding='utf-8') as file:
                    return file.read()
            
            else:
                raise ValueError(f"Tipo de archivo no soportado: {file_extension}")
                
        except Exception as e:
            raise Exception(f"Error extrayendo texto del archivo: {str(e)}")

    def process_document(self, file_path: str, user_id: str, thread_id: Optional[str] = None) -> Dict[str, Any]:
        """Procesa un documento y lo analiza con la IA."""
        try:
            # Extraer texto del documento
            document_text = self.extract_text_from_file(file_path)
            
            # Crear o usar thread existente
            if not thread_id:
                thread = self.client.beta.threads.create()
                thread_id = thread.id
            
            # Crear un archivo temporal con el texto extraído
            temp_file_path = f"temp_{os.path.basename(file_path)}.txt"
            with open(temp_file_path, 'w', encoding='utf-8') as temp_file:
                temp_file.write(document_text)
            
            # Subir el archivo a OpenAI
            with open(temp_file_path, 'rb') as file:
                uploaded_file = self.client.files.create(
                    file=file,
                    purpose="assistants"
                )
            
            # Eliminar archivo temporal
            os.remove(temp_file_path)
            
            # Añadir el archivo al thread
            self.client.beta.threads.messages.create(
                thread_id=thread_id,
                role="user",
                content="Por favor analiza este documento y proporciona un resumen detallado.",
                file_ids=[uploaded_file.id]
            )
            
            # Procesar con el assistant
            run = self.client.beta.threads.runs.create(
                thread_id=thread_id,
                assistant_id=self.assistant_id
            )
            
            # Esperar a que el run se complete
            while True:
                run_status = self.client.beta.threads.runs.retrieve(
                    thread_id=thread_id,
                    run_id=run.id
                )

                if run_status.status == "completed":
                    break
                elif run_status.status == "failed":
                    return {
                        "status": "error",
                        "message": "La ejecución del assistant falló.",
                        "thread_id": thread_id
                    }

                time.sleep(1)
            
            # Obtener los mensajes del thread
            messages = self.client.beta.threads.messages.list(thread_id=thread_id)
            
            # Obtener el último mensaje del assistant
            last_message = next(
                (msg for msg in messages.data if msg.role == "assistant"),
                None
            )
            
            if last_message:
                analysis = last_message.content[0].text.value
                
                # Guardar el análisis en Supabase
                self.save_document_analysis(user_id, file_path, analysis)
                
                return {
                    "status": "success",
                    "message": analysis,
                    "thread_id": thread_id
                }
            else:
                return {
                    "status": "error",
                    "message": "No se encontró una respuesta del asistente.",
                    "thread_id": thread_id
                }
            
        except Exception as e:
            return {
                "status": "error",
                "message": f"Error procesando documento: {str(e)}",
                "thread_id": thread_id
            }

    def save_document_analysis(self, user_id: str, file_path: str, analysis: str) -> None:
        """Guarda el análisis del documento en Supabase."""
        try:
            file_name = os.path.basename(file_path)
            
            # Insertar en la tabla de análisis de documentos
            self.supabase.table('document_analyses').insert({
                'user_id': user_id,
                'file_name': file_name,
                'analysis': analysis,
                'status': 'completed'
            }).execute()
            
        except Exception as e:
            print(f"Error guardando análisis en Supabase: {str(e)}")

    def ask_nnia(self, user_message: str, thread_id: str = None):
        try:
            # Crear un thread nuevo si no hay uno
            if not thread_id:
                thread = self.client.beta.threads.create()
                thread_id = thread.id

            # Añadir el mensaje al thread
            self.client.beta.threads.messages.create(
                thread_id=thread_id,
                role="user",
                content=user_message
            )

            # Lanzar el "run" del assistant
            run = self.client.beta.threads.runs.create(
                thread_id=thread_id,
                assistant_id=self.assistant_id
            )

            # Esperar a que el run se complete
            while True:
                run_status = self.client.beta.threads.runs.retrieve(
                    thread_id=thread_id,
                    run_id=run.id
                )

                if run_status.status == "completed":
                    break
                elif run_status.status == "failed":
                    return {
                        "status": "error",
                        "message": "La ejecución del assistant falló.",
                        "thread_id": thread_id
                    }

                time.sleep(1)

            # Obtener los mensajes del thread
            messages = self.client.beta.threads.messages.list(thread_id=thread_id)

            # Obtener el último mensaje del assistant
            last_message = next(
                (msg for msg in messages.data if msg.role == "assistant"),
                None
            )

            if last_message:
                return {
                    "status": "success",
                    "message": last_message.content[0].text.value,
                    "thread_id": thread_id
                }
            else:
                return {
                    "status": "error",
                    "message": "No se encontró una respuesta del asistente.",
                    "thread_id": thread_id
                }

        except Exception as e:
            return {
                "status": "error",
                "message": f"Ocurrió un error: {str(e)}",
                "thread_id": thread_id
            }

    def get_business_context(self, user_id: str) -> Dict[str, Any]:
        """Obtiene el contexto del negocio del usuario."""
        try:
            response = self.supabase.table('business_data').select('*').eq('user_id', user_id).single().execute()
            if response.data:
                return response.data
            return {}
        except Exception as e:
            print(f"Error obteniendo contexto del negocio: {str(e)}")
            return {}

    def generate_business_insights(self, business_data: Dict[str, Any]) -> Dict[str, Any]:
        """Genera insights basados en los datos del negocio."""
        try:
            prompt = f"""
            Analiza los siguientes datos del negocio y proporciona insights relevantes:
            
            Nombre del Negocio: {business_data.get('business_name', 'No disponible')}
            Industria: {business_data.get('industry', 'No disponible')}
            Descripción: {business_data.get('business_description', 'No disponible')}
            Productos Principales: {business_data.get('main_products', 'No disponible')}
            
            Por favor proporciona:
            1. Análisis de mercado y competencia
            2. Oportunidades de crecimiento
            3. Recomendaciones específicas
            4. Acciones sugeridas
            """

            response = self.client.chat.completions.create(
                model="gpt-4-turbo-preview",
                messages=[
                    {"role": "system", "content": "Eres un experto en análisis de negocios y estrategia."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=1000
            )

            return {
                "status": "success",
                "insights": response.choices[0].message.content
            }
        except Exception as e:
            return {
                "status": "error",
                "message": f"Error generando insights: {str(e)}"
            }

    def analyze_document_with_context(self, file_path: str, user_id: str, thread_id: Optional[str] = None) -> Dict[str, Any]:
        """Analiza un documento considerando el contexto del negocio."""
        try:
            # Obtener contexto del negocio
            business_data = self.get_business_context(user_id)
            
            # Extraer texto del documento
            document_text = self.extract_text_from_file(file_path)
            
            # Crear prompt contextualizado
            context_prompt = f"""
            Contexto del Negocio:
            - Nombre: {business_data.get('business_name', 'No disponible')}
            - Industria: {business_data.get('industry', 'No disponible')}
            - Descripción: {business_data.get('business_description', 'No disponible')}
            
            Documento a analizar:
            {document_text}
            
            Por favor analiza este documento considerando el contexto del negocio y proporciona:
            1. Resumen ejecutivo
            2. Puntos clave relevantes para el negocio
            3. Recomendaciones específicas
            4. Acciones sugeridas
            """

            # Crear o usar thread existente
            if not thread_id:
                thread = self.client.beta.threads.create()
                thread_id = thread.id

            # Añadir el mensaje al thread
            self.client.beta.threads.messages.create(
                thread_id=thread_id,
                role="user",
                content=context_prompt
            )

            # Procesar con el assistant
            run = self.client.beta.threads.runs.create(
                thread_id=thread_id,
                assistant_id=self.assistant_id
            )

            # Esperar a que el run se complete
            while True:
                run_status = self.client.beta.threads.runs.retrieve(
                    thread_id=thread_id,
                    run_id=run.id
                )

                if run_status.status == "completed":
                    break
                elif run_status.status == "failed":
                    return {
                        "status": "error",
                        "message": "La ejecución del assistant falló.",
                        "thread_id": thread_id
                    }

                time.sleep(1)

            # Obtener los mensajes del thread
            messages = self.client.beta.threads.messages.list(thread_id=thread_id)

            # Obtener el último mensaje del assistant
            last_message = next(
                (msg for msg in messages.data if msg.role == "assistant"),
                None
            )

            if last_message:
                analysis = last_message.content[0].text.value
                
                # Guardar el análisis en Supabase
                self.save_document_analysis(user_id, file_path, analysis)
                
                return {
                    "status": "success",
                    "message": analysis,
                    "thread_id": thread_id
                }
            else:
                return {
                    "status": "error",
                    "message": "No se encontró una respuesta del asistente.",
                    "thread_id": thread_id
                }

        except Exception as e:
            return {
                "status": "error",
                "message": f"Error analizando documento: {str(e)}",
                "thread_id": thread_id
            }

    def get_business_recommendations(self, user_id: str) -> Dict[str, Any]:
        """Obtiene recomendaciones personalizadas para el negocio."""
        try:
            # Obtener datos del negocio
            business_data = self.get_business_context(user_id)
            
            # Obtener análisis de documentos recientes
            recent_analyses = self.supabase.table('document_analyses')\
                .select('*')\
                .eq('user_id', user_id)\
                .order('created_at', desc=True)\
                .limit(5)\
                .execute()
            
            # Crear prompt para recomendaciones
            prompt = f"""
            Basado en los siguientes datos del negocio y análisis recientes, proporciona recomendaciones personalizadas:
            
            Datos del Negocio:
            - Nombre: {business_data.get('business_name', 'No disponible')}
            - Industria: {business_data.get('industry', 'No disponible')}
            - Descripción: {business_data.get('business_description', 'No disponible')}
            - Productos: {business_data.get('main_products', 'No disponible')}
            
            Análisis Recientes:
            {[analysis.get('analysis', '') for analysis in recent_analyses.data]}
            
            Por favor proporciona:
            1. Recomendaciones estratégicas
            2. Oportunidades identificadas
            3. Acciones prioritarias
            4. Métricas de seguimiento
            """

            response = self.client.chat.completions.create(
                model="gpt-4-turbo-preview",
                messages=[
                    {"role": "system", "content": "Eres un experto en estrategia de negocios y consultoría."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=1000
            )

            return {
                "status": "success",
                "recommendations": response.choices[0].message.content
            }
        except Exception as e:
            return {
                "status": "error",
                "message": f"Error generando recomendaciones: {str(e)}"
            }
