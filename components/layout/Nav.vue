<template>
  <div>
    <nav :key="navKey" class="nav">
      <!-- 상단 유틸리티 메뉴 -->
      <div class="utility-nav" :class="{ 'hidden': isScrolled }">
        <div class="utility-container">
          <div class="right-utils">
            <p>오늘의 환율 <span style="color: red;">$1 = 1428.1원</span></p>
            <template v-if="auth.isLoggedIn && auth.user">
              <span class="util-item">👤 {{ auth.user.username }}</span>
              <span class="util-item">로그아웃</span>
            </template>
            <template v-else>
              <span class="util-item">로그인</span>
              <span class="util-item">회원가입</span>
              <span class="util-item">공지사항</span>
            </template>
          </div>
        </div>
      </div>

      <!-- 메인 네비게이션 -->
      <div class="main-nav">
        <div class="nav-container">
          <!-- 로고 영역 -->
          <div class="logo-area">
            <NuxtLink to="/" class="logo-link">
              <img src="/images/kbk-logo.jpg" alt="로고" class="logo-image">
            </NuxtLink>
          </div>

          <!-- 메인 메뉴 -->
          <div class="menu-items">
            <template v-for="item in filteredMenuItems" :key="item.name">
              <div v-if="item.children" class="menu-item dropdown">
                <NuxtLink v-if="item.path" :to="item.path" 
                  :class="['menu-link', { 'active': isActiveOrHasActiveChild(item) }]">
                  {{ item.name }}
                </NuxtLink>
                <div class="dropdown-menu">
                  <NuxtLink v-for="child in item.children" :key="child.path"
                    :to="child.path"
                    :class="['dropdown-item', { 'active': isActive(child.path) }]">
                    {{ child.name }}
                  </NuxtLink>
                </div>
              </div>
              <NuxtLink v-else :to="item.path" 
                :class="['menu-item', { 'active': isActive(item.path) }]">
                {{ item.name }}
              </NuxtLink>
            </template>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, inject, watch, onMounted, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/common/useAuth.js'
import { useNavStore } from '~/stores/navStore.js'
// import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'

// const router = useRouter()
// const navKey = ref(0)

// function startProgress() {
//   NProgress.start()
// }

// function endProgress() {
//   NProgress.done()
// }

// const removeBeforeEach = ref(false)
// const removeAfterEach = ref(false)

// onMounted(() => {
//   removeBeforeEach.value = router.beforeEach(startProgress)
//   removeAfterEach.value = router.afterEach(endProgress)
// })

// onUnmounted(() => {
//   if (removeBeforeEach.value) removeBeforeEach.value()
//   if (removeAfterEach.value) removeAfterEach.value()
// })

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
  { name: '샘플 - 소개', path: '/sample/about' },
  { name: '샘플 - 연락', path: '/sample/contact' },
  { name: '회원가입', path: '/member/signup' },
  { name: '본인 인증', path: '/member/verify' },
  { name: '회원가입 정보입력', path: '/member/form' },
  { name: '가입완료', path: '/member/complete' },
  { name: '아이디/비밀번호 찾기', path: '/auth/find' },
  { name: '이용약관', path: '/terms/service' },
  { name: '개인정보처리방침', path: '/terms/privacy' },
  { name: '공지사항 목록', path: '/cs/notice' },
  { name: '공지사항 상세', path: '/cs/detail' },
  { name: '주문내역', path: '/order/history' },
  { name: '주문상세', path: '/order/detail' },
  { name: '장바구니', path: '/order/cart' },
  { name: '결제요청', path: '/payment/request' },
  { name: '결제완료', path: '/payment/complete' },
  { name: '마이페이지', path: '/profile/dashboard' },
  { name: '마이페이지 여권정보', path: '/profile/passport' },
  { name: '마이페이지 입국정보', path: '/profile/entry' },
  { name: '마이페이지 출국정보', path: '/profile/exit' },
  { name: '마이페이지 회원정보 수정 전 인증', path: '/profile/verify' },
  { name: '마이페이지 회원정보', path: '/profile/info' }
])


const filteredMenuItems = computed(() => {
  return menuItems.value.filter(item => {
    if (item.adminOnly) {
      return auth.value.isLoggedIn && auth.value.user && auth.value.user.role === 'ADMIN'
    }
    return true
  })
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

// onMounted(() => {
//   updateBodyPadding()
//   //navKey.value++ //강제 리렌더링 유도
//   window.addEventListener('resize', updateBodyPadding)
// })

// ... (기존 코드 유지)

// isAlwaysOnTop watch 대신 navStore.isAlwaysOnTop watch
// watch(() => navStore.isAlwaysOnTop, (newValue) => {
//   emit('updateNavFixedState', newValue)
//   updateBodyPadding()
// })

// ... (나머지 기존 코드 유지)

const isScrolled = ref(false)

// 스크롤 이벤트 핸들러
const handleScroll = () => {
  isScrolled.value = window.scrollY > 0
}

// 컴포넌트 마운트 시 스크롤 이벤트 리스너 추가
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

// 컴포넌트 언마운트 시 이벤트 리스너 제거
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
<style scoped>
.nav {
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  border-bottom: 1px solid #e5e7eb;
}

.utility-nav {
  background-color: white;
  height: 35px;
  overflow: hidden;
}

.utility-nav.hidden {
  height: 0;
  padding: 0;
  opacity: 0;
}

.utility-container {
  /* max-width: 1200px; */
  margin: 0 auto;
  padding: 0 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.right-utils {
  display: flex;
  gap: 0;
  margin-left: auto;
}

.util-item {
  color: #666;
  cursor: pointer;
  padding: 0 10px;
  font-size: 13px;
  position: relative;
}

/* 구분선 스타일 */
.util-item:not(:last-child)::after {
  content: "";
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 12px;
  background-color: #ddd;
}

.util-item:hover {
  color: #000;
}

.main-nav {
  background-color: white;
  padding: 20px 0;
}

.nav-container {
  /* max-width: 1200px; */
  margin: 0 auto;
  padding: 0 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-area {
  width: 200px;
}

.logo-image {
  height: 40px;
  width: auto;
}

.menu-items {
  display: flex;
  gap: 40px;
}

.menu-item {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  text-decoration: none;
  position: relative;
}

.menu-item:hover {
  color: #2563eb;
}

.menu-item.active {
  color: #2563eb;
}

.dropdown {
  position: relative;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  min-width: 200px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  padding: 8px 0;
}

.dropdown:hover .dropdown-menu {
  display: block;
}

.dropdown-item {
  display: block;
  padding: 8px 16px;
  color: #333;
  text-decoration: none;
}

.dropdown-item:hover {
  background-color: #f3f4f6;
}

.dropdown-item.active {
  color: #2563eb;
}

@media (max-width: 1024px) {
  .menu-items {
    display: none;
  }
}
</style>