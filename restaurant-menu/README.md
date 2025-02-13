# Restorano Dienos Meniu Sistema

Ši sistema leidžia valdyti restorano dienos meniu ir rodyti jį TV ekrane. Sistema sukurta naudojant React, TypeScript, Material-UI ir Firebase.

## Funkcijos

- Administratoriaus sąsaja patiekalų valdymui
- TV ekrano rodinys klientams
- Realaus laiko atnaujinimai
- Patiekalų prieinamumo valdymas
- Kategorijų sistema

## Reikalavimai

- Node.js (v14 arba naujesnė versija)
- NPM (v6 arba naujesnė versija)
- Firebase projektas

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

3. Sukurkite Firebase projektą:
   - Eikite į [Firebase Console](https://console.firebase.google.com/)
   - Sukurkite naują projektą
   - Įjunkite Firestore duomenų bazę
   - Sukurkite žiniatinklio programą
   - Nukopijuokite Firebase konfigūraciją

4. Sukurkite `.env` failą projekto šakniniame kataloge ir įdėkite savo Firebase konfigūraciją:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

5. Atnaujinkite Firebase konfigūraciją faile `src/firebase.ts`

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
- Pasirinkite patiekalus dienos meniu
- Pažymėkite patiekalus kaip neprieinamus
- Valdykite visą dienos meniu

### TV ekranas
- Rodo aktyvų dienos meniu
- Automatiškai atnaujinama kai administratorius atlieka pakeitimus
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
