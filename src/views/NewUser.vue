<script setup>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
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

const titleStack = ref(['Admin', 'Tambah Pemilih'])
const store = useStore()

const jobs = [{ id: 1, label: 'Dosen' }, { id: 2, label: 'Mahasiswa' }]
const genders = ['male', 'female']
//Form handler
const form = reactive({
	fullname: '',
	username: '',
	password: '',
	job_id: '',
	gender: ''
})

const submit = () => {
   http.post('admin/accounts', form, (data, status) => {
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

//Notification handler
const showNotif = ref(false)
const textNotif = ref('')
const colorNotif = ref()

</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Tambah Pemilih Baru pada DPT</hero-bar>
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
      <Field label="Nama">
        <Control
          v-model="form.fullname"
          class="mb-6"
          placeholder="Nama lengkap pemilih" />
      </Field>

      <Field label="Username">
        <Control 
          v-model="form.username"
          class="mb-6"
          placeholder="Username pemilih" />
       </Field>

       <Field label="Password">
         <Control 
           v-model="form.password"
           class="mb-6"
           placeholder="Password pemilih" />
       </Field>

       <Field label="Job">
         <Control
           v-model="form.job_id"
           :options="jobs"
           class="mb-6" />
       </Field>
       
       <Field label="Gender">
         <Control
           v-model="form.gender"
           :options="genders"
           class="mb-6" />
       </Field>

       <JbButtons type="justify-start lg:justify-end">
         <JbButton 
           label="Submit"
           @click="submit"
           :icon="mdiContentSaveMoveOutline"
           color="info" />
       </JbButtons>
    </card-component>
  </main-section>
</template>
