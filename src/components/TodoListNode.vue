<template>
      <tr>
        <td>
          <v-btn v-if="!todoItem.completed" class="ma-2" v-on:click="$emit('check')" outlined color="#333" style="width: 75%" large>완료</v-btn>
          <v-btn v-else class="ma-2" v-on:click="$emit('check')" outlined color="#333" style="width: 75%" large>완료취소</v-btn>
        </td>
        <td>{{ todoItem.importance }}</td>
        <td >{{ todoItem.data }}</td>
        <td>{{ todoItem.registerDate }}</td>
        <td >{{ todoItem.startDate }}</td>
        <td >{{ todoItem.endDate }}</td>
        <td v-if="!todoItem.completed">
          <v-btn class="ma-2" v-on:click="$emit('delete')" outlined color="#333" style="width: 75%" large>삭제</v-btn>
        </td>
        <td v-if="!todoItem.completed">
          <v-btn class="ma-2" v-on:click="$emit('update')" outlined color="#333" style="width: 75%" large>수정</v-btn>
        </td>
      </tr>
</template>

<script>
export default {
    props: ["todoItem", "FontColor" ,"lowFontStyle", "middleFontStyle", "highFontStyle"],
    methods: {
    },
}
</script>

<style>
</style>