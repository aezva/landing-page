from setuptools import setup, find_packages

setup(
    name="nnia-backend",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "fastapi",
        "uvicorn",
        "python-dotenv",
        "supabase",
        "python-jose[cryptography]",
        "passlib[bcrypt]",
        "python-multipart",
        "httpx",
        "pydantic",
        "openai",
        "langchain",
        "langchain-openai",
        "langchain-community",
        "langchain-core"
    ],
    python_requires=">=3.8",
) 