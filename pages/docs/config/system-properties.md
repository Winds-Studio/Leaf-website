# Leaf JVM Flags

## -DLeaf.library-download-repo

- default: not set

Download speed of default Maven Central repo is extremely slow in some regions.

Use this JVM flag to set a specific mirror repository for SpigotLibraryLoader or PaperLibraryLoader.

For example, use the flag below to define Aliyun's repo as the mirror repo.

```
-DLeaf.library-download-repo=https://maven.aliyun.com/repository/public
```

## -DLeaf.enableFMA

- default: `false`

Whether to use [Fused-Multiply-Add operations](https://en.wikipedia.org/wiki/Multiply%E2%80%93accumulate_operation) to accelerate some math calculations.

Requires a CPU which supports the FMA instruction set, otherwise it will be slower.

You can use tools like [CPU-Z](https://www.cpuid.com/softwares/cpu-z.html) to check whether your machine supports the FMA instruction set.

## -DLeaf.native-transport-type

- default: `epoll`

Specifies the network I/O model to be used for data transmission. Requires `use-native-transport` to be enabled in server.properties.

If the specified transport type is unavailable, it will fallback to an available model.

Available options:

- Linux: `io_uring`, `epoll`, `nio`
- MacOS: `kqueue`, `nio`
- Windows: unavailable

## Deprecated Flags

## -DLeaf.nearestEntitySensorBucketCount

(This flag only exists in latest Leaf 1.21.1 and 1.21.3)

- default: `10`

How many buckets will be used if entity count reached the [Bucket Sort](https://en.wikipedia.org/wiki/Bucket_sort) threshold.

Should be the square root of entity count.

## -DLeaf.nearestEntitySensorBucketSortThresholdRatio

(This flag only exists in latest Leaf 1.21.1 and 1.21.3)

- default: `2.0`

This value controls the ratio of Bucket Sort threshold. `(Threshold = bucketCount * ratio)`
