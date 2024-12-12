<template>
  <div class="carousel-container">
    <div class="carousel-wrapper">
      <transition-group name="fade" tag="div" class="carousel-content">
        <div v-for="(image, index) in images" :key="index" 
             v-show="index === currentIndex" 
             class="carousel-item">
          <img :src="image" class="carousel-image" alt="Carousel image" />
        </div>
      </transition-group>
    </div>
    <button @click="prev" 
            @mouseenter="pauseAutoSlide" 
            @mouseleave="resumeAutoSlide" 
            class="carousel-button prev-button">
      <Icon icon="mdi:chevron-left" class="button-icon" />
    </button>
    <button @click="next" 
            @mouseenter="pauseAutoSlide" 
            @mouseleave="resumeAutoSlide" 
            class="carousel-button next-button">
      <Icon icon="mdi:chevron-right" class="button-icon" />
    </button>
    <div class="carousel-dots">
      <button 
        v-for="(_, index) in images" 
        :key="index" 
        @click="goToSlide(index)"
        @mouseenter="pauseAutoSlide"
        @mouseleave="resumeAutoSlide"
        :class="['carousel-dot', { active: currentIndex === index }]"
      ></button>
    </div>
  </div>
</template>

<style scoped>
.carousel-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 비율 */
  overflow: hidden;
}

.carousel-wrapper {
  position: absolute;
  inset: 0;
}

.carousel-content {
  height: 100%;
}

.carousel-item {
  position: absolute;
  inset: 0;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  padding: 0.5rem;
  z-index: 10;
  cursor: pointer;
  transition: background-color 0.3s;
}

.carousel-button:hover {
  background-color: rgba(255, 255, 255, 0.8);
}

.prev-button {
  left: 0.5rem;
}

.next-button {
  right: 0.5rem;
}

.button-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.carousel-dots {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 10;
}

.carousel-dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: rgba(209, 213, 219, 0.8); /* gray-300 equivalent */
  cursor: pointer;
  transition: background-color 0.3s;
}

.carousel-dot.active {
  background-color: white;
}

/* 페이드 트랜지션 효과 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  autoSlideInterval: {
    type: Number,
    default: 2000 // 5초마다 슬라이드 변경
  }
})

const currentIndex = ref(0)
let autoSlideTimer = null
let isAutoSlidePaused = false

function next() {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

function prev() {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
}

function goToSlide(index) {
  currentIndex.value = index
}

function startAutoSlide() {
  stopAutoSlide() // 기존 타이머 제거
  autoSlideTimer = setInterval(() => {
    if (!isAutoSlidePaused) {
      next()
    }
  }, props.autoSlideInterval)
}

function stopAutoSlide() {
  if (autoSlideTimer) {
    clearInterval(autoSlideTimer)
  }
}

function pauseAutoSlide() {
  isAutoSlidePaused = true
}

function resumeAutoSlide() {
  isAutoSlidePaused = false
}

onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  stopAutoSlide()
})
</script>