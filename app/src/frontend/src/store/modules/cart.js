// initial state
const state = {
    myCart : [
    ]
  }
  
  // getters
  const getters = {
    allProducts: state => state.myCart, // would need action/mutation if data fetched async
    getNumberOfProducts: state => (state.myCart) ? state.myCart.length : 0,
    isInCart: (state) => (id) => {
      return state.myCart.some(p => p.id === id)
    } 
  }
  
  // actions
  const actions = {
    addToCart({ commit }, id){
      commit("addToCart", {
        id: id,
        quatity: 1
      })
    },
    increaseQuantity({commit},id){
        commit("increaseQuantity",{
            id: id
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

    increaseQuantity (state, id){
        state.myCart.find((item) => {
            if(item.id === id){
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