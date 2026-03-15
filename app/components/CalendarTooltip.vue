<script setup lang="ts">
interface Props {
  text: string;
  position: { top: number; left: number } | null;
}

const props = defineProps<Props>()

const show = computed(() => {
  return props.position !== null
})
</script>

<template>
  <div
    v-if="show"
    class="calendar-tooltip"
    :style="{
      top: `${position?.top}px`,
      left: `${position?.left}px`
    }"
    @click.stop
  >
    {{ text }}
  </div>
</template>

<style lang="scss" scoped>
.calendar-tooltip {
  position: fixed;
  transform: translate(-50%, calc(-100% - 12px));
  padding: 16px 24px;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10000px);
  -webkit-backdrop-filter: blur(1000px);
  color: white;
  border-radius: 12px;
  @include font(18px, 24px, 500);
  white-space: nowrap;
  z-index: 1000;
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
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  }
}
</style>
