<template>
  <div class="chart-page background">
    <div class="chart-panel">
      <h3 class="text-center">Результаты опроса</h3>
      <h6 class="question" v-html="question.question"></h6>
      <chartjs-component-doughnut-chart
        :height="250"
        :data="doughnutChartData"
        :options="chartOptions"
        class="mb-3 doughnut-chart"
      />
      <!--/ chart -->

      <!-- stocks -->
      <div
        v-for="(stock,index) in stockData"
        :key="stock.device"
        :class="index < stockData.length-1 ? 'mb-1':''"
        class="d-flex justify-content-between chart-info-text"
      >
        <div class="d-flex align-items-center ">
          <span class="font-weight-bold ml-75 mr-25" v-html="stock.device"></span>
          <span>- {{ stock.value }} ({{ stock.percentage }}%)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import ChartjsComponentDoughnutChart from '@/components/ChartjsComponentDoughnutChart'

export default {
  name: 'ChartPage',
  components: {
    ChartjsComponentDoughnutChart
  },
  data () {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        responsiveAnimationDuration: 500,
        cutoutPercentage: 60,
        legend: { display: false },
        tooltips: {
          callbacks: {
            label (tooltipItem, data) {
              const label = data.datasets[0].labels[tooltipItem.index] || ''
              const value = data.datasets[0].data[tooltipItem.index]
              const output = ` ${label} : ${value} %`
              return output
            }
          },
          // Updated default tooltip UI
          shadowOffsetX: 1,
          shadowOffsetY: 1,
          shadowBlur: 8,
          shadowColor: 'rgba(0, 0, 0, 0.25)'
        }
      }
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    ...mapState(['question']),
    ...mapGetters(['doughnutChartData', 'stockData'])
  },
  created () {
    this.$store.dispatch('getQuestionInfo', this.id)
    setInterval(() => {
      console.log('createQuestion')
      this.$store.dispatch('getQuestionInfo', this.id)
    }, 10000)
  }
}
</script>

<style scoped>

</style>
