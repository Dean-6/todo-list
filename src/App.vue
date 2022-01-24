<template>
    <div id="app">
      <header><h1>TO DO LIST</h1></header>
      <div class="inputdata">
        <label><b>{{ timestamp }} </b></label>

        <select id="selectBox" @change="createSelect($event)">
          <option value="선택안함" selected>===== 중요도 =====</option>
          <option value="no" disabled>안해도됨</option>
          <option value="낮음">낮음</option>
          <option value="중간">중간</option>
          <option value="높음">높음</option>
        </select>
        <input class="addinput" type="text" placeholder="할 일" v-model="createTodoItem.newTodoItemData" />
        <input class="addinput" type="date" placeholder="시작일" value="2022-07-09" v-model="createTodoItem.newTodoItemStartDate" />
        <input class="addinput" type="date" placeholder="종료일" v-model="createTodoItem.newTodoItemEndDate" />
        <button v-on:click="addTodoItem">
          <span>Add</span>
        </button>
      </div>
      <div class="buttonBox">
        <button v-on:click="showCompletedList">완료 목록 보기</button>
        <select id="showListSelect" v-on:click="changeListShow()">
          <option value="전체보기" selected>전체보기</option>
          <option value="선택안함">선택안함</option>
          <option value="낮음">중요도 - 낮음</option>
          <option value="중간">중요도 - 중간</option>
          <option value="높음">중료도 - 높음</option>
        </select>
        <button v-on:click="deleteAll">Delete All</button>
        <button v-on:click="showAll">Show All</button>
      </div>
      <br>
      <div>
        <label><b>중요도 - {{showList}}</b></label>
        <table border="1px solid #333;">
          <thead>
            <tr>
              <th>완료</th>
              <th>중요도</th>
              <th>등록일</th>
              <th>할 일</th>
              <th>시작일</th>
              <th>종료일</th>
              <th>삭제</th>
              <th>수정</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(todoItem, index) in todoItems.filter(importanceList)">
            <todo-list-node
              v-bind:key="index"
              v-bind:todoItem="todoItem"
              v-bind:lowFontStyle="lowFontStyle"
              v-bind:middleFontStyle="middleFontStyle"
              v-bind:highFontStyle="highFontStyle"
              v-bind:FontColor="FontColor"
              v-on:delete="deleteTodoItem(index)"
              v-on:update="updateModal(todoItem, index)"
              v-on:check="changeShow(todoItem)"
            ></todo-list-node>
            </template>
          </tbody>
        </table>
      </div>
      <br>
      <div v-show="showCompleted">
        <label><b>완료 목록</b></label>
        <table border="1px solid #333;">
          <thead>
            <tr>
              <th>완료취소</th>
              <th>중요도</th>
              <th>등록일</th>
              <th>할 일</th>
              <th>시작일</th>
              <th>종료일</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(todoItem, index) in todoItems.filter(completedList)">
            <todo-list-node
              v-bind:key="index"
              v-bind:todoItem="todoItem"
              v-bind:lowFontStyle="lowFontStyle"
              v-bind:middleFontStyle="middleFontStyle"
              v-bind:highFontStyle="highFontStyle"
              v-bind:FontColor="FontColor"
              v-on:delete="deleteTodoItem(index)"
              v-on:update="updateModal(todoItem, index)"
              v-on:check="changeShow(todoItem)"
            ></todo-list-node>
            </template>
          </tbody>
        </table>
      </div>
      <br>
      <div v-show="showModal" class="modal">
        <div class="updataTable">
          <p><b>update TO DO</b></p>
          <select id="updataSelectBox"
            v-bind:class="[
              upDataToDoItem.upDataImportance=='낮음'?['bgcolorGreen']:[],
              upDataToDoItem.upDataImportance=='중간'?['bgcolorYellow']:[],
              upDataToDoItem.upDataImportance=='높음'?['bgcolorRed']:[],
           ]"
            v-bind:style="[
              upDataToDoItem.upDataImportance=='낮음'?{color : lowFontStyle.fontColor, fontWeight: lowFontStyle.fontWeight} : {},
              upDataToDoItem.upDataImportance=='중간'?{color : middleFontStyle.fontColor, fontWeight: middleFontStyle.fontWeight} : {},
              upDataToDoItem.upDataImportance=='높음'?{color : highFontStyle.fontColor, fontWeight: highFontStyle.fontWeight} : {},
            ]"
          >
          <option style="background-color: #fff; color:#333;" value="선택안함">=== 중요도 ===</option>
          <option style="background-color: #fff; color:#333;" value="no" disabled>안해도됨</option>
          <option style="background-color: green; color:#fff;" value="낮음">낮음</option>
          <option style="background-color: yellow; color:#fff;" value="중간">중간</option>
          <option style="background-color: red; color:#fff;" value="높음">높음</option>
        </select>
          <input class="updatainput" type="text" disabled v-model="upDataToDoItem.upDataRegisterDate"/>
          <input class="updatainput" type="text" v-model="upDataToDoItem.upDataData"/>
          <input class="updatainput" type="date" v-model="upDataToDoItem.upDateStartDeat"/>
          <input class="updatainput" type="date" v-model="upDataToDoItem.upDateEndDate"/>
          <button v-on:click="updateTodoItem(upDataToDoItem)"><span>Update</span></button>
        </div>
      </div>
    </div>  
</template>

<script>
import getDate from "./assets/commonJS/getDate"
import todoListNode from "./components/TodoListNode.vue"

export default {
  components: {
    todoListNode, 
  },
  
  data() {
    return {
      timestamp: "",
      todaydate: "",
      showList: "전체보기",
      showCompleted: false, 
      showModal: false,
      createSelectValue: "",
      createTodoItem: {
        newTodoImportance: "",
        newTodoItemData: "",
        newTodoItemStartDate: "",
        newTodoItemEndDate: "",
      },
      upDataToDoItem: {
        upDataImportance: "",
        upDataRegisterDate: "",
        upDataData: "",
        upDateStartDeat: "",
        upDateEndDate: "",
        upDataIndex: 0,
      },
      todoItems: [],

      lowFontStyle: {
        'fontColor': 'red',
        'fontWeight': '200',
      },
      
      middleFontStyle: {
        'fontColor': 'green',
        'fontWeight': '700',
      },

      highFontStyle: {
        'fontColor': 'blue',
        'fontWeight': '900',
      },

      FontColor: '#000',
    }
  },
  computed: {
    importanceList() {
      return todoItem => (this.showList == '전체보기' ||  todoItem.importance == this.showList) && todoItem.completed == false;
    },

    completedList() {
      return todoItem => todoItem.completed == true;
    }
  },

  created() {
        this.timestamp = `${getDate().month}/${getDate().date} ${getDate().week}`;
        this.createSelectValue = "선택안함";
        // 조금 더 이해하고 수정
        const now = new Date();
        const tomorrow = new Date(now.setDate(now.getDate() +1));
        
        this.createTodoItem.newTodoItemStartDate = new Date().toISOString().substring(0, 10);
        this.createTodoItem.newTodoItemEndDate = tomorrow.toISOString().substring(0, 10);
  },

  methods: {
    createSelect(event) {
      console.log(event.target.value);
      this.createSelectValue = event.target.value;
    },

    // 목록보기 필터
    changeListShow() {
      const target = document.getElementById("showListSelect");
      this.showList = target.options[target.selectedIndex].value;
      console.log(this.showList);
    },

    // 초기화
    clearInput() {
      this.createTodoItem.newTodoItemData = "";
      this.createTodoItem.newTodoItemStartDate = "";
      this.createTodoItem.newTodoItemEndDate = "";

      const now = new Date();
      const tomorrow = new Date(now.setDate(now.getDate() +1));
      this.createTodoItem.newTodoItemStartDate = new Date().toISOString().substring(0, 10);
      this.createTodoItem.newTodoItemEndDate = tomorrow.toISOString().substring(0, 10);
    },
    
    // 추가
    addTodoItem() {
      // const target = document.getElementById("selectBox");
      // const targetValue = target.options[target.selectedIndex].value;

      let value = { 
        importance: this.createSelectValue,
        registerDate: `${getDate().month}/${getDate().date}`,
        data: this.createTodoItem.newTodoItemData,
        startDate: this.createTodoItem.newTodoItemStartDate,
        endDate: this.createTodoItem.newTodoItemEndDate,
        completed: false,
      }
      this.todoItems.push(value);
      this.clearInput();
    },

    // 선택 삭제
    deleteTodoItem(index) {
      this.todoItems.splice(index, 1);
      console.log(index);
    },

    // 완료목록 보기
    showCompletedList() {
      this.showCompleted = !this.showCompleted;
    },

    // 수정모달창에 값전달
    updateModal(todoItem, index) {
      this.showModal = !this.showModal;
      document.getElementById("updataSelectBox").value = todoItem.importance;
      this.upDataToDoItem = {
        upDataImportance : todoItem.importance,
        upDataRegisterDate : todoItem.registerDate,
        upDataData : todoItem.data,
        upDateStartDeat : todoItem.startDate,
        upDateEndDate : todoItem.endDate,
        upDataIndex : index
      }
    },

    // 모두삭제
    deleteAll() {
      this.todoItems = [];
    },

    // 체크하기
    changeShow(todoItem) {
      todoItem.completed = !todoItem.completed;
      console.log(todoItem.completed);
    },

    // 모두 보이기
    showAll() {
      for(var i=0; i<=this.todoItems.length; i++){
        this.todoItems[i].completed = false;
      }
    },

    // 수정
    updateTodoItem(data) {
      const updataImportance = document.getElementById("updataSelectBox");
      const updataImportanceData = updataImportance.options[updataImportance.selectedIndex].value;

      this.todoItems[data.upDataIndex] = {
        importance: updataImportanceData,
        registerDate: data.upDataRegisterDate,
        data: data.upDataData,
        startDate: data.upDateStartDeat,
        endDate: data.upDateEndDate,
        completed: false,
      };
      this.showModal = !this.showModal;
    },
  }
};
</script>

<style>


  .addinput, .updatainput {
    width: 250px;
    height: 32px;
    font-size: 15px;
    border: 0;
    border-radius: 15px;
    outline: none;
    padding-left: 10px;
    background-color: rgb(233, 233, 233);
    border: none;
    /* border-radius: 1em; */
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    outline: none;
    margin: 0 10px;
  }

  select {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    width: 250px;
    
    font-family: "Noto Sansf KR", sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    
    color: #444;
    background-color: #E9E9E9;
    
    padding: .6em 1.4em .5em .8em;
    margin: 0;
    
    border: none;
    border-radius: 1em;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    outline: none;
    margin: 0 15px;
  }

  button {
    width: 140px;
    height: 30px;
    font-size: 15px;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    font-weight: 500;
    color: #000;
    background-color: #E9E9E9;
    border: none;
    border-radius: 1em;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
    margin: 0 15px;
  }

  table {
    border-collapse: collapse;
    text-align: center;
    line-height: 1.5;
    border: 1px solid #E9E9E9;
    margin: 20px 10px;
  }
  table thead {
    border-right: 1px solid #ccc;
    border-left: 1px solid #ccc;
    background: #E9E9E9;
  }
  table thead th {
    padding: 10px;
    font-weight: bold;
    vertical-align: top;
    color: #000;
  }
  table tbody th {
    width: 150px;
    padding: 10px;
    font-weight: bold;
    vertical-align: top;
    border-bottom: 1px solid #ccc;
    background: #fcf1f4;
  }
  table td {
    width: 350px;
    padding: 10px;
    vertical-align: top;
    border-bottom: 1px solid #ccc;
  }

  .inputdata {
    text-align: right;
  }

  .buttonBox{
    text-align: right;
    margin-top: 20px;
  }

  .bgcolorGreen {
    background: green;
  }

  .bgcolorYellow {
    background-color: yellow;
  }

  .bgcolorRed {
    background-color: red;
  }
  
  .updataTable {
    text-align: right;
  }
</style>
