<template>
  <div class="layout-container">
    <Nav 
      :isMenuOpen="isMenuOpen" 
      @openMenu="openMenu" 
      @closeMenu="closeMenu" 
    />
    <div class="main-content">
      <slot />
    </div>
    <Footer />
    <!-- <ScrollToTop /> -->
    <!-- 배경 오버레이 -->
    <div
      v-if="isMenuOpen"
      class="menu-overlay"
      @click.self="closeMenu"
    ></div>
  </div>
</template>

<style scoped>
.layout-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex-grow: 1;
}

.menu-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 40;
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import Nav from '~/components/Nav.vue'
import Footer from '~/components/Footer.vue'
import ScrollToTop from '~/components/common/ScrollToTop.vue'

const isMenuOpen = ref(false)

function openMenu() {
  isMenuOpen.value = true
  document.body.classList.add('menu-open')
}

function closeMenu() {
  isMenuOpen.value = false
  document.body.classList.remove('menu-open')
}
</script>