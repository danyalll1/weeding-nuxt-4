<script setup lang="ts">
import { storeToRefs } from "pinia";
import useStore from "~/store";
import SectionText from "~/components/SectionText.vue";

const { currentPage } = storeToRefs(useStore());
</script>

<template>
  <div class="wishes">
    <AnimatedTitle
      :show="currentPage === 6"
      class="wishes__title"
      text="Пожелания"
    />

    <SectionText>
      <p>
        Мы хотим, чтобы ваши руки были свободны для объятий, будем рады лёгким
        подаркам в конвертах!
      </p>
      <p>
        Приятным комплиментом для нас будет, если вместо цветов, вы решите
        подарить нам бутылочку вина для нашей семейной винотеки.
      </p>
    </SectionText>
  </div>
</template>

<style lang="scss" scoped>
.wishes {
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
}
</style>

