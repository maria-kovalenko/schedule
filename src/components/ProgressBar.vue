<template>
  <div>
    <div class="progress-bar">
      <div ref="progressBar" class="progress-bar-inner" :style="`width: ${width}`"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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

const emit = defineEmits(['endTimer'])

const progressBar = ref(null)
const width = ref(0)

function startProgressBar(timeString, duration) {
  const [hours, minutes] = timeString.split(':').map(Number)
  const startTimeDate = new Date()
  startTimeDate.setHours(hours, minutes, 0, 0)
  const durationMilliseconds = duration * 60 * 1000

  function updateProgressBar() {
    const now = new Date()
    const elapsed = now - startTimeDate
    const progress = Math.min((elapsed / durationMilliseconds) * 100, 100)
    width.value = progress + '%'

    if (progress < 100) {
      requestAnimationFrame(updateProgressBar)
    } else {
      emit('endTimer', true)
    }
  }

  updateProgressBar()
}

if (props.isStart) {
  startProgressBar(props.time, props.duration)
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
  transition: width 0.3s;
}
</style>
