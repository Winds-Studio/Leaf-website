# Leaf JVM Bayrakları

## -DLeaf.library-download-repo

- varsayılan: ayarlanmamış

Bazı bölgelerde varsayılan Maven Central deposunun indirme hızı oldukça yavaştır.

SpigotLibraryLoader veya PaperLibraryLoader için belirli bir yansı deposunu ayarlamak için bu JVM bayrağını kullanın.

Örneğin, Aliyun'un deposunu yansı depo olarak tanımlamak için aşağıdaki bayrağı kullanın:

```bash
-DLeaf.library-download-repo=https://maven.aliyun.com/repository/public
```

## -DLeaf.enableFMA

- varsayılan: `false`

Bazı matematiksel hesaplamaları hızlandırmak için [Fused-Multiply-Add işlemleri](https://en.wikipedia.org/wiki/Multiply%E2%80%93accumulate_operation) kullanılıp kullanılmayacağını belirler.

FMA komut setini destekleyen bir CPU gerektirir, aksi takdirde daha yavaş olacaktır.

Makinenizin FMA komut setini destekleyip desteklemediğini kontrol etmek için [CPU-Z](https://www.cpuid.com/softwares/cpu-z.html) gibi araçlar kullanabilirsiniz.

## -DLeaf.disable-vanilla-profiler

- varsayılan: `false`

Minecraft’in yerleşik vanilla profiler’ını devre dışı bırakıp performansı hafif düzeyde artırıp artırmayacağını belirler.

Bazı senaryolarda gereksiz performans kaybına neden olabileceğinden, devre dışı bırakılması önerilir.
Datapack fonksiyonlarını profil etmek istemediğiniz sürece, profil aracı olarak [Spark](https://spark.lucko.me/) kullanabilirsiniz.

Spark belgelerine göz atarak şunları öğrenebilirsiniz:

- [`/spark` komutunun nasıl kullanıldığı](https://spark.lucko.me/docs/Command-Usage)
- [Spark kullanarak lag spike’ların nasıl tespit edileceği](https://spark.lucko.me/docs/guides/Finding-lag-spikes).

## -DLeaf.enable-io-uring

- varsayılan: `false`

Ağ veri iletimi için kullanılan I/O modeli olarak io_uring’in kullanılıp kullanılmayacağını belirler.
Bu özelliğin çalışması için `use-native-transport` etkin olmalı ve `server.properties` dosyasında `network-compression-threshold` değeri -1 olarak ayarlanmalıdır.

Mevcut çalışma ortamında io_uring kullanılamıyorsa, otomatik olarak desteklenen başka bir modele geri dönülür.

## -Dgale.log.warning.root

- varsayılan: `true`

Sunucu root kullanıcısı veya ayrıcalıklı (privileged) modda çalışıyorsa, sunucu başlatılırken bir uyarı mesajı yazdırılıp yazdırılmayacağını belirler.

## -Dgale.log.warning.offline.mode

- varsayılan: `true`

Sunucu çevrimdışı modda çalışıyorsa (yani `server.properties` içindeki `online-mode` değeri `false` ise), sunucu başlatılırken bir uyarı mesajı yazdırılıp yazdırılmayacağını belirler.

## Kullanımdan Kaldırılmış Bayraklar

### -DLeaf.native-transport-type

(Bu bayrak yalnızca en son Leaf 1.21.8 sürümlerinde mevcuttur)

- varsayılan: `epoll`

Veri iletimi için kullanılacak ağ I/O modelini belirtir. `server.properties` dosyasında `use-native-transport` seçeneğinin etkinleştirilmiş olması gerekir.

Belirtilen aktarım türü mevcut değilse, kullanılabilir bir modele otomatik olarak geçilir.

Mevcut seçenekler:

- Linux: `io_uring`, `epoll`, `nio`
- MacOS: `kqueue`, `nio`
- Windows: mevcut değil

### -DLeaf.nearestEntitySensorBucketCount

(Bu bayrak yalnızca en son Leaf 1.21.1 ve 1.21.3 sürümlerinde mevcuttur)

- varsayılan: `10`

Varlık sayısı [Bucket Sort](https://en.wikipedia.org/wiki/Bucket_sort) eşiğine ulaştığında kaç tane kova kullanılacağını belirler.

Varlık sayısının karekökü olmalıdır.

### -DLeaf.nearestEntitySensorBucketSortThresholdRatio

(Bu bayrak yalnızca en son Leaf 1.21.1 ve 1.21.3 sürümlerinde mevcuttur)

- varsayılan: `2.0`

Bu değer, Bucket Sort eşiğinin oranını kontrol eder. `(Threshold = bucketCount * ratio)`
