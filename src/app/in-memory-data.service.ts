export class InMemoryDataService{
    createDb(){
        let heroes=[
            {id:1,name:"李逍遥"},
            {id:2,name:"酒剑仙"},
            {id:3,name:"赵灵儿"},
            {id:4,name:"林月如"},
            {id:5,name:"阿  奴"},
            {id:6,name:"唐钰小宝"},
            {id:7,name:"拜月教主"},
            {id:8,name:"景天"},
            {id:9,name:"唐雪见"},
            {id:10,name:"徐长卿"}
        ];
        return {heroes};
    }
}