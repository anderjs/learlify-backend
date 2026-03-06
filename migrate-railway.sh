#!/bin/bash
set -e

echo "🚀 Ejecutando migraciones en Railway..."
echo ""

# Verificar que Railway CLI esté instalado
if ! command -v railway &> /dev/null; then
    echo "❌ Error: Railway CLI no está instalado"
    echo "📦 Instala con: brew install railway"
    exit 1
fi

# Verificar que el usuario esté autenticado
if ! railway whoami &> /dev/null; then
    echo "❌ Error: No estás autenticado en Railway"
    echo "🔐 Ejecuta: railway login"
    exit 1
fi

# Verificar que el proyecto esté vinculado
if [ ! -f ".railway/railway.json" ]; then
    echo "❌ Error: Este proyecto no está vinculado a Railway"
    echo "🔗 Ejecuta: railway link"
    exit 1
fi

echo "✅ Railway CLI configurado correctamente"
echo "📊 Proyecto vinculado"
echo ""
echo "🔄 Ejecutando migraciones..."
echo ""

# Ejecutar migraciones en Railway
railway run npm run migrate

echo ""
echo "✅ Migraciones completadas exitosamente"
