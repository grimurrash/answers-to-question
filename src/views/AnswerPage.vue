<template>
  <div>

  </div>
</template>

<script>
export default {
  name: "AnswerPage",
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  created() {
    console.log('created')
  }
}
</script>

<style scoped>

</style>