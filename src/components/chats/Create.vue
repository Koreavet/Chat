<template>
  <div :class="{containerModale: true}">
    <div @click="closeModale" :class="{closeModale: true}">X</div>

    <div class="addMembers">
      <input v-model="label" type="text" class="label" placeholder="Name of a Chat">
      <input v-model="description" type="text" class="description" placeholder="Description of a Chat">
      <div class="members">
        <input @keypress.enter="addMemberButtonHandler" list="usersList" v-model="takeMember" type="text" class="takeMember" placeholder="Take a Member">
        <div v-on:click="addMemberButtonHandler" class="addMember">Add</div>
      </div>
    </div>

    <div class="createChat">
      <div class="addedMembers">Added members: {{ selectedMembers }}</div>
      <div v-on:click="createChatButtonHandler" class="create">Create</div>
    </div>
    <datalist id="usersList">
      <option v-for="user in usersList" :key="user._id" :value="user.login"></option>
    </datalist>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
  name:'createChat',
  data: () => ({
    serverUrl: "http://195.49.210.34/",
    label: '',
    description: '',
    takeMember: '',
    selectedMembers: [],
    usersList: [],
    isActive: false
  }),
  async mounted (){
    this.usersList = (await this.sendRequest("user", "GET")).payload
  },
  
  methods: {
    closeModale: function (){
      this.$emit('closeModalCreateChat')
    },
    createChatButtonHandler: async function(){
      if(!this.label) return Swal.fire('No label of a chat')
      if(!this.description) return Swal.fire('No description of a chat')
      if(!this.selectedMembers.length < 0) return Swal.fire('No Members chosed')

      let data = {
        userId: `${this.$route.params.id}`,
        label: this.label,
        members: this.selectedMembers,
        description: this.description
      }

      const response = await this.sendRequest('chat/create', 'POST', data)

      if(response.info.status === 'Error') return Swal.fire(response.payload)

      return Swal.fire(`Chat ${this.label} is created`)
    },
    addMemberButtonHandler: async function(){
      if(!this.takeMember)return alert('No friends chose')
      if(this.selectedMembers.includes(this.takeMember)) return Swal.fire('You have been choose this Member')
    
      let selectedMembersIsExist = false;
      let counter = 0;
      for (const user of this.usersList) {
        if (user.login === this.takeMember) {
          selectedMembersIsExist = true
          break 
        }
        if(this.selectedMembers.includes(user.login)) 
          counter++
        
      }
     if (!selectedMembersIsExist) return Swal.fire (`This user ${this.takeMember} does not exist`);
     if(counter !== this.selectedMembers.length) return Swal.fire ("This user does not exist")
      this.selectedMembers.push(this.takeMember)
      this.takeMember = ''
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

<style lang="less">
.containerModale{
  margin: 0 auto;
  border: 1px solid black;
  border-radius: 14px;
  position: relative;
  background:url('https://picsum.photos/1000/1500?image=827'), #1b243b;
  background-repeat:no-repeat;
  background-position: top center;
  background-size: cover;
}

.addMembers{
  margin-top: 5%;
}

.closeModale{
  width: 20px;
  height: 20px;
  position: absolute;
  right: 2%;
  top: 2%;
  color: white;
  font-weight: 600;
}
.closeModale:hover{
  cursor: pointer;
}
input{
  width: 90%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 16px;
  background-color: white;
  background-position: 10px 10px;
  background-repeat: no-repeat;
  padding: 12px 20px 12px 40px;
  margin: 5px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  &:hover{
    outline: none;
  }
}
.addMember{
  width: 30px;
  margin: 0 auto;
  margin-top: 4%;
}
.addMember:hover{
  cursor: pointer;
}
.createChat{
  margin: 3%;
}
.create{
  margin: 3%;
}
.create:hover{
  cursor: pointer;
}
.createChat{
  color: white;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 300;
}
</style>