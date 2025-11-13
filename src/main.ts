
import { createApp, markRaw, useAttrs } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import "./config/app.config"
import Datatable from "@/config/datatable.config"
import configFormKit from  "@/config/formKit.config"
import { plugin as pluginFormKit, defaultConfig } from "@formkit/vue"

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import "./assets/scss/app.scss"

import { auth } from '@/config/firebase.config'

import tooltip from "@/directives/tooltip.js"
import truncate from "@/directives/truncate.js"

import Spinner from './components/loaders/Spinner.vue'
import Loader from './components/loaders/Section.vue'
import FormBackendError from './components/form/BackendError.vue'

import { createPinia } from 'pinia'

let app: null = null

auth.onAuthStateChanged(() => {
    if(!app) {
        const pinia = createPinia()

        pinia.use(({store}) => {
            store.router = markRaw(router)
        })
        
        const appCreated = createApp(App)
        appCreated.directive('tooltip',tooltip)
        appCreated.directive('text-truncate',truncate)
        
        appCreated.use(pinia)
        appCreated.use(router)
        appCreated.use(pluginFormKit, defaultConfig(configFormKit))
        
        appCreated.component('LoaderSpinner', Spinner)
        appCreated.component('LoaderSection', Loader)
        appCreated.component('BackendError', FormBackendError)
        appCreated.component('DataTable', Datatable)
        appCreated.component('v-select', vSelect)
        appCreated.component('FormDate', VueDatePicker)

        appCreated.mount('#app')
    }
})