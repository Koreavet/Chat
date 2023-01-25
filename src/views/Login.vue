<template>
  <div class="home">
    <Auth id="auth" />
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
  }
}
</script>

<style lang="less" scoped>
.home {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  #auth {
    width: 40%;
    height: 25%;
  }
}
  
</style>
