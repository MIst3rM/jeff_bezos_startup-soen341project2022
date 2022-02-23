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
  <div class="md-layout-item md-size-30 md-medium-size-33 md-small-size-50 md-xsmall-size-100">
    <md-card>
      <md-card-header>
        <div class="md-layout">
          <div class="md-layout-item">
            <div class="md-title" v-snip>{{ item.title }}</div>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item">
            <md-card-media>
              <img :src="item.image" alt="Item-Picture" />
            </md-card-media>
          </div>
        </div>
      </md-card-header>

      <md-card-content>
        <p v-snip>{{ item.description }}</p>
      </md-card-content>

      <md-card-actions>
        <md-button>Add To Cart</md-button>
        <md-button>Buy Now</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<style scoped>
.md-card {
  height: 100%;
}

.md-layout{
  margin-bottom: 45px;
  /* transition: all 1s ease; */
}

.md-layout-item {
  transition: all .4s ease;
}

.md-card-media{
  margin: auto !important
}

</style>