<script setup lang="ts">
import useStore from "~/store";
import {storeToRefs} from "pinia";

interface Props {
  day: number;
  isCurrentMonth: boolean;
  isHighlighted: boolean;
  isActive: boolean;
  isClickable: boolean;
  showTooltip?: boolean;
  tooltipText?: string;
}

const props = defineProps<Props>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const { currentPage } = storeToRefs(useStore())
const previousPage = ref(currentPage.value)
const isTransitioning = ref(false)

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}

const dayElement = ref<HTMLElement | null>(null)
const tooltipPosition = ref<{ top: number; left: number } | null>(null)
const shouldRenderTooltip = ref(false)

const updatePosition = () => {
  if (!dayElement.value || !props.showTooltip) {
    tooltipPosition.value = null
    return
  }

  const rect = dayElement.value.getBoundingClientRect()
  const scrollY = window.scrollY || window.pageYOffset
  const scrollX = window.scrollX || window.pageXOffset

  tooltipPosition.value = {
    top: rect.top + scrollY - 16,
    left: rect.left + scrollX + rect.width / 2
  }
}

const showTooltipWithDelay = (show: boolean) => {
  if (show) {
    // Если секция в процессе перехода, ждем завершения анимации (0.5s)
    if (isTransitioning.value) {
      setTimeout(() => {
        if (props.showTooltip && currentPage.value === 5) {
          shouldRenderTooltip.value = true
          nextTick(updatePosition)
        }
      }, 600)
    } else {
      // Секция уже стабильна, показываем сразу
      shouldRenderTooltip.value = true
      nextTick(updatePosition)
    }
  } else {
    shouldRenderTooltip.value = false
    tooltipPosition.value = null
  }
}

// Отслеживаем переключение секции
watch(currentPage, (newPage, oldPage) => {
  // Если переключились на секцию календаря (page 5)
  if (newPage === 5 && oldPage !== 5) {
    isTransitioning.value = true
    // Сбрасываем тултип во время перехода
    shouldRenderTooltip.value = false
    tooltipPosition.value = null
    
    // После завершения анимации разрешаем показ тултипа
      setTimeout(() => {
        isTransitioning.value = false
        if (props.showTooltip && currentPage.value === 5) {
          showTooltipWithDelay(true)
        }
      }, 600)
  } else if (newPage !== 5) {
    // Ушли с секции календаря
    isTransitioning.value = false
    shouldRenderTooltip.value = false
    tooltipPosition.value = null
  }
  
  previousPage.value = newPage
})

watch(() => props.showTooltip, (show) => {
  // Показываем тултип только если секция стабильна (не в процессе перехода)
  if (!isTransitioning.value) {
    showTooltipWithDelay(show)
  }
}, { immediate: true })

onMounted(() => {
  previousPage.value = currentPage.value
  isTransitioning.value = false
  if (props.showTooltip && currentPage.value === 5) {
    showTooltipWithDelay(true)
  }
})
</script>

<template>
  <div
    ref="dayElement"
    :class="[
      'calendar-day',
      { 'calendar-day_prev-month': !isCurrentMonth },
      { 'calendar-day_highlighted': isHighlighted },
      { 'calendar-day_active': isActive },
      { 'calendar-day_clickable': isClickable }
    ]"
    @click="handleClick"
  >
    <span class="calendar-day__text">{{ day }}</span>
  </div>
  
  <!-- Тултип через Teleport, чтобы не наследовать opacity от родителя -->
  <Teleport to="body">
    <div
      v-if="shouldRenderTooltip && showTooltip && tooltipText && tooltipPosition"
      class="calendar-day__tooltip"
      :style="{
        top: `${tooltipPosition.top}px`,
        left: `${tooltipPosition.left}px`
      }"
    >
      {{ tooltipText }}
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.calendar-day {
  @include font(14px, 18px, 400);
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  border-radius: 4px;
  transition: all 0.3s ease;
  min-height: 0;
  position: relative;
  @include mf-s-breakpoint {
    @include font(20px, 24px, 400);
    border-radius: 8px;
  }

  &__text {
    position: relative;
    z-index: 1;
  }

  &_prev-month {
    color: rgba(255, 255, 255, 0.3);
  }

  &_clickable {
    cursor: pointer;
  }

  &_highlighted {
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
    font-weight: 600;
    border: 1px solid rgba(255, 255, 255, 0.5);
    @include mf-s-breakpoint {
      border-width: 2px;
      transform: scale(1.05);
    }
  }

  &_active {
    background-color: rgba(220, 20, 60, 0.3);
    color: #ff69b4;
    font-weight: 600;
    border: 2px solid #ff69b4;
    box-shadow: 0 0 10px rgba(255, 105, 180, 0.5);
    @include mf-s-breakpoint {
      transform: scale(1.1);
    }
  }

  &__tooltip {
    position: fixed;
    transform: translate(-50%, -100%);
    padding: 16px 24px;
    background-color: #000000 !important;
    opacity: 1 !important;
    color: white;
    border-radius: 12px;
    @include font(18px, 24px, 500);
    white-space: nowrap;
    z-index: 10000;
    pointer-events: none;
    border: 2px solid white;
    min-width: 120px;
    text-align: center;
    @include mf-s-breakpoint {
      @include font(20px, 26px, 500);
      padding: 20px 28px;
      min-width: 140px;
    }

    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid white;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 1));
    }
  }
}
</style>
