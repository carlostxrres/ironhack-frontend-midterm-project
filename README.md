# Bootcamp midterm project

En este proyecto, replico un diseño de Figma en HTML, CSS y JavaScript, de forma totalmente responsiva.

## Funcionalidades básicas

### Páginas

* **Página principal: `/` o `/index.hml`**
![Captura de la página principal](/img/readme/home-1.png)

* **Página de proyecto: `/project.html?id=<project-id>`**
![Captura de la página principal](/img/readme/project-1.png)

* **Página de contacto: `/contact-us.html`**
![Captura de la página principal](/img/readme/contact-us-1.png)

### Obtenención datos de los proyectos desde la API

Los datos de los proyectos se obtienen dede [el endpoint provisto en las instrucciones](https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects), tanto en las listas de proyectos como en las páginas de proyectos individuales.

### Validación del formulario de contacto

Las condiciones de validación del formulario se definen en el archivo [`scripts/form-conditions.js`](scripts/form-conditions.js) y se ejecutan en [`scripts/form-validation.js`](scripts/form-validation.js).

Se han añadido las siguientes condiciones:
* El nombre debe tener al menos un carácter
* El nombre no debe ser Ironhack - *condición requerida en las instrucciones*
* El nombre debe incluir nombre y apellido separados por un espacio
* El correo electrónico debe tener al menos un carácter
* El correo electrónico debe comenzar con un conjunto de letras, números, puntos o guiones
* El correo electrónico debe incluir un símbolo @
* El correo electrónico debe terminar con un nombre de dominio válido
* El número de teléfono debe tener al menos un carácter
* El número de teléfono debe incluir solo números, espacios o guiones
* El número de teléfono debe tener 9 o 10 dígitos
* El mensaje debe tener al menos un carácter

## Funcionalidades adicionales

### Página 404

He creado una página 404 que se muestra cuando hay algún error en la página `/project.html`.

La página 404 muestra lo siguiente:

- Una explicación del error:

   | | |
   |-|-|
   | Si no se ha especificado Project ID en la URL: | `You were trying to see a project without specifying a project ID` |
   | Si el proyecto no existe: | `You were trying to access a project with ID <project-id>, while there are no projects with this ID` |
   | Si ha habido algún error en el fetch: | El mensaje de error devuelto por el servidor |
   | Por defecto, en cualquier otro caso: | `The page you are looking for does not exist` |

- Un botón que lleva a la página de un proyecto aleatorio. En caso de fallo del servidor, el botón lleva a la página principal.
- Las secciones "Projects" y "Do you have any questions?", así como el Footer.

![Imagen del favicon](/img/readme/404-1.png)

### Menú responsivo

En pantallas pequeñas (con ancho inferior a 768px), el menú se muestra de forma flotante al hacer click en un "burger button".

| **Desktop** | **Mobile** |
|-|-|
| ![Captura de la barra de navegación en pantallas de escritorio](/img/readme/responsive-menu-1.png) | ![Captura de la barra de navegación en pantallas pequeñas](/img/readme/responsive-menu-2.png) |

### Favicon

He creado un favicon para la página. He elegido para ello la letra `e` del logo de la empresa (porque me parecía la más llamativa) y le he puesto un fondo blanco para que asegurar su visibilidad en cualquier tema del navegador:

![Imagen del favicon](/img/favicon.svg)

En los `head` de los documentos HTML, he añadido la siguiente línea para mostrar el favicon:

```html
<link rel="icon" type="image/x-icon" href="./img/favicon.svg" />
```

### Título de pestaña dinámico en "projects"

En la página de proyectos, el título de la pestaña cambia dinámicamente según el proyecto que se esté visualizando. Lo he asignado seteando `document.title`. Por ejemplo, si se está visualizando el proyecto "Simplify", así se ve la pestaña en Firefox:

![Captura de una pestaña del navegador](/img/readme/titulo-dinamico-1.png)

### Skeleton loader

He añadido un skeleton loader para todos los elementos que requieren fetching de datos: el proyecto y la sección de "otros proyectos" (tanto en `index.html` como en `project.html`).

Esto reduce los saltos de contenido cuando los datos son cargados.

Aquí se puede ver cómo se ve el skeleton loader en la sección de "otros proyectos":

![Captura de un elemento cargándose con skeleton loader](/img/readme/skeleton-1.gif)

El skeleton loader es inapreciable si tienes una conexión rápida, a menos que simules una conexión lenta en las herramientas de desarrollador de tu navegador.

### Modo oscuro

Al hacer hover sobre la barra de navegación, a la izquierda del logo de la empresa, aparece un botón que permite cambiar el tema de la página. Y al hacer click en él, se cambian los colores de la página a un modo oscuro.

![Captura de la página cambiando el modo de claro a oscuro](/img/readme/modo-oscuro-1.gif)

La primera vez que el usuario ingresa a la página, la decisión sobre si se muestra el modo claro u oscuro se basa en la configuración de su navegador, leída mediante `window.matchMedia("(prefers-color-scheme: dark)")`.

Cada vez que el usuario cambia el tema de la página, la preferencia se guarda en `localStorage`, de modo que la próxima vez, la página se cargará con el tema que el usuario eligió la última vez que visitó la página.

Para obtener la paleta oscura, para la mayoría de colores, simplemente pasé los colores a HSL y cambié la luminosidad, y los volví a pasar al formato original (hexagesimal). Para algunos colores, he hecho ajustes adicionales.

El color primario (`color-primary-1`) y el color secundario (`color-secondary`) los he mantenido igual, pero los he intercambiado (todo lo que fuera de color primario en el modo claro se muestra en color secundario en el modo oscuro, y viceversa).

Esta opción no está disponible en pantallas con una anchura menor a 640px.

### Mensaje de éxito al enviar el formulario

Cuando se envía el formulario de contacto, se muestra un mensaje de éxito con los datos que el usuario ha enviado.

Además de los datos introducidos por el usuario, se muestran dos más:

- date: la fecha y hora en que el usuario envió el formulario
- time-spent: el tiempo que ha pasado desde que el usuario abrió la página hasta que envió el formulario

El usuario puede cerrar el mensaje de éxito y enviar otro formulario haciendo click en el botón "Send another message".

![Captura de la de éxito tras enviar un formulario de contacto](/img/readme/exito-1.png)

Los datos del formulario enviado se guardan en `localStorage`, de modo que si el usuario siempre puede volver a la página para ver los datos que envió la última vez.

Un posible trabajo futuro sería mostrar los nombres de los datos de forma más elegante (por ejemplo, "Full name" en lugar de "full-name").

### Resaltar la sección actual en la barra de navegación

En la página principal, a medida que el usuario va desplazándose por la página, la barra de navegación se actualiza resaltando la sección mostrada.

| **Sección** | **Barra de navegación** |
|-|-|
| Home | ![Captura de la barra de navegación](/img/readme/seccion-resaltada-1.png) |
| Projects | ![Captura de la barra de navegación](/img/readme/seccion-resaltada-2.png) |
| Services | ![Captura de la barra de navegación](/img/readme/seccion-resaltada-3.png) |

En el resto de páginas, no se resalta nada, (dado que las tres secciones se encuentran en la página principal).

## Posible trabajo futuro

* Cambiar algunos colores del modo oscuro.
* Mejorar la visualización del mensaje enviado para mensajes largos.
* En pantallas pequeñas, mejorar el comportamiento del menú flotante (hacerlo desaparecer al hacer click en una opción, por ejemplo).
* Desanidar el CSS, para hacerlo compatible con versiones anteriores de navegadores.
* Manejar submits del formulario de email en la sección "Do you have any questions?"

## To do

- [x] Reproducir las páginas en HTML y CSS
- [x] Hacerlo responsive
- [x] Añadir JavaScript
   - [x] Get data for project pages dynamically from API
   - [x] Validar el formulario usando JavaScript
- [x] Para obtener créditos extra, añadir alguna funcionalidad adicional:
   - [x] Una página 404 que funcione
   - [x] Un menú responsivo. Cuando se hace clic, cambiar el menú
   - [x] Skeleton loaders for dynamic content
   - [x] Add a favicon
   - [x] In projects, change document title dynamically
   - [x] Un "modo oscuro" según los ajustes del usuario
   - [x] Añadir un botón de "modo oscuro" que cambie el tema de la página
   - [x] Show a success message when the form is submitted, with the details of the form
   - [x] Remember the previously-sent form, using localStorage
   - [x] Highlight the current section in nav-bar
- [x] Desplegar en Netlify
- [x] Crear un archivo README que cubra todas las características, configuración y especificaciones de la aplicación