Write-Host "🚀 Запуск Frontend (Next.js)..."
Start-Process powershell -ArgumentList "cd ../frontend; npm run dev"

Write-Host "🤖 Запуск AI-verifier (FastAPI)..."
cd ../ai-verifier
.venv\Scripts\Activate.ps1
uvicorn main:app --reload --port 8000
