import { Algorithm} from './Algorithms';

//Tạo chuỗi các tác vụ của tiến trình 1
var task_proc1 = new Algorithm.Task(Algorithm.TaskType.Arrive,1,null);
task_proc1
    .join(new Algorithm.Task(Algorithm.TaskType.CPU,4,null))
    .join(new Algorithm.Task(Algorithm.TaskType.IO,2,null))
    .join(new Algorithm.Task(Algorithm.TaskType.CPU,3,null));

//Tạo chuỗi các tác vụ của tiến trình 2
var task_proc2 = new Algorithm.Task(Algorithm.TaskType.Arrive,0,null);
task_proc2
    .join(new Algorithm.Task(Algorithm.TaskType.CPU,2,null))
    .join(new Algorithm.Task(Algorithm.TaskType.IO,3,null))
    .join(new Algorithm.Task(Algorithm.TaskType.CPU,5,null));

//Tạo các tiến trình
var proc1=new Algorithm.Process("P1",task_proc1);
var proc2=new Algorithm.Process("P2",task_proc2);

//Tạo danh sách các tiến trình
var procList = new Array<Algorithm.Process>(proc1,proc2);

//Chọn thuật toán điều phối
var scheduler = new Algorithm.FcfsScheduler(procList);

//Nhận kết quả trả về là một Storyboard
var story:Algorithm.Storyboard = scheduler.scheduling();