import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import Amplify from 'aws-amplify'
// import awsconfig from './aws-exports'
// import '@aws-amplify/ui-vue/styles.css'

// Amplify.configure(awsconfig)

const app = createApp(App)
app.use(router)
app.mount('#app')