<template>
  <div class="wrapper">
    <input v-model="authData.login" type="text" placeholder="Login" class="login">
    <input type="text" v-model="authData.password" placeholder="Password" class="password">
    <button class="approve" v-on:click="buttonClickHandler">Sign in</button>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

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
        return Swal.fire("Введите данные")
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
        Swal.fire("Login or password isn't correct")
      }
      console.log({response})
      if (response.info.status === "Error") {
        return Swal.fire(response.payload)
      }
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
*{
  margin: 0;
    padding: 0;
}

::placeholder{
color: #fff;
} 
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;
    border-radius: 8px;
    padding: 15px;
    width: 450px;
    max-width: 90%;
    height: 700px;
    background:url('https://picsum.photos/1000/1500?image=827');
    background-repeat:no-repeat;
    background-position: top center;
    background-size: cover;
    margin:5% auto 0px;

    input {
    color: 000;
    margin-top: 15px ;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 5em;
    height: 50px;
    width: 80%;
    margin: 5px 0;
    padding: 5px;
    text-indent: 10px;
    color: white;
    font-weight: 600;
    &:hover {
     border: 1px solid rgba(140, 145, 150, 1);
     color: white;
    }
    &:focus{
      outline: none;
    }
  }
}
  .approve{
  width: 70%;
  height: 3.6em;
  margin-top: 20px;
  border: none;
  border-radius: 10em;
  font-family: 'Open Sans', sans-serif;
  font-weight: 550;
  letter-spacing: 2px;
  z-index: 1;
  position: relative;
  display: inline-block;
  color: grey;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: .5s;
  &:hover {
  background: #c99fed;
  color: #fff;
  border-radius: 10em;
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 2px;
  z-index: 1;
  box-shadow: 0 0 5px #c99fed,
              0 0 25px #c99fed,
              0 0 50px #c99fed,
              0 0 100px #c99fed;
   }
 .approve:nth-child(1) {
 top: 0;
 left: -100%;
 width: 100%;
 height: 2px;
 background: linear-gradient(90deg, transparent, #c99fed);
 animation: btn-anim1 1s linear infinite;
}
  @keyframes btn-anim1 {
  0% {
  left: -100%;
  }
  50%,100% {
  left: 100%;
  }
}
.approve:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #c99fed);
  animation: btn-anim2 1s linear infinite;
  animation-delay: .25s
}
  @keyframes btn-anim2 {
  0% {
   top: -100%;
  }
  50%,100% {
    top: 100%;
  }
}
.approve:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #c99fed);
  animation: btn-anim3 1s linear infinite;
  animation-delay: .5s
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,100% {
    right: 100%;
  }
}
.approve:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #c99fed);
  animation: btn-anim4 1s linear infinite;
  animation-delay: .75s
}
@keyframes btn-anim4 {
    0% {
     bottom: -100%;
    }
    50%,100% {
    bottom: 100%;
    }
  }
}
</style>