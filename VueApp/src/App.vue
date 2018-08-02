<template>
  <div class="master">
    <NavBar :currentRoute="route"></NavBar>
    <div class="container">
        <Main v-on:updateRoute="updateRoute"></Main>
      </div>
  </div>
</template>

<script>
  import NavBar from './components/NavBar.vue'
  import Main from './components/Main.vue'
  export default {
    name: 'app',
    data () {
      return {
        route: null
      }
    },
    components: {
      NavBar,
      Main
    },
    methods: {
      updateRoute (route) {
        if (route) this.route = route
      }
    }
  }
</script>

<style>
  .master {
    position: relative;
  }
  .container {
    margin-top: 30px;
  }
  body {
    background-image: url('../static/Mountains.png');
    background-blend-mode: hard-light;
    background-position: top;
  }
</style>
