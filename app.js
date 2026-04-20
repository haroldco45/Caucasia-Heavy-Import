/**
 * APP: Caucasia Heavy-Import
 * DEVELOPER: Vibras Positivas HM
 */

// 1. Registro del Service Worker para PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('PWA Operativa: Vibras Positivas HM'))
            .catch(err => console.log('Error SW:', err));
    });
}

// 2. Reloj en tiempo real (Caucasia, Colombia)
function updateClock() {
    const options = { timeZone: 'America/Bogota', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const now = new Date().toLocaleTimeString('es-CO', options);
    document.getElementById('real-time-col').innerText = `Caucasia: ${now}`;
}
setInterval(updateClock, 1000);

// 3. Catálogo de Minería y Precios 2026
const catalog = [
    { name: "Excavadora SANY SY215C", fob: 65000, cop: 450000000, link: "https://www.sanyglobal.com" },
    { name: "Cargador XCMG LW300", fob: 32000, cop: 235000000, link: "https://www.xcmgglobal.com" },
    { name: "Bulldozer Shantui SD16", fob: 48000, cop: 320000000, link: "https://www.shantui-global.com" }
];

function loadCatalog() {
    const list = document.getElementById('catalog-list');
    list.innerHTML = catalog.map(p => `
        <div class="product-item">
            <div>
                <strong>${p.name}</strong><br>
                <small><a href="${p.link}" target="_blank">Visitar Fábrica</a></small>
            </div>
            <div class="price-tag">
                <span class="col-price">PVP Col: $${p.cop.toLocaleString()}</span><br>
                <small>FOB China: $${p.fob.toLocaleString()} USD</small>
            </div>
        </div>
    `).join('');
}

// 4. Calculadora de Importación Profesional
function calculateImport() {
    const fob = parseFloat(document.getElementById('fobValue').value);
    const ship = parseFloat(document.getElementById('shippingValue').value);
    const type = document.getElementById('machineryType').value;
    const trm = 4000; // TRM Estimada Abril 2026

    if (!fob || !ship) return alert("Ingrese valores válidos");

    let arancel = 0.05;
    if (type === 'steel') arancel = 0.35;
    if (type === 'industrial') arancel = 0.10;
    if (type === 'agri') arancel = 0.0;

    const cif = fob + ship;
    const arancelVal = cif * arancel;
    const iva = (cif + arancelVal) * 0.19;
    const totalUsd = cif + arancelVal + iva;
    const totalCop = totalUsd * trm;

    const res = document.getElementById('results');
    res.classList.remove('hidden');
    res.innerHTML = `
        <h4>Liquidación Estimada:</h4>
        <p>CIF (Costo + Seguro): $${cif.toLocaleString()} USD</p>
        <p>Arancel (${arancel*100}%): $${arancelVal.toLocaleString()} USD</p>
        <p>IVA (19%): $${iva.toLocaleString()} USD</p>
        <hr>
        <h3 style="color:#27ae60;">Total Nacionalizado: $${totalCop.toLocaleString()} COP</h3>
        <p><small>*TRM aplicada: $4,000. Puerto de arribo: Urabá.</small></p>
    `;
}

// 5. Generador de Correo de Negociación
function generateEmail() {
    const template = `
Subject: Purchase Inquiry - Heavy Machinery - Vibras Positivas HM (Colombia)

Dear Sales Team,

My name is [Your Name] from Vibras Positivas HM, located in Caucasia, Colombia. We are interested in importing the following machinery to Puerto Antioquia (Urabá):

Product: [Insert Model]
Requirement: 
- Must comply with Colombian ANLA 2026 emission standards.
- Quote in FOB terms.
- Provide technical data sheet for customs classification.

We are looking for a reliable supplier for our mining operations in the Bajo Cauca region.

Best Regards,
Vibras Positivas HM Team
    `;
    document.getElementById('email-template').innerText = template;
    document.getElementById('email-section').classList.remove('hidden');
}

function copyEmail() {
    const text = document.getElementById('email-template').innerText;
    navigator.clipboard.writeText(text).then(() => alert("Correo copiado. ¡Listo para enviar!"));
}

window.onload = () => { loadCatalog(); updateClock(); };
