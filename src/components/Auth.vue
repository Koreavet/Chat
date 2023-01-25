<template>
  <div class="wrapper">
    <input v-model="authData.login" type="text" placeholder="Login" class="login">
    <input v-model="authData.password" type="text" placeholder="Password" class="password">
    {{ authData.login  }}
    {{ authData.password }}
    <button class="approve" v-on:click="buttonClickHandler">Войти</button>
  </div>
</template>

<script>
export default {
  name: 'Auth',
  data: () => ({
    authData: {
      login: '',
      password: ''
    }
  }),
  methods: {
    buttonClickHandler: function () {
      // this.$router.push({ name: 'test' })

      if (!this.authData.login && !this.authData.password) alert('Ты дурак ?')
    }
  }
}
</script>

<style lang="less" scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border: 1px solid gray;
    border-radius: 8px;
    padding: 15px;
    input {
      width: 80%;
      padding: 8px 16px;
      outline: none;
      border: 1px solid rgba(140, 145, 150, .6);
      border-radius: 3px;
      &:hover {
        border: 1px solid rgba(140, 145, 150, 1);
      }
    }
  }
</style>