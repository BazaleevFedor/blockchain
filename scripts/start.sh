#!/bin/bash

# Запуск фронтенда
echo "🚀 Запуск Frontend (Next.js)..."
(cd ../frontend && npm run dev) &

# Запуск AI-verifier
echo "🤖 Запуск AI-verifier (FastAPI)..."
source ../ai-verifier/.venv/bin/activate
uvicorn main:app --reload --port 8000
