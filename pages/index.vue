<template>
  <div class="container">
    메인 페이지
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.section {
  margin-bottom: 30px;
}

h2 {
  font-size: 20px;
  margin-bottom: 15px;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox {
  position: relative;
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border: 2px solid #ccc;
  border-radius: 4px;
}

input[type="checkbox"]:checked + .checkmark {
  background-color: #4a90e2;
  border-color: #4a90e2;
}

input[type="checkbox"]:checked + .checkmark:after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.loading-icon {
  animation: spin 1s linear infinite;
  width: 32px;
  height: 32px;
  margin-bottom: 10px;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (prefers-color-scheme: dark) {
  .checkmark {
    background-color: #333;
    border-color: #555;
  }

  h2, .label-text {
    color: #fff;
  }

  .loading p {
    color: #ccc;
  }
}
</style>

<script setup>
import { ref, computed, defineAsyncComponent, onMounted, watch } from 'vue'
import { Icon } from '@iconify/vue'

const sections = [
  { id: 'carousel', label: '슬라이드 보기' },
  { id: 'posts', label: '게시판 보기' },
  { id: 'gallery', label: '갤러리 보기' },
  { id: 'weather', label: '일기예보' },
  { id: 'calendar', label: '달력' },
]

const selectedSections = ref([])

onMounted(() => {
  const savedSections = localStorage.getItem('selectedSections')
  if (savedSections) {
    selectedSections.value = JSON.parse(savedSections)
  } else {
    selectedSections.value = ['carousel']
  }
})

watch(selectedSections, (newValue) => {
  localStorage.setItem('selectedSections', JSON.stringify(newValue))
}, { deep: true })

function getSectionComponent(sectionId) {
  switch (sectionId) {
    case 'carousel':
      return defineAsyncComponent(() => import('@/components/home/CarouselSection.vue'))
    case 'posts':
      return defineAsyncComponent(() => import('@/components/home/PostsSection.vue'))
    case 'gallery':
      return defineAsyncComponent(() => import('@/components/home/GallerySection.vue'))
    case 'weather':
      return defineAsyncComponent(() => import('@/components/home/WeatherSection.vue'))
    case 'calendar':
      return defineAsyncComponent(() => import('@/components/home/CalendarSection.vue'))
    default:
      return null
  }
}

const apiEndpoint = '/api/gallery'
const galleryStore = useGalleryStore()

definePageMeta({
  title: 'Dion - 홈',
  meta: [
    { name: 'description', content: 'Dion의 메인 페이지입니다.' },
    { name: 'keywords', content: 'Dion, 홈, 메인' }
  ]
})
</script>
