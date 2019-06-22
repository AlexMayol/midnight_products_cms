<template>
  <div>
    <product-list></product-list>
  </div>
</template>

<script>
import ProductList from '../components/products/ProductList'

export default {
  data() {
    return {}
  },
  components: {
    'product-list':ProductList
  }
}
</script>
