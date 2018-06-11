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
        /**
         * Kiểu của tác vụ
         */
        private type;
        /**
         * Nhu cầu của tác vụ
         */
        private duration;
        constructor(type: TaskType, duration: number);
        readonly Type: TaskType;
        readonly Duration: number;
        /**
         * Thực hiện một đơn vị nhu cầu của tác vụ
         */
        run(): void;
        /**
         * Kiểm tra xem tác vụ đã hoàn thành chưa
         */
        isFinished(): boolean;
    }
    /**
     * Tiến trình
     */
    class Process {
        /**
         * Mã tiến trình duy nhất
         */
        private processID;
        /**
         * Hàng đợi các tác vụ. Trong tiến trình,  các tác vụ được lưu trữ lần lượt trong hàng đợi để chờ được thực thi.
         */
        private taskQueue;
        /**
         * Thời điểm tiến trình được đưa vào xử lý
         */
        private arrivalTime;
        /**
         * Cờ báo thực thi IO
         */
        private ioFlag;
        constructor(processID: string, arrivalTime: number, taskQueue: Queue<Task>);
        TaskQueue: Queue<Task>;
        ProcessID: string;
        readonly ArrivalTime: number;
        /**
         * Kiểm tra xem tất cả các tiến trình có hoàn thành hết chưa
         * @param processList Danh sách các tiến trình cần kiểm tra
         */
        static isAllFinished(processList: Process[]): boolean;
        /**
         * Lấy phần tử đầu tiên của hàng đợi dựa trên mã tiến trình
         * @param processList danh sách tiến trình cần tìm
         * @param queue hàng đợi tên của các tiến trình
         */
        static peekProcess(processList: Process[], queue: Queue<string>): Process | undefined;
        IOFlag: boolean;
        clone(): Process;
    }
    /**
     * Sự kiện xảy ra trong quá trình điều phối
     */
    class StoryEvent {
        /**
         * Thời điểm sự kiện được kích hoạt
         */
        private time;
        /**
         * Tên tiến trình gây ra sự kiện
         */
        private proccessName;
        /**
         * Mô tả chi tiết
         */
        private description;
        endEvent: boolean;
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
        EndEvent: boolean;
        toString(): string;
    }
    /**
     * Chuỗi các sự kiện
     */
    class Storyboard {
        /**
         * Danh sách các sự kiện
         */
        private list;
        /**
         * Bộ đếm thời gian các biến cố xảy ra
         */
        private clock;
        constructor();
        readonly Story: Array<StoryEvent>;
        /**
         * Thêm sự kiện mới vào chuỗi các sự kiện
         * @param event Sự kiện mới
         */
        addEvent(event: StoryEvent): void;
        /**
         * Thêm một sự kiện mới vào chuỗi sự kiện ngay tại thời điểm hiện tại
         * @param processName Tên tiến trình
         * @param description Mô tả
         */
        putEvent(processName: string, description: string): void;
        /**
         * Tăng thời gian
         */
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
        /**
         * Kiểm tra hàng đợi có rỗng hay không
         */
        isEmpty(): boolean;
        List: Array<T>;
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
    abstract class Scheduler implements IScheduler {
        /**
         * Dãy các tiến trình cần điều phối
         */
        protected inputProcess: Array<Process>;
        /**
         * Kiểu của thiết bị nhập xuất (IO Device)
         */
        protected ioMode: IOType;
        protected preempty: boolean;
        protected interruptTime: number;
        protected sortable: boolean;
        private cpuQueue;
        private ioQueue;
        constructor(inputProcess: Array<Process>);
        InputProcess: Array<Process>;
        IOMode: IOType;
        /**
         * Bộ điều phối CPU IO chung
         * */
        scheduling(): Storyboard;
        private sortQueue;
        private minPreempting;
    }
    /**
     * Điều phối tiến trình CPU theo cơ chế FCFS (First-Come-First-Serve). Tiến trình vào trước được xử lý trước
     */
    class FcfsScheduler extends Scheduler {
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
    class SjfScheduler extends Scheduler {
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
     * Điều phối CPU theo cơ chế SRTF (Shortest Remaining Time First). Tiến trình đang có yêu cầu CPU ít hơn sẽ giành quyền thực thi.
     */
    class SrtfScheduler extends Scheduler {
        /**
         *
         * @param inputProcess Dãy các tiến trình đầu vào
         */
        constructor(inputProcess: Array<Process>);
        /**
         * Điều phối SRTF
         * */
        scheduling(): Storyboard;
    }
    /**
     * Điều phối CPU theo cơ chế Round Robin. Tiến trình vào hàng đợi trước thì được điều phối trước. Tuy nhiên chúng chỉ được chiếm CPU trong độ dài thời gian là Quantum.
     */
    class RoundRobinScheduler extends Scheduler {
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
