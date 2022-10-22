<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import menu from '@/menu.js'
import NavBar from '@/components/NavBar.vue'
import AsideMenu from '@/components/AsideMenu.vue'
import FooterBar from '@/components/FooterBar.vue'
import Overlay from '@/components/Overlay.vue'

const store = useStore()
const route = useRoute()

store.commit('user', {
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&options[accessoriesChance]=93'
})

const isAsideLgActive = computed(() => store.state.isAsideLgActive)

const overlayClick = () => {
  store.dispatch('asideLgToggle', false)
}

const isLoginView = computed(() => {
   return route.name === 'login' ? true : false
})

</script>

<template>
  <nav-bar v-show="!isLoginView" />
  <aside-menu v-show="!isLoginView" :menu="menu" />
  <router-view />
  <footer-bar v-show="!isLoginView" />
  <overlay
    v-show="isAsideLgActive"
    z-index="z-30"
    @overlay-click="overlayClick"
  />
</template>
