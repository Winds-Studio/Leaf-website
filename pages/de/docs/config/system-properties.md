# Leaf JVM Flgas

## -DLeaf.library-download-repo
* Standard: Nicht gesetzt

Die Downloadgeschwindigkeit des standardmäßigen Maven Central Repositories ist in manchen Regionen sehr langsam.

Mithilfe dieses JVM Arguemnts kann ein anderes Mirror Repository for SpigotLibraryLoader oder PaperLibraryLoader gesetzt werden.

Beispiel:
```
-DLeaf.library-download-repo=https://maven.aliyun.com/repository/public
```
um Aliyun's Repository zu nutzen.

## Veraltete Flags

### -DLeaf.enableFMA
(Dieses Flag existiert nur in der neuesten Leaf 1.21.1 und 1.21.3)
* Standard: `false`

Steuert, ob [Multiply-Accumulate](https://de.wikipedia.org/wiki/Multiply-Accumulate) für manche Operationen genutzt werden sollen.

Erfordert eine CPU, die den FMA Instruktionssatz unterstützt. Ansonsten wird die Berechnung langsamer sein.

Werkzeuge wie [CPU-Z](https://www.cpuid.com/softwares/cpu-z.html) können ausgeben, ob ein Prozessor den nötigen Instruktionssatz unterstützt.

### -DLeaf.nearestEntitySensorBucketCount
(Dieses Flag existiert nur in der neuesten Leaf 1.21.1 und 1.21.3)
* Standard: `10`

Wie viele Buckets beim [Bucket Sort](https://de.wikipedia.org/wiki/Bucketsort) genutzt werden, wenn die Grenze erreicht wird.

Sollte der Quadratwurzel der Anzahl an Elementen entsprechen.

### -DLeaf.nearestEntitySensorBucketSortThresholdRatio
(Dieses Flag existiert nur in der neuesten Leaf 1.21.1 und 1.21.3)
* Standard: `2.0`

Dieser Wert steuert das Verhältnis für den Bucket-Sort-Schwellenwert. `(Schwellenwert = Anzahl der Buckets * Verhältnis)`
