<template>
  <div>
    <!-- {{ width + '%' }} -->
    <div class="progress-bar">
      <div ref="progressBarInner" class="progress-bar-inner" :style="`width: ${width}%`"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import utils from '../utils/utils'

const props = defineProps({
  time: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  isStart: {
    type: Boolean,
    default: false
  }
})

const width = ref(0)
const dateObject = utils.timeToDate(props.time.split(':')[0], props.time.split(':')[1])

function startTimer(dateObject, duration) {
  const start = new Date(dateObject)
  const end = new Date(start.getTime() + duration * 60000)

  const interval = setInterval(function () {
    const now = new Date()
    if (now >= end) {
      clearInterval(interval)
      console.log('Время вышло!')
    } else {
      const remainingTime = Math.round((end - now) / 1000)

      width.value = Math.round((100 / remainingTime) * 100)
      // console.log('Осталось секунд: ' + remainingTime)
    }
  }, 1000)
}

if (props.isStart) {
  startTimer(dateObject, props.duration)
}
</script>
<style lang="scss">
.progress-bar {
  position: absolute;
  content: '';
  top: -3px;
  left: 0;
  width: 100%;
  height: 20px;
  background-color: #47525a;
  border-radius: 32px 32px 0 0;
}

.progress-bar-inner {
  position: absolute;
  content: '';
  top: 0px;
  left: 0;
  height: 20px;
  background: linear-gradient(#74d447 0%, #c6ff52 100%);
  border-radius: 32px 0 0 0;
  transition: width 0.3s;
}
</style>
