export type Category =
  | 'DESERTAI'
  | 'GARNYRAI'
  | 'GARNYRAI_MOKAMI'
  | 'GĖRIMAI'
  | 'KARŠTI_BULVINIAI'
  | 'KARŠTI_JAUTIENA'
  | 'KARŠTI_KIAULIENA'
  | 'KARŠTI_VIŠTIENA'
  | 'KARŠTI_ŽUVIS'
  | 'KITI'
  | 'SRIUBOS';

export interface Dish {
  id: string;
  name: string;
  category: Category;
  price: number;
}

export interface DailyMenuItem {
  dishId: string;
  available: boolean;
}

export interface DailyMenu {
  id: string;
  date: string;
  items: DailyMenuItem[];
} 