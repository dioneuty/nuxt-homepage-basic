<template>
  <div class="container">
    메인 페이지
    ddfddddddddd
    d
    dd
    dd
    d
    d
    d
    dd
    d
    d
    d
    d

    d
    d
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
import { ref, onMounted, watch } from 'vue'



definePageMeta({
  title: 'Dion - 홈',
  meta: [
    { name: 'description', content: 'Dion의 메인 페이지입니다.' },
    { name: 'keywords', content: 'Dion, 홈, 메인' }
  ]
})
</script>
