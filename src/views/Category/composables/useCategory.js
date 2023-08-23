import { ref, onMounted } from 'vue'
import { getCategoryService } from '@/api/category'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

export const useCategory = () => {
  const route = useRoute()
  const category = ref({})
  const getCategory = async (id = route.params.id) => {
    const { result } = await getCategoryService(id)
    category.value = result
  }
  onMounted(() => {
    getCategory()
  })

  onBeforeRouteUpdate((to) => {
    getCategory(to.params.id)
  })
  return {
    category
  }
}
