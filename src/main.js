import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import {authorize} from "@/firebase/config";

let app

authorize.onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App).use(router).mount('#app')
    }
})

