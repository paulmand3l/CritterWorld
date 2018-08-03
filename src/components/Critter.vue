<template lang="pug">
  .critter(:style="critterStyle")
</template>


<script>
export default {
  name: "Critter",
  props: {
    critter: Object
  },
  computed: {
    body() { return this.critter.phenotype },
    critterStyle() {
      return {
        width: this.body.shape.width + 'px',
        height: this.body.shape.height + 'px',
        borderRadius: this.body.shape.radius + 'px',
        backgroundColor: this.body.color.primary,
      }
    },
  }
}
</script>

<style lang="stylus" scoped>
.critter
  position absolute
  background-color #444444
</style>
