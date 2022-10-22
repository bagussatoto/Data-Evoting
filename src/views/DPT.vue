<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { mdiAccountGroup, mdiReload, mdiInformation } from '@mdi/js'
import DataTables from '@/components/DataTables.vue'
import MainSection from '@/components/MainSection.vue'
import Notification from '@/components/Notification.vue'
import ClientsTable from '@/components/ClientsTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import BottomOtherPagesSection from '@/components/BottomOtherPagesSection.vue'
import TitleSubBar from '@/components/TitleSubBar.vue'
import http from '@/helper/http.js'

const titleStack = ref(['Admin', 'DPT'])

const store = useStore()
//Get data accounts to API
const users = ref([])

const getAccounts = () => {
   http.get('admin/accounts', (data, status) => {
      if (status) users.value = data.response.accounts
   })
}
//Get errorFromServer
const err = computed(() => store.state.errorFromServer)

//Notification handler
const showNotif = ref(false)
const textNotif = ref('')
const colorNotif = ref('')

const updateSuccess = () => {
   getAccounts()
   showNotif.value = true
   textNotif.value = 'Update data success'
   colorNotif.value = 'info'
}

const deleteSuccess = () => {
   getAccounts()
   showNotif.value = true
   textNotif.value = 'Delete data success'
   colorNotif.value = 'info'
}

const updateFail = () => {
   showNotif.value = true
   textNotif.value = err.value
   colorNotif.value = 'warning'
}

const deleteFail = () => {
   showNotif.value = true
   textNotif.value = err.value
   colorNotif.value = 'warning'
}

onMounted(() => {
   getAccounts()
})

</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Daftar Pemilih Tetap</hero-bar>
  <main-section>
     <Notification 
      v-on:close="showNotif = false"
      v-if="showNotif"
      :color="colorNotif"
      :icon="mdiInformation">
        {{ textNotif }}
     </Notification>
  <card-component
      class="mb-6"
      has-table
    >
       <clients-table 
         v-on:update-fail="updateFail()" 
         v-on:update-success="updateSuccess()"
         v-on:delete-success="deleteSuccess()"
         v-on:delete-fail="deleteFail()"
         :fields="users" />
    </card-component>
  </main-section>
</template>
