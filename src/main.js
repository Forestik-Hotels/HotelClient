import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import GSignInButton from 'vue-google-signin-button'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/main.css'
//
// Vue.config.productionTip = false
// import GoogleAuth from 'vue-google-auth'

new Vue({
    router,
    // GSignInButton,
    render: h => h(App),
}).$mount('#app')

//
// Vue.use(GoogleAuth, { client_id: '953128976338-aps8nh9i79cmqgv9m29h3bcd4r9tpbuh.apps.googleusercontent.com' })
// Vue.googleAuth().load()
