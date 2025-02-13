import { collection, writeBatch, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { sampleDishes } from '../sampleData';

export const initializeFirebaseData = async () => {
  try {
    const batch = writeBatch(db);
    const dishesRef = collection(db, 'dishes');

    sampleDishes.forEach((dish) => {
      const docRef = doc(dishesRef, dish.id);
      batch.set(docRef, dish);
    });

    await batch.commit();
    console.log('Sample data successfully initialized in Firebase');
  } catch (error) {
    console.error('Error initializing sample data:', error);
  }
}; 