<template>
    <div id="app">
      <header><h1>TO DO LIST</h1></header>
      <div class="inputdata">
        <label><b>{{ timestamp }} </b></label>

        <select id="selectBox">
          <option value="선택안함" selected>=== 중요도 ===</option>
          <option value="no" disabled>안해도됨</option>
          <option value="낮음">낮음</option>
          <option value="보통">보통</option>
          <option value="높음">높음</option>
        </select>
        <input class="addinput" type="text" placeholder="할 일" v-model="createTodoItem.newTodoItemData" />
        <input class="addinput" type="date" placeholder="시작일" value="2022-07-09" v-model="createTodoItem.newTodoItemStartDate" />
        <input class="addinput" type="date" placeholder="종료일" v-model="createTodoItem.newTodoItemEndDate" />
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
            <!-- <template v-for="(todoItem, index) in todoItems">
            <tr v-show="!todoItem.hide" v-bind:key="index">
              <td><input type="checkbox" v-model="todoItem.hide"/></td>
              <td>{{ todoItem.registerDate }}</td>
              <td >{{ todoItem.data }}</td>
              <td >{{ todoItem.startDate }}</td>
              <td >{{ todoItem.endDate }}</td>
              <td><button v-on:click="deleteTodoItem(index)">삭제</button></td>
              <td><button v-on:click="updateModal(todoItem, index)">수정</button></td>
            </tr>
            </template> -->
            <template v-for="(todoItem, index) in todoItems" >
            <todo-list-node
              v-bind:key="index"
              v-bind:todoItem="todoItem"
              v-on:delete="deleteTodoItem(index)"
              v-on:update="updateModal(todoItem, index)"
            ></todo-list-node>
            </template>
          </tbody>
        </table>
      </div>
      <br>
      <div v-show="showModal" class="modal">
        <div>
          <p>update TO DO</p>
          <select id="updataSelectBox">
          <option value="선택안함">=== 중요도 ===</option>
          <option value="no" disabled>안해도됨</option>
          <option value="낮음">낮음</option>
          <option value="보통">보통</option>
          <option value="높음">높음</option>
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
      showModal: false,
      // importance: {
      //   low: "",
      // },
      createTodoItem: {
        newTodoImportance: "",
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
        // 조금 더 이해하고 수정
        const now = new Date();
        const tomorrow = new Date(now.setDate(now.getDate() +1));
        
        this.createTodoItem.newTodoItemStartDate = new Date().toISOString().substring(0, 10);
        this.createTodoItem.newTodoItemEndDate = tomorrow.toISOString().substring(0, 10);

        // 잘 모르겠어서 더 알아보고 수정
        // this.createTodoItem.newTodoItemStartDate = new Date().toISOString().format('YYYY-MM-DD'); 

        console.log(this.todaydate);

  },
  computed: {
    
  },
  methods: {

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

    // 체크박스초기화
    clearCheck() {
      
    },
    
    // 추가
    addTodoItem() {
      const target = document.getElementById("selectBox");
      const targetValue = target.options[target.selectedIndex].value;

      console.log(target);
      console.log(targetValue);
      let value = { 
        importance: targetValue,
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
      document.getElementById("updataSelectBox").value = todoItem.importance;
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
      const updataImportance = document.getElementById("updataSelectBox");
      const updataImportanceData = updataImportance.options[updataImportance.selectedIndex].value;

      this.todoItems[data.upDataIndex] = {
        importance: updataImportanceData,
        registerDate: data.upDataRegisterDate,
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
  .addinput, .updatainput {
    width: 200px;
    height: 32px;
    font-size: 15px;
    border: 0;
    border-radius: 15px;
    outline: none;
    padding-left: 10px;
    background-color: rgb(233, 233, 233);
    border: none;
    border-radius: 1em;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    outline: none;
  }

  /* #selectBox {
    border-collapse: collapse;
    text-align: left;
    line-height: 1.5;
    border: 1px solid #ccc;
    margin: 20px 10px;
  } */



  select {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    
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
  }

  button {
    width: 140px;
    height: 30px;
    font-size: 11px;
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
</style>
