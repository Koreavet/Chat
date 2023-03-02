<template>
<div class="wrapper" id="main">
  <div class="createButton">
    <button class="btn" v-on:click="createChatButtonHandler"></button>
    <input type="text" placeholder="Search" class="search" >
    <div class="chat-list-header">Active Conversations: </div>
 
  <div class="list">
    <div class="element"
    v-for="chat in availableCharts"
    v-bind:key="chat._id"
    @click="$event => chooseChatHandler(chat._id)">
<div class="photo">

        <img src="data:image/png;base64,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" height="50px" width="50px">

        <div class="title">
           {{chat.label}}

      <div class="from">
        {{chat.history.at(-1).from}}: &nbsp;
      </div>
      <div class="lastMessage">
        {{chat.history.at(-1).text.slice(0,20)}}...
      </div>
        </div>  </div>
      </div>
  </div>
  </div>
</div>
</template>

<script>
import axios from "axios";
import EventBus from "@/EventBus";

export default {
  name: 'chartList',
  components: {},
  props: {
    login: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    serverUrl: "http://195.49.210.34/",
    availableCharts: []
  }),
  async mounted() {
    EventBus.$on("userDataReady", async(user)=> {
      await this.update_chat_list(user.login)
      EventBus.$on("newChat", async (chat_data) =>{
      await this.update_chat_list(user.login)

    })
    })
  },

  methods: {
    createChatButtonHandler: function(){
    this.$emit('openModalCreateChat')
    },
    update_chat_list: async function(login)  {
    const  response = await this.sendRequest(`chat/user/${login}`, "GET")
    this.availableCharts = response.payload
    },
    sendRequest: async function (path, method, body) {
      const url = `${this.serverUrl}${path}`
      let response
      // method = method.toLowerCase()
      // return  await axios[method](url).data
      if (method === "GET") {
        return (await axios.get(url)).data
      } else {
        return (await axios.post(url, body)).data
      }
    },
    chooseChatHandler: function(chat_id){
      this.$emit("choose_chat", chat_id)
      EventBus.$emit('updateScroll')
    }
  }
}
</script>

<style scoped lang="less">
#main{
  overflow-y: auto;
  margin-right: 0px;
}
.wrapper {
  width:260px;
  height:100%;
  background-color:#1b243b;
  font-size:15px;
  max-width: 50%;
  margin-right: 24px;
  cursor: pointer;
  flex-basis: 310px;
  flex-shrink: 0;
  @media screen and (max-width: 800px) {
  max-width: 40%;
}
  @media screen and (max-width: 700px) {
  max-width: 30%;
}
}

.list{
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.from{
  padding-left:0;
  margin:0;
  list-style-type:none;
  color: white;
  @media screen and (max-width: 700px) {
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0 auto;
 }
}

.lastMessage, .title{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  vertical-align:top;
  color: white;
  @media screen and (max-width: 700px) {
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0 auto;
  }
}
.title{
@media screen and (max-width: 700px) {
justify-content: center;
align-items: center;
margin: 0 auto;
 }
}
 .search{
   width:80%;
   height:50px;
   line-height:50px;
   padding:0 50px 0 20px;
   background-color:#6E7C9D;
   border:none;
   border-radius:9px;
   background-image:url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_search.png);
   background-repeat:no-repeat;
   background-position:175px;
   background-size:40px;
   margin-bottom: 10px;
   color: white;
 }

.search::placeholder{
  color: #fafafa;
}
.photo{
  display: flex;
  @media screen and (max-width: 800px) {
  display: flex;
}
  @media screen and (max-width: 700px) {
  display: inline-block;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
 }
}

.lastMessage{
  margin-bottom: 5px;
}
.chatList{
  overflow-y:scroll;
}
.btn{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  align-self: center;
  justify-content: center;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAU0lEQVR4nO3TwQmAUAwFwfTfdLx7VtwvM5ACHktmAIDX7e2OtYbEKFKjSI0iNYrUKFKTK7If32MMGUUm/VvHWkNiFKlRpEaRGkVqFKn5TREAmBNcXKbvEbAKdz4AAAAASUVORK5CYII=");
  background-size: cover;
}

.chat-list-header{
  font-weight: 700;
  line-height: 24px;
  font-size: 16px;
  color: white;
  margin-bottom: 10px;
}
</style>