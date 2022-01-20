<template>
    <div id="app">
      <header><h1>MY TO DO</h1></header>
      <div>
        <label>{{ timestamp }}</label>
        <input type="text" placeholder="할 일" v-model="createTodoItem.newTodoItemData" />
        <input type="text" placeholder="시작일" v-model="createTodoItem.newTodoItemStartDate" />
        <input type="text" placeholder="종료일" v-model="createTodoItem.newTodoItemEndDate" />
        <button v-on:click="addTodoItem">
          <span>Add</span>
        </button>
      </div>
      <div>
        <button v-on:click="deleteAll">Delete All</button>
        <button v-on:click="showAll">Show All</button>
      </div>
      <br>
      <div>
        <!-- <ul>
          <li v-for="todoItem in todoItems" v-bind:key="todoItem">
            <span v-bind:for="todoItem">{{ todoItem }}</span>
          </li>
        </ul> -->
        <table border="1px solid #333;">
          <thead>
            <tr>
              <th><input type="checkbox"/></th>
              <th>등록일</th>
              <th>할 일</th>
              <th>시작일</th>
              <th>종료일</th>
              <th>삭제</th>
              <th>수정</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(todoItem, index) in todoItems">
            <tr v-show="!todoItem.hide" v-bind:key="index">
              <td><input type="checkbox" v-model="todoItem.hide"/></td>
              <td>{{ todoItem.registerDate }}</td>
              <td >{{ todoItem.data }}</td>
              <td >{{ todoItem.startDate }}</td>
              <td >{{ todoItem.endDate }}</td>
              <td><button v-on:click="deleteTodoItem(index)">삭제</button></td>
              <td><button v-on:click="updateModal(todoItem, index)">수정</button></td>
            </tr>
            </template>
          </tbody>
        </table>
      </div>
      <br>
      <div v-show="showModal" class="modal">
        <div>
          <p>update TO DO</p>
          <input type="text" v-model="upDataToDoItem.upDataData"/>
          <input type="text" v-model="upDataToDoItem.upDateStartDeat"/>
          <input type="text" v-model="upDataToDoItem.upDateEndDate"/>
          <button v-on:click="updateTodoItem(upDataToDoItem)"><span>Update</span></button>
        </div>
      </div>
    </div>  
</template>

<script>
import getDate from "./assets/commonJS/getDate"

export default {
  
  data() {
    return {
      timestamp: "",
      showModal: false,
      createTodoItem: {
        newTodoItemData: "",
        newTodoItemStartDate: "",
        newTodoItemEndDate: "",
      },
      upDataToDoItem: {
        upDataRegisterDate: "",
        upDataData: "",
        upDateStartDeat: "",
        upDateEndDate: "",
        upDataIndex: 0,
      },
      todoItems: []
    }
  },
  created() {
        this.timestamp = `${getDate().month}/${getDate().date} ${getDate().week}`;
  },
  methods: {

    // 인풋초기화
    clearInput() {
      this.createTodoItem.newTodoItemData = "";
      this.createTodoItem.newTodoItemStartDate = "";
      this.createTodoItem.newTodoItemEndDate = "";
    },

    // 체크박스초기화
    clearCheck() {
      
    },
    
    // 추가
    addTodoItem() {
      let value = {
        registerDate: `${getDate().month}/${getDate().date}`,
        data: this.createTodoItem.newTodoItemData,
        startDate: this.createTodoItem.newTodoItemStartDate,
        endDate: this.createTodoItem.newTodoItemEndDate,
        hide: false,
      }
      this.todoItems.push(value);
      // console.log(this.todoItems);
      this.clearInput();
    },

    // 선택 삭제
    deleteTodoItem(index) {
      // var index = this.todoItems.findIndex(function(value){
      //   return todoItems.data === value; 
      // })  
      this.todoItems.splice(index, 1);
      console.log(index);
      // this.todoItems.splice(index,1);

    },

    // 수정모달창에 값전달
    updateModal(todoItem, index) {
      this.showModal = !this.showModal;
      this.upDataToDoItem = {
        upDataRegisterDate : todoItem.registerDate,
        upDataData : todoItem.data,
        upDateStartDeat : todoItem.startDate,
        upDateEndDate : todoItem.endDate,
        upDataIndex : index
      }
      // this.upDataToDoItem.upDataData = todoItem.data;
      // this.upDataToDoItem.upDataIndex = index;
      
      // console.log(this.upTodoIndex);
      // console.log(this.upTodoData);
    },

    // 모두삭제
    deleteAll() {
      this.todoItems = [];
    },

    // 체크한 요소
    changeShow(todoItem) {
      todoItem.hide = !todoItem.hide;
    },

    // 모두 보이기
    showAll() {
      for(var i=0; i<=this.todoItems.length; i++){
        this.todoItems[i].hide = false;
      }
    },

    // 수정
    updateTodoItem(data) {


      this.todoItems[data.upDataIndex] = {
        registerDate : data.upDataRegisterDate,
        data: data.upDataData,
        startDate: data.upDateStartDeat,
        endDate: data.upDateEndDate,
      };
      // this.todoItems.splice(index, 1, value);
      this.showModal = !this.showModal;
    }
  }
};
</script>

<style>
  .modal{
    position: absolute;
  }
</style>