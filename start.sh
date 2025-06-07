#!/bin/bash

# Запуск фронтенда
echo "🚀 Запуск Frontend (Next.js)..."
(cd ./frontend && npm run dev) &

# Запуск бека
echo "🤖 Запуск Backend (Node.js)..."
(cd ./backend && npm start) &
