<template>
  <div class="container">
    <h1>웹 개발자 소개</h1>
    
    <div class="section">
      <div class="content">
        <h2>전문 웹 개발자</h2>
        <p>
          2014년부터 웹 개발을 시작하여 현재는 프리랜서로 활동하고 있습니다. 
          다양한 프로젝트 경험을 바탕으로 최신 기술 트렌드를 따라가며 
          고객의 요구사항에 맞는 최적의 웹 솔루션을 제공합니다.
        </p>
        <ul>
          <li>프론트엔드 및 백엔드 개발</li>
          <li>반응형 웹 디자인</li>
          <li>최신 프레임워크 활용</li>
          <li>성능 최적화 및 보안 강화</li>
        </ul>
      </div>
      <div class="image-grid">
        <img src="/images/home-repair.jpg" alt="코딩 이미지 1">
        <img src="/images/home-repair.jpg" alt="코딩 이미지 2">
        <img src="/images/home-repair.jpg" alt="코딩 이미지 3">
        <img src="/images/home-repair.jpg" alt="코딩 이미지 4">
      </div>
    </div>

    <div class="section">
      <h2>개발 여정</h2>
      <div class="timeline">
        <div v-for="(item, index) in historyItems" :key="index" class="timeline-item">
          <h3>{{ item.year }}</h3>
          <p>{{ item.event }}</p>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>주요 기술 스택</h2>
      <div class="card-grid">
        <div class="card">
          <h3>백엔드</h3>
          <p>JAVA, Spring Boot, Node.js, Express, SQL, Supabase</p>
        </div>
        <div class="card">
          <h3>프론트엔드</h3>
          <p>Svelte.kit, Nuxt.js (Vue.js 3), Tailwind CSS</p>
        </div>
        <div class="card">
          <h3>개발환경</h3>
          <p>Cent OS 7, Git, Naver Cloud, Nginx, Docker, DNS</p>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>자격증</h2>
      <div class="card-grid">
        <div class="card" v-for="cert in certificates" :key="cert.title">
          <h3>{{ cert.title }}</h3>
          <p>{{ cert.description }}</p>
        </div>
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
  font-size: 32px;
  text-align: center;
  margin-bottom: 40px;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.section {
  margin-bottom: 40px;
}

.content {
  margin-bottom: 20px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.image-grid img {
  width: 100%;
  border-radius: 8px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.card {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.timeline {
  display: grid;
  gap: 20px;
}

.timeline-item {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

</style>

<script setup>
const historyItems = [
  { year: '2014', event: '웹 개발 학습 시작' },
  { year: '2015', event: '첫 웹사이트 프로젝트 완성' },
  { year: '2017', event: '프론트엔드 개발자로 첫 취업' },
  { year: '2019', event: '풀스택 개발자로 역량 확장' },
  { year: '2021', event: '프리랜서 개발자로 전환' },
  { year: '2023', event: '다수의 성공적인 프로젝트 완료' },
]

definePageMeta ({
  title: '웹 개발자 소개 - Dion',
  meta: [
    { name: 'description', content: 'Dion' },
    { name: 'keywords', content: 'Dion' }
  ],
})

</script>