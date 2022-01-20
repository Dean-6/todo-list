<template>
  <ul class="list">
      <li class="list_item" v-for="(todoItem, index) in propsdata" v-bind:key="todoItem.item">
          <input type="checkbox" v-bind:id="todoItem.item" v-bind:checked="todoItem.completed === true" v-on:change="toggleComplete(todoItem)"/>
          <label v-bind:for="todoItem.item" class="list_label">
              <p class="list_text">{{ todoItem.item }}</p>
          </label>
          <button class="list__delete" v-on:click="removeTodo(todoItem, index)">
            <div class="blind">Delete</div>
          </button>
          <p class="list_date">{{ todoItem.date }}</p>
          <!-- <button class="list_delete">Delete</button> -->
      </li>
  </ul>
</template>

<script>
export default {
    props: ["propsdata"],
    data() {
        return {
            todoItems: []
        };
    },
    created() {
        if (localStorage.length > 0) {
            for(let i = 0; i < localStorage.length; i++) {
                // if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
                this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                // }
            }
        }
    },
    methods: {
        toggleComplete(todoItem) {
            todoItem.completed = !todoItem.completed;
            localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
        },
        removeTodo(todoItem, index) {
            localStorage.removeItem(todoItem.item);
            this.todoItems.splice(index, 1);
        }   
    }
}
</script>

<style>

</style>