import { Algorithm as al } from './Algorithms'

//Tạo hàng đợi các tác vụ cho tiến trình

var taskQueue1 = new al.Queue<al.Task>();
taskQueue1.enQueue(new al.Task(al.TaskType.CPU, 2));
taskQueue1.enQueue(new al.Task(al.TaskType.IO, 1));
taskQueue1.enQueue(new al.Task(al.TaskType.CPU, 3));

var taskQueue2 = new al.Queue<al.Task>();
taskQueue2.enQueue(new al.Task(al.TaskType.CPU, 1));
taskQueue2.enQueue(new al.Task(al.TaskType.IO, 3));
taskQueue2.enQueue(new al.Task(al.TaskType.CPU, 2));


//Tạo danh sách các tiến trình
var procList = new Array<al.Process>();
procList.push(new al.Process("P1", 0, taskQueue1));
procList.push(new al.Process("P2", 1, taskQueue2));

//Chọn thuật toán điều phối
var scheduler = new al.FcfsScheduler(procList);

//Chọn kiểu thiết bị nhập xuất, mặc định là Multi
scheduler.IOMode = al.IOType.Single;

//Nhận kết quả trả về là một Storyboard
var story: al.Storyboard = scheduler.scheduling();

//In ra màn hình kết quả
story.Story.forEach((value: al.StoryEvent, index: number, array: al.StoryEvent[]) => {
    console.log("Time: " + value.Time + "; Proc: " + value.ProcessName + "; Task: " + value.Description);
});