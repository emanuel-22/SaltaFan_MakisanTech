# Salta Fan Backend

### 1. Clona el repositorio
Clona este repositorio en tu máquina local.

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_REPOSITORIO>
```

### 2. Configura las variables de entorno
- En el directorio raíz del proyecto, encontrarás un archivo llamado `sample.env`.

- Abre el archivo `sample.env` y coloque los valores de las variables de entorno necesarias.

- Renombra el archivo `sample.env` a `.env`


### 3. Construye y ejecuta los contenedores
Ejecuta el siguiente comando en este mismo directorio para construir las imágenes y levantar los contenedores:

```bash
docker compose up --build
```

### 4. Accede al backend
Una vez que los contenedores estén en funcionamiento, podrás acceder al backend en la siguiente dirección:

```
http://localhost:8090
```
> Nota: Si deseas cambiar el puerto de acceso al backend, edita el archivo `docker-compose.yml` y modifica la sección ports en el servicio app:

```yaml
  app:
    ports:
      - '8090:8080'  # Cambia el primer valor para el puerto de tu máquina
```

### 5. Verifica el estado de los contenedores
Para comprobar que los contenedores están funcionando correctamente, puedes listar los contenedores activos:


```bash
  docker ps
```

## Notas adicionales
Si necesitas detener los contenedores, ejecuta:

```bash
  docker compose down
```

Si realizas cambios en el código y quieres reconstruir las imágenes, asegúrate de usar `--build` al levantar los contenedores nuevamente:

```bash
  docker compose up --build
```

