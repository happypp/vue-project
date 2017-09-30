<template>
  <div id="app">
    <h1 v-text="title"></h1>
    <input type="text" v-model="newItem" @keyup.enter="addItem">
    <ul>
      <li v-for="item in items" :class="{isFinish: item.isFinished}" @click="toggleFinish(item)">
        {{item.label}}
      </li>
    </ul>
    <p>{{chirdMessage}}</p>
    <components-a message="you die~~~~" @chirld-tell-you="listenTellYou"></components-a>

    <componentsB message="you die~~~~" @chirld-tell-you="listenTellYou"></componentsB>
  </div>
</template>

<script>
import Store from './store'
import ComponentsA from './components/ComponentsA.vue'
import ComponentsB from './components/ComponentsB.vue'
export default {
  data () {
    return {
      title: "this is a todo list",
      items: Store.fetch(),
      newItem: "",
      chirdMessage: ""
    }
  },
  components: {ComponentsA,ComponentsB},
  watch: {
    items: {
      handler: function (items) {
        Store.save(items)
      },
      deep: true
    }
  },
  methods: {
    toggleFinish: function (item) {
      item.isFinished = !item.isFinished;
    },
    addItem: function () {
      this.items.push({
        label: this.newItem,
        isFinished: false
      });
      this.newItem = "";
    },
    listenTellYou: function (chirdMessage) {
      this.chirdMessage = chirdMessage;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.isFinish{text-decoration: underline}
</style>
