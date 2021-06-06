<template>
  <center class="actionlist">
    <ul class="nav">
      <li><b-button variant="light" size="sm" @click="action('edit')">Editer la page</b-button></li>
      <li><b-button variant="light" size="sm" @click="action('delete')">Supprimer</b-button></li>
      <li><b-button variant="light" size="sm" @click="action('history')">Modifiée le : </b-button></li>
      <li><b-button variant="light" size="sm" @click="action('permission')">Propriétaire inconnu</b-button></li>
      <li><b-button variant="light" size="sm" @click="action('share')">Partager</b-button></li>
    </ul>
  </center>
</template>

<script>
export default {
  name: "ActionList",
  methods:{
    action(a){
      this.$emit('action', a)
    },
  }
}
</script>

<style>
.actionlist {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav {
  padding: 30px;
}

.nav a {
  font-weight: bold;
  color: #2c3e50;
}

.nav a.router-link-exact-active {
  color: #42b983;
}
</style>
