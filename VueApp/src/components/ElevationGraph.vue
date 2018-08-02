<template>
  <div class="chartContainer" v-if="chartData">
    <GChart
      class="chart"
      type="ColumnChart"
      :data="chartData"
      :options="chartOptions"
    />
    <div class="legendContainer">
      <div class="brightBlueBox"> > 8% </div>
      <div class="lightBlueBox"> > 5% </div>
      <div class="darkBlueBox"> < 5% </div>
    </div>
    <div class="gradeContainer">
      <div class="miles">
        {{ distance }} {{ unit }}
      </div>
      <div class="maxGrade">
        Max: {{ peakGrade }}%
      </div>
      <div class="avgGrade">
        Avg: {{ avgGrade }}%
      </div>
    </div>
  </div>
</template>

<script>
  import { GChart } from 'vue-google-charts'

  export default {
    name: 'ElevationGraph',
    components: { GChart },
    props: ['currentRoute'],
    watch: {
      currentRoute (newRoute) {
        const calc = newRoute.legs[0].distance.text.split(' ')
        this.distance = calc[0]
        this.unit = calc[1]
        this.route = newRoute
        this.getPathElevation()
      }
    },
    data () {
      return {
        route: null,
        gradeReport: null,
        distance: null,
        unit: null,
        avgGrade: null,
        peakGrade: null,
        elevationService: null,
        chartData: null,
        chartOptions: {
          backgroundColor: { fill: 'transparent' },
          vAxis: { textStyle: { color: '#CAE9FF' } },
          bar: { groupWidth: '100%' },
          chartArea: { top: 20 },
          legend: 'none'
        }
      }
    },
    methods: {
      getPathElevation () {
        this.elevationService = new google.maps.ElevationService() // eslint-disable-line no-undef
        this.chartData = [
          ['', '', { role: 'style' }]
        ]
        // ------------------------------------------------------
        this.elevationService.getElevationAlongPath({
          'path': this.route.overview_path,
          'samples': 264
        }, (elevations, status) => {
          if (status === 'OK') {
            this.elevations = elevations
            this.getGrades()
            this.displayPathElevation()
          }
        })
      },
      getGrades () {
        const interval = (this.distance * 5280) / 264
        this.gradeReport = []
        for (let i = 0; i < this.elevations.length - 1; i++) {
          this.gradeReport.push(
            Math.abs(this.elevations[i].elevation - this.elevations[i + 1].elevation) / interval
          )
        }
        this.getAvgGrade()
        this.getPeakGrade()
      },
      getAvgGrade () {
        let avg = 0
        avg = this.gradeReport.reduce((a, b) => a + b) / 263
        this.avgGrade = this.round(avg)
      },
      getPeakGrade () {
        let peakGrade = this.gradeReport[this.gradeReport.length - 1]
        this.gradeReport.forEach(e => {
          if (peakGrade < e) peakGrade = e
        })
        this.peakGrade = this.round(peakGrade)
      },
      round (value) {
        return Math.round(value * 10000) / 100
      },
      displayPathElevation () {
        for (let i = 0; i < this.elevations.length; i++) {
          if (this.gradeReport[i] >= 0.08) {
            this.chartData.push(['', this.elevations[i].elevation, '#CAE9FF'])
          } else if (this.gradeReport[i] >= 0.05) {
            this.chartData.push(['', this.elevations[i].elevation, '#2E9FE1'])
          } else {
            this.chartData.push(['', this.elevations[i].elevation, '#016481'])
          }
        }
      }
    }
  }
</script>

<style scoped>
  .chartContainer {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr 2fr 1fr;
    grid-template-rows: 1fr 200px;
    grid-template-areas:
                        ".... legend grade ....."
                        "chart chart chart chart";
    align-items: center;
  }
  .legendContainer {
    grid-area: legend;
    display: flex;
    justify-content: space-evenly;
    font-size: 1em;
    color: #CAE9FF;
    padding-right: 10px;
  }
  .gradeContainer {
    grid-area: grade;
    display: flex;
    justify-content: space-evenly;
    font-size: 1em;
    color: #CAE9FF;
  }
  .chart {
    width: 100%;
    height: 100%;
    grid-area: chart;
  }
  .brightBlueBox {
    text-align: center;
    width: 4em;
    height: 1.2em;
    background-color: #CAE9FF;
    color: #062831;
  }
  .lightBlueBox {
    text-align: center;
    width: 4em;
    height: 1.2em;
    background-color: #2E9FE1;
    color: #062831;
  }
  .darkBlueBox {
    text-align: center;
    width: 4em;
    height: 1.2em;
    background-color: #016481;
    color: #062831;
  }
  .miles {
    padding: 5px;
  }
  .avgGrade {
    padding: 5px;
  }
  .maxGrade {
    padding: 5px;
  }
</style>
