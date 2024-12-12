<template>
  <div class="container">
    <div class="content">
      <div class="icon">
        <svg class="arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
      <h1>공사 중입니다</h1>
      <p>더 나은 서비스를 위해 준비 중입니다. 곧 돌아오겠습니다!</p>
      <div class="buttons">
        <NuxtLink to="/" class="btn primary">홈으로 돌아가기</NuxtLink>
        <a href="mailto:contact@bluedrills.com" class="btn secondary">문의하기</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}

.content {
  text-align: center;
  padding: 20px;
}

.icon {
  margin-bottom: 20px;
}

.arrow {
  width: 60px;
  height: 60px;
  color: #4a90e2;
  animation: bounce 1s infinite;
}

h1 {
  font-size: 24px;
  margin-bottom: 15px;
}

p {
  margin-bottom: 20px;
}

.buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.primary {
  background: #4a90e2;
  color: white;
}

.primary:hover {
  background: #357abd;
}

.secondary {
  background: #666;
  color: white;
}

.secondary:hover {
  background: #555;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@media (prefers-color-scheme: dark) {
  .container {
    background: #1a1a1a;
    color: white;
  }
}
</style>