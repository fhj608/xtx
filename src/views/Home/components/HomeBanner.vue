<script setup>
import { getBannerApi } from '@/api/home'
import { ref, onMounted } from 'vue'
const bannerList = ref([])
const getBanner = async () => {
  const { result } = await getBannerApi()
  bannerList.value = result
}
onMounted(() => {
  getBanner()
})
</script>

<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <a :href="item.hrefUrl"><img :src="item.imgUrl" alt="" /></a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang="scss">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>
