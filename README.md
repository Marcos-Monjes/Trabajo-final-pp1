# Sistema de Gestión de Personas y Oficinas

Aplicación CRUD desarrollada como trabajo final para la materia PP1.

## Características
- Gestión completa de Personas y Oficinas (Alta, Baja, Modificación, Listado)
- Interfaz responsive con Bootstrap
- Búsqueda de registros
- Sistema de navegación
- Persistencia de datos con MySQL

## Requisitos Previos
- Docker y Docker Compose instalados
- Puerto 3000 disponible para la aplicación
- Puerto 3306 disponible para MySQL

## Instalación y Ejecución

1. Clonar el repositorio:
```terminal:
git clone https://github.com/Marcos-Monjes/Trabajo-final-pp1
```

2. Navegar al directorio:
```terminal:
cd Trabajo-final-pp1
```

3. Iniciar la aplicación:
```terminal:
docker-compose up -d
```

4. Acceder a la aplicación:
```
http://localhost:3000
```

## Tecnologías Utilizadas
- Node.js
- Express.js
- MySQL
- Bootstrap
- Docker

## Estructura del Proyecto
```
final/
├── docker-compose.yml    # Configuración de contenedores
├── Dockerfile           # Instrucciones de construcción
└── src/                # Código fuente
    ├── controllers/    # Lógica de negocio
    ├── routes/         # Definición de rutas
    ├── views/          # Plantillas EJS
    └── public/         # Archivos estáticos
```

## Contacto
Marcos Monjes
marcos.monjes@itscordoba.edu.ar

## Versión
3.0

## Agradecimientos
Agradezco a mi profesor, Luis Romano, por su paciencia y por todo el conocimiento que me brindó a lo largo de esta materia.

## Licencia
Este proyecto es de uso libre.
