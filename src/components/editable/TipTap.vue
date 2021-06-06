<template>
  <div v-if="editor">
    <button @click="setLink" :class="{ 'is-active': editor.isActive('link') }">
      link
    </button>
    <button @click="editor.chain().focus().unsetLink().run()" v-if="editor.isActive('link')">
      remove
    </button>
    <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
      bold
    </button>
    <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
      italic
    </button>
    <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
      strike
    </button>
    <button @click="editor.chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
      code
    </button>
    <button @click="editor.chain().focus().unsetAllMarks().run()">
      clear marks
    </button>
    <button @click="editor.chain().focus().clearNodes().run()">
      clear nodes
    </button>
    <button @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
      paragraph
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
      h1
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
      h2
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
      h3
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
      h4
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
      h5
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
      h6
    </button>
    <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
      bullet list
    </button>
    <button @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
      ordered list
    </button>
    <button @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">
      code block
    </button>
    <button @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">
      blockquote
    </button>
    <button @click="editor.chain().focus().setHorizontalRule().run()">
      horizontal rule
    </button>
    <button @click="editor.chain().focus().setHardBreak().run()">
      hard break
    </button>
    <button @click="editor.chain().focus().undo().run()">
      undo
    </button>
    <button @click="editor.chain().focus().redo().run()">
      redo
    </button>



    <bubble-menu
    class="bubble-menu"
    :tippy-options="{ duration: 100 }"
    :editor="editor"
    v-if="editor"
    >
    <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
      Bold
    </button>
    <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
      Italic
    </button>
    <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
      Strike
    </button>
  </bubble-menu>

  <floating-menu
  class="floating-menu"
  :tippy-options="{ duration: 100 }"
  :editor="editor"
  v-if="editor"
  >
  <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
    H1
  </button>
  <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
    H2
  </button>
  <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
    Bullet List
  </button>
</floating-menu>

<editor-content :editor="editor" />

</div>
</template>

<script>
import {
  Editor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from '@tiptap/vue-2'

import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Link from '@tiptap/extension-link'
import Bold from '@tiptap/extension-bold'
import StarterKit from '@tiptap/starter-kit'

export default {
  name: "TipTap",
  components: {
    EditorContent,
    BubbleMenu,
    FloatingMenu,
    // Bold,

  },
  props: {
    value: {
      type: Object,
      default: function() {return {content: "", type: {mime: ""}}},
    },
  },

  data() {
    return {
      editor: null,
    }
  },
  methods:{
    setLink() {
      const url = window.prompt('URL')

      this.editor.chain().focus().setLink({ href: url }).run()
    },
    checkMaj(content){
      console.log(content)
      let match = content.match(/[A-Z]/g)
      if (match != null){
        var nbMaj = content.match(/[A-Z]/g).length;
        console.log("nbMaj",nbMaj)
        return nbMaj == 2

      }
    }
  },

  watch: {
    value() {
      console.log(this.value, this.value.type.mime)
      let type = this.value.type && this.value.type.mime || undefined

      this.checkMaj(this.value.content)

      let isSame = false
      if(type == "application/json"){
        // JSON
        console.log("type",type)



        this.value.content = JSON.parse(this.value.content)
        console.log(this.value.content)
        isSame = this.editor.getJSON().toString() === this.value.content
      }else{
        // HTML
        console.log("type",type)
        isSame = this.editor.getHTML() === this.value.content
      }


      if (isSame) {
        return
      }

      this.editor.commands.setContent(this.value.content, false)
    },
  },

  mounted() {
    let app = this
    this.editor = new Editor({
      extensions: [
        StarterKit,
        Document,
        Paragraph,
        Text,
        Bold,
        Link,
      ],
      content: this.value.content,
      onBlur: () => {

        let type = this.value.type.mime
        if(type == "application/json"){
          this.value.content = JSON.stringify(this.editor.getJSON())
          console.log("content",this.value.content)
          this.$emit('input', this.value)
        }else{
          console.log("type",type)
          this.value.content = this.editor.getHTML()
          this.$emit('input', this.value)
        }
      },
      onUpdate:(c) =>{
        console.log(c.transaction.doc.content)
        // console.log(this.editor)
        // let nodes = this.editor.getJSON().content
        // console.log(nodes)
        // nodes.forEach((n) => {
        //   //  console.log(n)
        //   if(n.content != undefined && n.content.length > 0){
        //     console.log(n.content)
        //     n.content.forEach((c)=>{
        //       // if (c.marks == undefined){
        //       //
        //       // }
        //       if (c.text != undefined){
        //         let parts = c.text.split(" ")
        //         parts.forEach((p) => {
        //           let lnk = app.checkMaj(p)
        //           console.log(p,lnk)
        //           if (lnk == true){
        //             p = '___'+p+'___'
        //           }
        //         });
        //
        //
        //       }
        //
        //
        //     })
        //   }
        // });

        //  console.log(this.editor.getJSON())
        //this.checkMaj(this.editor.getHTML())

      }
    })
  },
  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>
<style >

/* Basic editor styles */
::v-deep {
  .ProseMirror {
    > * + * {
      margin-top: 0.75em;
    }

    a {
      color: #68CEF8;
    }
  }
}

/* Basic editor styles */

> * + * {
  margin-top: 0.75em;
}

ul,
ol {
  padding: 0 1rem;
}

blockquote {
  padding-left: 1rem;
  border-left: 2px solid rgba(#0D0D0D, 0.1);
}


.bubble-menu {
  display: flex;
  background-color: #0D0D0D;
  padding: 0.2rem;
  border-radius: 0.5rem;

  button {
    border: none;
    background: none;
    color: #FFF;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0 0.2rem;
    opacity: 0.6;

    &:hover,
    &.is-active {
      opacity: 1;
    }
  }
}

.floating-menu {
  display: flex;
  background-color: #0D0D0D10;
  padding: 0.2rem;
  border-radius: 0.5rem;

  button {
    border: none;
    background: none;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0 0.2rem;
    opacity: 0.6;

    &:hover,
    &.is-active {
      opacity: 1;
    }
  }
}

> * + * {
  margin-top: 0.75em;
}

ul,
ol {
  padding: 0 1rem;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  line-height: 1.1;
}

code {
  background-color: rgba(#616161, 0.1);
  color: #616161;
}

pre {
  background: #0D0D0D;
  color: #FFF;
  font-family: 'JetBrainsMono', monospace;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;

  code {
    color: inherit;
    padding: 0;
    background: none;
    font-size: 0.8rem;
  }
}

img {
  max-width: 100%;
  height: auto;
}

blockquote {
  padding-left: 1rem;
  border-left: 2px solid rgba(#0D0D0D, 0.1);
}

hr {
  border: none;
  border-top: 2px solid rgba(#0D0D0D, 0.1);
  margin: 2rem 0;
}

</style>
