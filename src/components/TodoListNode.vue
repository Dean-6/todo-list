<template>
      <tr v-show="!todoItem.hide">
        <td><input type="checkbox" v-model="todoItem.hide"/></td>
        <td>{{ todoItem.importance }}</td>
          v-bind:class="[
            todoItem.importance=='낮음'?['bgcolorGreen']:[],
            todoItem.importance=='중간'?['bgcolorYellow']:[],
            todoItem.importance=='높음'?['bgcolorRed']:[],
          ]"
        <td>{{ todoItem.registerDate }}</td>
        <td >{{ todoItem.data }}</td>
        <td >{{ todoItem.startDate }}</td>
        <td >{{ todoItem.endDate }}</td>
        <td><button v-on:click="$emit('delete')">삭제</button></td>
        <td><button v-on:click="$emit('update')">수정</button></td>
      </tr>
</template>

<script>
export default {
    props: ["todoItem"],
    methods: {
      // deleteTodoItem: function(){
        
      // },

      // updateModal: function(){
      //   this.$emit("update");
      // }
    }
}
</script>

<style>
  td {
    width: 200px;
  }
</style>