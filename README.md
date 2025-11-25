# Botica AMY API (Laravel 11)

API RESTful para gestión de farmacia, desarrollada en Laravel 11 (API mode) con autenticación por tokens usando Sanctum.

## Requisitos
- PHP >= 8.2
- Composer
- MySQL
- Node.js (opcional, solo si usas frontend con Vite)

## Instalación
1. Clona el repositorio y entra al directorio:
   ```bash
   git clone <repo-url>
   cd botica-amy-api
   ```
2. Instala dependencias:
   ```bash
   composer install
   ```
3. Copia el archivo de entorno y configura tu base de datos:
   ```bash
   cp .env.example .env
   # Edita .env y configura DB_DATABASE, DB_USERNAME, DB_PASSWORD
   ```
4. Genera la clave de la app:
   ```bash
   php artisan key:generate
   ```
5. Ejecuta migraciones y seeders:
   ```bash
   php artisan migrate:fresh --seed
   ```
6. (Opcional) Instala Sanctum:
   ```bash
   php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
   ```

## Autenticación
- **Login:** `POST /api/login` (campos: `nombre_usuario`, `password`)
- **Logout:** `POST /api/logout` (requiere token)
- Todas las rutas CRUD requieren autenticación por token (Bearer Token en el header `Authorization`).

## Roles
- Solo los usuarios con rol `admin` pueden acceder a los endpoints de usuarios.
- Los demás recursos pueden ser accedidos por usuarios autenticados.

## Endpoints principales

| Recurso         | Endpoint                        | Métodos         |
|-----------------|----------------------------------|-----------------|
| Usuarios        | /api/usuarios                   | GET, POST, PUT, DELETE |
| Clientes        | /api/clientes                   | GET, POST, PUT, DELETE |
| Productos       | /api/productos                  | GET, POST, PUT, DELETE |
| Servicios       | /api/servicios                  | GET, POST, PUT, DELETE |
| Ventas          | /api/ventas                     | GET, POST, SHOW, DELETE |
| Movimientos     | /api/movimientos-stock          | GET, POST, SHOW, DELETE |
| Categorías      | /api/categorias-producto        | GET, POST, PUT, DELETE |
| Reporte ventas  | /api/reporte/ventas             | GET (con fechas) |
| Stock bajo      | /api/productos/stock-bajo       | GET (umbral)    |

### Ejemplo de login
```bash
curl -X POST http://localhost:8000/api/login \
   -H "Content-Type: application/json" \
   -d '{"nombre_usuario": "<TU_USUARIO>", "password": "<TU_CONTRASEÑA>"}'
```
Respuesta:
```json
{
  "status": true,
  "message": "Login exitoso",
  "data": {
    "usuario": { ... },
    "token": "..."
  }
}
```

### Ejemplo de uso de token
Agrega el header:
```
Authorization: Bearer <token>
```

### Ejemplo de reporte de ventas
```bash
curl -X GET "http://localhost:8000/api/reporte/ventas?fecha_inicio=2024-06-01&fecha_fin=2024-06-10" \
  -H "Authorization: Bearer <token>"
```

### Ejemplo de productos con stock bajo
```bash
curl -X GET "http://localhost:8000/api/productos/stock-bajo?umbral=5" \
  -H "Authorization: Bearer <token>"
```

## CORS
Si tu frontend está en otro dominio/puerto, asegúrate de que el archivo `config/cors.php` permita el origen de tu frontend (por defecto, Laravel permite todos los orígenes en desarrollo).

## Notas para el frontend
- Todas las respuestas son JSON con los campos: `status`, `message`, `data`.
- Usa el token devuelto en login para autenticar todas las peticiones protegidas.
- Si necesitas endpoints adicionales, puedes solicitarlos.

---

¿Listo para el frontend? ¡Avísame qué necesitas y te ayudo a integrarlo! 