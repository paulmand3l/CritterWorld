<template lang="pug">
.tile
  Resource(v-for="resource in resources", :key="resource.id", :resource="resource")
  Critter(v-for="critter in critters", :key="critter.id", :critter="critter")
</template>

<script>
import Critter from './Critter';
import Resource from './Resource'

export default {
  name: "Tile",
  props: {
    tile: Object
  },

  computed: {
    critters() {
      return this.tile.get(Critter);
    },

    resources() {
      return this.tile.get(Resource);
    }
  },

  components: {
    Critter,
    Resource
  }
}
</script>

<style lang="stylus" scoped>
.tile
  position relative
  justify-content center
  align-items center
</style>
