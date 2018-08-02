<template>
  <b-navbar toggleable="md" type="dark" variant="dark" sticky="true">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand>
      Potential Energy
    </b-navbar-brand>
    <b-navbar-brand class="beta">
      Beta
    </b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav class="ml-auto">
          <b-button @click="redirect" class="my-2 my-sm-0">Go There</b-button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
    export default {
      name: 'NavBar.vue',
      props: ['currentRoute'],
      data () {
        return {
          routeUrl: null,
          queryText: null
        }
      },
      watch: {
        currentRoute (newRoute) {
          this.setRouteUrl(newRoute)
        }
      },
      methods: {
        setRouteUrl (route) {
          this.routeUrl =
            route.legs[0].start_location.lat() +
            ',' +
            route.legs[0].start_location.lng()
        },
        redirect () {
          if (this.routeUrl) {
            window.location = 'https://www.google.com/maps/search/?api=1&query=' + this.routeUrl
          } else alert('no location entered')
        }
      }
    }
</script>

<style scoped>
  .beta {
    margin-top: 3px;
    font-size: 0.75em;
    color: gray;
  }
</style>
