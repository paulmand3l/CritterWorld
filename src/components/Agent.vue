<template lang="pug">
  .agent(:style="agentStyle")
</template>


<script>
export default {
  name: "Agent",
  props: {
    agent: Object
  },
  computed: {
    body() { return this.agent.phenotype },
    agentStyle() {
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
.agent
  position absolute
  background-color #444444
</style>
