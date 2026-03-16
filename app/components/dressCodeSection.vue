<script setup lang="ts">
import { storeToRefs } from "pinia";
import useStore from "~/store";
import SectionText from "~/components/SectionText.vue";

const { currentPage } = storeToRefs(useStore());
</script>

<template>
  <div class="dress">
    <AnimatedTitle
      :show="currentPage === 3"
      class="dress__title"
      text="Дресс-код"
    />

    <SectionText>
      <p>
        Просим поддержать цветовую гамму вечера в одежде оттенков красного вина.
      </p>
    </SectionText>

    <div class="dress__palette">
      <div
        v-for="(color, index) in 5"
        :key="index"
        class="dress__circle"
        :class="`dress__circle_${index + 1}`"
      ></div>
    </div>

    <SectionText>
      <p class="dress__note">
        Белый цвет просим оставить для невесты.
      </p>
    </SectionText>
  </div>
</template>

<style lang="scss" scoped>
.dress {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 16px;

  @include mf-s-breakpoint {
    gap: 40px;
    padding: 32px;
  }

  &__title {
    @include titleFont();
    text-align: center;
  }

  &__palette {
    display: flex;
    gap: 16px;
    margin-top: 8px;

    @include mf-s-breakpoint {
      gap: 24px;
    }
  }

  &__circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.8);

    @include mf-s-breakpoint {
      width: 56px;
      height: 56px;
    }

    &_1 {
      background: #2b0613; // самое темное вино
    }

    &_2 {
      background: #4d0c1f;
    }

    &_3 {
      background: #7b102b;
    }

    &_4 {
      background: #a51a36;
    }

    &_5 {
      background: #d43445; // более светлый ягодный
    }
  }

  &__note {
    opacity: 0.9;
  }
}
</style>

