# backend/supabase_client.py

from supabase import create_client, Client
import os

# Cargar las variables de entorno
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Crear el cliente de Supabase
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Función ejemplo para obtener datos de una tabla
def fetch_data():
    response = supabase.table('your_table_name').select('*').execute()
    return response.data
