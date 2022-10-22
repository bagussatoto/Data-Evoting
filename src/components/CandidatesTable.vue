<script setup>
import { computed, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { mdiAccountEdit, mdiTrashCan, mdiEye, mdiBallot } from '@mdi/js'
import ModalBox from '@/components/ModalBox.vue'
import CheckboxCell from '@/components/CheckboxCell.vue'
import Level from '@/components/Level.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import Field from  '@/components/Field.vue'
import Control from '@/components/Control.vue'
import http from '@/helper/http.js'

const props = defineProps({
  checkable: Boolean,
  fields: Array
})
 
const store = useStore()

const darkMode = computed(() => store.state.darkMode)

const isModalActive = ref(false)

const isModalDangerActive = ref(false)

const perPage = ref(10)

const currentPage = ref(0)

const checkedRows = ref([])


const itemsPaginated = computed(
  () => props.fields.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
)

const numPages = computed(() => Math.ceil(props.fields.length / perPage.value))

const currentPageHuman = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
  const pagesList = []
  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i)
  }
  return pagesList
})

const remove = (arr, cb) => {
  const newArr = []
  arr.forEach(item => {
    if (!cb(item)) {
      newArr.push(item)
    }
  })
  return newArr
}

const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client)
  } else {
    checkedRows.value = remove(checkedRows.value, row => row.id === item.id)
  }
}

//Update Candidate handler
const updateForm = reactive({
   candidate_id: null,
	candidate_number: 1,
	chairman_name: 'Fulan bin Fulan',
	chairman_image: '/male.jpg',
	vice_chairman_name: 'Fulanah binti fulah',
	vice_chairman_image: '/female.jpg'
})

//Fill updateForm with current data
//Update handler
const btnUpdate = data => {
	//trigger modal
	isModalActive.value = true

	//Fill form
	updateForm.candidate_id = data.candidate_id
	updateForm.candidate_number = data.candidate_number
	updateForm.chairman_name = data.chairman_name
	updateForm.chairman_image = data.chairman_image
	updateForm.vice_chairman_name = data.vice_chairman_name
	updateForm.vice_chairman_image = data.vice_chairman_image
}

//Event
const emit = defineEmits(['update-success', 'delete-success', 'update-fail', 'delete-fail'])

//Connect to API
const update = () => {
   http.put('admin/candidates', updateForm, (status, data) => {
      if (status) emit('update-success')
      else {
         store.state.errorFromServer = data.sqlMessage
         emit('update-fail')
      }
   })
}

//Delete handler
const key = ref({
   candidate_id: null
})
const btnDelete = data => {
   //Trigger
   isModalDangerActive.value = true
   
   //Fill key
   key.value.candidate_id = data.candidate_id
}
const deleteCandidate = () => {
   http.delete('admin/candidates', key.value, (status, err = '') => {
      if (status) emit('delete-success')
      else {
         store.state.errorFromServer = err.sqlMessage
         emit('delete-fail')
      }
   })
}
</script>

<template>

<!-- Update Modal -->
  <modal-box
    v-on:confirm="update()"
    v-model="isModalActive"
    title="Update Data Kandidat"
    has-cancel
  >
    <Field label="Nomor Pasangan Calon">
      <Control
        type="number"
        v-model="updateForm.candidate_number"
        placeholder="Ubah nomor urut paslon"
        :icon="mdiAccountEdit" />
    </Field>

    <Field label="Calon Ketua Umum">
      <Control
       v-model="updateForm.chairman_name"
       placeholder="Ubah nama calon ketua umum"
       :icon="mdiAccountEdit" 
       class="mb-6"/>
    </Field>

    <Field label="Foto Calon Ketua Umum">
      <Control 
        v-model="updateForm.chairman_image"
        placeholder="Ubah link upload foto"
        :icon="mdiAccountEdit"
        class="mb-6"/>
    </Field>
    
    <Field label="Calon Wakil Keta Umum">
      <Control 
        v-model="updateForm.vice_chairman_name"
        placeholder="Ubah nama calon wakil ketua umum"
        :icon="mdiAccountEdit"
        class="mb-6"/>
    </Field>
    
    <Field label="Foto Wakil Ketua Umum">
      <Control 
        v-model="updateForm.vice_chairman_image"
        placeholder="Ubah link upload foto"
        :icon="mdiAccountEdit"
        class="mb-6"/>
    </Field>
    
  </modal-box>

  <modal-box
    v-model="isModalDangerActive"
    v-on:confirm="deleteCandidate()"
    large-title="Hapus data "
    button="danger"
    has-cancel
  >
    <p>Anda akan menghapus data secara <b>permanen</b></p>
  </modal-box>

  <div
    v-if="checkedRows.length"
    class="bg-gray-50 p-3 dark:bg-gray-800"
  >
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block bg-gray-100 px-2 py-1 rounded-sm mr-2 text-sm dark:bg-gray-700"
    >
      {{ checkedRow.name }}
    </span>
  </div>
<!-- End of modal -->

<!-- Table -->

  <table>
    <thead>
      <tr>
       <th>No. Paslon</th>
       <th>Ketua Umum</th>
       <th>Foto Ketum</th>
       <th>Wakil Ketua Umum</th>
       <th>Foto Waketum</th>
       <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in itemsPaginated"
        :key="item.username"
      >
        <td data-label="No. Paslon">
          {{ item.candidate_number }}
        </td>
        <td data-label="Ketua Umum">
          {{ item.chairman_name }}
        </td>
        <td data-label="Foto Ketum">
          <img class="rounded-full h-auto w-3/12 md:mx-auto" :src="item.chairman_image" :alt="item.chairman_name" />
        </td>
        <td data-label="Wakil Ketua Umum">
          {{ item.vice_chairman_name }}
        </td>
        <td data-label="Foto Waketum">
          <img class="rounded-full h-auto w-3/12 md:mx-auto" :src="item.vice_chairman_image" :alt="vice_chairman_name">
        </td>
        <td data-label="actions" class="actions-cell">
          <jb-buttons
            type="justify-start lg:justify-end"
            no-wrap
          >
            <jb-button
              color="success"
              :icon="mdiAccountEdit"
              small
              @click="btnUpdate(item)"
            />
            <jb-button
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="btnDelete(item)"
            />
          </jb-buttons>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="table-pagination">
    <level>
      <jb-buttons>
        <jb-button
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          :outline="darkMode"
          small
          @click="currentPage = page"
        />
      </jb-buttons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </level>
  </div>
</template>
