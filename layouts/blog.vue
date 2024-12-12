<template>
  <div class="blog-layout">
    <Nav :isMenuOpen="isMenuOpen" @toggleMenu="toggleMenu" @closeMenu="closeMenu" />
    <div class="blog-container" :class="{ 'nav-fixed': navStore.isAlwaysOnTop }">
      <aside class="blog-sidebar">
        <BlogSidebar :categories="categories" />
      </aside>
      <main class="blog-main">
        <MobileCategoryDropdown 
          v-if="showMobileCategory" 
          :categories="categories" 
          class="mobile-category" 
        />
        <slot />
      </main>
    </div>
    <Footer />
    <ScrollToTop />
    <!-- 배경 오버레이 -->
    <Transition name="fade">
      <div 
        v-if="isMenuOpen" 
        class="menu-overlay"
        @click="closeMenu"
      ></div>
    </Transition>
  </div>
</template>

<style scoped>
.blog-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: white;
}

.blog-container {
  /* container: 1200px; */
  /* margin: 2rem auto 0; */
  padding: 2rem 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .blog-container {
    margin-top: 4rem;
    flex-direction: row;
  }
}

.blog-container.nav-fixed {
  padding-top: 7rem;
}

.blog-sidebar {
  width: 100%;
  padding-right: 0;
  margin-bottom: 2rem;
  display: none;
}

@media (min-width: 768px) {
  .blog-sidebar {
    width: 25%;
    padding-right: 2rem;
    margin-bottom: 0;
    display: block;
  }
}

.blog-main {
  width: 100%;
}

@media (min-width: 768px) {
  .blog-main {
    width: 75%;
  }
}

.mobile-category {
  display: none;
}

@media (max-width: 767px) {
  .mobile-category {
    display: block;
  }
}

.menu-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 40;
}

/* 페이드 트랜지션 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import Nav from '~/components/Nav.vue'
import Footer from '~/components/Footer.vue'
import BlogSidebar from '~/components/blog/BlogSidebar.vue'
import MobileCategoryDropdown from '~/components/MobileCategoryDropdown.vue'
import ScrollToTop from '~/components/common/ScrollToTop.vue'
import { useRoute } from 'vue-router'
import { useNavStore } from '~/stores/navStore'

const route = useRoute()
const categories = ref([])
const isMenuOpen = ref(false)
const navStore = useNavStore()

async function fetchCategories() {
  try {
    const response = await fetch('/api/categories?include=uncategorized_all')
    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }
    categories.value = await response.json()
  } catch (error) {
    console.error('카테고리를 불러오는 데 실패했습니다:', error)
  }
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}

// 초기 카테고리 로드
onMounted(fetchCategories)

// 카테고리 갱신 함수를 제공
provide('refreshCategories', fetchCategories)
</script>