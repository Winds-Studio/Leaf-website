# Leaf JVM Flags

## -DLeaf.library-download-repo

- Standard: Nicht gesetzt

Die Downloadgeschwindigkeit des standardmäßigen Maven Central Repositories ist in manchen Regionen sehr langsam.

Mithilfe dieses JVM Arguments kann ein anderes Mirror Repository for SpigotLibraryLoader oder PaperLibraryLoader gesetzt werden.

Verwende zum Beispiel das folgende Argument, um das Aliyun-Repository als Maven-Mirror festzulegen. Dadurch können Server auf dem chinesischen Festland Bibliotheken schneller herunterladen.

```bash
-DLeaf.library-download-repo=https://maven.aliyun.com/repository/public
```

## -DLeaf.enableFMA

- Standard: `false`

Steuert, ob [Multiply-Accumulate](https://de.wikipedia.org/wiki/Multiply-Accumulate) für manche Operationen genutzt werden sollen.

Erfordert eine CPU, die den FMA Instruktionssatz unterstützt. Ansonsten wird die Berechnung langsamer sein.

Werkzeuge wie [CPU-Z](https://www.cpuid.com/softwares/cpu-z.html) können ausgeben, ob ein Prozessor den nötigen Instruktionssatz unterstützt.

## -DLeaf.disable-vanilla-profiler

- Standard: `false`

Ob der eingebaute Vanilla-Profiler von Minecraft deaktiviert werden soll, um die Leistung leicht zu verbessern.

Es wird empfohlen, ihn zu deaktivieren, da er in manchen Szenarien Leistung verschwenden kann, und du kannst [Spark](https://spark.lucko.me/) als Profiling-Tool verwenden. Es sei denn, du möchtest deine Datapack-Funktionen profilieren.

Lies die Dokumentation von Spark, um zu lernen:

- [Wie man den `/spark` Befehl verwendet](https://spark.lucko.me/docs/Command-Usage)
- [Wie man Lag-Spikes mit Spark findet](https://spark.lucko.me/docs/guides/Finding-lag-spikes).

## -DLeaf.enable-io-uring

- Standard: `false`

Ob `io_uring` für das I/O-Modell der Netzwerkdatenübertragung verwendet werden soll. Erfordert, dass `use-native-transport` aktiviert ist und `network-compression-threshold` in `server.properties` auf `-1` gesetzt ist.

Wenn `io_uring` in der aktuellen Umgebung nicht verfügbar ist, wird auf ein verfügbares Modell zurückgegriffen.

## -Dgale.log.warning.root

- Standard: `true`

Ob beim Serverstart eine Warnmeldung ausgegeben werden soll, wenn der Server unter dem Root-Benutzer oder im privilegierten Modus läuft.

## -Dgale.log.warning.offline.mode

- Standard: `true`

Ob beim Serverstart eine Warnmeldung ausgegeben werden soll, wenn der Server im Offline-Modus läuft (`online-mode` ist `false` in `server.properties`).

## Veraltete Flags

### -DLeaf.native-transport-type

(Dieses Flag existiert nur in der neuesten Leaf 1.21.8)

- Standard: `epoll`

Legt das Netzwerk-I/O-Modell für die Datenübertragung fest. Muss in der Datei `server.properties` unter `use-native-transport` aktiviert sein.

Falls der angegebene Übertragungstyp nicht verfügbar ist, wird automatisch auf ein verfügbares Modell umgeschaltet.

Verfügbare Optionen:

- Linux: `io_uring`, `epoll`, `nio`
- MacOS: `kqueue`, `nio`
- Windows: nicht verfügbar

### -DLeaf.nearestEntitySensorBucketCount

(Dieses Flag existiert nur in der neuesten Leaf 1.21.1 und 1.21.3)

- Standard: `10`

Wie viele Buckets beim [Bucket Sort](https://de.wikipedia.org/wiki/Bucketsort) genutzt werden, wenn die Grenze erreicht wird.

Sollte der Quadratwurzel der Anzahl an Elementen entsprechen.

### -DLeaf.nearestEntitySensorBucketSortThresholdRatio

(Dieses Flag existiert nur in der neuesten Leaf 1.21.1 und 1.21.3)

- Standard: `2.0`

Dieser Wert steuert das Verhältnis für den Bucket-Sort-Schwellenwert. `(Schwellenwert = Anzahl der Buckets * Verhältnis)`
