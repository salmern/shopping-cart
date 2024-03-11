<template>

  <v-btn
      @click="router.push({ name: 'Catalog' })"
      color="primary"
      variant="elevated">
    Back to catalog
  </v-btn>

  <div class="product">
    <div class="product-image">
      <img :src="selectedProduct.image" alt="image">
      
    </div>
    <div class="product-details">
      <p>Id: {{ selectedProduct.id }}</p>
      <p>Subject: {{ selectedProduct.subject }}</p>
      <p>Location: {{ selectedProduct.location }}</p>
      <p>Space: {{ selectedProduct.spaces }}</p>
      <h2>Price: ${{ selectedProduct.price }}</h2>
      <v-btn
          variant="elevated"
          color="indigo-lighten-3"
          @click="addToCart"
         :disabled="selectedProduct.spaces === 0"
      >Add to cart</v-btn>
    </div>
  </div>
</template>


<script>
  import { defineComponent } from "vue";
  export default defineComponent({
    name: 'ProductDetails'
  })
</script>

<script setup>
  import { computed } from "vue";
  import { productsStore } from "@/stores/products";
  import { useRoute, useRouter } from "vue-router";

  const store = productsStore()
  const router = useRouter()
  const route = useRoute()

  const selectedProduct = computed(() => {
    return store.products.find((item) => item.id === Number(route.params.id))
  })

  const addToCart = () => {
    store.addToCart(selectedProduct.value)
    router.push({ name: 'CartView' })
  }
</script>

<style scoped>
.product {
  display: flex;
  margin-top: 50px;
}

.product-image {
  margin-right: 24px;
}

</style>