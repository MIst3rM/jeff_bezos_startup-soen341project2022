<script>
export default {
  name: "ItemCard",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <div class="md-layout-item md-size-30">
    <md-card>
      <md-card-header>
        <div class="md-title">{{ item.title }}</div>
        <md-card-media>
          <img :src="item.image" alt="Item-Picture" />
        </md-card-media>
      </md-card-header>

      <md-card-content>
        <p>{{ item.description }}</p>
      </md-card-content>

      <md-card-actions>
        <md-button>Add To Cart</md-button>
        <md-button>Buy Now</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<style lang="scss" scoped>
.md-card {
  height: 100%;
}

.md-card-header {
  padding-bottom: 50px;
}
</style>