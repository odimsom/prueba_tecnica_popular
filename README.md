# 🎮 Tic Tac Toe - Prueba Técnica

Juego interactivo de Tic Tac Toe (Tres en Raya) desarrollado con tecnologías web vanilla, siguiendo las especificaciones de diseño de Adobe XD.

## Características

### ✨ Funcionalidades Principales
- **Dos modos de juego:**
  - Persona vs Persona (multijugador local)
  - Persona vs CPU (con inteligencia artificial)
- **Sistema de puntuación persistente**
- **Detección de victorias** en todas direcciones (horizontal, vertical, diagonal)
- **Manejo de empates**
- **Historial de partidas** por jugador
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
├── styles/
│   └── style.css
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
│       ├── audioManager.js
│       └── animationManager.js
└── assets/
    ├── backgrounds/
    ├── fonts/
    ├── game_icons/
    └── song/
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
- ✅ Chrome (última versión)
- ✅ Firefox (última versión)
- ✅ Safari (última versión)
- ✅ Edge (última versión)

## Requisitos Cumplidos

- ✅ HTML, CSS y JavaScript puro (sin frameworks)
- ✅ Diseño responsive
- ✅ Selección de contrincante (Persona/CPU)
- ✅ Sistema de puntuación
- ✅ Detección de victorias y empates
- ✅ Persistencia de datos
- ✅ Diseño según Adobe XD
- ⭐ Bonus: Rotación de jugadores
- ⭐ Bonus: Animaciones
- ⭐ Bonus: Efectos de sonido
- ⭐ Bonus: Historial de partidas

## Autor

Desarrollado por Francisco Daniel Castro Borrome como prueba técnica para demostrar habilidades en desarrollo web frontend con JavaScript vanilla.

## Licencia

Este proyecto fue desarrollado como prueba técnica. Todos los derechos reservados.

---

**Nota:** Este proyecto fue desarrollado sin usar frameworks o librerías externas, utilizando únicamente HTML5, CSS3 y JavaScript ES6+ vanilla, cumpliendo con todos los requisitos técnicos especificados.
