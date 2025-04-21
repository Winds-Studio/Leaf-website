# Java Flags for Servers

## Before You Begin: Essential Practices

Proper optimization requires a methodical approach. **Refer to the detailed steps outlined in the ["Optimize Your Leaf Server"](../how-to/optimize-leaf-server.md) guide for *how* to perform these essential practices.** In summary, always:

1.  **Backup Your Server:** Before any changes, back up everything. (Not necessarily needed for this guide but It's a good practice.)
2.  **Profile, Don't Guess:** Use tools like [Spark](https://spark.lucko.me/) to identify actual bottlenecks (low TPS, lag spikes) before changing settings. The linked document details how to use Spark for general lag and specific spikes.
3.  **Change Incrementally:** Modify only a few related settings at a time, then restart and test.

## Choosing Your Java Runtime Environment (JRE/JDK)

*   **Recommendation:** Use a recent Java 21 Long-Term Support (LTS) release from a reputable OpenJDK vendor that includes the desired GC options (G1GC is standard, ZGC and Shenandoah availability may vary slightly by vendor, but are common in major builds like Temurin, Corretto, GraalVM). Good options include:
    *   **Adoptium Eclipse Temurin:** A widely recommended, community-supported build providing pure OpenJDK binaries [3].
    *   **Amazon Corretto:** Well-supported, production-ready distribution of OpenJDK with long-term support [4].
    *   **GraalVM (based on OpenJDK):** Offers potential performance benefits through its advanced Graal Just-In-Time (JIT) compiler. However, it might behave differently than standard HotSpot JVMs and could potentially have compatibility quirks. Test thoroughly if choosing GraalVM [6]. **Using GraalVM enables specific JIT tuning options discussed later.**
*   **Avoid:** Headless variants (often suffixed with `-headless`) as they may lack components needed by Minecraft servers. Use the full JDK (Java Development Kit).

## Java Startup Flags (JVM Arguments) - Garbage Collection

Java flags control how the JVM operates, particularly memory management (Garbage Collection - GC) and performance optimizations [7]. This section focuses on GC tuning.

### The Foundation: Aikar's Flags (G1GC)

*   **Purpose:** Aikar's flags are a well-known set of arguments optimized for Minecraft servers using the Garbage-First Garbage Collector (G1GC) [8]. G1GC is the default GC in modern Java versions and generally provides a good balance between throughput (how much work the server gets done) and pause times (how long the server freezes for GC) [9, 10].
*   **Suitability:** These flags are an excellent starting point and work well for **most servers** (roughly up to 1-100 players). They aim to reduce lag spikes caused by GC pauses by tuning G1GC specifically for Minecraft's typical object allocation patterns (many short-lived objects) [8].
*   **Java 21+ Aikar's Flags (using G1GC):**
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
    *   Replace `<RAM>` with the amount of RAM (e.g., `10240` for 10GB).
    *   **Important:** Set `-Xms` and `-Xmx` to the *same value* [8, 11].
    *   `-XX:+AlwaysPreTouch`: Pre-allocates memory pages [7, 8].
    *   **Note:** Use `/spark health` or `/spark gcmonitor` in-game to see actual heap usage and GC performance [8].

### Scaling Up: Low-Latency Generational GCs (150+)

For very large or active servers (150-300 players), the sheer **rate of object allocation** becomes a major challenge. Minecraft generates vast amounts of temporary data (player movements, AI calculations, block updates, etc.) that quickly become garbage [12]. While G1GC handles this reasonably well, its pause times can still become noticeable under extreme load. Java 21 offers advanced low-latency GCs with *generational* capabilities, specifically designed to handle high allocation rates of short-lived objects efficiently while keeping pauses minimal [10, 12, 13, 17].

*   **Generational ZGC (GZGC):**
    *   **Why:** Combines ZGC's concurrent, ultra-low pause time performance with a generational heap structure [10, 13, 17]. It frequently collects the young generation where most objects die, reducing the need for full heap scans and better handling high allocation rates compared to the older non-generational ZGC [12, 17].
    *   **Suitability:** Excellent for powerful servers (high core count, 16GB+ RAM recommended) where minimizing pause time is paramount [10, 13].
    *   **Example Flags (Java 21):**
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
        *   `-XX:+UseZGC -XX:+ZGenerational`: Enables Generational ZGC [13, 17]. (Becomes default in Java 23+) [10].
        *   `-XX:+UseDynamicNumberOfGCThreads`: Allows dynamic adjustment of GC threads [7].
*   **Generational Shenandoah:**
    *   **Why:** Shenandoah also performs most GC work concurrently, aiming for low pauses independent of heap size [14]. JEP 404 introduced generational capabilities as experimental in Java 17-23, becoming more stable in later builds [18]. It allows Shenandoah to more efficiently handle young object collections, similar in principle to GZGC [18].
    *   **Suitability:** An alternative low-latency generational collector available in many OpenJDK builds (not Oracle JDK). Performance relative to GZGC can depend on the specific workload; testing is recommended, especially on Java 24+ for the generational mode [12, 18].
    *   **Example Flags (Using Java 24 - *Experimental* Generational Mode):**
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
        *   `-XX:+UseShenandoahGC`: Enables Shenandoah [14]. (Not explicit to Java 24)
        *   `-XX:ShenandoahGCMode=generational`: Explicitly selects the generational mode introduced via JEP 404 [18].

### G1GC vs. Low-Latency Generational GCs (GZGC/GenShen) Comparison (Java 21+)

| Feature         | G1GC (with Aikar's Flags)                     | Generational ZGC / Generational Shenandoah |
| :-------------- | :-------------------------------------------- | :----------------------------------------- |
| **Primary Goal** | Balance throughput & pause times              | Minimize pause times (ultra-low latency)   |
| **Typical Pause** | Low, but can increase with load (<200ms aim) [8] | Extremely low, sub-millisecond target [13, 14] |
| **Allocation Handling** | Good (Generational)                         | Excellent (Generational + Concurrent) [12, 17, 18] |
| **Throughput**  | Generally very good                           | Potentially slightly lower due to concurrent work [12] |
| **CPU Usage**   | Moderate, peaks during pauses                 | Higher *background* CPU usage for concurrent tasks [12] |
| **RAM Overhead**| Efficient                                     | May require slightly more overhead [12]    |
| **Complexity**  | Well-understood baseline [8]                  | Simpler tuning than G1GC [10, 12, 14]      |
| **Maturity**    | Very mature [9]                               | Generational modes newer (Java 21+) [10, 18] |
| **Best For**    | Most servers (<100 players), balance [8]      | Very large servers (150/300+), latency sensitive [12] |

**Recommendation:** Start with Aikar's G1GC flags. If `/spark gcmonitor` shows frequent or long GC pauses *despite* tuning, or if profiling indicates the server struggles to keep up with the **allocation rate** on a high-player-count server (and you have sufficient hardware + Java 21), then consider switching to Generational ZGC. Test Generational Shenandoah if using Java 24+ or if GZGC presents issues.

### Extreme Scale (300+ Players) & Advanced Tuning

*   **Allocation Rate is Key:** At this scale, the sheer volume of temporary objects created per second (allocation rate) puts immense pressure on the GC. Even ultra-low-pause collectors like GZGC or Generational Shenandoah can struggle if the application allocates memory faster than the GC can reclaim it concurrently. This can lead to allocation stalls (brief freezes) or require significantly larger heap sizes to provide buffer space.
*   **Deep Profiling (Spark):** Essential. Use `/spark profiler` to identify application hotspots causing high allocation rates (e.g., inefficient plugins, complex entity AI). Use `/spark gcmonitor` to observe GC pause times *and* allocation rates. Reducing unnecessary allocations in the application itself (plugin optimization, server config tuning) is often more effective than solely relying on GC tuning at this level.
*   **Hardware:** Requires powerful CPUs (high single-thread *and* multi-core performance), ample RAM (32GB++, potentially 64GB+ depending on allocation rates and heap needs), and fast NVMe storage.

## Advanced JVM Tuning: Compiler and Runtime Optimizations

Beyond Garbage Collection, other JVM flags can influence performance, particularly related to memory usage, code compilation (JIT), and thread handling. **These are advanced options; test changes carefully using Spark or other means.** Defaults mentioned are for Java 21 unless otherwise noted.

### Standard HotSpot (C1/C2) Compiler & Runtime Tuning

These flags apply when using standard OpenJDK builds like Temurin or Corretto.

*   **Memory & Pointers:**
    *   `-XX:+UseCompressedOops` (Default: false): Reduces memory usage for object pointers on 64-bit systems. May affect performance slightly with saving a small amount of memory [7].
    *   `-XX:+UseCompressedClassPointers` (Default: true ): Similar to Oops but for class pointers. Reduces metadata memory usage. Keep it enabled [7].
    *   `-XX:+UseStringDeduplication` (Default: false, Requires G1GC): Can save significant memory on servers with many duplicate strings (chat, signs, item names) by making them share the same underlying character array. Adds some CPU overhead during GC cycles. Worth testing on servers with high RAM usage and G1GC by adding `+XX:+UseStringDeduplication` [7, 8].
*   **Code Cache:** (Stores compiled native code)
    *   `-XX:ReservedCodeCacheSize=<size>` (Default: platform-dependent, often 240M): Sets the maximum size. Increase (e.g., `512M`) *only* if logs warn "CodeCache is full. Compiler has been disabled." [7]. Monitor usage (`jcmd <pid> VM.native_memory` or Spark).
    *   `-XX:+UseCodeCacheFlushing` (Default: true): Allows the JVM to flush less-used compiled code if the cache is low on space. Keep enabled [7].
*   **Threading & Scheduling:**
    *   `-XX:+UseThreadPriorities` (Default: true): Allows JVM threads to have different OS priorities (e.g., GC threads vs main thread). Keep enabled [7].
    *   `-XX:ThreadPriorityPolicy=1` (Default: 0): Setting to `1` attempts to give Java threads higher OS priorities relative to other processes. Can potentially make the server more responsive under load but might starve other essential system processes. Use with caution and monitor system stability [7].
*   **Hardware Specific:**
    *   `-XX:+UseNUMA` (Default: false): Enables NUMA awareness, attempting to allocate memory on the NUMA node local to the executing CPU. Can significantly improve performance on multi-socket systems or large single-socket CPUs (EPYC, Threadripper) *if* the hardware and OS support it properly. Test carefully by adding `+XX:+UseNUMA`, as incorrect configuration can hurt performance [7]. Low-latency GCs like ZGC/Shenandoah often have their own NUMA handling.
    *   `-XX:+UseLargePages` (Default: false, Requires OS configuration): Allows the JVM to use larger memory pages (e.g., 2MB/1GB instead of 4KB). Can improve performance by reducing TLB (Translation Lookaside Buffer) misses, especially with very large heaps (>32GB). Requires specific OS configuration (granting permissions, configuring hugepages pool) which can be complex. Test carefully if attempting by adding `+XX:+UseLargePages` [7].
    *   `-XX:+AlwaysActAsServerClassMachine` (Default: false): Ensures the JVM uses server-mode defaults (like the C2 compiler) even if hardware detection fails or if the server is inside of a Docker container. Harmless to add explicitly [7].

---
*    Long story short - most of the "heavy lifters" are already enabled by default, no need to "overtune" it. But of course, if you want to learn about the flags more visit [this cool website](https://chriswhocodes.com/hotspot_options_openjdk21.html) that tracks every change on each java version with great explanations provided!
---

### GraalVM JIT Compiler Tuning

*   **General Options:**
    *   `-XX:+UseJVMCIVMCompiler` (Default: true in GraalVM): Enables the GraalVM compiler as the top-tier JIT. Disabling this (`-XX:-UseJVMCIVMCompiler`) falls back to HotSpot's C2 compiler, useful for comparison [19].
    *   `-Dgraal.CompilerConfiguration=<community|enterprise|economy>` (Default: community for CE): Selects compiler configuration. `community` is standard, `enterprise` offers more aggressive optimizations with potentially longer compile times, `economy` compiles faster with less optimization [19]
    *   `-Dgraal.ShowConfiguration=<none|info|verbose>` (Default: none): Prints information about the selected Graal compiler configuration during startup [19]. Useful for verification.
    *   `-Dgraal.MitigateSpeculativeExecutionAttacks=<None|AllTargets|GuardTargets|NonDeoptGuardTargets>` (Default varies, often `GuardTargets`): Controls mitigations for CPU vulnerabilities like Spectre. `None` offers the best performance but least security. `AllTargets` is most secure but has a large performance impact. `GuardTargets` is a common balance [19]. For trusted server environments, `None` might be considered after careful risk assessment, otherwise, the default is usually appropriate.
*   **Performance Tuning Options:**
    *   `-Dgraal.UsePriorityInlining=true` (Default: true): Enables an advanced inlining algorithm that favors throughput over compilation speed [19]. Disabling (`false`) might speed up warmup but potentially reduce peak performance.
    *   `-Dgraal.Vectorization=true` (Default: true): Enables automatic use of SIMD instructions (vectorization) for potentially faster mathematical/array operations [19]. Disabling (`false`) is unlikely to be beneficial unless it causes issues.
    *   `-Dgraal.OptDuplication=true` (Default: true): Enables path duplication optimization, which can improve performance by optimizing different paths through the code separately [19]. Disabling (`false`) might reduce compile time but likely hurts runtime performance.
    *   `-Dgraal.TuneInlinerExploration=<float>` (Default: 0, Range: -1 to 1): Adjusts the effort spent on exploring inlining possibilities. Values > 0 increase effort (potentially better peak performance, slower warmup), values < 0 decrease effort (faster warmup, potentially lower peak) [19]. Requires careful profiling to tune.
    *   `-Dgraal.TraceInlining=false` (Default: false): Enables detailed logging of inlining decisions [19]. Only useful for deep debugging.
*   **Finding Options:** Use `java -XX:+UnlockExperimentalVMOptions -XX:+PrintFlagsFinal -version | grep graal` (when running GraalVM) to list available Graal-related flags, but understanding them requires deep knowledge or documentation [19].

---
**General Advice for Compiler/Runtime Flags:**

*   **Defaults are Usually Good:** Modern JVMs (both HotSpot and GraalVM) are well-tuned. Stick to defaults unless profiling (Spark) clearly indicates a bottleneck related to compilation or code cache.
*   **Focus on GC and Application:** For Minecraft, optimizing GC (using appropriate flags like Aikar's or GZGC/GenShen) and application behavior (server configs, plugin efficiency) typically yields the most significant performance gains.
*   **Test Incrementally:** If you experiment with these flags, change only one at a time and measure the impact with Spark.

## Server Software Configuration (Paper, Purpur, Leaf, etc.)

While JVM tuning is crucial, **server software configuration is equally important.** Settings within files like `paper-global.yml`, `paper-world-defaults.yml`, `purpur.yml`, `leaf-global.yml`, etc., control gameplay mechanics that heavily impact performance and **allocation rates**.

*   **Importance:** JVM flags manage *how* the server runs (memory, compilation), but server configs manage *what* the server does (entity ticking, chunk loading, AI). Optimizing both is necessary.
*   **Key Areas:** View distance, simulation distance, mob spawning limits/rates, entity activation ranges (crucial for reducing AI/tick load and allocations), chunk loading/generation settings, hopper behavior, and asynchronous operations (offloading work from the main thread). Consult Paper [15] and Purpur [16] documentation for their settings.
*   **Action:** **Do not neglect these files.** Consult the documentation for your specific server software. **For detailed guidance on Leaf's specific settings (`leaf-global.yml`), refer back to the ["Optimize Your Leaf Server"](../how-to/optimize-leaf-server.md) guide.** Use Spark profiler results to identify which gameplay aspects (which often correlate with high allocation) need tuning in these configurations.

## Testing, Iteration, and Seeking Help

*   **Restart:** Apply changes by restarting the server.
*   **Monitor:** Use `/spark tps`, `/spark profiler`, and `/spark gcmonitor` to check performance, GC behavior, and allocation rates.
*   **Observe:** Watch for gameplay glitches or unexpected behavior.
*   **Adjust:** Revert changes if issues arise. Tweak settings based on profiling data. Optimization is iterative.
*   **Community:** Seek help in the relevant Discord servers (PaperMC, Purpur, Leaf) if you encounter issues.

## References

1.  Mojang Studios (Minecraft 1.20.5 Release Notes): [https://www.minecraft.net/en-us/article/minecraft-java-edition-1-20-5](https://www.minecraft.net/en-us/article/minecraft-java-edition-1-20-5)
2.  PaperMC Docs (Getting Started): [https://docs.papermc.io/paper/getting-started](https://docs.papermc.io/paper/getting-started)
3.  Adoptium Eclipse Temurin: [https://adoptium.net/](https://adoptium.net/)
4.  Amazon Corretto: [https://aws.amazon.com/corretto/](https://aws.amazon.com/corretto/)
5.  Oracle OpenJDK Builds: [https://jdk.java.net/](https://jdk.java.net/)
6.  GraalVM: [https://www.graalvm.org/](https://www.graalvm.org/)
7.  Oracle Java HotSpot VM Options (Java 21): [https://chriswhocodes.com/hotspot_options_openjdk21.html](https://chriswhocodes.com/hotspot_options_openjdk21.html) (Unofficial but comprehensive list) / Official subset: [https://docs.oracle.com/en/java/javase/21/docs/specs/man/java.html](https://docs.oracle.com/en/java/javase/21/docs/specs/man/java.html)
8.  Aikar's Minecraft Java Flags Guide: [https://aikar.co/2018/07/02/tuning-the-jvm-g1gc-garbage-collector-flags-for-minecraft/](https://aikar.co/2018/07/02/tuning-the-jvm-g1gc-garbage-collector-flags-for-minecraft/)
9.  Oracle G1 Garbage Collector Documentation: [https://docs.oracle.com/en/java/javase/21/gctuning/garbage-first-g1-garbage-collector.html](https://docs.oracle.com/en/java/javase/21/gctuning/garbage-first-g1-garbage-collector.html)
10. Oracle Java 21 Release Notes (Generational ZGC): [https://www.oracle.com/java/technologies/javase/21-relnote-issues.html#JDK-8293822](https://www.oracle.com/java/technologies/javase/21-relnote-issues.html#JDK-8293822)
11. Oracle Java Platform, Standard Edition HotSpot Virtual Machine Garbage Collection Tuning Guide (Setting Heap Size): [https://docs.oracle.com/en/java/javase/21/gctuning/factors-affecting-garbage-collection-performance.html#GUID-B0408057-SAF8-4C88-A484-E4565CEA6F75](https://docs.oracle.com/en/java/javase/21/gctuning/factors-affecting-garbage-collection-performance.html#GUID-B0408057-SAF8-4C88-A484-E4565CEA6F75)
12. BellSoft Blog: Generational ZGC in JDK 21: What is it and how to use it: [https://bell-sw.com/blog/Generational-ZGC-in-JDK-21/](https://bell-sw.com/blog/Generational-ZGC-in-JDK-21/)
13. OpenJDK Project ZGC (JEP 439: Generational ZGC): [https://openjdk.org/jeps/439](https://openjdk.org/jeps/439)
14. OpenJDK Project Shenandoah: [https://wiki.openjdk.org/display/shenandoah/Main](https://wiki.openjdk.org/display/shenandoah/Main)
15. PaperMC Documentation: [https://docs.papermc.io/paper/](https://docs.papermc.io/paper/)
16. Purpur Documentation: [https://purpurmc.org/docs/](https://purpurmc.org/docs/)
17. Inside.java Explainer: Generational ZGC: [https://inside.java/2023/11/28/gen-zgc-explainer/](https://inside.java/2023/11/28/gen-zgc-explainer/)
18. OpenJDK JEP 404: Generational Shenandoah (Experimental): [https://openjdk.org/jeps/404](https://openjdk.org/jeps/404)
19. GraalVM Documentation - Java Runtime Options: [https://www.graalvm.org/jdk21/reference-manual/java/options/](https://www.graalvm.org/jdk21/reference-manual/java/options/)
