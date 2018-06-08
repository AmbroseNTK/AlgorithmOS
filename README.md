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
Điều phối hỗn hợp CPU+IO 2 tiến trình như sau và sử dụng chiến lược FCFS với IO device chung:

Process | Arrive time | CPU | IO | CPU
--- | --- | --- | --- | --- |
`P1` | 1 | 2 | 1 | 3
`P2` | 0 | 1 | 3 | 2

```typescript
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
```
Kết quả thực hiện thuật toán:</br>

```
Time: 0; Proc: P1; Task: [AT] Arrival
Time: 0; Proc: P1; Task: [IN] CPU
Time: 1; Proc: P2; Task: [AT] Arrival
Time: 1; Proc: P1; Task: [IN] CPU
Time: 2; Proc: P1; Task: [IN] IO
Time: 2; Proc: P2; Task: [IN] CPU
Time: 3; Proc: P2; Task: [IN] IO
Time: 3; Proc: P1; Task: [IN] CPU
Time: 4; Proc: P2; Task: [IN] IO
Time: 4; Proc: P1; Task: [IN] CPU
Time: 5; Proc: P2; Task: [IN] IO
Time: 5; Proc: P1; Task: [IN] CPU
Time: 6; Proc: P2; Task: [IN] CPU
Time: 7; Proc: P2; Task: [IN] CPU
```

**Giải thích ý nghĩa**: Mỗi một dòng là một sự kiện trong quá trình điều phối. Mỗi dòng có thời gian xảy ra sự kiện (Time), Tiến trình gây nên sự kiện (Proc), Tác vụ được làm trong sự kiện đó (Task). [AT] nghĩa là tại một thời điểm xác định. [IN] nghĩa  là trong khoảng thời gian từ a đến b. VD: [IN] của 2 nghĩa là trong khoảng thời gian từ 2 đến 3.

**Tham khảo thêm trong tài liệu API**
