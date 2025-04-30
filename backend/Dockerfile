FROM python:3.11-slim

WORKDIR /app

# Copiar solo los archivos necesarios para la instalación de dependencias
COPY pyproject.toml poetry.lock ./

# Instalar poetry y configurarlo
RUN pip install poetry && \
    poetry config virtualenvs.create false

# Instalar dependencias
RUN poetry install --no-interaction --no-ansi

# Copiar el resto del código
COPY . .

# Exponer el puerto
EXPOSE 8000

# Comando para ejecutar la aplicación
CMD ["poetry", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"] 