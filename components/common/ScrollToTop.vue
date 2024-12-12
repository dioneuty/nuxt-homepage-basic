<template>
  <transition name="fade">
    <button
      v-show="showButton"
      @click="scrollToTop"
      class="scroll-top-button"
      aria-label="페이지 상단으로 이동"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="scroll-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  </transition>
</template>
  
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
  
const showButton = ref(false)
  
function checkScroll() {
  showButton.value = window.pageYOffset > 300
}
  
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
  
onMounted(() => {
  window.addEventListener('scroll', checkScroll)
})
  
onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>
  
<style scoped>
.scroll-top-button {
  position: fixed;
  bottom: 32px;
  right: 32px;
  background-color: #3b82f6;
  color: white;
  border-radius: 9999px;
  padding: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 50;
  border: none;
  cursor: pointer;
}

.scroll-top-button:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.scroll-icon {
  height: 32px;
  width: 32px;
}

.fade-enter-active, 
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from, 
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .scroll-top-button {
    bottom: 16px;
    right: 16px;
    padding: 8px;
  }

  .scroll-icon {
    height: 24px;
    width: 24px;
  }
}
</style>