export module Algorithm {

    /**
     * Các kiểu tác vụ trong một tiến trình
     */
    export enum TaskType {
        /**
         * Tác vụ đến
         */
        Arrive,
        /**
         * Tác vụ CPU
         */
        CPU,
        /**
         * Tác vụ  IO
         */
        IO
    }

    /**
     * Kiểu của IO
     */
    export enum IOType {
        /**
         * Chỉ có một thiết bị IO (IO chung)
         */
        Single,
        /**
         * Mỗi tiến trình có một thiết bị IO (IO riêng)
         */
        Multi
    }

    /**
     * Tác vụ của tiến trình
     */
    export class Task {
        private type: TaskType;
        private time: number;
        private nextTask: Task|null;
        /**
         * 
         * @param type Kiểu tác vụ
         * @param time Thời gian thực hiện
         * @param nextTask Tác vụ tiếp theo
         */
        constructor(type: TaskType, time: number, nextTask: Task|null) {
            this.type = type;
            this.time = time;
            this.nextTask = nextTask;
        }

        /**
         * Nối tác vụ tiếp theo vào tác vụ hiện tại
         * @param nextTask Tác vụ tiếp theo
         */
        public join(nextTask: Task): Task {
            this.nextTask = nextTask;
            return this.nextTask;
        }

        /**
         * Kiểm tra sự hoàn thành của tác vụ
         */
        public isFinished(): boolean {
            return this.time == 0;
        }
        /**
         * Kiểm tra sự hoàn thành của tiến trình
         */
        public isEnding(): boolean {
            return this.isFinished() && this.nextTask == null;
        }
        /**
         * Di chuyển đến tác vụ tiếp theo nếu có
         */
        public moveNext(): boolean {
            if (this.isFinished() && this.nextTask != null) {
                this.type = this.nextTask.type;
                this.time = this.nextTask.time;
                this.nextTask = this.nextTask.nextTask;
                return true;
            }
            return false;
        }
        /**
         * Trừ bớt một đơn vị thời gian trong hoạt động của tác vụ
         */
        public decreaseTime(){
            this.time--;
        }
        /**
         * Trả về chuỗi kiểu: <Kiểu>;<Thời gian>;
         */
        public toString():void{
            console.log(this.type+" ; "+this.time+" ; ");
        }
    }

    /**
     * Tiến trình
     */
    export class Process {
        private task:Task;
        private processName:string;
        /**
         * 
         * @param processName Tên tiến trình
         * @param task Tác vụ
         */
        constructor(processName:string,task:Task){
            this.processName = processName;
            this.task = task;
        }

        public getTask():Task{
            return this.task;
        }
        get ProcessName():string{
            return this.processName;
        }
        set ProcessName(proccessName:string){
            this.processName = proccessName;
        }
        /**
         * Kiểm tra sự hoàn thành của tiến trình
         */
        public isFinished():boolean{
            return this.task.isEnding();
        }
    }

    /**
     * Sự kiện xảy ra trong quá trình điều phối
     */
    export class StoryEvent{
        private time:number;
        private proccessName:string;
        private description:string;
        /**
         * 
         * @param time Thời gian xảy ra sự kiện
         * @param processName Tiến trình gây nên sự kiện
         * @param description Thông tin mô tả
         */
        constructor(time:number, processName:string, description:string){
            this.time=time;
            this.proccessName=processName;
            this.description = description;
        }

        get Time():number {
            return this.time;
        } 

        set Time(time:number){
            this.time = time;
        }

        get ProcessName():string{
            return this.proccessName;
        }
        set ProcessName(processName:string){
            this.proccessName = processName;
        }

        get Description():string{
            return this.description;
        }

        set Description(description: string){
            this.description = description;
        }

        public toString():string{
            return this.time+";"+this.proccessName+";"+this.description;
        }

    }

    /**
     * Chuỗi các sự kiện
     */
    export class Storyboard{
        private list:Array<StoryEvent>;

        constructor(){
            this.list = new Array<StoryEvent>();
        }

        get Story():Array<StoryEvent>{
            return this.list;
        }

        /**
         * Thêm sự kiện mới vào chuỗi các sự kiện
         * @param event Sự kiện mới
         */
        public addEvent(event:StoryEvent){
            this.list.push(event);
        }

    }

    /**
     * Hàng đợi
     */
    export class Queue<T>{
        private list:Array<T>;
        constructor(){
            this.list = new Array<T>();
        }
        /**
         * Nhét phần tử mới vào hàng đợi
         * @param element Phần tử cần nhét
         */
        public enQueue(element: T){
            this.list.push(element);
        }
        /**
         * Lấy phần tử đầu ra khỏi hàng đợi
         */
        public deQueue():T|undefined{
            return this.list.shift();
        }

        /**
         * Xem phần tử đầu tiên của hàng đợi nhưng không xóa khỏi hàng đợi
         */
        public viewTop():T|undefined{
            if(this.list.length!=0)
                return this.list[0];
            return undefined;
        }

    }

    export interface IScheduler{
        /**
         * Điều phối tiến trình
         */
        scheduling():void;
    }
    
    export abstract class Scheduler{
        private inputProcess:Array<Process>;

        constructor(){
            this.inputProcess = new Array<Process>();
        }
        get InputProcess():Array<Process>{
            return this.inputProcess;
        }
        set InputProcess(inputProcess: Array<Process>){
            this.inputProcess = inputProcess;
        }
    }

    /**
     * Điều phối tiến trình CPU theo cơ chế FCFS (First-Come-First-Serve). Tiến trình vào trước được xử lý trước
     */
    export class FcfsScheduler extends Scheduler implements IScheduler{
     

        /**
         * 
         * @param inputProcess Dãy các tiến trình đầu vào
         */
        constructor(inputProcess:Array<Process>){
            super();
            this.InputProcess = inputProcess;
        }
        
        /**
         * Điều phối FCFS
         */
        public scheduling():void{
            
            
        }
    }

}