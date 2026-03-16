<script setup>
import backgroundVideo from "~/assets/video/videoDesk.MP4";
import backgroundVideoMob from "~/assets/video/videoMob.MP4";


const screenWidth = ref(0)
onMounted(() => {
  screenWidth.value = window.innerWidth
  window.addEventListener("resize", () => {
    screenWidth.value = window.innerWidth
  })
})
</script>
<template>
  <div class="layout">
    <div class="layout__container">
      <video
          v-if="screenWidth > 1024"
          ref="videoRef"
          class="layout__background-video"
          :src="backgroundVideo"
          autoplay
          muted
          playsinline
          loop
      ></video>
      <video
          v-else
          ref="vid2"
          class="layout__background-video"
          :src="backgroundVideoMob"
          autoplay
          muted
          playsinline
          loop
      ></video>
      <div class="content ">
        <div class="content__container container">
          <div
              class="content__sections-wrapper"
              :class="['show']"
          >
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template><style lang="scss" scoped>

.layout {
  height: 100%;
  overflow: hidden;
  background-color: #000;

  &__container {
    height: 100%;
    backdrop-filter: blur(10px);
    position: relative;
    overflow: hidden;
    background-color: #000;
  }

  &__background-video {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    z-index: 0;
    object-fit: cover;
    object-position: center;
  }
}

.header {
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: transparent;

  &__container {
    display: flex;
    padding: 16px 0;
    gap: 16px;
    background-color: transparent;
  }
}

.content {
  height: 100%;
  position: relative;
  z-index: 1;

  &__container {
    position: relative;
    height: 100%;
    padding-top: 16px;
    padding-bottom: 16px;
    @include mf-s-breakpoint{
      padding-top: 64px;
      padding-bottom: 64px;
    }


  }
  &__sections-wrapper {
    position: relative;
    perspective: 1500px;
    perspective-origin: center center;
    transform-style: preserve-3d;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: opacity 0.8s ease-out;

    &.show {
      opacity: 1;
    }
  }
}
</style>
