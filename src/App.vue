<template>
    <div id="app">
      <todo-header />
      <todo-title />
      <todo-input />
      <todo-controller 
        v-on:clearAll="clearAllItem"
      />
      <todo-list 
        v-bind:propsdata="todoItems" 
        v-on:removeItem="removeOneItem"
        v-on:toggleItem="toggleOneItem"
        />
      <todo-footer />
    </div>  
</template>

<script>
import TodoHeader from "./components/TodoHeader.vue";
import TodoTitle from "./components/TodoTitle.vue";
import TodoInput from "./components/TodoInput.vue";
import TodoController from "./components/TodoController.vue";
import TodoList from "./components/TodoList.vue";
import TodoFooter from "./components/TodoFooter.vue";

export default {
  name: "App",
  components: {
    TodoHeader,
    TodoTitle,
    TodoInput,
    TodoController,
    TodoList,
    TodoFooter
  },
  data() {
    return {
      todoItems: []
    }
  },
  created() {
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        // if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
          this.todoItems.push(
            JSON.parse(localStorage.getItem(localStorage.key(i)))
          );
        // }
      }
    }
  },
  methods: {
    initList(){
        if (localStorage.length > 0) {
        for (let i = 0; i < localStorage.length; i++) {
          // if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
            this.todoItems.push(
              JSON.parse(localStorage.getItem(localStorage.key(i)))
            );
          // }
        }
      }
    },
    removeOneItem(todoItem, index) {
      localStorage.removeItem(todoItem.item);
      this.todoItems.splice(index, 1);
    },
    toggleOneItem(todoItem) {
      todoItem.completed = !todoItem.completed;
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    },
    clearAllItem() {
      this.todoItems = [];
      localStorage.clear();
    }
  }
};
</script>

<style>

</style>