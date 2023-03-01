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
// export default {
//   name: 'Auth',
//   data: () => ({
//     authData: {
//       login: '',
//       password: ''
//     }
//   }),
//   methods: {
//     buttonClickHandler: function () {
//       // this.$router.push({ name: 'test' })
//
//       if (!this.authData.login && !this.authData.password) alert('Ты дурак ?')
//     }
//   }
// }


export default {
  name: 'Auth',
  data: () => ({
    serverUrl: "http://195.49.210.34/",
    authData: {
      login: '',
      password: '',
    }, response: {}
  }),
  methods: {
    buttonClickHandler: async function () {
      if (!this.authData.password ) {
        return alert("Введите данные")
      }

      const response = await this.sendRequest("user/authorization", "POST", {
        userData: {
          login: this.authData.login,
          password: this.authData.password,
        }
      })

      if(response.info.status === "OK" && response.payload.isAuth){
        // this.$router.push({name:"home"})
        this.$router.push(({name:"home", params:{id:response.payload.userData[0]._id}}))
      } else {
        alert("Login or password isn't correct")
      }
      console.log({response})
      if (response.info.status === "Error") {
        return alert(response.payload)
      }
      // this.$router.push({name: 'test'})
      // if(response.info.status === "OK"){
      //
      // }
    },
    sendRequest: async function (path, method, body) {
      const url = `${this.serverUrl}${path}`
      const request_config = {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: null
      }
      if (method != "GET") request_config.body = JSON.stringify((body))

      const response = await fetch(url, request_config)

      return await response.json()
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