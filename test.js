"use strict";
exports.__esModule = true;
var Algorithms_1 = require("./dist/Algorithms");
//Tạo hàng đợi các tác vụ cho tiến trình
var taskQueue1 = new Algorithms_1.Algorithm.Queue();
taskQueue1.enQueue(new Algorithms_1.Algorithm.Task(Algorithms_1.Algorithm.TaskType.CPU, 2));
taskQueue1.enQueue(new Algorithms_1.Algorithm.Task(Algorithms_1.Algorithm.TaskType.IO, 1));
taskQueue1.enQueue(new Algorithms_1.Algorithm.Task(Algorithms_1.Algorithm.TaskType.CPU, 3));
var taskQueue2 = new Algorithms_1.Algorithm.Queue();
taskQueue2.enQueue(new Algorithms_1.Algorithm.Task(Algorithms_1.Algorithm.TaskType.CPU, 1));
taskQueue2.enQueue(new Algorithms_1.Algorithm.Task(Algorithms_1.Algorithm.TaskType.IO, 3));
taskQueue2.enQueue(new Algorithms_1.Algorithm.Task(Algorithms_1.Algorithm.TaskType.CPU, 2));
//Tạo danh sách các tiến trình
var procList = new Array();
procList.push(new Algorithms_1.Algorithm.Process("P1", 0, taskQueue1));
procList.push(new Algorithms_1.Algorithm.Process("P2", 1, taskQueue2));
//Chọn thuật toán điều phối
var scheduler = new Algorithms_1.Algorithm.FcfsScheduler(procList);
//Chọn kiểu thiết bị nhập xuất, mặc định là Multi
scheduler.IOMode = Algorithms_1.Algorithm.IOType.Single;
//Nhận kết quả trả về là một Storyboard
var story = scheduler.scheduling();
//In ra màn hình kết quả
story.Story.forEach(function (value, index, array) {
    console.log("Time: " + value.Time + "; Proc: " + value.ProcessName + "; Task: " + value.Description);
});
