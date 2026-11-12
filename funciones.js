
const K_PERSONAS = 'lavandus_personas_v2';
const K_MAQUINAS = 'lavandus_maquinas_v2';
const K_SOLICITUDES = 'lavandus_solicitudes_v2';
const K_SESION = 'lavandus_sesion_v2';

const ROLES = { Cliente: 'Cliente Industrial', Operador: 'Dpto. de Operaciones', Encargado: 'Encargado de Planta' };
const ESTADOS_FINALES = ['Facturado', 'Cancelado', 'Rechazado'];
const ESTADOS_EN_PLANTA = ['Programado', 'En proceso'];

function guardar(clave, valor) { localStorage.setItem(clave, JSON.stringify(valor)); }

function leer(clave, porDefecto) {
    try {
        const d = JSON.parse(localStorage.getItem(clave));
        if (Array.isArray(d)) return d;
    } catch (e) {}
    guardar(clave, porDefecto);
    return porDefecto;
}

function getPersonas() {
    return leer(K_PERSONAS, [
        { nombre: 'Sanatorio Central', email: 'cliente@lavandus.com', telefono: '11-4567-8900', rol: 'Cliente', pass: 'Cliente2026!' },
        { nombre: 'Depto. de Operaciones', email: 'admin@lavandus.com', telefono: '11-2345-6789', rol: 'Operador', pass: 'Lavandus2026!' },
        { nombre: 'Carlos Gómez', email: 'encargado@lavandus.com', telefono: '11-3456-7890', rol: 'Encargado', pass: 'Planta2026!' }
    ]);
}

function getMaquinas() {
    return leer(K_MAQUINAS, [
        { nroSerie: 'LAV-01', marcaModelo: 'Girbau HS-6057', capacidad: 500, estado: 'Operativa' },
        { nroSerie: 'LAV-02', marcaModelo: 'Speed Queen JT050', capacidad: 200, estado: 'En Mantenimiento' },
        { nroSerie: 'LAV-03', marcaModelo: 'Danube WED-18', capacidad: 300, estado: 'Operativa' }
    ]);
}

function getSolicitudes() {
    return leer(K_SOLICITUDES, [
        { id: 'SOL-1001', clienteEmail: 'cliente@lavandus.com', tipoPrenda: 'Sábanas y Mantelería Hospitalaria', pesoKg: 150,
          direccion: 'Av. Corrientes 1234', estado: 'Solicitado', maquinaSerie: '', encargadoEmail: '', insumos: '', tiempoMin: 0 }
    ]);
}

function usuarioActual() {
    try {
        const s = JSON.parse(sessionStorage.getItem(K_SESION));
        if (s && s.email) return getPersonas().find(p => p.email === s.email) || null;
    } catch (e) { }
    return null;
}

function requerirSesion(rolesPermitidos) {
    const u = usuarioActual();
    if (!u) { sessionStorage.removeItem(K_SESION); location.href = 'login.html'; return null; }
    if (rolesPermitidos && !rolesPermitidos.includes(u.rol)) { location.href = 'solicitud.html'; return null; }
    pintarEncabezado(u);
    return u;
}

function pintarEncabezado(u) {
    let links = '<a href="solicitud.html">Solicitudes</a>';
    if (u.rol === 'Operador') links += '<a href="lavadoras.html">Lavadoras</a><a href="personas.html">Personas y Roles</a>';
    document.getElementById('encabezado').innerHTML =
        `<div class="brand"><img src="logo.png" alt="Logo LAVANDUS" class="brand-logo" onerror="this.style.display='none'"><h2>LAVANDUS S.R.L.</h2></div>
         <div class="nav-links"><span class="usuario">${escapeHTML(u.nombre)} (${ROLES[u.rol]})</span>${links}
         <button class="btn-logout" onclick="cerrarSesion()">Cerrar Sesión</button></div>`;
}

function cerrarSesion() { sessionStorage.removeItem(K_SESION); location.href = 'login.html'; }

function escapeHTML(str) {
    return String(str).replace(/[&<>'"]/g, t => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[t]));
}

function nombreDe(email) {
    const p = getPersonas().find(x => x.email === email);
    return p ? p.nombre : (email || '-');
}

function emailValido(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e); }
function enteroEnRango(v, min, max) { return /^\d+$/.test(String(v).trim()) && Number(v) >= min && Number(v) <= max; }

function mostrarErrores(idAlerta, errores) {
    const el = document.getElementById(idAlerta);
    if (errores.length === 0) { el.style.display = 'none'; return true; }
    el.innerHTML = '<strong>Error de validación:</strong><ul>' + errores.map(e => `<li>${escapeHTML(e)}</li>`).join('') + '</ul>';
    el.style.display = 'block';
    return false;
}

function filtrarTabla(idInput, idTbody) {
    const q = document.getElementById(idInput).value.toLowerCase();
    document.querySelectorAll('#' + idTbody + ' tr').forEach(tr => {
        tr.style.display = tr.innerText.toLowerCase().includes(q) ? '' : 'none';
    });
}