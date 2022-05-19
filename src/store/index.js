import { createStore } from 'vuex'
import axios from 'axios'

const HOST_URL = 'https://manager.cpvs.moscow/answerstoquestions'

const chartColors = {
  primaryColorShade: '#836AF9',
  yellowColor: '#ffe800',
  successColorShade: '#57ee18',
  warningColorShade: '#ffe802',
  warningLightColor: '#FDAC34',
  infoColorShade: '#299AFF',
  greyColor: '#4F5D70',
  blueColor: '#2c9aff',
  blueLightColor: '#84D0FF',
  greyLightColor: '#EDF1F4',
  tooltipShadow: 'rgba(0, 0, 0, 0.25)',
  lineChartPrimary: '#666ee8',
  lineChartDanger: '#ff4961',
  labelColor: '#6e6b7b',
  grid_line_color: 'rgba(200, 200, 200, 0.2)'
}

export default createStore({
  state: {
    isLoading: true,
    loadingColor: '#076DDA',
    pageStatus: 'form',
    question: {
      id: 0,
      question: '',
      yes_answer: 0,
      no_answer: 0,
      yes_answer_name: '1',
      no_answer_name: '2'
    },
    error: '',
    success: ''
  },
  getters: {
    doughnutChartData: (state) => {
      return {
        labels: [
          state.question.yes_answer_name, state.question.no_answer_name
        ],
        datasets: [
          {
            label: 'Результаты опроса',
            data: [state.question.yes_answer, state.question.no_answer],
            backgroundColor: [chartColors.successColorShade, chartColors.lineChartDanger],
            borderWidth: 0,
            pointStyle: 'rectRounded'
          }
        ]
      }
    },
    stockData: (state) => {
      const sum = state.question.yes_answer + state.question.no_answer

      return [
        {
          device: state.question.yes_answer_name,
          color: 'text-primary',
          value: state.question.yes_answer,
          percentage: sum === 0 ? '-' : Math.round(state.question.yes_answer / sum * 100)
        },
        {
          device: state.question.no_answer_name,
          color: 'text-danger',
          value: state.question.no_answer,
          percentage: sum === 0 ? '-' : Math.round(state.question.no_answer / sum * 100)
        }
      ]
    }
  },
  mutations: {
    setLoading (state, status) {
      state.isLoading = status
    },
    setQuestion (state, data) {
      state.question = {
        id: data.id,
        question: data.question,
        yes_answer: data.yes_answer,
        no_answer: data.no_answer,
        yes_answer_name: data.yes_answer_name,
        no_answer_name: data.no_answer_name
      }
    },
    setSuccess (state, success = '') {
      state.success = success
      state.pageStatus = 'success'
    },
    setError (state, error) {
      state.error = error
      state.pageStatus = 'error'
    },
    setScreenStatus (state, status) {
      state.pageStatus = status
    }
  },
  actions: {
    getQuestionInfo ({ commit }, questionId) {
      commit('setLoading', true)
      axios.get(HOST_URL + '/question/' + questionId)
        .then((res) => {
          if (res.data.status) {
            commit('setQuestion', res.data)
            commit('setLoading', false)
          } else {
            commit('setError', res.data.message)
          }
        })
        .catch((res) => {
          commit('setError', res.data.message)
        })
    },
    saveYesAnswer ({ commit }, questionId) {
      const formData = new FormData()
      formData.append('answer', 'yes')
      axios.post(HOST_URL + `/question/${questionId}/update`, formData).then(res => {
        if (res.data.status) {
          commit('setSuccess')
        } else {
          commit('setError', res.data.message)
        }
      })
    },
    saveNoAnswer ({ commit }, questionId) {
      const formData = new FormData()
      formData.append('answer', 'no')
      axios.post(HOST_URL + `/question/${questionId}/update`, formData).then(res => {
        if (res.data.status) {
          commit('setSuccess')
        } else {
          commit('setError', res.data.message)
        }
      })
    },
    createQuestion ({ commit }, question) {
      const formData = new FormData()
      formData.append('question', question)
      axios.post(HOST_URL + '/question/create', formData).then(res => {
        if (res.data.status) {
          const text = `ID вопроса: ${res.data.id}<br>
                        Ссылка на страницу вопроса: <a href="${res.data.form}">${res.data.form}</a> <br>
                        Ссылка на страницу результатов: <a href="${res.data.chart}">${res.data.chart}</a>`
          commit('setSuccess', text)
        } else {
          commit('setError', res.data.message)
        }
      })
    }
  },
  modules: {}
})
