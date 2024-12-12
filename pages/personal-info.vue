<template>
  <div class="container">
    <h1>개인정보</h1>
    <div class="info-box">
      <div v-if="!isEditing" class="view-mode">
        <div class="avatar">
          <Icon icon="mdi:account-circle" />
        </div>
        <p><strong>이름:</strong> {{ personalInfo.username }}</p>
        <p><strong>이메일:</strong> {{ personalInfo.email }}</p>
        <button @click="startEditing" class="btn">편집</button>
      </div>

      <form v-else @submit.prevent="saveChanges" class="edit-mode">
        <div class="form-group">
          <label for="username">이름:</label>
          <input v-model="editedInfo.username" id="username" type="text" required>
        </div>
        <div class="form-group">
          <label for="email">이메일:</label>
          <input v-model="editedInfo.email" id="email" type="email" required>
        </div>
        <div class="form-group">
          <label for="password">새 비밀번호:</label>
          <input v-model="editedInfo.password" id="password" type="password">
        </div>
        <div class="form-group">
          <label for="confirmPassword">비밀번호 확인:</label>
          <input v-model="editedInfo.confirmPassword" id="confirmPassword" type="password">
        </div>
        <div class="btn-group">
          <button type="submit" class="btn save">저장</button>
          <button type="button" @click="cancelEditing" class="btn cancel">취소</button>
        </div>
      </form>
    </div>
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
  margin-bottom: 20px;
}

.info-box {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 4px;
}

.avatar {
  text-align: center;
  margin-bottom: 20px;
  font-size: 48px;
  color: #4a90e2;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.btn {
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 4px;
  background: #4a90e2;
  color: white;
  cursor: pointer;
}

.btn-group {
  display: flex;
  gap: 10px;
}

.save {
  background: #4caf50;
}

.cancel {
  background: #666;
}

@media (prefers-color-scheme: dark) {
  .info-box {
    background: #333;
    border-color: #444;
    color: white;
  }

  input {
    background: #444;
    border-color: #555;
    color: white;
  }
}
</style>

<script setup>
import { ref, reactive } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { Icon } from '@iconify/vue'

const { auth } = useAuth()

const personalInfo = ref({})
const editedInfo = ref({})
const isEditing = ref(false)

const { data: userData, refresh } = await useFetch('/api/user?type=check', {
  server: false,
  lazy: true
})

watch(userData, function() {
  if (userData.value && userData.value.isLoggedIn && userData.value.user) {
    personalInfo.value = userData.value.user
    editedInfo.value = { ...userData.value.user, password: '', confirmPassword: '' }
  } else {
    // 로그인되지 않은 경우 처리
    navigateTo('/login')
  }
})

onMounted(function() {
  refresh()
})

function startEditing() {
  isEditing.value = true
}

function cancelEditing() {
  editedInfo.value = { ...personalInfo.value, password: '', confirmPassword: '' }
  isEditing.value = false
}

async function saveChanges(event) {
  event.preventDefault()
  if (editedInfo.value.password !== editedInfo.value.confirmPassword) {
    alert('비밀번호가 일치하지 않습니다.')
    return
  }

  try {
    const { data, error } = await useFetch('/api/user?type=update', {
      method: 'POST',
      body: {
        username: editedInfo.value.username,
        email: editedInfo.value.email,
        password: editedInfo.value.password || undefined
      }
    })

    if (error.value) {
      throw error.value
    }

    if (data.value && data.value.success) {
      personalInfo.value = { 
        ...editedInfo.value, 
        password: undefined, 
        confirmPassword: undefined 
      }
      isEditing.value = false
      alert('개인정보가 성공적으로 업데이트되었습니다.')
      refresh() // 사용자 정보 새로고침
    } else {
      throw new Error(data.value.message || '사용자 정보 업데이트에 실패했습니다.')
    }
  } catch (error) {
    console.error('사용자 정보 업데이트 중 오류 발생:', error)
    alert('사용자 정보 업데이트 중 오류가 발생했습니다.')
  }
}
</script>