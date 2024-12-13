<template>
  <div class="layout-container">
    <Nav 
      :isMenuOpen="isMenuOpen" 
      @openMenu="openMenu" 
      @closeMenu="closeMenu" 
    />
    <div class="content-wrapper">
      <Sidebar />
      <div class="main-content">
        <slot />
      </div>
    </div>
    <Footer />
    <ScrollToTop />
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

.content-wrapper {
  display: flex;
  width: 1500px;
  padding-top: 100px;
  max-width: 2000px;
  margin: 0 auto;
  flex-grow: 1;
  margin-top: 100px;
}

.main-content {
  flex-grow: 1;
  padding: 30px;
  background-color: #fff;
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
import Nav from '~/components/layout/Nav.vue'
import Footer from '~/components/layout/Footer.vue'
import Sidebar from '~/components/layout/Sidebar.vue'
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