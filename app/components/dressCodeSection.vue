<script setup lang="ts">
import { storeToRefs } from "pinia";
import useStore from "~/store";
import SectionText from "~/components/SectionText.vue";

const { currentPage } = storeToRefs(useStore());

const imageList = [
  "/dresscode/002a7ce247243d7c1777b48dfdf21849.png",
  "/dresscode/3e3bfcca696022afe08fa1b0744422fe.png",
  "/dresscode/3f1f74ac224ef1abb3c420b060427f61.png",
  "/dresscode/4c259abb7a68351e9441dbe9a15056f2.png",
  "/dresscode/66be0420536941b5d6db9693262748eb.png",
  "/dresscode/6c532781b1ff736b4654b45cab484a2e.png",
  "/dresscode/752880a6d56fc7cbb087b68b8b04c030.png",
  "/dresscode/de1ea5518b310763cf76b13be97a3f08.png",
];
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

    <div class="dress__images">
      <div
        v-for="(src, index) in imageList"
        :key="src"
        class="dress__image"
        :data-index="index + 1"
        :style="{
          '--delay': `${index * 0.25}s`,
          '--z': imageList.length - index
        }"
      ></div>
    </div>

    <div class="dress__palette">
      <div class="dress__row dress__row_top">
        <div class="dress__circle dress__circle_1"></div>
        <div class="dress__circle dress__circle_2"></div>
        <div class="dress__circle dress__circle_3"></div>
        <div class="dress__circle dress__circle_4"></div>
      </div>
      <div class="dress__row dress__row_bottom">
        <div class="dress__circle dress__circle_5"></div>
        <div class="dress__circle dress__circle_6"></div>
        <div class="dress__circle dress__circle_7"></div>
      </div>
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
    flex-direction: column;
    gap: 8px;
    margin-top: 16px;
  }

  &__row {
    display: flex;
    justify-content: center;
    gap: 24px;

    @include mf-s-breakpoint {
      gap: 28px;
    }

    &_bottom {
      // Второй ряд просто чуть наезжает по вертикали,
      // центровка по горизонтали совпадает с верхним рядом
      margin-top: -30px;
    }
  }

  &__circle {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.8);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    @include mf-s-breakpoint {
      width: 90px;
      height: 90px;
    }

    &_1 {
      background-image: url("/dresscode/colors/1768ab4efd0b554fe79e9e955f7466ee.png");
    }

    &_4 {
      background-image: url("/dresscode/colors/8f2fdb8c36af3189fe2dcc1be7929586.png");
    }

    &_2 {
      background-image: url("/dresscode/colors/7be36187b1816821173b8444736a2e0a.png");
    }

    &_5 {
      background-image: url("/dresscode/colors/9dc4403326aa5249b454b6a1f926885a.png");
    }

    &_3 {
      background-image: url("/dresscode/colors/7caeee3829972d1ee8bcfaf557ce94e5.png");
    }

    // Дополнительные кружки с оставшимися цветами — без сложного наезда
    &_6 {
      background-image: url("/dresscode/colors/eaa8f203d661945ad39c0201a2313ad4.png");
    }

    &_7 {
      background-image: url("/dresscode/colors/eb7cd69f4f9be8987111d22a0f7ff708.png");
    }
  }

  &__note {
    opacity: 0.9;
  }

  &__images {
    display: flex;
    justify-content: center;
    margin-top: 16px;
    gap: 0;
    position: relative;
    overflow: visible;
  }

  &__image {
    width: 96px;
    height: 200px;
    border-radius: 12px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0;
    transform: translateY(12px);
    animation: dress-image-appear 0.7s ease-out forwards;
    animation-delay: var(--delay);
    z-index: var(--z);
    margin-left: -51px; // одинаковый наезд картинок друг на друга

    &:first-child {
      margin-left: 0;
    }

    &[data-index="1"] {
      background-image: url("/dresscode/002a7ce247243d7c1777b48dfdf21849.png");
    }

    &[data-index="2"] {
      background-image: url("/dresscode/3e3bfcca696022afe08fa1b0744422fe.png");
    }

    &[data-index="3"] {
      background-image: url("/dresscode/3f1f74ac224ef1abb3c420b060427f61.png");
    }

    &[data-index="4"] {
      background-image: url("/dresscode/4c259abb7a68351e9441dbe9a15056f2.png");
    }

    &[data-index="5"] {
      background-image: url("/dresscode/66be0420536941b5d6db9693262748eb.png");
    }

    &[data-index="6"] {
      background-image: url("/dresscode/6c532781b1ff736b4654b45cab484a2e.png");
    }

    &[data-index="7"] {
      background-image: url("/dresscode/752880a6d56fc7cbb087b68b8b04c030.png");
    }

    &[data-index="8"] {
      background-image: url("/dresscode/de1ea5518b310763cf76b13be97a3f08.png");
    }
  }
}

@keyframes dress-image-appear {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

