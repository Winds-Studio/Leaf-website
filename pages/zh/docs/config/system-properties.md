# Leaf JVM 参数

## -DLeaf.library-download-repo

- 默认值：未设置

默认的 Maven 中心仓库在某些地区的下载速度非常慢。

使用此 JVM 参数可以为 SpigotLibraryLoader 或 PaperLibraryLoader 设置特定的镜像仓库，

例如你可以使用如下参数，将阿里云仓库设置为镜像仓库。

```
-DLeaf.library-download-repo=https://maven.aliyun.com/repository/public
```

## -DLeaf.enableFMA

- 默认值：`false`

是否使用 [融合乘加操作（FMA）](https://baike.baidu.com/item/%E4%B9%98%E7%A7%AF%E7%B4%AF%E5%8A%A0%E8%BF%90%E7%AE%97) 来加速某些数学计算。

需要 CPU 支持 FMA 指令集，否则将导致性能下降。

你可以使用 [CPU-Z](https://www.cpuid.com/softwares/cpu-z.html) 等工具检查你的机器是否支持 FMA 指令集。

## -DLeaf.native-transport-type

- 默认值：`epoll`

设置用于网络传输的网络 I/O 模型，需开启 server.properties 内的 `use-native-transport`。

如果指定的传输类型不可用，将会切换至可用的模型。

可选项：

- Linux: `io_uring`, `epoll`, `nio`
- MacOS: `kqueue`, `nio`
- Windows: 不可用

## 已弃用参数

### -DLeaf.nearestEntitySensorBucketCount

（仅存在于最新的 Leaf 1.21.1 和 1.21.3）

- 默认值：`10`

当实体数量达到 [桶排序（Bucket Sort）](https://oi-wiki.org/basic/bucket-sort) 的阈值时，将使用多少个桶进行排序。

建议此值设置为实体数量的平方根值。

### -DLeaf.nearestEntitySensorBucketSortThresholdRatio

（仅存在于最新的 Leaf 1.21.1 和 1.21.3）

- 默认值：`2.0`

此值控制桶排序阈值的比例。（阈值 = 上述桶数量 \* 比例）
