import { Algorithm } from './Algorithms';

var procList = new Array<Algorithm.Process>();

var task_proc1 = new Algorithm.Task(Algorithm.TaskType.Arrive,1,null);
task_proc1
    .join(new Algorithm.Task(Algorithm.TaskType.CPU,4,null))
    .join(new Algorithm.Task(Algorithm.TaskType.IO,2,null))
    .join(new Algorithm.Task(Algorithm.TaskType.CPU,3,null));

console.log(task_proc1.logAll());
var proc1=new Algorithm.Process("P1",task_proc1);
procList.push(proc1);

var FcfsScheduler = new Algorithm.FcfsScheduler(procList)