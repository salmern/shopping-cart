<template>
  <v-btn
    @click="router.push({ name: 'Catalog' })"
    color="primary"
    variant="elevated"
  >
    Back to lessons
  </v-btn>

  <div class="product">
    <div class="product-image">
      <p>{{ selectedProduct.id }}</p>
      <img :src="selectedProduct.image" alt="image" />
    </div>
    <div class="product-details">
      <p>Subject: {{ selectedProduct.subject }}</p>
      <p>Location: {{ selectedProduct.location }}</p>
      <p>Space: {{ selectedProduct.spaces }}</p>
      <h3>Price: ${{ selectedProduct.price }}</h3>
    </div>
  </div>
  <br>
  <v-btn
    variant="elevated"
    color="primary"
    @click="addToCart"
    :disabled="selectedProduct.spaces === 0"
    >Book lesson</v-btn
  >
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "ProductDetails",
});
</script>

<script setup>
import { computed } from "vue";
import { productsStore } from "@/stores/products";
import { useRoute, useRouter } from "vue-router";

const store = productsStore();
const router = useRouter();
const route = useRoute();

const selectedProduct = computed(() => {
  return store.products.find((item) => item.id === Number(route.params.id));
});

const addToCart = () => {
  if (selectedProduct.value.spaces > 0) {
    store.addToCart(selectedProduct.value);
    selectedProduct.value.spaces--; // Reduce the remaining space
  }
  router.push({ name: "CartView" });
};
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
