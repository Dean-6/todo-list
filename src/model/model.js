import dayjs from 'dayjs'

export default {
    components: {
      dayjs
    },
}

export class Todo{
    constructor() {
        this.importance = "";
        this.registerDate = dayjs().format("YYYY-MM-DD");
        this.data = "";
        this.startDate = "";
        this.endDate = "";
        this.completed = false;
    }
}