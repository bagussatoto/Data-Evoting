<script setup>
import { computed, ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import {
  mdiAccountGroup,
  mdiAccountAlert,
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiFinance,
  mdiMonitorCellphone,
  mdiReload,
  mdiGithub,
  mdiChartPie,
  mdiVote,
  mdiClock
} from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import CardWidget from '@/components/CardWidget.vue'
import CardComponent from '@/components/CardComponent.vue'
import ClientsTable from '@/components/ClientsTable.vue'
import Notification from '@/components/Notification.vue'
import JbButton from '@/components/JbButton.vue'
import CardTransactionBar from '@/components/CardTransactionBar.vue'
import CardClientBar from '@/components/CardClientBar.vue'
import TitleSubBar from '@/components/TitleSubBar.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import http from '@/helper/http.js'
import countdown from '@/helper/countdown.js'

const titleStack = ref(['Admin', 'Dashboard'])

const store = useStore()

const darkMode = computed(() => store.state.darkMode)

//Fetch data dashboard from API
const dashboard = reactive({
   participants: 0,
   incomingVote: 0,
   participations: 0,
   haventVoted: 0,
   candidates: 0
})

//Trend percent handler
const trends = reactive({
   incomingVote: '0%',
   participations: '0%',
   haventVoted: '0%'
})

const createTrend = (before, after) => before < 1 ? "0%" : ((after - before) / before * 100).toFixed(2) + '%'

const fillDashboard = res => {
   dashboard.participants = res.participants
   dashboard.participations = res.participations
   dashboard.incomingVote = res.incomingVote
   dashboard.haventVoted = res.haventVoted
   dashboard.candidates = res.candidates
}

const lastUpdated = ref('')
const fillLastUpdated = () => lastUpdated.value = `Update terakhir pada ${new Date().toLocaleString('id')}`

const getDashboard = () => {
   http.get('admin/event', (data, status) => {
      if (status) {
         const res = data.response.dashboard
         //createTrend
         trends.participations = createTrend(dashboard.participations, res.participations)
         trends.incomingVote = createTrend(dashboard.incomingVote, res.incomingVote)
         trends.haventVoted = createTrend(dashboard.haventVoted, res.haventVoted)
         fillDashboard(res)
         fillLastUpdated()
      }
   })
}

//Get data quick count from API
const listBg = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500']
const quickCount = ref([])

const fillQuickCount = () => {
   http.get('admin/event/quick-count', (data, status) => {
      if (status) quickCount.value = data.response.quickCount
   })
}

//Countdown handler
const countdownText = ref('')
const start = ref(0)
const finish = ref(0)

//Choose state
const chooseState = (start, finish) => {
   const now = new Date().getTime()
   if ( now >= start && now < finish ) {
      //Running countdown
      const run = setInterval(() => {
         countdown(countdownText, start, finish, run, chooseState(start, finish))
      }, 1000)
   } else if ( now < start ) {
      countdownText.value = "Belum dimulai"
   } else {
      countdownText.value = "Berakhir"
   }
}

//API
const getEvent = () => {
   http.get('event', (data, status) => {
      if (status) {
         const res = data.response.event
         start.value = res.event_start_at
         finish.value = res.event_finish_at
         chooseState(start.value, finish.value)
      }
   })
}

//Reload manual
const reload = () => {
   getDashboard()
   fillQuickCount()
   chooseState(start.value, finish.value);
}

//Fetching data
onMounted(() => {
   getEvent()
   getDashboard()
   fillQuickCount()
})

//Request every 1 minutes
setInterval(() => {
   getDashboard()
   fillQuickCount()
}, 60000)

</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Dashboard</hero-bar>
  <main-section>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
      
      <!-- Kandidat Paslon -->
      <card-widget
        color="text-green-500"
        :icon="mdiAccountMultiple"
        :number="dashboard.candidates"
        label="Kandidat Paslon"
        suffix=" paslon"
      />
      
      <!-- DPT -->
      <card-widget
        trend-type="up"
        color="text-green-500"
        :icon="mdiAccountGroup"
        :number="dashboard.participants"
        label="DPT"
        suffix=" orang"
      />
      
      <!-- Suara masuk -->
      <card-widget
        :trend="trends.incomingVote"
        trend-type="up"
        color="text-blue-500"
        :icon="mdiVote"
        :number="dashboard.incomingVote"
        suffix=" suara"
        label="Suara Masuk"
      />
      
      <!-- Belum memilih -->
      <card-widget
        :trend="trends.haventVoted"
        trend-type="down"
        color="text-red-500"
        :icon="mdiAccountAlert"
        :number="dashboard.haventVoted"
        suffix=" orang"
        label="Belum memilih"
      />
      
      <!-- Partisipasi Pemilih -->
      <card-widget
        :trend="trends.participations"
        trend-type="up"
        color="text-blue-500"
        :icon="mdiChartTimelineVariant"
        :number="dashboard.participations"
        suffix="%"
        label="Partisipasi pemilih"
      />
      <!-- Countdown -->
      <card-widget
        color="text-green-500"
        :icon="mdiClock"
        :text="countdownText"
        label="Countdown"
      />
      
    </div>
   
   <!-- Quick Count -->
    <title-sub-bar
      :icon="mdiChartPie"
      title="Perhitungan Suara"
    />

    <card-component
      :title="lastUpdated"
      :icon="mdiReload"
      class="mb-6 pointer"
      @click="reload"
    >
       <ul class="list-style-none">
          <template v-for="(count, index) in quickCount" :key="index">
             <li>
                <ProgressBar
                  :title="count.candidate"
                  :value="count.decimal"
                  :percent="count.percent"
                  :bgColor="listBg[index]"/>
             </li>
          </template>
       </ul>
    </card-component>
  </main-section>
</template>
