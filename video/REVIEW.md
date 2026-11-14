# Revisión del video · 13/11/2026

## Decisiones
Elegida la historia «¿Por dónde empiezo?» para una primera visita. Se conservan como alternativas escritas «Una respuesta cambia la ruta» y «Tu primer día». Se muestran capturas reales con acercamientos y un puntero adaptado del componente `oversized-cursor` del registro de HyperFrames. No se simula una grabación nueva ni se inventan resultados.

## Comprobado
- HyperFrames 0.9.43: lint, runtime, layout, contraste y audio correctos, sin errores ni advertencias en la comprobación final.
- Nueve muestras explícitas y barrido de 384 fotogramas; contraste: 12 comprobaciones correctas.
- Hojas de planos, cortes y lectura a 360 px; revisión de fotogramas decodificados del MP4 en 20 y 45 s.
- Salida: 48,000 s, 1920 × 1080, 30 fps, H.264 y AAC estéreo; 6.182.223 bytes.
- Audio presente: media -21,5 dBFS, máximo -3,1 dBFS según volumedetect. No se escuchó la mezcla; la comprobación sonora fue numérica.
- Pausas deliberadas para leer en Inicio y Práctica, marcadas con data-hold. Sin movimiento ambiental continuo.
- Landing: reproducción y salto a 20 s correctos en Chrome a 360, 390, 768 y 1440 px; sin desbordamiento ni errores de recursos. Rutas relativas ensayadas bajo un prefijo de repositorio.

## Límites
Las capturas del video sirven de demostración, no de tutorial de cada control. En teléfono, los títulos transmiten el recorrido; el texto pequeño de la interfaz no se pretende leer completo. El plano más débil es el catálogo de cartas por su densidad: en otra edición podría sustituirse por una interacción de duelo grabada. La pregunta conserva un material visual anterior al refinamiento global; está documentado como captura real de referencia. No se verificó un teléfono físico ni Safari. No se han publicado la landing ni una nueva versión de la app.

## Estado
Video final renderizado e integrado. La landing y este MP4 ya están publicados en GitHub Pages; no se volvió a renderizar el video para corregir el despliegue. La revisión independiente y el ensayo remoto se registran en ../VERIFICACION.md.
