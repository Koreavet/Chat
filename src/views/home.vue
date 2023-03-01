
<template>
<div class="wrapper">
  <ChartList :login="user.login" @choose_chat="choose_chat" @openModalCreateChat="openModalCreateChat" class="chatList"/>
  <div class="message">
  <viewList :chat="currentChat" class="View"
  :login="user.login" />
  <sendMessage class="sendChat"
    :chatId="currentChat._id"
    :login="user.login" 
  />
</div>
  <div class="createChatModalWrapper" v-if="createChatIsOpen" >
    <createChat @closeModalCreateChat="closeModalCreateChat" class="createChat"/>

  </div>
</div>
</template>

<script>

import ChartList from "@/components/chats/List.vue";
import createChat from "@/components/chats/Create.vue"
import viewList from "@/components/chats/View.vue"
import sendMessage from "@/components/chats/SendMessage.vue";
import axios from "axios";
import EventBus from '@/EventBus.js';



export default {
  name: 'Home',
  data: () => ({
    serverUrl: "http://195.49.210.34/",
    createChatIsOpen: false,
    user: {},
    currentChat:{_id: ''}, 
    intervalId: '',
    webSoket: null
  }),
  components: {ChartList,
    createChat, viewList, sendMessage
  },
 
  methods: {
    openModalCreateChat: function() {
      this.createChatIsOpen = true
    },
    closeModalCreateChat: function (){
      this.createChatIsOpen = false
    },
    switchModalCreateChat: function(update){
      this.createChatIsOpen = update;
    },
    choose_chat: async function(chat_id){
      // if(this.intervalId){
      //   clearInterval(this.intervalId);
      // }
      this.currentChat = (await this.sendRequest(`chat/${chat_id}`,'GET')).payload[0]
      // this.intervalId = setInterval(() => this.update_chat_data(chat_id),1000);
    },
    update_chat_data: async function(chat_id){
      const oldChatData = JSON.parse(JSON.stringify(this.currentChat))
      this.currentChat = (await this.sendRequest(`chat/${chat_id}`,'GET')).payload[0]
      console.log(this.currentChat, oldChatData);
      if(oldChatData.history?.length < this.currentChat?.history?.length){
        this.notifyMe(this.currentChat.history.at(-1)?.text)
      }
    },
    notifyMe: function(text){
      if (!("Notification" in window)) {
    // Check if the browser supports notifications
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    const notification = new Notification(text);




    // …
  } else if (Notification.permission !== "denied") {
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        const notification = new Notification(text);
        // …
      }
    })
    }
  },
    sendRequest: async function (path, method, body) {
      const url = `${this.serverUrl}${path}`
      let response
      if (method === "GET") {
        return (await axios.get(url)).data
      } else {
        return (await axios.post(url, body)).data
      }
    },
    connect: async function () {
      this.webSoket = new WebSocket(`ws://195.49.210.34/ws?login=${this.user.login}`) ;

      this.webSoket.onopen = async (event) => {
      console.log({event});
      
      this.webSoket.onmessage = async (msg) => {
        const serverData = JSON.parse(msg.data)
        console.log(serverData);
        if(serverData.type === 'newMessage'){
          console.log(serverData)
          await this.update_chat_data(serverData.payload.chatId)
          EventBus.$emit('updateScroll')
        }
        else if (serverData.type === 'newChat') {
          EventBus.$emit('newChat', serverData.payload)
        }
        // await this.update_chat_data(serverData.payload.chatId)
        console.log({serverData});
      }
    }
        this.webSoket.onclose = async () => {
        console.log('ws recconect progress');
        await this.connect();
        console.log('ws recconected');
      }
        this.webSoket.onerror = async (error) => {
        console.log('ws Error: attempt to reaload');
        await this.connect();
      }
    }
  },

  async mounted(){
    const userId = this.$route.params.id;
    this.user = (await this.sendRequest(`user/${userId}`, "GET")).payload[0]
  
    EventBus.$emit("userDataReady", this.user)

    EventBus.$on('messageFromMe', (messageData) => {
      this.currentChat.history.push(messageData)
    })

    await this.connect();
  }
}
</script>


<style scoped lang="less">
.createChatModalWrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
}

.wrapper{
  display: flex;
}
.message{
  width: 80%;
  height: 80%;
  display: inline-block;
  justify-content: center;
  margin: 0 auto;
}
</style>

