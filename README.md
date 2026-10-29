# Nexo Admin

Maqueta navegable en español, creada desde cero con Angular 22, TypeScript estricto, Signals, Tailwind CSS 4 y SVG de Lucide. Diseño navy inspirado en la referencia proporcionada.

## Ejecutar

Desde esta carpeta:

```powershell
npm install
npm start
```

Abre http://127.0.0.1:4200/dashboard. Las dependencias ya están instaladas en esta entrega local. `npm start` utiliza el Node compatible incluido como dependencia del proyecto, sin reemplazar el Node del equipo.

```powershell
npm run build
```

La compilación de producción se genera en `dist/nexo/browser`. Para servirla se necesita un servidor con fallback de rutas a `index.html`.

## Pantallas

| Ruta                    | Contenido                                                                     |
| ----------------------- | ----------------------------------------------------------------------------- |
| `/dashboard`            | Cuatro KPI, actividad por período, gráfica semanal, eventos y accesos rápidos |
| `/dispositivos`         | Búsqueda, estado, tipo, paginación, detalle y control simulado                |
| `/usuarios/desbloqueo`  | Usuarios ficticios, detalle y confirmación de desbloqueo                      |
| `/cuentas/saldo`        | Cuentas de prueba, captura efímera de cantidad y concepto                     |
| `/cuentas/eliminacion`  | Búsqueda por teléfono enmascarado y confirmación de eliminación simulada      |
| `/cuentas/autorizacion` | Filtros de estado, revisión, autorización y rechazo simulados                 |
| `/logs/apis`            | Método, código HTTP y fecha, detalle con pestañas y JSON preparado            |

## Compartir con Git

El repositorio utiliza la rama `main`. Se versionan `src`, la configuración, `package.json` y `package-lock.json`. Se excluyen `node_modules`, `dist`, `.angular`, cachés, registros, ajustes locales del editor y archivos `.env`.

Quien clone el repositorio debe ejecutar `npm ci` y después `npm start`. No es necesario subir las dependencias ni la compilación.

Para publicarlo, crea un repositorio remoto vacío, agrega su URL como remoto `origin` y ejecuta `git push -u origin main` después de crear el primer commit si todavía no existe.

## Estructura

- `src/app/core/layout/app-shell`, `app-header` y `app-sidebar`: cada componente de layout en su carpeta.
- `src/app/features/dashboard/dashboard-page`: pantalla del resumen.
- `src/app/features/dashboard/components`: gráficas, cada una en su carpeta.
- `src/app/features/modules/module-page`: composición de los seis módulos de gestión usando definiciones tipadas.
- `src/app/shared/components`: componentes de presentación, cada uno en su carpeta.
- `src/app/shared`: modelos, navegación y servicio de notificaciones.
- `src/app/mocks`: fixtures deterministas por dominio y configuración de tablas.
- `src/styles.css`: tokens y primitivas reutilizables de Tailwind.

Todo componente se ubica en una carpeta con su nombre, incluidos iconos y badges. Sus archivos relacionados permanecen juntos. Los componentes tienen TypeScript, HTML y CSS separados, salvo las plantillas diminutas de iconos y badges. Al agregar componentes, conserva esta convención y actualiza sus imports, rutas diferidas y referencias de estilos.

El estado visual utiliza Signals; los eventos del Router se escuchan con limpieza automática. Los diálogos nativos proporcionan foco contenido, cierre con Escape y devolución del foco al control que los abrió.

## Alcance de la demostración

No hay backend, HTTP, autenticación, persistencia ni operaciones reales. Las confirmaciones únicamente cierran el diálogo y muestran «Acción simulada; no se realizó ningún cambio». Los saldos, usuarios, permisos y cuentas permanecen intactos. La vista de contenido desencriptado muestra dos cadenas preparadas y no utiliza criptografía. El botón de copiar solo copia el ejemplo mock.

Las métricas globales representan un conjunto ficticio amplio; los listados presentan una muestra reducida para explorar la interfaz. Las fechas y notificaciones son ejemplos fijos. El control de luna informa del tema oscuro; no se incluye tema claro.

## Validación

- Compilación de producción comprobada.
- Navegación por las siete rutas y acciones principales comprobadas en navegador.
- Búsqueda, filtros, paginación, estado vacío, cierre con Escape y foco de diálogo comprobados.
- Simulaciones de saldo, eliminación, desbloqueo y autorización comprobadas sin alterar los registros.
- Vista móvil a 375 px, navegación lateral y detalle de dispositivo comprobados; revisión adicional en tablet.
- Dependencias verificadas con `npm audit` sin vulnerabilidades al preparar la entrega.

Para una nueva instalación, usa Node 24.15 o superior compatible con Angular 22. La dependencia local de Node permite también ejecutar los scripts del proyecto en este equipo.
