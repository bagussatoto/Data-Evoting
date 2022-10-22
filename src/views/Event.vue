<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { mdiAccountGroup, mdiContentSaveMoveOutline, mdiClock, mdiInformation } from '@mdi/js'
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
import CardWidget from '@/components/CardWidget.vue'
import http from '@/helper/http.js'

const titleStack = ref(['Admin', 'Kelola Acara'])
//Get API Handler
const eventStartAt = ref('')
const eventFinishAt = ref('')
const passcode = ref('passcode')

const getEvent = () => {
   http.get('event', (data, status) => {
      if (status) {
         const res = data.response.event
         eventStartAt.value = new Date(res.event_start_at).toLocaleString('id')
         eventFinishAt.value = new Date(res.event_finish_at).toLocaleString('id')
         passcode.value = res.passcode
      }
   })
}

onMounted(() => {
   getEvent()
})

//Form handler
const form = reactive({
	event_start_at: '',
	event_finish_at: '',
	event_title: '',
	passcode: ''
})

//Notification handler
const showNotif = ref(false)
const textNotif = ref('')

//Update
const btnUpdate = () => {
   //Convert to unix time
   form.event_start_at = new Date(form.event_start_at).getTime()
   form.event_finish_at = new Date(form.event_finish_at).getTime()
   
   http.put('admin/event', form,  (status, err = '') => {
      if ( status ) {
         textNotif.value = 'Action success'
         getEvent()
      }
      else textNotif.value = 'Action fail : ' + err
      showNotif.value = true
   })
}
</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Kelola Kegiatan Evoting Anda</hero-bar>
  <main-section>
     <Notification v-on:close="showNotif = false" :icon="mdiInformation" color="info" v-if="showNotif">
        {{ textNotif }}
     </Notification>
     <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <CardWidget
        color="text-green-500"
        :text="eventStartAt"
        label="Acara dimulai pada"/>
        
        <CardWidget
        color="text-red-500"
        :text="eventFinishAt"
        label="Acara berakhir pada"/>
        
        <CardWidget
        color="text-green-500"
        :text="passcode"
        label="Passcode"/>
     </div>
     
  <card-component
      class="mb-6"
    >
       <Field label="Atur waktu dan tanggal">
          <Control
            v-model="form.event_start_at"
            class="mb-6"
            type="datetime-local"
            value="2021-12-25 T09:00"
            min="2021-12-01 T12:00"
            max="2022-12-01 T12:00"
            placeholder="Tanggal dan waktu acara dimulai" />
      </Field>
      <Field>
         <Control
            v-model="form.event_finish_at"
            type="datetime-local"
            value="2021-12-25 T09:00"
            min="2021-12-01 T12:00"
            max="2022-12-01 T12:00"
            placeholder="Tanggal dan waktu acara berakhir"/>
      </Field>
      
      <Field label="Atur tema kegiatan anda">
         <Control
            v-model="form.event_title"
            type="textarea"
            placeholder="Tema kegiatan akan muncul pada aplikasi evote pemilih"/>
      </Field>
      
      <Field label="Atur passcode">
         <Control
            v-model="form.passcode"
            type="text"
            placeholder="Tentukan passcode pada kegiatan anda"/>
      </Field>

       <JbButtons type="justify-start lg:justify-end">
         <JbButton 
           @click="btnUpdate"
           label="Submit"
           :icon="mdiContentSaveMoveOutline"
           color="info" />
       </JbButtons>
    </card-component>
  </main-section>
</template>
