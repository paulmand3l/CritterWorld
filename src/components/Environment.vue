<template lang="pug">
.environment
  .row(v-for="(row, i) in rows", :key="i")
    Tile(v-for="(tile, j) in row", :key="j", :tile="tile")

</template>


<script>
import Tile from './Tile'

export default {
  name: "environment",
  props: {
    environment: Object,
  },

  computed: {
    rows() { return this.environment.map }
  },

  components: {
    Tile
  }
}

</script>


<style lang="stylus" scoped>
.environment
  flex-direction column

.row
  flex-direction row

.tile
  width 20px
  height 20px
  margin 2px
  background-color #f8f8f8
</style>
