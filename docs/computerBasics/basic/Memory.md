## Memory 内存

* CPU跟计算机的其他交互通过总线来完成 （IO总线、地址总线、数据总线、控制总线等）

* CPU跟内存 直接通过数据总线交互，为了能找到数据在内存中的地址 还需要地址总线

* IO总线（USB）、PCIE总线（显卡）

* 南桥芯片 跟 USB、硬盘、网卡、声卡、外设

  


> DMA 控制器芯片（直接内存访问控制器），集成在南桥上的一个芯片。
>
> DMA控制器 主要是避免 CPU由于读取数据多次中断，从而做了一个专门的硬件芯片来跟数据打交道。DMA 具有以下功能
>
> * 接受外设 发出 DMA请求，向 CPU 发出总线请求
> * 接收总线控制权 进入 DMA 操作周期
> * 规定数据的传送方向、发出读写控制信号， 执行数据传送操作。
> * 向CPU报告操作结束




## 线程 协程 异步

线程是 CPU 调度的最小单位。 

**IO 是磁盘读写、网络读取。IO很消耗时间**

:::tip
IO读取文件的过程是怎么样的。

======================================================================

文件读取的过程中，CPU不会去直接读取磁盘的文件。（读取文件是非常机械式的操作，
CPU这么宝贵的资源 不会去读取的。）而是通过 DMA，CPU 对 DMA 下达指令，通过DMA来
完成，DMA 告诉磁盘需要把文件读到内存中，然后读取完毕之后，磁盘告诉 DMA 读取完毕，在内存的
XXX地方。DMA 最后中断形式告诉 CPU 读取完成，CPU去内存中读取，拿到文件的内容。

**CPU下达指令之后，CPU就可以去完成其他的事情**

**注意：CPU将总线控制权交给DMA之后，并不是一直交给DMA，（因为如果读取的文件很大，那么DMA会一直占用总线的控制权，这是不合理的）**
**所以合理的做法是，总线的控制权会在 CPU 和 DMA直接进行切换**

=======================================================================
:::
**协程是编程语言级别的用户态，避免了用户态与内核态切换过程中的时间损耗**


## 虚拟内存

* 为什么需要虚拟内存？
* 虚拟内存的优点？






