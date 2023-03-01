<template>
<footer>
  <textarea placeholder="Type your message" v-model="textMessage"></textarea>
  <button :disabled="!chatId" class="send_btn" v-on:click="deliveryMessage">Send</button>
</footer>
</template>

<script>
import axios from 'axios';
import EventBus from '@/EventBus';
export default {
  name: "sendMessage", 
  data: () => ({
    serverUrl: "http://195.49.210.34/",
    textMessage: ''
  }),
  props: {
    chatId: {
      type: String,
      default: '',
    },
    login: {
        type: String,
        default: ''
      }
  },
  methods: {
   deliveryMessage: async function (){
    console.log(this.chatId);
   const send_message_data ={
    login: this.login,
    chatId: this.chatId,
    text: this.textMessage
   }
   const response = await this.sendRequest("chat/send/text", "POST", send_message_data)
   console.log(response);
   const messageData = response.payload

   EventBus.$emit('messageFromMe', messageData)
   EventBus.$emit('updateScroll')



   if(response.info.status === 'Error') return alert(response.payload)

  },
  
  sendRequest: async function(path, method, body){
      const url = `${this.serverUrl}${path}`

      if(method == 'GET'){
        return (await axios.get(url)).data
      } else {
        return (await axios.post(url, body)).data
      }
    }
  }
}
</script>

<style scoped>
 footer{
    height:155px;
    /* padding:20px 30px 10px 20px; */
    display: flex;
    justify-content: center;
    align-items: center;
  }
   footer textarea{
    resize:none;
    border:none;
    display:flex;
    flex-direction: column;
    width:80%;
    height:80px;
    border-radius:3px;
    padding:20px;
    font-size:13px;
    margin-bottom:13px;
  }
   footer textarea::placeholder{
    color:#ddd;
  }
   footer img{
    height:30px;
    cursor:pointer;
  }
  .send_btn{
    text-decoration:none;
    text-transform:uppercase;
    font-weight:bold;
    color:#6fbced;
    vertical-align:top;
    /* margin-left:333px; */
    margin-top:5px;
    width: 70px;
    height: 40px;
    /* display: flex;
    align-items: center;
    flex-direction: center; */
    display: flex;
    /* justify-content: flex-start; */

}
</style>