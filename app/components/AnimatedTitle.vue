<script setup lang="ts">
import { createTextAnimation } from "~/lib/animation";

interface Props {
  show?: boolean;
  class?: string;
  appear?: boolean;
  text: string;
}

const props = withDefaults(defineProps<Props>(), {
  show: true,
  appear: false,
  text: ''
});

const titleElement = ref<HTMLElement | null>(null)
const { onEnter, onLeave } = createTextAnimation()

watch(() => props.show, (newValue, oldValue) => {
  if (!titleElement.value) return
  
  if (newValue && !oldValue) {
    // Появление
    onEnter(titleElement.value, () => {})
  } else if (!newValue && oldValue) {
    // Исчезновение
    onLeave(titleElement.value, () => {})
  }
}, { immediate: false })

onMounted(() => {
  if (props.show && props.appear && titleElement.value) {
    nextTick(() => {
      onEnter(titleElement.value!, () => {})
    })
  }
})
</script>

<template>
  <div :class="class">
    <div
      ref="titleElement"
      :class="{ 'animated-title__hidden': !show }"
    >
      {{ text }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.animated-title__hidden {
  opacity: 0;
  pointer-events: none;
  visibility: visible;
}
</style>
