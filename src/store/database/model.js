import dbPromise from './index.js'
const storeName = 'store/database'

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