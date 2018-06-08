export module Algorithm {

    /**
     * Các kiểu tác vụ trong một tiến trình
     */
    export enum TaskType {
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
        /**
         * Kiểu của tác vụ
         */
        private type: TaskType;
        /**
         * Nhu cầu của tác vụ
         */
        private duration: number;

        constructor(type: TaskType, duration: number) {
            this.type = type;
            this.duration = duration;
        }

        get Type(): TaskType {
            return this.type;
        }

        get Duration(): number {
            return this.duration;
        }

        /**
         * Thực hiện một đơn vị nhu cầu của tác vụ
         */
        public run(): void {
            this.duration--;
        }

        /**
         * Kiểm tra xem tác vụ đã hoàn thành chưa
         */
        public isFinished(): boolean {
            return this.duration == 0;
        }

    }

    /**
     * Tiến trình
     */
    export class Process {
        /**
         * Mã tiến trình duy nhất
         */
        private processID: string;
        /**
         * Hàng đợi các tác vụ. Trong tiến trình,  các tác vụ được lưu trữ lần lượt trong hàng đợi để chờ được thực thi.
         */
        private taskQueue: Queue<Task>;

        /**
         * Thời điểm tiến trình được đưa vào xử lý 
         */
        private arrivalTime: number;

        /**
         * Cờ báo thực thi IO
         */
        private ioFlag: boolean;

        constructor(processID: string, arrivalTime: number, taskQueue: Queue<Task>) {
            this.processID = processID;
            this.taskQueue = taskQueue;
            this.arrivalTime = arrivalTime;
            this.ioFlag = false;
        }

        get TaskQueue(): Queue<Task> {
            return this.taskQueue;
        }

        set TaskQueue(queue: Queue<Task>) {
            this.taskQueue = queue;
        }

        get ProcessID(): string {
            return this.processID;
        }

        set ProcessID(id: string) {
            this.processID = id;
        }

        get ArrivalTime(): number {
            return this.arrivalTime;
        }

        /**
         * Kiểm tra xem tất cả các tiến trình có hoàn thành hết chưa
         * @param processList Danh sách các tiến trình cần kiểm tra
         */
        static isAllFinished(processList: Process[]): boolean {
            for (let i = 0; i < processList.length; i++) {
                if (!processList[i].taskQueue.isEmpty())
                    return false;
            }
            return true;
        }

        /**
         * Lấy phần tử đầu tiên của hàng đợi dựa trên mã tiến trình
         * @param processList danh sách tiến trình cần tìm
         * @param queue hàng đợi tên của các tiến trình
         */
        static peekProcess(processList: Process[], queue: Queue<string>): Process | undefined {
            let name = queue.peek();
            if (name == undefined) {
                return undefined;
            }
            else {
                for (let i = 0; i < processList.length; i++) {
                    if (processList[i].ProcessID == name)
                        return processList[i];
                }
                return undefined;
            }

        }

        get IOFlag(): boolean {
            return this.ioFlag;
        }

        set IOFlag(flag: boolean) {
            this.ioFlag = flag;
        }

    }

    /**
     * Sự kiện xảy ra trong quá trình điều phối
     */
    export class StoryEvent {
        /**
         * Thời điểm sự kiện được kích hoạt
         */
        private time: number;
        /**
         * Tên tiến trình gây ra sự kiện
         */
        private proccessName: string;
        /**
         * Mô tả chi tiết
         */
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
        /**
         * Danh sách các sự kiện
         */
        private list: Array<StoryEvent>;

        /**
         * Bộ đếm thời gian các biến cố xảy ra
         */
        private clock: number;

        constructor() {
            this.list = new Array<StoryEvent>();
            this.clock = 0;
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

        /**
         * Thêm một sự kiện mới vào chuỗi sự kiện ngay tại thời điểm hiện tại
         * @param processName Tên tiến trình
         * @param description Mô tả
         */
        public putEvent(processName: string, description: string) {
            this.list.push(new StoryEvent(this.clock, processName, description));
        }

        /**
         * Tăng thời gian
         */
        public tick(): void {
            this.clock++;
        }

        get Clock(): number {
            return this.clock;
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
        public peek(): T | undefined {
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

        /**
         * Kiểm tra hàng đợi có rỗng hay không
         */
        public isEmpty(): boolean {
            return this.list.length == 0;
        }

        get List(): Array<T> {
            return this.list;
        }

        set List(list: Array<T>) {
            this.list = list;
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
        /**
         * Dãy các tiến trình cần điều phối
         */
        protected inputProcess: Array<Process>;
        /**
         * Kiểu của thiết bị nhập xuất (IO Device)
         */
        protected ioMode: IOType = IOType.Multi;

        constructor(inputProcess: Array<Process>) {
            this.inputProcess = inputProcess;
        }
        get InputProcess(): Array<Process> {
            return this.inputProcess;
        }
        set InputProcess(inputProcess: Array<Process>) {
            this.inputProcess = inputProcess;
        }

        get IOMode(): IOType {
            return this.ioMode;
        }
        set IOMode(ioMode: IOType) {
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
            let cpuQueue: Queue<string> = new Queue<string>();
            let ioQueue: Queue<string> = new Queue<string>();

            while (!Process.isAllFinished(this.inputProcess)) {
                for (let i = 0; i < this.inputProcess.length; i++) {
                    if (this.inputProcess[i].ArrivalTime == story.Clock) {
                        cpuQueue.enQueue(this.inputProcess[i].ProcessID);
                        story.putEvent(this.inputProcess[i].ProcessID, "[AT] Arrival");
                    }
                }

                if (!cpuQueue.isEmpty()) {
                    let proc = Process.peekProcess(this.inputProcess, cpuQueue);
                    if (proc != undefined) {
                        if (!proc.TaskQueue.isEmpty()) {
                            let task = proc.TaskQueue.peek();
                            if (task != undefined) {
                                if (task.Type == TaskType.CPU) {
                                    if (!task.isFinished()) {
                                        task.run();
                                        story.addEvent(new StoryEvent(story.Clock, proc.ProcessID, "[IN] CPU"));
                                    }
                                    if (task.isFinished()) {
                                        proc.TaskQueue.deQueue();
                                        cpuQueue.deQueue();
                                        if (this.ioMode == IOType.Multi) {
                                            proc.IOFlag = true;
                                        }
                                        else {
                                            ioQueue.enQueue(proc.ProcessID);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }


                if (this.ioMode == IOType.Multi) {
                    for (let i = 0; i < this.inputProcess.length; i++) {
                        if (this.inputProcess[i].IOFlag) {
                            if (!this.inputProcess[i].TaskQueue.isEmpty()) {
                                let task = this.inputProcess[i].TaskQueue.peek();
                                if (task != undefined) {
                                    if (!task.isFinished()) {
                                        task.run();
                                        story.addEvent(new StoryEvent(story.Clock + 1, this.inputProcess[i].ProcessID, "[IN] IO"));
                                    }
                                    else {
                                        this.inputProcess[i].TaskQueue.deQueue();
                                        this.inputProcess[i].IOFlag = false;
                                        cpuQueue.enQueue(this.inputProcess[i].ProcessID);
                                    }
                                }
                            }

                        }
                    }
                }
                else {
                    if (!ioQueue.isEmpty()) {
                        let proc = Process.peekProcess(this.inputProcess, ioQueue);
                        if (proc != undefined) {
                            if (!proc.TaskQueue.isEmpty()) {
                                let task = proc.TaskQueue.peek();
                                if (task != undefined) {
                                    if (!task.isFinished()) {
                                        task.run();
                                        story.addEvent(new StoryEvent(story.Clock + 1, proc.ProcessID, "[IN] IO"));
                                    }
                                    if (task.isFinished()) {
                                        proc.TaskQueue.deQueue();
                                        ioQueue.deQueue();
                                        cpuQueue.enQueue(proc.ProcessID);
                                    }
                                }
                            }
                        }
                    }
                }

                story.tick();
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

        private sortQueueExclusiveFirstElement(queue: Queue<string>): void {
            var temp = new Array<Process>();
            if (queue.getLength() > 2) {
                for (let i = 1; i < queue.getLength(); i++) {
                    var name = queue.List[i];
                    for (let j = 0; j < this.inputProcess.length; j++) {
                        if (this.inputProcess[j].ProcessID == name) {
                            temp.push(this.inputProcess[j]);
                        }
                    }

                }
            }
        }

    }

    /**
     * Điều phối CPU theo cơ chế SRTF (Shortest Remaining Time First). Tiến trình đang có yêu cầu CPU ít hơn sẽ giành quyền thực thi.
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