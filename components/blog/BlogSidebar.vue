<template>
  <div class="blog-sidebar">
    <h2 class="sidebar-title">
      <Icon icon="icon-park-outline:category" class="category-icon" />
      카테고리
    </h2>
    <ul class="category-list">
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
    <NuxtLink to="/blog/edit-categories" class="edit-button">
      <Icon icon="icon-park-outline:edit" class="edit-icon" />
      카테고리 편집
    </NuxtLink>
  </div>
</template>

<style scoped>
.blog-sidebar {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  position: sticky;
  top: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}



.sidebar-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  color: #1f2937;
}

.category-icon {
  margin-right: 0.5rem;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.category-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  color: #374151;
  transition: all 0.2s ease-in-out;
}

.category-link:hover {
  background-color: #e5e7eb;
}



.category-link.active {
  background-color: #3b82f6;
  color: white;
}

.post-count {
  background-color: #e5e7eb;
  color: #4b5563;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
}


.edit-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.5rem 1rem;
  margin-top: 1.5rem;
  background-color: #e5e7eb;
  color: #4b5563;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
}

.edit-button:hover {
  background-color: #d1d5db;
}

.edit-icon {
  margin-right: 0.5rem;
}
</style>

<script setup>
import { Icon } from '@iconify/vue';

defineProps({
  categories: {
    type: Array,
    required: true
  }
})
</script>