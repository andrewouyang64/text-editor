import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, content) => {
  
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const result = await store.put({ id: id, text: content });
  console.log('🚀 - data saved to the database', result);
  return result;
};

// TODO: Add logic for a method that gets all the content from the database
export const getAllDb = async () => {
  console.log('GET all from the database');
  const todosDb = await openDB('jate', 1);
  const tx = todosDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const result = await store.getAll();
  console.log('result.value', result);
  return result;
};


initdb();
