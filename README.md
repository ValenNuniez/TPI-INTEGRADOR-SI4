# LAVANDUS S.R.L. — Sistema de Gestión de Lavandería & Logística Industrial

Proyecto Integrador de Sistemas de Información 4 (TPI-SI4). Prototipo web funcional con control de acceso basado en roles, validaciones de negocio y trazabilidad completa del servicio de lavado industrial.

## Módulos del Sistema

* **`login.html`**: Autenticación de usuarios y gestión de sesiones.
* **`solicitud.html`**: Ciclo de vida transaccional de solicitudes (alta de pedidos, evaluación, asignación de maquinaria/personal, registro de insumos/tiempos y facturación).
* **`lavadoras.html`**: ABM de maquinaria industrial y control de estados operativos (`Operativa`, `En Mantenimiento`, `Fuera de Servicio`).
* **`personas.html`**: ABM de personas, clientes industriales y asignación de roles.
* **`funciones.js` / `estilos.css`**: Lógica modular compartida, persistencia local (`localStorage` / `sessionStorage`) y hoja de estilos centralizada.

## Credenciales de Prueba (Demo)

| Rol | Correo Electrónico | Contraseña |
| :--- | :--- | :--- |
| **Cliente Industrial** | `cliente@lavandus.com` | `Cliente2026!` |
| **Dpto. de Operaciones** | `admin@lavandus.com` | `Lavandus2026!` |
| **Encargado de Planta** | `encargado@lavandus.com` | `Planta2026!` |
