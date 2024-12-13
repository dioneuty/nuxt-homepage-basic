<template>
  <div class="container">
    <h1>
      <Icon icon="mdi:email-outline" class="icon" />
      문의하기
    </h1>
    <form @submit.prevent="submitForm" class="contact-form">
      <div class="form-group">
        <label for="title">
          <Icon icon="mdi:form-textbox" class="icon" />
          제목 <span class="required">*</span>
        </label>
        <input type="text" id="title" v-model="form.title" required>
      </div>

      <div class="form-group">
        <label for="author">
          <Icon icon="mdi:account" class="icon" />
          이름 <span class="required">*</span>
        </label>
        <input type="text" id="author" v-model="form.author" required>
      </div>

      <div class="form-group">
        <label for="email">
          <Icon icon="mdi:email" class="icon" />
          이메일 <span class="required">*</span>
        </label>
        <input type="email" id="email" v-model="form.email" required>
      </div>

      <div class="form-group">
        <label for="content">
          <Icon icon="mdi:message-text" class="icon" />
          메시지 <span class="required">*</span>
        </label>
        <textarea id="content" v-model="form.content" rows="4" required></textarea>
      </div>

      <div class="button-group">
        <button type="submit" class="submit-btn">
          <Icon icon="mdi:send" class="icon" />
          메시지 전송
        </button>
        <button type="button" @click="goBack" class="back-btn">
          <Icon icon="mdi:arrow-left" class="icon" />
          이전
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
}

.contact-form {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.required {
  color: red;
}

input, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.submit-btn {
  background: #4a90e2;
  color: white;
}

.back-btn {
  background: #ddd;
  color: #333;
}

.icon {
  display: inline-block;
  vertical-align: middle;
}

@media (prefers-color-scheme: dark) {
  .contact-form {
    background: #333;
    border-color: #444;
  }

  input, textarea {
    background: #444;
    color: #fff;
    border-color: #555;
  }

  label {
    color: #fff;
  }

  .back-btn {
    background: #555;
    color: #fff;
  }
}
</style>

<script setup>
import { Icon } from '@iconify/vue';

const form = ref({
  name: '',
  email: '',
  message: ''
})

// 이전 버튼 클릭 시 호출되는 함수
function goBack() {
  // 이전 페이지로 이동
  window.history.back();
}

async function submitForm() {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value) // 폼 데이터 전송
    });
    const { openModal } = useModal();
    const router = useRouter();

    if (response.ok) {
      openModal('성공', '문의가 성공적으로 전송되었습니다.', () => {
        router.push('/');
      });
    } else {
      openModal('오류', '문의 전송에 실패했습니다. 다시 시도해 주세요.');
    }
  } catch (error) {
    console.error('오류 발생:', error);
  }
}

definePageMeta ({
  title: '문의하기 - Dion',
  meta: [
    { name: 'description', content: '문의 - Dion' },
    { name: 'keywords', content: 'Dion, 문의' }
  ]
})
</script>