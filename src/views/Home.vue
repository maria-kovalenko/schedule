<template>
  <div class="wrapper">
    <header class="header">
      <h1 class="title">{{ currentPageName }}</h1>
      <div class="time">{{ utils.todayDate() }}, {{ currentTime }}</div>
    </header>

    <EventCard :data="jsonData" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed, ref, onMounted } from 'vue'
import utils from '../utils/utils'
import EventCard from '../components/EventCard.vue'

const route = useRoute()
const jsonData = ref([])

const routeId = route.params.id
let currentPageName = `${route.name} ${routeId}`

const date = ref(new Date())

const currentTime = computed(() => {
  return date.value.toLocaleTimeString().slice(0, 5)
})

async function fetchEventData() {
  const data = await fetch(`/src/api/report_${routeId}.json`)
  jsonData.value = await data.json()
}

setInterval(() => {
  fetchEventData()
}, 300000)

onMounted(() => {
  fetchEventData()

  setInterval(() => {
    date.value = new Date()
  }, 30000)
})
</script>
