<template>
  <NuxtLayout>
    <div class="error-container">
      <div class="error-box">
        <h1 class="error-title">
          {{ error.statusCode === 404 ? '페이지를 찾을 수 없습니다' : '오류가 발생했습니다' }}
        </h1>
        <p class="error-message">
          {{ error.message }}
        </p>
        <button @click="handleError" class="error-button">
          이전 페이지로 돌아가기
        </button>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>

<style scoped>
.error-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px;
}

.error-box {
  background-color: white;
  border-radius: 8px;
  padding: 32px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.error-title {
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 16px;
  color: #1f2937;
}

.error-message {
  font-size: 1.25rem;
  margin-bottom: 32px;
  color: #6b7280;
}

.error-button {
  background-color: #3b82f6;
  color: white;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.error-button:hover {
  background-color: #2563eb;
}

@media (max-width: 640px) {
  .error-container {
    padding: 16px;
  }

  .error-box {
    padding: 24px;
  }

  .error-title {
    font-size: 1.75rem;
  }

  .error-message {
    font-size: 1rem;
  }
}
</style>