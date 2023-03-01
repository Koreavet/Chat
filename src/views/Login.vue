<template>
  <div class="home">
    <div class="switcher">
    <button class="auth" v-on:click="switch_handler(true)">Registration</button>
    <button class="reg" v-on:click="switch_handler(false)">Authorization</button>
    </div>
    <div class="forms">
    <Auth v-if="!switcher" id="auth" />
    <Reg v-if="switcher"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Auth from '@/components/Auth.vue'
import Reg from '@/components/Reg.vue'

export default {
  name: 'Login',
  components: {
    Auth,
    Reg
  },
  data: () => ({
  switcher:false
}),
    methods: {
    switch_handler: function (isSwitch){
      this.switcher = isSwitch
}
}
}
</script>

<style lang="less" scoped>
.home {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;


  //#auth {
  //  width: 100%;
  //  height: 45%;
  //}
}
  .switcher {
    width: 50%;
    height: 45px;
    padding: 8px 16px 8px 16px;
    & * {
      width: 25%;
      cursor: pointer;
      font-family: sans-serif;
      font-size: 1.25em;
      //letter-spacing: 7px;
    }

  }

</style>
