<template lang="pug">
.controls
  .left
    button(v-if="time.running" @click="handlePause") Pause
    button(v-else @click="handlePlay") Play
    button(@click="handleStep") Step
    button(@click="handleReset") Reset
    select(v-model="time.fps")
      option(value=60) 60 fps
      option(value=30) 30 fps
      option(value=20) 20 fps
      option(value=10) 10 fps
      option(value=5) 5 fps
      option(value=2) 2 fps
      option(value=1) 1 fps
  .right
    .frame Frame: {{time.currentStep || 0}}
</template>

<script>
export default {
  name: "TimeControls",

  props: {
    time: Object
  },

  methods: {
    handlePlay() {
      this.time.play();
    },

    handlePause() {
      this.time.pause();
    },

    handleStep() {
      this.time.step();
    },

    handleReset() {
      this.time.reset();
    },
  }
}
</script>


<style lang="stylus" scoped>
.controls
  position fixed
  left 0
  right 0
  height 60px
  padding 0 15px

  align-items center
  justify-content space-between

  background-color #fafafa
  box-shadow 0 0 5px rgba(0,0,0,0.2)

  .left, .right
    align-items center

    & > *
      margin 5px

  button
    height 30px
    border-radius 10px
    background-color #e8e8e8
    outline none
</style>
