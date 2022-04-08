const state = () => ({
  items: [],
  checkoutStatus: null,
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
  // checkout({ commit, state }, products) {
  //   const savedCartItems = [...state.items];
  //   commit("setCheckoutStatus", null);

  //   commit("setCartItems", { items: [] });
  //   shop.buyProducts(
  //     products,
  //     () => commit("setCheckoutStatus", "successful"),
  //     () => {
  //       commit("setCheckoutStatus", "failed");
  //       // rollback to the cart saved before sending the request
  //       commit("setCartItems", { items: savedCartItems });
  //     }
  //   );
  // },

  addProductToCart({ state, commit }, product) {
    commit("setCheckoutStatus", null);
    const cartItem = state.items.find((item) => item.product.id === product.id);
    if (!cartItem) {
      commit("pushProductToCart", { product: product });
    } else {
      commit("incrementItemQuantity", cartItem);
    }
  },

  removeProductFromCart({ state, commit }, product) {
    commit("setCheckoutStatus", null);
    const cartItem = state.items.find((item) => item.product.id === product.id);
    if (cartItem) {
      commit("removeProductFromCart", cartItem);
    }
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

  decrementItemQuantity(state, { id }) {
    const cartItem = state.items.find((item) => item.product.id === id);
    cartItem.quantity--;
  },

  setCartItems(state, { items }) {
    state.items = items;
  },

  setCheckoutStatus(state, status) {
    state.checkoutStatus = status;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
