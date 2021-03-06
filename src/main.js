import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/main.css'

new Vue({
    router,
    // GSignInButton,
    render: h => h(App),
}).$mount('#app')

