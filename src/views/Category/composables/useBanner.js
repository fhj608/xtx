import { ref, onMounted } from 'vue'
import { getBannerApi } from '@/api/home'

export const useBanner = () => {
  const bannerList = ref([])
  const getBanner = async () => {
    const { result } = await getBannerApi({ distributionSite: '2' })
    bannerList.value = result
  }
  onMounted(() => {
    getBanner()
  })
  return {
    bannerList
  }
}
