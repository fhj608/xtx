import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({})
    const setUserInfo = (info) => {
      userInfo.value = info
    }
    return {
      userInfo,
      setUserInfo
    }
  },
  {
    persist: true
  }
)
