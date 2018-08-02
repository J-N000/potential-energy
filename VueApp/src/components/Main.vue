<template>
  <div class="main-container">
    <div class="mainMap">
      <GoogleMap v-on:updateRoute="updateRoute"/>
    </div>
    <div class="infoGraphic">
      <ElevationGraph :currentRoute="route"/>
    </div>
  </div>
</template>

<script>
  import GoogleMap from './GoogleMap.vue'
  import ElevationGraph from './ElevationGraph.vue'
  export default {
    name: 'main',
    data () {
      return {
        route: null
      }
    },
    components: {
      GoogleMap,
      ElevationGraph
    },
    methods: {
      updateRoute (route) {
        if (route) this.route = route
        this.$emit('updateRoute', route)
      }
    }
  }
</script>

<style scoped>
  body {
    display: grid;
    grid-template-rows: 4fr 1fr;
    grid-template-columns: 1fr minmax(100px, 3fr) minmax(100px, 3fr) 1fr;
    grid-template-areas:
      "map     map    map     map "
      "....   info    info    ....";
    justify-items: center;
    align-items: center;
  }

  .mainMap {
    grid-area: map;
  }

  .infoGraphic {
    grid-area: info;
  }

  a {
    cursor: pointer;
  }
</style>
