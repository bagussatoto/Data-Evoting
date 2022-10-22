<script setup>
import { ref, onMounted, computed } from 'vue'
import { mdiAccountGroup, mdiReload, mdiInformation } from '@mdi/js'
import DataTables from '@/components/DataTables.vue'
import MainSection from '@/components/MainSection.vue'
import Notification from '@/components/Notification.vue'
import CandidatesTable from '@/components/CandidatesTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import BottomOtherPagesSection from '@/components/BottomOtherPagesSection.vue'
import TitleSubBar from '@/components/TitleSubBar.vue'
import http from '@/helper/http.js'

const titleStack = ref(['Admin', 'Pasangan Calon'])

//Get data from API
const candidates = ref([])
const getCandidates = () => {
   http.get('candidates', (data, status) => {
      if (status) candidates.value = data.response.candidates
   })
}

//Get err 
const err = computed(() => store.state.errorFromServer)

//Notification handler
const showNotif = ref(false)
const textNotif = ref('')
const colorNotif = ref('')

const updateSuccess = () => {
   getCandidates()
   showNotif.value = true
   textNotif.value = 'Update data success'
   colorNotif.value = 'info'
}

const updateFail = () => {
   showNotif.value = true
   textNotif.value = err.value
   colorNotif.value = 'warning'
}

const deleteSuccess = () => {
   getCandidates()
   showNotif.value = true
   textNotif.value = 'Delete data success'
   colorNotif.value = 'info'
}

const deleteFail = () => {
   showNotif.value = true
   textNotif.value = err.value
   colorNotif.value = 'warning'
}


onMounted(() => {
   getCandidates()
})

</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Kandidat Calon Ketua dan Wakil Ketua Umum</hero-bar>
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
       <candidates-table
         v-on:update-success="updateSuccess()"
         v-on:update-fail="updateFail"
         v-on:delete-success="deleteSuccess()"
         v-on:delete-fail="deleteFail()"
         checkable :fields="candidates" />
    </card-component>
  </main-section>
</template>
