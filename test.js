"use strict";
exports.__esModule = true;
var Algorithms_1 = require("./Algorithms");
var procList = new Array();
var task_proc1 = new Algorithms_1.Algorithm.Task(Algorithms_1.Algorithm.TaskType.Arrive, 1, null);
task_proc1
    .join(new Algorithms_1.Algorithm.Task(Algorithms_1.Algorithm.TaskType.CPU, 4, null))
    .join(new Algorithms_1.Algorithm.Task(Algorithms_1.Algorithm.TaskType.IO, 2, null))
    .join(new Algorithms_1.Algorithm.Task(Algorithms_1.Algorithm.TaskType.CPU, 3, null));
console.log(task_proc1.logAll());
var proc1 = new Algorithms_1.Algorithm.Process("P1", task_proc1);
procList.push(proc1);
var FcfsScheduler = new Algorithms_1.Algorithm.FcfsScheduler(procList);
