<template>
  <div class="event">
    <div v-for="(event, index) in data" :key="event.__2">
      <div
        v-if="isActiveTime(event.__2, event.__3, index)"
        class="event__card"
        :class="classObject(event, index)"
      >
        <!-- прогресс бар  -->
        <ProgressBar
          v-if="index === count.length"
          :time="event.__2"
          :duration="event.__3"
          :isStart="isStart"
        />

        <!-- время -->
        <div class="event__time-wrapper">
          <p class="event__time">{{ getDurationEvent(event.__2, event.__3) }}</p>
          <p class="event__time-left" v-if="index === 0">Осталось 16 минут</p>
        </div>

        <!-- спикер -->
        <div class="event__speakers speakers" v-if="event.__5 !== '-'">
          <div class="speakers__wrapper">
            <div class="speakers__photo">
              <img class="speakers__img" :src="event.__5" alt="speaker" />
            </div>
            <div class="speakers__description">
              <p class="speakers__name">{{ event.__4.split('/')[0] }}</p>
              <p class="speakers__profession">{{ event.__4.split('/')[1] }}</p>
            </div>
          </div>
        </div>

        <!-- событие -->
        <p class="event__name">{{ event.__1 }}</p>

        <!-- инфрмация о событии -->
        <div class="event__bottom" v-if="event.__6 !== '-'">
          <TextComponent class="event__type" :text="event.__6" />
          <TextComponent class="event__lang" :text="event.__7" />
          <TextComponent class="event__theme" :text="event.__8" />
        </div>
      </div>
    </div>
    <div v-if="data.length === 0" class="event__noData">Нет данных</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import utils from '../utils/utils'
import TextComponent from './TextComponent.vue'
import ProgressBar from './ProgressBar.vue'

defineProps({
  data: {
    type: Array,
    default: function () {
      return []
    }
  }
})

const isStart = ref(false)
const count = []

function getDurationEvent(time, duration) {
  const dateObject = utils.timeToDate(time.split(':')[0], time.split(':')[1])
  const start = new Date(dateObject)
  const end = new Date(start.getTime() + duration * 60000)

  let startMinutes = start.getMinutes()
  let endMinutes = end.getMinutes()

  if (start.getMinutes() <= 9) {
    startMinutes = '0' + start.getMinutes()
  }
  if (end.getMinutes() <= 9) {
    endMinutes = '0' + end.getMinutes()
  }

  return `${start.getHours()}:${startMinutes} - ${end.getHours()}:${endMinutes}`
}

function isActiveTime(time, duration) {
  const dateObject = utils.timeToDate(time.split(':')[0], time.split(':')[1])

  const start = new Date(dateObject)
  const end = new Date(start.getTime() + duration * 60000)
  const now = new Date()
  if (now >= end) {
    count.push(1)
    return false
  }
  return true
}

function classObject(obj, index) {
  return {
    'event__card--active': index === count.length,
    'event__card--dinner': obj.__4 && obj.__5 && obj.__6 && obj.__7 && obj.__8 === '-'
  }
}

onMounted(() => {
  isStart.value = true
})
</script>
<style lang="scss">
.event {
  &__card {
    position: relative;
    background-color: #eeeeee;
    border-radius: 32px;
    margin-bottom: 60px;
    padding: 30px;
    font-weight: bold;
    &::before {
      position: absolute;
      content: '';
      background-image: url('/left-symbol.svg');
      background-position: 0 0;
      background-repeat: no-repeat;
      background-size: contain;
      top: 50px;
      left: -70px;
      width: 70px;
      height: 20px;
      @media (max-width: 767px) {
        left: -35px;
        width: 40px;
        height: 10px;
      }
    }
    &--active {
      background-color: #777421 !important;
      color: #fff !important;
      border-radius: 20px 20px 32px 32px !important;
      border: none !important;
    }
    &--active .event__type.text-compponent {
      background-color: #f1c658;
      color: #213477;
      border: 1px solid #f1c658;
    }
    &--active .text-compponent {
      background-color: transparent;
      color: #fff;
      border: 1px solid #a6d447;
    }

    &--dinner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #fff;
      border: 3px solid #c1c1c1;
      color: #5e5e5e;

      > p {
        margin-bottom: 0;
      }

      @media (max-width: 550px) {
        flex-wrap: wrap;
      }
    }
    &--dinner.event__card--active {
      display: block;
    }

    &--dinner::before {
      top: calc(50% - 10px);
    }
    @media (max-width: 1000px) {
      margin-bottom: 40px;
    }
  }

  &__speakers {
    margin-bottom: 40px;
    margin-top: 30px;
  }
  &__time-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 30px;
    flex-shrink: 0;
  }
  &__time {
    font-size: 60px;
    @media (max-width: 1000px) {
      font-size: 40px;
    }
    @media (max-width: 767px) {
      font-size: 30px;
    }
  }

  &__name {
    font-size: 48px;
    margin-bottom: 42px;
    @media (max-width: 1000px) {
      font-size: 30px;
    }
    @media (max-width: 550px) {
      font-size: 25px;
      margin-bottom: 30px;
    }
  }

  &__bottom {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: start;
    font-weight: 400;
    @media (max-width: 1000px) {
      gap: 20px;
    }
    @media (max-width: 550px) {
      gap: 10px;
      flex-direction: column;
      align-items: flex-start;
    }
  }
  &__type {
    background-color: #848484;
    color: #eeeeee;
    border: 1px solid #848484;
  }

  &__noData {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
  }

  .speakers {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    &__wrapper {
      display: flex;
      align-items: center;
    }
    &__photo {
      width: 140px;
      height: 140px;
      margin-right: 10px;
      @media (max-width: 1000px) {
        width: 100px;
        height: 100px;
      }
      @media (max-width: 550px) {
        width: 50px;
        height: 50px;
      }
    }
    &__name {
      font-size: 28px;
      font-weight: 500;
      margin-bottom: 8px;
      white-space: pre;
      @media (max-width: 1000px) {
        font-size: 18px;
      }
    }
    &__description {
      font-size: 20px;
      font-weight: 400;
      @media (max-width: 1000px) {
        font-size: 13px;
      }
    }

    &__img {
      border-radius: 50%;
    }

    @media (max-width: 550px) {
      margin-bottom: 30px;
    }
  }
}
</style>
