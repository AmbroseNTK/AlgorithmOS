export declare module Algorithm {
    /**
     * Các kiểu tác vụ trong một tiến trình
     */
    enum TaskType {
        /**
         * Tác vụ CPU
         */
        CPU = 0,
        /**
         * Tác vụ  IO
         */
        IO = 1
    }
    /**
     * Kiểu của IO
     */
    enum IOType {
        /**
         * Chỉ có một thiết bị IO (IO chung)
         */
        Single = 0,
        /**
         * Mỗi tiến trình có một thiết bị IO (IO riêng)
         */
        Multi = 1
    }
    /**
     * Tác vụ của tiến trình
     */
    class Task {
        private type;
        private duration;
        constructor(type: TaskType, duration: number);
        readonly Type: TaskType;
        readonly Duration: number;
        run(): void;
        isFinished(): boolean;
    }
    /**
     * Tiến trình
     */
    class Process {
        private processID;
        private taskQueue;
        private arrivalTime;
        private ioFlag;
        constructor(processID: string, arrivalTime: number, taskQueue: Queue<Task>);
        TaskQueue: Queue<Task>;
        ProcessID: string;
        readonly ArrivalTime: number;
        static isAllFinished(processList: Process[]): boolean;
        static peekProcess(processList: Process[], queue: Queue<string>): Process | undefined;
        IOFlag: boolean;
    }
    /**
     * Sự kiện xảy ra trong quá trình điều phối
     */
    class StoryEvent {
        private time;
        private proccessName;
        private description;
        /**
         *
         * @param time Thời gian xảy ra sự kiện
         * @param processName Tiến trình gây nên sự kiện
         * @param description Thông tin mô tả
         */
        constructor(time: number, processName: string, description: string);
        Time: number;
        ProcessName: string;
        Description: string;
        toString(): string;
    }
    /**
     * Chuỗi các sự kiện
     */
    class Storyboard {
        private list;
        private clock;
        constructor();
        readonly Story: Array<StoryEvent>;
        /**
         * Thêm sự kiện mới vào chuỗi các sự kiện
         * @param event Sự kiện mới
         */
        addEvent(event: StoryEvent): void;
        putEvent(processName: string, description: string): void;
        tick(): void;
        readonly Clock: number;
    }
    /**
     * Hàng đợi
     */
    class Queue<T> {
        private list;
        constructor();
        /**
         * Nhét phần tử mới vào hàng đợi
         * @param element Phần tử cần nhét
         */
        enQueue(element: T): void;
        /**
         * Lấy phần tử đầu ra khỏi hàng đợi
         */
        deQueue(): T | undefined;
        /**
         * Xem phần tử đầu tiên của hàng đợi nhưng không xóa khỏi hàng đợi
         */
        peek(): T | undefined;
        /**
         * Lấy độ dài hàng đợi
         */
        getLength(): number;
        isEmpty(): boolean;
    }
    interface IScheduler {
        /**
         * Điều phối tiến trình
         */
        scheduling(): Storyboard;
    }
    /**
     * Bộ điều phối CPU
     */
    abstract class Scheduler {
        protected inputProcess: Array<Process>;
        /**
         * Kiểu của thiết bị nhập xuất (IO Device)
         */
        protected ioMode: IOType;
        constructor(inputProcess: Array<Process>);
        InputProcess: Array<Process>;
        IOMode: IOType;
    }
    /**
     * Điều phối tiến trình CPU theo cơ chế FCFS (First-Come-First-Serve). Tiến trình vào trước được xử lý trước
     */
    class FcfsScheduler extends Scheduler implements IScheduler {
        /**
         *
         * @param inputProcess Dãy các tiến trình đầu vào
         */
        constructor(inputProcess: Array<Process>);
        /**
         * Điều phối FCFS
         */
        scheduling(): Storyboard;
    }
    /**
     * Điều phối CPU theo cơ chế SJF (Shortest Job First). Tiến trình yêu cầu ít CPU hơn thì được thực thi trước. Tiến trình đang chạy không bị cướp CPU.
     */
    class SjfScheduler extends Scheduler implements IScheduler {
        /**
         *
         * @param inputProcess Dãy các tiến trình đầu vào
         */
        constructor(inputProcess: Array<Process>);
        /**
         * Điều phối SJF
         */
        scheduling(): Storyboard;
    }
    /**
     * Điều phối CPU theo cơ chế SRTF (Shortest Recent Time First). Tiến trình đang có yêu cầu CPU ít hơn sẽ giành quyền thực thi.
     */
    class SrtfScheduler extends Scheduler implements IScheduler {
        /**
         *
         * @param inputProcess Dãy các tiến trình đầu vào
         */
        constructor(inputProcess: Array<Process>);
        /**
         * Điều phối SRTF
         */
        scheduling(): Storyboard;
    }
    /**
     * Điều phối CPU theo cơ chế Round Robin. Tiến trình vào hàng đợi trước thì được điều phối trước. Tuy nhiên chúng chỉ được chiếm CPU trong độ dài thời gian là Quantum.
     */
    class RoundRobinScheduler extends Scheduler implements IScheduler {
        /**
         * Lát thời gian (Slice of time)
         */
        private quantum;
        /**
         *
         * @param inputProcess Dãy các tiến trình đầu vào
         * @param quantum lát thời gian
         */
        constructor(inputProcess: Array<Process>, quantum: number);
        /**
         * Điều phối Round Robin
         */
        scheduling(): Storyboard;
        Quantum: number;
    }
}
