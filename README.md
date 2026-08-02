# Formulario Imagen + Texto

Formulario estático hecho con HTML, CSS y JavaScript puro que permite subir imágenes desde el dispositivo, previsualizarlas al instante y agregarles una descripción.

## Cómo usarlo

1. Abre `index.html` en tu navegador (no requiere servidor ni instalación).
2. Haz clic sobre cualquiera de los recuadros para seleccionar una imagen.
3. Escribe una descripción en el campo de texto correspondiente.
4. Presiona **Actualizar Datos** para confirmar los cambios.

## Estructura

```text
├── index.html   Estructura del formulario
├── style.css    Estilos de la galería
└── script.js    Lógica de previsualización y validación
```

## Mejoras incluidas en esta versión

- **Corrección de bug:** `index.html` enlazaba a `styles.css`, pero el archivo real se llama `style.css`, por lo que los estilos nunca se aplicaban. Ahora la referencia es correcta.
- **Previsualización independiente:** antes era obligatorio seleccionar ambas imágenes para que cualquiera de las dos se mostrara. Ahora cada imagen se previsualiza en cuanto se selecciona, sin depender de la otra.
- **Validación de archivos:** se valida que el archivo sea una imagen y no supere los 5MB, mostrando un mensaje claro si no cumple los requisitos.
- **Accesibilidad:** se agregaron etiquetas (`label`) asociadas a cada campo, texto alternativo descriptivo y una zona de mensajes con `aria-live` para que los lectores de pantalla anuncien el resultado de la acción.
- **Responsive:** en pantallas pequeñas (menos de 600px) las imágenes se apilan en una sola columna en lugar de comprimirse.
- **Mejor feedback:** se reemplazó el uso de `alert()` por un mensaje de estado en pantalla, con distinción visual entre éxito y error.

## Próximas ideas

- Permitir un número dinámico de imágenes en lugar de un máximo fijo de 2.
- Guardar los datos en `localStorage` para que persistan al recargar la página.
