# Estructura de la aplicación

La aplicación se organiza por funcionalidad. `core` contiene piezas globales, `shared` contiene piezas reutilizables y cada carpeta de `features` agrupa lo específico de un módulo.

```text
src/
  environments/
  app/
    core/
      config/
      guards/
      interceptors/
      layout/
        app-header/
        app-shell/
        app-sidebar/
      providers/
      services/
      tokens/
    shared/
      components/
        nombre-componente/
      constants/
      directives/
      models/
      pipes/
      types/
      utils/
      validators/
    features/
      dashboard/
        dashboard-page/
        components/
        models/
        services/
        state/
        mocks/
      devices/
      users/
      accounts/
      api-logs/
      modules/
        module-page/
    mocks/
```

Las carpetas `devices`, `users`, `accounts` y `api-logs` tienen esta estructura preparada:

```text
nombre-funcionalidad/
  components/
  pages/
  entities/
  models/
  services/
  dtos/
  mappers/
  state/
  mocks/
```

## Qué colocar en cada carpeta

| Ubicación                      | Responsabilidad                                                                                                            |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `core/config`                  | Configuración global y navegación. Contiene `navigation.config.ts`.                                                        |
| `core/services`                | Servicios compartidos por toda la aplicación. Contiene el servicio de notificaciones `ui.service.ts`.                      |
| `core/layout`                  | Encabezado, shell y navegación, cada componente en su carpeta.                                                             |
| `core/guards`                  | Futuros guards de navegación, si el alcance incorpora control de rutas.                                                    |
| `core/interceptors`            | Futuros interceptores HTTP, únicamente cuando se implemente una integración real.                                          |
| `core/providers`               | Funciones o conjuntos reutilizables de proveedores de inyección.                                                           |
| `core/tokens`                  | Tokens de inyección y contratos de configuración. Los tokens visuales siguen en `styles.css`.                              |
| `shared/components`            | Componentes de presentación reutilizados entre funcionalidades.                                                            |
| `shared/models`                | Interfaces de presentación y contratos compartidos. Contiene los tipos actuales en `app.models.ts`.                        |
| `shared/types`                 | Tipos utilitarios compartidos que no representan entidades de una funcionalidad.                                           |
| `shared/constants`             | Constantes reutilizables entre módulos.                                                                                    |
| `shared/directives`            | Directivas reutilizables.                                                                                                  |
| `shared/pipes`                 | Pipes reutilizables para presentación.                                                                                     |
| `shared/utils`                 | Funciones puras y pequeñas, sin estado ni dependencia de componentes.                                                      |
| `shared/validators`            | Validadores reutilizables de formularios.                                                                                  |
| `features/<módulo>/pages`      | Pantallas que coordinan componentes y estado de la funcionalidad.                                                          |
| `features/<módulo>/components` | Componentes exclusivos de esa funcionalidad.                                                                               |
| `features/<módulo>/entities`   | Entidades del dominio, por ejemplo un dispositivo o una cuenta. No deben depender de Angular ni de formatos de transporte. |
| `features/<módulo>/models`     | Modelos de vista, filtros, formularios y parámetros específicos de la interfaz.                                            |
| `features/<módulo>/services`   | Servicios exclusivos del módulo.                                                                                           |
| `features/<módulo>/dtos`       | Contratos de entrada y salida de futuras integraciones.                                                                    |
| `features/<módulo>/mappers`    | Funciones que convierten DTOs, entidades y modelos de vista cuando sus estructuras difieren.                               |
| `features/<módulo>/state`      | Estado compartido entre pantallas o componentes del mismo módulo. El estado local permanece junto a su componente.         |
| `features/<módulo>/mocks`      | Fixtures específicos del módulo.                                                                                           |
| `environments`                 | Futura configuración pública por entorno. Ningún valor enviado al navegador debe considerarse secreto.                     |

## Convenciones

- Todo componente tiene una carpeta con su nombre y sus archivos relacionados juntos, incluso si es diminuto.
- Usa nombres por responsabilidad: `device.entity.ts`, `device.dto.ts`, `device-filter.model.ts`, `device.mapper.ts`, `device.service.ts` y `device.state.ts`.
- `shared` no importa desde `features`. Las funcionalidades pueden importar desde `shared` y `core`.
- Una funcionalidad no importa detalles internos de otra. Si aparece una necesidad de reutilización real, identifica primero el contrato compartido.
- Evita crear clases, servicios o conversiones sin uso. Las carpetas preparadas no obligan a llenar todas las capas.
- Los `.gitkeep` permiten conservar las carpetas vacías en Git. Retíralos cuando agregues el primer archivo real a cada carpeta.
- Las pruebas de un componente o servicio deben permanecer junto al archivo que verifican.

## Situación actual de la maqueta

La interfaz sigue usando `features/modules/module-page` para componer los seis módulos de gestión y `app/mocks` para sus datos deterministas. Las carpetas de dominio están reservadas para su evolución; no contienen pantallas alternativas ni lógica duplicada.

Los tipos actuales permanecen agrupados en `shared/models/app.models.ts`, incluidos los contratos de los fixtures. Cuando una funcionalidad se implemente de forma independiente, sus entidades específicas podrán trasladarse a `features/<módulo>/entities` y sus tipos de presentación a `models`, actualizando sus imports.

Esta preparación no incorpora backend, peticiones HTTP, guards funcionales, autenticación ni operaciones reales. Las carpetas reservadas no se registran en los proveedores ni cambian la ejecución de la aplicación.
