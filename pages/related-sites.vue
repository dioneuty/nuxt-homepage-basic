<template>
  <div class="container">
    <h1>
      <Icon icon="mdi:link-variant" class="icon" />
      관련 사이트
    </h1>
    
    <div class="sites-grid">
      <div v-for="site in relatedSites" :key="site.id" class="site-card">
        <a :href="site.url" target="_blank" rel="noopener noreferrer">
          <div class="site-content">
            <div class="site-header">
              <img v-if="site.customIcon" :src="site.customIcon" class="site-icon" alt="사이트 아이콘">
              <Icon v-if="site.icon" :icon="site.icon" class="icon" />
              <h2>{{ site.name }}</h2>
            </div>
            <p>{{ site.description }}</p>
          </div>
          <div class="visit-btn">방문하기</div>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
}

.icon {
  vertical-align: middle;
}

.sites-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .sites-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .sites-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.site-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.site-card:hover {
  transform: scale(1.02);
  transition: transform 0.3s;
}

.site-content {
  padding: 15px;
}

.site-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.site-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

h2 {
  font-size: 18px;
}

.visit-btn {
  background: #4a90e2;
  color: white;
  text-align: center;
  padding: 8px;
}

a {
  text-decoration: none;
  color: inherit;
}

@media (prefers-color-scheme: dark) {
  .site-card {
    background: #333;
    border-color: #444;
    color: white;
  }

  .visit-btn {
    background: #2d5a8e;
  }
}
</style>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

definePageMeta ({
  title: '관련 사이트 - Dion',
  meta: [
    { name: 'description', content: 'Dion - 관련 사이트' },
    { name: 'keywords', content: 'Dion, 관련 사이트' }
  ]
})

let idx = 0

const relatedSites = ref([
  {
    id: idx++,
    name: '블루드릴',
    url: 'https://bluedrills.com',
    description: '블루드릴 공식 웹사이트입니다. 다양한 정보와 서비스를 제공합니다.',
    customIcon: '/icons/logo260260-nobg.png'
  },
  // 블루드릴 네이버 블로그 (https://blog.naver.com/bluedrills)
  {
    id: idx++,
    name: '블루드릴 네이버 블로그',
    url: 'https://blog.naver.com/bluedrills',
    description: '블루드릴 네이버 블로그입니다. 합리적인 가격과 양질의 서비스를 제공합니다.',
    icon: 'mdi:blog',
    customIcon: '/icons/logo260260-nobg.png'
  },
  // 플라워 써클 유튜브 (https://www.youtube.com/@%ED%94%8C%EB%9D%BC%EC%9B%8C%EC%8D%A8%ED%81%B4)
  {
    id: idx++,
    name: '플라워 써클 유튜브',
    url: 'https://www.youtube.com/@플라워써클',
    description: '플라워 써클 유튜브입니다. 매우 즐거운 동물 관련 유머 동영���을 보여줍니다.',
    icon: 'mdi:youtube',
    customIcon: '/icons/channels4_profile.jpg'
  },
  {
    id: idx++,
    name: '네이버 지도',
    url: 'https://map.naver.com',
    description: '네이버에서 제공하는 지도 서비스입니다. 길찾기, 주변 검색 등 다양한 기능을 제공합니다.',
    icon: 'mdi:map'
  },
  {
    id: idx++,
    name: '깃허브',
    url: 'https://github.com',
    description: '개발자들을 위한 버전 관리 및 협업 플랫폼입니다.',
    icon: 'mdi:github'
  },
  {
    id: idx++,
    name: 'Stack Overflow',
    url: 'https://stackoverflow.com',
    description: '프로그래머를 위한 질문답변 커뮤니티입니다.',
    icon: 'mdi:stack-overflow'
  },
  {
    id: idx++,
    name: 'MDN Web Docs',
    url: 'https://developer.mozilla.org',
    description: '웹 기술에 대한 포괄적인 문서를 제공하는 리소스입니다.',
    icon: 'mdi:mozilla'
  },
  {
    id: idx++,
    name: 'Vue.js',
    url: 'https://vuejs.org',
    description: '사용자 인터페이스를 구축하기 위한 진보적인 JavaScript 프레임워크입니다.',
    icon: 'mdi:vuejs'
  }
])
</script>