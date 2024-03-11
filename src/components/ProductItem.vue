<template>
  <v-sheet class="ma-2 pa-2">
    <v-card class="product">
      <v-img :src="props.productData.image" height="200px" cover />
      <br />

      <v-card-subtitle> Spaces {{ props.productData.spaces }} </v-card-subtitle>
      <br />
      <v-card-subtitle> $ {{ props.productData.price }} </v-card-subtitle>

      <v-card-actions>
        <v-btn
          @click="goToProductPage(props.productData.id)"
          :disabled="productData.spaces === 0"
        >
          Add to cart
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-sheet>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "ProductItem",
});
</script>

<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  productData: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["item-clicked"]);

const goToProductPage = (productId) => {
  emit("item-clicked", productId);
};
</script>
