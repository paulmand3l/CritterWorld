<template lang="pug">
  .resource(:style="resourceStyle")
</template>


<script>
export default {
  name: "Resource",
  props: {
    resource: Object
  },
  computed: {
    resourceStyle() {
      let amount = 100 * this.resource.amount / this.resource.MAX_AMOUNT;
      return {
        width: amount + '%',
        height: amount + '%',
        borderRadius: '100%',
      }
    },
  }
}
</script>


<style lang="stylus" scoped>
.resource
  position absolute
  top auto
  left auto
  bottom auto
  right auto
  margin 0
  padding 0
  background-color #2ecc71
</style>
