# Verificación de la presentación · 13/11/2026

## Resultado funcional
Landing estática y video terminados. Chrome comprobado a 360, 390, 768 y 1440 px: sin desbordamiento, imágenes locales completas, enlaces internos correctos, transcripción desplegable, reproducción y seek del MP4. El sitio también carga con un prefijo de repositorio para GitHub Pages. Sin JavaScript propio ni analítica.

El servidor local prueba el confinamiento de rutas; la verificación comprueba respuestas parciales del video y el archivo vacío de Pages. Los archivos de evidencia quedan en verification/, ignorados por Git. El título móvil se comprobó otra vez tras corregir el espacio: la revisión acotada lo declaró resuelto y mantuvo ship.

## Video
48 s, 1920 × 1080, 30 fps, H.264/AAC estéreo, 6.182.223 bytes. HyperFrames termina con cero errores y cero advertencias; audio medido con señal y sin clipping. Ver video/REVIEW.md para decisiones y límites. Se revisaron fotogramas de la composición y del archivo exportado.

## Diseño
Detector ejecutado una vez: texto informativo de 10 px corregido a 11 px; el aviso de padding en la sección de video es un falso positivo porque la sección contiene .wrap con márgenes horizontales y padding vertical explícitos. La revisión independiente inspeccionó las cuatro capturas y las hojas del video; no encontró P0/P1. Identificó la unión de «hay» y «cartas» al ocultar un salto en móvil, corregida mediante un espacio literal.

## Publicación
La carpeta .github/workflows/ contiene un workflow que publica únicamente site/; no necesita instalar dependencias. Jorge creó Edwardg-137/Piloto-Nexora y autorizó conectar esta carpeta mediante un Git independiente, con origin y rama main. La carpeta está ignorada por el monorepo. La configuración de Pages y su URL final se comprueban por separado. Los archivos de esta tarea permanecen dentro de presentacion-nexora/.

## Límites pendientes
No se probó teléfono físico, Safari ni despliegue real de Pages. No se escuchó la música: se midió su nivel y se confirmó la pista en el MP4. Las capturas muestran una versión local de prueba que puede adelantarse a la app publicada. La revisión automática no valida eficacia educativa ni el flujo remoto completo del piloto.
