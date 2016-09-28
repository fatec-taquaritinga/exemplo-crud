<script>
  export default {
    name: 'Toaster',
    props: {
      show: Boolean,
      text: String,
      type: String
    }
  }
</script>

<template>
  <div v-if="show" class="toast" :class="type" transition="fade">{{ text }}</div>
</template>

<style lang="stylus" scoped>
@import '../stylus/variables.styl'

.toast
  position fixed
  z-index 1
  opacity 0
  top 5vh
  left 50vw
  margin 2em 0 0 -10em
  width 20em
  background #333
  color #fff
  text-align center
  padding .5em 1.5em
  border-radius 4px
  box-shadow 0 10px 30px alpha(#000, .15)
  &.error
    background $color-secondary
  &.fade-transition
    transition all 150ms ease
    opacity 1
  &.fade-enter
    opacity 0
  &.fade-leave
    transition all 250ms ease
    opacity 0
</style>
