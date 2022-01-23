<script>

export default {
    name: 'Home',
    props: {
      msg: String
    }
}

</script>

<template>
    <div id="home" lang="scss">
        <md-toolbar class="md-primary">
            <h3 class="md-title">{{ msg }}</h3>
        </md-toolbar> 
        <img src="https://i.pinimg.com/originals/d8/0b/99/d80b9960866f4f61ce28e5cc072895a6.gif" alt="Hello there" class="center">
    </div>
</template>

