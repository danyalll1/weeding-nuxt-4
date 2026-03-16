<template>
  <div class="section-text">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.section-text {
  max-width: 640px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @include mf-s-breakpoint {
    gap: 24px;
  }

  p {
    @include font(20px, 24px, 400);

    @include mf-s-breakpoint {
      @include font(24px, 28px, 400);
    }
  }
}
</style>

