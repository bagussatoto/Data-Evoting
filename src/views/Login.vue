<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { mdiAccount, mdiAsterisk } from '@mdi/js'
import FullScreenSection from '@/components/FullScreenSection.vue'
import CardComponent from '@/components/CardComponent.vue'
import CheckRadioPicker from '@/components/CheckRadioPicker.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import Divider from '@/components/Divider.vue'
import JbButton from '@/components/JbButton.vue'
import JbButtons from '@/components/JbButtons.vue'
import http from '@/helper/http.js'

const form = reactive({
  username: '',
  password: '',
})

const router = useRouter()
const isLoginFail = ref(false)

const submit = () => {
  http.post('admin/login', form, (data, status) => {
     if (status) {
        localStorage.setItem('$evote-token', data.response.token)
        setTimeout(() => router.push({ name: 'home' }), 350)
     }
     else isLoginFail.value = true
  })
}
</script>
<template>
  <full-screen-section
    v-slot="{ cardClass, cardRounded }"
    bg="login"
  >
    <card-component
      :class="cardClass"
      :rounded="cardRounded"
      form
      @submit.prevent="submit"
    >
      <field
        label="Login"
        help="Please enter your login"
      >
        <control
          v-model="form.username"
          :icon="mdiAccount"
          name="login"
          autocomplete="username"
        />
      </field>

      <field
        label="Password"
        help="Please enter your password"
      >
        <control
          v-model="form.password"
          :icon="mdiAsterisk"
          type="password"
          name="password"
          autocomplete="current-password"
        />
      </field>

      <divider />
      <small class="text-red-500 mb-2 block" v-if="isLoginFail">
         Your login fail, username or password is wrong!
      </small>
      <jb-buttons>
        <jb-button
          type="submit"
          color="info"
          label="Login"
        />
        <jb-button
          to="/"
          color="info"
          outline
          label="Back"
        />
      </jb-buttons>
    </card-component>
  </full-screen-section>
</template>
