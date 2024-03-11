<template>
  <div class="products-list">
    <!-- <v-text-field
      clearable
      label="Label"
      prepend-icon="$vuetify"
      style="background-color: lightblue;"
    ></v-text-field> -->
    <v-select
      v-model="selectedSortAttribute"
      :items="sortAttributes"
      label="Sort By"
    ></v-select>
    <v-btn-toggle v-model="sortOrder" class="ma-2">
      <v-btn value="asc">Ascending</v-btn>
      <v-btn value="desc">Descending</v-btn>
    </v-btn-toggle>

    <v-row no-gutters>
      <v-col
        v-for="product in sortedProducts"
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
import { ref, computed, defineComponent } from "vue";
import ProductItem from "@/components/ProductItem.vue";
// import { lessons } from "@/data/lessons";

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
const sortAttributes = ["subject", "location", "price", "spaces"];
const selectedSortAttribute = ref(sortAttributes[0]);
const sortOrder = ref("asc");

const sortedProducts = computed(() => {
  const products = store.products;
  const sorted = [...products].sort((a, b) => {
    const attrA = a[selectedSortAttribute.value];
    const attrB = b[selectedSortAttribute.value];
    if (sortOrder.value === "asc") {
      return attrA < attrB ? -1 : attrA > attrB ? 1 : 0;
    } else {
      return attrA > attrB ? -1 : attrA < attrB ? 1 : 0;
    }
  });
  return sorted;
});

const goToProductPage = (id) => {
  router.push({ name: "ProductView", params: { id } });
};

onMounted(async () => {
  await store.fetchLessons();
});
</script>

<style scoped></style>
