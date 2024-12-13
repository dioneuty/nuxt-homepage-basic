<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

const { checkAuth } = useAuth()

// 초기 컬러 모드 설정
onMounted(() => {

  // 인증 확인
  checkAuth()
})

</script>
<style>
</style>