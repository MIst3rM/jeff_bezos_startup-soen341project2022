<template>
  <div id="app">
    <Home :msg="msg"/>
  </div>
</template>

<script>
import axios from 'axios'
import Home from './views/Home.vue'

export default {
  name: 'App',
  components: {
    Home
  },
  data () {
    return {
      msg: null
    }
  },
  mounted () {
    axios
      .get('http://backend.conco/api/home')
      .then(response => (this.msg = response.data))
  }
}
</script>
