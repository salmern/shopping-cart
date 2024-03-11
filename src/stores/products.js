import { defineStore } from "pinia";
import { lessons } from "./lessons";

export const productsStore = defineStore("products", {
  state: () => ({
    products: [],
    cart: [],
  }),

  actions: {
    fetchLessons() {
      this.products = lessons;
    },

    addToCart(product) {
      this.cart.push(product);
    },

    removeFromCart(id) {
      console.log(">>>>> ID", id);
      this.cart = this.cart.filter((item) => item.id !== id);
    },
  },
});
