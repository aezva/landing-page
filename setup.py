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
        "openai",
        "pydantic",
        "python-multipart",
    ],
    python_requires=">=3.8",
) 