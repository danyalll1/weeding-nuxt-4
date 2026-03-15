<script setup lang="ts">
import useStore from "~/store";
import {storeToRefs} from "pinia";

interface CalendarDay {
  day: number;
  isCurrentMonth: boolean;
}

const { currentPage } = storeToRefs(useStore())

// Август 2026 начинается в субботу (1 августа - суббота)
// Неделя начинается с понедельника: Пн=0, Вт=1, Ср=2, Чт=3, Пт=4, Сб=5, Вс=6
const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const daysInMonth = 31
const startDay = 5 // Суббота (неделя начинается с понедельника)
const daysInPreviousMonth = 31 // Июль имеет 31 день

// Активная дата по умолчанию - 15
const activeDate = ref<number | null>(15)
const tooltipDay = ref<number | null>(15)

// Секция календаря активна когда currentPage === 1
const isSectionActive = computed(() => currentPage.value === 1)

// Создаем массив дней месяца с датами из предыдущего месяца в начале
const calendarDays = computed(() => {
  const days: CalendarDay[] = []
  
  // Добавляем последние дни предыдущего месяца (июля)
  const firstDayOfPreviousMonth = daysInPreviousMonth - startDay + 1
  for (let i = firstDayOfPreviousMonth; i <= daysInPreviousMonth; i++) {
    days.push({ day: i, isCurrentMonth: false })
  }
  
  // Добавляем все дни текущего месяца (августа)
  for (let day = 1; day <= daysInMonth; day++) {
    days.push({ day, isCurrentMonth: true })
  }
  
  return days
})

const isHighlighted = (dayItem: CalendarDay) => {
  return dayItem.isCurrentMonth && (dayItem.day === 14 || dayItem.day === 15)
}

const isActive = (dayItem: CalendarDay) => {
  return dayItem.isCurrentMonth && dayItem.day === activeDate.value
}

const handleDayClick = (dayItem: CalendarDay, event: MouseEvent) => {
  if (dayItem.isCurrentMonth && (dayItem.day === 14 || dayItem.day === 15)) {
    event.stopPropagation()
    
    // Если кликнули по той же дате, закрываем тултип, иначе переключаем
    if (tooltipDay.value === dayItem.day) {
      tooltipDay.value = null
    } else {
      activeDate.value = dayItem.day
      tooltipDay.value = dayItem.day
    }
  }
}

const showTooltip = (dayItem: CalendarDay) => {
  return isSectionActive.value && dayItem.isCurrentMonth && dayItem.day === tooltipDay.value && (dayItem.day === 14 || dayItem.day === 15)
}

const getTooltipText = (day: number) => {
  return day === 14 ? 'Загс' : 'Ресторан'
}
</script>
<template>
  <div class="calendar-container">
    <div class="calendar-container__month">Август 2026</div>
    <div class="calendar-container__grid">
      <div 
        v-for="(day, index) in weekDays" 
        :key="index"
        class="calendar-container__weekday"
      >
        {{ day }}
      </div>
      <CalendarDay
        v-for="(dayItem, index) in calendarDays"
        :key="index"
        :day="dayItem.day"
        :is-current-month="dayItem.isCurrentMonth"
        :is-highlighted="isHighlighted(dayItem)"
        :is-active="isActive(dayItem)"
        :is-clickable="dayItem.isCurrentMonth && (dayItem.day === 14 || dayItem.day === 15)"
        :show-tooltip="showTooltip(dayItem)"
        :tooltip-text="showTooltip(dayItem) ? getTooltipText(dayItem.day) : undefined"
        @click="handleDayClick(dayItem, $event)"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.calendar-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 600px;
  position: relative;
  @include mf-s-breakpoint {
    gap: 32px;
  }

  &__month {
    @include font(20px, 24px, 400);
    text-align: center;
    color: white;
    @include mf-s-breakpoint {
      @include font(48px, 52px, 400);
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
    width: 100%;
    @include mf-s-breakpoint {
      gap: 12px;
    }
  }

  &__weekday {
    @include font(12px, 16px, 600);
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
    padding: 4px;
    @include mf-s-breakpoint {
      @include font(18px, 22px, 600);
      padding: 12px;
    }
  }

}
</style>
