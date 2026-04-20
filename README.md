# 🏗️ CAUCASIA HEAVY-IMPORT HUB

<div align="center">

```
╔══════════════════════════════════════════════════════════════╗
║        ECOSISTEMA DIGITAL DE IMPORTACIÓN MINERA              ║
║        Maquinaria Pesada · Aluvión · Bajo Cauca              ║
╚══════════════════════════════════════════════════════════════╝
```

[![Estado](https://img.shields.io/badge/Estado-Producción_Activa-gold?style=for-the-badge)](#)
[![Versión](https://img.shields.io/badge/Versión-1.0.0-orange?style=for-the-badge)](#)
[![PWA](https://img.shields.io/badge/PWA-Offline_Ready-darkgreen?style=for-the-badge)](#)
[![Colombia](https://img.shields.io/badge/Colombia-Bajo_Cauca_Antioqueño-yellow?style=for-the-badge)](#)

**🌐 [Ver App en Vivo](https://haroldco45.github.io/Caucasia-Heavy-Import/)**

*Desarrollado por **Vibras Positivas HM** — Caucasia, Antioquia, Colombia · Abril 2026*

</div>

---

## ¿Qué es esto?

Una **Progressive Web App** construida para el empresario minero del Bajo Cauca que quiere importar maquinaria pesada desde China sin intermediarios, sin sorpresas en aduana, y sin necesidad de contratar consultores costosos.

La app integra en un solo lugar: cálculos tributarios reales de la DIAN, catálogo técnico especializado, normativa minera vigente, calculadora de rentabilidad, y generador de correos de negociación en inglés para fábricas chinas.

---

## 8 Módulos. Un solo objetivo: hacer el negocio bien.

### `⚙️` Liquidador de Importación
Calcula el costo exacto de traer cualquier equipo a Colombia. Ingresa el valor FOB, el flete, y el tipo de maquinaria — la app aplica el arancel correcto (0%, 5% o 35% según el Decreto 0264/2023), el IVA del 19%, agente aduanero, y transporte interno. Resultado en **USD y COP** con la TRM del día.

### `📦` Catálogo Especializado
**12 equipos para minería de aluvión** con especificaciones técnicas, precios FOB de referencia en China, y arancel aplicable en Colombia. Desde una sluice box de USD 2.500 hasta una retroexcavadora Long Reach de USD 200.000. Filtros por categoría: Excavación · Lavado · Dragado · Soporte.

### `📈` Calculadora de ROI
¿Vale la pena la inversión? Ingresa la producción mensual estimada en gramos de oro, el precio del comprador local, los costos operativos y las regalías ANM (4%). La app calcula: **utilidad mensual, payback en meses, y ROI anual**.

### `📚` Guía Operativa Completa
Proceso de importación desde China en 7 pasos detallados + proceso técnico de minería aluvial en 6 etapas + checklist de adaptaciones para el clima tropical del Bajo Cauca. Escrita para que cualquier persona entienda el negocio de principio a fin.

### `⚖️` Marco Legal y Normativa
Lo que necesita saber para operar **legalmente**: Código de Minas (Ley 685/2001), sanciones por minería ilegal (Ley 1658/2013), GPS obligatorio en maquinaria, licencia ambiental CORANTIOQUIA, y el paso a paso para obtener título minero ante la ANM.

### `🌏` Directorio de Proveedores
Fabricantes chinos verificados: **SANY Heavy Industry, XCMG Group, Ganzhou Gelin Mining, Shanghai Dredging Equipment**. Más guía de uso de Alibaba, Made-in-China.com y Canton Fair. Rutas logísticas desde China hasta Caucasia.

### `✉️` Generador de Correo de Cotización
Produce un correo profesional en **inglés técnico** para solicitar cotización a cualquier fábrica china. Personalizable por tipo de equipo, capacidad requerida y nombre del solicitante. Con un clic se copia al portapapeles.

### `📖` Glosario Técnico
**20+ términos** explicados en lenguaje accesible: FOB, CIF, TRM, Arancel, Trommel, Sluice Box, Ley del Mineral, Regalías, B/L, Doré, RUCOM, y más. Para que el inversionista y el operador hablen el mismo idioma.

---

## Stack Técnico

```
HTML5 + CSS3 + JavaScript ES6+      (sin frameworks, sin dependencias externas)
Web App Manifest                     (instalable como app nativa en Android/iOS)
Service Worker                       (funcionamiento offline en zonas rurales)
Colombia Timezone API nativa         (reloj en tiempo real UTC-5 COT)
```

**Decisión de arquitectura:** Single-file app. Sin backend, sin base de datos, sin llamadas a APIs externas. Funciona en GitHub Pages, Netlify, o cualquier servidor estático. Ideal para zonas con conectividad limitada.

---

## Normativa Implementada

| Norma | Descripción |
|-------|-------------|
| Decreto 1165 / 2019 | Régimen de Aduanas DIAN — base del liquidador |
| Decreto 0264 / 2023 | Arancel 35% estructuras de acero |
| Ley 685 / 2001 | Código de Minas — regalías y títulos |
| Ley 1658 / 2013 | Penalización minería ilegal |
| Ley 2041 / 2020 | Agravantes minería ilegal |
| Decreto 1076 / 2015 | Licencias ambientales |
| Res. DIAN 000046 / 2019 | GPS obligatorio en maquinaria pesada |

---

## Despliegue Local

```bash
# Opción 1 — Clonar y abrir directo
git clone https://github.com/haroldco45/Caucasia-Heavy-Import.git
cd Caucasia-Heavy-Import
# Abre index.html en cualquier navegador moderno

# Opción 2 — Servidor local (recomendado para PWA)
npx serve .
# o
python -m http.server 8080
```

---

## Estructura del Proyecto

```
Caucasia-Heavy-Import/
│
├── index.html          ← App completa (8 módulos, UI dark/gold)
├── app.js              ← Toda la lógica: liquidador, catálogo, ROI, email, glosario
├── styles.css          ← Variables CSS, animaciones, diseño responsive
├── manifest.json       ← Configuración PWA (instalación nativa)
├── sw.js               ← Service Worker (caché offline)
└── README.md           ← Este archivo
```

---

## Para el Inversionista

Esta aplicación fue construida como **herramienta de due diligence** para evaluar negocios de importación de maquinaria minera en el Bajo Cauca Antioqueño. Su existencia como activo digital demuestra:

- Conocimiento técnico del proceso de importación colombiano
- Dominio de la normativa DIAN, ANM, y legislación minera vigente
- Capacidad de digitalizar procesos complejos de negocio
- Herramienta funcional lista para escalar con datos reales de la operación

> *La información es el activo más valioso antes de comprometer capital en maquinaria pesada.*

---

## Aviso Legal

Los cálculos de esta aplicación son orientativos basados en la normativa vigente a abril de 2026. No reemplazan el asesoramiento de un agente aduanero certificado DIAN, abogado minero, o asesor financiero. El desarrollador no se responsabiliza por decisiones de inversión tomadas con base en esta herramienta.

**Operar sin título minero en Colombia es un delito penal (Ley 1658/2013).**

---

<div align="center">

```
Desarrollado por Vibras Positivas HM — Derechos de Autor Reservados © 2026
Caucasia, Antioquia, Colombia
```

</div>
