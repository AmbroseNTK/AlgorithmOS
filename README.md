# AlgorithmOS
Các thuật toán về hệ điều hành</br>
Xem tài liệu tại: https://ambrosentk.github.io/AlgorithmOS/
</br>
NPM Package: https://www.npmjs.com/package/algorithmos
<h2>Giới thiệu</h2>
<p>Thư viện hiện thực các thuật toán được dùng trong hệ điều hành</br>
Gồm có các thuật toán sau:</br>

1. Điều phối hỗn hợp CPU+IO: FCFS, SJF, SRTF, Round Robin
2. *Lập lịch truy cập đĩa</br>
3. *Thay thế trang</br>
4. *Cấp phát bộ nhớ</br>
</p>
<h2>Hướng dẫn cài đặt</h2>
<p>B1: Cài đặt NodeJS</br>
B2: Trong command line nhập</br>

```batch
npm i algorithmos
```
</br>
B3: Bắt đầu import và sử dụng
</p>
<h2>Code mẫu</h2>
Điều phối hỗn hợp CPU+IO 2 tiến trình như sau và sử dụng chiến lược SJF với IO device riêng:

Process | Arrival time | CPU | IO | CPU
--- | --- | --- | --- | --- |
`P1` | 0 | 3 | 4 | 3
`P2` | 1 | 2 | 2 | 2
`P2` | 2 | 1 | 1 | 5

```typescript
import { Algorithm as al } from './Algorithms'

//Tạo hàng đợi các tiến trình theo yêu cầu

var taskQueue1 = new al.Queue<al.Task>();
taskQueue1.enQueue(new al.Task(al.TaskType.CPU, 3));
taskQueue1.enQueue(new al.Task(al.TaskType.IO, 4));
taskQueue1.enQueue(new al.Task(al.TaskType.CPU, 3));

var taskQueue2 = new al.Queue<al.Task>();
taskQueue2.enQueue(new al.Task(al.TaskType.CPU, 2));
taskQueue2.enQueue(new al.Task(al.TaskType.IO, 2));
taskQueue2.enQueue(new al.Task(al.TaskType.CPU, 2));

var taskQueue3 = new al.Queue<al.Task>();
taskQueue3.enQueue(new al.Task(al.TaskType.CPU, 1));
taskQueue3.enQueue(new al.Task(al.TaskType.IO, 1));
taskQueue3.enQueue(new al.Task(al.TaskType.CPU, 5));



//Tạo danh sách các tiến trình
var procList = new Array<al.Process>();
procList.push(new al.Process("P1", 0, taskQueue1));
procList.push(new al.Process("P2", 1, taskQueue2));
procList.push(new al.Process("P3", 2, taskQueue3));
//procList.push(new al.Process("P4", 3, taskQueue4));

//Chọn thuật toán điều phối
var scheduler = new al.SrtfScheduler(procList, 2);

//Chọn chế độ IO
scheduler.IOMode = al.IOType.Single;

//Nhận kết quả trả về là một Storyboard
var story: al.Storyboard = scheduler.scheduling();

console.log(story.Story.length);

story.Story.forEach((value: al.StoryEvent, index: number, array: al.StoryEvent[]) => {
    console.log("Time: " + value.Time + "; Proc: " + value.ProcessName + "; Task: ");
});

//In story ra màn hình
console.log();
```
Kết quả thực hiện thuật toán:</br>

```
29
Time: 0; Proc: P1; Task: Arrived
Time: 1; Proc: P1; Task: CPU
Time: 1; Proc: P2; Task: Arrived
Time: 2; Proc: P1; Task: CPU
Time: 2; Proc: P3; Task: Arrived
Time: 3; Proc: P1; Task: CPU
Time: 4; Proc: P1; Task: IO
Time: 4; Proc: P3; Task: CPU
Time: 5; Proc: P1; Task: IO
Time: 5; Proc: P3; Task: IO
Time: 5; Proc: P2; Task: CPU
Time: 6; Proc: P1; Task: IO
Time: 6; Proc: P2; Task: CPU
Time: 7; Proc: P1; Task: IO
Time: 7; Proc: P2; Task: IO
Time: 7; Proc: P3; Task: CPU
Time: 8; Proc: P2; Task: IO
Time: 8; Proc: P3; Task: CPU
Time: 9; Proc: P3; Task: CPU
Time: 10; Proc: P3; Task: CPU
Time: 11; Proc: P3; Task: CPU
Time: 11; Proc: P3; Task: Terminated
Time: 12; Proc: P2; Task: CPU
Time: 13; Proc: P2; Task: CPU
Time: 13; Proc: P2; Task: Terminated
Time: 14; Proc: P1; Task: CPU
Time: 15; Proc: P1; Task: CPU
Time: 16; Proc: P1; Task: CPU
Time: 16; Proc: P1; Task: Terminated
```

**Giải thích ý nghĩa**: Mỗi một dòng là một sự kiện trong quá trình điều phối. Mỗi dòng có thời gian xảy ra sự kiện (Time), Tiến trình gây nên sự kiện (Proc), Tác vụ được làm trong sự kiện đó (Task).


</br>

>Lưu ý: Thuật toán có thể bị sai trong một số trường hợp. Bạn nào có khả năng đóng góp, sửa lỗi thì chúng tôi chân thành cảm ơn.

Video hướng dẫn của giảng viên **Phan Đình Thế Huân - ĐH Hoa Sen**:</br>
[![Video Hướng dẫn]()](https://www.youtube.com/embed/tVitgUXpBik)

**Tham khảo thêm trong tài liệu API**

<h2>Tại sao có thư viện này</h2>
Thư viện này giúp mô phỏng các thuật toán được dùng trong hệ điều hành. Từ đó có cái nhìn chân thực và dễ hiểu về chúng.</br>Đây cũng là sản phẩm của nhóm 15 môn Lý thuyết Hệ điều hành, HK 17.2A, ĐH Hoa Sen.

