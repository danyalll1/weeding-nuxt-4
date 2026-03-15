<script setup lang="ts">
import useStore from "~/store";
import {storeToRefs} from "pinia";

const { currentPage } = storeToRefs(useStore())

// Целевая дата: 15 августа 2026, 15:00
const targetDate = new Date(2026, 7, 15, 15, 0, 0) // Месяц 7 = август (0-indexed)

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

const updateTimer = () => {
  const now = new Date()
  const diff = targetDate.getTime() - now.getTime()
  
  if (diff <= 0) {
    days.value = 0
    hours.value = 0
    minutes.value = 0
    seconds.value = 0
    return
  }
  
  days.value = Math.floor(diff / (1000 * 60 * 60 * 24))
  hours.value = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  minutes.value = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  seconds.value = Math.floor((diff % (1000 * 60)) / 1000)
}

onMounted(() => {
  updateTimer()
  const interval = setInterval(updateTimer, 1000)
  
  onUnmounted(() => {
    clearInterval(interval)
  })
})
</script>
<template>
 <div class="timer">
   <AnimatedTitle 
     :show="currentPage === 2" 
     class="timer__title"
     text="Таймер"
   />
   <div class="timer__content">
     <div class="timer__item">
       <div class="timer__value">{{ String(days).padStart(2, '0') }}</div>
       <div class="timer__label">Дней</div>
     </div>
     <div class="timer__separator">:</div>
     <div class="timer__item">
       <div class="timer__value">{{ String(hours).padStart(2, '0') }}</div>
       <div class="timer__label">Часов</div>
     </div>
     <div class="timer__separator">:</div>
     <div class="timer__item">
       <div class="timer__value">{{ String(minutes).padStart(2, '0') }}</div>
       <div class="timer__label">Минут</div>
     </div>
     <div class="timer__separator">:</div>
     <div class="timer__item">
       <div class="timer__value">{{ String(seconds).padStart(2, '0') }}</div>
       <div class="timer__label">Секунд</div>
     </div>
   </div>
 </div>
</template>
<style lang="scss" scoped>
.timer{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 16px;
  @include mf-s-breakpoint {
    gap: 48px;
    padding: 32px;
  }

  &__title{
    @include titleFont()
  }

  &__content {
    display: flex;
    align-items: center;
    gap: 16px;
    @include mf-s-breakpoint {
      gap: 24px;
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    @include mf-s-breakpoint {
      gap: 12px;
    }
  }

  &__value {
    @include font(32px, 40px, 600);
    color: white;
    @include mf-s-breakpoint {
      @include font(64px, 72px, 600);
    }
  }

  &__label {
    @include font(12px, 16px, 400);
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    @include mf-s-breakpoint {
      @include font(16px, 20px, 400);
    }
  }

  &__separator {
    @include font(32px, 40px, 600);
    color: white;
    margin-bottom: 24px;
    @include mf-s-breakpoint {
      @include font(64px, 72px, 600);
      margin-bottom: 48px;
    }
  }
}
</style>