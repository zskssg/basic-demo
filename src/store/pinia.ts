import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


//  It's doable
// export default function () {
//   const pinia = createPinia()
//   pinia.use(piniaPluginPersistedstate)
//   return pinia
// }

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
export default pinia
