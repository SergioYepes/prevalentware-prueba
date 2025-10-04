# Prevalentware Prueba

Este es un proyecto de prueba desarrollado con Next.js, TypeScript, Tailwind CSS y Prisma, creado para evaluar habilidades técnicas en el desarrollo web moderno.

## 🚀 Despliegue en Vercel

Para desplegar este proyecto en Vercel, sigue estos pasos:

1. **Conecta tu repositorio a Vercel**:
   - Visita [vercel.com](https://vercel.com) y crea una cuenta o inicia sesión.
   - Haz clic en **"New Project"** y selecciona tu repositorio `prevalentware-prueba` desde GitHub.
   - Vercel detectará automáticamente la configuración del proyecto y sugerirá los ajustes adecuados.

2. **Configuración automática**:
   - Vercel detectará que el proyecto utiliza Next.js y configurará el entorno automáticamente.
   - No es necesario realizar configuraciones adicionales.

3. **Despliegue**:
   - Haz clic en **"Deploy"** para iniciar el proceso de despliegue.
   - Una vez completado, Vercel proporcionará una URL donde podrás acceder a tu aplicación en producción.

## 🧪 Ejecución local

Para ejecutar el proyecto en tu máquina local, sigue estos pasos:

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/SergioYepes/prevalentware-prueba.git
   cd prevalentware-prueba
   ```
2. **Instala las dependencias**:

    Si utilizas npm:

    ```
    npm install
    ```
    O si prefieres yarn:

    ```
    yarn install
    ```
3. **Configura Prisma**:

    Asegúrate de tener una base de datos PostgreSQL en funcionamiento.

    Crea un archivo .env en la raíz del proyecto con la siguiente variable de entorno:

    env
    ```
    DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_base_de_datos
    ```
    Reemplaza usuario, contraseña y nombre_base_de_datos con tus credenciales y nombre de base de datos.

    - Ejecuta las migraciones de Prisma:

    ```
    npx prisma migrate dev
    ```
4. **Inicia el servidor de desarrollo**:

    Si utilizas npm:

    ```
    npm run dev
    ```
    O si prefieres yarn:

    ```
    yarn dev
    ```
    La aplicación estará disponible en http://localhost:3000.

## 🧪 Pruebas
Para ejecutar las pruebas del proyecto:

1. **Instala las dependencias de desarrollo (si aún no lo has hecho)**:

    ```
    npm install --save-dev
    ```
2.**Ejecuta las pruebas**:

    npm test

O si utilizas yarn:

    yarn test

Esto ejecutará las pruebas configuradas en el proyecto.

## 🛠 Tecnologías utilizadas

    - Next.js: Framework de React para aplicaciones web.

    - TypeScript: Superset de JavaScript que añade tipado estático.

    - Tailwind CSS: Framework de CSS utilitario para diseño rápido.

    - Prisma: ORM para bases de datos SQL.

    - PostgreSQL: Sistema de gestión de bases de datos relacional.


## 📞 Contacto
Para más información o consultas, puedes contactar al autor del proyecto:

GitHub: @SergioYepes

Correo electrónico: elgatobanban@gmail.com

¡Gracias por tu interés en este proyecto!



Este `README.md` proporciona instrucciones claras y detalladas para ejecutar el proyecto localmente y desplegarlo en Vercel, siguiendo las mejores prácticas para proyectos modernos de desarrollo web.

 