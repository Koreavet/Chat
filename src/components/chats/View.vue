<template>
 <div class="wrapper">
  <div class="headers">
  <div class="chatname" >
  <h3 class="descriptionChat">{{ chat.label }}</h3>
  <h3 class="descriptionChat">{{ chat.members }}</h3>
  </div>
  </div>
  <div class="innerwrapper">
    <div class="messageList" id="messageList" v-chat-scroll="{always: false, smooth: true, scrollonremoved:true, smoothonremoved: false}">
      <div v-for="message in chat.history" :class="{messageWrapper:true, fromMe: login === message.from, notFromMe: login !== message.from }" :key="message.id">
      <div class="from">
      {{ message.from}}
      </div>
      <div class="text">
      {{ message.text}}
      </div>
      <div class="timestamp">
      {{formatDate(message.timestamp) }} 
      </div>
    </div>
  </div>
 </div>
</div>
</template>

<script>
import EventBus from '@/EventBus';
export default {
  name: "viewList",
  props: {
    chat: {
      type: Object,
      default: {
      history: []
      },
    },
    login: {
      type: String,
      default: ""
      }
  },
  methods: {
    updateScroll: async function (){
      const messageList = document.querySelector('#messageList'); 
      if(messageList.scrollYOffset < messageList.scrollHeight){
        console.log({messageList});
      messageList.scrollTo(0,messageList.scrollHeight)
      }

    },
    formatDate: function (timestamp) {
      const dateNow = new Date(timestamp)
      const hours = String(dateNow.getHours());
      const minutes = String(dateNow.getMinutes())
      const handler_hours = hours.length < 2 ? '0' + hours : hours
      const handler_minutes = minutes.length < 2 ? '0' + minutes : minutes
      return `${handler_hours}:${handler_minutes}:${dateNow.getSeconds()}`
    }
  },
  async mounted(){
    setInterval(() => this.updateScroll(),1000)
    EventBus.$on('updateScroll', async () => {
      this.updateScroll();
    })
  }
}
</script>

<style lang="less" scoped>
.headers{
  top: 0px;
  left: 0px;
  right: 0px;
  width: 100%;
  height: 80px;
  display: flex;
  background: #1b243b;
  -webkit-touch-callout: none;
  border-left: 1px solid white;
  justify-content: center;
  align-items: center;
}
.wrapper {
  height: 90vh;
  display: flex;
  flex-direction: column;
    
  .innerwrapper {
  height: 90vh;
  overflow-y: scroll;
  width: inherit;
}
  .messageList {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  .messageWrapper {
  max-width: 60%;
  height: auto;
  min-height: 90px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
  margin-bottom: 15px;
  * {
  width: 100%;
  }
  .text {
  font-size: 1em;
  }
  .from {
  font-size: 1.1em;
  text-align: left;
  }
  .timestamp {
  font-size: .9em;
  color: rgba(120, 113, 113, 0.9);
  text-align: right;
  }
}
 .fromMe {
  background-color: rgba(50, 192, 50, .8) ;
  text-align: right;
  align-self: flex-end;
  }
  .notFromMe {
  background-color: #e5e5e5;
  text-align: left;
  align-self: flex-start;
  }
 }
 .descriptionChat{
  color: white;
  margin-top: 0px ;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
 }
}
  
</style>