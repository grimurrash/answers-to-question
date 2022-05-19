<template>
  <div class="create-question-form background">
    <div class="row auth-inner m-0">
      <div class="d-none d-lg-flex p-5 col-lg-8">
      </div>
      <div class="d-flex align-items-center auth-bg px-2 p-lg-5 col-lg-4 right-panel">
        <div v-if="pageStatus === 'form'" class="px-xl-2 mx-auto col-sm-8 col-md-6 col-lg-12">
          <form action="">
            <h3>Добавление вопроса</h3>
            <textarea placeholder="Укажите вопрос"
                      class="form-control"
                      v-model="question"
                      name=""></textarea>
            <button class="btn btn-primary mt-3" @click.prevent="createQuestion">Добавить</button>
          </form>
        </div>
        <div v-if="pageStatus === 'success'" class="px-xl-2 mx-auto col-sm-8 col-md-6 col-lg-12">
          <p v-html="success"></p>
        </div>
        <div v-if="pageStatus === 'error'" class="px-xl-2 mx-auto col-sm-8 col-md-6 col-lg-12">
          <h2 class="card-title">{{ error }}!</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CreateForm',
  data () {
    return {
      question: ''
    }
  },
  computed: {
    ...mapState(['pageStatus', 'error', 'success'])
  },
  methods: {
    createQuestion () {
      this.$store.dispatch('createQuestion', this.question)
    }
  }
}
</script>

<style scoped>

</style>
