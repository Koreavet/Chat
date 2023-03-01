<template>
  <div class="wrapper">
    <input v-model="regData.login" type="text" placeholder="Login" class="login">
    <input v-model="regData.password" type="text" placeholder="Password" class="password">
    <input v-model="regData.tryPassword" type="text" placeholder="try password" class="tryPassword">
    {{response}}
    <button class="approve" v-on:click="registrationClickHandler">Зарегистрироваться</button>
  </div>
</template>

<script>
export default {
  name: 'Reg',
  data: () => ({
  serverUrl: "http://195.49.210.34/",
    regData: {
      login: '',
      password: '',
      tryPassword: ''
    }, response: {}
  }),
  methods:{
    registrationClickHandler: async function ()  {
    if(!this.regData.password  || !this.regData.tryPassword || !this.regData.tryPassword) {
    return  alert("Введите данные")}

    const response = await this.sendRequest("user/registration", "POST",{
    userData: {
      login: this.regData.login,
      password: this.regData.password,
      tryPassword: this.regData.tryPassword,
      }
    })
      console.log({response})
      if(response.info.status === "Error"){
        return alert(response.payload)
      }
      this.$router.push({ name: 'test' })
      // if(response.info.status === "OK"){
      //
      // }
    },
    sendRequest: async function (path, method, body)  {
      const url = `${this.serverUrl}${path}`
      const request_config = {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: null
      }
      if(method != "GET") request_config.body = JSON.stringify((body))

      const response = await fetch(url, request_config)

      return await response.json()


      // // then method start
      // let requestData
      // fetch( `${this.serverUrl}${path}`, request_config)
      //     .then (response => {
      //       console.log({response})
      //       response.json()
      //           .then(jsonRes => {
      //             this.response = jsonRes
      //           })
      //           .catch(error => {
      //             console.log({error})
      //           })
      //     })
      //
      //     .catch(error => {
      //       console.log({error})
      //     })
      // then method end


      // console.log({response})
      // return requestData
      // fetch(request_config)
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
    margin: 2px;
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