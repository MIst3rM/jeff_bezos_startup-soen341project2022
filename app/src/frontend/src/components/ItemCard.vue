<script>
export default {
  name: "ItemCard",
};
</script>

<template>
  <div class="md-layout-item md-size-30">
    <md-card>
      <md-card-header>
        <div class="md-title">Item</div>
        <md-card-media>
          <img src="" alt="Item-Picture" />
        </md-card-media>
      </md-card-header>

      <md-card-content>
        <p>Description of item</p>
      </md-card-content>

      <md-card-actions>
        <md-button>Add To Cart</md-button>
        <md-button>Buy Now</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<style scoped>
.md-layout {
  margin: 30px auto;
}
</style>