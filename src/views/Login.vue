<template>
  <div class="home">
    <div class="switcher">
    <button id="box1" class="auth" v-on:click="switch_handler(true)">Registration
    </button>
    <button id="box2" class="reg" v-on:click="switch_handler(false)">Authorization</button>
    </div>
    <div class="forms">
    <Auth v-if="!switcher" id="auth" />
    <Reg v-if="switcher"/>
    </div>
  </div>
</template>

<script>
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
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
  background: #e5e5e5;
}
.switcher {
  width: 50vh;
  height: 45px;
  padding: 8px 16px 8px 16px;
  & * {
    width: 150px;
    cursor: pointer;
    font-family: sans-serif;
    font-size: 1.25em;
    }
  #box1{
  border: none;
  border-bottom: 1px black solid;
  background-color: white;
  border-radius: 9px 0px 0px 9px;
  padding: 3px;
  &:hover{
  border: 1px #4a5d81 solid;
  background-color: #4a5d81;
  color: white;
   }
 }
  #box2{
  border: none;
  border-bottom: 1px black solid;
  background-color: white;
  padding: 3px;
  border-radius: 0px 9px 9px 0px;
  &:hover{
   border: 1px #4a5d81 solid;
   background-color: #4a5d81;
   color: white;
  }
 }
}
</style>
