<script setup>
import { ref, reactive, computed } from 'vue'
import { mdiAccountGroup, mdiContentSaveMoveOutline, mdiInformation } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import Notification from '@/components/Notification.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import TitleSubBar from '@/components/TitleSubBar.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import http from '@/helper/http.js'

const titleStack = ref(['Admin', 'Tambah Paslon'])

//Form handler
const form = reactive({
	chairman_name: '',
	chairman_image: '',
	vice_chairman_name: '',
	vice_chairman_image: '',
	candidate_number: ''	
})

//Notification handler
const showNotif = ref(false)
const textNotif = ref('')
const colorNotif = ref()

//Insert handler
const submit = () => {
   http.post('admin/candidates', form, (data, status) => {
      if (status) {
         showNotif.value = true
         textNotif.value = data.response
         colorNotif.value = 'info'
      }
      else { 
         textNotif.value = data.sqlMessage
         showNotif.value = true
         colorNotif.value = 'warning'
      }
   })
}
</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Tambah Pasangan Calon Baru</hero-bar>
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
    >
    <Field label="Nomor urut pasangan">
       <Control
         v-model="form.candidate_number"
         class="mb-6"
         type="number"
         placeholder="Masukkan nomor urut pasangan calon" />
     </Field>
          
      <Field label="Calon Ketua Umum">
        <Control
          v-model="form.chairman_name"
          class="mb-6"
          placeholder="Nama lengkap calon" />
      </Field>

      <Field label="Foto Calon Ketua Umum">
        <Control
          v-model="form.chairman_image"
          class="mb-6"
          placeholder="Link upload foto calon" />
      </Field>

      <Field label="Calon Wakil Ketua Umum">
        <Control
          v-model="form.vice_chairman_name"
          class="mb-6"
          placeholder="Nama lengkap calon" />
      </Field>

      <Field label="Foto Calon Wakil Ketua Umum">
        <Control
          v-model="form.vice_chairman_image"
          class="mb-6"
          placeholder="Link upload foto calon" />
      </Field>
     

       <JbButtons type="justify-start lg:justify-end">
         <JbButton 
           label="Submit"
           @click="submit()"
           :icon="mdiContentSaveMoveOutline"
           color="info" />
       </JbButtons>
    </card-component>
  </main-section>
</template>
