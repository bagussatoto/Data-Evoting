import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import http from '@/helper/http'
import { darkModeKey } from '@/config.js'

import './css/main.css'

/* Fetch sample data */
store.dispatch('fetch', 'clients')
store.dispatch('fetch', 'history')

/* Dark mode */
const localStorageDarkModeValue = localStorage.getItem(darkModeKey)

if ((localStorageDarkModeValue === null && window.matchMedia('(prefers-color-scheme: dark)').matches) || localStorageDarkModeValue === '1') {
  store.dispatch('darkMode')
}

/* Default title tag */
const defaultDocumentTitle = 'Admin Electronic Vote System HIMA TI Polihasnur'

//Navigation Guard
router.beforeEach((to, next) => {
   /* Collapse mobile aside menu on route change */
   store.dispatch('asideMobileToggle', false)
   store.dispatch('asideLgToggle', false)
   
	http.get('auth', (data, response = true) => {
		//Auth token success
		//alert(JSON.stringify(data))
		if (response && to.name !== 'login') next()
		else router.push({ name: 'login' }) //Fail 
	})
})

router.afterEach(to => {
  /* Set document title from route meta */
  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title} — ${defaultDocumentTitle}`
  } else {
    document.title = defaultDocumentTitle
  }

  /* Full screen mode */
  store.dispatch('fullScreenToggle', !!to.meta.fullScreen)
})

createApp(App).use(store).use(router).mount('#app')
