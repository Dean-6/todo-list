<template>
    <div class="controller">
        <br>
        <div class="select">
            <label for="oder">order         </label>
            <select name="order" id="order" class="selectbox">
                <option value="date-asc">Date Ascending</option>
                <option value="date-desc">Date Descending</option>
                <option value="name-asc">Name Ascending</option>
                <option value="name-desc">Name Descending</option>
            </select>
        </div>
        <button class="clear" v-on:click="clearTodo">Clear All</button>
    </div>
</template>

<script>
export default {
    methods: {
        clearTodo() {
            // localStorage.clear();
            this.$emit("clearAll");
        }
    }
}
</script>

<style>

</style>