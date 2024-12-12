// plugins/axios.ts
import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const instance = axios.create({
    baseURL: 'http://your-api-url',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    }
  })

  // 요청 인터셉터
  instance.interceptors.request.use(
    (config) => {
      // 요청 보내기 전 처리
      return config
    },
    (error) => {
      // 요청 에러 처리
      return Promise.reject(error)
    }
  )

  // 응답 인터셉터
  instance.interceptors.response.use(
    (response) => {
      // 응답 데이터 처리
      return response
    },
    (error) => {
      // 응답 에러 처리
      return Promise.reject(error)
    }
  )

  return {
    provide: {
      axios: instance
    }
  }
})