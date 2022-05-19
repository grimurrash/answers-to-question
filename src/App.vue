<template>
<!--  <nav>-->
<!--    <router-link to="/admin/create">Admin</router-link>-->
<!--    <router-link to="/1">Answer</router-link>-->
<!--    <router-link to="/chart/1">Chart</router-link>-->
<!--  </nav>-->
  <router-view/>
</template>

<style lang="scss">
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
