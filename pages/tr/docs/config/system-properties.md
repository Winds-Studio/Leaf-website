# Leaf JVM Bayrakları

## -DLeaf.library-download-repo
* varsayılan: ayarlanmamış

Bazı bölgelerde varsayılan Maven Central deposunun indirme hızı oldukça yavaştır.

SpigotLibraryLoader veya PaperLibraryLoader için belirli bir yansı deposunu ayarlamak için bu JVM bayrağını kullanın.

Örneğin, Aliyun'un deposunu yansı depo olarak tanımlamak için aşağıdaki bayrağı kullanın:
```
-DLeaf.library-download-repo=https://maven.aliyun.com/repository/public
```

## -DLeaf.enableFMA
* varsayılan: `false`

Bazı matematiksel hesaplamaları hızlandırmak için [Fused-Multiply-Add işlemleri](https://en.wikipedia.org/wiki/Multiply%E2%80%93accumulate_operation) kullanılıp kullanılmayacağını belirler.

FMA komut setini destekleyen bir CPU gerektirir, aksi takdirde daha yavaş olacaktır.

Makinenizin FMA komut setini destekleyip desteklemediğini kontrol etmek için [CPU-Z](https://www.cpuid.com/softwares/cpu-z.html) gibi araçlar kullanabilirsiniz.

## -DLeaf.native-transport-type
* varsayılan: `epoll`

Veri iletimi için kullanılacak ağ I/O modelini belirtir. server.properties dosyasında `use-native-transport` seçeneğinin etkinleştirilmiş olması gerekir.

Belirtilen aktarım türü mevcut değilse, kullanılabilir bir modele otomatik olarak geçilir.

Mevcut seçenekler:
* Linux: `io_uring`, `epoll`, `nio`
* MacOS: `kqueue`, `nio`
* Windows: mevcut değil

## Kullanımdan Kaldırılmış Bayraklar

## -DLeaf.nearestEntitySensorBucketCount
(Bu bayrak yalnızca en son Leaf 1.21.1 ve 1.21.3 sürümlerinde mevcuttur)
* varsayılan: `10`

Varlık sayısı [Bucket Sort](https://en.wikipedia.org/wiki/Bucket_sort) eşiğine ulaştığında kaç tane kova kullanılacağını belirler.

Varlık sayısının karekökü olmalıdır.

## -DLeaf.nearestEntitySensorBucketSortThresholdRatio
(Bu bayrak yalnızca en son Leaf 1.21.1 ve 1.21.3 sürümlerinde mevcuttur)
* varsayılan: `2.0`

Bu değer, Bucket Sort eşiğinin oranını kontrol eder. `(Threshold = bucketCount * ratio)`