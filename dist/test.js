"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Algorithms_1 = require("./Algorithms");
//Tạo chuỗi các tác vụ của tiến trình 1
var task_proc1 = new Algorithms_1.Algorithm.Task(Algorithms_1.Algorithm.TaskType.Arrive, 1, null);
task_proc1
    .join(new Algorithms_1.Algorithm.Task(Algorithms_1.Algorithm.TaskType.CPU, 4, null))
    .join(new Algorithms_1.Algorithm.Task(Algorithms_1.Algorithm.TaskType.IO, 2, null))
    .join(new Algorithms_1.Algorithm.Task(Algorithms_1.Algorithm.TaskType.CPU, 3, null));
//Tạo chuỗi các tác vụ của tiến trình 2
var task_proc2 = new Algorithms_1.Algorithm.Task(Algorithms_1.Algorithm.TaskType.Arrive, 0, null);
task_proc2
    .join(new Algorithms_1.Algorithm.Task(Algorithms_1.Algorithm.TaskType.CPU, 2, null))
    .join(new Algorithms_1.Algorithm.Task(Algorithms_1.Algorithm.TaskType.IO, 3, null))
    .join(new Algorithms_1.Algorithm.Task(Algorithms_1.Algorithm.TaskType.CPU, 5, null));
//Tạo các tiến trình
var proc1 = new Algorithms_1.Algorithm.Process("P1", task_proc1);
var proc2 = new Algorithms_1.Algorithm.Process("P2", task_proc2);
//Tạo danh sách các tiến trình
var procList = new Array(proc1, proc2);
//Chọn thuật toán điều phối
var scheduler = new Algorithms_1.Algorithm.FcfsScheduler(procList);
//Nhận kết quả trả về là một Storyboard
var story = scheduler.scheduling();
