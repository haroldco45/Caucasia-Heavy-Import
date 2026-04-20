// ══════════════════════════════════════════════════════════
//  Caucasia Heavy-Import Hub — app.js
//  Vibras Positivas HM © 2026
// ══════════════════════════════════════════════════════════

// ── RELOJ COLOMBIA ──────────────────────────────────────
function updateClock() {
    const el = document.getElementById('real-time-col');
    if (!el) return;
    const now = new Date();
    const opts = {
        timeZone: 'America/Bogota',
        weekday: 'short', day: '2-digit', month: 'short',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false
    };
    el.textContent = '🇨🇴 ' + now.toLocaleString('es-CO', opts) + ' COT';
}
setInterval(updateClock, 1000);
updateClock();

// ── NAVEGACIÓN ──────────────────────────────────────────
function showSection(name, tab) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    const sec = document.getElementById('sec-' + name);
    if (sec) { sec.classList.add('active'); sec.classList.remove('animate-in'); void sec.offsetWidth; sec.classList.add('animate-in'); }
    if (tab) tab.classList.add('active');
}

// ── DATOS ARANCELARIOS ──────────────────────────────────
const ARANCEL_DATA = {
    excavadora:  { rate: 0.05, label: 'Excavadora / Retro',       pos: '8429.52.00' },
    trommel:     { rate: 0.00, label: 'Trommel / Lavadora',       pos: '8474.20.00' },
    dragas:      { rate: 0.05, label: 'Draga / Balsa Minera',     pos: '8905.10.00' },
    bombas:      { rate: 0.00, label: 'Bomba de Dragado',         pos: '8413.81.00' },
    compresores: { rate: 0.05, label: 'Compresor Industrial',     pos: '8414.80.00' },
    acero:       { rate: 0.35, label: 'Estructura Acero',         pos: '7308.90.00' },
    camiones:    { rate: 0.35, label: 'Volqueta / Camión Pesado', pos: '8704.10.00' },
    plantas:     { rate: 0.05, label: 'Planta Eléctrica Diésel',  pos: '8502.11.00' },
};

// ── LIQUIDADOR ──────────────────────────────────────────
function fmt(n, decimals = 0) {
    return n.toLocaleString('es-CO', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function fmtUSD(n) { return 'USD ' + fmt(n, 2); }
function fmtCOP(n) { return 'COP $ ' + fmt(n); }

function calculateImport() {
    const fob       = parseFloat(document.getElementById('fobValue').value) || 0;
    const shipping  = parseFloat(document.getElementById('shippingValue').value) || 0;
    const type      = document.getElementById('machineryType').value;
    const tasa      = parseFloat(document.getElementById('tasaCambio').value) || 4200;
    const agente    = parseFloat(document.getElementById('agenteAduanero').value) || 0;

    if (!fob || fob <= 0) { alert('⚠️ Ingrese el valor FOB del equipo'); return; }

    const info       = ARANCEL_DATA[type];
    const cif        = fob + shipping;
    const arancel    = cif * info.rate;
    const baseIva    = cif + arancel;
    const iva        = baseIva * 0.19;
    const subtotalUSD = cif + arancel + iva + agente;
    const transporte = cif * 0.02; // aprox 2% flete interno
    const total_usd  = subtotalUSD + transporte;
    const total_cop  = total_usd * tasa;

    const pct_arancel = (info.rate * 100).toFixed(0);
    const arancel_color = info.rate === 0 ? '#2ECC71' : info.rate === 0.05 ? '#D4A017' : '#E74C3C';

    const html = `
        <div class="result-line"><span class="result-label">Equipo: ${info.label}</span><span class="result-value" style="color:#888;font-size:11px">Pos. ${info.pos}</span></div>
        <div class="divider" style="margin:8px 0"></div>
        <div class="result-line"><span class="result-label">Valor FOB</span><span class="result-value">${fmtUSD(fob)}</span></div>
        <div class="result-line"><span class="result-label">+ Flete & Seguro</span><span class="result-value">${fmtUSD(shipping)}</span></div>
        <div class="result-line"><span class="result-label">= Base Gravable (CIF)</span><span class="result-value">${fmtUSD(cif)}</span></div>
        <div class="divider" style="margin:8px 0"></div>
        <div class="result-line">
            <span class="result-label">Arancel (${pct_arancel}%)</span>
            <span class="result-value" style="color:${arancel_color}">${fmtUSD(arancel)}</span>
        </div>
        <div class="result-line"><span class="result-label">IVA 19% (sobre CIF + Arancel)</span><span class="result-value">${fmtUSD(iva)}</span></div>
        <div class="result-line"><span class="result-label">Agente Aduanero</span><span class="result-value">${fmtUSD(agente)}</span></div>
        <div class="result-line"><span class="result-label">Transporte Interno (estimado)</span><span class="result-value">${fmtUSD(transporte)}</span></div>
        <div class="divider" style="margin:8px 0"></div>
        <div class="result-line result-total">
            <span class="result-label">💰 COSTO TOTAL IMPORTADO</span>
            <span class="result-value">${fmtUSD(total_usd)}</span>
        </div>
        <div class="result-line result-total">
            <span class="result-label">💰 EN PESOS COLOMBIANOS</span>
            <span class="result-value">${fmtCOP(Math.round(total_cop))}</span>
        </div>
        ${info.rate === 0.35 ? `<div class="alert-box">⚠️ <strong>Arancel alto (35%).</strong> Verifique la clasificación arancelaria con un agente aduanero. Una clasificación incorrecta puede ahorrar o costar miles de dólares.</div>` : ''}
        ${info.rate === 0 ? `<div class="info-box">✅ <strong>Arancel cero (0%).</strong> Este equipo tiene beneficio arancelario. El IVA del 19% puede ser descontable si la empresa está en régimen común.</div>` : ''}
        <div class="info-box">📝 Tasa de cambio utilizada: <strong>$${fmt(tasa)} COP/USD</strong> — Verifique la TRM actual en www.banrep.gov.co</div>
    `;

    const box = document.getElementById('results');
    box.innerHTML = html;
    box.classList.remove('hidden');
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ── CATÁLOGO ────────────────────────────────────────────
const CATALOG = [
    {
        cat: 'excavacion',
        name: 'Retroexcavadora 20 Toneladas',
        badge: 'china', badgeLabel: 'Importación China',
        desc: 'Excavadora de cadenas ideal para extracción de grava aluvial en terrazas y playones. Bucket estándar de 0.9 m³. La más usada en el Bajo Cauca por su relación potencia-precio.',
        specs: ['Motor 110 kW', 'Peso 20 ton', 'Profundidad 6m', 'Arancel 5%'],
        priceMin: 75000, priceMax: 110000, arancel: 5
    },
    {
        cat: 'excavacion',
        name: 'Retroexcavadora 30 Toneladas (Long Reach)',
        badge: 'china', badgeLabel: 'Importación China',
        desc: 'Versión de largo alcance para trabajar desde la orilla del río sin entrar al cauce. Brazo de hasta 18 metros. Ideal para cumplir normativa ambiental que restringe el ingreso de maquinaria al lecho.',
        specs: ['Motor 160 kW', 'Peso 32 ton', 'Alcance 18m', 'Long Reach'],
        priceMin: 140000, priceMax: 200000, arancel: 5
    },
    {
        cat: 'lavado',
        name: 'Trommel Lavador de Oro 50 ton/h',
        badge: 'trommel', badgeLabel: 'Lavado/Clasificación',
        desc: 'Tambor rotatorio con malla de clasificación. Separa gravas gruesas del fino aurífero. Incluye sluice box integrado de 6 metros con alfombras de neopreno. El corazón de la operación aluvial.',
        specs: ['50 ton/h', 'Motor 22 kW', 'Malla 25mm', 'Arancel 0%'],
        priceMin: 18000, priceMax: 45000, arancel: 0
    },
    {
        cat: 'lavado',
        name: 'Trommel con Bomba Hidráulica 100 ton/h',
        badge: 'trommel', badgeLabel: 'Lavado/Clasificación',
        desc: 'Sistema completo de lavado. El trommel de 100 ton/h está accionado hidráulicamente desde el sistema de la excavadora, eliminando la necesidad de motor eléctrico adicional. Muy popular en operaciones móviles.',
        specs: ['100 ton/h', 'Hidráulico', 'Portátil', 'Arancel 0%'],
        priceMin: 35000, priceMax: 65000, arancel: 0
    },
    {
        cat: 'lavado',
        name: 'Sluice Box (Canaleta) Modular 8m',
        badge: 'china', badgeLabel: 'Importación China',
        desc: 'Canaleta de concentración gravimétrica. El oro queda atrapado en las alfombras por densidad (19.3 g/cm³). Sistema modular de 8 metros con inclinación ajustable. Limpieza cada 4–8 horas según ley del mineral.',
        specs: ['8 metros', 'Acero inox 304', 'Alfombras neopreno', 'Modular'],
        priceMin: 2500, priceMax: 8000, arancel: 0
    },
    {
        cat: 'dragado',
        name: 'Draga de Succión 8 pulgadas',
        badge: 'china', badgeLabel: 'Importación China',
        desc: 'Para extracción subacuática de sedimentos auríferos. Bomba de 8 pulgadas sobre balsa flotante. Trabaja en profundidades de hasta 6 metros. Requiere certificación de la Capitanía de Puerto si opera en ríos navegables.',
        specs: ['8 pulg', '150 m³/h', 'Prof. 6m', 'Balsa flotante'],
        priceMin: 45000, priceMax: 90000, arancel: 5
    },
    {
        cat: 'dragado',
        name: 'Bomba de Dragado de Arena 6"',
        badge: 'china', badgeLabel: 'Importación China',
        desc: 'Bomba centrífuga de alta resistencia al desgaste para pulpa de arena y grava. Cuerpo en hierro fundido blanco cromado. Ideal como bomba de alimentación del trommel o sluice box desde el río.',
        specs: ['6 pulgadas', '120 m³/h', 'Solids 50mm', 'Arancel 0%'],
        priceMin: 3500, priceMax: 12000, arancel: 0
    },
    {
        cat: 'soporte',
        name: 'Planta Eléctrica Diésel 100 kVA',
        badge: 'china', badgeLabel: 'Importación China',
        desc: 'Generador de energía para operaciones alejadas de la red eléctrica. 100 kVA es suficiente para un trommel + iluminación + herramientas. Motor Perkins o Cummins recomendado para disponibilidad de repuestos en Colombia.',
        specs: ['100 kVA', 'Motor Diesel', 'ATS automático', 'Arancel 5%'],
        priceMin: 12000, priceMax: 22000, arancel: 5
    },
    {
        cat: 'soporte',
        name: 'Compresor de Tornillo 75 kW',
        badge: 'china', badgeLabel: 'Importación China',
        desc: 'Para herramientas neumáticas de mantenimiento, limpieza y en algunos casos para equipos de barequeo asistido. Compresores de tornillo son más eficientes y duraderos que los de pistón en trabajo continuo.',
        specs: ['75 kW', '10 m³/min', 'Tornillo rotativo', 'Arancel 5%'],
        priceMin: 8000, priceMax: 16000, arancel: 5
    },
    {
        cat: 'soporte',
        name: 'Kit GPS + Rastreo Satelital',
        badge: 'local', badgeLabel: 'Colombia',
        desc: 'Obligatorio por ley colombiana para toda maquinaria pesada. Dispositivo GPS con reporte a la plataforma de la Policía Nacional. Proveedores locales: Pointer, Globant GPS, Sky Alert. Instalación por técnico certificado.',
        specs: ['GPS activo', 'Obligatorio ley', 'Instalación local', 'Monitoreo 24/7'],
        priceMin: 500, priceMax: 1500, arancel: 0
    },
    {
        cat: 'soporte',
        name: 'Taller Móvil — Contenedor Equipado',
        badge: 'local', badgeLabel: 'Colombia / China',
        desc: 'Contenedor de 20 pies adaptado como taller de mantenimiento en campo. Soldadora MIG, taladro de banco, esmeril, caja de herramientas completa, estante de repuestos. Esencial para minimizar tiempos de parada en sitios remotos.',
        specs: ['Contenedor 20ft', 'Soldadora MIG', 'Herramientas', 'Portátil'],
        priceMin: 8000, priceMax: 20000, arancel: 0
    },
    {
        cat: 'lavado',
        name: 'Mesa Concentradora de Oro (Shaking Table)',
        badge: 'china', badgeLabel: 'Importación China',
        desc: 'Concentración gravimétrica de alta precisión. Recupera partículas de oro muy finas que escapan del sluice box. Para leyes bajas o para maximizar la recuperación del fino. Muy usado en etapas de limpieza final.',
        specs: ['Recuperación 95%+', 'Partículas 0.02mm', 'Motor 1.1 kW', 'Arancel 0%'],
        priceMin: 3000, priceMax: 9000, arancel: 0
    }
];

function renderCatalog(filter = 'all') {
    const container = document.getElementById('catalog-list');
    const filtered = filter === 'all' ? CATALOG : CATALOG.filter(i => i.cat === filter);

    container.innerHTML = filtered.map(item => `
        <div class="cat-item">
            <div class="cat-item-header">
                <div class="cat-item-name">${item.name}</div>
                <span class="cat-badge badge-${item.badge}">${item.badgeLabel}</span>
            </div>
            <div class="cat-item-desc">${item.desc}</div>
            <div class="cat-item-specs">
                ${item.specs.map(s => `<span class="spec-tag">${s}</span>`).join('')}
            </div>
            <div class="cat-item-price">
                <div>
                    <div class="price-label">Precio Referencial FOB China</div>
                    <div class="price-range">USD ${fmt(item.priceMin)} — ${fmt(item.priceMax)}</div>
                </div>
                <div style="text-align:right">
                    <div class="price-label">Arancel</div>
                    <div class="arancel-tag arancel-${item.arancel}">${item.arancel}%</div>
                </div>
            </div>
        </div>
    `).join('');
}

function filterCatalog(filter, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderCatalog(filter);
}

// ── ROI CALCULATOR ──────────────────────────────────────
function calcROI() {
    const inv     = parseFloat(document.getElementById('roiInversion').value) || 0;
    const gramos  = parseFloat(document.getElementById('roiGramos').value) || 0;
    const precio  = parseFloat(document.getElementById('roiPrecioOro').value) || 380000;
    const costos  = parseFloat(document.getElementById('roiCostos').value) || 0;
    const regalias = parseFloat(document.getElementById('roiRegalias').value) || 4;
    const mesesAlto = parseFloat(document.getElementById('roiMeses').value) || 8;

    if (!inv || !gramos) { alert('⚠️ Ingrese la inversión y la producción mensual estimada'); return; }

    const ingreso_bruto = gramos * precio;
    const descuento_regalias = ingreso_bruto * (regalias / 100);
    const ingreso_neto = ingreso_bruto - descuento_regalias;
    const utilidad_mes = ingreso_neto - costos;
    const utilidad_anio = utilidad_mes * mesesAlto;
    const payback_meses = utilidad_mes > 0 ? inv / utilidad_mes : Infinity;
    const roi_anual = utilidad_anio > 0 ? ((utilidad_anio / inv) * 100) : 0;
    const margen = ingreso_neto > 0 ? (utilidad_mes / ingreso_neto) * 100 : 0;

    const statusClass = (v) => v > 0 ? '' : 'danger';
    const paybackText = isFinite(payback_meses) ? Math.ceil(payback_meses) + ' meses' : '⚠️ No rentable';

    const html = `
        <div class="roi-metric"><span class="roi-lbl">Ingreso Bruto / Mes</span><span class="roi-val">${fmtCOP(Math.round(ingreso_bruto))}</span></div>
        <div class="roi-metric"><span class="roi-lbl">Regalías ANM (${regalias}%)</span><span class="roi-val warning">- ${fmtCOP(Math.round(descuento_regalias))}</span></div>
        <div class="roi-metric"><span class="roi-lbl">Ingreso Neto / Mes</span><span class="roi-val">${fmtCOP(Math.round(ingreso_neto))}</span></div>
        <div class="roi-metric"><span class="roi-lbl">Costos Operativos / Mes</span><span class="roi-val warning">- ${fmtCOP(Math.round(costos))}</span></div>
        <div class="roi-metric"><span class="roi-lbl">Utilidad Mensual</span><span class="roi-val ${statusClass(utilidad_mes)}">${fmtCOP(Math.round(utilidad_mes))}</span></div>
        <div class="roi-metric"><span class="roi-lbl">Utilidad Anual (${mesesAlto} meses)</span><span class="roi-val ${statusClass(utilidad_anio)}">${fmtCOP(Math.round(utilidad_anio))}</span></div>
        <div class="roi-metric"><span class="roi-lbl">Margen de Utilidad</span><span class="roi-val ${margen < 20 ? 'warning' : ''}">${margen.toFixed(1)}%</span></div>
        <div class="roi-metric"><span class="roi-lbl">📅 Recuperación de Inversión</span><span class="roi-val ${isFinite(payback_meses) ? '' : 'danger'}">${paybackText}</span></div>
        <div class="roi-metric"><span class="roi-lbl">📈 ROI Anual</span><span class="roi-val ${roi_anual < 15 ? 'warning' : ''}">${roi_anual.toFixed(1)}%</span></div>
    `;

    const box = document.getElementById('roi-output');
    box.innerHTML = html;
    box.classList.remove('hidden');
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ── GENERADOR DE EMAIL ──────────────────────────────────
const EMAIL_TEMPLATES = {
    trommel: {
        subject: 'Quotation Request – Alluvial Gold Washing Trommel Plant',
        product: 'alluvial gold washing trommel plant',
        specs: 'Processing capacity: [CAPACITY] tons per hour\n- Drum diameter compatible with the required capacity\n- Integrated sluice box (6-8 meters) with rubber matting\n- Anti-wear liners and spray nozzles\n- Suitable for tropical climate (high humidity, 30-35°C ambient temperature)\n- IP67 protection for electrical components'
    },
    excavadora: {
        subject: 'Quotation Request – Crawler Excavator for Alluvial Mining',
        product: 'crawler hydraulic excavator for alluvial mining',
        specs: 'Operating weight: [CAPACITY]\n- Boom and bucket optimized for gravel excavation\n- Reinforced cooling system for tropical use (Tmax 35°C)\n- Long-reach boom option (18m) if available\n- GPS tracking pre-installation\n- Stage III engine or equivalent'
    },
    draga: {
        subject: 'Quotation Request – Cutter Suction Dredger / Sand Pump Dredger',
        product: 'cutter suction dredger / sand pump dredger',
        specs: 'Pump diameter: [CAPACITY]\n- Dredging depth capacity: minimum 6 meters\n- Pontoon / floating barge included\n- High-chrome alloy wear parts\n- Suitable for tropical river environment\n- Diesel engine (Cummins or Perkins preferred for local spare parts availability in Colombia)'
    },
    bomba: {
        subject: 'Quotation Request – High-Pressure Sand and Gravel Slurry Pump',
        product: 'sand and gravel slurry pump',
        specs: 'Discharge size: [CAPACITY]\n- Solids handling up to 50mm particle size\n- White iron or high-chrome alloy wetted parts\n- Suitable for abrasive alluvial sand and gold gravel\n- Motor: diesel or hydraulic drive option\n- Spare wear parts package for 12 months included'
    },
    planta: {
        subject: 'Quotation Request – Diesel Generator Set',
        product: 'diesel generator set',
        specs: 'Power output: [CAPACITY]\n- Prime power rating\n- Cummins or Perkins engine (Colombia spare parts availability required)\n- Automatic Transfer Switch (ATS) included\n- Weatherproof canopy (IP44 minimum)\n- Suitable for remote site, tropical climate, altitude 100 masl\n- Derating certification at operating altitude'
    },
    compresor: {
        subject: 'Quotation Request – Rotary Screw Air Compressor',
        product: 'rotary screw air compressor',
        specs: 'Power: [CAPACITY]\n- Free air delivery: minimum 10 m³/min at 8 bar\n- Rotary screw type (not piston)\n- IP55 motor protection\n- Integrated air dryer and filters\n- Suitable for outdoor tropical use\n- Spare filter kit for 12 months'
    }
};

function generateEmail() {
    const tipo      = document.getElementById('emailEquipo').value;
    const capacidad = document.getElementById('emailCapacidad').value || '[SPECIFY CAPACITY]';
    const nombre    = document.getElementById('emailNombre').value || 'Mining Operations Manager';
    const notas     = document.getElementById('emailNotas').value;

    const tpl = EMAIL_TEMPLATES[tipo];
    const specs = tpl.specs.replace('[CAPACITY]', capacidad);

    const email = `Subject: ${tpl.subject}

Dear Sales Team,

I am writing to request a formal quotation for a ${tpl.product} for alluvial gold mining operations in the Bajo Cauca region of Antioquia, Colombia.

REQUIRED SPECIFICATIONS:
${specs}

ADDITIONAL NOTES:
${notas || 'Please include your standard warranty terms and after-sales service options.'}

REQUIRED DOCUMENTS WITH QUOTATION:
1. Technical datasheet (PDF)
2. Commercial price (FOB your factory port)
3. Estimated production/delivery time
4. Packing list and approximate weight/dimensions (for customs calculation)
5. Certificate of Origin (for Colombian customs)
6. High-resolution product photos and/or video

PAYMENT METHOD:
We are open to T/T (30% advance + 70% against B/L copy) or L/C at sight.

INSPECTION:
We may request a pre-shipment inspection by a third party (SGS or Bureau Veritas) at buyer's expense.

Please send your best competitive price. We are sourcing equipment for a new operation and are evaluating multiple suppliers.

Best regards,

${nombre}
Mining Operations — Caucasia, Antioquia, Colombia
WhatsApp: +57 311 770 0431
Email: [Your email]

---
This inquiry was prepared with Caucasia Heavy-Import Hub
Vibras Positivas HM © 2026`;

    const box = document.getElementById('email-section');
    box.textContent = email;
    box.classList.remove('hidden');

    const btnCopy = document.getElementById('btn-copy-email');
    btnCopy.classList.remove('hidden');

    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function copyEmail() {
    const txt = document.getElementById('email-section').textContent;
    navigator.clipboard.writeText(txt).then(() => {
        const btn = document.getElementById('btn-copy-email');
        const orig = btn.textContent;
        btn.textContent = '✅ ¡Copiado!';
        setTimeout(() => { btn.textContent = orig; }, 2000);
    });
}

// ── GLOSARIO ────────────────────────────────────────────
const GLOSSARY = [
    { term: 'FOB (Free on Board)', def: 'El vendedor entrega la mercancía en el puerto de origen. El comprador asume todos los costos desde ese punto: flete, seguro, arancel, IVA. Es el precio base de negociación.' },
    { term: 'CIF (Cost, Insurance & Freight)', def: 'FOB + Seguro + Flete hasta el puerto de destino. Esta es la base gravable sobre la que la DIAN calcula los aranceles e IVA en Colombia.' },
    { term: 'TRM (Tasa Representativa del Mercado)', def: 'Precio oficial del dólar en Colombia, publicado diariamente por el Banco de la República. Se usa para convertir valores USD a COP en las declaraciones de importación.' },
    { term: 'Posición Arancelaria', def: 'Código numérico del Sistema Armonizado (SA) que clasifica cada mercancía y determina el arancel aplicable. Ejemplo: 8429.52.00 para excavadoras hidráulicas de cadenas.' },
    { term: 'Arancel / Gravamen Arancelario', def: 'Impuesto que cobra Colombia por importar un bien. Varía del 0% (trommels, bombas) al 35% (camiones, estructuras de acero). Se aplica sobre el valor CIF.' },
    { term: 'IVA de Importación', def: 'El 19% de IVA colombiano se aplica sobre CIF + Arancel. Es recuperable si el importador es responsable del IVA (régimen común) y el bien es para actividad gravada.' },
    { term: 'ANM (Agencia Nacional de Minería)', def: 'Entidad del gobierno colombiano que otorga, fiscaliza y cancela los títulos mineros. Sin título vigente de la ANM, cualquier extracción mineral es ilegal.' },
    { term: 'Título Minero', def: 'Contrato entre el Estado y el minero que otorga el derecho exclusivo a explorar y explotar minerales en un área delimitada. Se solicita y tramita ante la ANM.' },
    { term: 'RUCOM', def: 'Registro Único de Comercializadores de Minerales. Obligatorio para comprar y vender oro legal en Colombia. Se inscribe ante el Ministerio de Minas y Energía.' },
    { term: 'Aluvión (Depósito Aluvial)', def: 'Sedimento transportado por ríos que se deposita en cauces, terrazas y planicies. El oro de aluvión (también llamado "oro de playa" o "chapola") se concentra en estos depósitos por su mayor densidad.' },
    { term: 'Trommel', def: 'Tambor cilíndrico rotatorio con malla perforada que clasifica materiales por tamaño. En minería de aluvión separa gravas gruesas del fino aurífero, que luego pasa al sluice box.' },
    { term: 'Sluice Box (Canaleta)', def: 'Canal inclinado con alfombras o riffles donde el agua arrastra el material. El oro queda atrapado por gravedad (densidad 19.3 g/cm³ vs 2.65 del cuarzo).' },
    { term: 'Ley del Mineral (gr/m³)', def: 'Cantidad de oro en gramos contenida por metro cúbico de material procesado. Operaciones aluviales viables: 0.3 gr/m³ o más con equipos grandes, 0.5+ gr/m³ para operaciones medianas.' },
    { term: 'Regalías Mineras', def: 'Contraprestación económica pagada al Estado por la explotación de minerales. Para oro en Colombia es del 4% sobre el valor de la producción bruta (Ley 685 de 2001).' },
    { term: 'Agente Aduanero', def: 'Persona jurídica habilitada por la DIAN para tramitar la importación de mercancías. Obligatorio para despachos en Colombia. Prepara la Declaración de Importación y gestiona el pago de tributos.' },
    { term: 'B/L (Bill of Lading)', def: 'Conocimiento de embarque. Documento emitido por la naviera que acredita la recepción de la mercancía para transporte marítimo. Es el documento de propiedad de la carga y se usa para tramitar la aduana.' },
    { term: 'CORANTIOQUIA', def: 'Corporación Autónoma Regional del Centro de Antioquia. Entidad ambiental con jurisdicción en la región del Bajo Cauca. Otorga o niega la licencia ambiental para proyectos mineros en Caucasia y municipios cercanos.' },
    { term: 'UIAF', def: 'Unidad de Información y Análisis Financiero. Recibe reportes de operaciones en efectivo y compra-venta de metales preciosos. Los compradores de oro están obligados a reportar transacciones sospechosas.' },
    { term: 'Doré', def: 'Aleación semipurificada de oro y plata resultante del proceso de fundición en las operaciones mineras. Es el producto comercializable que se vende a fundidoras o casas de cambio de metales preciosos.' },
    { term: 'Carta de Crédito (L/C)', def: 'Instrumento financiero emitido por un banco que garantiza el pago al exportador una vez cumplidas las condiciones pactadas (entrega de documentos de embarque). Reduce el riesgo en transacciones internacionales de alto valor.' }
];

function renderGlossary() {
    const container = document.getElementById('glossary-container');
    container.innerHTML = '<h3>📖 Términos del Negocio Minero-Importador</h3>' +
        GLOSSARY.map(g => `
            <div class="glossary-item">
                <div class="glossary-term">${g.term}</div>
                <div class="glossary-def">${g.def}</div>
            </div>
        `).join('');
}

// ── INIT ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    renderCatalog();
    renderGlossary();
});
