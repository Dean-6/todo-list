
class DictWord {
    constructor(dict) {
        this.dict = dict;
    }

    // getFont(value) {
    //     let f = this.dict.find(x => x.value === value);
    //     return f === undefined ? null : f.font;
    // }

    getColor(value) {
        let f = this.dict.find(x => x.value === value);
        return (f && 'color' in f) ? f.color : '#FFFFFF';
    }
}

const dictionary = {
    product_importance: new DictWord([
        {
            value:"선택안함", 
            color:'#998c8c',
            font: "",
        },
        {
            value:"낮음", 
            color:'#59ff00', 
            font: "",
        },
        {
            value:"보통", 
            color:'#fff200', 
            font: "",
        },
        {
            value:"높음", 
            color:'#ff0000', 
            font: "",
        },
    ]),
} 