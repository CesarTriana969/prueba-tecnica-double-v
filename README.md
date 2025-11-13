# Prueba Técnica | Desarrollador Front-End | DOUBLE V PARTNERS NYX

Construir una mini aplicación de listados que consuma una API gratuita y muestre información de forma clara y funcional.

## 1. API
Se optó por usar [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

## 2. Manejo de información

Como plus, la información será guardada en [Firebase](https://firebase.google.com/) para tener una base de datos no relacional. Se eligió esta opción por agilidad al proceso de desarrollar el proyecto. 

## 3. Manejo de estado y consumo de datos 

El manejo de estados está desarrollado en [Pinia](https://pinia.vuejs.org/). El consumo de datos será tipo API con axios ya que se está usando Firebase.
 
## 4. Reutilización de componentes

Se usaron diferentes librerías para el UI además de generar diferentes componentes que se usan n veces en todo el proyecto.

## 5. Estilo y diseño 

- Se optó por desarrollar con [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/) en su versión SASS para mayor personalización. 

- Se optó por usar [SweetAlert](https://sweetalert.js.org/) para la personalización de las alertas.

- Se optó por usar [simplebar](https://grsmto.github.io/simplebar/) para la personalización y animación del scrollbar.

- Se optó por usar [Formkit](https://formkit.com/) en su versión gratuita para la validación y animación de los formularios y formato de fechas y precios. 

## 6. Despliegue de la aplicación 

El despliegue se realizó en [Vercel](https://vercel.com/) para el autodeploy. 

## 7. Contenerización con Docker

El desarrollo local se realizó y construyó con Docker.

## 8. Testing

Se implementó testing unitario con [Vitest](https://vitest.dev/), el framework de testing oficial para Vue 3. Los tests cubren:

- **Store (Pinia)**: 
  - `clientsStore`: Validación del estado inicial, obtención de clientes desde la API, búsqueda y filtrado de clientes
  - `authStore`: Validación del Login, registro, logout y gestión de sesión con Firebase


### Ejecutar tests
```bash
# Ejecutar todos los tests
npm run test:run

# Modo watch (desarrollo)
npm run test

# Interfaz UI para tests
npm run test:ui
```

**Resultado de tests:**
- ✅ **17 tests pasando** (100% success rate)
- ✅ Store de clientes completamente testeado
- ✅ Store de autenticación con Firebase testeado
- ✅ Cobertura de funcionalidades principales

## Autenticación 

Al usar Firebase se usó la autenticación (correo, contraseña) de Firebase.

## Estructura de Rutas

**Rutas Públicas (guest.ts):**
- `/login` - Login
- `/signup` - Registro

**Rutas Protegidas (admin.ts):**
- `/` - Dashboard principal
- `/clients` - Lista de clientes
- `/clients/new` - Crear cliente
- `/clients/:id/edit` - Editar cliente

Todas las rutas protegidas requieren autenticación con Firebase.


## CI/CD

El proyecto está desplegado en Vercel con autodeploy configurado. Cada commit a la rama main activa automáticamente un nuevo despliegue.

## Tecnologías usadas

- Se usó [Vue.js 3](https://vuejs.org/) para realizar todo el frontend
- Se usó [TypeScript](https://www.typescriptlang.org/) para el tipado estático
- Se usó [Pinia](https://pinia.vuejs.org/) para el manejo de estado
- Se usó [Firebase](https://firebase.google.com/) para el manejo de la BD
- Se usó [Vitest](https://vitest.dev/) para testing unitario

Como plus se realizaron las configuraciones para el proyecto fuera SPA y PWA, brindando la mejor experiencia posible.

---

## Link del proyecto



## Features

- ✅ Responsive
- ✅ SPA (Single Page Application)
- ✅ PWA (Progressive Web App)
- ✅ Autenticación funcional con Firebase
- ✅ Testing unitario con Vitest
- ✅ TypeScript integrado
- ✅ CI/CD

## Instalación - con Docker

1. Instalación y construcción del proyecto.
```bash
docker run --rm -v "$(pwd):/var/www/html" -w /var/www/html node:20.0.0 npm i
```
    
2. Se debe crear un archivo .env con las siguientes variables
```bash
APP_NAME="Double"
APP_ENV=local
APP_DEBUG=true
APP_TIMEZONE='America/Bogota'
APP_URL=http://localhost:4000
BASE_URL=http://localhost:4000

APP_SERVICE=prueba_tecnica_double_v
APP_PORT=4000
```

3. Se corre el proyecto para su correcta visualización 
```bash
docker-compose up -d
```

## Instalación - sin Docker

1. Instalar dependencias
```bash
npm install
```

2. Configurar variables de entorno (crear archivo .env)

3. Ejecutar en modo desarrollo
```bash
npm run serve
```

4. Ejecutar tests
```bash
npm run test:run
```