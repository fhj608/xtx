<script setup>
import powSet from '@/utils/power-set'
const props = defineProps({
  goods: {
    type: Object,
    default: () => ({ specs: [], skus: [] })
  }
})
const emit = defineEmits(['change'])
const getPathMap = (skus) => {
  const pathMap = {}
  skus.forEach((sku) => {
    if (sku.inventory > 0) {
      const skuList = sku.specs.map((item) => item.valueName)
      const powerSku = powSet(skuList)
      powerSku.forEach((item) => {
        if (item.length === 0) return
        const key = item.join('-')
        if (pathMap[key]) {
          pathMap[key].push(sku.id)
        } else {
          pathMap[key] = [sku.id]
        }
      })
    }
  })
  return pathMap
}
const pathMap = getPathMap(props.goods.skus)

const initStatus = (specs) => {
  specs.forEach((spec) => {
    spec.values.forEach((val) => {
      if (pathMap[val.name]) {
        val.disabled = false
      } else {
        val.disabled = true
      }
    })
  })
}
initStatus(props.goods.specs)

const getSelectedSpecs = (specs) => {
  const selectedSpecs = []
  specs.forEach((spec) => {
    const selectedItem = spec.values.find((item) => item.selected)
    selectedSpecs.push(selectedItem ? selectedItem.name : undefined)
  })
  return selectedSpecs
}
const updateStatus = (specs) => {
  specs.forEach((spec, index) => {
    const selectedSpecs = getSelectedSpecs(specs)
    spec.values.forEach((item) => {
      selectedSpecs[index] = item.name
      const key = selectedSpecs.filter((item) => item).join('-')
      if (pathMap[key]) {
        item.disabled = false
      } else {
        item.disabled = true
      }
    })
  })
}
const handleSelectSpec = (item, val) => {
  if (val.disabled) return
  let sku = {}
  if (val.selected) {
    val.selected = false
  } else {
    item.values.forEach((i) => {
      i.selected = false
    })
    val.selected = true
    const selectedSpecs = getSelectedSpecs(props.goods.specs).filter(
      (item) => item
    )

    if (selectedSpecs.length === props.goods.specs.length) {
      const skuId = pathMap[selectedSpecs.join('-')]
      sku = props.goods.skus.find((item) => item.id === skuId[0])
    } else {
      updateStatus(props.goods.specs)
    }
  }

  emit('change', sku)
}
</script>

<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <!-- 图片类型规格 -->
          <img
            v-if="val.picture"
            @click="handleSelectSpec(item, val)"
            :src="val.picture"
            :title="val.name"
            :class="{ disabled: val.disabled, selected: val.selected }"
          />
          <!-- 文字类型规格 -->
          <span
            v-else
            @click="handleSelectSpec(item, val)"
            :class="{ disabled: val.disabled, selected: val.selected }"
            >{{ val.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>

<style scoped lang="scss">
@mixin sku-state-mixin {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.selected {
    border-color: #27ba9b;
  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      > img {
        width: 50px;
        height: 50px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }

      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }
    }
  }
}
</style>
