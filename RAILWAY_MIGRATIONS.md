# Migraciones en Railway

Este script te permite ejecutar migraciones de base de datos en Railway desde tu máquina local.

## 📋 Requisitos Previos

1. **Railway CLI instalado**:
   ```bash
   brew install railway
   ```

2. **Autenticado en Railway**:
   ```bash
   railway login
   ```

3. **Proyecto vinculado**:
   ```bash
   railway link
   ```
   Selecciona tu proyecto de la lista.

## 🚀 Uso

### Opción 1: Usando npm script (Recomendado)
```bash
npm run migrate:railway
```

### Opción 2: Ejecutando el script directamente
```bash
./migrate-railway.sh
```

## 🔍 ¿Qué hace el script?

1. ✅ Verifica que Railway CLI esté instalado
2. ✅ Verifica que estés autenticado
3. ✅ Verifica que el proyecto esté vinculado
4. 🔄 Ejecuta `npm run migrate` en el entorno de Railway
5. ✅ Muestra confirmación de éxito

## 📝 Notas Importantes

- Las migraciones se ejecutan usando las variables de entorno configuradas en Railway
- El script usa `railway run` que ejecuta el comando en el contexto del servicio desplegado
- Asegúrate de que tu servicio en Railway esté desplegado antes de ejecutar migraciones
- Las variables de entorno de base de datos (DB_HOST, DB_PORT, etc.) deben estar configuradas en Railway

## 🐛 Troubleshooting

### Error: Railway CLI no está instalado
```bash
brew install railway
```

### Error: No estás autenticado
```bash
railway login
```

### Error: Proyecto no vinculado
```bash
railway link
```
Selecciona tu proyecto de la lista.

### Error: Cannot find module
Asegúrate de que:
- El deployment en Railway haya completado exitosamente
- Los archivos de migraciones estén incluidos en el contenedor (verificar Dockerfile)
- ts-node esté instalado como dependencia de producción

## 🔗 Comandos Relacionados

- **Ver logs de Railway**: `railway logs`
- **Abrir shell en Railway**: `railway shell`
- **Ver variables de entorno**: `railway variables`
- **Desvincular proyecto**: `railway unlink`
