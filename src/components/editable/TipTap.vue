<template>
  <div v-if="editor">
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

import StarterKit from '@tiptap/starter-kit'

export default {
  name: "TipTap",
  components: {
    EditorContent,
    BubbleMenu,
    FloatingMenu,
    // Bold,
    //  Link
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

  watch: {
    value() {
      console.log(this.value, this.value.type.mime)
      let type = this.value.type && this.value.type.mime || undefined


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
    this.editor = new Editor({
      extensions: [
        StarterKit,
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
    })
  },
}
</script>
<style >
/* Basic editor styles */
.ProseMirror {
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
</style>
