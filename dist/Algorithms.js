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
        /**
         * Thực hiện một đơn vị nhu cầu của tác vụ
         */
        run() {
            this.duration--;
        }
        /**
         * Kiểm tra xem tác vụ đã hoàn thành chưa
         */
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
        /**
         * Kiểm tra xem tất cả các tiến trình có hoàn thành hết chưa
         * @param processList Danh sách các tiến trình cần kiểm tra
         */
        static isAllFinished(processList) {
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
        clone() {
            return new Process(this.processID, this.arrivalTime, this.taskQueue);
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
            this.endEvent = false;
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
        get EndEvent() {
            return this.endEvent;
        }
        set EndEvent(isEnd) {
            this.endEvent = isEnd;
        }
        toString() {
            var result = this.time + ";" + this.proccessName + ";" + this.description;
            if (this.endEvent) {
                result += " END";
            }
            return result;
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
        /**
         * Thêm một sự kiện mới vào chuỗi sự kiện ngay tại thời điểm hiện tại
         * @param processName Tên tiến trình
         * @param description Mô tả
         */
        putEvent(processName, description) {
            this.list.push(new StoryEvent(this.clock, processName, description));
        }
        /**
         * Tăng thời gian
         */
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
            if (this.list.length != 0) {
                return this.list[0];
            }
            return undefined;
        }
        /**
         * Lấy độ dài hàng đợi
         */
        getLength() {
            return this.list.length;
        }
        /**
         * Kiểm tra hàng đợi có rỗng hay không
         */
        isEmpty() {
            return this.list.length == 0;
        }
        get List() {
            return this.list;
        }
        set List(list) {
            this.list = list;
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
            this.preempty = false;
            this.interruptTime = 0;
            this.sortable = false;
            this.cpuQueue = new Queue();
            this.ioQueue = new Queue();
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
        /**
         * Bộ điều phối CPU IO chung
         * */
        scheduling() {
            var story = new Storyboard();
            this.cpuQueue = new Queue();
            this.ioQueue = new Queue();
            let cpuProcessing = false;
            let cpuRemaining = this.interruptTime;
            while (!Process.isAllFinished(this.inputProcess)) {
                for (let i = 0; i < this.inputProcess.length; i++) {
                    if (this.inputProcess[i].ArrivalTime == story.Clock) {
                        this.cpuQueue.enQueue(this.inputProcess[i].ProcessID);
                        story.putEvent(this.inputProcess[i].ProcessID, "Arrived");
                    }
                }
                if (this.ioMode == IOType.Multi) {
                    for (let i = 0; i < this.inputProcess.length; i++) {
                        let proc = this.inputProcess[i];
                        if (proc.TaskQueue.getLength() != 0 && proc.TaskQueue.peek().Type == TaskType.IO) {
                            if (!proc.TaskQueue.peek().isFinished()) {
                                story.addEvent(new StoryEvent(story.Clock + 1, proc.ProcessID, "IO"));
                                proc.TaskQueue.peek().run();
                            }
                            if (proc.TaskQueue.peek().isFinished()) {
                                proc.TaskQueue.deQueue();
                                proc.IOFlag = false;
                                if (proc.TaskQueue.getLength() != 0 && proc.TaskQueue.peek().Type == TaskType.CPU) {
                                    this.cpuQueue.enQueue(proc.ProcessID);
                                }
                            }
                        }
                    }
                }
                if (this.ioMode == IOType.Single) {
                    if (this.ioQueue.getLength() != 0) {
                        var proc = Process.peekProcess(this.inputProcess, this.ioQueue);
                        if (proc.TaskQueue.getLength() != 0 && proc.TaskQueue.peek().Type == TaskType.IO) {
                            if (!proc.TaskQueue.peek().isFinished()) {
                                story.addEvent(new StoryEvent(story.Clock + 1, proc.ProcessID, "IO"));
                                proc.TaskQueue.peek().run();
                            }
                            if (proc.TaskQueue.peek().isFinished()) {
                                proc.TaskQueue.deQueue();
                                this.ioQueue.deQueue();
                                if (proc.TaskQueue.getLength() != 0 && proc.TaskQueue.peek().Type == TaskType.CPU) {
                                    this.cpuQueue.enQueue(proc.ProcessID);
                                    if (!cpuProcessing && this.sortable) {
                                        this.minPreempting(this.inputProcess);
                                        cpuProcessing = true;
                                    }
                                }
                            }
                        }
                    }
                }
                if (this.preempty) {
                    this.minPreempting(this.inputProcess);
                }
                if (story.Clock == 0 && this.cpuQueue.getLength() > 1) {
                    this.minPreempting(this.inputProcess);
                }
                if (this.cpuQueue.getLength() != 0) {
                    let proc = Process.peekProcess(this.inputProcess, this.cpuQueue);
                    if (proc.TaskQueue.getLength() != 0 && proc.TaskQueue.peek().Type == TaskType.CPU) {
                        if (!proc.TaskQueue.peek().isFinished()) {
                            if (this.interruptTime == 0) {
                                story.addEvent(new StoryEvent(story.Clock + 1, proc.ProcessID, "CPU"));
                                proc.TaskQueue.peek().run();
                            }
                            else {
                                if (cpuRemaining > 0) {
                                    story.addEvent(new StoryEvent(story.Clock + 1, proc.ProcessID, "CPU"));
                                    proc.TaskQueue.peek().run();
                                    cpuRemaining--;
                                }
                            }
                        }
                        if (cpuRemaining == 0 && this.interruptTime != 0) {
                            if (!proc.TaskQueue.peek().isFinished()) {
                                this.cpuQueue.enQueue(this.cpuQueue.deQueue());
                            }
                            cpuRemaining = this.interruptTime;
                        }
                        if (proc.TaskQueue.peek().isFinished()) {
                            this.cpuQueue.deQueue();
                            proc.TaskQueue.deQueue();
                            cpuProcessing = false;
                            if (this.interruptTime > 0) {
                                cpuRemaining = this.interruptTime;
                            }
                            if (this.sortable) {
                                this.minPreempting(this.inputProcess);
                            }
                        }
                    }
                    else if (proc.TaskQueue.getLength() == 0) {
                        if (this.sortable) {
                            this.minPreempting(this.inputProcess);
                        }
                        cpuProcessing = false;
                    }
                    if (proc.TaskQueue.getLength() != 0 && proc.TaskQueue.peek().Type == TaskType.IO) {
                        if (this.ioMode == IOType.Multi) {
                            proc.IOFlag = true;
                        }
                        else {
                            this.ioQueue.enQueue(proc.ProcessID);
                        }
                        if (this.interruptTime > 0) {
                            cpuRemaining = this.interruptTime;
                        }
                    }
                    else if (proc.TaskQueue.getLength() == 0) {
                        story.addEvent(new StoryEvent(story.Clock + 1, proc.ProcessID, "Terminated"));
                        cpuProcessing = false;
                        if (this.sortable) {
                            this.minPreempting(this.inputProcess);
                        }
                    }
                }
                story.tick();
            }
            return story;
        }
        sortQueue(startPos, queue) {
            var temp = new Array();
            if (queue.getLength() > startPos) {
                for (let i = startPos; i < queue.getLength(); i++) {
                    var name = queue.List[i];
                    for (let j = 0; j < this.inputProcess.length; j++) {
                        if (this.inputProcess[j].ProcessID == name) {
                            temp.push(this.inputProcess[j]);
                        }
                    }
                }
                temp.sort((a, b) => {
                    let taskA = a.TaskQueue.peek();
                    let taskB = b.TaskQueue.peek();
                    if (taskA != undefined && taskB != undefined) {
                        if (taskA.Duration < taskB.Duration)
                            return -1;
                        else if (taskA.Duration > taskB.Duration)
                            return 1;
                    }
                    return 0;
                });
                let curr = 0;
                for (let i = startPos; i < queue.getLength(); i++) {
                    queue.List[i] = temp[curr].ProcessID;
                    curr++;
                }
            }
        }
        minPreempting(list) {
            let temp = new Array();
            let minPos = 0;
            if (this.cpuQueue.getLength() > 0) {
                for (let i = 0; i < this.cpuQueue.getLength(); i++) {
                    var name = this.cpuQueue.List[i];
                    for (let j = 0; j < this.inputProcess.length; j++) {
                        if (this.inputProcess[j].ProcessID == name) {
                            temp.push(this.inputProcess[j]);
                        }
                    }
                }
                for (let i = 1; i < this.cpuQueue.getLength(); i++) {
                    if (temp[i].TaskQueue.getLength() != 0 && temp[0].TaskQueue.getLength() != 0) {
                        if (temp[i].TaskQueue.peek().Duration < temp[0].TaskQueue.peek().Duration) {
                            minPos = i;
                        }
                    }
                }
            }
            if (minPos > 0) {
                this.cpuQueue = new Queue();
                for (let i = 1; i < temp.length; i++) {
                    if (i == minPos) {
                        this.cpuQueue.enQueue(temp[i].ProcessID);
                        break;
                    }
                }
                for (let i = 1; i < temp.length; i++) {
                    if (i != minPos) {
                        this.cpuQueue.enQueue(temp[i].ProcessID);
                    }
                }
                this.cpuQueue.enQueue(temp[0].ProcessID);
            }
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
            this.sortable = false;
            this.preempty = false;
            this.interruptTime = 0;
        }
        /**
         * Điều phối FCFS
         */
        scheduling() {
            return super.scheduling();
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
            this.preempty = false;
            this.sortable = true;
            this.interruptTime = 0;
        }
        /**
         * Điều phối SJF
         */
        scheduling() {
            return super.scheduling();
        }
    }
    Algorithm.SjfScheduler = SjfScheduler;
    /**
     * Điều phối CPU theo cơ chế SRTF (Shortest Remaining Time First). Tiến trình đang có yêu cầu CPU ít hơn sẽ giành quyền thực thi.
     */
    class SrtfScheduler extends Scheduler {
        /**
         *
         * @param inputProcess Dãy các tiến trình đầu vào
         */
        constructor(inputProcess) {
            super(inputProcess);
            this.preempty = true;
            this.sortable = false;
            this.interruptTime = 0;
        }
        /**
         * Điều phối SRTF
         * */
        scheduling() {
            return super.scheduling();
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
            this.interruptTime = quantum;
            this.sortable = false;
            this.preempty = false;
        }
        /**
         * Điều phối Round Robin
         */
        scheduling() {
            return super.scheduling();
        }
        get Quantum() {
            return this.quantum;
        }
        set Quantum(quantum) {
            this.quantum = quantum;
            this.interruptTime = quantum;
        }
    }
    Algorithm.RoundRobinScheduler = RoundRobinScheduler;
})(Algorithm = exports.Algorithm || (exports.Algorithm = {}));
