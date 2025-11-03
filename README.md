# Tic Tac Toe - Prueba Técnica

Juego interactivo de Tic Tac Toe (Tres en Raya) desarrollado con tecnologías web vanilla, siguiendo las especificaciones de diseño de Adobe XD.

## Características

### Funcionalidades Principales
- **Dos modos de juego:**
  - Persona vs Persona (multijugador local)
  - Persona vs CPU (con inteligencia artificial)
- **Sistema de puntuación persistente**
- **Detección de victorias** en todas direcciones (horizontal, vertical, diagonal)
- **Manejo de empates**
- **Historial de partidas** por jugador
- **Guardado automático de partidas incompletas**
- **Diseño responsive** para Desktop, Tablet y Mobile

### Características Adicionales
- Sistema de audio con música de fondo y efectos de sonido
- Animaciones fluidas y transiciones suaves
- Cambio de símbolos entre jugadores
- Persistencia de datos con LocalStorage
- Historial individualizado por jugador
- Diseño fiel a especificaciones de Adobe XD

## Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos y responsive design
- **JavaScript ES6+** - Lógica del juego (Vanilla JS, sin frameworks)

## Estructura del Proyecto

```
prueba_tecnica_popular/
├── index.html
├── README.md
├── styles/
│   ├── base.css
│   ├── loading.css
│   ├── mode-selection.css
│   ├── name-form.css
│   ├── game-screen.css
│   ├── game-board.css
│   ├── modals.css
│   ├── history-modal.css
│   ├── audio-modal.css
│   ├── responsive-tablet.css
│   ├── responsive-mobile.css
│   └── responsive-small.css
├── scripts/
│   ├── index.js
│   ├── game/
│   │   └── gameLogic.js
│   ├── screens/
│   │   ├── loadingScreen.js
│   │   ├── selectModeScreen.js
│   │   ├── nameFormScreen.js
│   │   └── gameScreen.js
│   └── utils/
│       ├── screenManager.js
│       ├── modalManager.js
│       ├── historyManager.js
│       ├── storageManager.js
│       ├── audioManager.js
│       └── animationManager.js
└── assets/
    ├── backgrounds/
    │   ├── Back.png
    │   ├── Backtablet.png
    │   ├── Backiphone.png
    │   └── modals/
    ├── fonts/
    │   └── Roboto/
    ├── game_icons/
    │   ├── back_icon.svg
    │   ├── rollback_icon.svg
    │   ├── music_icon.png
    │   ├── sound_icon.png
    │   ├── history_icon.png
    │   ├── player_icon_x.svg
    │   ├── player_icon_o.svg
    │   ├── move_icon_x.svg
    │   ├── move_icon_o.svg
    │   ├── tie_icon.svg
    │   └── modals/
    ├── icons/
    │   └── favicon.ico
    └── song/
        ├── background.mp3
        ├── start.mp3
        ├── place.wav
        ├── win.wav
        ├── draw.wav
        └── click.wav
```

## Instrucciones de Uso

### Instalación Local

1. Clona o descarga el repositorio
2. Abre `index.html` en tu navegador
3. ¡Disfruta del juego!

**Nota:** El proyecto no requiere instalación de dependencias ni servidor, funciona directamente desde el navegador.

### Uso con Live Server (Recomendado)

Para mejor experiencia con las rutas de assets:

```bash
# Si usas VS Code con Live Server
# Click derecho en index.html > "Open with Live Server"
```

## Cómo Jugar

1. **Selecciona el modo de juego:**
   - Jugador vs CPU
   - Jugador vs Jugador

2. **Ingresa el nombre de los jugadores**

3. **Juega:**
   - Haz clic en las celdas vacías para colocar tu símbolo
   - Completa 3 símbolos en línea (horizontal, vertical o diagonal)
   - Gana puntos por cada victoria
   - ¡El primero en completar 3 en línea gana el round!

4. **Funciones adicionales:**
   - Cambiar símbolos entre jugadores
   - Controlar música y efectos de sonido
   - Ver historial de partidas
   - Reiniciar el juego

## Responsive Design

El juego se adapta perfectamente a:

- **Desktop** (>1024px)
- **Tablet** (768px - 1024px)
- **Mobile** (<768px)

## Persistencia de Datos

El juego guarda automáticamente:
- ✅ Puntuaciones entre sesiones
- ✅ Historial de partidas por jugador
- ✅ Preferencias de audio (música/efectos)
- ✅ **Estado de partidas en progreso**
  - Cada movimiento actualiza el estado guardado
  - Tablero completo con todas las jugadas
  - Turno del jugador actual
  - Puntuación acumulada
  - Símbolos asignados (X/O)
  
### 🎮 Cómo Funciona el Sistema de Guardado

**Guardado Automático:**
- Cada vez que haces un movimiento, el estado se guarda automáticamente
- Si cierras el navegador, tu partida queda guardada
- **NO se carga automáticamente** al volver a entrar

**Reanudar Partida:**
1. Abre el **Historial** desde el botón en el panel de acciones
2. Si tienes una partida sin terminar, aparecerá en la sección **"PARTIDA EN CURSO"**
3. Verás el número de movimientos realizados y la fecha
4. Haz clic en el botón **"REANUDAR"** (color dorado 🧡)
5. La partida se cargará exactamente donde la dejaste
6. ¡La IA continuará jugando correctamente desde ese punto!

**Características:**
- ✅ Solo se puede tener una partida en progreso a la vez por jugador
- ✅ Al completar una partida, el guardado automático se elimina
- ✅ La IA retoma correctamente su contexto (símbolos, turno, tablero)
- ✅ Compatible con modo CPU y Jugador vs Jugador
- ✅ Las estadísticas se mantienen actualizadas

**Preferencias de Audio:**
- 🎵 Al entrar por primera vez, se pregunta si deseas música y sonidos
- La preferencia se guarda y **NO se vuelve a preguntar**
- Puedes cambiarla en cualquier momento desde los controles del juego

## Diseño

Diseño basado en las especificaciones de Adobe XD:
- [Ver diseño original](https://xd.adobe.com/view/0ef796ad-a0a8-4261-b1e0-c39b2f8d5716-5ba4/specs/)

**Paleta de colores:**
- Azul: `#2AB4FD`
- Naranja: `#EE9200`
- Fondo: Azul oscuro `#0A193C`

**Tipografía:**
- Roboto Regular (400)
- Roboto Bold (700)

## Testing

El juego ha sido probado en:
- Chrome (última versión)
- Firefox (última versión)
- Safari (última versión)
- Edge (última versión)

## Requisitos Cumplidos

- HTML, CSS y JavaScript puro (sin frameworks)
- Diseño responsive
- Selección de contrincante (Persona/CPU)
- Sistema de puntuación
- Detección de victorias y empates
- Persistencia de datos
- Diseño según Adobe XD
- Bonus: Rotación de jugadores
- Bonus: Animaciones
- Bonus: Efectos de sonido
- Bonus: Historial de partidas
- Bonus: Guardado automático de partidas

## Autor

Desarrollado por Francisco Daniel Castro Borrome como prueba técnica para demostrar habilidades en desarrollo web frontend con JavaScript vanilla.

## Licencia

Este proyecto fue desarrollado como prueba técnica. Todos los derechos reservados.

---

**Nota:** Este proyecto fue desarrollado sin usar frameworks o librerías externas, utilizando únicamente HTML5, CSS3 y JavaScript ES6+ vanilla, cumpliendo con todos los requisitos técnicos especificados.
