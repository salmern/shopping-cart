<template>
  <div class="products-list">
    <v-text-field
      clearable
      label="Label"
      prepend-icon="$vuetify"
    ></v-text-field>
    <v-row no-gutters>
      <v-col
        v-for="product in store.products"
        :key="product.id"
        cols="12"
        sm="4"
      >
        <div class="product-card">
          <product-item

            :product-data="product"
            @item-clicked="goToProductPage"
          />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import ProductItem from "@/components/ProductItem.vue";
export default defineComponent({
  name: "CatalogView",
  components: {
    ProductItem,
  },
});
</script>

<script setup>
import { onMounted, ref } from "vue";
import { productsStore } from "@/stores/products";
import { useRouter } from "vue-router";

const store = productsStore();
const router = useRouter();

const search = ref("");

const goToProductPage = (id) => {
  router.push({ name: "ProductView", params: { id } });
};

onMounted(async () => {
  await store.fetchLessons();
});
</script>

<style scoped></style>
