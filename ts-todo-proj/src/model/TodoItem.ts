class TodoItem{
    constructor(public id:number,public task:string,public complete:boolean = false){
        this.id = id;
        this.task = task;
        this.complete = complete;

    }

    printDetails():void{
        console.log(
            `${this.id}  ${this.task}  ${this.complete ? "(complete)" : ""}`
        )
    }
}

export default TodoItem