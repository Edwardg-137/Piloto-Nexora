---
name: Nexora · Presentación del piloto
description: Identidad científica heredada, mineral y grafito con acento violeta.
colors:
  primary: "#584178"
  primary-hover: "#483361"
  primary-light: "#c5b4ed"
  neutral-bg: "#e7e9e3"
  neutral-ink: "#242b27"
  neutral-muted: "#4b574f"
  neutral-dark: "#151718"
  neutral-paper: "#f1f2ec"
  neutral-line: "#a4ada5"
  neutral-on-dark: "#c1c7c2"
  neutral-white: "#ffffff"
typography:
  display:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(43px, 4.8vw, 68px)"
    fontWeight: 600
    lineHeight: 1.03
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(32px, 3.5vw, 48px)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "25px"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 650
    lineHeight: 1.55
rounded:
  control: "4px"
  surface: "6px"
spacing:
  compact: "12px"
  control-inline: "20px"
  content: "24px"
  group: "32px"
  section-small: "48px"
  section-medium: "64px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-white}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "15px 22px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  text-link:
    textColor: "{colors.neutral-ink}"
  product-frame:
    backgroundColor: "{colors.neutral-dark}"
    textColor: "{colors.neutral-on-dark}"
    rounded: "{rounded.surface}"
    padding: "{spacing.compact}"
---

# Design System: Nexora · Presentación del piloto

## Overview

**Creative North Star: "Grafito científico heredado"**

La presentación conserva la marca Nexora: una base mineral clara, superficies de grafito y violeta para orientar la acción. Archivo une títulos, lectura y controles; la interfaz real aporta la evidencia visual. El isotipo se conserva como recurso de marca, sin reinterpretarlo.

La composición es breve y espaciosa para un primer contacto desde el teléfono. La captura inicial y el video ocupan el protagonismo; las explicaciones tienen jerarquía tipográfica y separadores finos. El movimiento se limita al desplazamiento por anclas y a estados de los enlaces principales.

**Key Characteristics:**
- Base mineral con contraste de grafito.
- Violeta concentrado en acciones y orientación.
- Archivo autohospedada en todos los niveles.
- Capturas reales, bordes discretos y controles nativos.

## Colors

Un solo acento violeta acompaña una paleta neutra con matiz verdoso. Los valores normativos están en el frontmatter y proceden de `site/styles.css`.

### Primary
- **Violeta:** acción principal, énfasis del título, números de pasos y foco sobre fondo claro.
- **Violeta profundo:** estado hover de la acción principal.
- **Violeta claro:** enlaces y foco sobre la superficie de grafito del video.

### Neutral
- **Mineral:** fondo general de la página.
- **Tinta:** texto principal; **tinta secundaria:** párrafos auxiliares.
- **Grafito:** banda del video y marco de la captura.
- **Papel:** texto claro del bloque de cartas y fondo del salto al contenido.
- **Línea:** separadores del encabezado, los pasos y el pie.
- **Texto sobre grafito:** leyendas y contenido auxiliar sobre fondos oscuros.
- **Blanco:** texto de la acción violeta y selección de texto.

## Typography

**Display Font:** Archivo, con Arial y sans-serif de respaldo.

**Body Font:** Archivo, con la misma pila de respaldo.

La fuente variable está autohospedada en `site/assets/fonts/archivo-latin.woff2`, cubre pesos de 100 a 900 y usa `font-display: swap`. El HTML precarga ese mismo archivo. No hay carga tipográfica externa.

### Hierarchy
- **Display:** título inicial compacto, con la última frase en violeta. En móvil usa `clamp(43px, 10.6vw, 68px)`; entre móvil y escritorio amplio usa `clamp(42px, 5vw, 58px)`.
- **Headline:** títulos de sección equilibrados. Video e invitación ajustan su tamaño al contexto sin introducir otra familia.
- **Title:** títulos de los pasos; en móvil se reducen a (24px).
- **Body:** lectura general. La introducción usa (18px), pasa a (17px) en móvil y limita la línea a unas (32–34ch).
- **Label:** acciones principales. Los enlaces de texto usan peso (550); las notas usan (13px) y mayor interlineado. La marca se presenta en mayúsculas con espaciado de letras positivo.

## Layout

El contenedor tiene un máximo de (1248px) y deja (48px) a cada lado en escritorio. Hasta (1050px), el margen lateral pasa a (32px); hasta (720px), a (20px). La página se organiza en encabezado, introducción con captura, banda de video, pasos, bloque de cartas, invitación y pie.

La introducción usa dos columnas proporcionales (0.91 / 1.09); los pasos y el bloque de cartas usan dos columnas iguales. Hasta (720px), estas composiciones pasan a una columna y la navegación del encabezado se oculta. El título precede a la captura y las cartas preceden a su explicación. La invitación apila texto y acción; el pie admite varias líneas.

El ritmo usa aire amplio entre secciones y distancias menores dentro de cada grupo. Los bloques claros principales tienen aproximadamente (88–100px) de separación vertical en escritorio y (48–60px) en móvil. A partir de (1500px) aumenta el aire de la introducción. El video mantiene proporción (16:9) y ancho completo dentro del contenedor.

## Elevation & Depth

La profundidad combina cambios de tono con sombras localizadas: el marco de la captura se levanta del fondo mineral, el botón tiene un relieve bajo y las cartas superpuestas conservan sus sombras. Los pasos se separan con líneas; las secciones de lectura permanecen planas. Las sombras exactas están registradas en el sidecar.

## Shapes

Las superficies tienen esquinas levemente suavizadas y los controles un radio algo menor, según los tokens. El video comparte el radio de los controles; la captura interior usa (2px). Las cartas conservan esquinas de (7px) y una inclinación estática de (−12° / 12°). Los pequeños indicadores circulares del encabezado y del marco sirven como detalles de estado visual.

## Components

### Buttons

La acción principal es compacta y tiene relieve discreto. Usa violeta con texto blanco, altura mínima de (54px), texto y flecha separados por (26px). En móvil el relleno horizontal se reduce a (20px).

El hover oscurece el fondo y el estado activo desplaza el control (1px) hacia abajo. La transición de fondo, color y transformación dura (160ms). El foco visible es un contorno de (3px) separado (6px), violeta sobre claro y violeta claro en la banda oscura.

### Text links

Las acciones auxiliares son enlaces subrayados con flecha y un objetivo mínimo de (48px) de alto. Los enlaces de descarga y contacto tienen al menos (44px). El hover refuerza el subrayado; el foco comparte el tratamiento de los demás controles.

### Cards / Containers

El marco de producto reúne una barra breve, la captura real y una leyenda de prueba. Su relleno baja de (12px) a (10px) en móvil. El bloque de cartas combina fondo oscuro verdoso, dos cartas superpuestas y explicación. Estas superficies conservan el lenguaje de bordes discretos del resto de la landing.

### Navigation

El encabezado alinea marca, dos enlaces por ancla y la etiqueta «Piloto cerrado». Los enlaces usan (14px), una altura mínima de (44px) y violeta al pasar el puntero. En móvil permanecen marca y etiqueta. El salto al contenido aparece al recibir foco.

### Video and transcript

El reproductor usa controles nativos, reproducción en línea y reproducción por elección del estudiante. Tiene poster, pista de textos en español, enlace de descarga y transcripción HTML mediante `details` / `summary`. La transcripción limita la línea a (72ch); su activador conserva un objetivo de (44px).

Con `prefers-reduced-motion: reduce`, el desplazamiento por anclas pasa a inmediato y se desactivan las transiciones. El video sigue bajo control del estudiante.

### Steps

Una lista ordenada presenta tres pasos con número violeta, título y explicación breve. Los números usan cifras tabulares; las filas se separan con líneas y mantienen el mismo orden al apilarse.

## Do's and Don'ts

### Do:
- **Do** conservar el isotipo Nexora, Archivo autohospedada y la paleta extraída del sitio.
- **Do** mantener el orden de lectura al pasar las composiciones a una columna en móvil.
- **Do** conservar foco visible, controles nativos, transcripción y reproducción voluntaria del video.
- **Do** acompañar las capturas reales con su identificación de interfaz de prueba.

### Don't:
- **Don't** sustituir las capturas por resultados, cifras o testimonios inventados.
- **Don't** cargar la fuente desde un proveedor externo ni introducir una nueva identidad visual.
- **Don't** convertir la demostración en reproducción automática ni añadir movimiento obligatorio.
