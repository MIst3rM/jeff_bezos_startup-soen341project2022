// initial state
const state = {
    myCart : [
    ]
  }
  
  // getters
  const getters = {
    allProducts: state => state.myCart, // would need action/mutation if data fetched async
    getNumberOfProducts: state => (state.myCart) ? state.myCart.length : 0,
    cartProducts: state => {
      return state.myCart.map(({ id, quantity }) => {
        const product = state.myCart.find(p => p.id === id)
  
        return {
          name: product.name,
          price: product.price,
          quantity
        }
      })
    }
  }
  
  // actions
  const actions = {
    addToCart({ commit }, product){
      commit("addToCart", {
        id: product.id
      })
    },
    increaseQuantity({commit},product){
        commit("increaseQuantity",{
            product: product
        })
    }
  }
  
  
// mutations
const mutations = {

    addToCart (state,  id ) {
        const record = state.myCart.find(p => p.id === id)
  
        if (!record) {
          state.myCart.push({
            id,
            quantity: 1
          })
        } 
      },

    increaseQuantity (state, product){
        state.myCart.find((item) => {
            if(item.id === product.id){
                item.quantity++;
            }
        });

      },


  }
  
  export default {
    state,
    getters,
    actions,
    mutations,
  };