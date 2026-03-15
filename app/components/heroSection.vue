<script setup lang="ts">
import {storeToRefs} from "pinia";
import useStore from "~/store";

const {currentPage} = storeToRefs(useStore())
</script>
<template>
  <div class="hero">
    <div class="hero__container">
      <div class="hero__container-top">
        <span class="hero__pretitle">Вы приглашены</span>
        <span class="hero__pretitle hero__pretitle_small">на главную свадьбу 2026 года</span>
      </div>
      <div class="hero__container-center">
        <AnimatedTitle
          :show="currentPage === 0"
          class="hero__title"
          :appear="true"
          text="Даниил"
        />

        <AnimatedTitle
          :show="currentPage === 0"
          class="hero__title hero__title_small"
          :appear="true"
          text="&"
        />

        <AnimatedTitle
          :show="currentPage === 0"
          class="hero__title"
          :appear="true"
          text="Екатерина"
        />
      </div>
      <div class="hero__container-bottom">
        15 <span>Августа</span> 2026
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.hero {

  &__container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    pointer-events: none;

    &-top {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    &-center {
      margin-top: 64px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      align-items: center;
    }

    &-bottom {
      margin-top: 64px;
      text-align: center;
    }
  }

  &__pretitle {
    @include font(32px, 36px, 400);
    text-align: center;

    &_small {
      @include font(24px, 28px, 400);
    }
  }

  &__title {
    @include titleFont();


    &_small {
      @include titleFontSmall();
    }
  }
}
</style>