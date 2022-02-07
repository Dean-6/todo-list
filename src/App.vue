<template>
    <v-app id="app" style="width: 100%">
      <v-banner elevation="24" single-line sticky style="width: 100%"><h1>TO DO LIST</h1></v-banner>
        <v-banner elevation="20" single-line sticky style="position-absolute top-0 start-50 translate-middle width: 90%">{{ timestamp }}</v-banner>
        <br>
        <div class="inputdata" >
          <v-container>
            <v-row>
              <v-col>
                <v-select :items="selectItem" label="중요도" v-model="createTodo.importance" return-object></v-select>
              </v-col>
              <v-col>
                <v-text-field label="계획" placeholder="할 일" v-model="createTodo.data"></v-text-field>
              </v-col>
              <v-col>
                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="createTodo.startDate" transition="scale-transition" offset-y min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="createTodo.startDate" label="시작일" readonly v-bind="attrs" v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="createTodo.startDate" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="#333" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="#333" @click="$refs.menu.save(createTodo.startDate)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col>
                <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :return-value.sync="createTodo.endDate" transition="scale-transition" offset-y min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="createTodo.endDate" label="종료일" readonly v-bind="attrs" v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="createTodo.endDate" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="#333" @click="menu1 = false">Cancel</v-btn>
                    <v-btn text color="#333" @click="$refs.menu1.save(createTodo.endDate)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col>
                <v-btn class="ma-2" @click="addTodoItem" outlined color="#333" style="width: 100%" large>추가</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
              </v-col>
              <v-col>
                <v-btn class="ma-2" @click="showCompletedList" outlined color="#333" style="width: 100%" large>완료 목록 보기</v-btn>
              </v-col>
              <v-col>
                <v-select :items="showListSelect" v-model="showList" label="중요도" return-object></v-select>
              </v-col>
              <v-col>
                <v-btn class="ma-2" v-on:click="deleteAll" outlined color="#333" style="width: 100%" large>전체 삭제</v-btn>
              </v-col>
              <v-col>
                <v-btn class="ma-2" @click="showAll" outlined color="#333" style="width: 100%" large>완료 초기화</v-btn>
              </v-col>
          </v-row>
        </v-container>
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
            <template v-for="(todoItem, index) in onImportanceList">
            <todo-list-node :key="index" :todoItem="todoItem" :lowFontStyle="lowFontStyle" @delete="deleteTodoItem(index)" @update="updateModal(todoItem, index)" @check="changeShow(todoItem)"></todo-list-node>
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
            <template v-for="(todoItem, index) in onCompletedList">
            <todo-list-node :key="index" :todoItem="todoItem" :lowFontStyle="lowFontStyle" @delete="deleteTodoItem(index)" @update="updateModal(todoItem, index)" @check="changeShow(todoItem)"></todo-list-node>
            </template>
          </tbody>
        </table>
      </div>
      <br>
      <div v-show="showModal" class="modal">
        <div class="updataTable">
          <p><b>update TO DO</b></p>
          <select id="updataSelectBox">
          <option style="background-color: #fff; color:#333;" value="선택안함">=== 중요도 ===</option>
          <option style="background-color: green; color:#fff;" value="낮음">낮음</option>
          <option style="background-color: yellow; color:#fff;" value="중간">중간</option>
          <option style="background-color: red; color:#fff;" value="높음">높음</option>
        </select>
          <input class="updatainput" type="text" disabled v-model="upDateToDoItem.upDataRegisterDate"/>
          <input class="updatainput" type="text" v-model="upDateToDoItem.upDataData"/>
          <input class="updatainput" type="date" v-model="upDateToDoItem.upDateStartDeat"/>
          <input class="updatainput" type="date" v-model="upDateToDoItem.upDateEndDate"/>
          <button v-on:click="updateTodoItem(upDateToDoItem)"><span>Update</span></button>
        </div>
      </div>
    </v-app>  
</template>

<script>
import todoListNode from './components/TodoListNode.vue'
import dayjs from 'dayjs'
// import {Todo} from './model/model'

export default {
  components: {
    todoListNode,
    dayjs
  },
  
  data() {
    return {
      menu: false,
      menu1: false, 
      timestamp: "",
      showList: "전체",
      showCompleted: false, 
      showModal: false,
      selectItem: [
        '낮음',
        '중간',
        '높음'
      ],
      showListSelect: [
        '전체',
        '낮음',
        '중간',
        '높음'
      ],
      // createTodo: new Todo(),
      createTodo: {
        'importance': "",
        'registerDate': dayjs().format("YYYY-MM-DD"),
        'data': "",
        'startDate': "",
        'endDate': "",
        'completed': false,
      },
      upDateToDoItem: {
        'upDateImportance' : "",
        'upDateRegisterDate' : "",
        'upDateData' : "",
        'upDateStartDeat' : "",
        'upDateEndDate' : "",
        'upDateIndex' : "",
      },
      todoItems: [],
    }
  },
  computed: {
    onImportanceList() {
      return this.todoItems.filter(x => x.computed === false).filter(x => this.showList == '전체' ||  x.importance == this.showList);
    },

    onCompletedList() {
      return this.todoItems.filter(x => x.computed === true);
    },
  },

  created() {
        this.timestamp = dayjs().format("YYYY-MM-DD");
        this.createTodo.importance = "낮음";
        
        this.createTodo.startDate = dayjs().format("YYYY-MM-DD");
        this.createTodo.endDate = dayjs().add(1 ,'day').format("YYYY-MM-DD");
  },

  methods: {
    // 목록보기 필터
    changeListShow() {
      const target = document.getElementById("showListSelect");
      this.showList = target.options[target.selectedIndex].value;
      console.log(this.showList);
    },

    // 초기화
    clearInput() {
      this.createTodo.data = "";

      this.createTodo.startDate = dayjs().format("YYYY-MM-DD");
      this.createTodo.endDate = dayjs().add(1, 'day').format("YYYY-MM-DD");
    },
    
    // 추가
    addTodoItem() {
      let value = { 
        importance: this.createTodo.importance,
        registerDate: this.createTodo.registerDate,
        data: this.createTodo.data,
        startDate: this.createTodo.startDate,
        endDate: this.createTodo.endDate,
        completed: this.createTodo.computed,
      }
      this.todoItems.push(value);

      
      // this.todoItems.push(this.createTodo);

      // console.log(this.createTodo);
      console.log(this.todoItems);

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
      this.upDateToDoItem = {
        upDateImportance : todoItem.importance,
        upDateRegisterDate : todoItem.registerDate,
        upDateData : todoItem.data,
        upDateStartDeat : todoItem.startDate,
        upDateEndDate : todoItem.endDate,
        upDateIndex : index
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
</style>