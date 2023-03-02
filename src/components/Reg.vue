<template>
  <div class="wrapper" id="panel">
    <input v-model="regData.login" type="text" placeholder="Login" class="login">
    <input v-model="regData.password" type="text" placeholder="Password" class="password">
    <input v-model="regData.tryPassword" type="text" placeholder="Try password" class="tryPassword">
    <button class="approve" v-on:click="registrationClickHandler">Sign up</button>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
export default {
  name: 'Reg',
  data: () => ({
  serverUrl: "http://195.49.210.34/",
    regData: {
      login: '',
      password: '',
      tryPassword: ''
    }, 
  }),
  methods:{
    registrationClickHandler: async function ()  {
    if(!this.regData.password  || !this.regData.tryPassword || !this.regData.tryPassword) {
    return  Swal.fire("Введите данные")}
    const response = await this.sendRequest("user/registration", "POST",{
    userData: {
      login: this.regData.login,
      password: this.regData.password,
      tryPassword: this.regData.tryPassword,
      }
    })
      console.log({response})
      if(response.info.status === "Error"){
        return Swal.fire(response.payload)
      }
      // this.$router.push({ name: 'login' })
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
    }
  }
}
</script>

<style lang="less" scoped>
*{
  margin: 0;
    padding: 0;
}

#panel{
  width: 450px;
    max-width: 90%;
    height: 700px;
    background:url('https://picsum.photos/1000/1500?image=827') #fff;
    background-repeat:no-repeat;
    background-position: top center;
    background-size: cover;
    margin:5% auto 0px;
}

::placeholder{
color: #fff;
}
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    border: 1px solid gray;
    border-radius: 8px;
    padding: 15px;
    margin: 2px;
    input {
    color: 000;
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
    margin-bottom: 5px;
    
      &:hover {
        border: 1px solid rgba(140, 145, 150, 1);
        color: white;
        outline: none;
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