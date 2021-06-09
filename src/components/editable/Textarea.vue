<template>
  <div>
    <b-form-textarea
    id="textarea"
    v-model="text"
    placeholder="Entrez quelque chose..."
    rows="3"
    max-rows="6"
    ></b-form-textarea>

    <b-button variant="success" size="sm" @click="sauve">Sauver</b-button>

  </div>
</template>

<script>
export default {
  name:'Textarea',
  props: {
    value: {
      type: Object,
      default: function() {return {content: "", type: {mime: ""}}},
    },
  },
  data() {
    return{
      text: ""
    }
  },
  created(){
    this.text = this.value.content
  },
  methods:{
    sauve(){
      this.value.content = this.text
      this.$emit('sauve', this.value)
    }
  }
}
</script>

<style>

</style>
