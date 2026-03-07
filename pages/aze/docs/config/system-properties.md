# Leaf JVM Bayraqları

## -DLeaf.library-download-repo

- varsayılan: təyin edilməmiş

Bəzi bölgələrdə varsayılan Maven Central anbarının endirmə sürəti olduqca yavaşdır.

SpigotLibraryLoader və ya PaperLibraryLoader üçün müəyyən bir güzgü anbarını təyin etmək üçün bu JVM bayrağından istifadə edin.

Məsələn, Aliyun'un anbarını güzgü anbar kimi təyin etmək üçün aşağıdakı bayrağı istifadə edin:

```bash
-DLeaf.library-download-repo=https://maven.aliyun.com/repository/public
```

## -DLeaf.enableFMA

- varsayılan: `false`

Bəzi riyazi hesablamaları sürətləndirmək üçün [Fused-Multiply-Add əməliyyatları](https://en.wikipedia.org/wiki/Multiply%E2%80%93accumulate_operation) istifadə olunub-olunmayacağını təyin edir.

FMA əmr dəstini dəstəkləyən CPU tələb edir, əks halda daha yavaş olacaq.

Maşınızın FMA əmr dəstini dəstəkləyib-dəstəkləmədiyini yoxlamaq üçün [CPU-Z](https://www.cpuid.com/softwares/cpu-z.html) kimi alətlərdən istifadə edə bilərsiniz.

## -DLeaf.disable-vanilla-profiler

- varsayılan: `false`

Minecraft'in quraşdırılmış vanilla profiler'ını söndürüb performansı xeyli artırıp-artırmayacağını təyin edir.

Bəzi senariyalarda lazımsız performans itkisinə səbəb ola biləcəyindən, söndürülməsi tövsiyə olunur.
Datapack funksiyalarını profil etmək istəmədiyiniz müddətcə, profil aləti kimi [Spark](https://spark.lucko.me/) istifadə edə bilərsiniz.

Spark sənədlərinə baxaraq bunları öyrənə bilərsiniz:

- [`/spark` əmrinin necə istifadə edildiyi](https://spark.lucko.me/docs/Command-Usage)
- Spark istifadə edərək lag spike'ların necə aşkar ediləcəyi](https://spark.lucko.me/docs/guides/Finding-lag-spikes).

## -DLeaf.enable-io-uring

- varsayılan: `false`

Şəbəkə məlumat ötürülməsi üçün istifadə olunan I/O modeli kimi io_uring'in istifadə olunub-olunmayacağını təyin edir.
Bu xüsusiyyətin işləməsi üçün `use-native-transport` aktiv olmalı və `server.properties` faylında `network-compression-threshold` dəyəri -1 kimi təyin edilməlidir.

Mövcud iş mühitində io_uring istifadə edilə bilmirsə, avtomatik olaraq dəstəklənən başqa bir modelə geri dönülür.

## -Dgale.log.:::warning ÖNƏMLİ.root

- varsayılan: `true`

Server root istifadəçi və ya imtiyazlı (privileged) modda işləyirsə, server başladılarken bir xəbərdarlıq mesajı yazdırılıb-yazdırılmayacağını təyin edir.

## -Dgale.log.:::warning ÖNƏMLİ.offline.mode

- varsayılan: `true`

Server oflayn modda işləyirsə (yəni `server.properties` daxilindəki `online-mode` dəyəri `false` isə), server başadılarkən bir xəbərdarlıq mesajı yazdırılıb-yazdırılmayacağını təyin edir.

## İstifadədən Çıxarılmış Bayraqlar

### -DLeaf.native-transport-type

(Bu bayraq yalnız ən son Leaf 1.21.8 versiyalarında mövcuddur)

- varsayılan: `epoll`

Məlumat ötürülməsi üçün istifadə ediləcək şəbəkə I/O modelini müəyyən edir. `server.properties` faylında `use-native-transport` seçənəyinin aktiv edilməsi lazımdır.

Müəyyən edilmiş ötürülmə növü mövcud deyilsə, istifadə edilə bilən bir modelə avtomatik keçid edilir.

Mövcud seçimlər:

- Linux: `io_uring`, `epoll`, `nio`
- MacOS: `kqueue`, `nio`
- Windows: mövcud deyil

### -DLeaf.nearestEntitySensorBucketCount

(Bu bayraq yalnız ən son Leaf 1.21.1 və 1.21.3 versiyalarında mövcuddur)

- varsayılan: `10`

Varlıq sayı [Bucket Sort](https://en.wikipedia.org/wiki/Bucket_sort) həddinə çatdıqda neçə ədəd kova istifadə ediləcəyini təyin edir.

Varlıq sayısının kvadrat kökü olmalıdır.

### -DLeaf.nearestEntitySensorBucketSortThresholdRatio

(Bu bayraq yalnız ən son Leaf 1.21.1 və 1.21.3 versiyalarında mövcuddur)

- varsayılan: `2.0`

Bu dəyər, Bucket Sort həddinin nisbətini idarə edir. `(Threshold = bucketCount * ratio)`
