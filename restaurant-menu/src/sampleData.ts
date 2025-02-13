import { Dish } from './types';

// Tuščias patiekalų sąrašas - reikia užpildyti tikrais patiekalais
export const sampleDishes: Dish[] = [
  // SRIUBOS
  { id: 'soup-1', name: 'Žirnių sriuba', category: 'SRIUBOS', price: 1.70 },
  { id: 'soup-2', name: 'Žuvienė', category: 'SRIUBOS', price: 1.70 },
  { id: 'soup-3', name: 'Aštri sriuba', category: 'SRIUBOS', price: 2.20 },
  { id: 'soup-4', name: 'Trinta grybų sriuba', category: 'SRIUBOS', price: 2.20 },
  { id: 'soup-5', name: 'Šaltibarščiai su bulvėmis', category: 'SRIUBOS', price: 2.70 },
  { id: 'soup-6', name: 'Agurkinė', category: 'SRIUBOS', price: 1.70 },
  { id: 'soup-7', name: 'Trinta moliūgų sriuba', category: 'SRIUBOS', price: 2.20 },

  // KARŠTI BULVINIAI
  { id: 'potato-1', name: 'Įdaryti rageliai grybais ir šonine', category: 'KARŠTI_BULVINIAI', price: 4.00 },
  { id: 'potato-2', name: 'Didžkukuliai su mėsa', category: 'KARŠTI_BULVINIAI', price: 4.80 },
  { id: 'potato-3', name: 'Didžkukuliai su varške', category: 'KARŠTI_BULVINIAI', price: 4.80 },
  { id: 'potato-4', name: 'Žemaičių blynai su mėsa', category: 'KARŠTI_BULVINIAI', price: 5.70 },
  { id: 'potato-5', name: 'Gruzdinti cepelinai su mėsa', category: 'KARŠTI_BULVINIAI', price: 5.90 },
  { id: 'potato-6', name: 'Gruzdinti cepelinai su varške', category: 'KARŠTI_BULVINIAI', price: 5.90 },
  { id: 'potato-7', name: 'Cepelinai su mėsa', category: 'KARŠTI_BULVINIAI', price: 5.90 },
  { id: 'potato-8', name: 'Cepelinai su varške', category: 'KARŠTI_BULVINIAI', price: 5.90 },
  { id: 'potato-9', name: 'Švilpikai', category: 'KARŠTI_BULVINIAI', price: 4.40 },
  { id: 'potato-10', name: 'Plokštainis', category: 'KARŠTI_BULVINIAI', price: 4.80 },
  { id: 'potato-11', name: 'Vėdarai', category: 'KARŠTI_BULVINIAI', price: 5.00 },
  { id: 'potato-12', name: 'Gruzdintas plokštainis su ausytėmis', category: 'KARŠTI_BULVINIAI', price: 5.50 },

  // JAUTIENA
  { id: 'beef-1', name: 'Kukuliai daržovių padaže', category: 'KARŠTI_JAUTIENA', price: 6.30 },
  { id: 'beef-2', name: 'Lazanija', category: 'KARŠTI_JAUTIENA', price: 6.50 },
  { id: 'beef-3', name: 'Troškinys su kepintais svogūnais', category: 'KARŠTI_JAUTIENA', price: 7.60 },
  { id: 'beef-4', name: 'Bifšteksas', category: 'KARŠTI_JAUTIENA', price: 6.50 },
  { id: 'beef-5', name: 'Befstrogenas', category: 'KARŠTI_JAUTIENA', price: 7.60 },

  // KIAULIENA
  { id: 'pork-1', name: 'Balandėliai', category: 'KARŠTI_KIAULIENA', price: 7.00 },
  { id: 'pork-2', name: 'Šnicelis', category: 'KARŠTI_KIAULIENA', price: 5.40 },
  { id: 'pork-3', name: 'Naminis maltinis baltame padaže', category: 'KARŠTI_KIAULIENA', price: 5.60 },
  { id: 'pork-4', name: 'Kepsnys', category: 'KARŠTI_KIAULIENA', price: 5.90 },
  { id: 'pork-5', name: 'Kepsnys su grybais', category: 'KARŠTI_KIAULIENA', price: 6.50 },
  { id: 'pork-6', name: 'Suktinukas įdarytas grybais traškia plutele', category: 'KARŠTI_KIAULIENA', price: 6.50 },
  { id: 'pork-7', name: 'Suktinis įdarytas saulėje džiovintais pomidorais', category: 'KARŠTI_KIAULIENA', price: 6.50 },
  { id: 'pork-8', name: 'Plovas', category: 'KARŠTI_KIAULIENA', price: 6.50 },
  { id: 'pork-9', name: 'Kiauliena kinietiškai', category: 'KARŠTI_KIAULIENA', price: 6.50 },
  { id: 'pork-10', name: 'Šoninė su krienais', category: 'KARŠTI_KIAULIENA', price: 7.40 },
  { id: 'pork-11', name: 'Sprandinė BBQ', category: 'KARŠTI_KIAULIENA', price: 7.90 },
  { id: 'pork-12', name: 'Maltinukai grietinės ir pomidorų padaže', category: 'KARŠTI_KIAULIENA', price: 5.40 },
  { id: 'pork-13', name: 'Šonkauliukai BBQ', category: 'KARŠTI_KIAULIENA', price: 7.90 },
  { id: 'pork-14', name: 'Sprandinės kepsnys', category: 'KARŠTI_KIAULIENA', price: 7.90 },

  // VIŠTIENA
  { id: 'chicken-1', name: 'Zrazai įdaryti grybais, baltame padaže', category: 'KARŠTI_VIŠTIENA', price: 5.40 },
  { id: 'chicken-2', name: 'Maltinis daržovių ir sūrio padaže', category: 'KARŠTI_VIŠTIENA', price: 5.60 },
  { id: 'chicken-3', name: 'Kepsnys', category: 'KARŠTI_VIŠTIENA', price: 5.90 },
  { id: 'chicken-4', name: 'Grill krūtinėlė', category: 'KARŠTI_VIŠTIENA', price: 6.30 },
  { id: 'chicken-5', name: 'Kepsnys su grybų padažu', category: 'KARŠTI_VIŠTIENA', price: 6.50 },
  { id: 'chicken-6', name: 'Suktinukas įdarytas feta', category: 'KARŠTI_VIŠTIENA', price: 6.50 },
  { id: 'chicken-7', name: 'Troškinys su daržovėmis', category: 'KARŠTI_VIŠTIENA', price: 6.50 },
  { id: 'chicken-8', name: 'Kijevo kotletas', category: 'KARŠTI_VIŠTIENA', price: 7.00 },
  { id: 'chicken-9', name: 'Kišenėlė su varške ir šonine', category: 'KARŠTI_VIŠTIENA', price: 7.00 },
  { id: 'chicken-10', name: 'Vištiena teriyaki', category: 'KARŠTI_VIŠTIENA', price: 6.40 },
  { id: 'chicken-11', name: 'Troškinys su moliūgais', category: 'KARŠTI_VIŠTIENA', price: 6.50 },
  { id: 'chicken-12', name: 'Kišenėlė su morkomis ir šonine', category: 'KARŠTI_VIŠTIENA', price: 7.00 },

  // ŽUVIS
  { id: 'fish-1', name: 'Žuvies šnicelis', category: 'KARŠTI_ŽUVIS', price: 6.50 },
  { id: 'fish-2', name: 'Upėtakio kepsnys', category: 'KARŠTI_ŽUVIS', price: 7.30 },
  { id: 'fish-3', name: 'Maltinukai špinatų padaže', category: 'KARŠTI_ŽUVIS', price: 5.90 },
  { id: 'fish-4', name: 'Žuvis kinietiškai', category: 'KARŠTI_ŽUVIS', price: 6.50 },

  // KITI
  { id: 'other-1', name: 'Silkė pataluose', category: 'KITI', price: 2.50 },
  { id: 'other-2', name: 'Silkė su grybais ir morkomis', category: 'KITI', price: 2.50 },
  { id: 'other-3', name: 'Žuvies užkandis su kepintomis daržovėmis', category: 'KITI', price: 3.20 },
  { id: 'other-4', name: 'Bulvytės frie', category: 'KITI', price: 3.50 },
  { id: 'other-5', name: 'Lietiniai su kumpiu', category: 'KITI', price: 4.20 },
  { id: 'other-6', name: 'Lietiniai su varške', category: 'KITI', price: 4.20 },
  { id: 'other-7', name: 'Lietiniai su bananais', category: 'KITI', price: 4.20 },
  { id: 'other-8', name: '"Chicken nuggets" kepsneliai su frie bulvytėmis', category: 'KITI', price: 5.00 },
  { id: 'other-9', name: 'Sūrio kepsnys', category: 'KITI', price: 5.90 },
  { id: 'other-10', name: 'Svetainės naminė duona', category: 'KITI', price: 5.00 },

  // DESERTAI
  { id: 'desert-1', name: 'Varškės apkepas', category: 'DESERTAI', price: 5.40 },
]; 