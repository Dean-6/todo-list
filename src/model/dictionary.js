class DictWord {
    constructor(dict) {
        this.dict = dict;
    }

    getText(text) {
        let f = this.dict.find(x => x.text === text);
        return f === undefined ? "" : f.text;
    }

    getFontWeight(text) {
        let f = this.dict.find(x => x.text === text);
        return f === undefined ? "" : f.fontWeight;
    }

    getColor(text) {
        let f = this.dict.find(x => x.text === text);
        return f === undefined ? "" : f.color;
    }

    getBgColor(text) {
        let f = this.dict.find(x => x.text === text);
        return f === undefined ? "" : f.bgColor;
    }
}

const dictionary = {
    Todo_property: new DictWord([
        {
            text:"낮음",
            fontWeight: '700',
            color:"#333",
            bgColor:"#98fb9881;",
        },
        {
            text:"중간",
            fontWeight: '800',
            color:"#333",
            bgColor:"#FFFACD",
        },
        {
            text:"높음",
            fontWeight: '900',
            color:"#333",
            bgColor:"#f8cdd4",
        },
        
    ])
}