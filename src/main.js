import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import Atlas from '@vectopus/atlas-icons-vue'

const app = createApp(App)

// app.use(Atlas);
app.use(router)

app.mount('#app')
