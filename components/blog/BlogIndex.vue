<template>
  <div class="blog-container">
    <h1 class="blog-title">
      <Icon icon="mdi:post-outline" class="title-icon" />
      {{ title }}
    </h1>
    
    <div v-if="pending" class="loading-container">
      <Icon icon="eos-icons:loading" class="loading-icon" />
    </div>
    
    <div v-else-if="error" class="error-message">
      <p class="error-title">에러 발생</p>
      <p>{{ error }}</p>
    </div>
    
    <div v-else>
      <div v-if="posts.length === 0" class="empty-message">
        <Icon icon="mdi:folder-open-outline" class="empty-icon" />
        <p>{{ emptyMessage }}</p>
      </div>
      
      <div v-else class="posts-grid">
        <div v-for="post in posts" :key="post.id" 
             class="post-card"
             @click="navigateToPost(post.id)">
          <div class="post-content">
            <h2 class="post-title">
              <span class="post-title-text">
                <Icon icon="mdi:file-document-outline" class="post-icon" />
                {{ post.title }}
              </span>
            </h2>
            <p class="post-excerpt" v-html="post.content.substring(0, 100) + '...'"></p>
            <div class="post-date">
              <Icon icon="mdi:calendar" class="date-icon" />
              <span>{{ formatDate(post.createdAt) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="write-button-container">
      <NuxtLink :to="writeLink" class="write-button">
        <Icon icon="mdi:pencil" class="write-icon" />
        {{ writeButtonText }}
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.blog-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.blog-title {
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
}

.title-icon {
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 0.75rem;
  color: #3b82f6;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 16rem;
}

.loading-icon {
  width: 3rem;
  height: 3rem;
  color: #3b82f6;
}

.error-message {
  background-color: #fee2e2;
  border-left: 4px solid #ef4444;
  color: #b91c1c;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.error-title {
  font-weight: bold;
}

.empty-message {
  text-align: center;
  color: #6b7280;
  padding: 3rem 0;
}


.empty-icon {
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1rem;
}

.posts-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .posts-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .posts-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.post-card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s;
  cursor: pointer;
}


.post-card:hover {
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  background-color: #f3f4f6;
}


.post-content {
  padding: 1.5rem;
}

.post-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.post-title-text {
  display: flex;
  align-items: center;
  transition: color 0.2s;
}

.post-title-text:hover {
  color: #3b82f6;
}

.post-icon {
  margin-right: 0.5rem;
}

.post-excerpt {
  color: #4b5563;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}



.post-date {
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  color: #6b7280;
}


.date-icon {
  margin-right: 0.25rem;
}

.write-button-container {
  margin-top: 2rem;
  text-align: right;
}

.write-button {
  display: inline-flex;
  align-items: center;
  background-color: #3b82f6;
  color: white;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
}

.write-button:hover {
  background-color: #2563eb;
}

.write-icon {
  margin-right: 0.5rem;
}
</style>

<script setup>
import { Icon } from '@iconify/vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  title: { type: String, default: '블로그' },
  emptyMessage: { type: String, default: '게시물이 존재하지 않습니다.' },
  writeButtonText: { type: String, default: '글쓰기' },
  writeLink: { type: String, default: '/blog/write' },
  postLink: { type: String, default: '/blog/view' },
  apiEndpoint: { type: String, required: true }
})

const posts = ref([])
const pending = ref(false)
const error = ref(null)

const router = useRouter()

function navigateToPost(postId) {
  router.push(`${props.postLink}?id=${postId}`)
}

async function fetchPosts() {
  pending.value = true
  try {
    const { data } = await useFetch(props.apiEndpoint, {
      method: 'GET'
    })
    posts.value = data.value
  } catch (e) {
    error.value = e
  } finally {
    pending.value = false
  }
}

onBeforeMount(fetchPosts)
onMounted(fetchPosts)


function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString()
}
</script>