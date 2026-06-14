import type { ConfigMessages } from "@/components/config/config-viewer"
import type config from "@/components/config/data/leaf-global-latest"

const leafGlobalLatestEn: ConfigMessages<typeof config> = {
  async: {
    __desc__: `This section contains asynchronous features intended to reduce the load on the main thread (Server Thread) by processing tasks asynchronously.`,
    "async-chunk-send": {
      enabled: {
        desc: `Whether to make packing and sending chunk packets asynchronous.<br>
                    This can significantly reduce main thread load, especially when many players are loading chunks simultaneously (e.g., joining, teleporting, flying fast).<br>
                    <br>
                    __⚡Recommended value: \`true\`__`,
      },
    },
    "async-entity-tracker": {
      enabled: {
        desc: `Whether to make entity tracking asynchronous.<br>
                    This can improve performance significantly, especially in situations with a large number of entities in a small area.<br>
                    <br>
                    __⚡Recommended value: \`true\`__<br>
                    <br>
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">Experimental</p>
                    Experimental feature, actively testing, please report any bugs you encounter.
                    </div>`,
      },
      threads: {
        desc: `Maximum number of threads for async entity tracker to use.<br>
                    If a value &leq; \`0\` is given, it automatically uses 1/4 of the number of CPU cores, with a minimum of 1.<br>
                    <br>
                    __⚡Recommended value: 1/2 of CPU cores__`,
      },
    },
    "async-mob-spawning": {
      enabled: {
        desc: `Whether to make mob spawning asynchronous.<br>
                    <br>
                    On servers with heavy mob spawning, this can improve performance by up to ~15%. You must have Paper's \`per-player-mob-spawns\` config set to \`true\` for this to work.<br>
                    One quick note: this does not actually spawn mobs async (that would be very unsafe). This just offloads some expensive calculations that are required for mob spawning.<br>
                    <br>
                    __⚡Recommended value: \`true\`__`,
      },
    },
    "async-pathfinding": {
      enabled: {
        desc: `Whether to make the mob pathfinding calculation asynchronously.<br>
                    <br>
                    __⚡Recommended value: \`true\`__`,
      },
      keepalive: {
        desc: `The thread keepalive time, threads with no tasks will be terminated if they exceed the time.<br>
                    (Unit: second)`,
      },
      "max-threads": {
        desc: `Maximum number of threads for async mob pathfinding to use.<br>
                    If a value &leq; \`0\` is given, it automatically uses 1/4 of the number of CPU cores, with a minimum of 1.<br>
                    <br>
                    __⚡Recommended value: 1/3 of CPU cores__`,
      },
      "queue-size": {
        desc: `Maximum size of the queue for pending mob pathfinding tasks.<br>
                    If a value &leq; \`0\` is given, the queue size is dynamically calculated as \`max-threads * 256\`.`,
      },
      "reject-policy": {
        desc: `The policy to use when the pathfinding task queue is full, and a new task is submitted.<br>
                    <ul>
                    <li>\`FLUSH_ALL\`: All pending tasks in the queue are immediately run on the server thread.</li>
                    <li>\`CALLER_RUNS\`: The incoming submitted task will be run on the server thread.</li>
                    </ul>
                    <br>
                    __⚡Recommended value: \`CALLER_RUNS\`__`,
      },
    },
    "async-playerdata-save": {
      enabled: {
        desc: `Whether to make player data saving asynchronous (I/O operations are expensive).`,
      },
    },
    "parallel-world-ticking": {
      "async-unsafe-read-handling": {
        desc: `Whether to run asynchronous tasks synchronously within the parallel ticking system.<br>
                    This might be needed for plugin compatibility with certain plugins, but it largely negates the performance benefits of parallel ticking.<br>
                    <br>
                    __⚡Recommended value: \`BUFFERED\`__`,
      },
      "disable-hard-throw": {
        desc: `Whether to disable hard throws (which usually stop the server) related to parallel ticking errors.<br>
                    <br>
                    <div class="tip custom-block">
                    <p class="custom-block-title custom-block-title-default">Attention</p>
                    This may mask underlying issues, but it can help prevent crashes during the testing stage of server development. Use with caution.
                    </div>`,
      },
      enabled: {
        desc: `Whether to parallel process different worlds in separate threads, which can improve performance on a multi-core system.<br>
                    <br>
                    Parallel World Ticking, also known as "PWT", is a concept created by [SparklyPaper](https://github.com/SparklyPower/SparklyPaper), which involves ticking each world in its own dedicated thread to reduce and split the workload from a single thread for all worlds.<br>
                    In this PWT implementation, each world will wait until the last world tick completes. Read more in SparklyPaper's explanation [PARALLEL_WORLD_TICKING.md](https://github.com/SparklyPower/SparklyPaper/blob/13aff425238ea322658de0d9f4f7bd906bd9f431/docs/PARALLEL_WORLD_TICKING.md).<br>
                    <br>
                    When should I consider trying PWT?
                    <ol>
                    <li>I really can't switch to [Folia](https://papermc.io/software/folia) or its fork.</li>
                    <li>I have a multi-core server.</li>
                    <li>My players spread on average in each world.</li>
                    <li>(Or I have many worlds, e.g., some RPG servers)</li>
                    </ol>
                    <br>
                    __⚡Recommended value: \`false\` (Only enable it if experience specific bottlenecks and understand the risks)__<br>
                    <br>
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">Experimental</p>
                    Experimental feature, potentially unstable, and may cause compatibility issues with some plugins.
                    </div>`,
      },
      "log-container-creation-stacktraces": {
        desc: `Whether to log stacktraces when containers (like Block Entities or Entities) are created during parallel ticking.<br>
                    This is useful for debugging potential concurrency issues.`,
      },
      threads: {
        desc: `Number of threads dedicated to parallel world ticking.<br>
                    <br>
                    __⚡Recommended value: same as the number of worlds__`,
      },
    },
  },
  fixes: {
    __desc__: `This section contains bug fixes for specific issues.`,
    "prevent-moving-into-weak-loaded-chunks": {
      __desc__: `Whether to prevent entities from moving into weak-loaded chunks.`,
      enabled: {
        desc: `Set this to \`true\` to be able to use options below.`,
      },
      projectiles: {
        desc: `Whether to prevent projectiles from moving into weak-loaded chunks.`,
      },
    },
    "vanilla-bug-fix": {
      __desc__: `This section contains fixes for vanilla Minecraft bugs.`,
      "mc-270656": {
        desc: `Whether to fix incorrect granting of \`Who needs rockets?\` advancement.<br>
                    Mojira link: [MC-270656](https://mojira.dev/MC-270656).`,
      },
      "mc-301114": {
        desc: `Whether to fix the memory leak in the combat tracker caused by the mob constantly being damaged.<br>
                    Mojira link: [MC-301114](https://mojira.dev/MC-301114).`,
      },
      "mc-301114-max-entries": {
        desc: `Max allowed entries in the mob's combat tracker.<br>
                    This only has any effect if \`mc-301114\` above is \`true\`.`,
      },
      "mc-152094": {
          desc: `Whether to fix the bug that the End City ship generation gets cut at chunk borders.<br>
              Mojira link: [MC-152094](https://mojira.dev/MC-152094).`
      },
    },
  },
  "gameplay-mechanisms": {
    __desc__: `This section contains the features that modify or improve the game mechanics.`,
    "afk-command": {
      enabled: {
        desc: `Whether to enable the AFK command based on Minecraft's built-in [idle-timeout mechanism](https://minecraft.wiki/w/Server.properties#:~:text=player%20have%20to%20idle). Players can use \`/afk\` command to switch their AFK mode, and their AFK status can be shown in the Tab list.<br>
                    <br>
                    Also set \`kick-if-idle\` to \`false\` in Purpur config, to prevent players from being kicked when they enter AFK mode. The rest of the AFK settings, configurable AFK messages, and title messages are in Purpur config.`,
      },
    },
    "allow-tripwire-dupe": {
      desc: `Whether to bring back tripwire dupe ([MC-59471](https://bugs.mojang.com/browse/MC/issues/MC-59471)) which is fixed in 1.21.2's snapshots 24w33a and 24w36a. It is also known as the string dupe.`,
    },
    "death-item-drop-knockback": {
      "drop-around": {
        desc: `Whether to drop items randomly around the player on their death.
                    <ul>
                    <li>If set to \`true\`, items will be dropped with a randomized motion and scattered around the dead player.</li>
                    <li>If set to \`false\`, items will be dropped below the dead player.</li>
                    </ul>`,
      },
      "horizontal-force": {
        desc: `Base speed of horizontal velocity that applies to the player's dropped items on death.`,
      },
      "vertical-force": {
        desc: `Same as \`horizontal-force\`, but it is for vertical velocity.`,
      },
    },
    "ice-and-snow-chance": {
      desc: `The chance of ice and snow formation.
                <ul>
                <li>If you want the ice and snow to occur less frequently, set this value higher.</li>
                <li>If you want the ice and snow to behave more like vanilla, set this value closer to \`48\`.</li>
                </ul>
                __⚡Recommended value: \`384\` (\`384 = 48 * 8\`)__
                <table>
                <tr><td><b>Values for goals</b></td><td></td></tr>
                <tr><td><i>Optimization</i></td><td><code>384</code></td></tr>
                <tr><td><i>Vanilla behavior</i></td><td><code>48</code></td></tr>
                </table>`,
    },
    "inventory-overflow-event": {
      enabled: {
        desc: `Whether to enable the inventory overflow event. The event is called when the plugin uses \`Inventory#addItem\` to add items to the player's inventory, and the target inventory is full.<br>
                    <br>
                    <div class="tip custom-block">
                    <p class="custom-block-title custom-block-title-default">Attention</p>
                    This is not a proper solution to use! Please redesign your plugin logic to use the returned map of the \`Inventory#addItem\` method as soon as possible!
                    </div>`,
      },
      "listener-class": {
        desc: `The full listener class name that listens to this inventory overflow event. Set to your own listener class to use this event.`,
      },
    },
    knockback: {
      __desc__: `This section contains options to adjust knockback related behaviors.`,
      "can-player-knockback-zombie": {
        desc: `Whether the player can knockback zombies using the hand, weapon, projectile, etc.`,
      },
      "egg-knockback-players": {
        desc: `Whether the egg can knockback players.`,
      },
      "flush-location-while-knockback-player": {
        desc: `Whether to synchronize player movement immediately when it gets knockback.<br>
                    Once the target player is hit and gets knockback, it can give a smoother PVP gameplay experience with faster knockback responses. Instead, in vanilla, the packet sending happens at the end of the tick and it may hurt the PVP game experience.<br>
                    <br>
                    __⚡Recommended value: \`true\` (For PVP server)__<br>
                    <br>
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">Experimental</p>
                    Experimental feature, actively testing, please report any bugs you encounter.
                    </div>`,
      },
      "old-blast-protection-explosion-knockback": {
        desc: `Whether to use the old <= 1.20.4 explosion knockback behavior, which applies to armors with blast protection enchantment.
                    <ul>
                    <li>If set to \`true\`, the explosion knockback will be calculated based on the blast protection enchantment the player has. The knockback is slightly bigger than that after the 1.20.4 version.</li>
                    <li>If set to \`false\`, explosion knockback will follow the vanilla behavior of the current version.</li>
                    </ul>`,
      },
      "snowball-knockback-players": {
        desc: `Whether the snowball can knockback players.`,
      },
    },
    "only-player-pushable": {
      desc: `Whether to make only the player pushable.<br>
                If set to \`true\`, this option will override values of related collision options in Paper's global and world config, and mobs will not be killed under the effect of [maxEntityCramming](https://minecraft.wiki/w/Game_rule#:~:text=entity%20cramming%20damage) gamerule.<br>
                <br>
                __⚡Recommended value: \`true\`__<br>
                <br>
                <div class="tip custom-block">
                <p class="custom-block-title custom-block-title-default">Attention</p>
                It can break mob farms that are using mob collision to push mobs to fall or kill mobs by exceeding the value of the [maxEntityCramming](https://minecraft.wiki/w/Game_rule#:~:text=entity%20cramming%20damage) gamerule.
                </div>`,
    },
    player: {
      "max-use-item-distance": {
        desc: `The maximum distance that the player is allowed to interact using an item.<br>
                    (Unit: block)<br>
                    <br>
                    Some [Anarchy servers](https://minecraftservers.org/type/anarchy) or similar types of servers may allow players to use hacks/cheats. If you want players to be able to use crystal related modules that are packet-based (e.g., CEV Breaker, BedAura), you may need to adjust this value.<br>
                    It's better to set the value to \`10.0000001\` to allow using related hack modules.
                    <br>
                    If set to \`-1\` is given, the check of the maximum allowed distance to use an item will be disabled.<br>
                    <br>
                    __⚡Recommended value: \`10.0000001\` (Only for anarchy server)__<br>
                    <br>
                    <div class="tip custom-block">
                    <p class="custom-block-title custom-block-title-default">Attention</p>
                    If set to \`-1\` or any large positive values, players can use some packet modules of hack clients, and are also able to use [Nocom Exploit](https://github.com/nerdsinspace/nocom-explanation)! Adjusting this option requires careful consideration of potential exploits.
                    </div>`,
      },
    },
    "spawner-settings": {
      checks: {
        "check-for-nearby-players": {
          desc: `Whether to check if any players are in a radius to spawn the mob.
                        <ul>
                        <li>If set to \`true\`, the spawner will always attempt to spawn mobs without checking if there is any player nearby.</li>
                        <li>If set to \`false\`, the spawner will attempt to spawn mobs only if there is a player in the radius.</li>
                        </ul>`,
        },
        "ignore-spawn-rules": {
          desc: `Whether to ignore additional spawn rules of mobs.<br>
                        <br>
                        Many mobs have spawn restrictions to be only or prevent them from spawning on specific blocks. For example, most animals can only spawn on grass blocks, or the hoglin can not spawn on the nether wart block. You can find the list of additional spawn rules in [Additional Rules](https://minecraft.wiki/w/Mob_spawning#:~:text=additional%20rules).<br>
                        <br>
                        This option does not affect and is separate from \`spawner-block-checks\` and \`water-prevent-spawn-check\` above.`,
        },
        "light-level-check": {
          desc: `Whether to check if the light level is sufficient to spawn the mob.
                        <ul>
                        <li>If set to \`true\`, the spawner will attempt to spawn mobs using the same light level conditions used for natural mob spawning.</li>
                        <li>If set to \`false\`, the spawner will follow the vanilla behavior that attempts to spawn without checking the light level.</li>
                        </ul>`,
        },
        "spawner-block-checks": {
          desc: `Whether to prevent spawn attempts if the spawn point is obstructed by blocks.`,
        },
        "spawner-max-nearby-check": {
          desc: `Whether to check if there is the maximum amount of nearby mobs to spawn the mob. The spawner will stop spawning new mobs to prevent overcrowding.
                        <ul>
                        <li>If set to \`true\`, the spawner will follow the vanilla behavior that prevents spawning new mobs if the nearby mob count exceeds the limit.</li>
                        <li>If set to \`false\`, the spawner will always attempt to spawn without checking the nearby mob count.</li>
                        </ul>`,
        },
        "water-prevent-spawn-check": {
          desc: `Whether to prevent spawn attempts if the spawn point has water.`,
        },
      },
      enabled: {
        desc: `Whether to use custom spawner options below. Options below only affect the spawning of spawner blocks instead of the natural spawning.`,
      },
      "max-spawn-delay": {
        desc: `The maximum delay between each spawn attempt of the spawner. Higher values will slow down the spawning speed of spawners.<br>
                    (Unit: tick)`,
      },
      "min-spawn-delay": {
        desc: `The minimum delay between each spawn attempt of the spawner. Higher values will slow down the spawning speed of spawners.<br>
                    (Unit: tick)`,
      },
    },
    "use-spigot-item-merging-mechanism": {
      desc: `Whether to merge dropped items based on their tick sequence, which is the long-standing default behavior of Spigot.<br>
                <br>
                In Spigot, the item entity that ticks later will merge into the earlier ticking one. If the merge radius is relatively larger, it can prevent dropped items from getting stuck at unexpected locations. So that this is useful for farms or redstone builds that can create numerous dropped items.<br>
                However, in vanilla, the item merging is based on the item count of the stack. The stack with the smaller count will merge with the one with the larger count.
                <table>
                <tr><td><b>Values for goals</b></td><td></td></tr>
                <tr><td><i>SMP friendly</i></td><td><code>true</code></td></tr>
                <tr><td><i>Vanilla behavior</i></td><td><code>false</code></td></tr>
                </table>`,
    },
    "use-vanilla-hopper": {
      desc: `Whether to use an aggresive way to revert Paper's hopper behavior to be close to vanilla behavior.<br>
                It's recommended to use this option with \`performance.sleeping-block-entity\`.<br>
                <table>
                <tr><td><b>Values for goals</b></td><td></td></tr>
                <tr><td><i>SMP friendly</i></td><td><code>true</code></td></tr>
                <tr><td><i>Vanilla behavior</i></td><td><code>false</code></td></tr>
                </table>`,
    },
  },
  misc: {
    __desc__: `This section contains some miscellaneous features.`,
    "connection-message": {
      __desc__: `The connection message broadcasts to all online players when they join or quit the server.<br>
                The message needs to use the [MiniMessage](https://docs.papermc.io/adventure/minimessage/format/) format.<br>
                If set \`message\` below to \`default\`, the vanilla join/quit message will be used.<br>
                If set \`enabled\` below to \`false\`, the connection message will be disabled, and another plugin will be used to send the connection message.<br>
                <br>
                Available placeholders:
                <ul>
                <li>__\`<player_name%>\`__ - player name</li>
                <li>__\`<player_displayname>\`__ - player display name</li>
                </ul>
                <br>
                <div class="tip custom-block">
                <p class="custom-block-title custom-block-title-default">API / Plugin Friendly</p>
                This feature is API / plugin-friendly. It means that the connection message content can be overridden by plugins using \`PlayerJoinEvent\` or \`PlayerQuitEvent\`.
                </div>`,
      join: {
        enabled: {
          desc: `Whether to broadcast a message when the player joins.`,
        },
        message: {
          desc: `The join message of the player.`,
        },
      },
      quit: {
        enabled: {
          desc: `Whether to broadcast a message when the player quits.`,
        },
        message: {
          desc: `The quit message of the player.`,
        },
      },
    },
    "disable-world-data-saving": {
      worlds: {
        desc: `Worlds listed here will skip the world saving.<br>
                    Changes in chunks/entities of these worlds remain in memory until the chunk is unloaded or the server is restarted, and will not be written to the disk.<br>
                    This is for PVP/practice servers, where changes in the combat area are non-persistent and don't need to be saved.`,
      },
    },
    "including-5s-in-get-tps": {
      desc: `Whether to include 5-second TPS in the result of API \`Bukkit#getTPS\` and \`Server#getTPS\`.<br>
                Commands like \`/tps\` display it regardless.<br>
                <ul>
                <li>If set to \`true\`, you can use the \`getTPS\` method to get a TPS long array with 4 elements \`[5s, 1m, 5m, 15m]\`.</li>
                <li>If set to \`false\`, you can use the \`getTPS\` method to get a TPS long array with 3 elements \`[1m, 5m, 15m]\`.</li>
                </ul>
                <br>
                <div class="tip custom-block">
                <p class="custom-block-title custom-block-title-default">Want to Go Deeper?</p>
                If you are using the Leaf API for your plugins. Or running on Leaf and using reflection to get TPS, you can use \`Bukkit#getTPSIncluding5SecondAverage\`, to get the TPS array including 5-second TPS \`[5s, 1m, 5m, 15m]\`.<br>
                Also, you can use \`Bukkit#get5SecondTPSAverage\` to get the average value of 5-second TPS in \`double\`.
                </div>`,
    },
    "region-format": {
      __desc__: `Linear is a region format that uses [zstd compression](https://facebook.github.io/zstd/) instead of zlib in vanilla Minecraft. This format saves about ~50% of disk space and improves chunk load/save throughput, especially when addressing I/O bottlenecks for extremely large worlds.<br>
                [Region Converter](https://github.com/LuminolMC/region_converter) is here for converting your worlds between various formats, such as Minecraft Anvil, Linear, or Buffered Linear.<br>`,
      "format-name": {
        desc: `The format used for saving chunk data in region files.<br>
                    <br>
                    Available region formats:
                    <table>
                    <tr><th>Format</th><th>Description</th></tr>
                    <tr><td><code>MCA</code></td><td>Standard Minecraft ANVIL format using zlib compression.</td></tr>
                    <tr><td><code>B_LINEAR</code></td><td>Buffered Linear (or \`blinear\` for short) is a region format developed by [Luminol](https://github.com/LuminolMC/Luminol) and is currently on v3. Compared with Linear v2, it replaces the original Linear format's in-memory buffer with a swap-file-based design, and provides lower memory usage and faster chunk loading.</td></tr>
                    <tr><td><code>LINEAR_V2</code></td><td>Linear v2 implementation originates from [Xymb](https://github.com/xymb-endcrystalme)'s [Abomination](https://github.com/xymb-endcrystalme/Abomination). It is compatible with both v1 and v2 region files. Region files in the v1 format are automatically converted to v2 when loaded.</td></tr>
                    </table>
                    If set to \`MCA\`, this \`region-format\` option will be disabled.<br>
                    <br>
                    Due to Linear v2 having many design flaws and being very dangerous to production, we strongly recommend that you use Buffered Linear.`,
      },
      "compress-level": {
        desc: `The compression level of the linear region format file.
                    <ul>
                    <li>If set to a higher level (up to \`22\`), it provides better compression ratios but requires significantly more CPU time for compression.</li>
                    <li>If set to a lower level, it compresses faster, but requires more space. The level \`1\` uses the fastest and lightest compression.</li>
                    </ul>`,
      },
      "io-thread-count": {
        desc: `The worker thread count of linear region format.`,
      },
      "io-flush-delay": {
        desc: `When it will be flushed to the region file when there have been no write operations.<br>
                    (Unit: millisecond)<br>
                    <br>
                    If set to \`-1\`, it will use default values below.
                    <table>
                    <tr><td><b>Default Values</b></td><td></td></tr>
                    <tr><td><i>B_LINEAR</i></td><td><code>3000</code></td></tr>
                    <tr><td><i>LINEAR_V2</i></td><td><code>100</code></td></tr>
                    </table>`,
      },
      "linear-use-virtual-thread": {
        desc: `Whether to use the [Virtual Thread](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html) introduced in Java 21 for linear region format.<br>
                This only has any effect if \`format-name\` above is \`LINEAR_V2\`.<br>
                <br>
                __⚡Recommended value: \`true\`__`,
      },
    },
    "lag-compensation": {
      "enable-for-lava": {
        desc: `Whether to enable lag compensation for lava flowing.<br>
                    <br>
                    __⚡Recommended value: \`true\`__`,
      },
      "enable-for-water": {
        desc: `Whether to enable lag compensation for water flowing.<br>
                    <br>
                    __⚡Recommended value: \`true\`__`,
      },
      enabled: {
        desc: `The lag compensation is designed to mitigate the gameplay impact of server lag spikes or low TPS situations, which could ensure the basic game experience for players during the lag.<br>
                    <br>
                    __⚡Recommended value: \`true\`__`,
      },
    },
    message: {
      "unknown-command": {
        desc: `The unknown command message will be sent to the player if they execute an unknown command.<br>
                    The message needs to use the [MiniMessage](https://docs.papermc.io/adventure/minimessage/format/) format.<br>
                    If set to \`default\`, the vanilla unknown command message will be used.<br>
                    <br>
                    Available placeholders:
                    <ul>
                    <li>__\`<detail>\`__ - the detailed information of the unknown command.</li>
                    </ul>
                    <br>
                    <div class="tip custom-block">
                    <p class="custom-block-title custom-block-title-default">API / Plugin Friendly</p>
                    This feature is API / plugin-friendly. It means that this message can be overridden by plugins using \`UnknownCommandEvent#message\` or \`UnknownCommandEvent#setMessage\`.
                    </div>`,
      },
    },
    rebrand: {
      "server-gui-name": {
        desc: `The title displayed on the server GUI window, if you launched the server without adding the \`--nogui\` option in the startup flag.`,
      },
      "server-mod-name": {
        desc: `The server brand name that will be shown on the client's F3 debug menu and server MOTD.`,
      },
    },
    "remove-change-non-editable-sign-warning": {
      desc: `Whether the server prints a warning message when players try to edit the sign that they are not allowed to edit.<br>
                The warning message looks like: \`Player [...] just tried to change non-editable sign\`.<br>
                If set to \`true\`, it will prevent console spam caused by player actions or other cases.<br>
                <br>
                __⚡Recommended value: \`true\`__`,
    },
    "remove-spigot-check-bungee-config": {
      desc: `Whether the player can enter the backend server via proxy, without the backend server enabling BungeeCord mode in \`spigot.yml\`.<br>
                <br>
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">Warning</p>
                This option is not recommended to touch, unless you are sure what you are doing.<br>
                And it may be removed in the future.
                </div>`,
    },
    "secure-seed": {
      enabled: {
        desc: `Whether to use the secure seed.<br>
                    <br>
                    The secure seed ensures that all ores and structures are generated with a 1024-bit seed using a high security cryptographic hash function instead of using a 64-bit seed like in vanilla. This protects the structure seeds with computational secrecy and makes the seed cracking nearly impossible.<br>
                    <br>
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">Warning</p>
                    The secure seed fundamentally changes the positions of ore and structure compared to vanilla.<br>
                    It only applies to newly generated chunks. Thus, you must prepare a new world if you want to enable this option.<br>
                    Once this option is enabled, you can not disable it to return to the vanilla generation, unless you pre-generate the entire world, or newly generated chunks will have terrain mismatch.
                    </div>`,
      },
    },
    sentry: {
      __desc__: `[Sentry](https://sentry.io/welcome/) is an application monitor service for improved error logging and tracing. Helping the server dev team to maintain better.<br>
                <br>
                After enabling Sentry integration for your server, you don't need to audit long logs to find errors manually. Sentry can collect errors that happened in your server, enable you to track errors on Sentry's web panel, and help you to locate and fix them more easily and quickly.<br>
                <br>
                See __[How to Setup Sentry](../how-to/setup-sentry)__ to know how to set up and get the DSN key for \`sentry.dsn\` below.<br>`,
      dsn: {
        desc: `The DSN key of your Sentry.<br>
                    If an empty value \`''\` is given, the Sentry will be disabled.`,
      },
      "log-level": {
        desc: `Logs with a level higher than or equal to this level will be recorded.<br>
                    The valid values for this option are: \`"WARN"\`, \`"ERROR"\`, and \`"FATAL"\`.`,
      },
      "only-log-thrown": {
        desc: `Whether the Sentry only records the log with Java's \`Throwable\`.`,
      },
    },
    "vanilla-username-check": {
      "allow-old-players-join": {
        desc: `Whether to allow old players to join the server after the username regex is changed, even if their names don't meet the new requirements.<br>
                    <br>
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">Experimental</p>
                    Removing all username checks for old players is __UNSAFE AND DANGEROUS, USE AT YOUR OWN RISK!__
                    </div>`,
      },
      "enforce-skull-validation": {
        desc: `Whether to enforce skull validation, preventing skulls with invalid names from disconnecting the client.`,
      },
      "remove-all-check": {
        desc: `Whether to remove the vanilla username check, allowing all characters as usernames, including Chinese characters, etc.<br>
                    <br>
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">Experimental</p>
                    Removing all username checks is __UNSAFE AND DANGEROUS, USE AT YOUR OWN RISK!__
                    </div>`,
      },
      "use-username-regex": {
        desc: `Whether to use the username regex to validate usernames, allowing only characters specified in the regex.<br>
                    This option is incompatible with the \`remove-all-check\` above. You can only use one of these two options.`,
      },
      "username-regex": {
        desc: `The username regex specifies the characters allowed in usernames.<br>
                    <br>
                    For example:
                    <ul>
                    <li>If set to \`^[a-zA-Z0-9_.]*$\`, it follows behavior in vanilla, only allowing English characters, numbers, \`_\`, and \`.\` symbol in username.</li>
                    <li>If set to \`^[a-zA-Z0-9_.\\u4E00-\\u9FA5]*$\`, which the \`\\u4E00-\\u9FA5\` in regex allows Chinese characters in the username.</li>
                    </ul>
                    This only has any effect if \`use-username-regex\` above is \`true\`.`,
      },
    },
  },
  network: {
    __desc__: `This section contains features related to server networking.`,
    OptimizeNonFlushPacketSending: {
      desc: `Whether to optimize the sending of non-flushed packets by using Netty's [\`lazyExecute\`](https://netty.io/4.2/api/io/netty/util/concurrent/SingleThreadEventExecutor.html#lazyExecute(java.lang.Runnable)) method. This can reduce thread contention and wakeup calls for certain types of network operations.<br>
                <br>
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">Warning</p>
                This option is known to be __INCOMPATIBLE__ with ProtocolLib and may cause issues with other plugins that extensively manipulate network packets.<br>
                Requires restarting the server to take effect. Use with extreme caution.
                </div>`,
    },
    "async-switch-state": {
      desc: `Whether to process the connection state switch logic of the player asynchronously.<br>
                This can resolve the main thread blocking issue caused by using exploits due to vanilla logic's design flaw.<br>
                <br>
                __⚡Recommended value: \`true\`__ `,
    },
    "chat-message-signature": {
      desc: `Whether to enable chat message signature, which was introduced in Minecraft 1.19.1.<br>
                <ul>
                <li>If set to \`true\`, messages are signed and able to report just like in vanilla.</li>
                <li>If set to \`false\`, the chat signature is disabled. Players are unable to report messages, and the insecure warning pop-up will be disabled when the player joins the server.</li>
                </ul>
                <br>
                __⚡Recommended value: \`false\`__ (Only for offline-mode server or servers that have alternative moderation methods)`,
    },
    "protocol-support": {
      __desc__: `This section contains features that provide extra protocol support for some QoL / Utility mods.<br>
                <br>
                The extra protocol support is only functional if there is a corresponding client-side mod installed. It means if a specific protocol support is enabled, and a player installs that mod on the client, they can get the additional features described in each config below. But for players who have no corresponding mod installed, then everything is the same as before.<br>
                <br>
                <div class="tip custom-block">
                <p class="custom-block-title custom-block-title-default">Attention</p>
                The protocol support may cause incompatibility with the [ViaVersion](https://modrinth.com/plugin/viaversion).<br>
                We recommend players use a client that has the same version as the server core and install the latest corresponding mod; otherwise, they may be unable to join the server.
                </div>`,
      "appleskin-protocol": {
        desc: `Whether to enable [AppleSkin](https://modrinth.com/mod/appleskin) protocol support.<br>
                    If set to \`true\`, players who have the AppleSkin mod installed can display the accurate saturation/exhaustion values on the client.`,
      },
      "appleskin-protocol-sync-tick-interval": {
        desc: `How often the server should synchronize AppleSkin data to clients with AppleSkin installed.<br>
                    This only has any effect if \`appleskin-protocol\` above is \`true\`.<br>
                    (Unit: tick, default value 20 ticks = 1 second)`,
      },
      "asteorbar-protocol": {
        desc: `Whether to enable [AsteorBar](https://modrinth.com/mod/asteorbar) protocol support.<br>
                    If set to \`true\`, players who have the AsteorBar mod installed can display the accurate saturation/exhaustion values on the client.`,
      },
      "chatimage-protocol": {
        desc: `Whether to enable [ChatImage](https://modrinth.com/mod/chatimage) protocol support.<br>
                    If set to \`true\`, players who have the ChatImage mod installed can see the image sent by others using the CICode format.`,
      },
      "do-a-barrel-roll-allow-thrusting": {
        desc: `Whether to allow players to enable \`enable_thrust\` option in their client configuration.`,
      },
      "do-a-barrel-roll-force-enabled": {
        desc: `Whether to force the mod to be enabled for all players who have this mod installed, regardless of their client configuration.`,
      },
      "do-a-barrel-roll-force-installed": {
        desc: `Whether to reject players who join if they don't have this mod installed in their clients.`,
      },
      "do-a-barrel-roll-installed-timeout": {
        desc: `The amount of time to wait for a client to respond to the \`do_a_barrel_roll:config_sync\` packet.<br>
                    (Unit: tick)<br>
                    If set to \`true\`, players who have not installed this mod in their clients will be kicked after this timeout is reached.`,
      },
      "do-a-barrel-roll-protocol": {
        desc: `Whether to enable [Do a Barrel Roll](https://modrinth.com/mod/do-a-barrel-roll) protocol support.<br>
                    If set to \`true\`, the visual effects of Do a Barrel Roll can be synchronized to other players who have this mod installed.`,
      },
      "jade-protocol": {
        desc: `Whether to enable [Jade](https://modrinth.com/mod/jade) protocol support.<br>
                    If set to \`true\`, players who have the Jade mod installed can display item information inside the storage container, progress of the furnace, brewing stand, foods on the campfire, bee data in the beehive, and more vanilla-friendly features.`,
      },
      "strict-mode": {
        desc: `Whether to throw the error instead of logging it when an exception happens while handling Leaves's protocol features.`,
      },
      "syncmatica-protocol": {
        desc: `Whether to enable [Syncmatica](https://modrinth.com/mod/syncmatica) protocol support.<br>
                    If set to \`true\`, players who have Syncmatica mod installed can upload their [Litematica](https://modrinth.com/mod/litematica) schematic files or download shared schematics files from the server. Every player with the Syncmatica mod installed can access shared schematics uploaded by others.`,
      },
      "syncmatica-quota": {
        desc: `Whether to enable the maximum file size limit for each shared schematics file of the Litematica mod.`,
      },
      "syncmatica-quota-limit": {
        desc: `The maximum file size of each shared schematic file is uploaded to the server.<br>
                    (Unit: byte, default value 40,000,000 bytes ≈ 38 MB)`,
      },
      "xaero-map-protocol": {
        desc: `Whether to enable [XaeroMap](https://modrinth.com/mod/xaeros-minimap) protocol support.<br>
                    If set to \`true\`, players who have Xaero's MiniMap mod or Xaero's WorldMap mod installed can store players' coordinate points and death points based on the server's \`protocol-support.xaero-map-server-id\` below.`,
      },
      "xaero-map-server-id": {
        desc: `Unique number ID for XaeroMap to identify the server.<br>
                    This can prevent points from being deleted/refreshed if the server name or IP address changes. Change this value if needed.<br>
                    This value will be generated randomly on the first server start.`,
      },
    },
  },
  performance: {
    __desc__: `This section contains performance tuning intended to reduce unnecessary calculations or use more efficient methods to optimize the server.`,
    "cache-biome": {
      advancements: {
        desc: `Whether to cache the biome in player advancement calculation logic.<br>
                    <br>
                    __⚡Recommended value: \`true\`__`,
      },
      enabled: {
        desc: `Whether to cache the biome data of the block location, instead of recalculating the biome every time searching.<br>
                    <br>
                    __⚡Recommended value: \`true\` (Also requires enabling options below)__`,
      },
      "mob-spawning": {
        desc: `Whether to cache the biome in mob spawning logic.<br>
                    <br>
                    __⚡Recommended value: \`true\`__`,
      },
    },
    "check-survival-before-growth": {
      "cactus-check-survival": {
        desc: `Whether to check if the cactus can survive before trying to grow.<br>
                    This can help improve performance if huge cactus farms exist on the server.<br>
                    <br>
                    __⚡Recommended value: \`true\`__`,
      },
    },
    "create-snapshot-on-retrieving-blockstate": {
      desc: `Whether to create a snapshot (copy) of \`BlockEntity\` / \`BlockState\` data by default when plugins retrieve them.<br>
                <br>
                Some plugins may call \`getInventory().getHolder()\` to get the holder of an inventory, which involves accessing the BlockState.<br>
                For example, if there are tons of hoppers and plugins, call this method when listening to some events (e.g., hopper related events, call frequently). Re-creating BlockState and parsing item stacks in massive and frequent calls are very expensive.<br>
                See Paper's [API-to-get-a-BlockState-without-a-snapshot.patch#L6](https://github.com/PaperMC/Paper-archive/blob/b48403bd69f534ffd43fe2afb4e8e1f1ffa95fe1/patches/server/0160-API-to-get-a-BlockState-without-a-snapshot.patch#L6) for more information.
                <ul>
                <li>If set to \`true\`, it always creates a snapshot (copy) of BlockState when the plugin calls related methods.</li>
                <li>If set to \`false\`, it gets the real BlockState directly unless the plugin explicitly requests a snapshot. Performance improves, but there is a risk that the block state gets modified due to the plugin's poor design.</li>
                </ul>
                <br>
                __⚡Recommended value: \`false\` (Only if you encounter specific lag described above)__`,
    },
    dab: {
      __desc__: `Dynamic Activation of Brain, also known as DAB, optimizes the brain of entities by decreasing the frequency of their brain ticking when they are far away from players. It is a worthwhile trade-off to improve performance if there are many entities.`,
      "activation-dist-mod": {
        desc: `The tick frequency that defines how much distance modifies an entity's tick frequency. \`freq = (distanceToPlayer^2) / (2^value)\`.
                    <ul>
                    <li>If you want entities further away to tick __less__ often, try \`7\`.</li>
                    <li>If you want entities further away to tick __more__ often, try \`9\`.</li>
                    </ul>
                    <br>
                    __⚡Recommended value: \`7\`__`,
      },
      "blacklisted-entities": {
        desc: `A list of entity types that will not be affected by DAB.<br>
                    <br>
                    Some survival servers have mob farms, which need mobs to have a target. This kind of "pathfinding" mob farm may be broken by DAB. This situation can be solved by adding specific mobs of the mob farm to this DAB blacklist.<br>
                    If some specific mob farms are broken in your server, mobs freeze and don't move, and you are not sure whether it is caused by DAB. You can try to add them to this blacklist to see if it fixes the issue.<br>
                    <br>
                    Format: \`[villager]\` or \`[villager, zombified_piglin]\` (You can find all entity types in [Paper's Javadoc](https://jd.papermc.io/paper/1.21.11/org/bukkit/entity/EntityType.html)).<br>
                    <br>
                    [💡 Want to Go Deeper?](guides/dab-blacklist-format)`,
      },
      "dont-enable-if-in-water": {
        desc: `Whether the non-aquatic entities in the water will be excluded by DAB. This can fix [Pufferfish#58](https://github.com/pufferfish-gg/Pufferfish/issues/58).<br>
                    If set to \`true\`, this could fix entities suffocating in the water if they are far from the player.<br>
                    <br>
                    __⚡Recommended value: \`true\`__`,
      },
      enabled: {
        desc: `Whether to enable the DAB.<br>
                    <br>
                    __⚡Recommended value: \`true\`__
                    <table>
                    <tr><td><b>Values for goals</b></td><td></td></tr>
                    <tr><td><i>Optimization</i></td><td><code>true</code></td></tr>
                    <tr><td><i>Vanilla behavior</i></td><td><code>false</code> (or see <code>dab.blacklisted-entities</code> below for more)</td></tr>
                    </table>`,
      },
      "max-tick-freq": {
        desc: `The maximum tick time defines how often the furthest entity will get their pathfinders and behaviors ticked.<br>
                    (Unit: tick, default value 20 ticks = 1s)`,
      },
      "start-distance": {
        desc: `The distance determines how far away an entity has to be from the player to start being affected by DAB.<br>
                    (Unit: block)<br>
                    <br>
                    __⚡Recommended value: \`8\`__`,
      },
    },
    datapack: {
      "skip-inactive-entity-for-execute-command": {
        desc: `Whether to skip selecting inactive entities when using the execute command.<br>
                    This can improve performance on servers with massive datapack functions.`,
      },
    },
    "despawn-time": {
      "proactive-weak-loading-despawn": {
        desc: `Whether to enable proactive despawn check for weak-loaded entities.<br>
                    This can help reduce lag caused by loading and ticking a large amount of cumulative entities left in weak-loaded chunks.<br>
                    This only has any effect if the [despawn-time](https://docs.papermc.io/paper/reference/world-configuration/#entities_spawning_despawn_time__entity_type_) option is configured in the Paper world config.
                    <br>
                    __⚡Recommended value: \`true\`__<br>
                    <br>
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">Experimental</p>
                    Experimental feature, actively testing, please report any bugs you encounter.
                    </div>`,
      },
    },
    "dont-save-entity": {
      "dont-save-falling-block": {
        desc: `Whether to disable saving falling blocks on chunk unloads.<br>
                    This can prevent potential issues with glitched or duplicated falling blocks (sand, gravel, etc.) after server restarts or chunk loads, especially if caused by lag.<br>
                    <br>
                    __⚡Recommended value: \`true\`__`,
      },
      "dont-save-primed-tnt": {
        desc: `Whether to disable saving primed TNT on chunk unloads.<br>
                    This can prevent machines or redstone builds from being exploded by TNT when the player accidentally disconnects or when the chunk unloads when the player is far away. Useful for redstone/technical/survival servers that have machines involving TNTs.<br>
                    <br>
                    __⚡Recommended value: \`true\`__`,
      },
    },
    "enable-cached-minecraft-to-bukkit-entitytype-convert": {
      desc: `Whether to cache the result of *Minecraft EntityType* to *Bukkit EntityType* conversion. This conversion can be somewhat expensive, especially in the spawning logic, so caching it can improve performance slightly.<br>
                <br>
                __⚡Recommended value: \`true\`__`,
    },
    "entity-goal": {
      "start-tick-chance": {
        __desc__: `How often are the common mob goal attempts calculated.<br>
                    In vanilla, the goal checks every tick whether the goal can start. By increasing the values below to throttle the checks, which can improve performance significantly, but may have minor gameplay implications.<br>
                    If set to \`-1\`, it follows the tick frequency as vanilla does.<br>
                    <br>
                    __⚡Recommended values:__
                    <table>
                    <thead><tr><th>Entity Goal</th><th>Start Tick Chance</th></tr></thead>
                    <tbody>
                    <tr><td>nearest-attackable-target</td><td>20</td></tr>
                    <tr><td>follow-parent</td><td>20</td></tr>
                    <tr><td>avoid-entity</td><td>20</td></tr>
                    <tr><td>temptation</td><td>20</td></tr>
                    <tr><td>enderman-look-for-player</td><td>20</td></tr>
                    </tbody></table>`,
        "avoid-entity": {
          desc: `How often does the __avoid entity__ goal attempt to start running for an entity.`,
        },
        "enderman-look-for-player": {
          desc: `How often does the __look for player__ goal attempt to start running for an enderman.`,
        },
        "follow-parent": {
          desc: `How often does the __follow parent__ goal attempt to start running for an entity.`,
        },
        "nearest-attackable-target": {
          desc: `How often does the __nearest attackable target__ goal attempt to start running for an entity.`,
        },
        temptation: {
          desc: `How often does the __temptation__ goal attempt to start running for an entity.`,
        },
      },
    },
    "fast-biome-manager-seed-obfuscation": {
      enabled: {
        desc: `Whether to replace vanilla SHA-256 seed obfuscation in \`BiomeManager\` with XXHash.<br>
                    <br>
                    __⚡Recommended value: \`true\`__`,
      },
      "seed-obfuscation-key": {
        desc: `Seed obfuscation key for XXHash.<br>
                    This value will be generated randomly on the first server start.`,
      },
    },
    "faster-random-generator": {
      "enable-for-worldgen": {
        desc: `Whether to use the faster random generator for world generation.<br>
                    <ul>
                    <li>If set to \`true\`, \`Random\` calls involved in world generation will use the faster random generator you chose in \`random-generator\` above. The world generation will be slightly different from vanilla.</li>
                    <li>If set to \`false\`, \`Random\` calls involved in world generation will use legacy random generator of vanilla.</li>
                    </ul>
                    <br>
                    __⚡Recommended value: \`true\`__
                    <table>
                    <tr><td><b>Values for goals</b></td><td></td></tr>
                    <tr><td><i>Optimization</i></td><td><code>true</code></td></tr>
                    <tr><td><i>Vanilla behavior</i></td><td><code>false</code></td></tr>
                    </table>
                    <br>
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">Warning</p>
                    This will affect world generation. The terrain and other results of world generation will be slightly different from vanilla.
                    </div>`,
      },
      enabled: {
        desc: `Whether to use the faster random generator introduced in Java 17 (\`Xoroshiro128PlusPlus\`).<br>
                    Random is used almost everywhere in Minecraft, enabling this can get a decent performance improvement.<br>
                    <br>
                    __⚡Recommended value: \`true\`__<br>
                    <br>
                    <div class="tip custom-block">
                    <p class="custom-block-title custom-block-title-default">Attention</p>
                    This requires a JVM that supports \`Xoroshiro128PlusPlus\`. Some JREs don't support it.
                    </div>`,
      },
      "use-legacy-random-for-slime-chunk": {
        desc: `Whether to use legacy random source (\`java.util.Random\`) for slime chunk generation to follow the vanilla behavior.<br>
                    If your server has existing slime farms or related facilities that need slime chunk, enable this; otherwise, the location of slime chunk will be offset.<br>
                    <br>
                    __⚡Recommended value: (Depends on your server type, see \`Values for goals\` below for more)__
                    <table>
                    <tr><td><b>Values for goals</b></td><td></td></tr>
                    <tr><td><i>Optimization</i></td><td><code>false</code></td></tr>
                    <tr><td><i>Vanilla behavior</i></td><td><code>true</code></td></tr>
                    </table>`,
      },
      "warn-for-slime-chunk": {
        desc: `Whether the server prints a warning message on startup if the faster random generator for slime chunk generation is enabled.`,
      },
    },
    "faster-structure-gen-future-sequencing": {
      desc: `Whether to use faster task sequencing for generating structures.<br>
                <br>
                __⚡Recommended value: \`true\`__<br>
                <br>
                <div class="tip custom-block">
                <p class="custom-block-title custom-block-title-default">Attention</p>
                This may cause the inconsistent order of future compose tasks in rare edge cases, which may lead to different structure generation results.
                </div>`,
    },
    "only-tick-items-in-hand": {
      desc: `Whether to tick or update items only if the player holds them in the main hand or offhand, instead of ticking the entire inventory.<br>
                This currently only affects the ticking of compass and map item.<br>
                <br>
                __⚡Recommended value: \`true\`__`,
    },
    "optimize-block-entities": {
      desc: `Whether to use the more efficient map data structure for block entity ticker storage.<br>
                <br>
                __⚡Recommended value: \`true\`__`,
    },
    "optimize-mob-despawn": {
      desc: `Whether to use more efficient logic for mob natural despawn.<br>
                This can prevent the expensive cost of the vanilla despawn logic that iterates over every player, then compares the distance between the mobs and the player.<br>
                <br>
                It's recommended to add [\`-DLeaf.enableFMA=true\`](system-properties#dleaf-enablefma) flag for better performance.<br>
                <br>
                __⚡Recommended value: \`true\`__<br>
                <br>
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">Experimental</p>
                Experimental feature, actively testing, please report any bugs you encounter.
                </div>`,
    },
    "optimize-mob-spawning": {
      desc: `Whether to use a more efficient data structure for collecting spawning chunks and nearest player lookup.<br>
                <br>
                __⚡Recommended value: \`true\`__
                <br>
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">Experimental</p>
                Experimental feature, actively testing, please report any bugs you encounter.
                </div>`,
    },
    "optimize-no-action-time": {
      "disable-light-check": {
        desc: `Whether to skip the light check in the monster's \`noActionTime\` update.<br>
                    Directly increment the \`noActionTime\` counter by 1 without checking the light level on every entity ticking. In vanilla, the counter increases by 2 if the monster is in a place where the light level is higher than a specific value.<br>
                    <br>
                    __⚡Recommended value: \`true\`__
                    <table>
                    <tr><td><b>Values for goals</b></td><td></td></tr>
                    <tr><td><i>Optimization</i></td><td><code>true</code></td></tr>
                    <tr><td><i>Vanilla behavior</i></td><td><code>false</code></td></tr>
                    </table>
                    <br>
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">Experimental</p>
                    Experimental feature, actively testing, please report any bugs you encounter.
                    </div>`,
      },
    },
    "optimize-player-movement": {
      desc: `Whether to skip unnecessary block edge checks on player moving and avoid redundant view distance updates.<br>
                <br>
                __⚡Recommended value: \`true\`__`,
    },
    "optimize-random-tick": {
      desc: `Whether to use the rewritten random ticking system.<br>
                <br>
                This rewritten random ticking system uses weighted statistics and sampling to select tickable blocks in active chunks. It can reduce the unnecessary cost caused by frequently selecting non-tickable locations in the vanilla random ticking logic.<br>
                <br>
                __⚡Recommended value: \`true\`__<br>
                <br>
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">Experimental</p>
                Experimental feature, actively testing, please report any bugs you encounter.
                </div>`,
    },
    "optimize-waypoint": {
      desc: `Whether to update the player's waypoint tracking data only when their block positions change.<br>
                <br>
                __⚡Recommended value: \`true\`__<br>
                <br>
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">Experimental</p>
                Experimental feature, actively testing, please report any bugs you encounter.
                </div>`,
    },
    "optimized-powered-rails": {
      desc: `Whether to use optimized powered rails.<br>
                Uses a fully rewritten version of powered rail iteration logic, which also keeps vanilla behavior, and can achieve 4x faster performance.<br>
                The implementation is originally based on the fabric mod [FX's Rail Optimization](https://modrinth.com/mod/rail-optimization) made by [Fx Morin](https://github.com/FxMorin).<br>
                <br>
                __⚡Recommended value: \`true\`__`,
    },
    "reduce-packets": {
      __desc__: `This section is for the useless packet-reducing features.`,
      "disable-useless-particles": {
        desc: `Whether to disable server-side logic for cosmetic particles (Sprint, Death, Effect, Water Splash, and Bubble Column).<br>
                    As the client displays most of these particles already, the server-side particle logic is not needed. Enabling this option saves network bandwidth and server load.<br>
                    <br>
                    __⚡Recommended value: \`true\`__`,
      },
      "reduce-entity-motion-packets": {
        desc: `Whether to filter useless entity motion packets (\`ClientboundSetEntityMotionPacket\`).<br>
                    This can significantly reduce network (Netty) usage by up to ~60% on larger servers, while carefully filtering to ensure there are no visual side effects on the client.<br>
                    <br>
                    __⚡Recommended value: \`true\`__`,
      },
      "reduce-entity-move-packets": {
        desc: `Whether to reduce the useless entity movement packets sent to players (e.g., small movements).<br>
                    This can save bandwidth and reduce client-side processing load, potentially to make movement appear smoother during high entity counts or minor lag.<br>
                    <br>
                    __⚡Recommended value: \`true\`__`,
      },
    },
    "reuse-random-ticking-blockpos": {
      desc: `Whether to reuse part of the blockpos instance during random block ticking.<br>
                This can avoid unnecessary memory allocation and reduce GC overhead slightly during a large amount of random block ticking.<br>
                <br>
                __⚡Recommended value: \`false\`__<br>
                <br>
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">Experimental</p>
                Experimental feature, actively testing. It may conflict with some plugins or cause ticking positions to be offset. Please use with caution and report any bugs you encounter.
                </div>`,
    },
    "skip-ai-for-non-aware-mob": {
      desc: `Whether to skip AI ticks entirely for mobs that are both _inactive_ and _unaware_.<br>
                Unaware mobs optimized this way will not perform self actions or react until they become active again, see [Mob.html#setAware(boolean)](https://jd.papermc.io/paper/1.21.11/org/bukkit/entity/Mob.html#setAware(boolean)) for more information.<br>
                <br>
                __⚡Recommended value: \`true\`__
                <table>
                <tr><td><b>Values for goals</b></td><td></td></tr>
                <tr><td><i>Optimization</i></td><td><code>true</code></td></tr>
                <tr><td><i>Vanilla behavior</i></td><td><code>false</code></td></tr>
                </table>`,
    },
    "skip-map-item-data-updates-if-map-does-not-have-craftmaprenderer": {
      desc: `Whether to skip updating map item data if the map doesn't have a renderer (\`CraftMapRenderer\`).<br>
                This can improve performance if using ImageMap kind of plugins that create many custom maps.<br>
                <br>
                __⚡Recommended value: \`true\`__
                <table>
                <tr><td><b>Values for goals</b></td><td></td></tr>
                <tr><td><i>Optimization</i></td><td><code>true</code></td></tr>
                <tr><td><i>Vanilla behavior</i></td><td><code>false</code></td></tr>
                </table>
                <br>
                <div class="tip custom-block">
                <p class="custom-block-title custom-block-title-default">Attention</p>
                This may cause vanilla map item data to stop being updated.
                </div>`,
    },
    "sleeping-block-entity": {
      desc: `Whether to use [Lithium](https://modrinth.com/mod/lithium)'s sleeping block entity optimization.<br>
                Block entities like hoppers will not tick if they are inactive. They will be woken up and ticked again when they receive new activities.<br>
                This can help reduce lag on servers that have many hoppers or other block entities.<br>
                <br>
                __⚡Recommended value: \`true\`__`,
    },
    "throttle-mob-spawning": {
      ambient: {
        "min-failed": {
          desc: `The minimum failed spawn attempt for ambient mobs (bats).`,
        },
        "spawn-chance": {
          desc: `The spawn chance of ambient mobs (bats) after reaching the \`min-failed\` value above.`,
        },
      },
      axolotls: {
        "min-failed": {
          desc: `The minimum failed spawn attempt for axolotls.`,
        },
        "spawn-chance": {
          desc: `The spawn chance of axolotls after reaching the \`min-failed\` value above.`,
        },
      },
      creature: {
        "min-failed": {
          desc: `The minimum failed spawn attempt for passive creatures (animals).`,
        },
        "spawn-chance": {
          desc: `The spawn chance of passive creatures (animals) after reaching the \`min-failed\` value above.`,
        },
      },
      enabled: {
        desc: `Whether to skip mob spawning in chunks that have repeatedly failed to spawn mobs beyond the configured \`min-failed\` value.<br>
                    Once the minimum number of failed spawn attempts is reached, the server will use the configured percentage of \`spawn-chance\`% to throttle specific mob spawn attempts.<br>
                    Valid range for \`spawn-chance\` is 0.0 to 100.0.<br>
                    Failed spawn attempts will not be counted if spawn limits are reached, and the failure counter will be reset after a successful spawn.`,
      },
      monster: {
        "min-failed": {
          desc: `The minimum failed spawn attempt for hostile monsters.`,
        },
        "spawn-chance": {
          desc: `The spawn chance of hostile monsters after reaching the \`min-failed\` value above.`,
        },
      },
      underground_water_creature: {
        "min-failed": {
          desc: `The minimum failed spawn attempt for underground water creatures (glow squid).`,
        },
        "spawn-chance": {
          desc: `The spawn chance of underground water creatures (glow squid) after reaching the \`min-failed\` value above.`,
        },
      },
      water_ambient: {
        "min-failed": {
          desc: `The minimum failed spawn attempt for ambient water mobs (tropical fish).`,
        },
        "spawn-chance": {
          desc: `The spawn chance of ambient water mobs (tropical fish) after reaching the \`min-failed\` value above.`,
        },
      },
      water_creature: {
        "min-failed": {
          desc: `The minimum failed spawn attempt for water creatures (squid, dolphins).`,
        },
        "spawn-chance": {
          desc: `The spawn chance of water creatures (squid, dolphins) after reaching the \`min-failed\` value above.`,
        },
      },
    },
    "use-virtual-thread": {
      "async-chat-executor": {
        desc: `Whether to use the [Virtual Thread](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html) introduced in Java 21 for the __Async Chat Executor__.<br>
                <br>
                __⚡Recommended value: \`true\`__`,
      },
      "auth-pool": {
        desc: `Whether to use the [Virtual Thread](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html) introduced in Java 21 for user authentication, which handles premium player join verification.<br>
                <br>
                __⚡Recommended value: \`true\`__`,
      },
      "bukkit-async-scheduler": {
        desc: `Whether to use the [Virtual Thread](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html) introduced in Java 21 for the __CraftAsyncScheduler__, which could improve the performance of plugins that heavily utilize the Bukkit async scheduler.<br>
                <br>
                __⚡Recommended value: \`true\` (Only if all plugins support Virtual Thread)__`,
      },
      "download-pool": {
        desc: `Whether to use the [Virtual Thread](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html) introduced in Java 21 for fetching player profiles and skull skins.<br>
                <br>
                __⚡Recommended value: \`false\`__`,
      },
      "folia-async-scheduler": {
        desc: `Whether to use the [Virtual Thread](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html) introduced in Java 21 for the __FoliaAsyncScheduler__, which could improve the performance of plugins that heavily utilize the Folia async scheduler.<br>
                <br>
                __⚡Recommended value: \`true\` (Only if all plugins support Virtual Thread)__`,
      },
      "paper-configuration-pool": {
        desc: `Whether to use the [Virtual Thread](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html) introduced in Java 21 for Paper's task pool during the Minecraft configuration phase.<br>
                <br>
                __⚡Recommended value: \`true\`__`,
      },
    },
  },
}

export default leafGlobalLatestEn
