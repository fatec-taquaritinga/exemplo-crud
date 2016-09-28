<script>
import Toaster from './components/Toaster.vue'

export default {
  name: 'App',
  components: {
    Toaster
  },
  data() {
    return {
      notification: {
        show: false,
        timeout: null,
        type: 'info',
        text: ''
      }
    }
  },
  events: {
    toast(text, type) {
      if (this.notification.timeout)
        clearTimeout(this.notification.timeout)

      this.notification.type = type || 'info'
      this.notification.text = text
      this.notification.show = true

      this.notification.timeout = setTimeout(() => {
        this.notification.timeout = null
        this.notification.show = false
      }, 2000)
    },
    navigate(path, delay = 500) {
      setTimeout(() => this.$route.router.go(path), delay)
    }
  }
}
</script>

<template>
  <div id="app">
    <toaster :show="notification.show" :text="notification.text" :type="notification.type"></toaster>

    <nav class="top-menu">
      <a v-link="{ path: '/', exact: true }">Principal</a>
      <a v-link="{ path: '/sites' }">Cadastro de Sites</a>
      <a v-link="{ path: '/jogos' }">Cadastro de Jogos</a>
    </nav>

    <router-view></router-view>
  </div>
</template>

<style lang="stylus">
@import './stylus/app.styl'
</style>
