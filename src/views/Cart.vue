<template>
  <button @click="router.push({ name: 'Catalog' })" style="color: red">
    Go Back
  </button>
  <div v-if="!store.cart.length" style="text-align: center">
    <h1>Successfully Deleted </h1>
  </div>
  <div class="cart-items" v-else style="background-color: lightblue">
    <div class="cart-item" v-for="item in store.cart" :key="item.id">
      <img :src="item.image" alt="image" width="80" height="80" />
      <div class="item-details">
        <span>Subject: {{ item.subject }}</span>
        <span>Location: {{ item.location }}</span>
        <span>Price: {{ item.price }}</span>
        <span>Space: {{ item.spaces }}</span>
        <button @click="removeFromCart(item.id)" style="color: red;">X</button>
      </div>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center">
      <input
        type="text"
        class="form-control"
        style="width: 300px; margin-bottom: 20px"
        v-model="name"
        placeholder="Name"
        @input="validateCheckout"
      />
      <input
        type="text"
        class="form-control"
        style="width: 300px; margin-bottom: 20px"
        v-model="phone"
        placeholder="Phone Number"
        @input="validateCheckout"
      />
    </div>
    <div style="display: flex; flex-direction: column; align-items: center">
      <button
        class="btn btn-primary"
        @click="checkout"
        :disabled="!isFormValid"
        style="margin-top: 10px"
      >
        Checkout
      </button>
    </div>
  </div>


</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "CartView",
});
</script>

<script setup>
import { computed, ref } from "vue";
import { productsStore } from "@/stores/products";
import { useRouter } from "vue-router";

const router = useRouter();

const store = productsStore();

const removeFromCart = (id) => {
  store.removeFromCart(id);
};
const name = ref("");
const phone = ref("");
const isFormValid = ref(false);

const validateCheckout = () => {
  const nameRegex = /^[a-zA-Z]+$/;
  const phoneRegex = /^[0-9]+$/;

  isFormValid.value =
    nameRegex.test(name.value) && phoneRegex.test(phone.value);
};

const checkout = () => {
  if (isFormValid.value) {
    alert("Order submitted successfully Enjoy!!!");
  } else {
    alert("Please provide valid name and phone number.");
  }
};
</script>

<style scoped>
.item-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  box-shadow: 0 0 17px 6px #e7e7e7;
  border-radius: 8px;
  padding: 16px;
}

.item-details img {
  width: 20%;
}
</style>
