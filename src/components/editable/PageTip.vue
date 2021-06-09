<template>
  <div>

    <Textarea v-if="file.type.mime == 'text/plain'" v-model="file" @sauve="sauve"/>
    <tiptap v-if="file.type.mime == 'text/html'" v-model="file" @input="sauve"/>
    <ActionList @action="action" />
    {{ file }}
  </div>
</template>

<script>
export default {
  name: "PageTip",
  data(){
    return{
      // txt: `======Félicitations, votre wiki est installé !
      //
      // ===""YesWiki"" : un outil convivial potentiellement collaboratif===
      // Voici quelques éléments afin de bien démarrer de vous approprier ce nouvel outil.
      // - Le double-clic est votre ami ! Si vous voulez modifier une page de votre Yeswiki, double-cliquez simplement dessus ou cliquez sur "éditer la page" en bas à gauche
      // - Si vous voulez vous exercer sereinement, vous pouvez essayer de modifier la page [[BacASable bac à sable]].
      // - Vous pouvez également essayer de modifier de la même manière la page sur laquelle vous êtes actuellement.
      // - Vous souhaitez modifier le menu horizontal général ? Double-cliquez gauche sur ce menu (en dehors du texte), et vous aurez accès à l'édition de ce menu. Utilisez les tirets ("-") pour créer de nouvelles entrées.
      // - Et il y a une page de la doc ""YesWiki"" à lire absolument, celle qui vous permet de [[https://yeswiki.net/?HistoriqueRevisions restaurer une page modifiée en cas d'erreur ou de problème]]. Comme ça, aucun risques !!!
      //   - Le menu d'administration en haut à droite, accessible depuis la roue crantée (clic gauche) vous permettra :
      //   - de [[WikiAdmin gérer le site (pages importantes, comptes et groupes utilisateurs, etc.)]],
      //   - d’administrer la [[BazaR base de données Bazar]],
      //   - de consulter les [[TableauDeBord dernières modifications sur le wiki]].
      //   `,
      //menuVisible: false,
      //  editable: false,
    }
  },
  components: {
    // 'ButtonToolbar': () => import('@/components/editable/ButtonToolbar'),
    'ActionList': () => import('@/components/editable/ActionList'),
    'Tiptap':() => import ('@/components/editable/TipTap.vue'),
    'Textarea':() => import ('@/components/editable/Textarea.vue')
  },
  methods:{
    action(a){
      console.log("action",a)
    },
    sauve(){
      // console.log(e)
      // console.log(this.file)
      this.file.content = this.file.type.mime == "text/html" ? '<meta charset="utf-8">'+this.file.content : this.file.content
      console.log(this.file)
      this.$save(this.file)
    },
  },
  watch:{
    file(){
      console.log(this.file)
    }
  },
  computed:{
    file:{
      get () { return this.$store.state.viki.file},
      set (/*value*/) { /*this.updateTodo(value)*/ }
    },
  }
}
</script>
