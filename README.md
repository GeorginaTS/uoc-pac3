# Dragon Ball Character Browser

Aplicació web desenvolupada amb Vue 3 que permet explorar personatges de Dragon Ball, veure els seus detalls i simular combats entre ells.

## 🚀 Característiques

- **Llista de Personatges**: Visualitza tots els personatges amb scroll infinit (8 personatges per pàgina)
- **Detall del Personatge**: Consulta informació detallada de cada personatge (Ki, raça, afiliació, descripció)
- **Arena de Combat**: Simula combats entre Z Fighters i enemics
  - Selecciona un Z Fighter com a lluitador
  - Enemic aleatori seleccionat automàticament
  - Sistema de combat basat en Ki i Ki màxim
  - Registre detallat del combat amb dos atacs i resultat final
- **Pàgina About**: Informació del desenvolupador amb integració de perfil GitHub
- **Disseny Responsiu**: Interfície adaptada a diferents mides de pantalla
- **Tema Personalitzat**: Sistema de variables CSS per a colors i estils consistents

## 🛠️ Tecnologies

- **Vue 3** (Composition API amb `<script setup>`)
- **TypeScript** per a type safety
- **Vue Router** per a navegació
- **Pinia** per a gestió d'estat
- **Vite** com a build tool
- **Vitest** per a testing
- **ESLint** per a linting

## 📡 API

Utilitza la [Dragon Ball API](https://dragonball-api.com/api) per obtenir dades dels personatges.


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## 📂 Estructura del Projecte

```
src/
├── components/
│   ├── CharacterCard.vue    # Targeta de personatge
│   └── Header.vue            # Capçalera amb navegació
├── views/
│   ├── HomePage.vue          # Pàgina d'inici
│   ├── ListPage.vue          # Llista de personatges
│   ├── DetailPage.vue        # Detall del personatge
│   ├── CombatPage.vue        # Arena de combat
│   └── AboutPage.vue         # Sobre el desenvolupador
├── stores/
│   └── constants.ts          # Store de constants (API URL)
├── router/
│   └── index.ts              # Configuració de rutes
└── main.css                  # Estils globals i variables CSS
```

## 👤 Autor

Georgina Tomàs

- GitHub: [@GeorginaTS](https://github.com/GeorginaTS)
- LinkedIn: [Georgina Tomàs](https://www.linkedin.com/in/georgina-tomas/)
