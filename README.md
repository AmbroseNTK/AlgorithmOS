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
<h2>Đoạn code mẫu</h2>
Điều phối hỗn hợp CPU+IO 2 tiến trình như sau:

Process | Arrive time | CPU | IO | CPU
--- | --- | --- | --- | --- |
`P1` | 1 | 4 | 2 | 3
`P2` | 0 | 2 | 3 | 5

```typescript
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
```
**Tham khảo thêm trong tài liệu API**
