<template>
  <div :id="element" :class="classname"></div>
</template>
<script>
import ApexCharts from 'apexcharts'
export default {
  name: 'ApexChart',
  props: ['element', 'chartOption', 'isLive', 'classname'],
  mounted() {
    const _this = this
    const selector = '#' + _this.element
    const chart = new ApexCharts(document.querySelector(selector), _this.chartOption)
    setTimeout(() => {
      chart.render()
      if (_this.isLive) {
        setInterval(function () {
          _this.chartDummySearies(_this.lastDate, {
            min: 10,
            max: 90
          })
          chart.updateSeries([{
            data: _this.data
          }])
        }, 1000)
      }
    }, 500)
  },
  data() {
    return {
      lastDate: 0,
      data: [],
      TICKINTERVAL: 864e5,
      XAXISRANGE: 7776e5
    }
  },
  methods: {
    // getNewSeries (baseval, yrange) {
    //   const newDate = baseval + this.TICKINTERVAL
    //   this.lastDate = newDate
    //   for (var i = 0; i < this.data.length - 10; i++) {
    //     this.data[i].x = newDate - this.XAXISRANGE - this.TICKINTERVAL
    //     this.data[i].y = 0
    //   }
    //   this.data.push({
    //     x: newDate,
    //     y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
    //   })
    // }
    chartDummySearies(e, t, refData) {
      const data = refData
      const a = e + this.TICKINTERVAL
      this.lastDate = a
      for (let n = 0; n < data.length - 50; n++) {
        this.data[n].x = a - this.XAXISRANGE - this.TICKINTERVAL
        this.data[n].y = 0
      }
      this.data.push({
        x: a,
        y: Math.floor(Math.random() * (t.max - t.min + 1)) + t.min
      })
      return data
    },
    generateDayWiseTimeSeries(baseval, count, yrange) {
      let i = 0
      const series = []
      while (i < count) {
        const x = baseval
        const y =
                  Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min

        series.push([x, y])
        baseval += 86400000
        i++
      }
      return series
    }
  }
}
</script>
