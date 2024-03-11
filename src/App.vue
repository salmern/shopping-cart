<template>
  <header>
    <v-toolbar color="primary" dark title="Idris Lessons Cart">
      <v-btn
        @click="router.push({ name: 'CartView' })"
        color="lightblue"
        variant="elevated"
        >Added lessons {{ store.cart.length }}
      </v-btn>
    </v-toolbar>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { useRouter } from "vue-router";
import { productsStore } from "@/stores/products";

const router = useRouter();
const store = productsStore();
</script>

<style scoped>
.cart-items {
  text-align: end;
  padding: 16px;
  font-weight: bold;
  font-size: 24px;
  cursor: pointer;
}
</style>
