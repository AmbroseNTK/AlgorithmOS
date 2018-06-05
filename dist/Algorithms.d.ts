export declare module Algorithm {
    /**
     * Các kiểu tác vụ trong một tiến trình
     */
    enum TaskType {
        Arrive = 0,
        CPU = 1,
        IO = 2
    }
    /**
     * Kiểu của IO
     */
    enum IOType {
        Single = 0,
        Multi = 1
    }
    /**
     * Tác vụ của tiến trình
     */
    class Task {
        private type;
        private time;
        private nextTask;
        /**
         *
         * @param type Kiểu tác vụ
         * @param time Thời gian thực hiện
         * @param nextTask Tác vụ tiếp theo
         */
        constructor(type: TaskType, time: number, nextTask: Task | null);
        /**
         * Nối tác vụ tiếp theo vào tác vụ hiện tại
         * @param nextTask Tác vụ tiếp theo
         */
        join(nextTask: Task): Task;
        /**
         * Kiểm tra sự hoàn thành của tác vụ
         */
        isFinished(): boolean;
        /**
         * Kiểm tra sự hoàn thành của tiến trình
         */
        isEnding(): boolean;
        /**
         * Di chuyển đến tác vụ tiếp theo nếu có
         */
        moveNext(): boolean;
        /**
         * Trừ bớt một đơn vị thời gian trong hoạt động của tác vụ
         */
        decreaseTime(): void;
        /**
         * Trả về chuỗi kiểu: <Kiểu>;<Thời gian>;
         */
        toString(): void;
    }
    /**
     * Tiến trình
     */
    class Process {
        private task;
        private processName;
        /**
         *
         * @param processName Tên tiến trình
         * @param task Tác vụ
         */
        constructor(processName: string, task: Task);
        getTask(): Task;
        ProcessName: string;
        /**
         * Kiểm tra sự hoàn thành của tiến trình
         */
        isFinished(): boolean;
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
        constructor();
        readonly Story: Array<StoryEvent>;
        /**
         * Thêm sự kiện mới vào chuỗi các sự kiện
         * @param event Sự kiện mới
         */
        addEvent(event: StoryEvent): void;
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
        viewTop(): T | undefined;
    }
    interface IScheduler {
        /**
         * Điều phối tiến trình
         */
        scheduling(): void;
    }
    abstract class Scheduler {
        private inputProcess;
        constructor();
        InputProcess: Array<Process>;
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
        scheduling(): void;
    }
}
