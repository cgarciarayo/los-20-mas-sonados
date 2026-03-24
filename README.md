# Los 20 más sonados

Aplicación web desarrollada con **Vue 3**, **Vuetify**, **Vue Router** y **Pinia**, centrada en la gestión de artistas y álbumes musicales, además de una segunda sección para explorar contenido musical de estos artistas mediante la **iTunes Search API**.

El proyecto ha sido planteado como una **SPA (Single Page Application)** con una estética inspirada en plataformas musicales actuales, cuidando tanto la funcionalidad como el diseño visual.

---

## Tecnologías utilizadas

- **Vue 3**
- **Vuetify**
- **Vue Router**
- **Pinia**
- **Axios**
- **Docker**
- **Nginx**

---

## Funcionalidades principales

### Ejercicio 1
La aplicación incluye una sección de gestión musical en la que se puede trabajar con artistas y álbumes en memoria usando Pinia.

#### Artistas
- listado de artistas
- búsqueda por nombre
- paginación
- añadir artista
- editar artista
- borrar artista
- validación para impedir borrar artistas que estén asociados a algún álbum

#### Álbumes
- listado de álbumes
- búsqueda por nombre
- filtro por artista
- paginación
- añadir álbum
- editar álbum
- borrar álbum
- selección de artista mediante desplegable en el formulario

Todos estos datos se almacenan **en memoria con Pinia**.

---

### Ejercicio 2
La aplicación incluye una segunda sección llamada **Escúchalos**, conectada a la **iTunes Search API**.

#### Funcionalidades
- búsqueda de contenido musical
- consulta mediante botón
- resultados mostrados en tarjetas visuales
- paginación
- navegación a una vista de detalle por cada elemento
- diseño visual integrado con el resto de la aplicación

---

### Componentes reutilizables destacados
- `AppHeader`
- `ConfirmDialog`
- `ArtistFormDialog`
- `AlbumFormDialog`
- `SectionHeader`

---

## Docker

En este proyecto se ha configurado el puerto:

http://localhost:8090
