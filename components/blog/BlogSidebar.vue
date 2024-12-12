<template>
  <div class="blog-sidebar">
    <!-- 나의 쇼핑정보 섹션 -->
    <div class="sidebar-section">
      <h2 class="section-title">나의 쇼핑정보</h2>
      <ul class="menu-list">
        <li>
          <NuxtLink to="/mypage/orders" class="menu-item">주문 / 취소내역</NuxtLink>
        </li>
      </ul>
    </div>

    <!-- 나의 정보 섹션 -->
    <div class="sidebar-section">
      <h2 class="section-title">나의 정보</h2>
      <ul class="menu-list">
        <li>
          <NuxtLink to="/mypage/profile" class="menu-item">여권 정보</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/mypage/passport" class="menu-item">입국 정보</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/mypage/membership" class="menu-item">회원 정보 수정</NuxtLink>
        </li>
        
        <li v-for="(category, index) in categories" :key="index">
          <NuxtLink 
            :to="category.id === '0' ? '/blog?category=0' : `/blog?category=${category.id}`" 
            class="category-link"
            :class="{ active: $route.query.category == category.id }"
          >
            <span>{{ category.name }}</span>
            <span class="post-count">{{ category.post_count }}</span>
          </NuxtLink>
        </li>
    
      </ul>
      
    </div>

    <!-- 고객센터 섹션 -->
    <div class="sidebar-section">
      <h2 class="section-title">고객센터</h2>
      <ul class="menu-list">
        <li>
          <NuxtLink to="/notice" class="menu-item">공지사항</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.blog-sidebar {
  background-color: white;
}

.sidebar-section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  display: block;
  padding: 8px 0;
  color: #666;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s ease;
}

.menu-item:hover {
  color: #000;
}

.menu-item.active {
  color: #000;
  font-weight: bold;
}
</style>

<script setup>
defineProps({
  categories: {
    type: Array,
    required: true
  }
})
</script>