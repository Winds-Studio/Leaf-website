# Leaf System Properties

### -DLeaf.library-download-repo

- **Default Value:** Not set

  The default Maven Central Repository can be slow to download from in some regions.

  Use this JVM parameter to set a specific mirror repository for SpigotLibraryLoader or PaperLibraryLoader.

  For example, you can set Alibaba Cloud as the mirror repository with the following parameter:

  ```
  -DLeaf.library-download-repo=https://maven.aliyun.com/repository/public
  ```

### -DLeaf.nearestEntitySensorBucketCount

- **Default Value:** 10

  This specifies how many buckets to use for sorting when the number of entities reaches the threshold for [Bucket Sort](https://oi-wiki.org/basic/bucket-sort).

  It is recommended to set this value to the square root of the number of entities.

### -DLeaf.nearestEntitySensorBucketSortThresholdRatio

- **Default Value:** 2.0

  This value controls the ratio for the bucket sort threshold. `(Threshold = Number of Buckets * Ratio)`

### -DLeaf.enableFMA

- **Default Value:** false

  This parameter determines whether to use [Fused Multiply-Add (FMA)](https://baike.baidu.com/item/%E4%B9%98%E7%A7%AF%E7%B4%AF%E5%8A%A0%E8%BF%90%E7%AE%97) to accelerate certain mathematical calculations.

  FMA requires CPU support for the FMA instruction set; otherwise, it may lead to a decrease in performance.

  You can use tools like [CPU-Z](https://www.cpuid.com/softwares/cpu-z.html) to check if your machine supports the FMA instruction set.
