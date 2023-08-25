import request from '@/utils/request'

export const getCartListApi = () => request.get('/member/cart')

export const addCartApi = (data) => request.post('/member/cart', data)

export const delCartApi = (ids) =>
  request.delete(`/member/cart/`, { data: { ids } })

export const changeSelectApi = (data) =>
  request.put('/member/cart/selected', data)

export const changeNumApi = (id, num) =>
  request.put(`/member/cart/${id}`, { count: num })
