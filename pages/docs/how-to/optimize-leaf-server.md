# Optimize Your Leaf Server (1.21.4/5)

**Before You Start:**

1.  **BACKUP YOUR SERVER!** Seriously. Before changing configurations, especially experimental ones, back up your world, plugins, and configurations.
2.  **Profile, Don't Guess:** Optimization is most effective when driven by data, not assumptions. Use a profiler like [Spark](https://spark.lucko.me/) to identify *what* is actually causing lag on *your* server. Don't just change settings randomly; find the bottleneck first!
    *   **For General Low TPS/Lag:** If your server consistently runs below 20 TPS, use the standard profiler:
        1.  Run `/spark profiler start` in the console or as an op.
        2.  Let it run for a few minutes during typical server activity (or when the TPS is low).
        3.  Run `/spark profiler stop`.
        4.  Open the generated link and analyze the "Hotspots" or call tree to see which operations are consuming the most main thread time overall.
    *   **For Sudden Lag Spikes/Freezes:** If your server usually runs fine but experiences sudden, sharp drops in TPS or freezes, target those specific moments:
        1.  Run `/spark profiler --only-ticks-over 100` (you can adjust the `100`ms threshold). This command specifically records data *only* for server ticks that take longer than the specified duration (normal ticks are 50ms).
        2.  Let it run until you experience one or more lag spikes.
        3.  Run `/spark profiler stop`.
        4.  Analyze the report. It will show you exactly what the server was doing during those specific laggy ticks. Look for methods/operations with high percentages in the call tree within the captured spike data. This helps pinpoint the direct cause of the freeze (e.g., a specific plugin event, world generation, excessive entity processing).
    *   **Analyze Before Changing:** Use the profiler results to guide your configuration changes. If Spark points to entity pathfinding, focus on the `async-pathfinding` settings. If it points to chunk loading, look at view distances or `async-chunk-send`.
3.  **Change Incrementally:** Modify only a few related settings at a time, then restart and test. This makes it easier to identify if a change caused problems or improved performance.
4.  **Read Descriptions:** The configuration file itself has detailed descriptions (`desc`) for each option. Read them carefully!


## Key Optimization Areas in `leaf-global.yml`

We'll focus on sections with significant performance implications. Recommended values often prioritize performance, sometimes at the cost of minor vanilla behavior deviations or requiring newer hardware/Java versions.

### 1. Asynchronous Operations (`async`)

The goal here is to move calculations off the main server thread (which handles gameplay ticks) to background threads, reducing main thread load and improving TPS (Ticks Per Second).

*   **`async-entity-tracker.enabled: true`**
    *   **Why:** Entity tracking involves constantly checking which players are close enough to see which entities, and sending packets to add/update/remove entities from the player's view. This can be very demanding, especially with many players and entities. Enabling this option moves the bulk of these visibility checks and packet preparation tasks to separate background threads.
    *   **How it Works:** The system uses dedicated tracker threads. When enabled, internal data structures (like the set of players seeing an entity, or entity attribute maps) are switched to thread-safe versions (e.g., `ConcurrentHashSet`, `ConcurrentHashMap`). The core logic of checking distances (`updatePlayer`) runs on these background threads. Operations that *must* happen on the main thread (like teleporting a player when their vehicle is removed from view) are scheduled back to the main thread.
    *   **`compat-mode: false` (Recommended unless needed)**
        *   **Why `compat-mode` Exists:** Some NPC plugins (most notably Citizens) create NPCs using *real player entities*. The async nature of the tracker can sometimes cause visual glitches (like NPCs briefly disappearing or lagging) with these specific types of NPCs because their updates might happen out of sync with the main thread.
        *   **How `compat-mode: true` Works:** The code specifically checks if an entity being tracked is a *real player* vs. a *fake player* (like a Citizens NPC). If compatibility mode is enabled, tracking updates for *fake players* are forced to run *synchronously* on the main thread, while tracking for all other entities (mobs, items, real players) remains asynchronous. This fixes the visual glitches for those specific NPC types.
        *   **Recommendation:** Leave `compat-mode: false` for best performance. Only enable it (`true`) if you use Citizens or a similar *real-entity* NPC plugin *and* experience visibility issues. Packet-based/virtual entity NPC plugins (like ZNPCsPlus, Adyeshach, FancyNPCs) are generally unaffected and perform better, allowing `compat-mode` to remain `false`.
    *   **`max-threads`:** Controls the size of the thread pool for entity tracking. Default (`0` = 1/4 cores) is a safe start. Consider increasing to `1/2` of your CPU cores if Spark shows significant time spent in entity tracking, but avoid over-allocating threads.
    *   **`keepalive` / `queue-size`:** Fine-tune thread pool behavior (idle thread timeout) and task queue limits. Defaults are usually reasonable.
*   **`async-target-finding.enabled: true`**
    *   **Why:** Moves the expensive part of mob AI (searching nearby entities to find a target) to background threads. Reduces main thread load from AI calculations.
*   **`async-pathfinding.enabled: true`**
    *   **Why:** Calculating navigation paths for mobs (especially complex ones) is CPU-intensive. This offloads the path *computation* to background threads, preventing the main thread from getting bogged down by mobs trying to figure out how to get somewhere.
    *   **How it Works:** When a mob needs a path, the request is sent to the async pathfinding thread pool. The mob's AI doesn't immediately get the path. Instead, the navigation system and AI behaviors are modified to *wait* for the path calculation to complete (using checks like `path.isProcessed()`) or use a *callback* (`AsyncPathProcessor.awaitProcessing`) that executes the logic (like starting to move along the path) *after* the path is received from the background thread. This prevents the main thread from stalling while waiting for the calculation.
    *   **`max-threads`:** Controls the pathfinding thread pool size. Default (`0` = 1/4 cores) is conservative. Consider `1/3` of CPU cores if pathfinding (check Spark for `PathFinder` or navigation tasks) is a significant source of lag.
    *   **`keepalive` / `queue-size`:** Tune thread pool behavior.
    *   **`reject-policy`:** Determines what happens if the pathfinding queue fills up.
        *   `FLUSH_ALL`: All waiting pathfinding tasks are immediately run on the main server thread. Can cause a lag spike but processes all pending requests.
        *   `CALLER_RUNS`: Only the *new* task that couldn't fit in the queue is run on the main server thread. Less likely to cause a large spike but might delay some pathfinding requests further.
*   **`async-mob-spawning.enabled: true`**
    *   **Why:** Offloads some calculations needed *before* spawning mobs. Requires Paper's `per-player-mob-spawns: true` to be effective. Doesn't make the actual spawning async (that's unsafe).
*   **`async-locator.enabled: true`**
    *   **Why:** Makes commands like `/locate` and processes like Eye of Ender/Dolphin searches run in the background, preventing server hangs during these potentially slow lookups.
    *   **`threads`:** `1` or `2` is usually plenty.
*   **`async-chunk-send.enabled: true`**
    *   **Why:** Prepares and sends chunk data to players asynchronously. Massively reduces lag when players join, teleport, or fly quickly. Highly recommended.
*   **`async-block-finding.enabled: true`**
    *   **Why:** Similar to target finding, but for AI searching for specific blocks. Reduces main thread load from certain AI tasks.
*   **`parallel-world-tracking`** (Experimental)
    *   **Why:** Aims to tick different worlds/regions concurrently on multi-core CPUs.
    *   **Caveat:** Highly experimental. Only enable (`enabled: true`) if you have *many* worlds *and* are experiencing specific bottlenecks *and* understand the risks of concurrency issues. Default (`false`) is safer.
*   **`async-playerdata-save`**
    *   **Why:** Tries to save player data asynchronously. Reduces max-mspt spikes shown on spark profiler reports.

---
### 2. Performance Tweaks (`performance`)

This section contains various targeted optimizations.

*   **Virtual Threads (Java 21+ Required)**
    *   `use-virtual-thread-for-user-authenticator.enabled: true`
    *   `use-virtual-thread-for-async-chat-executor.enabled: true`
    *   `use-virtual-thread-for-async-scheduler.enabled: true`
    *   **Why:** Uses modern Java 21+ lightweight threads for tasks like player login authentication and potentially plugin async tasks. Reduces overhead compared to traditional threads if your server runs Java 21 or newer.
*   **`create-snapshot-on-retrieving-blockstate.enabled: false`**
    *   **Why:** Avoids creating a copy (snapshot) of block data every time a plugin asks for it. This is significantly faster but relies on plugins not modifying the live data unintentionally.
    *   **Caveat:** Generally safe, but if you encounter weird block-related plugin issues, try setting this back to `true`.
*   **Throttling/Skipping Unnecessary Work**
    *   `inactive-goal-selector-throttle.enabled: true`: Reduces AI calculations for mobs far from players.
    *   `throttle-hopper-when-full.enabled: true` (Set `skip-ticks: 8`): Stops hoppers constantly trying to push into full containers. `8` ticks matches vanilla cooldown.
    *   `skip-map-item-data-updates-if-map-does-not-have-craftmaprenderer.enabled: true`: Helps if plugins create many custom maps without renderers (like image maps). Minor vanilla impact (maps in inventory might not update until held/viewed).
    *   `skip-ai-for-non-aware-mob.enabled: true`: Further reduces AI processing for inactive mobs that haven't been interacted with.
*   **`reduce-packets.reduce-entity-move-packets.enabled: true`**
    *   **Why:** Sends fewer/smaller packets for small entity movements. Saves bandwidth and client processing, can make movement look smoother under load.
*   **`faster-random-generator.enabled: true`** (Java 17+ Required)
    *   **Why:** Uses faster random number generation algorithms available in modern Java. Randomness is used *everywhere*, so this can give a noticeable boost.
    *   **`random-generator: Xoroshiro128PlusPlus`**: Good balance of speed and quality.
    *   **`enable-for-worldgen: false`**: **CRITICAL:** Setting this to `true` **WILL CHANGE WORLD GENERATION**. Ores, structures, etc., will differ from vanilla seeds. Only use `true` on **NEW** worlds where vanilla seed parity doesn't matter.
    *   **`use-legacy-random-for-slime-chunk: true`**: **CRITICAL:** Set to `true` on existing worlds to keep slime chunks in the same locations for farms. Set to `false` only on new worlds if you don't care about vanilla slime chunk locations.
*   **`dab` (Distant Activation Behavior)**
    *   `enabled: true`: Reduces AI processing (brain ticks, pathfinding) for distant entities.
    *   `dont-enable-if-in-water: true`: Prevents land mobs far away from players from drowning unnecessarily due to paused AI.
    *   `start-distance: 8`, `max-tick-freq: 20`, `activation-dist-mod: 7`: These are reasonable starting points for balancing optimization and behavior. Adjust based on observation if needed.
    *   `blacklisted-entities`: Add entity types here (e.g., `minecraft:villager`, `minecraft:zombified_piglin`) if their AI needs to run even when far away (e.g., for specific farms).
*   **`dont-save-entity`**
    *   `dont-save-primed-tnt.enabled: true`: Prevents TNT entities from being saved, avoiding explosions caused by chunk loading/unloading cycles. Good for technical/redstone servers.
    *   `dont-save-falling-block.enabled: true`: Prevents glitched/duplicated sand/gravel after restarts or lag.

---
### 3. Network Settings (`network`)

*   **`protocol-support`**: Enable specific protocols (`jade`, `appleskin`, etc.) **only** if you know your players use these client mods and you want server-side support for them. They don't improve performance otherwise.
*   **`OptimizeNonFlushPacketSending.enabled: false`**
    *   **Why `false`:** This optimization is **KNOWN TO BE INCOMPATIBLE** with ProtocolLib and potentially other network-heavy plugins. **DO NOT ENABLE** unless you are absolutely sure it won't break your plugins.
*   **`chat-message-signature.enabled: false`**
    *   **Why:** Disables cryptographic signing of chat messages. This prevents players from reporting chat to Mojang and disables the "secure chat" popups/indicators. Often preferred for servers handling moderation internally or running in offline mode.

---
### 4. Miscellaneous (`misc`)

*   **`secure-seed.enabled: false`**
    *   **Why `false`:** Setting this to `true` uses a different internal seed for ore/structure placement, making seed cracking impossible but **FUNDAMENTALLY CHANGING** generation compared to vanilla seeds. Only enable (`true`) on **NEW** worlds where vanilla parity is not needed and seed cracking is a concern.
*   **`region-format-settings.region-format: MCA`**
    *   **Why `MCA`:** This is the standard, safe, compatible Minecraft Anvil format.
    *   **`LINEAR`:** Experimental Zstandard compression. Saves disk space but is **RISKY**, less compatible, and requires careful handling (see linked tools). **DO NOT USE** unless you fully understand the risks and have backups.
*   **`lag-compensation`** (Experimental)
    *   `enabled: true`, `enable-for-water: true`, `enable-for-lava: true`
    *   **Why:** Attempts to make gameplay feel smoother during lag spikes.
    *   **Caveat:** Experimental. May have unintended side effects. Monitor behavior if enabled.

## Inherited Settings (Gale, Purpur, Paper)

Remember that Leaf builds upon Gale, Purpur, and Paper. Many crucial performance settings reside in their configuration files (`gale-global.yml`, `gale-world.yml`, `purpur.yml`, `paper-global.yml`, `paper-world-defaults.yml`).

Refer to their documentation (linked in [Useful Websites](./useful-sites.md)) and community guides (like Paper-chan's) for optimizing those settings as well. Key areas include:

*   **Paper:** Entity activation ranges, mob spawning controls, chunk loading settings, view distances.
*   **Purpur/Gale:** Additional AI controls, gameplay tweaks, logging options.


## Testing and Iteration

*   After making changes, **restart** your server.
*   **Monitor performance** using `/spark tps` and, more importantly, `/spark profiler` during normal gameplay.
*   **Observe gameplay:** Do mobs behave correctly? Are there any new glitches?
*   **Adjust:** If performance hasn't improved or issues arise, revert the last changes or tweak settings further. Optimization is often a process of trial and error tailored to your specific server load and hardware.

If you run into trouble or have questions, don't hesitate to ask in the ([Leaf Discord server](https://discord.com/invite/gfgAwdSEuM)). Good luck!
