"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Algorithm;
(function (Algorithm) {
    /**
     * Các kiểu tác vụ trong một tiến trình
     */
    let TaskType;
    (function (TaskType) {
        /**
         * Tác vụ CPU
         */
        TaskType[TaskType["CPU"] = 0] = "CPU";
        /**
         * Tác vụ  IO
         */
        TaskType[TaskType["IO"] = 1] = "IO";
    })(TaskType = Algorithm.TaskType || (Algorithm.TaskType = {}));
    /**
     * Kiểu của IO
     */
    let IOType;
    (function (IOType) {
        /**
         * Chỉ có một thiết bị IO (IO chung)
         */
        IOType[IOType["Single"] = 0] = "Single";
        /**
         * Mỗi tiến trình có một thiết bị IO (IO riêng)
         */
        IOType[IOType["Multi"] = 1] = "Multi";
    })(IOType = Algorithm.IOType || (Algorithm.IOType = {}));
    /**
     * Tác vụ của tiến trình
     */
    class Task {
        constructor(type, duration) {
            this.type = type;
            this.duration = duration;
        }
        get Type() {
            return this.type;
        }
        get Duration() {
            return this.duration;
        }
        run() {
            this.duration--;
        }
        isFinished() {
            return this.duration == 0;
        }
    }
    Algorithm.Task = Task;
    /**
     * Tiến trình
     */
    class Process {
        constructor(processID, arrivalTime, taskQueue) {
            this.processID = processID;
            this.taskQueue = taskQueue;
            this.arrivalTime = arrivalTime;
            this.ioFlag = false;
        }
        get TaskQueue() {
            return this.taskQueue;
        }
        set TaskQueue(queue) {
            this.taskQueue = queue;
        }
        get ProcessID() {
            return this.processID;
        }
        set ProcessID(id) {
            this.processID = id;
        }
        get ArrivalTime() {
            return this.arrivalTime;
        }
        static isAllFinished(processList) {
            for (let i = 0; i < processList.length; i++) {
                if (!processList[i].taskQueue.isEmpty())
                    return false;
            }
            return true;
        }
        static peekProcess(processList, queue) {
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
        get IOFlag() {
            return this.ioFlag;
        }
        set IOFlag(flag) {
            this.ioFlag = flag;
        }
    }
    Algorithm.Process = Process;
    /**
     * Sự kiện xảy ra trong quá trình điều phối
     */
    class StoryEvent {
        /**
         *
         * @param time Thời gian xảy ra sự kiện
         * @param processName Tiến trình gây nên sự kiện
         * @param description Thông tin mô tả
         */
        constructor(time, processName, description) {
            this.time = time;
            this.proccessName = processName;
            this.description = description;
        }
        get Time() {
            return this.time;
        }
        set Time(time) {
            this.time = time;
        }
        get ProcessName() {
            return this.proccessName;
        }
        set ProcessName(processName) {
            this.proccessName = processName;
        }
        get Description() {
            return this.description;
        }
        set Description(description) {
            this.description = description;
        }
        toString() {
            return this.time + ";" + this.proccessName + ";" + this.description;
        }
    }
    Algorithm.StoryEvent = StoryEvent;
    /**
     * Chuỗi các sự kiện
     */
    class Storyboard {
        constructor() {
            this.list = new Array();
            this.clock = 0;
        }
        get Story() {
            return this.list;
        }
        /**
         * Thêm sự kiện mới vào chuỗi các sự kiện
         * @param event Sự kiện mới
         */
        addEvent(event) {
            this.list.push(event);
        }
        putEvent(processName, description) {
            this.list.push(new StoryEvent(this.clock, processName, description));
        }
        tick() {
            this.clock++;
        }
        get Clock() {
            return this.clock;
        }
    }
    Algorithm.Storyboard = Storyboard;
    /**
     * Hàng đợi
     */
    class Queue {
        constructor() {
            this.list = new Array();
        }
        /**
         * Nhét phần tử mới vào hàng đợi
         * @param element Phần tử cần nhét
         */
        enQueue(element) {
            this.list.push(element);
        }
        /**
         * Lấy phần tử đầu ra khỏi hàng đợi
         */
        deQueue() {
            return this.list.shift();
        }
        /**
         * Xem phần tử đầu tiên của hàng đợi nhưng không xóa khỏi hàng đợi
         */
        peek() {
            if (this.list.length != 0)
                return this.list[0];
            return undefined;
        }
        /**
         * Lấy độ dài hàng đợi
         */
        getLength() {
            return this.list.length;
        }
        isEmpty() {
            return this.list.length == 0;
        }
    }
    Algorithm.Queue = Queue;
    /**
     * Bộ điều phối CPU
     */
    class Scheduler {
        constructor(inputProcess) {
            /**
             * Kiểu của thiết bị nhập xuất (IO Device)
             */
            this.ioMode = IOType.Multi;
            this.inputProcess = inputProcess;
        }
        get InputProcess() {
            return this.inputProcess;
        }
        set InputProcess(inputProcess) {
            this.inputProcess = inputProcess;
        }
        get IOMode() {
            return this.ioMode;
        }
        set IOMode(ioMode) {
            this.ioMode = ioMode;
        }
    }
    Algorithm.Scheduler = Scheduler;
    /**
     * Điều phối tiến trình CPU theo cơ chế FCFS (First-Come-First-Serve). Tiến trình vào trước được xử lý trước
     */
    class FcfsScheduler extends Scheduler {
        /**
         *
         * @param inputProcess Dãy các tiến trình đầu vào
         */
        constructor(inputProcess) {
            super(inputProcess);
        }
        /**
         * Điều phối FCFS
         */
        scheduling() {
            let story = new Storyboard();
            let cpuQueue = new Queue();
            let ioQueue = new Queue();
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
    Algorithm.FcfsScheduler = FcfsScheduler;
    /**
     * Điều phối CPU theo cơ chế SJF (Shortest Job First). Tiến trình yêu cầu ít CPU hơn thì được thực thi trước. Tiến trình đang chạy không bị cướp CPU.
     */
    class SjfScheduler extends Scheduler {
        /**
         *
         * @param inputProcess Dãy các tiến trình đầu vào
         */
        constructor(inputProcess) {
            super(inputProcess);
        }
        /**
         * Điều phối SJF
         */
        scheduling() {
            var story = new Storyboard();
            return story;
        }
    }
    Algorithm.SjfScheduler = SjfScheduler;
    /**
     * Điều phối CPU theo cơ chế SRTF (Shortest Recent Time First). Tiến trình đang có yêu cầu CPU ít hơn sẽ giành quyền thực thi.
     */
    class SrtfScheduler extends Scheduler {
        /**
         *
         * @param inputProcess Dãy các tiến trình đầu vào
         */
        constructor(inputProcess) {
            super(inputProcess);
        }
        /**
         * Điều phối SRTF
         */
        scheduling() {
            var story = new Storyboard();
            return story;
        }
    }
    Algorithm.SrtfScheduler = SrtfScheduler;
    /**
     * Điều phối CPU theo cơ chế Round Robin. Tiến trình vào hàng đợi trước thì được điều phối trước. Tuy nhiên chúng chỉ được chiếm CPU trong độ dài thời gian là Quantum.
     */
    class RoundRobinScheduler extends Scheduler {
        /**
         *
         * @param inputProcess Dãy các tiến trình đầu vào
         * @param quantum lát thời gian
         */
        constructor(inputProcess, quantum) {
            super(inputProcess);
            /**
             * Lát thời gian (Slice of time)
             */
            this.quantum = 1;
            this.Quantum = quantum;
        }
        /**
         * Điều phối Round Robin
         */
        scheduling() {
            var story = new Storyboard();
            return story;
        }
        get Quantum() {
            return this.quantum;
        }
        set Quantum(quantum) {
            this.quantum = quantum;
        }
    }
    Algorithm.RoundRobinScheduler = RoundRobinScheduler;
})(Algorithm = exports.Algorithm || (exports.Algorithm = {}));
