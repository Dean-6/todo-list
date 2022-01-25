<template>
      <tr 
        v-bind:class="[
            todoItem.importance=='낮음'?['bgcolorGreen']:[],
            todoItem.importance=='중간'?['bgcolorYellow']:[],
            todoItem.importance=='높음'?['bgcolorRed']:[],
          ]"
          v-bind:style="[
            todoItem.importance=='낮음'?{color : lowFontStyle.fontColor, fontWeight: lowFontStyle.fontWeight} : {},
            todoItem.importance=='중간'?{color : middleFontStyle.fontColor, fontWeight: middleFontStyle.fontWeight} : {},
            todoItem.importance=='높음'?{color : highFontStyle.fontColor, fontWeight: highFontStyle.fontWeight} : {},
          ]"
      >
      <!-- <tr v-show="todoItem.importance=='선택안함'"> -->
        <td>
          <v-btn
            v-if="!todoItem.completed"
            class="ma-2"
            v-on:click="$emit('check')"
            outlined
            color="#333"
            style="width: 75%"
            large
          >
          완료
          </v-btn>
          <v-btn
            v-else
            class="ma-2"
            v-on:click="$emit('check')"
            outlined
            color="#333"
            style="width: 75%"
            large
          >
          완료취소
          </v-btn>
          <!-- <button v-if="!todoItem.completed" v-on:click="$emit('check')">완료</button> -->
          <!-- <button v-else v-on:click="$emit('check')">완료취소</button> -->
        </td>
        <td>{{ todoItem.importance }}</td>
        <td >{{ todoItem.data }}</td>
        <td>{{ todoItem.registerDate }}</td>
        <td >{{ todoItem.startDate }}</td>
        <td >{{ todoItem.endDate }}</td>
        <td v-if="!todoItem.completed">
          <v-btn
            class="ma-2"
            v-on:click="$emit('delete')"
            outlined
            color="#333"
            style="width: 75%"
            large
          >
          삭제
          </v-btn>
          <!-- <button v-on:click="$emit('delete')">삭제</button> -->
        </td>
        <td v-if="!todoItem.completed">
          <v-btn
            class="ma-2"
            v-on:click="$emit('update')"
            outlined
            color="#333"
            style="width: 75%"
            large
          >
          수정
          </v-btn>
          <!-- <button v-on:click="$emit('update')">수정</button> -->
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