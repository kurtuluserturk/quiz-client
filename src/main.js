import { createSSRApp } from 'vue'
import App from './App.vue'

export function createApp() {
  // we use createSSRApp to render the Vue App on the server
  // and send it to the user to do the hydration process
  const app = createSSRApp(App)
  return { 
    app
   }
 }
