<template>
  <div>
    <b>Pages</b>   <b-button class="ml-3" size="sm" variant="light" @click="updatePageList" title="refresh"> <b-icon icon="
      journal-arrow-down" aria-hidden="true"></b-icon></b-button>

      <b-input-group prepend="NouvellePage" class="mt-3">
        <b-form-input v-model="npname"></b-form-input>
        <b-input-group-append>
          <b-button variant="info" @click="createPage">Créer</b-button>
        </b-input-group-append>

      </b-input-group>
      <b-form-group label="enregistrer au format" v-slot="{ ariaDescribedby }">
        <b-form-radio v-model="format" :aria-describedby="ariaDescribedby" name="some-radios" value="html"> html</b-form-radio>
        <b-form-radio v-model="format" :aria-describedby="ariaDescribedby" name="some-radios" value="json"> json</b-form-radio>
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
      format: "html"
    }
  },
  created(){
    this.pod = this.$store.state.solid.pod
    this.updatePageList()
  },
  methods:{
    createPage(){
      this.public_root = this.pod.storage+"public/"
      let thing = {name: this.npname, dest: this.public_root, content: '<meta charset="utf-8">', type: {mime: "text/html"}}
      if(this.format == 'json'){
        thing.content = '{}'
        thing.type.mime = "application/json"
      }
      this.$createThing(thing)
      //  this.$setCurrentThing({name: this.npname, url: public_root+this.npname})
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
