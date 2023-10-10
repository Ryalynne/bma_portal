import { openDB } from 'idb'

const dbName = 'bma-database'
const storeName = 'store/database'

const dbPromise = openDB(dbName, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(storeName)) {
      db.createObjectStore(storeName)
    }
  }
})

export default dbPromise

async function getData(key) {
  const db = await dbPromise
  const tx = db.transaction(storeName, 'readonly')
  const store = tx.objectStore(storeName)
  return store.get(key)
}

async function putData(key, value) {
  const db = await dbPromise
  console.log('jsson save')
  const tx = db.transaction(storeName, 'readwrite')
  const store = tx.objectStore(storeName)
  store.put(value, key)
  return tx.complete
}