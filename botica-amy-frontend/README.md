# 🏥 Botica AMY - Frontend React

Sistema de gestión para farmacia con interfaz moderna y funcionalidades avanzadas.

## ✨ Características Principales

### 🔐 Autenticación y Autorización
- **Login/Logout** con tokens JWT
- **Roles de usuario**: Admin y Vendedor
- **Rutas protegidas** con acceso basado en roles
- **Persistencia de sesión** con localStorage

### 📊 Dashboard Interactivo
- **Widgets informativos** con estadísticas en tiempo real
- **Gráficos de ventas** y métricas de negocio
- **Alertas de stock bajo** para productos
- **Resumen de actividades** recientes

### 🔍 Búsqueda y Filtros Avanzados
- **Búsqueda en tiempo real** en todas las listas
- **Filtros por categorías** (stock, estado, etc.)
- **Paginación inteligente** para grandes volúmenes de datos
- **Ordenamiento** por diferentes criterios

### 📄 Exportación de Datos
- **Exportar a CSV** para análisis en Excel
- **Exportar a PDF** con formato profesional
- **Reportes personalizados** por fecha y filtros
- **Descarga automática** de archivos

### 🎨 Interfaz Moderna
- **Tema claro/oscuro** con persistencia
- **Diseño responsivo** para móviles y tablets
- **Animaciones suaves** y transiciones
- **Iconos intuitivos** y navegación clara

### 🔔 Notificaciones
- **Toast notifications** para feedback inmediato
- **Mensajes de éxito/error** en todas las acciones
- **Alertas automáticas** para eventos importantes

## 🚀 Funcionalidades por Módulo

### 💊 Gestión de Productos
- ✅ Lista con búsqueda y filtros
- ✅ Formulario de creación/edición
- ✅ Control de stock en tiempo real
- ✅ Exportación a CSV/PDF
- ✅ Alertas de stock bajo

### 👥 Gestión de Clientes
- ✅ Registro y actualización de datos
- ✅ Búsqueda por nombre o email
- ✅ Historial de compras
- ✅ Exportación de datos

### 🛒 Gestión de Ventas
- ✅ Registro de ventas con múltiples productos
- ✅ Cálculo automático de totales
- ✅ Detalles completos de venta
- ✅ Estados de venta (completada, pendiente, cancelada)
- ✅ Reportes de ventas

### 🔧 Gestión de Servicios
- ✅ Catálogo de servicios
- ✅ Precios y descripciones
- ✅ Gestión de disponibilidad

### 📈 Reportes y Analytics
- ✅ Reporte de ventas por período
- ✅ Análisis de stock
- ✅ Métricas de rendimiento
- ✅ Exportación de reportes

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca de interfaz de usuario
- **Vite** - Herramienta de construcción rápida
- **React Router** - Navegación entre páginas
- **Axios** - Cliente HTTP para API
- **jsPDF** - Generación de PDFs
- **CSS Variables** - Sistema de temas
- **LocalStorage** - Persistencia de datos

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Backend Laravel funcionando

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>
cd botica-amy-frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con la URL del backend

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

### Variables de Entorno
```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME="Botica AMY"
```

## 🎯 Uso del Sistema

### 1. Inicio de Sesión
- Acceder a `/login`
- Ingresar credenciales de usuario
- El sistema redirige automáticamente al dashboard

### 2. Navegación
- **Sidebar** con menú principal
- **Breadcrumbs** para navegación
- **Búsqueda global** en el header
- **Tema claro/oscuro** en la barra superior

### 3. Gestión de Datos
- **Crear**: Botón "+" en cada módulo
- **Editar**: Clic en elemento de la lista
- **Eliminar**: Botón de eliminación con confirmación
- **Exportar**: Botones CSV/PDF en listas

### 4. Búsqueda y Filtros
- **Campo de búsqueda** en la parte superior
- **Filtros desplegables** por categorías
- **Paginación** automática en la parte inferior

## 🔧 Personalización

### Temas
El sistema usa variables CSS para temas:
```css
:root {
  --bg-primary: #f5f6fa;
  --bg-secondary: #ffffff;
  --text-primary: #2c3e50;
  --accent-color: #3498db;
  /* ... más variables */
}
```

### Componentes Reutilizables
- `SearchFilter` - Búsqueda y filtros
- `Pagination` - Paginación
- `Toast` - Notificaciones
- `ThemeToggle` - Cambio de tema
- `ExportUtils` - Exportación de datos

## 📱 Responsive Design

El sistema es completamente responsivo:
- **Desktop**: Sidebar fijo, layout completo
- **Tablet**: Sidebar colapsable
- **Mobile**: Sidebar overlay, navegación optimizada

## 🔒 Seguridad

- **Tokens JWT** para autenticación
- **Interceptores Axios** para headers automáticos
- **Rutas protegidas** con verificación de roles
- **Validación de formularios** en frontend y backend

## 🚀 Despliegue

### Producción
```bash
npm run build
# Subir archivos de /dist al servidor web
```

### Docker (opcional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Soporte

Para soporte técnico o preguntas:
- 📧 Email: soporte@boticaamy.com
- 📱 WhatsApp: +51 999 999 999
- 🌐 Web: https://boticaamy.com

---

**Desarrollado con ❤️ para Botica AMY**
