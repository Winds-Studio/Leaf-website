# Java Flags für Server

## Bevor du beginnst: Wichtige Grundlagen

Eine korrekte Optimierung erfordert ein methodisches Vorgehen. **Beziehe dich auf die detaillierten Schritte im Guide ["Optimize Your Leaf Server"](../how-to/optimize-leaf-server.md), um zu verstehen, _wie_ diese grundlegenden Maßnahmen umzusetzen sind.** Zusammengefasst gilt immer:

1.  **Backup deines Servers:** Erstelle vor jeder Änderung ein vollständiges Backup. (Für diesen Guide nicht zwingend nötig, aber eine bewährte Praxis.)
2.  **Profiling statt Raten:** Nutze Tools wie [Spark](https://spark.lucko.me/), um echte Bottlenecks (niedrige TPS, Lag-Spikes) zu identifizieren, bevor du Einstellungen änderst. Das verlinkte Dokument erklärt, wie du Spark für allgemeinen Lag und spezifische Spikes verwendest.
3.  **Schrittweise Änderungen:** Ändere immer nur wenige zusammenhängende Einstellungen gleichzeitig, starte den Server neu und teste anschließend.

## Auswahl deiner Java Runtime Environment (JRE/JDK)

- **Empfehlung:** Verwende eine aktuelle Java-21-Long-Term-Support-(LTS)-Version von einem seriösen OpenJDK-Anbieter, die die gewünschten GC-Optionen enthält (G1GC ist Standard, ZGC und Shenandoah können je nach Anbieter leicht variieren, sind aber in großen Builds wie Temurin, Corretto oder GraalVM üblich). Gute Optionen sind:
    - **Adoptium Eclipse Temurin:** Weit verbreitetes, von der Community unterstütztes Build mit reinen OpenJDK-Binaries.
    - **Amazon Corretto:** Gut unterstützte, produktionsreife OpenJDK-Distribution mit Langzeit-Support.
    - **GraalVM (basierend auf OpenJDK):** Bietet potenzielle Performance-Vorteile durch den fortschrittlichen Graal Just-In-Time (JIT) Compiler. Kann sich jedoch anders verhalten als Standard-HotSpot-JVMs und unter Umständen Kompatibilitätsbesonderheiten haben. Teste gründlich, wenn du GraalVM wählst. **Die Nutzung von GraalVM ermöglicht spezielle JIT-Tuning-Optionen, die weiter unten beschrieben werden.**
- **Vermeide:** Headless-Varianten (oft mit `-headless` gekennzeichnet), da ihnen Komponenten fehlen können, die Minecraft-Server benötigen. Verwende das vollständige JDK (Java Development Kit).

## Java Startup Flags (JVM Arguments) – Garbage Collection

Java Flags steuern das Verhalten der JVM, insbesondere das Memory Management (Garbage Collection – GC) und Performance-Optimierungen. Dieser Abschnitt konzentriert sich auf GC-Tuning.

### Die Basis: Aikar’s Flags (G1GC)

- **Zweck:** Aikar’s Flags sind ein bekannter Satz von Argumenten, die speziell für Minecraft-Server mit dem Garbage-First Garbage Collector (G1GC) optimiert sind. G1GC ist der Standard-GC in modernen Java-Versionen und bietet in der Regel ein gutes Gleichgewicht zwischen Throughput (wie viel Arbeit der Server erledigt) und Pausenzeiten (wie lange der Server während GC stoppt).
- **Eignung:** Diese Flags sind ein hervorragender Ausgangspunkt und funktionieren gut für **die meisten Server** (ungefähr bis 1–100 Spieler). Ziel ist es, Lag-Spikes durch GC-Pausen zu reduzieren, indem G1GC gezielt auf die typischen Objekt-Allokationsmuster von Minecraft (viele kurzlebige Objekte) abgestimmt wird.
- **Java 21+ Aikar’s Flags (mit G1GC):**

    ```bash
    java -Xms<RAM>M -Xmx<RAM>M \
    -XX:+UseG1GC \
    -XX:+ParallelRefProcEnabled \
    -XX:MaxGCPauseMillis=200 \
    -XX:+UnlockExperimentalVMOptions \
    -XX:+DisableExplicitGC \
    -XX:+AlwaysPreTouch \
    -XX:G1NewSizePercent=30 \
    -XX:G1MaxNewSizePercent=40 \
    -XX:G1HeapRegionSize=8M \
    -XX:G1ReservePercent=20 \
    -XX:G1HeapWastePercent=5 \
    -XX:G1MixedGCCountTarget=4 \
    -XX:InitiatingHeapOccupancyPercent=15 \
    -XX:G1MixedGCLiveThresholdPercent=90 \
    -XX:G1RSetUpdatingPauseTimePercent=5 \
    -XX:SurvivorRatio=32 \
    -XX:+PerfDisableSharedMem \
    -XX:MaxTenuringThreshold=1 \
    -Dusing.aikars.flags=https://mcflags.emc.gs \
    -Daikars.new.flags=true \
    -jar your-server-jar-file.jar nogui
    ```

    - Ersetze `<RAM>` durch die gewünschte RAM-Menge (z. B. `10240` für 10GB).
    - **Wichtig:** Setze `-Xms` und `-Xmx` auf **denselben Wert**.
    - `-XX:+AlwaysPreTouch`: Allokiert Speicherseiten im Voraus.
    - **Hinweis:** Verwende `/spark health` oder `/spark gcmonitor` im Spiel, um tatsächliche Heap-Nutzung und GC-Performance zu sehen.

### Skalierung: Low-Latency Generational GCs (150+)

Für sehr große oder aktive Server (150–300 Spieler) wird die schiere **Objekt-Allokationsrate** zur größten Herausforderung. Minecraft erzeugt enorme Mengen temporärer Daten (Spielerbewegungen, AI-Berechnungen, Block-Updates usw.), die schnell zu Garbage werden. Während G1GC damit relativ gut umgehen kann, können die Pausenzeiten unter extremer Last dennoch spürbar werden. Java 21 bietet fortschrittliche Low-Latency-GCs mit _generationalen_ Fähigkeiten, die speziell darauf ausgelegt sind, hohe Allokationsraten kurzlebiger Objekte effizient zu verarbeiten und dabei minimale Pausen zu verursachen.

- **Generational ZGC (GZGC):**
    - **Warum:** Kombiniert ZGCs nebenläufige Ultra-Low-Latency-Performance mit einer generationalen Heap-Struktur. Die Young Generation, in der die meisten Objekte sterben, wird häufig gesammelt, wodurch Full-Heap-Scans reduziert und hohe Allokationsraten besser bewältigt werden als beim älteren, nicht-generationalen ZGC.
    - **Eignung:** Hervorragend für leistungsstarke Server (hohe Kernanzahl, 16GB+ RAM empfohlen), bei denen minimale Pausenzeiten höchste Priorität haben.
    - **Beispiel-Flags (Java 21):**

        ```bash
        java -Xms<RAM>M -Xmx<RAM>M \
        -XX:+UnlockExperimentalVMOptions \
        -XX:+UseZGC \
        -XX:+ZGenerational \
        -XX:+AlwaysPreTouch \
        -XX:+DisableExplicitGC \
        -XX:+PerfDisableSharedMem \
        -XX:+UseDynamicNumberOfGCThreads \
        -jar your-server-jar-file.jar nogui
        ```

        - `-XX:+UseZGC -XX:+ZGenerational`: Aktiviert Generational ZGC. (Wird ab Java 23+ Standard.)
        - `-XX:+UseDynamicNumberOfGCThreads`: Ermöglicht eine dynamische Anpassung der GC-Threads.

- **Generational Shenandoah:**
    - **Warum:** Shenandoah führt den Großteil der GC-Arbeit ebenfalls nebenläufig aus und zielt auf geringe Pausen unabhängig von der Heap-Größe ab. JEP 404 führte generationalen Support experimentell in Java 17–23 ein, der in neueren Builds stabiler wird. Dadurch kann Shenandoah Young-Object-Collections effizienter handhaben, ähnlich wie GZGC.
    - **Eignung:** Eine alternative Low-Latency-GC-Option, die in vielen OpenJDK-Builds verfügbar ist (nicht im Oracle JDK). Die Performance im Vergleich zu GZGC hängt vom Workload ab; Tests sind empfehlenswert, besonders unter Java 24+ für den generationalen Modus.
    - **Beispiel-Flags (Java 24 – _Experimenteller_ Generational Mode):**

        ```bash
        java -Xms<RAM>M -Xmx<RAM>M \
        -XX:+UnlockExperimentalVMOptions \
        -XX:+UseShenandoahGC \
        -XX:ShenandoahGCMode=generational \
        -XX:+AlwaysPreTouch \
        -XX:+DisableExplicitGC \
        -XX:+UseNUMA \
        -XX:+AlwaysActAsServerClassMachine \
        -XX:+ParallelRefProcEnabled \
        -XX:+PerfDisableSharedMem \
        -XX:+UseDynamicNumberOfGCThreads \
        -jar your-server-jar-file.jar nogui
        ```

        - `-XX:+UseShenandoahGC`: Aktiviert Shenandoah.
        - `-XX:ShenandoahGCMode=generational`: Wählt explizit den generationalen Modus aus JEP 404.

### Vergleich: G1GC vs. Low-Latency Generational GCs (GZGC/GenShen) (Java 21+)

| Feature                 | G1GC (mit Aikar’s Flags)                    | Generational ZGC / Generational Shenandoah        |
| :---------------------- |:--------------------------------------------|:--------------------------------------------------|
| **Hauptziel**           | Balance aus Throughput & Pausenzeiten       | Minimale Pausenzeiten (Ultra-Low-Latency)         |
| **Typische Pause**      | Niedrig, steigt unter Last (<200ms Ziel)    | Extrem niedrig, Sub-Millisekunden-Ziel            |
| **Allokationshandling** | Gut (generational)                          | Exzellent (generational + nebenläufig)            |
| **Throughput**          | In der Regel sehr gut                       | Potenziell etwas geringer durch Nebenarbeit       |
| **CPU-Nutzung**         | Moderat, Peaks während Pausen               | Höhere _Hintergrund_-CPU-Nutzung                  |
| **RAM-Overhead**        | Effizient                                   | Etwas höher möglich                               |
| **Komplexität**         | Bewährte Basis                              | Einfacheres Tuning als G1GC                       |
| **Reifegrad**           | Sehr ausgereift                             | Generationale Modi neuer (Java 21+)               |
| **Am besten für**       | Die meisten Server (<100 Spieler)           | Sehr große Server (150/300+), latenzsensitiv      |

**Empfehlung:** Starte mit Aikar’s G1GC-Flags. Wenn `/spark gcmonitor` trotz Tuning häufige oder lange GC-Pausen zeigt oder das Profiling ergibt, dass der Server bei hoher Spielerzahl mit der **Allokationsrate** kämpft (und du ausreichend Hardware + Java 21 hast), ziehe einen Wechsel zu Generational ZGC in Betracht. Teste Generational Shenandoah, wenn du Java 24+ nutzt oder GZGC Probleme verursacht.

### Extreme Skalierung (300+ Spieler) & Advanced Tuning

- **Allokationsrate ist entscheidend:** In diesem Bereich setzt die enorme Menge temporärer Objekte pro Sekunde den GC massiv unter Druck. Selbst Ultra-Low-Latency-Collector wie GZGC oder Generational Shenandoah können an ihre Grenzen stoßen, wenn die Anwendung schneller Speicher allokiert, als der GC ihn nebenläufig freigeben kann. Das kann zu Allocation Stalls (kurze Freezes) führen oder sehr große Heaps erfordern.
- **Tiefgehendes Profiling (Spark):** Unverzichtbar. Nutze `/spark profiler`, um Hotspots mit hoher Allokationsrate zu identifizieren (z. B. ineffiziente Plugins, komplexe Entity-AI). Beobachte mit `/spark gcmonitor` sowohl GC-Pausen als auch Allokationsraten. Das Reduzieren unnötiger Allokationen auf Anwendungsebene (Plugin-Optimierung, Server-Config-Tuning) ist hier oft effektiver als reines GC-Tuning.
- **Hardware:** Erfordert sehr leistungsstarke CPUs (starke Single-Thread- _und_ Multi-Core-Leistung), viel RAM (32GB++, ggf. 64GB+ je nach Allokationsrate) und schnellen NVMe-Speicher.

## Advanced JVM Tuning: Compiler- und Runtime-Optimierungen

Neben der Garbage Collection können weitere JVM-Flags die Performance beeinflussen, insbesondere in Bezug auf Speicherverbrauch, Code-Compilation (JIT) und Thread-Handling. **Das sind fortgeschrittene Optionen – teste Änderungen sorgfältig mit Spark oder ähnlichen Tools.** Genannte Defaults beziehen sich auf Java 21, sofern nicht anders angegeben.

### Standard HotSpot (C1/C2) Compiler & Runtime Tuning

Diese Flags gelten für Standard-OpenJDK-Builds wie Temurin oder Corretto.

- **Memory & Pointer:**
    - `-XX:+UseCompressedOops` (Default: false): Reduziert den Speicherbedarf für Objekt-Pointer auf 64-Bit-Systemen. Kann minimale Performance-Auswirkungen haben, spart aber etwas RAM.
    - `-XX:+UseCompressedClassPointers` (Default: true): Ähnlich wie Oops, aber für Class Pointer. Reduziert Metadaten-Speicherverbrauch – aktiviert lassen.
    - `-XX:+UseStringDeduplication` (Default: false, benötigt G1GC): Kann viel RAM sparen, wenn viele identische Strings existieren (Chat, Schilder, Item-Namen), indem sie sich ein gemeinsames Character-Array teilen. Verursacht zusätzlichen CPU-Overhead während GC-Zyklen. Testenswert auf Servern mit hohem RAM-Verbrauch und G1GC durch Hinzufügen von `+XX:+UseStringDeduplication`.
- **Code Cache:** (Speichert kompilierten nativen Code)
    - `-XX:ReservedCodeCacheSize=<size>` (Default: plattformabhängig, oft 240M): Setzt die maximale Größe. Erhöhe (z. B. `512M`) **nur**, wenn Logs melden: "CodeCache is full. Compiler has been disabled." Nutzung überwachen (`jcmd <pid> VM.native_memory` oder Spark).
    - `-XX:+UseCodeCacheFlushing` (Default: true): Erlaubt das Entfernen selten genutzten kompilierten Codes bei Platzmangel – aktiviert lassen.
- **Threading & Scheduling:**
    - `-XX:+UseThreadPriorities` (Default: true): Erlaubt unterschiedliche OS-Prioritäten für JVM-Threads (z. B. GC vs. Main Thread) – aktiviert lassen.
    - `-XX:ThreadPriorityPolicy=1` (Default: 0): Versucht, Java-Threads höhere OS-Prioritäten gegenüber anderen Prozessen zu geben. Kann die Reaktionsfähigkeit unter Last erhöhen, aber andere Systemprozesse verhungern lassen. Mit Vorsicht verwenden und Systemstabilität überwachen.
- **Hardware-spezifisch:**
    - `-XX:+UseNUMA` (Default: false): Aktiviert NUMA-Awareness, um Speicher möglichst nahe an der ausführenden CPU zu allokieren. Kann auf Multi-Socket-Systemen oder großen CPUs (EPYC, Threadripper) die Performance deutlich verbessern, **wenn** Hardware und OS korrekt konfiguriert sind. Sorgfältig testen, da Fehlkonfiguration Performance verschlechtern kann. Low-Latency-GCs wie ZGC/Shenandoah haben oft eigenes NUMA-Handling.
    - `-XX:+UseLargePages` (Default: false, benötigt OS-Konfiguration): Erlaubt die Nutzung großer Speicherseiten (z. B. 2MB/1GB statt 4KB). Kann TLB-Misses reduzieren und die Performance bei sehr großen Heaps (>32GB) verbessern. Erfordert komplexe OS-Konfiguration – vorsichtig testen.
    - `-XX:+AlwaysActAsServerClassMachine` (Default: false): Erzwingt Server-Mode-Defaults (z. B. C2-Compiler), auch wenn Hardware-Erkennung fehlschlägt oder der Server in Docker läuft. Unproblematisch, explizit zu setzen.

---

- Kurz gesagt: Die meisten wichtigen Optimierungen sind bereits standardmäßig aktiviert – es gibt keinen Grund, alles „zu übertunen“. Wenn du dennoch tiefer einsteigen willst, schau dir [diese hilfreiche Website](https://chriswhocodes.com/hotspot_options_openjdk21.html) an, die jede Änderung pro Java-Version mit guten Erklärungen dokumentiert.

---

### GraalVM JIT Compiler Tuning

- **Allgemeine Optionen:**
    - `-XX:+UseJVMCIVMCompiler` (Default: true in GraalVM): Aktiviert den GraalVM-Compiler als Top-Tier-JIT. Das Deaktivieren (`-XX:-UseJVMCIVMCompiler`) wechselt zurück zum HotSpot-C2-Compiler – nützlich für Vergleiche.
    - `-Dgraal.CompilerConfiguration=<community|enterprise|economy>` (Default: community bei CE): Wählt die Compiler-Konfiguration. `community` ist Standard, `enterprise` bietet aggressivere Optimierungen mit längeren Compile-Zeiten, `economy` kompiliert schneller mit weniger Optimierung.
    - `-Dgraal.ShowConfiguration=<none|info|verbose>` (Default: none): Gibt beim Start Informationen zur gewählten Graal-Compiler-Konfiguration aus – hilfreich zur Kontrolle.
    - `-Djdk.graal.MitigateSpeculativeExecutionAttacks=<None|AllTargets|GuardTargets|NonDeoptGuardTargets>` (Default variiert, oft `GuardTargets`): (Ab GraalVM JDK 24 geändert zu `-Djdk.graal.SpectrePHTBarriers=<None|AllTargets|GuardTargets|NonDeoptGuardTargets>`.) Steuert Schutzmaßnahmen gegen CPU-Schwachstellen wie Spectre. `None` bietet beste Performance, aber geringste Sicherheit. `AllTargets` ist am sichersten, aber mit hohem Performance-Verlust. `GuardTargets` ist meist ein guter Kompromiss. In vertrauenswürdigen Server-Umgebungen kann `None` nach sorgfältiger Risikoabwägung in Betracht gezogen werden.
- **Performance-Tuning-Optionen:**
    - `-Dgraal.UsePriorityInlining=true` (Default: true): Aktiviert einen erweiterten Inlining-Algorithmus, der Throughput priorisiert. Deaktivieren (`false`) kann Warmup beschleunigen, aber Peak-Performance senken.
    - `-Dgraal.Vectorization=true` (Default: true): Aktiviert SIMD-/Vektorisierungs-Optimierungen für potenziell schnellere mathematische/Array-Operationen. Deaktivieren ist selten sinnvoll.
    - `-Dgraal.OptDuplication=true` (Default: true): Aktiviert Pfad-Duplizierungs-Optimierungen, die verschiedene Codepfade separat optimieren. Deaktivieren kann Compile-Zeiten senken, verschlechtert aber meist die Laufzeit-Performance.
    - `-Dgraal.TuneInlinerExploration=<float>` (Default: 0, Bereich: -1 bis 1): Steuert den Aufwand für Inlining-Exploration. Werte >0 erhöhen den Aufwand (bessere Peak-Performance, langsameres Warmup), Werte <0 verringern ihn (schnelleres Warmup, evtl. geringere Peak-Performance). Erfordert sorgfältiges Profiling.
    - `-Dgraal.TraceInlining=false` (Default: false): Aktiviert detaillierte Logs zu Inlining-Entscheidungen – nur für tiefgehendes Debugging sinnvoll.
- **Optionen finden:** Nutze `java -XX:+UnlockExperimentalVMOptions -XX:+PrintFlagsFinal -version | grep graal` (bei GraalVM), um verfügbare Graal-Flags aufzulisten. Das Verständnis erfordert jedoch tiefgehende Kenntnisse oder Dokumentation.

---

**Allgemeine Empfehlungen für Compiler-/Runtime-Flags:**

- **Defaults sind meist gut:** Moderne JVMs (HotSpot und GraalVM) sind sehr gut abgestimmt. Bleib bei den Defaults, solange Profiling (Spark) keinen klaren Engpass zeigt.
- **Fokus auf GC und Anwendung:** Bei Minecraft bringen GC-Optimierung (Aikar’s Flags, GZGC/GenShen) und Anwendungsoptimierung (Server-Configs, effiziente Plugins) meist die größten Performance-Gewinne.
- **Schrittweise testen:** Wenn du experimentierst, ändere immer nur eine Option und miss die Auswirkungen mit Spark.

## Server-Software-Konfiguration (Paper, Purpur, Leaf, etc.)

Während JVM-Tuning entscheidend ist, ist **die Konfiguration der Server-Software genauso wichtig.** Einstellungen in Dateien wie `paper-global.yml`, `paper-world-defaults.yml`, `purpur.yml`, `leaf-global.yml` usw. steuern Gameplay-Mechaniken, die Performance und **Allokationsraten** stark beeinflussen.

- **Bedeutung:** JVM-Flags steuern _wie_ der Server läuft (Memory, Compilation), Server-Configs steuern _was_ der Server tut (Entity-Ticks, Chunk-Loading, AI). Beides zu optimieren ist notwendig.
- **Schlüsselbereiche:** View Distance, Simulation Distance, Mob-Spawning-Limits/-Raten, Entity Activation Ranges (entscheidend zur Reduzierung von AI-/Tick-Last und Allokationen), Chunk-Loading/-Generation, Hopper-Verhalten und asynchrone Operationen. Konsultiere die Dokumentation von Paper und Purpur.
- **Aktion:** **Vernachlässige diese Dateien nicht.** Sieh dir die Doku deiner Server-Software an. **Für detaillierte Hinweise zu Leaf-spezifischen Einstellungen (`leaf-global.yml`) siehe erneut den Guide ["Optimize Your Leaf Server"](../how-to/optimize-leaf-server.md).** Nutze Spark-Profilergebnisse, um zu erkennen, welche Gameplay-Aspekte (oft korreliert mit hoher Allokation) angepasst werden müssen.

## Testen, Iteration und Hilfe suchen

- **Restart:** Wende Änderungen durch einen Server-Neustart an.
- **Monitoring:** Nutze `/spark tps`, `/spark profiler` und `/spark gcmonitor`, um Performance, GC-Verhalten und Allokationsraten zu überwachen.
- **Beobachten:** Achte auf Gameplay-Bugs oder unerwartetes Verhalten.
- **Anpassen:** Setze Änderungen zurück, wenn Probleme auftreten, und passe basierend auf Profiling-Daten an. Optimierung ist ein iterativer Prozess.
- **Community:** Suche Hilfe in den entsprechenden Discord-Servern (PaperMC, Purpur, Leaf), wenn du auf Probleme stößt.

## Referenzen

1.  Mojang Studios (Minecraft 1.20.5 Release Notes): [https://www.minecraft.net/en-us/article/minecraft-java-edition-1-20-5](https://www.minecraft.net/en-us/article/minecraft-java-edition-1-20-5)
2.  PaperMC Dokumentation (Getting Started): [https://docs.papermc.io/paper/getting-started](https://docs.papermc.io/paper/getting-started)
3.  Adoptium Eclipse Temurin: [https://adoptium.net/](https://adoptium.net/)
4.  Amazon Corretto: [https://aws.amazon.com/corretto/](https://aws.amazon.com/corretto/)
5.  Oracle OpenJDK Builds: [https://jdk.java.net/](https://jdk.java.net/)
6.  GraalVM: [https://www.graalvm.org/](https://www.graalvm.org/)
7.  Oracle Java HotSpot VM Options (Java 21): [https://chriswhocodes.com/hotspot_options_openjdk21.html](https://chriswhocodes.com/hotspot_options_openjdk21.html) (Unofficial but comprehensive list) / Official subset: [https://docs.oracle.com/en/java/javase/21/docs/specs/man/java.html](https://docs.oracle.com/en/java/javase/21/docs/specs/man/java.html)
8.  Aikar's Minecraft Java Flags Guide: [https://aikar.co/2018/07/02/tuning-the-jvm-g1gc-garbage-collector-flags-for-minecraft/](https://aikar.co/2018/07/02/tuning-the-jvm-g1gc-garbage-collector-flags-for-minecraft/)
9.  Oracle G1 Garbage Collector Dokumentation: [https://docs.oracle.com/en/java/javase/21/gctuning/garbage-first-g1-garbage-collector.html](https://docs.oracle.com/en/java/javase/21/gctuning/garbage-first-g1-garbage-collector.html)
10. Oracle Java 21 Release Notes (Generational ZGC): [https://www.oracle.com/java/technologies/javase/21-relnote-issues.html#JDK-8293822](https://www.oracle.com/java/technologies/javase/21-relnote-issues.html#JDK-8293822)
11. Oracle Java Platform, Standard Edition HotSpot Virtual Machine Garbage Collection Tuning Guide (Setting Heap Size): [https://docs.oracle.com/en/java/javase/21/gctuning/factors-affecting-garbage-collection-performance.html#GUID-B0408057-SAF8-4C88-A484-E4565CEA6F75](https://docs.oracle.com/en/java/javase/21/gctuning/factors-affecting-garbage-collection-performance.html#GUID-B0408057-SAF8-4C88-A484-E4565CEA6F75)
12. BellSoft Blog: Generational ZGC in JDK 21: What is it and how to use it: [https://bell-sw.com/blog/Generational-ZGC-in-JDK-21/](https://bell-sw.com/blog/Generational-ZGC-in-JDK-21/)
13. OpenJDK Project ZGC (JEP 439: Generational ZGC): [https://openjdk.org/jeps/439](https://openjdk.org/jeps/439)
14. OpenJDK Project Shenandoah: [https://wiki.openjdk.org/display/shenandoah/Main](https://wiki.openjdk.org/display/shenandoah/Main)
15. PaperMC Dokumentation: [https://docs.papermc.io/paper/](https://docs.papermc.io/paper/)
16. Purpur Dokumentation: [https://purpurmc.org/docs/](https://purpurmc.org/docs/)
17. Inside.java Explainer: Generational ZGC: [https://inside.java/2023/11/28/gen-zgc-explainer/](https://inside.java/2023/11/28/gen-zgc-explainer/)
18. OpenJDK JEP 404: Generational Shenandoah (Experimental): [https://openjdk.org/jeps/404](https://openjdk.org/jeps/404)
19. GraalVM Dokumentation - Java Runtime Options: [https://www.graalvm.org/jdk21/reference-manual/java/options/](https://www.graalvm.org/jdk21/reference-manual/java/options/)
