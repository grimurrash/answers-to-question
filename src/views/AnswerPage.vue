<template>
  <div class="answer-page background">
    <div class="row auth-inner m-0">
      <div class="d-none d-lg-flex p-5 col-lg-8">
      </div>
      <div v-if="!isLoading" class="d-flex align-items-center auth-bg px-2 p-lg-5 col-lg-4 right-panel">
        <div v-if="pageStatus === 'form'" class="px-xl-2 mx-auto col-sm-8 col-md-6 col-lg-12">
          <h2 class="card-title">Ответьте на вопрос</h2>
          <p class="question" v-html="question.question">
          </p>
          <button class="btn btn-primary mt-3 w-100" @click="clickSaveBtn('yes')"
                  v-html="question.yes_answer_name">
          </button>
          <button class="btn btn-primary mt-2 w-100" @click="clickSaveBtn('no')"
                  v-html="question.no_answer_name">
          </button>
        </div>
        <div v-if="pageStatus === 'success'" class="px-xl-2 mx-auto col-sm-8 col-md-6 col-lg-12">
          <h2 class="card-title">Спасибо за ваш ответ!!</h2>
        </div>
        <div v-if="pageStatus === 'error'" class="px-xl-2 mx-auto col-sm-8 col-md-6 col-lg-12">
          <h2 class="card-title">{{ error }}!</h2>
        </div>
      </div>
    </div>
    <loading v-model:active="isLoading"
             loader="dots"
             :height="220"
             :width="160"
             :color="loadingColor"
             :can-cancel="false"
             :is-full-page="true"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'AnswerPage',
  components: {
    Loading
  },
  data () {
    return {
      backgroundImg: require('@/assets/images/background.png'),
      logoImg: require('@/assets/logo.png')
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    ...mapState(['question', 'isLoading', 'loadingColor', 'pageStatus', 'error', 'success'])
  },
  methods: {
    clickSaveBtn (answer) {
      if (answer === 'yes') {
        this.$store.dispatch('saveYesAnswer', this.id)
      } else if (answer === 'no') {
        this.$store.dispatch('saveNoAnswer', this.id)
      }
    }
  },
  created () {
    this.$store.dispatch('getQuestionInfo', this.id)
  }
}
</script>

<style scoped>

</style>
