<template>
  <div class="wrapper">
    <input type="text" placeholder="Login" class="login">
    <input type="text" placeholder="Password" class="password">
    <input type="text" placeholder="try password" class="tryPassword">
  </div>
</template>

<script>
export default {
  name: 'Reg'
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