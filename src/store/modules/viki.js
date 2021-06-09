//import Vue from 'vue';

const state = () => ({
  file: {content: null, type: {mime: null}}
})

const actions = {
  // uploadLocalToPod(context,file){
  //   try{
  //     console.log(file)
  //     Vue.prototype.$uploadLocalToPod(file)
  //     // let graph = JSON.parse(file.content)
  //     // graph.path = file.path
  //     // context.commit('addToNetwork', graph)
  //   }catch(e){
  //     console.log(file, "->", e)
  //     alert(e+" in "+file.path)
  //   }
  // }
}

const mutations = {
  setFile(state, f){
    state.file = f
  },
  // setPod(state,p){
  //   state.pod = p
  // },

}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
