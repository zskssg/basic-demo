
import { useStore } from '@/store/index'
import pinia from './../store/pinia';

// const store = useStore(pinia())
const store = useStore(pinia)

function getStore1() {
  //  Use store to do something
  return store
}

export {
  getStore1
}