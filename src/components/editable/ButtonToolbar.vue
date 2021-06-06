<template>

  <b-button-toolbar key-nav aria-label="Toolbar with button groups">
    <!-- <b-button-group class="mx-1">
    <b-button>&laquo;</b-button>
    <b-button>&lsaquo;</b-button>
  </b-button-group> -->
  <b-button-group class="mx-1">
    <b-button variant="success" @click="sauve">Sauver</b-button>

    <b-dropdown id="dropdown-1" text="Format">
      <b-dropdown-item @click="format(1)">Titre 1</b-dropdown-item>
      <b-dropdown-item @click="format(2)">Titre 2</b-dropdown-item>
      <b-dropdown-item @click="format(3)">Titre 3</b-dropdown-item>
      <b-dropdown-item @click="format(4)">Titre 4</b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item @click="format('a')">Texte Agrandi</b-dropdown-item>
      <b-dropdown-item @click="format('b')">Texte mis en valeur</b-dropdown-item>
      <b-dropdown-item @click="format('c')">Code source</b-dropdown-item>
      <b-dropdown-item @click="format('d')">
        <span style="color:green"><i>
          Commentaires</i></span>
        </b-dropdown-item>


      </b-dropdown>

      <b-dropdown id="dropdown-2" text="Composants">
        <b-dropdown-item>First Action</b-dropdown-item>
        <b-dropdown-item>Second Action</b-dropdown-item>
        <b-dropdown-item>Third Action</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item active>Active action</b-dropdown-item>
        <b-dropdown-item disabled>Disabled action</b-dropdown-item>
      </b-dropdown>
      <!-- <b-button>Undo</b-button>
      <b-button>Redo</b-button> -->
    </b-button-group>
    <!-- <b-button-group class="mx-1">
    <b-button>&rsaquo;</b-button>
    <b-button>&raquo;</b-button>
  </b-button-group> -->
</b-button-toolbar>

</template>

<script>
export default {
  name: "ButtonToolbar",
  methods:{
    sauve(){
      this.$emit('sauve', "bim")
    },
    format(f){
      console.log(f)
      this.$emit('format', f)
    }
  }
}
</script>

<style>

</style>
