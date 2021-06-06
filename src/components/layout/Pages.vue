<template>
  <div>
    <b>Pages</b><br>
    <ul>
      <li v-for="p in pages" :key="p.url"><a href="#" @click="setCurrent(p)">{{ p.name }}</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name:"Pages",
  data(){
    return {
      pages: []
    }
  },
  created(){
    this.pod = this.$store.state.solid.pod
  },
  methods:{
    setCurrent(p){
      console.log(p)
      this.$setCurrentThing(p)
    },
    async updatePageList(){
      if(this.pod.storage != undefined){
        let public_root = this.pod.storage+"public/"
        this.pages = await this.$getFolderContent(public_root)
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
