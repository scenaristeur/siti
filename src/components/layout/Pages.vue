<template>
  <div>
    <b>Pages</b>

    <b-input-group prepend="NouvellePage" class="mt-3">
      <b-form-input v-model="npname"></b-form-input>
      <b-input-group-append>
        <b-button variant="info"@click="create">Créer</b-button>
      </b-input-group-append>
    </b-input-group>

    <br>
    <ul>
      <li v-for="p in pages" :key="p.url"><a href="#" @click="setCurrent(p)">{{ p.name }}</a>

        <a :href="p.url" target="_blank"><b-icon icon="link45deg" aria-hidden="true"></b-icon></a>

      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name:"Pages",
  data(){
    return {
      pages: [],
      npname: "NouvellePage"
    }
  },
  created(){
    this.pod = this.$store.state.solid.pod
    this.updatePageList()
  },
  methods:{
    create(){
      let public_root = this.pod.storage+"public/"
      this.$createThing({name: this.npname, dest: public_root})
      //  this.$setCurrentThing({name: this.npname, url: public_root+this.npname})
      this.updatePageList()
    },
    setCurrent(p){
      console.log(p)
      this.$setCurrentThing(p)
    },
    async updatePageList(){
      if(this.pod != null){
        let public_root = this.pod.storage+"public/"
        this.pages = await this.$getFolderContent(public_root)
        this.$setCurrentThing({name: "PagePrincipale", url: public_root+"PagePrincipale"})
      }else{
        this.pages = []
      }
    }
  },
  watch:{
    pod(){
      this.updatePageList()
    }
  },
  computed:{
    pod:{
      get () { return this.$store.state.solid.pod},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  }
}
</script>

<style>

</style>
