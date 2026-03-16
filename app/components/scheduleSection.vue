<script setup lang="ts">
import { storeToRefs } from "pinia";
import useStore from "~/store";
import SectionText from "~/components/SectionText.vue";

const { currentPage } = storeToRefs(useStore());
</script>

<template>
  <div class="schedule">
    <AnimatedTitle
      :show="currentPage === 4"
      class="schedule__title"
      text="Расписание дня банкета"
    />

    <div class="schedule__items">
      <div class="schedule__item">
        <div class="schedule__time">15:00</div>
        <div class="schedule__info">
          <div class="schedule__subtitle">Сбор гостей</div>
          <SectionText>
            <p>
              Время пролетит незаметно за игристым и общением с другими гостями.
            </p>
          </SectionText>
        </div>
      </div>

      <div class="schedule__item">
        <div class="schedule__time">16:00</div>
        <div class="schedule__info">
          <div class="schedule__subtitle">Церемония</div>
          <SectionText>
            <p>
              На всякий случай подготовьте платочки для трогательных моментов.
            </p>
          </SectionText>
        </div>
      </div>

      <div class="schedule__item">
        <div class="schedule__time">17:00</div>
        <div class="schedule__info">
          <div class="schedule__subtitle">Начало банкета</div>
          <SectionText>
            <p>
              Вкусные блюда и весёлая программа от нашего крутого ведущего.
            </p>
          </SectionText>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.schedule {
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

  &__items {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    max-width: 720px;

    @include mf-s-breakpoint {
      gap: 24px;
    }
  }

  &__item {
    display: flex;
    gap: 16px;
    align-items: flex-start;

    @include mf-s-breakpoint {
      gap: 24px;
    }
  }

  &__time {
    @include font(20px, 24px, 600);
    min-width: 72px;
    text-align: right;

    @include mf-s-breakpoint {
      @include font(24px, 28px, 600);
      min-width: 96px;
    }
  }

  &__info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;

    @include mf-s-breakpoint {
      gap: 12px;
    }
  }

  &__subtitle {
    @include font(18px, 24px, 500);

    @include mf-s-breakpoint {
      @include font(20px, 26px, 500);
    }
  }

  :deep(.section-text) {
    align-items: flex-start;
    text-align: left;
  }

  :deep(.section-text p) {
    text-align: left;
  }
}
</style>

