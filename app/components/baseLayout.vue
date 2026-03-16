<script setup>
import backgroundVideo from "~/assets/video/videoDesk.MP4";
import backgroundVideoMob from "~/assets/video/videoMob.MP4";

const screenWidth = ref(0)
const isVideoLoaded = ref(false)
const videoRef = ref<HTMLVideoElement | null>(null)
const vid2 = ref<HTMLVideoElement | null>(null)

const handleVideoLoaded = () => {
  isVideoLoaded.value = true
}

onMounted(() => {
  screenWidth.value = window.innerWidth
  window.addEventListener("resize", () => {
    screenWidth.value = window.innerWidth
  })

  // Ждём загрузки видео
  nextTick(() => {
    const currentVideo = screenWidth.value > 1024 ? videoRef.value : vid2.value
    if (currentVideo) {
      if (currentVideo.readyState >= 3) {
        // Видео уже загружено
        isVideoLoaded.value = true
      } else {
        currentVideo.addEventListener('canplay', handleVideoLoaded, { once: true })
        currentVideo.addEventListener('loadeddata', handleVideoLoaded, { once: true })
      }
    }
  })
})
</script>
<template>
  <div class="layout">
    <div class="layout__container">
      <!-- Лоадер -->
      <Transition name="loader-fade">
        <div v-if="!isVideoLoaded" class="layout__loader">
          <div class="layout__loader-spinner"></div>
        </div>
      </Transition>

      <video
          v-if="screenWidth > 1024"
          ref="videoRef"
          class="layout__background-video"
          :src="backgroundVideo"
          autoplay
          muted
          playsinline
          loop
          preload="auto"
          @canplay="handleVideoLoaded"
          @loadeddata="handleVideoLoaded"
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
          preload="auto"
          @canplay="handleVideoLoaded"
          @loadeddata="handleVideoLoaded"
      ></video>
      <div class="content" :class="{ 'content_visible': isVideoLoaded }">
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

  &__loader {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  &__loader-spinner {
    width: 48px;
    height: 48px;
    border: 3px solid rgba(255, 255, 255, 0.2);
    border-top-color: #ffffff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
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
  opacity: 0;
  transition: opacity 0.6s ease-in;

  &_visible {
    opacity: 1;
  }

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

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loader-fade-enter-active,
.loader-fade-leave-active {
  transition: opacity 0.4s ease;
}

.loader-fade-enter-from,
.loader-fade-leave-to {
  opacity: 0;
}
</style>
