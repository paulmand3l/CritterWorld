<template lang="pug">
#app
  TimeControls(:time="time")
  #content
    Environment(:environment="game.environment")
</template>

<script>
import TimeControls from './components/TimeControls'
import Environment from './components/Environment'

import Game from './Game'
import Time from './models/Time'

let time = new Time();
let game = new Game();

time.on('step', currentTick => {
  game.step(currentTick);
});

export default {
  name: 'App',
  data: () => ({
    time,
    game,
  }),

  components: {
    TimeControls,
    Environment
  }
}
</script>

<style lang="stylus">
html, body
  margin 0
  padding 0

  font-family sans-serif
  font-size 14px

div
  display flex

#app
  flex-direction column

  #content
    padding-top 60px
    margin 20px
</style>
