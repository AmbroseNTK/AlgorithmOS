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
        private nextTask: Task | null;
        private isFinished: boolean = false;
        private isArrived: boolean = false;
        /**
         * 
         * @param type Kiểu tác vụ
         * @param time Thời gian thực hiện
         * @param nextTask Tác vụ tiếp theo
         */
        constructor(type: TaskType, time: number, nextTask: Task | null) {
            this.type = type;
            this.time = time;
            this.nextTask = nextTask;
            this.isArrived = (this.time == 0 && this.type == TaskType.Arrive);

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
         * Sự hoàn thành của tác vụ
         */
        get IsFinished(): boolean {
            return this.isFinished || this.type == TaskType.Arrive;
        }
        /**
         * Kiểm tra sự hoàn thành của tiến trình
         */
        public isEnding(): boolean {
            return this.isFinished && this.nextTask == null;
        }
        /**
         * Di chuyển đến tác vụ tiếp theo nếu có
         */
        public moveNext(): boolean {
            if (this.IsFinished && this.nextTask != null) {
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
        public decreaseTime() {
            if (this.time == 0 || this.type == TaskType.Arrive) {
                this.isFinished = true;
            }
            else {
                this.time--;
            }
        }
        /**
         * Trả về chuỗi kiểu: <Kiểu>;<Thời gian>;
         */
        public toString(): void {
            console.log(this.type + " ; " + this.time + " ; ");
        }

        /**
         * Thời gian thực hiện một tác vụ. Đối với tác vụ kiểu Arrive thì đây là thời gian tiến trình bắt đầu chạy
         */
        get Time(): number {
            return this.time;
        }

        /**
         * Kiểu của tác vụ
         */
        get Type(): TaskType {
            return this.type;
        }

        get IsArrived(): boolean {
            return this.isArrived;
        }

        set IsArrived(arrived: boolean) {
            this.isArrived = arrived;
        }

        /**
         * Kiểm tra xem các tiến trình đã đến hay chưa
         * @param listProcs Dãy các tiến trình
         */
        static allArrived(listProcs: Process[]): boolean {
            listProcs.forEach((value: Process, index: number, array: Process[]) => {
                if (!value.getTask().IsArrived)
                    return false;
            });
            return true;
        }

        public logAll(): string {
            var result: string = "";
            var current: Task | null = new Task(this.Type, this.time, this.nextTask);
            while (current != null) {
                result += current.toString() + "\n";
                current = current.nextTask;
            }
            return result;
        }

    }

    /**
     * Tiến trình
     */
    export class Process {
        private task: Task;
        private processName: string;
        /**
         * 
         * @param processName Tên tiến trình
         * @param task Tác vụ
         */
        constructor(processName: string, task: Task) {
            this.processName = processName;
            this.task = task;
        }

        public getTask(): Task {
            return this.task;
        }
        get ProcessName(): string {
            return this.processName;
        }
        set ProcessName(proccessName: string) {
            this.processName = proccessName;
        }
        /**
         * Kiểm tra sự hoàn thành của tiến trình
         */
        public isFinished(): boolean {
            return this.task.isEnding();
        }
        /**
         * Kiểm tra các tiến trình có hoàn thành hết chưa
         * @param listProcs Dãy các tiến trình cần kiểm tra
         */
        public static allProcessFinished(listProcs: Process[]): boolean {
            listProcs.forEach((value: Process, index: number, array: Process[]) => {
                if (!value.isFinished())
                    return false;
            });
            return true;
        }

        /**
         * Kiểm tra tất cả các tiến trình đã bắt đầu hay chưa
         * @param listProcs Dãy các tiến trình cần kiểm tra
         */
        public static allProcessArrived(listProcs: Process[]): boolean {
            return Task.allArrived(listProcs);
        }
    }

    /**
     * Sự kiện xảy ra trong quá trình điều phối
     */
    export class StoryEvent {
        private time: number;
        private proccessName: string;
        private description: string;
        /**
         * 
         * @param time Thời gian xảy ra sự kiện
         * @param processName Tiến trình gây nên sự kiện
         * @param description Thông tin mô tả
         */
        constructor(time: number, processName: string, description: string) {
            this.time = time;
            this.proccessName = processName;
            this.description = description;
        }

        get Time(): number {
            return this.time;
        }

        set Time(time: number) {
            this.time = time;
        }

        get ProcessName(): string {
            return this.proccessName;
        }
        set ProcessName(processName: string) {
            this.proccessName = processName;
        }

        get Description(): string {
            return this.description;
        }

        set Description(description: string) {
            this.description = description;
        }

        public toString(): string {
            return this.time + ";" + this.proccessName + ";" + this.description;
        }


    }

    /**
     * Chuỗi các sự kiện
     */
    export class Storyboard {
        private list: Array<StoryEvent>;

        constructor() {
            this.list = new Array<StoryEvent>();
        }

        get Story(): Array<StoryEvent> {
            return this.list;
        }

        /**
         * Thêm sự kiện mới vào chuỗi các sự kiện
         * @param event Sự kiện mới
         */
        public addEvent(event: StoryEvent) {
            this.list.push(event);
        }

    }

    /**
     * Hàng đợi
     */
    export class Queue<T>{
        private list: Array<T>;
        constructor() {
            this.list = new Array<T>();
        }
        /**
         * Nhét phần tử mới vào hàng đợi
         * @param element Phần tử cần nhét
         */
        public enQueue(element: T) {
            this.list.push(element);
        }
        /**
         * Lấy phần tử đầu ra khỏi hàng đợi
         */
        public deQueue(): T | undefined {
            return this.list.shift();
        }

        /**
         * Xem phần tử đầu tiên của hàng đợi nhưng không xóa khỏi hàng đợi
         */
        public viewTop(): T | undefined {
            if (this.list.length != 0)
                return this.list[0];
            return undefined;
        }

        /**
         * Lấy độ dài hàng đợi
         */
        public getLength(): number {
            return this.list.length;
        }

    }

    export interface IScheduler {
        /**
         * Điều phối tiến trình
         */
        scheduling(): Storyboard;
    }

    /**
     * Bộ điều phối CPU
     */
    export abstract class Scheduler {
        private inputProcess: Array<Process>;
        /**
         * Kiểu của thiết bị nhập xuất (IO Device)
         */
        private ioMode: IOType = IOType.Multi;

        constructor(inputProcess: Array<Process>) {
            this.inputProcess = inputProcess;
        }
        get InputProcess(): Array<Process> {
            return this.inputProcess;
        }
        set InputProcess(inputProcess: Array<Process>) {
            this.inputProcess = inputProcess;
        }

        get IOMode():IOType{
            return this.ioMode;
        }
        set IOMode(ioMode:IOType){
            this.ioMode = ioMode;
        }
    }

    /**
     * Điều phối tiến trình CPU theo cơ chế FCFS (First-Come-First-Serve). Tiến trình vào trước được xử lý trước
     */
    export class FcfsScheduler extends Scheduler implements IScheduler {


        /**
         * 
         * @param inputProcess Dãy các tiến trình đầu vào
         */
        constructor(inputProcess: Array<Process>) {
            super(inputProcess);
        }

        /**
         * Điều phối FCFS
         */
        public scheduling(): Storyboard {
            let story = new Storyboard();
            let time: number = 0;
            let currentProcess: Process | undefined = undefined;
            //Hàng đợi thực hiện CPU
            let cpuQueue = new Queue<Process>();
            while (!Process.allProcessArrived(this.InputProcess)) {
                this.InputProcess.forEach((value: Process, index: number, array: Process[]) => {
                    let currentTask = value.getTask();
                    if (currentTask.Time == time) {
                        if (currentTask.Type == TaskType.Arrive) {
                            cpuQueue.enQueue(value);
                        }
                    }
                });
                if (cpuQueue.getLength() == 1) {
                    currentProcess = cpuQueue.deQueue();
                    if (currentProcess != undefined) {
                        currentProcess.getTask().moveNext();

                    }
                }
            }

            return story;
        }
    }

    /**
     * Điều phối CPU theo cơ chế SJF (Shortest Job First). Tiến trình yêu cầu ít CPU hơn thì được thực thi trước. Tiến trình đang chạy không bị cướp CPU.
     */
    export class SjfScheduler extends Scheduler implements IScheduler {

        /**
         * 
         * @param inputProcess Dãy các tiến trình đầu vào
         */
        constructor(inputProcess: Array<Process>) {
            super(inputProcess);
        }

        /**
         * Điều phối SJF
         */
        public scheduling(): Storyboard {
            var story = new Storyboard();

            return story;
        }

    }

    /**
     * Điều phối CPU theo cơ chế SRTF (Shortest Recent Time First). Tiến trình đang có yêu cầu CPU ít hơn sẽ giành quyền thực thi.
     */
    export class SrtfScheduler extends Scheduler implements IScheduler {

        /**
         * 
         * @param inputProcess Dãy các tiến trình đầu vào
         */
        constructor(inputProcess: Array<Process>) {
            super(inputProcess);
        }

        /**
         * Điều phối SRTF
         */
        public scheduling(): Storyboard {
            var story = new Storyboard();

            return story;
        }

    }

    /**
     * Điều phối CPU theo cơ chế Round Robin. Tiến trình vào hàng đợi trước thì được điều phối trước. Tuy nhiên chúng chỉ được chiếm CPU trong độ dài thời gian là Quantum.
     */
    export class RoundRobinScheduler extends Scheduler implements IScheduler {

        /**
         * Lát thời gian (Slice of time)
         */
        private quantum: number = 1;

        
        /**
         * 
         * @param inputProcess Dãy các tiến trình đầu vào
         * @param quantum lát thời gian
         */
        constructor(inputProcess: Array<Process>, quantum: number) {
            super(inputProcess);
            this.Quantum = quantum;
        }

        /**
         * Điều phối Round Robin
         */
        public scheduling(): Storyboard {
            var story = new Storyboard();

            return story;
        }

        get Quantum(): number {
            return this.quantum;
        }
        set Quantum(quantum: number) {
            this.quantum = quantum;
        }

    }

}