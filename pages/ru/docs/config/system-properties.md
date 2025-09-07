# JVM-флаги Leaf

## -DLeaf.library-download-repo
* по умолчанию: не установлено

Скорость загрузки из стандартного репозитория Maven Central крайне низка в некоторых регионах.

Используйте этот JVM-флаг для указания зеркального репозитория для SpigotLibraryLoader или PaperLibraryLoader.

Пример использования флага для указания репозитория Aliyun.
```
-DLeaf.library-download-repo=https://maven.aliyun.com/repository/public
```

## -DLeaf.enableFMA
* по умолчанию: `false`

Активирует использование [операций Fused-Multiply-Add](https://en.wikipedia.org/wiki/Multiply%E2%80%93accumulate_operation) для ускорения математических вычислений.

Требует процессор с поддержкой набора инструкций FMA - в противном случае производительность может снизиться.

Вы можете использовать утилиты вроде [CPU-Z](https://www.cpuid.com/softwares/cpu-z.html) чтобы проверить, поддерживает ли ваша система набор инструкций FMA.

## Устаревшие флаги

## -DLeaf.nearestEntitySensorBucketCount
(Доступно только в последних версиях Leaf 1.21.1 и 1.21.3)
* по умолчанию: `10`

Определяет количество корзин (buckets), используемых при достижении количества сущностей порога для [Bucket сортировки](https://en.wikipedia.org/wiki/Bucket_sort).

Рекомендуется устанавливать значение равным квадратному корню из количества сущностей.

## -DLeaf.nearestEntitySensorBucketSortThresholdRatio
(Доступно только в последних версиях Leaf 1.21.1 и 1.21.3)
* по умолчанию: `2.0`

Определяет коэффициент порога Bucket сортировки. `(Порог = количество_корзин * коэффициент)`
