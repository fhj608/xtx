import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCategoryListService } from '@/api/category.js'

export const useCategoryStore = defineStore(
  'category',
  () => {
    const categoryList = ref([])
    const getCategory = async () => {
      const { result } = await getCategoryListService()
      categoryList.value = result
    }
    return {
      categoryList,
      getCategory
    }
  },
  {
    persist: true
  }
)
