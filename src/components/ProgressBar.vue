<template>
  <div>
    {{ width + '%' }}
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
  const start = dateObject.getTime()
  const interval = duration * 60000
  const end = start + interval
  const progressInOne = interval / 100 // 0,0016

  const intervalId = setInterval(function () {
    let now = new Date().getTime()
    if (end - now < 0) {
      clearInterval(intervalId)
      return
    }

    // console.log(end - now)
    let val = 100 - Math.round((end - now) / progressInOne) //59000
    width.value = val
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
  overflow: hidden;
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
