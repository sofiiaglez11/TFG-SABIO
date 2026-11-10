# SABIO: Sistema Académico y de Bienestar Inteligente para la Organización

Plataforma web integral orientada al seguimiento de hábitos de estudio y bienestar psicoemocional para el estudiantado universitario. El sistema combina gestión académica jerárquica, analíticas de rendimiento y descanso, sincronización con Clockify y asistencia proactiva mediante una arquitectura multiagente basada en Modelos de Lenguaje de Gran Tamaño (LLMs) y el estándar Model Context Protocol (MCP).

Trabajo Fin de Grado desarrollado en la Escuela Técnica Superior de Ingenierías Informática y de Telecomunicación (ETSIIT) de la Universidad de Granada.

---

## Tabla de Contenidos

- [Características Principales](#características-principales)
- [Arquitectura del Sistema](#arquitectura-del-sistema)
- [Pila Tecnológica](#pila-tecnológica)
- [Requisitos Previos](#requisitos-previos)
- [Configuración del Entorno](#configuración-del-entorno)
- [Ejecución con Docker Compose](#ejecución-con-docker-compose)
- [Entorno de Pruebas y Validación](#entorno-de-pruebas-y-validación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Créditos y Licencia](#créditos-y-licencia)

---

## Características Principales

- **Gestión académica estructurada:** Organización de asignaturas, tareas y subtareas jerárquicas con etiquetas cromáticas personalizables, fechas límite y prioridades.
- **Sincronización con Clockify:** Integración bidireccional para el registro de sesiones de estudio en tiempo real mediante cronómetro y desglose de horas dedicadas por asignatura y tarea.
- **Seguimiento del bienestar:** Registro conversacional no invasivo de métricas clave (sueño, energía, estado de ánimo y nivel de estrés).
- **Asistente conversacional multiagente:** Orquestación de agentes especializados (académico, bienestar, planificación y clasificador general) mediante LangGraph para atender peticiones complejas en lenguaje natural.
- **Intervenciones proactivas empáticas:** Detección de patrones desadaptativos (sobrecarga académica, estudio nocturno continuado o privación de sueño) y generación de recomendaciones contextuales.
- **Planificación adaptativa:** Generación y reajuste dinámico de planes de estudio según plazos de entrega, exámenes fijos y disponibilidad horaria.
- **Analíticas visuales e interactividad:** Gráficos de evolución temporal, correlación entre hábitos de descanso y rendimiento, y comparativas.
- **Módulo docente colaborativo:** Vista para profesores con estadísticas agregadas y anonimizadas de los cursos, acompañadas de conclusiones sintéticas generadas por IA.
- **Seguridad y privacidad:** Cifrado simétrico Fernet para credenciales externas de Clockify, almacenamiento seguro de contraseñas mediante bcrypt y autenticación basada en tokens JWT.

---

## Arquitectura del Sistema

El sistema implementa una arquitectura desacoplada en tres capas principales:

1. **Frontend (Capa de Presentación):** Aplicación web reactiva construida en Next.js (App Router) y React, con interfaz adaptativa para perfiles de estudiante y profesor.
2. **Backend (Capa de Servicios y Orquestación):** API REST asíncrona implementada con FastAPI, responsable de la autenticación, la lógica de negocio y el grafo multiagente de LangGraph.
3. **Servidor MCP y Persistencia (Capa de Integración y Datos):**
   - Servidor local basado en el estándar Model Context Protocol (FastMCP) que expone las herramientas operativas sobre Clockify y MongoDB.
   - Base de datos NoSQL MongoDB para la persistencia de usuarios, tareas, bienestar, planes y cursos.

---

## Pila Tecnológica

### Backend
- Python 3.11 / 3.12
- FastAPI y Uvicorn (servidor ASGI)
- LangGraph y LangChain (orquestación multiagente)
- FastMCP / Model Context Protocol SDK
- Motor y PyMongo (cliente asíncrono MongoDB)
- Cryptography (cifrado simétrico Fernet)
- PyJWT y Passlib / Bcrypt (autenticación y hash)
- Google GenAI SDK (`gemini-2.5-flash-lite`) y OpenAI SDK (`nemotron-3.5-lightning-30b-a3b`)

### Frontend
- Node.js (v18+)
- Next.js 16 (App Router)
- React 19
- CSS Modules y Lucide React

### Infraestructura y Validación
- Docker y Docker Compose
- MongoDB Community
- Pytest, Pytest-cov y FastAPI TestClient
- MCP Inspector
- Swagger UI / OpenAPI

---

## Requisitos Previos

La plataforma está diseñada para desplegarse y ejecutarse en su totalidad mediante contenedores.

### Para la ejecución de la aplicación (entorno principal)
- **Docker** (versión 24.0 o superior).
- **Docker Compose** (versión 2.20 o superior).
- Clave de API para el proveedor LLM deseado (Google Gemini o OpenAI).

### Para la ejecución de la batería de pruebas y validación
- **Python** 3.11 o 3.12 con soporte para entornos virtuales (`venv`) y gestor `pip`.
- **Node.js** con `npx` (opcional, requerido únicamente si se desea ejecutar MCP Inspector para inspección de herramientas).

---

## Configuración del Entorno

1. Clone el repositorio en su máquina local:
   ```bash
   git clone <url-del-repositorio>
   cd TFG-SABIO
   ```

2. Cree el archivo de variables de entorno `.env` en la raíz del proyecto tomando como base `.env.example`:
   ```bash
   cp .env.example .env
   ```

3. Genere las claves criptográficas requeridas y complete los valores en `.env`:

   - **Generación de JWT_SECRET_KEY:**
     ```bash
     python3 -c "import secrets; print(secrets.token_hex(32))"
     ```

   - **Generación de FERNET_SECRET_KEY:**
     ```bash
     python3 -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
     ```

4. Ejemplo de archivo `.env` configurado para ejecución con Docker:
   ```env
   # Clave secreta para tokens JWT (autenticacion de usuarios)
   JWT_SECRET_KEY=cadena_hexadecimal_aleatoria_de_32_bytes

   # Clave secreta Fernet para cifrar las credenciales de Clockify en la base de datos
   FERNET_SECRET_KEY=clave_fernet_generada_en_base64=

   # Cadena de conexion a MongoDB en la red interna de Docker
   MONGODB_URI=mongodb://db:27017/tfg_bienestar

   # Proveedor LLM activo: "gemini" o "openai"
   LLM_PROVIDER=gemini

   # Clave de API del proveedor seleccionado
   GEMINI_API_KEY=AIzaSy...tu_clave_gemini
   # OPENAI_API_KEY=sk-...tu_clave_openai
   ```

---

## Ejecución con Docker Compose

La aplicación está diseñada para ejecutarse íntegramente mediante **Docker Compose**, lo que garantiza un entorno reproducible y aísla la base de datos, el backend y el frontend en una misma red virtual sin requerir la instalación de dependencias en el sistema anfitrión.

### 1. Iniciar los servicios
Ejecute el siguiente comando desde la raíz del proyecto:
```bash
docker compose up --build -d
```

Este comando descargará las imágenes base, construirá las imágenes del backend y frontend e iniciará los tres contenedores:
- **tfg_mongodb:** Base de datos MongoDB (puerto expuesto en host `27018`, interno `27017`).
- **tfg_backend:** API REST con FastAPI, LangGraph y MCP (puerto `8000`).
- **tfg_frontend:** Interfaz de usuario en Next.js (puerto `3000`).

### 2. Acceso a la plataforma
Una vez levantados los servicios, acceda a través del navegador:
- **Aplicación web:** [http://localhost:3000](http://localhost:3000)
- **Documentación interactiva de la API (Swagger UI):** [http://localhost:8000/docs](http://localhost:8000/docs)


## Entorno de Pruebas y Validación

La plataforma se ejecuta en Docker, pero la validación técnica, las pruebas automatizadas y la evaluación de los agentes se llevan a cabo en un **entorno virtual de Python** independiente. Esto permite ejecutar las suites con rapidez, aislar los mocks y medir la cobertura de código.

### Configuración del entorno virtual para pruebas

1. Acceda a la carpeta del backend y genere el entorno virtual:
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   ```

2. Instale las dependencias de ejecución y de pruebas:
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

### 1. Pruebas automatizadas (Pytest)
El conjunto consta de 149 pruebas automatizadas distribuidas en tres módulos:

- **`test_unit.py` (79 pruebas):** Cifrado simétrico Fernet, hashing bcrypt, ciclo de vida de tokens JWT, manipulación de fechas, normalización de etiquetas y cálculos estadísticos deterministas.
- **`test_api.py` (53 pruebas):** Validación de rutas REST mediante `TestClient`, autenticación Bearer, control de acceso por roles (alumno/profesor) y esquemas de entrada/salida.
- **`test_planner_guard.py` (17 pruebas):** Verificación de las guardas de seguridad que impiden el reajuste automático de exámenes y entregas con fecha fija.

Para ejecutar la batería completa con informe de cobertura:
```bash
pytest -v --cov=.
```

Para ejecutar un módulo concreto:
```bash
pytest tests/test_unit.py -v
pytest tests/test_api.py -v
pytest tests/test_planner_guard.py -v
```

### 2. Evaluación del clasificador del sistema multiagente
Para verificar que el enrutador clasifica adecuadamente las intenciones conversacionales del usuario (`ACADEMICO`, `BIENESTAR`, `GENERAL`, `PLANIFICADOR`):

```bash
python tests/eval_router.py
```
El script ejecuta un conjunto de 28 casos de prueba con repeticiones controladas, reporta la tasa de acierto por categoría y genera la matriz de confusión correspondiente.

### 3. Pruebas manuales de herramientas MCP con MCP Inspector
El servidor Model Context Protocol expone herramientas que interactúan con Clockify y MongoDB. Para probar estas herramientas de manera aislada con interfaz gráfica:

```bash
npx @modelcontextprotocol/inspector python3 mcp_local/server.py
```
Esta herramienta permite inspeccionar los esquemas de parámetros y simular llamadas directas a las funciones de borrado controlado, creación de tareas y control del cronómetro.

### 4. Pruebas exploratorias de la API REST
Con la aplicación en ejecución en Docker, acceda a:
```
http://localhost:8000/docs
```
Permite comprobar el comportamiento de todos los endpoints, validar las respuestas ante tokens erróneos y realizar peticiones de prueba interactivas.

---

## Estructura del Proyecto

```text
TFG-SABIO/
├── .env.example              # Plantilla de variables de entorno
├── docker-compose.yml        # Orquestacion de contenedores (db, backend, frontend)
├── docker-compose.dev.yml    # Configuracion complementaria de contenedores
├── README.md                 # Documentacion tecnica del proyecto
│
├── backend/                  # API REST, logica de negocio y subsistema multiagente
│   ├── Dockerfile            # Imagen Docker del backend
│   ├── requirements.txt      # Dependencias de Python (servidor y testing)
│   ├── main.py               # Entrada de la aplicacion FastAPI y rutas HTTP
│   ├── mcp_local/            # Implementacion de Model Context Protocol (MCP)
│   │   ├── server.py         # Servidor FastMCP con herramientas de persistencia y Clockify
│   │   └── client.py         # Cliente MCP integrado en el flujo del backend
│   ├── services/             # Servicios de negocio y logica modular
│   │   ├── auth.py           # Autenticacion, hashing con bcrypt y tokens JWT
│   │   ├── encryption_service.py # Cifrado simetrico Fernet para credenciales
│   │   ├── database_service.py   # Operaciones asincronas con MongoDB
│   │   ├── clockify_service.py   # Integracion con la API externa de Clockify
│   │   ├── langgraph_service.py  # Grafo de agentes conversacionales con LangGraph
│   │   ├── orchestrator.py       # Coordinador entre peticiones de usuario y grafo
│   │   ├── analytics_service.py  # Calculo de correlaciones, habitos y metricas
│   │   ├── gemini_service.py     # Integracion con Google GenAI
│   │   └── openai_service.py     # Integracion con OpenAI
│   └── tests/                # Bateria de pruebas (pytest y scripts de evaluacion)
│       ├── test_unit.py          # Pruebas unitarias de servicios
│       ├── test_api.py           # Pruebas de endpoints REST con TestClient
│       ├── test_planner_guard.py # Pruebas de guardas de seguridad en tareas
│       └── eval_router.py        # Evaluacion cuantitativa del clasificador
│
├── frontend/                 # Interfaz de usuario en Next.js (App Router)
│   ├── Dockerfile            # Imagen Docker del frontend
│   ├── package.json          # Dependencias y scripts de Node.js
│   ├── next.config.ts        # Configuracion de Next.js
│   └── app/                  # Paginas y componentes de la aplicacion
│       ├── page.tsx          # Pagina de bienvenida
│       ├── chat/             # Asistente conversacional guiado
│       ├── login/            # Inicio de sesion
│       ├── register/         # Registro de estudiantes y profesores
│       ├── components/       # Componentes visuales y paneles analiticos
│       └── utils/            # Utilidades de formato, colores y peticiones
│
└── docs/                     # Documentacion academica
    └── memoriaLATEX/         # Codigo fuente LaTeX de la memoria formal del TFG
```

---

## Créditos y Licencia

- **Autora:** Sofía González Uceda
- **Tutora:** Kawtar Benghazi Akhlaki Sekkate
- **Titulación:** Grado en Ingeniería Informática
- **Institución:** Universidad de Granada (UGR) — Escuela Técnica Superior de Ingenierías Informática y de Telecomunicación (ETSIIT)
- **Departamento:** Departamento de Lenguajes y Sistemas Informáticos
