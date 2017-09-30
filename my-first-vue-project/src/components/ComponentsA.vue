<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{message}}</h2>
    <button @click="clickMe">click me</button>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome2 to Your Vue.js App'
    }
  },
  props: ['message'],
  methods: {
    clickMe: function () {
      console.log(this.message);
      this.$emit("chirld-tell-you","you is always die!!!");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
