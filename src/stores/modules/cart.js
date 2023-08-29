import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  getCartListApi,
  addCartApi,
  delCartApi,
  changeSelectApi,
  changeNumApi
} from '@/api/cart'

export const useCartStore = defineStore('cart', () => {
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
  const totalCount = computed(() =>
    cartList.value.reduce((sum, item) => sum + item.count, 0)
  )
  const totalPrice = computed(() =>
    cartList.value.reduce((sum, item) => sum + item.count * item.price, 0)
  )
  const isAllSelected = computed(() =>
    cartList.value.every((item) => item.selected)
  )
  const selectedCount = computed(() =>
    cartList.value
      .filter((item) => item.selected)
      .reduce((sum, item) => sum + item.count, 0)
  )
  const selectedPrice = computed(() => {
    return cartList.value
      .filter((item) => item.selected)
      .reduce((sum, item) => sum + item.count * item.price, 0)
  })
  const isIndeterminate = computed(
    () =>
      cartList.value.some((item) => item.selected) &&
      !cartList.value.every((item) => item.selected)
  )
  return {
    cartList,
    getCartList,
    addCart,
    delCart,
    changeCartSelect,
    changeNum,
    totalCount,
    totalPrice,
    isAllSelected,
    selectedCount,
    selectedPrice,
    isIndeterminate
  }
})
