<script setup lang="ts">
import BaseLayout from "~/components/baseLayout.vue";
import CalendarSection from "~/components/calendarSection.vue";
import HeroSection from "~/components/heroSection.vue";
import TimerSection from "~/components/timerSection.vue";
import InvitationSection from "~/components/invitationSection.vue";
import LocationSection from "~/components/locationSection.vue";
import DressCodeSection from "~/components/dressCodeSection.vue";
import ScheduleSection from "~/components/scheduleSection.vue";
import WishesSection from "~/components/wishesSection.vue";
import useStore from "~/store";


const sec1 = useTemplateRef('sec1')
const sec2 = useTemplateRef('sec2')
const sec3 = useTemplateRef('sec3')
const sec4 = useTemplateRef('sec4')
const sec5 = useTemplateRef('sec5')
const sec6 = useTemplateRef('sec6')
const sec7 = useTemplateRef('sec7')
const sec8 = useTemplateRef('sec8')

const { currentPage } = storeToRefs(useStore())
const sections = [sec1, sec2, sec3, sec4, sec5, sec6, sec7, sec8]
const previousPage = ref(0)
const scrollDirection = ref<'forward' | 'backward'>('forward')

const isInsideMap = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) return false;
  return !!target.closest('.location__map');
};

const wheelHandler = (e: WheelEvent): void => {
  // Если скроллим внутри карты — не переключаем секции
  if (isInsideMap(e.target)) return;

  e.preventDefault(); // Предотвращаем стандартный скролл
  
  // Определяем направление прокрутки
  if (e.deltaY > 0) {
    // Прокрутка вниз - переходим к следующей секции
    if (currentPage.value < sections.length - 1) {
      currentPage.value++
    }
  } else if (e.deltaY < 0) {
    // Прокрутка вверх - переходим к предыдущей секции
    if (currentPage.value > 0) {
      currentPage.value--
    }
  }
}

// Обработка свайпов на телефоне (влево-вправо)
let touchStartX = 0
let touchEndX = 0

const touchStartHandler = (e: TouchEvent): void => {
  if (isInsideMap(e.target)) return;
  if (e.touches && e.touches.length > 0 && e.touches[0]) {
    touchStartX = e.touches[0].clientX
  }
}

const touchEndHandler = (e: TouchEvent): void => {
  if (isInsideMap(e.target)) return;
  if (e.changedTouches && e.changedTouches.length > 0 && e.changedTouches[0]) {
    touchEndX = e.changedTouches[0].clientX
    handleSwipe()
  }
}

const handleSwipe = (): void => {
  const swipeThreshold = 50 // Минимальное расстояние для свайпа
  const diff = touchStartX - touchEndX
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Свайп влево - переходим к следующей секции
      if (currentPage.value < sections.length - 1) {
        currentPage.value++
      }
    } else {
      // Свайп вправо - переходим к предыдущей секции
      if (currentPage.value > 0) {
        currentPage.value--
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('wheel', wheelHandler, { passive: false })
  // Обработчики для свайпов на телефоне
  window.addEventListener('touchstart', touchStartHandler, { passive: true })
  window.addEventListener('touchend', touchEndHandler, { passive: true })
  
  watch(currentPage , (newPage, oldPage) => {
    // Определяем направление скролла
    if (oldPage !== undefined) {
      if (newPage > oldPage) {
        scrollDirection.value = 'forward' // Идем дальше по списку
      } else if (newPage < oldPage) {
        scrollDirection.value = 'backward' // Идем назад по списку
      }
      previousPage.value = oldPage
    } else {
      previousPage.value = newPage
    }
    
    sections.forEach((el, index) => {
      if (!el.value?.$el) return
      
      const element = el.value.$el as HTMLElement
      const distance = index - currentPage.value
      const wasActive = index === previousPage.value
      const isActive = index === currentPage.value
      
      // Все секции на одной прямой линии в перспективе
      const stepX = distance * 240 // Сдвиг вправо с шагом
      const stepY = -distance * 160 // Сдвиг вверх с шагом
      const stepZ = -distance * 500 // Уходят вдаль (отрицательный Z) - от нас
      
      if (isActive) {
        // Активный элемент - на линии, без blur, без анимации
        element.style.translate = `${stepX}px ${stepY}px ${stepZ}px`
        element.style.scale = '1'
        element.style.opacity = '1'
        element.style.zIndex = '20'
        element.style.filter = 'blur(0px)'
        element.style.pointerEvents = 'auto'
        element.classList.remove('floating')
      } else if (distance < 0) {
        // Элементы перед активным
        if (wasActive && scrollDirection.value === 'forward') {
          // Была активной и мы идем дальше - улетает вперед (вылетает из экрана)
          const offsetZ = Math.abs(distance) * 500 + 400 // Улетает вперед с увеличением
          element.style.translate = `${stepX}px ${stepY}px ${offsetZ}px`
          element.style.scale = '1.3' // Увеличивается при вылете
        } else {
          // Обычное состояние - улетели вперед
          const offsetZ = Math.abs(distance) * 500
          element.style.translate = `${stepX}px ${stepY}px ${offsetZ}px`
          element.style.scale = '0.7'
        }
        element.style.opacity = '0'
        element.style.zIndex = String(10 - Math.abs(distance))
        element.style.filter = 'blur(8px)'
        element.style.pointerEvents = 'none'
        element.classList.remove('floating')
      } else {
        // Элементы после активного - на линии, уходят вдаль, с blur
        const scale = Math.max(0.7, 1 - distance * 0.1) // Уменьшение с шагом
        const blurAmount = Math.min(20, distance * 10) // Blur увеличивается с расстоянием
        
        element.style.translate = `${stepX}px ${stepY}px ${stepZ}px`
        element.style.scale = String(scale)
        element.style.opacity = String(Math.max(0.6, 1 - distance * 0.15))
        element.style.zIndex = String(10 - distance)
        element.style.filter = `blur(${blurAmount}px)`
        element.style.pointerEvents = 'none'
        // Добавляем класс для анимации парения
        element.classList.add('floating')
        // Разная задержка для каждой секции
        element.style.setProperty('--animation-delay', `${index * 0.3}s`)
      }
    })
  }, { immediate: true })
})

onUnmounted(() => {
  window.removeEventListener('wheel', wheelHandler)
  window.removeEventListener('touchstart', touchStartHandler)
  window.removeEventListener('touchend', touchEndHandler)
})
</script>


<template>
  <BaseLayout>
    <HeroSection
      ref="sec1" 
      :class="['stack']"
    />
    <InvitationSection 
      ref="sec2" 
      :class="['stack']"
    />
    <LocationSection 
      ref="sec3" 
      :class="['stack']"
    />
    <DressCodeSection 
      ref="sec4" 
      :class="['stack']"
    />
    <ScheduleSection 
      ref="sec5" 
      :class="['stack']"
    />
    <CalendarSection 
      ref="sec6" 
      :class="['stack']"
    />
    <WishesSection 
      ref="sec7" 
      :class="['stack']"
    />
    <TimerSection 
      ref="sec8" 
      :class="['stack']"
    />
  </BaseLayout>
</template>

<style lang="scss" scoped>
.stack {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform-style: preserve-3d;
  transition: translate 0.5s ease-in-out, scale 0.5s ease-in-out, opacity 0.5s ease-in-out, filter 0.5s ease-in-out;
  translate: 0 0 0;
  z-index: 1;
  will-change: transform, translate;
  backface-visibility: hidden;
  pointer-events: none;
  
  // Активная секция получает pointer-events: auto через JavaScript
}
</style>
