<script setup lang="ts">
import { storeToRefs } from "pinia";
import useStore from "~/store";
import SectionText from "~/components/SectionText.vue";

const { currentPage } = storeToRefs(useStore());
</script>

<template>
  <div class="invitation">
    <span class="invitation__title">
      <AnimatedTitle
        :show="currentPage === 1"
        class="invitation__title"
        text="Дорогие и близкие"
      />
    </span>
    <SectionText>
      <p>
        Мы будем счастливы разделить с вами радость неповторимого для нас дня,
        дня нашей свадьбы.
      </p>
      <p>
        Приглашаем вас присоединиться к нашему празднику и украсить его своим
        присутствием.
      </p>
    </SectionText>
  </div>
</template>

<style lang="scss" scoped>
.invitation {
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

