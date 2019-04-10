<template>
  <div class="hello">
    <h1>Hello word</h1>
    <Address @getAddress='getAddress'  :codes='address'/>
  </div>
</template>

<script>
  import Address from './address.vue'
  export default {
    name: 'HelloWorld',
    components: {Address},
    props: {
      msg: String
    },
    data() {
      return {
        address: {
          province: "",
          city: "",
          county: "",
          changeActive: false
        }
      }
    },
    methods: {
      getAddress(data) {
        console.log(data);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
