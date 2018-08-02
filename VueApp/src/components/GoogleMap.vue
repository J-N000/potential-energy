<template>
  <div>
    <div>
      <label>
        <gmap-autocomplete @place_changed="setPlace"></gmap-autocomplete>
        <b-button size="sm" @click="gotoPlace(currentPlace)">scroll to location</b-button>
        <b-button size="sm" @click="removeMarkers">clear route</b-button>
        <b-button size="sm" @click="locateUser">geolocate</b-button>
      </label>
      <br/>
    </div>
    <br>
    <gmap-map
      @click="addMarker"
      ref="gMap"
      :center="center"
      :zoom="16"
      mapTypeId="terrain"
      style="width: 100%;  height: 600px;"
    ></gmap-map>
  </div>
</template>

<script>
  export default {
    name: 'GoogleMap',
    data () {
      return {
        center: { lat: 39.8283, lng: -98.5795 },
        markers: [],
        currentPlace: null,
        directionsService: null,
        directionsDisplay: null
      }
    },
    methods: {
      setPlace (place) {
        this.currentPlace = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
      },
      gotoPlace (location) {
        this.$refs.gMap.panTo(location)
      },
      locateUser () {
        navigator.geolocation.getCurrentPosition(position => {
          this.gotoPlace({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        })
      },
      addMarker (clicked) {
        let marker = {
          lat: clicked.latLng.lat(),
          lng: clicked.latLng.lng()
        }
        if (this.markers.length === 0) {
          this.markers[0] = { position: marker }
        } else if (this.markers.length >= 1) {
          this.markers[1] = { position: marker }
          this.setRoute(this.markers[0], this.markers[1])
          this.markers[0] = this.markers[1]
        }
      },
      removeMarkers () {
        this.clearMap()
        this.markers = []
      },
      clearMap () {
        if (this.directionsDisplay) {
          this.directionsDisplay.setMap(null)
        }
      },
      setRoute (a, b) {
        this.clearMap()
        this.directionsService = new google.maps.DirectionsService() // eslint-disable-line no-undef
        this.directionsDisplay = new google.maps.DirectionsRenderer({ draggable: true }) // eslint-disable-line no-undef
        this.directionsDisplay.setMap(this.$refs.gMap.$mapObject)
        // -------------------------------------------------------
        this.directionsService.route({
          origin: a.position,
          destination: b.position,
          travelMode: 'DRIVING'
        }, (response, status) => {
          if (status === 'OK') {
            this.directionsDisplay.setDirections(response)
          } else {
            alert('Directions request failed due to ' + status)
          }
        })
        this.listenForDirections()
      },
      listenForDirections () {
        this.directionsDisplay.addListener('directions_changed', () => {
          this.emitRoute()
        })
      },
      emitRoute () {
        this.$emit(
          'updateRoute', this.directionsDisplay
            .getDirections()
            .routes[0]
        )
      }
    }
  }
</script>

<style scoped>

</style>
