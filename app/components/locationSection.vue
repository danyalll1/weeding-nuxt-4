<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { storeToRefs } from "pinia";
import useStore from "~/store";
import SectionText from "~/components/SectionText.vue";

const { currentPage } = storeToRefs(useStore());

const mapContainer = ref<HTMLElement | null>(null);
const mapInstance = ref<any>(null);

const YMAPS_SRC =
  "https://api-maps.yandex.ru/v3/?apikey=c7423381-2265-4c36-af4e-bf607bdde646&lang=ru_RU";

const loadYandexMaps = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return resolve();

    if ((window as any).ymaps3) {
      return resolve();
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src^="https://api-maps.yandex.ru/v3/"]`
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve());
      existingScript.addEventListener("error", (e) => reject(e));
      return;
    }

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = YMAPS_SRC;
    script.async = true;

    script.onload = () => resolve();
    script.onerror = (e) => reject(e);

    document.head.appendChild(script);
  });
};

const initMap = async () => {
  if (!mapContainer.value || typeof window === "undefined" || mapInstance.value) return;

  try {
    await loadYandexMaps();

    const ymaps3 = (window as any).ymaps3;
    if (!ymaps3) return;

    // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
    await ymaps3.ready;

    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = ymaps3;

    // Координаты усадьбы Танменгонт: [долгота, широта]
    const locationCoordinates: [number, number] = [29.544006, 59.878477];

    // Инициализируем карту
    const map = new YMap(
      // Передаём ссылку на HTMLElement контейнера
      mapContainer.value,
      // Передаём параметры инициализации карты
      {
        location: {
          // Координаты центра карты
          center: locationCoordinates,
          // Уровень масштабирования
          zoom: 15,
        },
      }
    );

    // Добавляем слой для отображения схематической карты
    map.addChild(new YMapDefaultSchemeLayer());

    // Добавляем слой для маркеров
    map.addChild(new YMapDefaultFeaturesLayer());

    // Создаём простой DOM-элемент для маркера
    const markerContent = document.createElement("div");
    markerContent.className = "location-marker";

    // Инициализируем маркер (по доке: https://yandex.ru/maps-api/docs/js-api/object/markers/index.html)
    const marker = new YMapMarker(
      {
        coordinates: locationCoordinates,
      },
      markerContent
    );

    // Добавляем маркер на карту
    map.addChild(marker);

    mapInstance.value = map;
  } catch (error) {
    console.error("Ошибка при загрузке карты:", error);
  }
};

onMounted(() => {
  initMap();
});

onUnmounted(() => {
  // Очищаем карту при размонтировании компонента
  if (mapInstance.value) {
    mapInstance.value.destroy();
    mapInstance.value = null;
  }
});
</script>

<template>
  <div class="location">
    <AnimatedTitle
      :show="currentPage === 2"
      class="location__title"
      text="Свадебная локация"
    />
    <div class="location__content">
        
    <SectionText>
      <p>
        Усадьба располагается вдали от городского шума, в окружении природы и
        спокойствия.
      </p>
    </SectionText>
    <Transition name="location-map-fade">
      <div
        v-show="currentPage === 2"
        class="location__map"
        ref="mapContainer"
      ></div>
    </Transition>
    <a
      class="location__route-link"
      href="https://yandex.ru/maps/?rtext=~59.878477,29.544006"
      target="_blank"
      rel="noopener noreferrer"
    >
      Проложить маршрут
    </a>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.location {
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

  &__map {
    margin-top: 16px;
    width: 100%;
    height: 330px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
    
    @include mf-s-breakpoint {
      height: 400px;
    }
  }

  &__route-link {
    margin-top: 16px;
    @include font(16px, 20px, 500);
    color: #ffffff;
    text-decoration: underline;
    text-underline-offset: 4px;
    cursor: pointer;

    &:hover {
      color: rgba(255, 255, 255, 0.85);
    }
  }

  :deep(.location-marker) {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #ff4d6d;
    border: 3px solid #ffffff;
    box-shadow: 0 0 12px rgba(255, 77, 109, 0.8);
    transform: translate(-50%, -50%);
  }
}

.location-map-fade-enter-active,
.location-map-fade-leave-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.location-map-fade-enter-from,
.location-map-fade-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>

