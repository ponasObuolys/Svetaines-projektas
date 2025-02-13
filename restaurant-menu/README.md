# Restorano Dienos Meniu Sistema

Ši sistema leidžia valdyti restorano dienos meniu ir rodyti jį TV ekrane. Sistema sukurta naudojant React, TypeScript ir Material-UI.

## Funkcijos

- Administratoriaus sąsaja patiekalų valdymui
- TV ekrano rodinys klientams
- Patiekalų prieinamumo valdymas
- Kategorijų sistema
- Paprastas autentifikavimas

## Reikalavimai

- Node.js (v14 arba naujesnė versija)
- NPM (v6 arba naujesnė versija)

## Diegimas

1. Klonuokite repozitoriją:
```bash
git clone [repository-url]
cd restaurant-menu
```

2. Įdiekite priklausomybes:
```bash
npm install
```

## Paleidimas

1. Paleiskite vystymo serverį:
```bash
npm run dev
```

2. Atidarykite naršyklę:
   - Administratoriaus sąsaja: `http://localhost:5173/admin`
   - TV ekranas: `http://localhost:5173/tv`

## Naudojimas

### Administratoriaus sąsaja
- Prisijungimo duomenys:
  - Vartotojo vardas: `admin`
  - Slaptažodis: `admin123`
- Pasirinkite patiekalus dienos meniu
- Pažymėkite patiekalus kaip neprieinamus
- Valdykite visą dienos meniu

### TV ekranas
- Rodo aktyvų dienos meniu
- Automatiškai atnaujinama kas 5 sekundes
- Neprieinami patiekalai rodomi perbraukti

## Pagalba

Jei turite klausimų ar problemų, susisiekite su mumis:
- El. paštas: [jūsų el. paštas]
- Tel.: [jūsų telefono numeris]

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
