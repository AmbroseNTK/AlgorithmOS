"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Algorithm;
(function (Algorithm) {
    /**
     * Các kiểu tác vụ trong một tiến trình
     */
    var TaskType;
    (function (TaskType) {
        /**
         * Tác vụ đến
         */
        TaskType[TaskType["Arrive"] = 0] = "Arrive";
        /**
         * Tác vụ CPU
         */
        TaskType[TaskType["CPU"] = 1] = "CPU";
        /**
         * Tác vụ  IO
         */
        TaskType[TaskType["IO"] = 2] = "IO";
    })(TaskType = Algorithm.TaskType || (Algorithm.TaskType = {}));
    /**
     * Kiểu của IO
     */
    var IOType;
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
    var Task = /** @class */ (function () {
        /**
         *
         * @param type Kiểu tác vụ
         * @param time Thời gian thực hiện
         * @param nextTask Tác vụ tiếp theo
         */
        function Task(type, time, nextTask) {
            this.isFinished = false;
            this.isArrived = false;
            this.type = type;
            this.time = time;
            this.nextTask = nextTask;
            this.isArrived = (this.time == 0 && this.type == TaskType.Arrive);
        }
        /**
         * Nối tác vụ tiếp theo vào tác vụ hiện tại
         * @param nextTask Tác vụ tiếp theo
         */
        Task.prototype.join = function (nextTask) {
            this.nextTask = nextTask;
            return this.nextTask;
        };
        Object.defineProperty(Task.prototype, "IsFinished", {
            /**
             * Sự hoàn thành của tác vụ
             */
            get: function () {
                return this.isFinished || this.type == TaskType.Arrive;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Kiểm tra sự hoàn thành của tiến trình
         */
        Task.prototype.isEnding = function () {
            return this.isFinished && this.nextTask == null;
        };
        /**
         * Di chuyển đến tác vụ tiếp theo nếu có
         */
        Task.prototype.moveNext = function () {
            if (this.IsFinished && this.nextTask != null) {
                this.type = this.nextTask.type;
                this.time = this.nextTask.time;
                this.nextTask = this.nextTask.nextTask;
                return true;
            }
            return false;
        };
        /**
         * Trừ bớt một đơn vị thời gian trong hoạt động của tác vụ
         */
        Task.prototype.decreaseTime = function () {
            if (this.time == 0 || this.type == TaskType.Arrive) {
                this.isFinished = true;
            }
            else {
                this.time--;
            }
        };
        /**
         * Trả về chuỗi kiểu: <Kiểu>;<Thời gian>;
         */
        Task.prototype.toString = function () {
            console.log(this.type + " ; " + this.time + " ; ");
        };
        Object.defineProperty(Task.prototype, "Time", {
            /**
             * Thời gian thực hiện một tác vụ. Đối với tác vụ kiểu Arrive thì đây là thời gian tiến trình bắt đầu chạy
             */
            get: function () {
                return this.time;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Task.prototype, "Type", {
            /**
             * Kiểu của tác vụ
             */
            get: function () {
                return this.type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Task.prototype, "IsArrived", {
            get: function () {
                return this.isArrived;
            },
            set: function (arrived) {
                this.isArrived = arrived;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Kiểm tra xem các tiến trình đã đến hay chưa
         * @param listProcs Dãy các tiến trình
         */
        Task.allArrived = function (listProcs) {
            listProcs.forEach(function (value, index, array) {
                if (!value.getTask().IsArrived)
                    return false;
            });
            return true;
        };
        Task.prototype.logAll = function () {
            var result = "";
            var current = new Task(this.Type, this.time, this.nextTask);
            while (current != null) {
                result += current.toString() + "\n";
                current = current.nextTask;
            }
            return result;
        };
        return Task;
    }());
    Algorithm.Task = Task;
    /**
     * Tiến trình
     */
    var Process = /** @class */ (function () {
        /**
         *
         * @param processName Tên tiến trình
         * @param task Tác vụ
         */
        function Process(processName, task) {
            this.processName = processName;
            this.task = task;
        }
        Process.prototype.getTask = function () {
            return this.task;
        };
        Object.defineProperty(Process.prototype, "ProcessName", {
            get: function () {
                return this.processName;
            },
            set: function (proccessName) {
                this.processName = proccessName;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Kiểm tra sự hoàn thành của tiến trình
         */
        Process.prototype.isFinished = function () {
            return this.task.isEnding();
        };
        /**
         * Kiểm tra các tiến trình có hoàn thành hết chưa
         * @param listProcs Dãy các tiến trình cần kiểm tra
         */
        Process.allProcessFinished = function (listProcs) {
            listProcs.forEach(function (value, index, array) {
                if (!value.isFinished())
                    return false;
            });
            return true;
        };
        /**
         * Kiểm tra tất cả các tiến trình đã bắt đầu hay chưa
         * @param listProcs Dãy các tiến trình cần kiểm tra
         */
        Process.allProcessArrived = function (listProcs) {
            return Task.allArrived(listProcs);
        };
        return Process;
    }());
    Algorithm.Process = Process;
    /**
     * Sự kiện xảy ra trong quá trình điều phối
     */
    var StoryEvent = /** @class */ (function () {
        /**
         *
         * @param time Thời gian xảy ra sự kiện
         * @param processName Tiến trình gây nên sự kiện
         * @param description Thông tin mô tả
         */
        function StoryEvent(time, processName, description) {
            this.time = time;
            this.proccessName = processName;
            this.description = description;
        }
        Object.defineProperty(StoryEvent.prototype, "Time", {
            get: function () {
                return this.time;
            },
            set: function (time) {
                this.time = time;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StoryEvent.prototype, "ProcessName", {
            get: function () {
                return this.proccessName;
            },
            set: function (processName) {
                this.proccessName = processName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StoryEvent.prototype, "Description", {
            get: function () {
                return this.description;
            },
            set: function (description) {
                this.description = description;
            },
            enumerable: true,
            configurable: true
        });
        StoryEvent.prototype.toString = function () {
            return this.time + ";" + this.proccessName + ";" + this.description;
        };
        return StoryEvent;
    }());
    Algorithm.StoryEvent = StoryEvent;
    /**
     * Chuỗi các sự kiện
     */
    var Storyboard = /** @class */ (function () {
        function Storyboard() {
            this.list = new Array();
        }
        Object.defineProperty(Storyboard.prototype, "Story", {
            get: function () {
                return this.list;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Thêm sự kiện mới vào chuỗi các sự kiện
         * @param event Sự kiện mới
         */
        Storyboard.prototype.addEvent = function (event) {
            this.list.push(event);
        };
        return Storyboard;
    }());
    Algorithm.Storyboard = Storyboard;
    /**
     * Hàng đợi
     */
    var Queue = /** @class */ (function () {
        function Queue() {
            this.list = new Array();
        }
        /**
         * Nhét phần tử mới vào hàng đợi
         * @param element Phần tử cần nhét
         */
        Queue.prototype.enQueue = function (element) {
            this.list.push(element);
        };
        /**
         * Lấy phần tử đầu ra khỏi hàng đợi
         */
        Queue.prototype.deQueue = function () {
            return this.list.shift();
        };
        /**
         * Xem phần tử đầu tiên của hàng đợi nhưng không xóa khỏi hàng đợi
         */
        Queue.prototype.viewTop = function () {
            if (this.list.length != 0)
                return this.list[0];
            return undefined;
        };
        /**
         * Lấy độ dài hàng đợi
         */
        Queue.prototype.getLength = function () {
            return this.list.length;
        };
        return Queue;
    }());
    Algorithm.Queue = Queue;
    var Scheduler = /** @class */ (function () {
        function Scheduler(inputProcess) {
            this.inputProcess = inputProcess;
        }
        Object.defineProperty(Scheduler.prototype, "InputProcess", {
            get: function () {
                return this.inputProcess;
            },
            set: function (inputProcess) {
                this.inputProcess = inputProcess;
            },
            enumerable: true,
            configurable: true
        });
        return Scheduler;
    }());
    Algorithm.Scheduler = Scheduler;
    /**
     * Điều phối tiến trình CPU theo cơ chế FCFS (First-Come-First-Serve). Tiến trình vào trước được xử lý trước
     */
    var FcfsScheduler = /** @class */ (function (_super) {
        __extends(FcfsScheduler, _super);
        /**
         *
         * @param inputProcess Dãy các tiến trình đầu vào
         */
        function FcfsScheduler(inputProcess) {
            return _super.call(this, inputProcess) || this;
        }
        /**
         * Điều phối FCFS
         */
        FcfsScheduler.prototype.scheduling = function () {
            var story = new Storyboard();
            var time = 0;
            var currentProcess = undefined;
            //Hàng đợi thực hiện CPU
            var cpuQueue = new Queue();
            while (!Process.allProcessArrived(this.InputProcess)) {
                this.InputProcess.forEach(function (value, index, array) {
                    var currentTask = value.getTask();
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
        };
        FcfsScheduler.prototype.doCPU = function (proc) {
        };
        FcfsScheduler.prototype.doIO = function (proc) {
        };
        return FcfsScheduler;
    }(Scheduler));
    Algorithm.FcfsScheduler = FcfsScheduler;
})(Algorithm = exports.Algorithm || (exports.Algorithm = {}));
