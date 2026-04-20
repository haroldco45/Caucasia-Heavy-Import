/**
 * APP: Caucasia Heavy-Import Hub
 * DEVELOPER: Vibras Positivas HM
 */

// Sincronización Hora Colombia
function updateClock() {
    const options = { timeZone: 'America/Bogota', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    document.getElementById('real-time-col').innerText = `Caucasia: ${new Date().toLocaleTimeString('es-CO', options)}`;
}
setInterval(updateClock, 1000);

// Catálogo Ampliado: Minería de Aluvión
const catalog = [
    { name: "Excavadora Brazo Largo XCMG XE210LL", fob: 82000, cop: 580000000, category: "Aluvión" },
    { name: "Retro SANY SY215C", fob: 65000, cop: 450000000, category: "Estándar" },
    { name: "Bulldozer Pantanero Shantui SD22W", fob: 115000, cop: 790000000, category: "Remoción" },
    { name: "Draga de Succión 8'", fob: 45000, cop: 310000000, category: "Extracción" },
    { name: "Planta de Lavado Trommel 50TPH", fob: 18000, cop: 125000000, category: "Lavado" }
];

function loadCatalog() {
    const list = document.getElementById('catalog-list');
    list.innerHTML = catalog.map(p => `
        <div class="product-item">
            <div>
                <small style="color: var(--accent); font-weight: bold;">${p.category}</small>
                <div style="font-weight: bold;">${p.name}</div>
            </div>
            <div style="text-align: right;">
                <div style="color: var(--success); font-weight: bold;">PVP Col: $${p.cop.toLocaleString()}</div>
                <small>FOB China: $${p.fob.toLocaleString()} USD</small>
            </div>
        </div>
    `).join('');
}

// Calculadora
function calculateImport() {
    const fob = parseFloat(document.getElementById('fobValue').value);
    const ship = parseFloat(document.getElementById('shippingValue').value);
    const type = document.getElementById('machineryType').value;
    const trm = 4000;

    if (!fob || !ship) return alert("Por favor complete los datos.");

    let arancel = 0.05;
    if (type === 'steel') arancel = 0.35;
    if (type === 'agri') arancel = 0.0;

    const cif = fob + ship;
    const arancelVal = cif * arancel;
    const iva = (cif + arancelVal) * 0.19;
    const totalUsd = cif + arancelVal + iva;

    const res = document.getElementById('results');
    res.classList.remove('hidden');
    res.innerHTML = `
        <h3>Liquidación Estimada:</h3>
        <p>CIF en Puerto: $${cif.toLocaleString()} USD</p>
        <p>Impuestos (Arancel + IVA): $${(arancelVal + iva).toLocaleString()} USD</p>
        <h2 style="color: var(--success);">TOTAL: $${(totalUsd * trm).toLocaleString()} COP</h2>
        <p><small>*TRM: $${trm} | Puerto: Antioquia (Urabá)</small></p>
    `;
}

// Negociación
function generateEmail() {
    const body = `Subject: Inquiry for Mining Equipment - Vibras Positivas HM (Colombia)\n\nDear Sales Team,\n\nWe are Vibras Positivas HM, based in Caucasia, Colombia. We want to import [Model] for alluvial mining.\n\nRequirements:\n1. Tropical Kit for high temperatures.\n2. ANLA 2026 Emission Compliance.\n3. FOB Price Quote.\n\nBest regards,\nManagement Team\nVibras Positivas HM`;
    document.getElementById('email-template').innerText = body;
    document.getElementById('email-section').classList.remove('hidden');
}

function copyEmail() {
    navigator.clipboard.writeText(document.getElementById('email-template').innerText);
    alert("Copiado al portapapeles.");
}

window.onload = () => { updateClock(); loadCatalog(); };
