<template>
  <div>
    <nav :key="navKey" :class="['nav', navStore.isAlwaysOnTop ? 'nav-fixed' : '']">
      <!-- 데스크톱 네비게이션 -->
      <div class="desktop-nav">
        <!-- 로고 영역 -->
        <div class="logo-area">
          <NuxtLink to="/" class="logo-link">
            <div class="logo">
              <!-- <WrenchScrewdriverIcon class="logo-icon" /> -->
              <span class="logo-text">{{ appName }}</span>
            </div>
          </NuxtLink>
        </div>
        <!-- 네비게이션 바 -->
        <div class="nav-bar">
          <div class="nav-container">
            <div class="menu-items">
              <template v-for="item in filteredMenuItems" :key="item.name">
                <!-- 자식 메뉴가 있는 경우 -->
                <div v-if="item.children" class="dropdown">
                  <NuxtLink v-if="item.path" :to="item.path" 
                    :class="['menu-link', { 'active': isActiveOrHasActiveChild(item) }]">
                    {{ item.name }}
                    <!-- <svg class="dropdown-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg> -->
                  </NuxtLink>
                  <!-- 드롭다운 메뉴 -->
                  <div class="dropdown-menu">
                    <div class="dropdown-content">
                      <NuxtLink v-for="child in item.children" :key="child.path"
                        :to="child.path"
                        :class="['dropdown-item', { 'active': isActive(child.path) }]">
                        {{ child.name }}
                      </NuxtLink>
                    </div>
                  </div>
                </div>
                <!-- 자식 메뉴가 없는 경우 -->
                <NuxtLink v-else :to="item.path" 
                  :class="['menu-link', { 'active': isActive(item.path) }]">
                  {{ item.name }}
                </NuxtLink>
              </template>
            </div>
            <!-- 우측 메뉴 -->
            <div class="right-menu">
              <button @click="toggleAlwaysOnTop" class="icon-button">
                <Icon :icon="navStore.isAlwaysOnTop ? 'mdi:pin-off' : 'mdi:pin'" />
              </button>
              <button @click="toggleColorMode" class="icon-button">
                <SunIcon v-if="$colorMode.value === 'light'" />
                <MoonIcon v-if="$colorMode.value === 'dark'" />
                <ComputerDesktopIcon v-if="$colorMode.value === 'system'" />
              </button>
              <!-- 로그인/회원가입 버튼 -->
              <div v-if="auth.isLoggedIn && auth.user" class="user-menu">
                <NuxtLink to="/personal-info" class="user-info">
                  <Icon icon="mdi:account-circle" />
                  <span>{{ auth.user.username }}</span>
                </NuxtLink>
                <button @click="logout" class="icon-button">
                  <Icon icon="mdi:logout" />
                </button>
              </div>
              <div v-else class="auth-buttons">
                <button @click="openLoginModal" class="icon-button">
                  <Icon icon="mdi:login" />
                </button>
                <button @click="openRegisterModal" class="icon-button">
                  <Icon icon="mdi:account-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 모바일 네비게이션 헤더 -->
      <div class="mobile-nav-header">
        <div class="mobile-nav-container">
          <button @click="openMenu" class="menu-button" :class="{ 'disabled': isMenuOpen }">
            <Bars3Icon class="menu-icon" />
          </button>
          <NuxtLink to="/" class="mobile-logo" :class="{ 'disabled': isMenuOpen }">
            <!-- <WrenchScrewdriverIcon class="mobile-logo-icon" /> -->
            <span>{{ appName }}</span>
          </NuxtLink>
          <div class="mobile-actions">
            <button @click="toggleColorMode" class="mobile-icon-button" :class="{ 'disabled': isMenuOpen }">
              <SunIcon v-if="$colorMode.value === 'light'" class="mobile-action-icon" />
              <MoonIcon v-if="$colorMode.value === 'dark'" class="mobile-action-icon" />
              <ComputerDesktopIcon v-if="$colorMode.value === 'system'" class="mobile-action-icon" />
            </button>
            <div v-if="auth.isLoggedIn && auth.user" class="mobile-user-menu">
              <NuxtLink to="/personal-info" class="mobile-user-info" :class="{ 'disabled': isMenuOpen }">
                <Icon icon="mdi:account-circle" class="mobile-action-icon" />
                <span>{{ auth.user.username }}</span>
              </NuxtLink>
              <button @click="logout" class="mobile-icon-button" :class="{ 'disabled': isMenuOpen }">
                <Icon icon="mdi:logout" class="mobile-action-icon" />
              </button>
            </div>
            <div v-else class="mobile-auth-buttons">
              <button @click="openLoginModal" class="mobile-icon-button" :class="{ 'disabled': isMenuOpen }">
                <Icon icon="mdi:login" class="mobile-action-icon" />
              </button>
              <button @click="openRegisterModal" class="mobile-icon-button" :class="{ 'disabled': isMenuOpen }">
                <Icon icon="mdi:account-plus" class="mobile-action-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 모바일 슬라이딩 메뉴 -->
      <div :class="['mobile-sliding-menu', isMenuOpen ? 'open' : '']">
        <div class="sliding-menu-content">
          <div class="sliding-menu-header">
            <NuxtLink to="/" class="sliding-menu-logo" @click="closeMenu">
              <span>{{ appName }}</span>
            </NuxtLink>
            <button @click="closeMenu" class="close-button">
              <XMarkIcon class="close-icon" />
            </button>
          </div>
          <div class="sliding-menu-items">
            <div v-for="item in filteredMenuItems" :key="item.name" class="menu-item">
              <div
                @click="handleItemClick(item)"
                :class="['menu-item-button', { 'active': isActiveOrHasActiveChild(item) }]"
              >
                {{ item.name }}
                <ChevronDownIcon
                  v-if="item.children"
                  :class="['chevron-icon', item.isOpen ? 'rotate' : '']"
                />
              </div>
              <transition name="slide">
                <div v-if="item.children && item.isOpen" class="submenu">
                  <NuxtLink
                    v-for="child in item.children"
                    :key="child.path"
                    :to="child.path"
                    :class="['submenu-item', { 'active': isActive(child.path) }]"
                    @click="closeMenu"
                  >
                    {{ child.name }}
                  </NuxtLink>
                </div>
              </transition>
            </div>
            <button @click="toggleColorMode" class="color-mode-button">
              <SunIcon v-if="$colorMode.value === 'light'" class="mode-icon" />
              <MoonIcon v-if="$colorMode.value === 'dark'" class="mode-icon" />
              <ComputerDesktopIcon v-if="$colorMode.value === 'system'" class="mode-icon" />
              {{ $colorMode.value === 'light' ? '다크 모드' : $colorMode.value === 'dark' ? '시스템 설정' : '라이트 모드' }}
            </button>
          </div>
        </div>
      </div>

      <!-- 오버레이 -->
      <div
        v-if="isMenuOpen"
        class="mobile-menu-overlay"
        @click="closeMenu"
      ></div>
    </nav>
  </div>
</template>

<script setup>
import { ref, inject, watch, onMounted, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { WrenchScrewdriverIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/vue/24/solid'
import { Icon } from '@iconify/vue'
import { useLoginModal } from '~/composables/useLoginModal'
import { useRegisterModal } from '~/composables/useRegisterModal'
import { useAuth } from '~/composables/useAuth'
import { useNavStore } from '~/stores/navStore'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const router = useRouter()
const navKey = ref(0)

function startProgress() {
  NProgress.start()
}

function endProgress() {
  NProgress.done()
}

const removeBeforeEach = ref(false)
const removeAfterEach = ref(false)

onMounted(() => {
  removeBeforeEach.value = router.beforeEach(startProgress)
  removeAfterEach.value = router.afterEach(endProgress)
})

onUnmounted(() => {
  if (removeBeforeEach.value) removeBeforeEach.value()
  if (removeAfterEach.value) removeAfterEach.value()
})

const appName = ref('Dion')

// 메뉴 아이템 배열
// 홈, 블로그, 소개, 서비스, 게시판, 문의, Q&A, 관리자용 문의 게시판, 관리자용 게시판, 위키
// 공사중 emoji 추가 
// 집 공사 관련 이모지
const constructionEmoji = '🏗️'
const hammerEmoji = '🔨'
const wrenchEmoji = '🔧'
const brickEmoji = '🧱'
const paintbrushEmoji = '🖌️'

const menuItems = ref([
  { name: '홈', path: '/' },
  { name: '블로그', path: '/blog' },
  { 
    name: '소개', 
    children: [

    ],
    isOpen: false
  },
  { name: '개인소개', path: '/about' },
  { name: '서비스', path: '/services' },
  { 
    name: '게시판', 
    children: [
      
    ],
    isOpen: false
  },
  { name: '자유게시판', path: '/board' },
  { name: '질문과답변', path: '/qna' },
  // { name: '유머게시판', path: '/humor' }
  { name: '문의', path: '/contact' },
  { name: '갤러리', path: '/gallery' },
  { name: '위키', path: '/wiki' },
  { name: '관련 사이트', path: '/related-sites' },
  { name: '종합 검색', path: '/search' },
  { name: '아웃라이너', path: '/outliner' },
  { 
    name: '외국어 학습', 
    children: [
      { name: '영어', path: '/english' },
      { name: '일본어', path: '/japanese' }
    ],
    isOpen: false
  },
  { 
    name: '관리자', 
    children: [
      { name: '관리자용 문의 게시판', path: '/contactboard' },
      { name: '관리자용 게시판', path: '/adminboard' },
      { name: '관리자용 갤러리', path: '/admingallery' },
    ],
    isOpen: false,
    adminOnly: true
  },
  { name: '유튜브 갤러리', path: '/youtube-gallery' }
])

const filteredMenuItems = computed(() => {
  return menuItems.value.filter(item => {
    if (item.adminOnly) {
      return auth.value.isLoggedIn && auth.value.user && auth.value.user.role === 'ADMIN'
    }
    return true
  })
})

function handleItemClick(item) {
  if (item.children) {
    item.isOpen = !item.isOpen
  } else if (item.path) {
    router.push(item.path)
    closeMenu()
  }
}

const colorMode = useColorMode()
function toggleColorMode() {
  if (colorMode.value === 'light') colorMode.value = 'dark' // 라이트 모드
  else if (colorMode.value === 'dark') colorMode.value = 'system' // 다크 모드
  else colorMode.value = 'light' // 시스템 설정
}
const isMenuOpen = ref(false)

function openMenu() {
  isMenuOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeMenu() {
  isMenuOpen.value = false
  document.body.style.overflow = ''
}

watch(isMenuOpen, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

const route = useRouter().currentRoute

function isActive(path) {
  return route.value.path === path
}

function isActiveOrHasActiveChild(item) {
  if (isActive(item.path)) {
    return true
  }
  if (item.children) {
    return item.children.some(child => isActive(child.path))
  }
  return false
}

defineProps({
  isMenuOpen: Boolean,
})

const emit = defineEmits(['openMenu', 'closeMenu', 'updateNavFixedState'])

const { openModal: openLoginModal } = useLoginModal()
const { openModal: openRegisterModal } = useRegisterModal()
const { auth, setAuth } = useAuth()

async function logout() {
  try {
    const response = await fetch('/api/user?type=logout', {
      method: 'POST',
    })
    if (response.ok) {
      setAuth(false, null)
      // 로그아웃 후 메인 페이지로 리다이렉트
      router.push('/')
    } else {
      console.error('로그아웃 실패')
    }
  } catch (error) {
    console.error('로그아웃 중 오류 발생:', error)
  }
}

const navStore = useNavStore()

function toggleAlwaysOnTop() {
  updateBodyPadding()
  
  // navStore 업데이트
  navStore.toggleIsAlwaysOnTop()
}

const navHeight = ref(120)

function updateBodyPadding() {
  // navStore의 값 사용
  if (navStore.isAlwaysOnTop) {
    document.body.style.paddingTop = `${navHeight.value}px`
  } else {
    document.body.style.paddingTop = '0px'
  }
}

onMounted(() => {
  updateBodyPadding()
  navKey.value++ //강제 리렌더링 유도
  window.addEventListener('resize', updateBodyPadding)
})

// ... (기존 코드 유지)

// isAlwaysOnTop watch 대신 navStore.isAlwaysOnTop watch
watch(() => navStore.isAlwaysOnTop, (newValue) => {
  emit('updateNavFixedState', newValue)
  updateBodyPadding()
})

// ... (나머지 기존 코드 유지)
</script>
<style scoped>
.nav {
  width: 100%;
  transition: all 0.3s ease-in-out;
}

.nav-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.desktop-nav {
  display: none;
}

@media (min-width: 1024px) {
  .desktop-nav {
    display: block;
  }
}

.logo-area {
  background-color: #2563eb;
  height: 4rem;
  position: relative;
  overflow: hidden;
}

.dark .logo-area {
  background-color: #1f2937;
}

.logo-link {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  color: white;
  font-size: 1.875rem;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.logo-icon {
  height: 2rem;
  width: 2rem;
  margin-right: 0.5rem;
}

.logo-text {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.nav-bar {
  background-color: #2563eb;
  color: white;
  padding: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.dark .nav-bar {
  background-color: #1f2937;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-items {
  display: flex;
  gap: 1rem;
}

.menu-link {
  color: white;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  transition: color 0.2s;
}

.menu-link:hover {
  color: #bfdbfe;
}

.menu-link.active {
  color: #fde047;
  font-weight: bold;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-arrow {
  width: 1rem;
  height: 1rem;
  margin-left: 0.25rem;
  transition: transform 0.2s;
}

.dropdown:hover .dropdown-arrow {
  transform: rotate(180deg);
}

.dropdown-menu {
  display: none;
  position: absolute;
  left: 0;
  top: 100%;
  width: 12rem;
  background: white;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.dark .dropdown-menu {
  background: #374151;
}

.dropdown:hover .dropdown-menu {
  display: block;
}

.dropdown-item {
  display: block;
  padding: 0.5rem 1rem;
  color: #374151;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.dark .dropdown-item {
  color: #e5e7eb;
}

.dropdown-item:hover {
  background-color: #3b82f6;
  color: white;
}

.dropdown-item.active {
  background-color: #3b82f6;
  color: white;
}

.right-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon-button {
  color: white;
  padding: 0.5rem;
  border-radius: 9999px;
  transition: color 0.2s;
}

.icon-button:hover {
  color: #bfdbfe;
}

.icon-button svg {
  width: 1.5rem;
  height: 1.5rem;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  transition: color 0.2s;
}

.user-info:hover {
  color: #bfdbfe;
}

.auth-buttons {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* 모바일 네비게이션 스타일 */
.mobile-nav-header {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background-color: #2563eb;
  padding: 0.5rem 1rem;
}

.dark .mobile-nav-header {
  background-color: #1f2937;
}

@media (max-width: 1023px) {
  .mobile-nav-header {
    display: block;
  }
}

.mobile-nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menu-button {
  color: white;
  padding: 0.5rem;
}

.menu-button.disabled {
  pointer-events: none;
}

.menu-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.mobile-logo {
  display: flex;
  align-items: center;
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  text-decoration: none;
}

.mobile-logo.disabled {
  pointer-events: none;
}

.mobile-logo-icon {
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
}

.mobile-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.mobile-icon-button {
  color: white;
  padding: 0.5rem;
  border-radius: 9999px;
}

.mobile-icon-button.disabled {
  pointer-events: none;
}

.mobile-action-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.mobile-user-menu {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.mobile-user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  text-decoration: none;
}

.mobile-user-info.disabled {
  pointer-events: none;
}

.mobile-auth-buttons {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* 모바일 슬라이딩 메뉴 */
.mobile-sliding-menu {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 18rem;
  background: linear-gradient(to bottom, #2563eb, #1d4ed8);
  color: white;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
  z-index: 50;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
}

.dark .mobile-sliding-menu {
  background: linear-gradient(to bottom, #1f2937, #111827);
}

.mobile-sliding-menu.open {
  transform: translateX(0);
}

.sliding-menu-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sliding-menu-header {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sliding-menu-logo {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.close-button {
  color: white;
  padding: 0.5rem;
}

.close-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.sliding-menu-items {
  flex-grow: 1;
  padding: 0.5rem;
  overflow-y: auto;
}

.menu-item {
  margin-bottom: 0.5rem;
}

.menu-item-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  width: 100%;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.menu-item-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.menu-item-button.active {
  background-color: rgba(255, 255, 255, 0.2);
  color: #fde047;
  font-weight: bold;
}

.chevron-icon {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 0.2s;
}

.chevron-icon.rotate {
  transform: rotate(180deg);
}

.submenu {
  margin-left: 1rem;
  margin-top: 0.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
}

.submenu-item {
  display: block;
  padding: 0.5rem 1rem;
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
}

.submenu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.submenu-item.active {
  background-color: rgba(255, 255, 255, 0.2);
  color: #fde047;
  font-weight: bold;
}

.color-mode-button {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem 1rem;
  color: white;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
}

.color-mode-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.mode-icon {
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
}

.mobile-menu-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 40;
}

/* 슬라이드 트랜지션 애니메이션 */
.slide-enter-active {
  transition: all 0.3s ease-out;
}

.slide-leave-active {
  transition: all 0.2s ease-in;
}

.slide-enter-from {
  transform: translateY(-1rem);
  opacity: 0;
}

.slide-leave-to {
  transform: translateY(-1rem);
  opacity: 0;
}
</style>