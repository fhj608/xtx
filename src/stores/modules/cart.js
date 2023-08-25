import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getCartListApi,
  addCartApi,
  delCartApi,
  changeSelectApi,
  changeNumApi
} from '@/api/cart'

export const useCartStore = defineStore(
  'cart',
  () => {
    const cartList = ref([])
    const getCartList = async () => {
      const res = await getCartListApi()
      cartList.value = res.result
    }
    getCartList()
    const addCart = async (data) => {
      const res = await addCartApi(data)
      ElMessage.success(res.msg)
      getCartList()
    }
    const delCart = async (ids) => {
      const { msg } = await delCartApi(ids)
      ElMessage.success(msg)
      getCartList()
    }
    const changeCartSelect = async (data) => {
      await changeSelectApi(data)
      getCartList()
    }
    const changeNum = async (id, num) => {
      await changeNumApi(id, num)
      getCartList()
    }
    return {
      cartList,
      getCartList,
      addCart,
      delCart,
      changeCartSelect,
      changeNum
    }
  },
  {
    persist: true
  }
)
