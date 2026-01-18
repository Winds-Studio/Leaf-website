# Leaf JVM Flags

## -DLeaf.library-download-repo

- default: not set

Download speed of default Maven Central repo is extremely slow in some regions.

Use this JVM flag to set a specific mirror repository for SpigotLibraryLoader or PaperLibraryLoader.

For example, use the flag below to define Aliyun's repository as the maven repository mirror, which can provide faster library download speed for servers in Chinese mainland.

```bash
-DLeaf.library-download-repo=https://maven.aliyun.com/repository/public
```

## -DLeaf.enableFMA

- default: `false`

Whether to use [Fused-Multiply-Add operations](https://en.wikipedia.org/wiki/Multiply%E2%80%93accumulate_operation) to accelerate some math calculations.

Requires a CPU which supports the FMA instruction set, otherwise it will be slower.

You can use tools like [CPU-Z](https://www.cpuid.com/softwares/cpu-z.html) to check whether your machine supports the FMA instruction set.

## -DLeaf.disable-vanilla-profiler

- default: `false`

Whether to disable Minecraft's built-in vanilla profiler to improve performance slightly.

It's recommended to disable it since it may waste performance in some scenarios, and you can use [Spark](https://spark.lucko.me/) as the profiling tool. Unless you want to profile your datapack functions.

Check Spark's documentation to learn:

- [How to use `/spark` command](https://spark.lucko.me/docs/Command-Usage)
- [How to find lag spikes using Spark](https://spark.lucko.me/docs/guides/Finding-lag-spikes).

## -DLeaf.enable-io-uring

- default: `false`

Whether to use io_uring for the I/O model used for network data transmission. Requires `use-native-transport` to be enabled and set `network-compression-threshold` to `-1` in `server.properties`.

If io_uring is unavailable under the current environment, it will fallback to an available model.

## -Dgale.log.warning.root

- default: `true`

Whether to print a warning message on the server start, if the server is running under the root user or privileged mode.

## -Dgale.log.warning.offline.mode

- default: `true`

Whether to print a warning message on the server start, if the server is running in offline mode (`online-mode` is `false` in `server.properties`).

## Deprecated Flags

### -DLeaf.native-transport-type

(This flag only exists in latest Leaf 1.21.8)

- default: `epoll`

Specifies the network I/O model to be used for data transmission. Requires `use-native-transport` to be enabled in `server.properties`.

If the specified transport type is unavailable, it will fallback to an available model.

Available options:

- Linux: `io_uring`, `epoll`, `nio`
- MacOS: `kqueue`, `nio`
- Windows: unavailable

### -DLeaf.nearestEntitySensorBucketCount

(This flag only exists in latest Leaf 1.21.1 and 1.21.3)

- default: `10`

How many buckets will be used if entity count reached the [Bucket Sort](https://en.wikipedia.org/wiki/Bucket_sort) threshold.

Should be the square root of entity count.

### -DLeaf.nearestEntitySensorBucketSortThresholdRatio

(This flag only exists in latest Leaf 1.21.1 and 1.21.3)

- default: `2.0`

This value controls the ratio of Bucket Sort threshold. `(Threshold = bucketCount * ratio)`
