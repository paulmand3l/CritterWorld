<template lang="pug">
.tile
  Resource(v-for="resource in resources", :key="resource.id", :resource="resource")
  Agent(v-for="agent in agents", :key="agent.id", :agent="agent")
</template>

<script>
import Agent from './Agent';
import Resource from './Resource'

export default {
  name: "Tile",
  props: {
    tile: Object
  },

  computed: {
    agents() {
      return this.tile.get('Agent');
    },

    resources() {
      return this.tile.get('Resource');
    }
  },

  components: {
    Agent,
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
