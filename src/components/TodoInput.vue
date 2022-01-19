<template>
    <div class="add">
        <input type="text" class="add_input" placeholder="Enter your task" v-modal="newTodoItem" v-on:keyup.enter="addTodoItem" />
        <button class="add_button" v-on:click="addTodoItem">
            <span class="blind">Add</span>
        </button>
    </div>
</template>

<script>
import getDate from "../assets/commonJS/getDate"

export default {
    data() {
        return {
            newTodoItem: ""
        };
    },
    methods: {
        addTodoItem() {
            if(this.newTodoItem != ""){
                var value = {
                    item: this.newTodoItem,
                    date: `${getDate().date} ${getDate().week}`,
                    time: getDate().time,
                    completed: false
                };
                localStorage.setItem(this.newTodoItem, JSON.stringify(value));
                this.clearInput();
            }
        },
        clearInput() {
            this.newTodoItem = "";
        }
    }
}
</script>

<style>

</style>