<script setup lang="ts">
import useStore from "~/store";
import {storeToRefs} from "pinia";

const { currentPage } = storeToRefs(useStore())
</script>
<template>
  <div class="calendar">
    <AnimatedTitle 
      :show="currentPage === 5" 
      class="calendar__title"
      text="Даты"
    />
    <div class="calendar__container">
      <Calendar />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.calendar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 16px;
  @include mf-s-breakpoint {
    gap: 48px;
    padding: 32px;
  }

  &__title {
    @include titleFont();
  }

  &__container {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>