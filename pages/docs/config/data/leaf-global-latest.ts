import type { ConfigRoot } from "@/.vitepress/theme/components/config/types";

const config: ConfigRoot = {
    "config-version": {
        default: "3.0"
    },

    async: {
        __desc__:
            "This section contains asynchronous features intended to reduce the load on the main thread (Server Thread) by processing tasks asynchronously.",
        "async-chunk-send": {
            enabled: {
                default: false,
                desc: `Whether to make chunk packets packing and sending asynchronously.<br>
                    This can significantly reduce main thread load, especially when many players are loading chunks simultaneously (e.g., joining, teleporting, flying fast).<br>
                    <br>
                    __⚡Recommended value: \`true\`__`
            }
        },
        "async-mob-spawning": {
            enabled: {
                default: true,
                desc: `Whether to make mob spawning asynchronously.<br>
                    <br>
                    On servers with many entities, this can improve performance by up to ~15%. You must have Paper's \`per-player-mob-spawns\` config set to \`true\` for this to work.<br>
                    One quick note: this does not actually spawn mobs async (that would be very unsafe). This just offloads some expensive calculations that are required for mob spawning.<br>
                    <br>
                    __⚡Recommended value: \`true\`__`
            }
        },
        "async-pathfinding": {
            enabled: {
                default: false,
                desc: `Whether to make mob pathfinding calculation asynchronously.<br>
                    <br>
                    __⚡Recommended value: \`true\`__`
            },
            "max-threads": {
                default: 0,
                desc: `Maximum number of threads for async entity pathfinding to use.<br>
                    If the value is set to \`0\`, it automatically uses 1/4 of the number of CPU cores and minimum 1.<br>
                    <br>
                    __⚡Recommended value: 1/3 of CPU cores__`
            },
            keepalive: {
                default: 60,
                desc: `Thread keepalive time, threads with no tasks will be terminated if they exceed the time.<br>
                    (Unit: second)`
            },
            "queue-size": {
                default: 0,
                desc: `Maximum size of the queue for pending entity tracking tasks.<br>
                    If set to &leq; \`0\`, the queue size is dynamically calculated as \`max-threads * 256\`.`
            },
            "reject-policy": {
                default: "CALLER_RUNS",
                desc: `The policy to use when the pathfinding task queue is full and a new task is submitted.<br>
                <ul>
                <li>\`FLUSH_ALL\`: All pending tasks in the queue are immediately run on the server thread.</li>
                <li>\`CALLER_RUNS\`: The incoming submitted task will be ran on the server thread.</li>
                </ul>
                <br>
                __⚡Recommended value: \`CALLER_RUNS\`__`
            }
        },
        "async-playerdata-save": {
            enabled: {
                default: false,
                desc: `Whether to make player data saving asynchronously. (I/O operations are expensive)
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">Warning</p>
                    Experimental feature, may cause data lost or data inconsistency in some circumstances!
                    </div>`
            }
        },
        "async-entity-tracker": {
            enabled: {
                default: false,
                desc: `Whether to make entity tracking asynchronously.<br>
                    This can improve performance significantly, especially in some massive entities in small area situations.<br>
                    <br>
                    __⚡Recommended value: \`true\`__
                    <div class="tip custom-block">
                    <p class="custom-block-title custom-block-title-default">Attention</p>
                    Experimental feature, actively testing, please report any bugs you encoutered.
                    </div>`
            },
            threads: {
                default: 0,
                desc: `Maximum number of threads for async entity tracker to use.<br>
                    If the value is set to \`0\`, it automatically uses 1/4 of the number of CPU cores and minimum 1.<br>
                    <br>
                    __⚡Recommended value: 1/2 of CPU cores__`
            }
        },
        "parallel-world-ticking": {
            enabled: {
                default: false,
                desc: `Whether to parallel process different worlds in separate threads, which can improve performance on multi-core system.<br>
                    <br>
                    Parallel World Ticking, also called "PWT", is a concept created by [SparklyPaper](https://github.com/SparklyPower/SparklyPaper), by ticking each world in a separate thread, to reduce and split the work load in originally single thread for all worlds.<br>
                    In this PWT implementation, each world will wait until last world tick finished, read more in SparklyPaper's explanation [PARALLEL_WORLD_TICKING.md](https://github.com/SparklyPower/SparklyPaper/blob/13aff425238ea322658de0d9f4f7bd906bd9f431/docs/PARALLEL_WORLD_TICKING.md).<br>
                    <br>
                    When I should consider to try PWT?
                    <ol>
                    <li>I really can't switch to [Folia](https://papermc.io/software/folia)</li>
                    <li>I have a multi-core server</li>
                    <li>My players spread averagely in each world</li>
                    <li>(Or I have many worlds, e.g. some RPG servers)</li>
                    </ol>
                    <br>
                    __⚡Recommended value: \`true\` (Only if experience specific bottlenecks and understand the risks)__
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">Warning</p>
                    Experimental feature, potentially unsable, and may cause compatibility issue with some plugins.
                    </div>`
            },
            threads: {
                default: 8,
                desc: `Number of threads dedicated to parallel world ticking.<br>
                    <br>
                    __⚡Recommended value: same with the amount of worlds__`
            },
            "log-container-creation-stacktraces": {
                default: false,
                desc: `Whether to log stacktraces when containers (like Tile Entities or Entities) are created during parallel ticking.<br>
                    This is useful for debugging potential concurrency issues.`
            },
            "disable-hard-throw": {
                default: false,
                desc: `Whether to disable hard throws (which usually stop the server) related to parallel ticking errors.<br>
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">Warning</p>
                    This might mask underlying issues but could prevent crashes in unstable experimental phases. Use with caution.
                    </div>`
            },
            "async-unsafe-read-handling": {
                default: "BUFFERED",
                desc: `Whether to run asynchronous tasks synchronously within the parallel ticking system.<br>
                    This might be needed for plugin compatibility with certain plugins but largely negates the performance benefits of parallel ticking.<br>
                    <br>
                    __⚡Recommended value: \`BUFFERED\`__`
            }
        }
    },

    performance: {
        __desc__:
            "This section contains performance tuning intended to reduce unnecessary calculations or use more efficient methods to optimize the server.",
        "check-survival-before-growth": {
            "cactus-check-survival": {
                default: false,
                desc: `Whether to check cactus can survive before trying to grow.<br>
                    This can help improving performance if there are huge cactus farms existing in the server.<br>
                    <br>
                    __⚡Recommended value: \`true\`__`
            }
        },
        "dont-save-entity": {
            "dont-save-primed-tnt": {
                default: false,
                desc: `Whether to disable saving primed tnt on chunk unloads.<br>
                    This can prevent machines or redstone builds from being exploded by TNT when the player accidentally disconnected or chunk unloads when the player is far away. Useful for redstone/technical/survival servers which have machines involving TNTs.<br>
                    <br>
                    __⚡Recommended value: \`true\`__`
            },
            "dont-save-falling-block": {
                default: false,
                desc: `Whether to disable saving falling block on chunk unloads.<br>
                    This can prevent potential issues with glitched or duplicated falling blocks (sand, gravel, etc.) after server restarts or chunk loads, especially if caused by lag.<br>
                    <br>
                    __⚡Recommended value: \`true\`__`
            }
        },
        dab: {
            __desc__:
                "Dynamic Activation of Brain, as known as DAB, optimizes entity's brain by decreasing the frequency of their brain ticking when they are far away from players. It is a worthful trade-off to improve performance if there are many entities.",
            enabled: {
                default: false,
                desc: `Whether to enable the DAB.<br>
                    <br>
                    __⚡Recommended value: \`true\` (set \`enabled\` below to true)__
                    <table>
                    <tr><td><b>Values for goals</b></td><td></td></tr>
                    <tr><td><i>Optimization</i></td><td><code>true</code></td></tr>
                    <tr><td><i>Vanilla behavior</i></td><td><code>false</code> (or see <code>dab.blacklisted-entities</code> below for more)</td></tr>
                    </table>`
            },
            "dont-enable-if-in-water": {
                default: false,
                desc: `Whether non-aquatic entities in the water will not be affected by DAB. This can fix [Pufferfish#58](https://github.com/pufferfish-gg/Pufferfish/issues/58).<br>
                    If \`true\`, this could fix entities suffocate in the water if they are far from the player.<br>
                    <br>
                    __⚡Recommended value: \`true\`__`
            },
            "start-distance": {
                default: 12,
                desc: `The distance that determines how far away an entity has to be from the player to start being affected by DAB.<br>
                    (Unit: block)<br>
                    <br>
                    __⚡Recommended value: \`8\`__`
            },
            "max-tick-freq": {
                default: 20,
                desc: `The maximum tick time of how often the furthest entity will get their pathfinders and behaviors ticked.<br>
                    (Unit: tick, default value 20 ticks = 1s)`
            },
            "activation-dist-mod": {
                default: 8,
                desc: `The tick frequency that defines how much distance modifies an entity's tick frequency. \`freq = (distanceToPlayer^2) / (2^value)\`.
                    <ul>
                    <li>If you want entities further away to tick __less__ often, use \`7\`.</li>
                    <li>If you want entities further away to tick __more__ often, try \`9\`.</li>
                    </ul>
                    <br>
                    __⚡Recommended value: \`7\`__`
            },
            "blacklisted-entities": {
                default: `
                - villager
                - axolotl
                - hoglin
                - zombified_piglin
                - goat`,
                desc: `A list of entities that will not be affected by DAB.<br>
                    <br>
                    Some survival servers have mob farms which need mobs to have a target. This kind of "pathfinding" mob farm may break by DAB. This situation can be solved by adding specific mob of mob farm into this DAB blacklist.<br>
                    If some specific mob farms are broken in your server, mobs freeze and don't move, and you are not sure whether it is caused by DAB. You can try to add them into this blacklist to see if it fixes the issue.<br>
                    <br>
                    Format: \`[villager]\` or \`[villager, zombified_piglin]\` (You can find all entity types in [Paper's Javadoc](https://jd.papermc.io/paper/1.21.8/org/bukkit/entity/EntityType.html)).<br>
                    <br>
                    [💡 Want to Go Deeper?](guides/dab-blacklist-format)`
            }
        },
        "enable-cached-minecraft-to-bukkit-entitytype-convert": {
            default: true,
            desc: `Whether to cache the result of *Minecraft EntityType* to *Bukkit EntityType* conversion. This conversion can be somewhat expensive, especially in the spawning logic, so caching it can improve performance slightly.<br>
                <br>
                __⚡Recommended value: \`true\`__`
        },
        "fast-biome-manager-seed-obfuscation": {
            enabled: {
                default: false,
                desc: `Whether to replace vanilla SHA-256 seed obfuscation in \`BiomeManager\` with XXHash.<br>
                    <br>
                    __⚡Recommended value: \`true\`__`
            },
            "seed-obfuscation-key": {
                default: 513317,
                desc: `Seed obfuscation key for XXHash.<br>
                    This value will generate randomly on first server start.`
            }
        },
        "faster-random-generator": {
            enabled: {
                default: false,
                desc: `Whether to use the faster random generator introduced in JDK 17.<br>
                    Random is used almost everywhere in Minecraft, enable this can get a decent performance improvement.<br>
                    <br>
                    __⚡Recommended value: \`true\` (set \`enabled\` below to true)__
                    <div class="tip custom-block">
                    <p class="custom-block-title custom-block-title-default">Attention</p>
                    This requires a JVM that supports \`RandomGenerator\`. Some JREs don't support it.
                    </div>`
            },
            "random-generator": {
                default: "Xoroshiro128PlusPlus",
                desc: `The specific algorithm of the random generator should be used.<br>
                    Available random generators can be found in [Random Number Generators in Java](https://www.baeldung.com/java-17-random-number-generators#1-api-design-1) or [JEP 356](https://openjdk.org/jeps/356).<br>
                    <br>
                    __⚡Recommended value: \`Xoroshiro128PlusPlus\`__`
            },
            "enable-for-worldgen": {
                default: false,
                desc: `Whether to use the faster random generator for world generation.<br>
                    <ul>
                    <li>If \`true\`, \`Random\` calls involved in world generation will use faster random generator you chose in \`random-generator\` above. The world generation will be slightly different from vanilla.</li>
                    <li>If \`false\`, \`Random\` calls involved in world generation will use legacy random generator of vanilla.</li>
                    </ul>
                    <br>
                    __⚡Recommended value: \`true\`__
                    <table>
                    <tr><td><b>Values for goals</b></td><td></td></tr>
                    <tr><td><i>Optimization</i></td><td><code>true</code></td></tr>
                    <tr><td><i>Vanilla behavior</i></td><td><code>false</code></td></tr>
                    </table>`
            },
            "warn-for-slime-chunk": {
                default: true,
                desc: "Whether server prints a warning message on startup if enabled faster random generator for slime chunk generation."
            },
            "use-legacy-random-for-slime-chunk": {
                default: false,
                desc: `Whether to use legacy random source (\`java.util.Random\`) for slime chunk generation to follow the vanilla behavior.<br>
                    If your server has existing slime farms or related facilities need slime chunk, enable this, otherwise the location of slime chunk will offset.<br>
                    <br>
                    __⚡Recommended value:__ (Depends on your server type, see \`Values for goals\` below for more.)
                    <table>
                    <tr><td><b>Values for goals</b></td><td></td></tr>
                    <tr><td><i>Optimization</i></td><td><code>false</code></td></tr>
                    <tr><td><i>Vanilla behavior</i></td><td><code>true</code></td></tr>
                    </table>`
            },
            "use-direct-implementation": {
                default: false,
                desc: `Whether to use direct random implementation (LCG without synchronization) instead of delegating to Java's RandomGenerator.<br>
                    This may improve performance but potentially changes RNG behavior.<br>
                    <br>
                    __⚡Recommended value: \`false\`__`
            }
        },
        "faster-structure-gen-future-sequencing": {
            default: true,
            desc: `Whether to use faster task sequencing for generating structures.<br>
                <br>
                __⚡Recommended value: \`true\`__
                <div class="tip custom-block">
                <p class="custom-block-title custom-block-title-default">Attention</p>
                This may cause the inconsistent order of future compose tasks in rare edge cases which may lead to different structure generation results.
                </div>`
        },
        "cache-biome": {
            enabled: {
                default: false,
                desc: `Whether to cache biome data of block location, instead of re-calculating the biome everytime of the searching.<br>
                    <br>
                    __⚡Recommended value: \`true\`__ (Also requires to enable options below)`
            },
            "mob-spawning": {
                default: false,
                desc: `Whether to cache biome in mob spawning logic.<br>
                    <br>
                    __⚡Recommended value: \`true\`__`
            },
            advancements: {
                default: false,
                desc: `Whether to cahce biome in player advancement calculation logic.<br>
                    <br>
                    __⚡Recommended value: \`true\`__`
            }
        },
        "optimize-block-entities": {
            default: true,
            desc: `Whether to use more efficient map data structure for block entity ticker storage.<br>
                <br>
                __⚡Recommended value: \`true\`__`
        },
        "optimize-mob-despawn": {
            default: false,
            desc: `Whether to use more efficient logic for mob natural despawn.<br>
                This can prevent expensive cost of the vanilla despawn logic that iterates every player then compares the distance between mobs and the player.<br>
                <br>
                __⚡Recommended value: \`true\`__`
        },
        "only-tick-items-in-hand": {
            default: false,
            desc: `Whether to tick or update items only if player holds them in main hand or offhand, instead of ticking the entire inventory.<br>
                This currently only affects compass and map item.<br>
                <br>
                __⚡Recommended value: \`true\`__`
        },
        "optimize-no-action-time": {
            "disable-light-check": {
                default: false,
                desc: `Whether to skip light check in monster's \`noActionTime\` update.<br>
                    Directly increment \`noActionTime\` counter by 1 without checking light level on every entity ticking. In vanilla, the counter increases by 2 if the monster in a place where the light level is higher than speific value.<br>
                    <br>
                    __⚡Recommended value: \`true\`__
                    <table>
                    <tr><td><b>Values for goals</b></td><td></td></tr>
                    <tr><td><i>Optimization</i></td><td><code>true</code></td></tr>
                    <tr><td><i>Vanilla behavior</i></td><td><code>false</code></td></tr>
                    </table>`
            }
        },
        "optimize-player-movement": {
            default: true,
            desc: `Whether to skip unnecessary block edge checks on player moving and avoid redundant view distance updates.<br>
                <br>
                __⚡Recommended value: \`true\`__`
        },
        "optimize-random-tick": {
            default: false,
            desc: `Whether to use rewritten random ticking system.<br>
                <br>
                This rewritten random ticking system uses weighted statistics and sampling to select tickable blocks in active chunks. It can reduce the unnecessary cost caused by frequently selecting non-tickable location in the vanilla random ticking logic.<br>
                <br>
                __⚡Recommended value: \`true\`__`
        },
        "optimize-waypoint": {
            default: false,
            desc: `Whether to update player's waypoint tracking data only when their block positions change.<br>
                <br>
                __⚡Recommended value: \`true\`__`
        },
        "optimized-powered-rails": {
            default: false,
            desc: `Whether to use optimized powered rails. Uses fully rewritten version of powered rail iteration logic which also keeps vanilla behavior, and can achieve 4x faster performance.<br>
                <br>
                __⚡Recommended value: \`true\`__`
        },
        "reduce-packets": {
            __desc__: "This section is for the useless packet reducing features.",
            "reduce-entity-move-packets": {
                default: false,
                desc: `Whether to reduce the useless entity movement packets sent to players (e.g., small movements).<br>
                    This can save bandwidth and reduces client-side processing load, potentially making movement appear smoother during high entity counts or minor lag.<br>
                    <br>
                    __⚡Recommended value: \`true\`__`
            }
        },
        "skip-ai-for-non-aware-mob": {
            default: true,
            desc: `Whether to skip AI ticks entirely for mobs that are both *inactive* and *unaware*.<br>
                Unaware mobs optimized this way will not perform self actions or react until they become active again, see [Mob.html#setAware(boolean)](https://jd.papermc.io/paper/1.21.8/org/bukkit/entity/Mob.html#setAware(boolean)) for more information.<br>
                <br>
                __⚡Recommended value: \`true\`__
                <table>
                <tr><td><b>Values for goals</b></td><td></td></tr>
                <tr><td><i>Optimization</i></td><td><code>true</code></td></tr>
                <tr><td><i>Vanilla behavior</i></td><td><code>false</code></td></tr>
                </table>`
        },
        datapack: {
            "skip-inactive-entity-for-execute-command": {
                default: false,
                desc: `Whether to skip selecting inactive entities when using execute command.<br>
                    Tihs can improve performance on servers with massive datapack functions.`
            }
        },
        "skip-map-item-data-updates-if-map-does-not-have-craftmaprenderer": {
            default: true,
            desc: `Whether to skip updating map item data update if the map doesn't have a renderer (\`CraftMapRenderer\`).<br>
                This can improve performance if using ImageMap kind of plugins that create many custom maps.<br>
                <br>
                __⚡Recommended value: \`true\`__
                <table>
                <tr><td><b>Values for goals</b></td><td></td></tr>
                <tr><td><i>Optimization</i></td><td><code>true</code></td></tr>
                <tr><td><i>Vanilla behavior</i></td><td><code>false</code></td></tr>
                </table>
                <div class="tip custom-block">
                <p class="custom-block-title custom-block-title-default">Attention</p>
                This may cause vanilla map item data to stop be updated.
                </div>`
        },
        "throttle-hopper-when-full": {
            enabled: {
                default: false,
                desc: `Whether to throttle hopper item transfer attempts if the target container is full.<br>
                    Prevents the hopper from constantly trying to push items every tick, even if it keeps failing.<br>
                    <br>
                    __⚡Recommended value: \`true\` (set \`enabled\` below to true)__
                    <table>
                    <tr><td><b>Values for goals</b></td><td></td></tr>
                    <tr><td><i>Optimization</i></td><td><code>true</code></td></tr>
                    <tr><td><i>Vanilla behavior</i></td><td><code>false</code></td></tr>
                    </table>`
            },
            "skip-ticks": {
                default: 8,
                desc: `How many ticks a hopper should wait before trying to move items again if the target container is full.<br>
                    (Unit: tick)<br>
                    Only active if \`throttle-hopper-when-full.enabled\` (described above) is \`true\`.<br>
                    If a value &leq; \`0\` is given, this throttling feature is disabled.<br>
                    <br>
                    __⚡Recommended value: \`8\`__
                    <table>
                    <tr><td><b>Values for goals</b></td><td></td></tr>
                    <tr><td><i>Optimization</i></td><td><code>8</code></td></tr>
                    <tr><td><i>Vanilla behavior</i></td><td><code>8</code></td></tr>
                    </table>`
            }
        },
        "throttle-mob-spawning": {
            enabled: {
                default: false,
                desc: `Whether to skip mob spawning in chunks that have repeatedly failed to spawn mobs beyond the configured \`min-failed\` value.<br>
                    Once the minimum number of failed spawn attempts is reached, the server will randomly skip between 1 ~ \`spawn-chance\`% of spawn attempts in that chunk.<br>
                    Failed spawn attempts will not be counted if spawn limits are reached, and the failure counter will be reset after a successful spawn.`
            },
            monster: {
                "min-failed": {
                    default: 8,
                    desc: "The minimum failed spawn attempt for hostile monsters."
                },
                "spawn-chance": {
                    default: "25.0",
                    desc: "The spawn chance of hostile monsters after reaching `min-failed` value above."
                }
            },
            creature: {
                "min-failed": {
                    default: 8,
                    desc: "The minimum failed spawn attempt for passive creatures (animals)."
                },
                "spawn-chance": {
                    default: "25.0",
                    desc: "The spawn chance of passive creatures (animals) after reaching `min-failed` value above."
                }
            },
            ambient: {
                "min-failed": {
                    default: 8,
                    desc: "The minimum failed spawn attempt for ambient mobs (bats)."
                },
                "spawn-chance": {
                    default: "25.0",
                    desc: "The spawn chance of ambient mobs (bats) after reaching `min-failed` value above."
                }
            },
            axolotls: {
                "min-failed": {
                    default: 8,
                    desc: "The minimum failed spawn attempt for axolotls."
                },
                "spawn-chance": {
                    default: "25.0",
                    desc: "The spawn chance of axolotls after reaching `min-failed` value above."
                }
            },
            underground_water_creature: {
                "min-failed": {
                    default: 8,
                    desc: "The minimum failed spawn attempt for underground water creatures (glow squid)."
                },
                "spawn-chance": {
                    default: "25.0",
                    desc: "The spawn chance of underground water creatures (glow squid) after reaching `min-failed` value above."
                }
            },
            water_creature: {
                "min-failed": {
                    default: 8,
                    desc: "The minimum failed spawn attempt for water creatures (squid, dolphins)."
                },
                "spawn-chance": {
                    default: "25.0",
                    desc: "The spawn chance of water creatures (squid, dolphins) after reaching `min-failed` value above."
                }
            },
            water_ambient: {
                "min-failed": {
                    default: 8,
                    desc: "The minimum failed spawn attempt for ambient water mobs (tropical fish)."
                },
                "spawn-chance": {
                    default: "25.0",
                    desc: "The spawn chance of ambient water mobs (tropical fish) after reaching `min-failed` value above."
                }
            },
            misc: {
                "min-failed": {
                    default: 8,
                    desc: "The minimum failed spawn attempt for misc entities."
                },
                "spawn-chance": {
                    default: "25.0",
                    desc: "The spawn chance of misc entities after reaching `min-failed` value above."
                }
            }
        },
        "create-snapshot-on-retrieving-blockstate": {
            default: true,
            desc: `Whether to create a snapshot (copy) of TileEntity / BlockState data by default when plugins retrieve them.<br>
                <br>
                Some plugins may call \`getInventory().getHolder()\` to get the holder of an inventory, which involves accessings the BlockState.<br>
                For example, if there are tons of hoppers and plugins call this method when listening to some events (e.g. hopper related events, call frequently). Re-creating BlockState and parsing item stack in massive and frequent calls are very expensive.<br>
                See Paper's [API-to-get-a-BlockState-without-a-snapshot.patch#L6](https://github.com/PaperMC/Paper-archive/blob/b48403bd69f534ffd43fe2afb4e8e1f1ffa95fe1/patches/server/0160-API-to-get-a-BlockState-without-a-snapshot.patch#L6) for more information.
                <ul>
                <li>If \`true\`, always creates snapshot (copy) of BlockState when the plugin calls related methods.</li>
                <li>If \`false\`, gets real BlockState directly unless the plugin explicitly requests a snapshot. Performance improves, but has risk that block state gets modified due to plugin's poor design.</li>
                </ul>
                <br>
                __⚡Recommended value: \`false\` (Only if you encounter specific lag described above)__`
        },
        "use-virtual-thread-for-async-scheduler": {
            default: false,
            desc: `Whether to use the [Virtual Thread](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html) introduced in JDK 21 for the CraftAsyncScheduler, which could improve performance of plugin that heavily utilizing Bukkit's async scheduler.<br>
                <br>
                __⚡Recommended value: \`true\`__ (Only if all plugins support Virutal Thread)`
        },
        "use-virtual-thread-for-async-chat-executor": {
            default: true,
            desc: `Whether to use the [Virtual Thread](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html) introduced in JDK 21 for the Async Chat Executor.<br>
                <br>
                __⚡Recommended value: \`true\`__`
        },
        "use-virtual-thread-for-profile-executor": {
            default: false,
            desc: `Whether to use the [Virtual Thread](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html) introduced in JDK 21 for the Profile Executor, which handles player profile and skull skin fetching.<br>
                <br>
                __⚡Recommended value: \`false\`__`
        },
        "use-virtual-thread-for-user-authenticator": {
            default: true,
            desc: `Whether to use the [Virtual Thread](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html) introduced in JDK 21 for the User Authenticator service, which handles premium player join verification.<br>
                <br>
                __⚡Recommended value: \`true\`__`
        }
    },

    fixes: {
        __desc__: "This section contains bugfixes for specific issues.",
        "dont-place-player-if-server-full": {
            default: false,
            desc: `Whether to disallow players join if the server is full (defined as \`max-players\` in \`server.properties\`).<br>
                This option fixed [Paper#10668](https://github.com/PaperMC/Paper/issues/10668).<br>
                <br>
                If \`true\`, you should grant player \`purpur.joinfullserver\` permission rather than using \`PlayerLoginEvent#allow\` API allow players to bypass the limit.`
        }
    },

    "gameplay-mechanisms": {
        __desc__: "This section contains the features that modify or improve the game mechanics.",
        "afk-command": {
            enabled: {
                default: false,
                desc: `Wether to enable the AFK command based on Minecraft's built-in [idle-timeout mechanism](https://minecraft.wiki/w/Server.properties#:~:text=player%20have%20to%20idle). Players can use /afk command to switch their AFK mode, and their AFK status can be shown in Tab list.<br>
                    <br>
                    Also set \`kick-if-idle\` to \`false\` in Purpur config, to prevent players from being kicked when they enter AFK mode. Rest of AFK settings, configurable AFK messages, title messages, are in Purpur config.`
            }
        },
        "inventory-overflow-event": {
            enabled: {
                default: false,
                desc: `Whether to enable inventory overflow event. The event called when used plugin to \`Inventory#addItem\` into player's inventory and the target inventory is full.
                    <div class="tip custom-block">
                    <p class="custom-block-title custom-block-title-default">Attention</p>
                    This is not proper solution to use! Please re-design your plugin logic to use the returned map of \`Inventory#addItem\` method as soon as possible!
                    </div>`
            },
            "listener-class": {
                default: "com.example.package.PlayerInventoryOverflowEvent",
                desc: "The full listener class name which listens to this inventory overflow event. Set to your own listener class to use this event."
            }
        },
        player: {
            "max-use-item-distance": {
                default: 1.0000001,
                desc: `The maximum distance that the player is allowed to interact using an item.<br>
                    (Unit: block)<br>
                    <br>
                    Some [Anarchy servers](https://minecraftservers.org/type/anarchy) or similar type of servers may allow players to use hacks / cheats. If you want players able to use crystal related modules that are packet-based (e.g. CEV Breaker, BedAura), you may need to adjust this value.<br>
                    It's better to set value to \`10.0000001\`, to allow using related hack modules.
                    <br>
                    If a value \`-1\` is given, the check of maximum allowed distance to use an item will be disabled.<br>
                    <br>
                    __⚡Recommended value: \`10.0000001\` (Only for anarchy server)__
                    <div class="tip custom-block">
                    <p class="custom-block-title custom-block-title-default">Attention</p>
                    If set to \`-1\` or any large positive values, players can use some packet modules of hack clients, and are also able to use [Nocom Exploit](https://github.com/nerdsinspace/nocom-explanation)! Adjusting this option requires careful consideration of potential exploits.
                    </div>`
            }
        },
        "allow-tripwire-dupe": {
            default: false,
            desc: "Whether to bring back tripwire dupe ([MC-59471](https://bugs.mojang.com/browse/MC/issues/MC-59471)) which is fixed in 1.21.2's snapshots 24w33a and 24w36a. It is also known as the string dupe."
        },
        "death-item-drop-knockback": {
            "drop-around": {
                default: true,
                desc: `Whether to drop items randomly around the player on their death.
                    <ul>
                    <li>If \`true\`, items will be dropped with a randomized motion and scattered around the dead player.</li>
                    <li>If \`false\`, items will be dropped below the dead player.</li>
                    </ul>`
            },
            "horizontal-force": {
                default: 0.5,
                desc: "Base speed of horizontal velocity that applies to player's dropped items on death."
            },
            "vertical-force": {
                default: 0.2,
                desc: "Same as \`horizontal-force\`, but it is for vertical velocity."
            }
        },
        // "hide-item-component": {
        //     "hidden-types": {
        //         default: "[]",
        //         desc: `The list of component type keys that will be hidden from the client.<br>
        //             <br>
        //             See Paper Javadoc's [DataComponentTypeKeys.html](https://jd.papermc.io/paper/1.21.8/io/papermc/paper/registry/keys/DataComponentTypeKeys.html) to get the full list of available component type keys for items.<br>
        //             For example:
        //             <ul>
        //             <li>If \`[]\` is given, no item will be affected.</li>
        //             <li>If \`[\"minecraft:custom_data\"]\` is given, item's \`custom_data\` component will be hided on player's client.</li>
        //             </ul>`
        //     },
        //     "enabled": {
        //         default: false,
        //         desc: `Controls whether to hide specified component information from player's inventory sent to clients. Also see \`hidden-types\` above.<br>
        //             <br>
        //             It can be used to hide complex component data on item to reduce rendering load, frequent animations on client side and network usage. The actual item data will not be affected.<br>
        //             <br>
        //             To be noted that, this option is different from Paper's [item obfuscation](https://docs.papermc.io/paper/reference/global-configuration/#anticheat_obfuscation_items_enable_item_obfuscation). This option only hides item component data from player's own inventory, instead of hiding data sent to others.
        //             <div class="tip custom-block">
        //             <p class="custom-block-title custom-block-title-default">Attention</p>
        //             It may break resource packs, client mods, or specific gameplay mechanics that rely on these client-side component data of items. Uses with caution. You must know what components you are hiding!
        //             </div>`
        //     }
        // },
        knockback: {
            "snowball-knockback-players": {
                default: false,
                desc: "Whether the snowball can knockback players."
            },
            "egg-knockback-players": {
                default: false,
                desc: "Whether the egg can knockback players."
            },
            "can-player-knockback-zombie": {
                default: true,
                desc: "Whether the player can knockback zombies using hand, weapon, projectile, etc."
            },
            "flush-location-while-knockback-player": {
                default: false,
                desc: "Whether to send movement changes to client immedialtely, once the target player is hitted and got knockback. It can give smoother PVP gameplay experience with faster knockback responses.(WIP, TODO not sure whether need to explain update packets sending in vanilla more.)"
            },
            "old-blast-protection-explosion-knockback": {
                default: false,
                desc: `Whether to use old <= 1.20.4 explosion knockback behavior which applys on armors with blast protection enchantment.
                    <ul>
                    <li>If \`true\`, explosion knocback will be calculated based on blast protection enchantment the player has. The knockback is slightly bigger than that after 1.20.4 version.</li>
                    <li>If \`false\`, explosion knockback will follow vanilla behavior of the current version.</li>
                    </ul>`
            }
        },
        "only-player-pushable": {
            default: false,
            desc: `Whether to make only player pushable.<br>
                If \`true\`, this option will override values of related collision options in Paper's global and world config, and mobs will not be killed under the effect of [maxEntityCramming](https://minecraft.wiki/w/Game_rule#:~:text=entity%20cramming%20damage) gamerule.
                <div class="tip custom-block">
                <p class="custom-block-title custom-block-title-default">Attention</p>
                It can break mob farms which are using mob collision to push mobs to fall or killing mob by exceeding value of [maxEntityCramming](https://minecraft.wiki/w/Game_rule#:~:text=entity%20cramming%20damage) gamerule.
                </div>`
        },
        "spawner-settings": {
            enabled: {
                default: false,
                desc: "Whether to use custom spawner options below. Options below only affect spawning of spawner blocks instead of the natural spawning."
            },
            checks: {
                "light-level-check": {
                    default: false,
                    desc: `Whether to check if the light level is sufficient to spawn the mob.
                        <ul>
                        <li>If \`true\`, the spawner will attempt to spawn mobs using the same light level conditions used for natural mob spawning.</li>
                        <li>If \`false\`, the spawner will follow the vanilla behavior that attempts to spawn without checking the light level.</li>
                        </ul>`
                },
                "spawner-max-nearby-check": {
                    default: true,
                    desc: `Whether to check if there are the max amount of nearby mobs to spawn the mob. The spawner will stop spawning new mobs to prevent overcrowding.
                        <ul>
                        <li>If \`true\`, the spawner will follow the vanilla behavior that prevents to spawn new mob if nearby mob count exceeds the limit.</li>
                        <li>If \`false\`, the spawner will always attempt to spawn without checking nearby mob count.</li>
                        </ul>`
                },
                "check-for-nearby-players": {
                    default: true,
                    desc: `Whether to check if any players are in a radius to spawn the mob.
                        <ul>
                        <li>If \`true\`, the spawner will always attempt to spawn mob without checking if there is any player nearby.</li>
                        <li>If \`false\`, the spawner will attempt to spawn mob only if there is any player in the radius.</li>
                        </ul>`
                },
                "spawner-block-checks": {
                    default: false,
                    desc: "Whether to prevent spawn attempt if the spawn point is obstructed by blocks."
                },
                "water-prevent-spawn-check": {
                    default: false,
                    desc: "Whether to prevent spawn attempt if the spawn point has water."
                },
                "ignore-spawn-rules": {
                    default: false,
                    desc: `Whether to ignore additional spawn rules of mobs.<br>
                        <br>
                        Many mobs have spawn restrictions to only or prevent to spawn on specific blocks. For example, most of animals only can spawn on grass block, or the hoglin can not spawn on the nether wart block. You can find the list of additional spawn rules in [Additional Rules](https://minecraft.wiki/w/Mob_spawning#:~:text=additional%20rules).<br>
                        <br>
                        This option does not affect and separate from \`spawner-block-checks\` and \`water-prevent-spawn-check\` above.`
                }
            },
            "min-spawn-delay": {
                default: 200,
                desc: `Minimum delay between each spawn attempt of the spawner. Higher values will slow down the spawning speed of spawners.<br>
                    (Unit: tick)`
            },
            "max-spawn-delay": {
                default: 800,
                desc: `Maximum delay between each spawn attempt of the spawner. Higher values will slow down the spawning speed of spawners.<br>
                    (Unit: tick)`
            }
        },
        "use-spigot-item-merging-mechanism": {
            default: false,
            desc: `Whether to merge dropped items based on their tick sequence, which is the long-standing default behvior of Spigot.<br>
                <br>
                In Spigot, the item entity that ticks later will merge to eailer ticking one. If merge radius is relatively larger, it can prevent dropped items from getting stuck at unexcepted loctions. So that this is useful for farms or redstone builds that can create numbers of dropped items.<br>
                However, in vanilla, the item merging is based on the item count of the stack. The stack with smaller count will merge to the one with the larger count.
                <table>
                <tr><td><b>Values for goals</b></td><td></td></tr>
                <tr><td><i>SMP friendly</i></td><td><code>true</code></td></tr>
                <tr><td><i>Vanilla behavior</i></td><td><code>false</code></td></tr>
                </table>`
        }
    },

    network: {
        __desc__: "This section contains features for server networking related.",
        "async-switch-state": {
            default: false,
            desc: "Whether to process connection state switch logic of the player asynchronously. This can resolve main thread blocking issue caused by using exploits due to Vanilla logic's design flaw."
        },
        "chat-message-signature": {
            default: true,
            desc: `Whether to enable chat message signature which is introduced since Minecraft 1.19.1.<br>
                <ul>
                <li>If \`true\`, messages are signed and able to report that is same in Vanilla.</li>
                <li>If \`false\`, the chat signature is disabled. Players are unable to report messages, and the insecure warning popup will be disabled, when player joined the server.</li>
                </ul>
                <br>
                __⚡Recommended value: \`false\`__ (Only for offline-mode server or severs which have alternative moderation methods)`
        },
        OptimizeNonFlushPacketSending: {
            default: false,
            desc: `Whether to optimize the sending of non-flushed packets by usinga Netty's [\`lazyExecute\`](https://netty.io/4.2/api/io/netty/util/concurrent/SingleThreadEventExecutor.html#lazyExecute(java.lang.Runnable)) method. This can reduce thread contention and wakeup calls for certain types of network operations.
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">Warning</p>
                This option is known to be INCOMPATIBLE with ProtocolLib and may cause issues with other plugins that extensively manipulate network packets.<br>
                Requires to restart the server to take effect. Use with extreme caution.
                </div>`
        },
        "protocol-support": {
            __desc__: `This section contains features that provide extra protocol support for some QoL / Utility mods.<br>
                <br>
                The extra protocol support is only functional if there is corresponding client-side mod installed. It means if a specific protocol support is enabled, and a player installed that mod on client, they can get the additional features described in each config below. But for players who have no corresponding mod installed, then everything is the same as before.
                <div class="tip custom-block">
                <p class="custom-block-title custom-block-title-default">Attention</p>
                The protocol support may cause incompatibility with the [ViaVersion](https://modrinth.com/plugin/viaversion).<br>
                We recommend players to use client that has same version with the server core and install latest corresponding mod, otherwise they may unable to join the server.
                </div>`,
            "jade-protocol": {
                default: false,
                desc: `Whether to enable [Jade](https://modrinth.com/mod/jade) protocol support.<br>
                    If \`true\`, player who has Jade mod installed, can display item information inside the storage container, progress of furnace, brewing stand, foods on the campfire, bee data in beehive, and more vanilla-friendly features.`
            },
            "appleskin-protocol": {
                default: false,
                desc: `Whether to enable [AppleSkin](https://modrinth.com/mod/appleskin) protocol support.<br>
                    If \`true\`, player who has AppleSkin mod installed, can display the accurate saturation / exhaustion values on the client.`
            },
            "appleskin-protocol-sync-tick-interval": {
                default: 20,
                desc: `How often the server should synchronize AppleSkin data to clients with AppleSkin installed.<br>
                    This only has any effect if \`appleskin-protocol\` above is \`true\`.<br>
                    (Unit: tick, default value 20 ticks = 1 second)`
            },
            "asteorbar-protocol": {
                default: false,
                desc: `Whether to enable [AsteorBar](https://modrinth.com/mod/asteorbar) protocol support.<br>
                    If \`true\`, player who has AsteorBar mod installed, can display the accurate saturation / exhaustion values on the client.`
            },
            "chatimage-protocol": {
                default: false,
                desc: `Whether to enable [ChatImage](https://modrinth.com/mod/chatimage) protocol support.<br>
                    If \`true\`, player who has ChatImage mod installed, can see the image sent by others using CICode format.`
            },
            "xaero-map-protocol": {
                default: false,
                desc: `Whether to enable [XaeroMap](https://modrinth.com/mod/xaeros-minimap) protocol support.<br>
                    If \`true\`, player who has Xaero's MiniMap mod or Xaero's WorldMap mod installed, can store players' coordinate points and death points based on server's \`protocol-support.xaero-map-server-id\` below.`
            },
            "xaero-map-server-id": {
                default: 513317,
                desc: `Unique number id for XaeroMap to identify the server.<br>
                    This can prevent points from been deleted / refreshed if server name or IP address changed. Change this value if needed.<br>
                    This value will generate randomly on first server start.`
            },
            "syncmatica-protocol": {
                default: false,
                desc: `Whether to enable [Syncmatica](https://modrinth.com/mod/syncmatica) protocol support.<br>
                    If \`true\`, player who has Syncmatica mod installed, can upload their [Litematica](https://modrinth.com/mod/litematica) schematics files or download shared schematics files from the server. Every player with Syncmatica mod installed can access shared schematics uploaded by others.`
            },
            "syncmatica-quota": {
                default: false,
                desc: "Whether to enable maximum file size limit for each shared schematics file of Litematica mod."
            },
            "syncmatica-quota-limit": {
                default: 40000000,
                desc: `Maximum file size of each shared schematics file uploading to server.<br>
                    (Unit: byte, default value 40,000,000 bytes ≈ 38 MB)`
            },
            "do-a-barrel-roll-protocol": {
                default: false,
                desc: `Whether to enable [Do a Barrel Roll](https://modrinth.com/mod/do-a-barrel-roll) protocol support.<br>
                    If \`true\`, visual effects of Do a Barrel Roll can be synchroized to other players who have this mod installed.`
            },
            "do-a-barrel-roll-allow-thrusting": {
                default: false,
                desc: "Whether to allow players to enable \`enable_thrust\` option in their client configuration."
            },
            "do-a-barrel-roll-force-enabled": {
                default: false,
                desc: "Whether to force the mod to be enabled for all players who have this mod installed, regardless of their client configuration."
            },
            "do-a-barrel-roll-force-installed": {
                default: false,
                desc: "Whether to reject players join if they don't have this mod installed in their clients."
            },
            "do-a-barrel-roll-installed-timeout": {
                default: 0,
                desc: `The amount of time to wait for a client to respond to the \`do_a_barrel_roll:config_sync\` packet.<br>
                    (Unit: tick)<br>
                    If \`true\`, players who have not install this mod in their clients will be kicked after this timeout reached.`
            }
        }
    },

    misc: {
        __desc__: "This section contains some miscellaneous features.",
        cache: {
            "profile-lookup": {
                enabled: {
                    default: false,
                    desc: `Whether to cache profile data lookups (skins, textures, etc.) to reduce API calls to Mojang.<br>
                        This allows players to rejoin the server using cached data even if Mojang's authentication servee is temporarily unavailable.`
                },
                timeout: {
                    default: 1440,
                    desc: `The timeout of profile lookup cache.<br>
                        Once a cahced profile data expired after the timeout, the cache of it becomes invalid and the server will re-fetch the profile from Mojang server to ensure the profile data is updated.<br>
                        (Unit: minute, default value 1440 minutes = 24 hours)`
                },
                "max-size": {
                    default: 8192,
                    desc: "Maximum number of profiles to cache."
                }
            }
        },
        "connection-message": {
            __desc__: `The connection message, broadcasts to all online players, when they join or quit the server.<br>
                The message needs to use [MiniMessage](https://docs.papermc.io/adventure/minimessage/format/) format.<br>
                If set \`message\` below to \`default\`, the vanilla join / quit message will be used.<br>
                If set \`enabled\` below to \`false\`, the connection message will be disabled, another plugin is used to send the connection message.<br>
                <br>
                Available placeholders:
                <ul>
                <li>__\`<player_name%>\`__ - player name.</li>
                <li>__\`<player_displayname>\`__ - player display name.</li>
                </ul>
                <div class="tip custom-block">
                <p class="custom-block-title custom-block-title-default">API / Plugin Friendly</p>
                This feature is API / plugin friendly.
                It means that the connection message content can be overrided by plugins using \`PlayerJoinEvent\` or \`PlayerQuitEvent\`.
                </div>`,
            join: {
                enabled: {
                    default: true,
                    desc: "Whether to broadcast message on the player joins."
                },
                message: {
                    default: "default",
                    desc: "The join message of the player."
                }
            },
            quit: {
                enabled: {
                    default: true,
                    desc: "Whether to broadcast message on the player quits."
                },
                message: {
                    default: "default",
                    desc: "The quit message of the player."
                }
            }
        },
        "including-5s-in-get-tps": {
            default: true,
            desc: `Whether to include 5-second TPS in the result of API \`Bukkit#getTPS\` and \`Server#getTPS\`.<br>
                Commands like \`/tps\` display it regardless.<br>
                <ul>
                <li>If \`true\`, you can use \`getTPS\` method to get a TPS long array with 4 elements [\`5s, 1m, 5m, 15m\`].</li>
                <li>If \`false\`, you can use \`getTPS\` method to get a TPS long array with 3 elements \`1m, 5m, 15m\`].</li>
                </ul>
                <details class="tip custom-block">
                <summary class="custom-block-title custom-block-title-default">Want to Go Deeper?</summary>
                If you are using Leaf API for your plugins. Or runinng on Leaf and use reflection to get TPS, you can use \`Bukkit#getTPSIncluding5SecondAverage\`, to get the TPS array including 5-seconds TPS (\`5s, 1m, 5m, 15m\`).<br>
                Also, you can use \`Bukkit#get5SecondTPSAverage\` to get the average value of 5-seconds TPS in \`double\`.
                </details>`
        },
        "lag-compensation": {
            enabled: {
                default: false,
                desc: `The lag compensation, designed to mitigate the gameplay impact of server lag spikes or low TPS situations, which could ensure the basic game experience for players during the lagging.<br>
                    <br>
                    __⚡Recommended value: \`true\` (Also set \`enabled\` below to true)__`
            },
            "enable-for-water": {
                default: false,
                desc: `Whether to enable lag compensation for water flowing.<br>
                    <br>
                    __⚡Recommended value: \`true\`__`
            },
            "enable-for-lava": {
                default: false,
                desc: `Whether to enable lag compensation for lava flowing.<br>
                    <br>
                    __⚡Recommended value: \`true\`__`
            }
        },
        "remove-change-non-editable-sign-warning": {
            default: false,
            desc: `Whether the server prints warning message when players tried to edit the sign that they are not allowed to edit.<br>
                The warning message looks like: \`Player [...] just tried to change non-editable sign\`.<br>
                If \`true\`, it will prevent console spam caused by player actions or other cases.<br>
                <br>
                __⚡Recommended value: \`true\`__`
        },
        "remove-spigot-check-bungee-config": {
            default: false,
            desc: `Whether player can enter backend server via proxy, without the backend server to enable bungeecord mode in \`spigot.yml\`.<br>
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">Warning</p>
                This option is not reommended to touch, unless you are sure what you are doing.<br>
                And it may be removed in the future.
                </div>`
        },
        "secure-seed": {
            enabled: {
                default: false,
                desc: `Whether to use secure seed.<br>
                    <br>
                    The secure seed enables that all ores and structures are generated with a 1024-bit seed using high security cryptographic hash function instead of using 64-bit seed like in vanilla. This protects structure seeds with computational secrecy and makes the seed cracking nearly impossible to happen.<br>
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">Warning</p>
                    Secure seed fundamentally changes positions of ore and structure compared to vanilla.<br>
                    It only applys to new generated chunks. Thus you must prepare a new world if you want to enable this option.<br>
                    Once this option is enabled, you can not disable it to return the vanilla generation, unless you pre-generate the entire world, or new generated chunks will have terrain mismatch.
                    </div>`
            }
        },
        sentry: {
            __desc__: `[Sentry](https://sentry.io/welcome/) is an application monitor service for improved error logging, tracing. Helping the server dev team to maintain better.<br>
                <br>
                After enabled Sentry integration for your server, you don't need to audit long logs to find errors manually. Sentry can collect errors happened in your server, enable you to track errors on Sentry's web panel and help you to locate and fix them easier and faster.<br>
                <br>
                See __[How to Setup Sentry](../how-to/setup-sentry)__ to know how to set up and get the DSN key for \`sentry.dsn\` below.<br>`,
            dsn: {
                default: "''",
                desc: `The DSN key of your Sentry.<br>
                    If an empty value \`''\` is given, the Sentry will be disabled.`
            },
            "log-level": {
                default: "WARN",
                desc: `Logs with a level higher than or equal to this level will be recorded.<br>
                    The valid values for this option are: \`"WARN"\`, \`"ERROR"\` and \`"FATAL"\`.`
            },
            "only-log-thrown": {
                default: true,
                desc: "Whether the Sentry only records the log with Java's \`Throwable\`."
            }
        },
        rebrand: {
            "server-mod-name": {
                default: "Leaf",
                desc: "The server brand name that will be shown on client's F3 debug menu and server MOTD."
            },
            "server-gui-name": {
                default: "Leaf Console",
                desc: "The title displayed on the server GUI window, if you launched server without adding \`--nogui\` option in the startup flag."
            }
        },
        message: {
            "unknown-command": {
                default: "default",
                desc: `Unknown command message, will send to player if they execute an unknown command.<br>
                    The message needs to use [MiniMessage](https://docs.papermc.io/adventure/minimessage/format/) format.<br>
                    If set message to \`default\`, the vanilla unknown command message will be used.<br>
                    <br>
                    Available placeholders:
                    <ul>
                    <li>__\`<detail>\`__ - the detailed information of the unknown command.</li>
                    </ul>
                    <div class="tip custom-block">
                    <p class="custom-block-title custom-block-title-default">API / Plugin Friendly</p>
                    This feature is API / plugin friendly.
                    It means that this message can be overrided by plugins using \`UnknownCommandEvent#message\` or \`UnknownCommandEvent#setMessage\`.
                    </div>`
            }
        },
        "vanilla-username-check": {
            "remove-all-check": {
                default: false,
                desc: `Whether to remove Vanilla username check, allowing all characters as username, including Chinese characters, etc.
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">Warning</p>
                    Removing all username check is UNSAFE AND DANGEROUS, USE AT YOUR OWN RISK!
                    </div>`
            },
            "enforce-skull-validation": {
                default: true,
                desc: "Whether to enforce skull validation, preventing skulls with invalid names from disconnecting the client."
            },
            "allow-old-players-join": {
                default: false,
                desc: "Whether to allow old players to join the server after the username regex is changed, even if their names don't meet the new requirements."
            }
        }
    }
};

export default config;
