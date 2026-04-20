// Configuración de Tiempo Real Colombia
function updateClock() {
    const now = new Date();
    const options = { timeZone: 'America/Bogota', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    document.getElementById('real-time-col').innerText = `Caucasia: ${now.toLocaleTimeString('es-CO', options)}`;
}
setInterval(updateClock, 1000);

// Lógica de Cálculo
function calculateImport() {
    const fob = parseFloat(document.getElementById('fobValue').value);
    const shipping = parseFloat(document.getElementById('shippingValue').value);
    const type = document.getElementById('machineryType').value;
    const trm = 4000; // Valor base para 2026, lo ideal es conectar a una API

    if (!fob || !shipping) {
        alert("Por favor ingrese todos los valores.");
        return;
    }

    // Definición de Aranceles según leyes 2026
    let arancelPercent = 0;
    if (type === 'steel') arancelPercent = 0.35; // Decreto 0264 de 2026
    else if (type === 'industrial') arancelPercent = 0.10;
    else arancelPercent = 0.05; // Maquinaria Amarilla estándar

    const cif = fob + shipping;
    const arancelValue = cif * arancelPercent;
    const baseIva = cif + arancelValue;
    const ivaValue = baseIva * 0.19;
    const totalUsd = cif + arancelValue + ivaValue;
    const totalCop = totalUsd * trm;

    const breakdown = document.getElementById('breakdown');
    breakdown.innerHTML = `
        <p><strong>Valor CIF:</strong> $${cif.toLocaleString()} USD</p>
        <p><strong>Arancel (${arancelPercent * 100}%):</strong> $${arancelValue.toLocaleString()} USD</p>
        <p><strong>IVA (19%):</strong> $${ivaValue.toLocaleString()} USD</p>
        <hr>
        <h4>TOTAL APROXIMADO: $${totalUsd.toLocaleString()} USD</h4>
        <h3 style="color:#27ae60;">Total en Pesos: $${totalCop.toLocaleString()} COP</h3>
        <p><small>*Basado en TRM de $${trm}. Incluye normatividad de abril 2026.</small></p>
    `;

    document.getElementById('results').classList.remove('hidden');
}
