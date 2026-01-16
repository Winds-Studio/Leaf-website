# Leaf JVM 参数

## -DLeaf.library-download-repo

- 默认值：未设置

默认的 Maven 中心仓库在某些地区的下载速度非常慢。

使用此 JVM 参数可以为 SpigotLibraryLoader 或 PaperLibraryLoader 设置特定的镜像仓库，

例如，使用下面的参数将阿里云仓库设置为 Maven 仓库镜像，这样可以为中国大陆地区的服务器提供更快的依赖下载速度

```bash
-DLeaf.library-download-repo=https://maven.aliyun.com/repository/public
```

## -DLeaf.enableFMA

- 默认值：`false`

是否使用 [融合乘加操作 (FMA)](https://baike.baidu.com/item/%E4%B9%98%E7%A7%AF%E7%B4%AF%E5%8A%A0%E8%BF%90%E7%AE%97) 来加速某些数学计算。

需要 CPU 支持 FMA 指令集，否则将导致性能下降。

你可以使用 [CPU-Z](https://www.cpuid.com/softwares/cpu-z.html) 等工具检查你的机器是否支持 FMA 指令集。

## -DLeaf.disable-vanilla-profiler

- 默认值：`false`

是否禁用 MC 内置的原版性能分析器，以略微提升性能。

建议使用此 Flag 禁用分析器，因为在某些场景下它可能会造成不必要的性能开销。

你可以使用 [Spark](https://spark.lucko.me/) 作为性能分析工具，除非你需要对你数据包的函数进行性能分析。

请查阅 Spark 的文档以了解：

- [如何使用 `/spark` 命令](https://spark.lucko.me/docs/Command-Usage)
- [如何用 Spark 找出 TPS 瞬卡来源](https://spark.lucko.me/docs/guides/Finding-lag-spikes).

## -DLeaf.enable-io-uring

- 默认值：`false`

是否使用 io_uring 作为用于网络数据传输的 I/O 模型。

需要在 `server.properties` 中开启 `use-native-transport`，并将 `network-compression-threshold` 设为 `-1`。

如果当前运行环境不支持 io_uring，将自动回退到可用的 I/O 模型。

## -Dgale.log.warning.root

- 默认值：`true`

当服务端以 root 用户或在特权模式下运行时，是否在开服时打印警告信息。

## -Dgale.log.warning.offline.mode

- 默认值：`true`

当服务端为离线模式时（`server.properties` 中的 `online-mode` 为 `false`）时，是否在开服时打印警告信息。

## 已弃用参数

### -DLeaf.native-transport-type

(仅存在于最新的 Leaf 1.21.8)

- 默认值：`epoll`

设置用于网络传输的网络 I/O 模型，需开启 `server.properties` 内的 `use-native-transport`.

如果指定的传输类型不可用，将会切换至可用的模型。

可选项：

- Linux: `io_uring`, `epoll`, `nio`
- MacOS: `kqueue`, `nio`
- Windows: 不可用 (默认 `nio`)

### -DLeaf.nearestEntitySensorBucketCount

(仅存在于最新的 Leaf 1.21.1 和 1.21.3)

- 默认值：`10`

当实体数量达到 [桶排序 (Bucket Sort)](https://oi-wiki.org/basic/bucket-sort) 的阈值时，将使用多少个桶进行排序。

建议此值设置为实体数量的平方根值。

### -DLeaf.nearestEntitySensorBucketSortThresholdRatio

(仅存在于最新的 Leaf 1.21.1 和 1.21.3)

- 默认值：`2.0`

此值控制桶排序阈值的比例。`(阈值 = 桶数量 * 比例)`
