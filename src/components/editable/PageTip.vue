<template>
  <div>
    <!-- <ButtonToolbar v-if="editable" @sauve="sauve" @format="format" /> -->

    <tiptap v-model="txt" @input="sauve"/>

    <!-- <div
    ref="editableDiv"
    v-html="txt"
    variant = "sucess"

    @dblclick="dblclick"
    :contenteditable="editable ? true : false"
    >-->
    <!-- @blur="onEdit" -->
    <!--  </div>-->
    <ActionList @action="action" />
  </div>
</template>

<script>
export default {
  name: "Page",
  data(){
    return{
      txt: `======Félicitations, votre wiki est installé !

      ===""YesWiki"" : un outil convivial potentiellement collaboratif===
      Voici quelques éléments afin de bien démarrer de vous approprier ce nouvel outil.
      - Le double-clic est votre ami ! Si vous voulez modifier une page de votre Yeswiki, double-cliquez simplement dessus ou cliquez sur "éditer la page" en bas à gauche
      - Si vous voulez vous exercer sereinement, vous pouvez essayer de modifier la page [[BacASable bac à sable]].
      - Vous pouvez également essayer de modifier de la même manière la page sur laquelle vous êtes actuellement.
      - Vous souhaitez modifier le menu horizontal général ? Double-cliquez gauche sur ce menu (en dehors du texte), et vous aurez accès à l'édition de ce menu. Utilisez les tirets ("-") pour créer de nouvelles entrées.
      - Et il y a une page de la doc ""YesWiki"" à lire absolument, celle qui vous permet de [[https://yeswiki.net/?HistoriqueRevisions restaurer une page modifiée en cas d'erreur ou de problème]]. Comme ça, aucun risques !!!
        - Le menu d'administration en haut à droite, accessible depuis la roue crantée (clic gauche) vous permettra :
        - de [[WikiAdmin gérer le site (pages importantes, comptes et groupes utilisateurs, etc.)]],
        - d’administrer la [[BazaR base de données Bazar]],
        - de consulter les [[TableauDeBord dernières modifications sur le wiki]].
        `,
        menuVisible: false,
        editable: false,
      }
    },
    components: {
      // 'ButtonToolbar': () => import('@/components/editable/ButtonToolbar'),
      'ActionList': () => import('@/components/editable/ActionList'),
      'Tiptap':() => import ('@/components/editable/TipTap.vue')
    },
    methods:{
      action(a){
        console.log("action",a)
        switch (a) {
          case "edit":
          this.editable = true
          break;
          case "delete":

          break;
          case "history":

          break;
          case "permission":

          break;
          case "share":

          break;
          default:

        }
      },
      updatePage(){
        console.log(this.file)
        this.txt = this.file.content
      },
      dblclick(e){
        this.editable = true
        console.log("dbl",e)
      },
      // showMenu(){
      //   let old = this.txt
      //   this.menuVisible = true
      //   console.log("show", old)
      // },
      sauve(e){
        console.log(e)
        this.editable = false
        // var src = this.$refs.editableDiv.innerText
        // this.txt = src
        console.log(this.txt)
        this.file.content = this.txt
        console.log(this.file)
        this.$save(this.file)
      },
      format(f){
        console.log(f)
        //var text = "";
        console.log(typeof f)

        let balise = ""
        if(typeof f == "number"){
          //  balise = "=".repeat(7-f)
          balise = "h"+f
        }else{
          console.log("todo format",f)
        }



        console.log(balise)
        var sel, range;
        if (window.getSelection) {
          sel = window.getSelection();
          let txt = sel.toString()
          let replacementText = "<"+balise+">"+txt+"</"+balise+">"
          if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(replacementText));
          }
        } else if (document.selection && document.selection.createRange) {
          range = document.selection.createRange();
          let txt = range.txt
          let replacementText = "<"+balise+">"+txt+"</"+balise+">"
          range.text = replacementText;
        }
      },
      // replaceSelectedText(replacementText) {
      //   var sel, range;
      //   if (window.getSelection) {
      //     sel = window.getSelection();
      //     if (sel.rangeCount) {
      //       range = sel.getRangeAt(0);
      //       range.deleteContents();
      //       range.insertNode(document.createTextNode(replacementText));
      //     }
      //   } else if (document.selection && document.selection.createRange) {
      //     range = document.selection.createRange();
      //     range.text = replacementText;
      //   }
      //
      // }

    },
    watch:{
      file(){
        this.updatePage()
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

  <style>

  </style>
