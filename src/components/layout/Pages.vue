<template>
  <div>
    <b>Pages</b>   <b-button class="ml-3" size="sm" variant="light" @click="updatePageList" title="refresh"> <b-icon icon="
      journal-arrow-down" aria-hidden="true"></b-icon></b-button>

      <b-input-group prepend="new" class="mt-3">
        <b-form-input v-model="npname"></b-form-input>
        <b-input-group-append>
          <b-button variant="info" @click="createPage">Créer</b-button>
        </b-input-group-append>

      </b-input-group>
      <b-form-group label="enregistrer au format" v-slot="{ ariaDescribedby }">
        <b-form-radio v-for="f in formats" :key="f.name"
        v-model="format"
        :aria-describedby="ariaDescribedby"
        name="format-radios" :value="f"> {{f.name}}</b-form-radio>
      </b-form-group>


      <!-- <b-input-group prepend="Nouvelle Json" class="mt-3">
      <b-form-input v-model="njname"></b-form-input>
      <b-input-group-append>
      <b-button variant="info" @click="createJson">Créer</b-button>
    </b-input-group-append>
  </b-input-group> -->

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
      npname: "NouvellePage",
      //  njname: "Nouveau Json",
      format: null,
      formats: [
        {name: "dossier", default: null, mimetype: null, ext: null },
        {name: "html", default: '<meta charset="utf-8">', mimetype: "text/html", ext: "html" },
        {name: "html au format json", default: '{}', mimetype: "application/json", ext: "json" },
        {name: "ressource json", default: '{}', mimetype: "application/json", ext: "json" },
        {name: "ressource jsonld", default: '{}', mimetype: "application/ld+json", ext: "json" },
        {name: "ressource ttl", default: '', mimetype: "text/turtle", ext: "ttl" },
        {name: "txt", default: '', mimetype: "text/plain", ext: "txt" }
      ]
    }
  },
  created(){
    this.format = this.formats[1]
    this.pod = this.$store.state.solid.pod
    this.updatePageList()
  },
  methods:{
    createPage(){
      this.public_root = this.pod.storage+"public/"
      let thing = {name: this.npname, dest: this.public_root, content: this.format.default, type: {mime: this.format.mimetype}}
      console.log(thing)
      this.$createThing(thing)
      this.updatePageList()
    },
    // createJson(){
    //   this.public_root = this.pod.storage+"public/"
    //   this.$createThing({name: this.njname, dest: this.public_root, content: '{"@id":"'+this.public_root+this.njname+'.json"}', type: {mime: "application/json"}})
    //   //  this.$setCurrentThing({name: this.npname, url: public_root+this.npname})
    //   this.updatePageList()
    // },
    //
    setCurrent(p){
      console.log(p)
      this.$setCurrentThing(p)
    },
    async updatePageList(){
      if(this.pod != null){
        this.public_root = this.pod.storage+"public/"
        this.pages = await this.$getFolderContent(this.public_root)
        this.init()
      }else{
        this.pages = []
      }
    },
    init(){
      try{
        this.$setCurrentThing({name: "PagePrincipale", url: this.public_root+"PagePrincipale.html"})
      }
      catch(e){
        console.log(e)
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
