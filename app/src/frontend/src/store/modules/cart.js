const state = () => ({
  items: [],
});

const getters = {
  getCartProducts: (state) => {
    return state.items.map(({ product, quantity }) => {
      return {
        id: product.id,
        title: product.title,
        category: product.category,
        image: product.image,
        price: product.price,
        quantity,
      };
    });
  },

  getCartTotalPrice: (state) => {
    return state.items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0.0);
  },

  getCartTotalQuantity: (state) => {
    return state.items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  },

  isCartEmpty: (state) => {
    return state.items.length === 0;
  },
};

const actions = {
  checkout({ commit }) {
    commit("checkout");
  },

  addProductToCart({ state, commit }, product) {
    const cartItem = state.items.find((item) => item.product.id === product.id);
    if (!cartItem) {
      commit("pushProductToCart", { product: product });
    } else {
      commit("incrementItemQuantity", cartItem);
    }
  },

  removeProductFromCart({ state, commit }, product) {
    const cartItem = state.items.find((item) => item.product.id === product.id);
    if (cartItem) {
      commit("removeProductFromCart", cartItem);
    }
  },

  incrementItemQuantity({ commit }, product) {
    commit("incrementItemQuantity", product);
  },

  decrementItemQuantity({ commit }, product) {
    commit("decrementItemQuantity", product);
  },
  updateCartItem({ commit }, product) {
    commit("updateCartItem", product);
  },
};

const mutations = {
  pushProductToCart(state, { product }) {
    state.items.push({
      product,
      quantity: 1,
    });
  },

  removeProductFromCart(state, { product }) {
    state.items = state.items.filter((item) => item.product.id !== product.id);
  },

  incrementItemQuantity(state, { product }) {
    const cartItem = state.items.find((item) => item.product.id === product.id);
    cartItem.quantity++;
  },

  decrementItemQuantity(state, { product }) {
    const cartItem = state.items.find((item) => item.product.id === product.id);
    cartItem.quantity--;
  },

  setCartItems(state, { items }) {
    state.items = items;
  },

  checkout(state) {
    state.items = [];
  },

  updateCartItem(state, product) {
    const cartItem = state.items.find((item) => item.product.id === product.id);
    cartItem.product.title = product.title;
    cartItem.product.price = product.price;
    cartItem.product.image = product.image;
    cartItem.product.category = product.category;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
