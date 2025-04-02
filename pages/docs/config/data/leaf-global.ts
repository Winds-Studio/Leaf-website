export default {

    "config-version": {
        "default": "3.0"
    },

    "async": {
        "parallel-world-tracking": {
            "enabled": {
                "default": false,
                "desc": "<p><strong>Experimental feature</strong></p><p>Enables parallel world ticking to improve performance on multi-core systems by processing different worlds or regions concurrently.</p><p>⚡ <b>Recommended value:</b> <code>false</code> (unless experiencing specific bottlenecks and understand the risks)</p>"
            },
            "threads": {
                "default": 8,
                "desc": "<p>Number of threads dedicated to parallel world ticking.</p><p>Consider setting based on available CPU cores, but monitor performance impact.</p>"
            },
            "log-container-creation-stacktraces": {
                "default": false,
                "desc": "<p>Log stacktraces when containers (like Tile Entities or Entities) are created during parallel ticking.</p><p>Useful for debugging potential concurrency issues, but can be very verbose.</p>"
            },
            "disable-hard-throw": {
                "default": false,
                "desc": "<p>Disable hard throws (which usually stop the server) related to parallel ticking errors.</p><p>⚠️ <b>Might mask underlying issues but could prevent crashes in unstable experimental phases. Use with caution.</b></p>"
            },
            "run-async-tasks-sync": {
                "default": false,
                "desc": "<p>Run asynchronous tasks synchronously within the parallel ticking system.</p><p>Might be needed for compatibility with certain plugins but largely negates the performance benefits of parallel ticking.</p>"
            }
        },
        "async-entity-tracker": {
            "enabled": {
                "default": false,
                "desc": "<p>Make entity tracking asynchronously, can improve performance significantly, especially in situations with massive numbers of entities in a small area.</p><p>⚡ <b>Recommended value:</b> <code>true</code></p>"
            },
            "compat-mode": {
                "default": false,
                "desc": "<p>Enable compatibility mode for plugins like Citizens or other NPC plugins that use real, player-type entities.</p><p>If <code>true</code>, visibility issues where player-type NPCs might disappear sometimes can be fixed.</p><p>You should enable compat-mode ONLY IF you have installed Citizens or similar real-entity NPC plugins and are experiencing issues.</p><p>Using packet-based / virtual entity NPC plugins (e.g., ZNPC Plus, Adyeshach, FancyNPCs) is generally recommended for better performance, allowing this to remain <code>false</code>.</p>"
            },
            "max-threads": {
                "default": 0,
                "desc": "<p>Maximum number of threads for the async entity tracker to use.</p><p>If the value is set to 0, it automatically uses 1/4 of the number of CPU cores (minimum 1).</p><p>⚡ <b>Recommended value:</b> 1/2 of CPU cores (or adjust based on server load and core count)</p>"
            },
            "keepalive": {
                "default": 60,
                "desc": "<p>Thread keepalive time. Threads with no tasks will be terminated if they remain idle for longer than this duration.</p><p>📏 <b>Unit:</b> seconds.</p>"
            },
            "queue-size": {
                "default": 0,
                "desc": "<p>Maximum size of the queue for pending entity tracking tasks.</p><p>If set to <code>0</code>, the queue size is unbounded.</p><p>A limit might prevent excessive memory usage under extreme load but could potentially lead to tasks being dropped or delayed depending on the (unspecified) rejection policy.</p>"
            }
        },
        "async-target-finding": {
            "enabled": {
                "default": false,
                "desc": "<p><strong>Experimental feature</strong></p><p>Moves the expensive entity target search calculations (finding nearby entities to attack or interact with) to background threads, while keeping the actual entity validation on the main thread.</p><p>Can improve performance by reducing main thread load from AI calculations.</p><p>⚡ <b>Recommended value:</b> <code>true</code></p>"
            }
        },
        "async-playerdata-save": {
            "enabled": {
                "default": false,
                "desc": "<p>Make PlayerData saving asynchronous.</p><p>⚠️ <b>Experimental feature, may cause data loss in some circumstances (e.g., server crashes during the save operation)! Use with extreme caution and ensure robust backups.</b></p>"
            }
        },
        "async-pathfinding": {
            "enabled": {
                "default": false,
                "desc": "<p>Make mob pathfinding calculations asynchronous.</p><p>⚡ <b>Recommended value:</b> <code>true</code></p>"
            },
            "max-threads": {
                "default": 0,
                "desc": "<p>Maximum number of threads for async entity pathfinding to use.</p><p>If the value is set to 0, it automatically uses 1/4 of the number of CPU cores (minimum 1).</p><p>⚡ <b>Recommended value:</b> 1/3 of CPU cores (or adjust based on server load)</p>"
            },
            "keepalive": {
                "default": 60,
                "desc": "<p>Thread keepalive time. Threads with no tasks will be terminated if they remain idle longer than this duration.</p><p>📏 <b>Unit:</b> seconds.</p>"
            },
            "queue-size": {
                "default": 0,
                "desc": "<p>Maximum size of the queue for pending pathfinding tasks.</p><p>If set to <code>0</code>, the queue size is unbounded.</p>"
            },
            "reject-policy": {
                "default": "FLUSH_ALL",
                "desc": "<p>The policy to use when the pathfinding task queue is full (only relevant if <code>queue-size</code> is > 0) and a new task is submitted.</p><ul><li><code>FLUSH_ALL</code>: All pending tasks in the queue are immediately run on the main server thread.</li><li><code>CALLER_RUNS</code>: The newly submitted task (that couldn't fit in the queue) is run on the main server thread.</li></ul>"
            }
        },
        "async-mob-spawning": {
            "enabled": {
                "default": true,
                "desc": "<p>Whether asynchronous mob spawning calculations should be enabled.</p><p>On servers with many entities, this can improve performance by offloading some expensive checks required for mob spawning to other threads. You must have Paper's <code>per-player-mob-spawns</code> config set to <code>true</code> in <code>paper-world-defaults.yml</code> for this to work effectively.</p><p>Note: This does not actually spawn mobs asynchronously (which would be unsafe), only some prerequisite calculations.</p><p>⚡ <b>Recommended value:</b> <code>true</code></p>"
            }
        },
        "async-locator": {
            "enabled": {
                "default": false,
                "desc": "<p>Whether asynchronous structure locating should be enabled.</p><p>This offloads potentially slow structure searches (like finding strongholds or monuments) to other threads.</p><p>Currently available for:</p><ul><li><code>/locate</code> command</li><li>Dolphin treasure finding</li><li>Eye of Ender stronghold finding</li></ul><p>⚡ <b>Recommended value:</b> <code>true</code></p>"
            },
            "threads": {
                "default": 0,
                "desc": "<p>Maximum number of threads for the async locator to use.</p><p>If a value ≤ <code>0</code> is given, it automatically uses 1 thread.</p><p>⚡ <b>Recommended value:</b> <code>1</code> or <code>2</code> (usually sufficient as these lookups aren't constant)</p>"
            },
            "keepalive": {
                "default": 60,
                "desc": "<p>Thread keepalive time. Threads with no tasks will be terminated if they remain idle longer than this duration.</p><p>📏 <b>Unit:</b> seconds.</p>"
            }
        },
        "async-chunk-send": {
            "enabled": {
                "default": false,
                "desc": "<p>Makes chunk packet preparation and sending asynchronous.</p><p>This can significantly reduce main thread load, especially when many players are loading chunks simultaneously (e.g., joining, teleporting, flying fast).</p><p>⚡ <b>Recommended value:</b> <code>true</code></p>"
            }
        },
        "async-block-finding": {
            "enabled": {
                "default": false,
                "desc": "<p>Moves expensive block search calculations (e.g., used by some commands or AI behaviors) to background threads, while keeping the actual block validation on the main thread.</p><p>Can improve performance by reducing main thread load during these searches.</p><p>⚡ <b>Recommended value:</b> <code>true</code></p>"
            }
        }
    },

    "performance": {
        "use-virtual-thread-for-user-authenticator": {
             "enabled": {
                 "default": true,
                 "desc": "<p>Whether to use <a href='https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html'>Virtual Threads</a> (if available, requires Java 21+) for the User Authenticator service, which handles player login verification.</p><p>⚡ <b>Recommended value:</b> <code>true</code> (on Java 21+)</p>"
             }
        },
        "use-virtual-thread-for-async-chat-executor": {
            "enabled": {
                "default": true,
                "desc": "<p>Whether to use <a href='https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html'>Virtual Threads</a> (if available, requires Java 21+) for the Async Chat Executor.</p><p>⚡ <b>Recommended value:</b> <code>true</code> (on Java 21+)</p>"
            }
        },
        "use-virtual-thread-for-async-scheduler": {
            "enabled": {
                "default": true,
                "desc": "<p>Whether to use <a href='https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html'>Virtual Threads</a> (if available, requires Java 21+) for the CraftAsyncScheduler.</p><p>Could improve performance for plugins heavily utilizing Bukkit's async scheduler.</p><p>⚡ <b>Recommended value:</b> <code>true</code> (on Java 21+)</p>"
            }
        },
        "create-snapshot-on-retrieving-blockstate": {
            "enabled": {
                "default": false,
                "desc": "<p>Whether to create a snapshot (copy) of TileEntity / BlockState data when plugins retrieve them by default.</p><p>Some plugins frequently access BlockState (e.g., checking hopper contents via <code>getInventory().getHolder()</code>). Constantly creating snapshots can be expensive.</p><ul><li>If <code>true</code>: Creates a safe copy (snapshot) every time, preventing plugins from accidentally modifying the live state.</li><li>If <code>false</code>: Returns the live BlockState unless the plugin specifically requests a snapshot. Faster, but relies on plugins behaving correctly.</li></ul><p>See Paper's discussion on <a href='https://github.com/PaperMC/Paper/blob/master/patches/server/0160-API-to-get-a-BlockState-without-a-snapshot.patch'>API-to-get-a-BlockState-without-a-snapshot.patch</a> for context.</p><p>⚡ <b>Recommended value:</b> <code>false</code> (Improved performance, generally safe unless specific plugin issues arise)</p>"
            }
        },
        "inactive-goal-selector-throttle": {
            "enabled": {
                "default": true,
                "desc": "<p>Throttles the AI goal selector calculations for entities that are inactive (typically far from players).</p><p>Instead of running every tick, it runs less frequently (e.g., every second), improving performance slightly at the cost of minor delays in AI reaction for inactive mobs.</p><p>⚡ <b>Recommended value:</b> <code>true</code> for optimization, <code>false</code> for vanilla behavior.</p>"
            }
        },
        "throttle-hopper-when-full": {
            "enabled": {
                "default": true,
                "desc": "<p>Whether to throttle hopper item transfer attempts if the target container is full.</p><p>Prevents the hopper from constantly trying (and failing) to push items every tick.</p><p>⚡ <b>Recommended value:</b> <code>true</code> for optimization, <code>false</code> for vanilla behavior.</p>"
            },
            "skip-ticks": {
                "default": 5,
                "desc": "<p>How many ticks a hopper should wait before trying to move items again after finding the target container full.</p><p>Only active if <code>throttle-hopper-when-full.enabled</code> is <code>true</code>. A value ≤ <code>0</code> effectively disables throttling.</p><p>⚡ <b>Recommended value:</b> <code>8</code> (Vanilla hopper cooldown) or <code>5</code> (Leaf default) for optimization, <code>0</code> for vanilla behavior.</p>"
            }
        },
        "skip-map-item-data-updates-if-map-does-not-have-craftmaprenderer": {
            "enabled": {
                "default": true,
                "desc": "<p>Whether to skip updating map item data if the map doesn't have an associated renderer (<code>CraftMapRenderer</code>).</p><p>Can improve performance significantly if using plugins that create many custom maps without renderers (e.g., image map plugins).</p><p>⚠️ <b>This may cause vanilla maps held by players but not currently displayed in an item frame or their hand to stop updating until viewed again.</b></p><p>⚡ <b>Recommended value:</b> <code>true</code> for optimization, <code>false</code> for vanilla behavior.</p>"
            }
        },
        "skip-ai-for-non-aware-mob": {
            "enabled": {
                "default": true,
                "desc": "<p>Whether to skip AI ticks entirely for mobs that are both inactive (far from players) and unaware (e.g., <code>PersistenceRequired=false</code> and haven't interacted recently).</p><p>Unaware mobs optimized this way will not perform actions or react until they become active again.</p><p>⚡ <b>Recommended value:</b> <code>true</code> for optimization, <code>false</code> for vanilla behavior.</p>"
            }
        },
        "reduce-packets": {
            "reduce-entity-move-packets": {
                 "enabled": {
                    "default": true,
                    "desc": "<p>Reduces the frequency or necessity of sending entity movement packets under certain conditions (e.g., small movements).</p><p>Saves bandwidth and reduces client-side processing load, potentially making movement appear smoother during high entity counts or minor lag.</p><p>⚡ <b>Recommended value:</b> <code>true</code></p>"
                 }
            }
        },
        "faster-structure-gen-future-sequencing": {
            "enabled": {
                "default": true,
                 "desc": "<p>Uses a potentially faster method for sequencing asynchronous tasks related to structure generation.</p><p>⚠️ <b>May cause inconsistent order of future composition tasks in rare edge cases, potentially affecting structure generation results subtly.</b></p><p>⚡ <b>Recommended value:</b> <code>true</code> (if no issues observed)</p>"
            }
        },
        "faster-random-generator": {
            "enabled": {
                "default": true,
                "desc": "<p>Use faster random number generator implementations provided by Java 17+.</p><p>Requires a JVM that supports <code>java.util.random.RandomGenerator</code>.</p><p>⚡ <b>Recommended value:</b> <code>true</code> (if using Java 17+)</p>"
            },
            "random-generator": {
                "default": "Xoroshiro128PlusPlus",
                "desc": "<p>Specifies which random generator algorithm to use when <code>faster-random-generator.enabled</code> is true.</p><p>See <a href='https://openjdk.org/jeps/356'>JEP 356</a> for details on Java's available generators. <code>Xoroshiro128PlusPlus</code> generally offers a good balance of speed and statistical quality.</p>"
            },
            "enable-for-worldgen": {
                "default": false,
                "desc": "<p>Enable the faster random generator for world generation processes.</p><p>⚠️ <b>WARNING: This WILL change world generation results! Use only for new worlds or if vanilla seed parity is not required. Structures, ore veins, etc., will be different from vanilla generation with the same seed.</b></p>"
            },
            "warn-for-slime-chunk": {
                "default": false,
                "desc": "<p>Log a warning if slime chunk calculations are not using the legacy random source (<code>java.util.Random</code>), as using a different RNG will change which chunks are slime chunks.</p>"
            },
            "use-legacy-random-for-slime-chunk": {
                "default": false,
                "desc": "<p>Force the use of the legacy random source (<code>java.util.Random</code>) specifically for slime chunk calculations, even if faster generators are enabled elsewhere.</p><p>Set to <code>true</code> to maintain vanilla slime chunk locations.</p>"
            },
            "use-direct-implementation": {
                "default": false,
                "desc": "<p>Use direct Java implementations of the selected random algorithm instead of delegating through the standard <code>RandomGenerator</code> interface.</p><p>May offer a minor performance improvement but could potentially change RNG behavior compared to the standard library's delegation mechanism.</p>"
            }
        },
        "enable-cached-minecraft-to-bukkit-entitytype-convert": {
            "enabled": {
                 "default": true,
                 "desc": "<p>Whether to cache the result of the <code>CraftEntityType#minecraftToBukkit</code> conversion call.</p><p>This conversion can be somewhat expensive, so caching can improve performance in code that frequently converts between Minecraft and Bukkit entity types.</p><p>⚡ <b>Recommended value:</b> <code>true</code></p>"
             }
        },
        "dab": {
            "enabled": {
                "default": true,
                "desc": "<p>Enables Distant Activation Behavior (DAB) optimization for entities.</p><p>Reduces the AI processing (like pathfinding and goal execution) for entities that are far away from players, improving performance.</p><p>⚡ <b>Recommended value:</b> <code>true</code></p>"
            },
            "dont-enable-if-in-water": {
                "default": false,
                "desc": "<p>If true, non-aquatic entities that are in water will not have their AI throttled by DAB, even if they are far away.</p><p>Can prevent issues like terrestrial mobs suffocating unexpectedly in water when far from players due to paused AI.</p>"
            },
            "start-distance": {
                "default": 12,
                "desc": "<p>The distance (in blocks) an entity must be from the nearest player to start being affected by DAB throttling.</p><p>📏 <b>Unit:</b> blocks.</p>"
            },
            "max-tick-freq": {
                "default": 20,
                "desc": "<p>Defines the maximum frequency (most often, in ticks) that the furthest entities affected by DAB will have their AI ticked.</p><p>Lower values mean more frequent updates even for distant mobs (less optimization). Higher values mean less frequent updates (more optimization). <code>20</code> ticks = 1 second.</p><p>📏 <b>Unit:</b> ticks.</p>"
            },
            "activation-dist-mod": {
                "default": 8,
                "desc": "<p>Controls how aggressively distance impacts the entity's tick frequency.</p><p>The effective frequency is influenced by the formula: <code>freq ≈ (distanceToPlayer^2) / (2^value)</code> (clamped by <code>max-tick-freq</code>).</p><ul><li>Lower value (e.g., 7): Further entities tick less often (more aggressive optimization).</li><li>Higher value (e.g., 9): Further entities tick more often (less aggressive optimization).</li></ul>"
            },
            "blacklisted-entities": {
                "default": [],
                "desc": "<p>A list of entity types (e.g., <code>minecraft:villager</code>, <code>minecraft:creeper</code>) that should be completely ignored by the DAB optimization system.</p>"
            }
        },
        "dont-save-entity": {
            "dont-save-primed-tnt": {
                 "enabled": {
                    "default": false,
                    "desc": "<p>If enabled, Primed TNT entities will not be saved when chunks unload.</p><p>Useful for redstone/technical servers to prevent TNT explosions caused by chunk loading/unloading cycles (e.g., when a player disconnects near an active TNT device).</p>"
                 }
            },
            "dont-save-falling-block": {
                 "enabled": {
                    "default": false,
                    "desc": "<p>If enabled, Falling Block entities will not be saved when chunks unload.</p><p>Can prevent issues with glitched or duplicated falling blocks (sand, gravel, etc.) after server restarts or chunk reloads, especially if caused by lag.</p>"
                 }
            }
        },
        "entity-running-behavior-cache-update-interval": {
            "interval": {
                 "default": 5,
                 "desc": "<p>How often (in ticks) an entity updates its internal cache of currently running brain behaviors (AI tasks).</p><p>Lower values mean the cache is more up-to-date but involves slightly more frequent checks. Higher values reduce check frequency but might slightly delay internal AI state tracking.</p><p>📏 <b>Unit:</b> ticks.</p>"
            }
        }
    },

    "fixes": {
        "dont-place-player-if-server-full": {
            "enabled": {
                "default": false,
                "desc": "<p>Prevents players from being fully placed into the world if the server is already at its maximum player capacity (<code>max-players</code> in <code>server.properties</code>).</p><p>If enabled, bypass access relies solely on permissions (e.g., <code>purpur.joinfullserver</code> or similar, check server/plugin documentation) rather than allowing plugins to override the limit via the <code>PlayerLoginEvent</code>.</p>"
            }
        }
    },

    "gameplay-mechanisms": {
        "use-spigot-item-merging-mechanism": {
             "enabled": {
                "default": true,
                "desc": "<p>Whether to use Spigot's specific logic for merging item stacks (e.g., dropped items).</p><p>Set to <code>true</code> to potentially restore item merging behavior closer to Spigot if Leaf/Paper has different mechanics.</p>"
            }
        },
        "spawner-settings": {
            "enabled": {
                "default": true,
                "desc": "<p>Enable the custom mob spawner settings defined below. If <code>false</code>, spawners will use default behavior (likely closer to vanilla or Paper).</p>"
            },
            "checks": {
                "light-level-check": {
                     "enabled": { // Added enabled wrapper for consistency
                         "default": false,
                         "desc": "<p>Check if the light level at the potential spawn location meets the mob's requirements.</p><p>Vanilla spawners ignore light levels.</p>"
                     }
                },
                "spawner-max-nearby-check": {
                    "enabled": { // Added enabled wrapper for consistency
                        "default": true,
                        "desc": "<p>Check if the number of similar mobs already present near the spawner exceeds its configured limit (prevents overcrowding).</p>"
                    }
                },
                "check-for-nearby-players": {
                     "enabled": { // Added enabled wrapper for consistency
                        "default": true,
                        "desc": "<p>Check if any players are within the required activation range of the spawner. Spawners only activate when players are nearby.</p>"
                     }
                },
                "spawner-block-checks": {
                    "enabled": { // Added enabled wrapper for consistency
                        "default": false,
                        "desc": "<p>Check if the potential spawn area is obstructed by solid blocks.</p><p>Vanilla spawners have some basic checks; this might enable stricter or different checks.</p>"
                    }
                },
                "water-prevent-spawn-check": {
                     "enabled": { // Added enabled wrapper for consistency
                        "default": false,
                        "desc": "<p>Check if the presence of water at the spawn location should prevent the mob from spawning (e.g., for mobs that shouldn't spawn in water).</p>"
                     }
                }
            },
            "min-spawn-delay": {
                "delay": { // Renamed for clarity, added enabled style wrapper
                     "default": 200,
                     "desc": "<p>Minimum delay (in ticks) between spawn attempts for a mob spawner. The actual delay is randomized between min and max.</p><p>Higher values slow down spawners. Vanilla default: 200.</p><p>📏 <b>Unit:</b> ticks.</p>"
                }
            },
            "max-spawn-delay": {
                 "delay": { // Renamed for clarity, added enabled style wrapper
                     "default": 800,
                     "desc": "<p>Maximum delay (in ticks) between spawn attempts for a mob spawner.</p><p>Higher values slow down spawners. Vanilla default: 800.</p><p>📏 <b>Unit:</b> ticks.</p>"
                 }
            }
        },
        "smooth-teleport": {
             "enabled": {
                 "default": false,
                "desc": "<p><strong>Experimental feature</strong></p><p>Attempts to make dimension changes (e.g., entering Nether/End portals) smoother for the player, reducing the jarring screen blackout effect.</p><p>⚠️ <b>Requires the origin world and the destination world to have the same logical height (<code>logical-height</code> in world settings) to function correctly. May have visual glitches or compatibility issues.</b></p>"
            }
        },
        "only-player-pushable": {
            "enabled": {
                 "default": false,
                "desc": "<p>If enabled, only players will be able to push other entities (players, mobs).</p><p>Mobs will not be able to push players or other mobs through collision.</p>"
            }
        },
        "knockback": {
            "snowball-knockback-players": {
                 "enabled": { // Added enabled wrapper for consistency
                    "default": false,
                    "desc": "<p>Allow snowballs thrown by players (or dispensers) to apply knockback to other players upon impact.</p>"
                 }
            },
            "egg-knockback-players": {
                 "enabled": { // Added enabled wrapper for consistency
                    "default": false,
                    "desc": "<p>Allow eggs thrown by players (or dispensers) to apply knockback to other players upon impact.</p>"
                 }
            },
            "can-player-knockback-zombie": {
                "enabled": { // Added enabled wrapper for consistency
                    "default": true,
                    "desc": "<p>Determines if players' attacks apply standard knockback to Zombies (and potentially related undead mobs like Husks, Drowned).</p><p>May be useful if other settings or plugins interfere with default knockback mechanics.</p>"
                }
            }
        },
        "hide-item-component": {
            "enabled": {
                "default": false,
                "desc": "<p>If enabled, specified item component data (similar to NBT tags in older versions) will be hidden from the client for items in the player's inventory.</p><p>This only affects what the client sees, not the actual item data on the server. It can be used to hide complex internal data or potentially reduce client-side rendering load for items with excessive component data.</p><p>⚠️ <b>May break resource packs, client mods, or specific gameplay mechanics that rely on reading this component data client-side. Use with caution.</b></p>"
            },
             "hidden-types": {
                 "types": { // Renamed for clarity, added enabled style wrapper
                     "default": [],
                     "desc": "<p>A list of component type IDs (e.g., <code>minecraft:custom_data</code>, <code>minecraft:attribute_modifiers</code>, <code>minecraft:trim</code>) that will be hidden from the client if <code>hide-item-component.enabled</code> is true.</p><p>Consult Minecraft component documentation or tools like NBT viewers to identify relevant component IDs.</p>"
                 }
             }
        },
        "allow-tripwire-dupe": {
            "enabled": {
                "default": false,
                "desc": "<p>Whether to allow the vanilla behavior where tripwire hooks can sometimes duplicate items (like sand or TNT) under specific circumstances.</p><p>Set to <code>true</code> to enable this vanilla mechanic/exploit.</p>"
            }
        },
        "player": {
            "max-use-item-distance": {
                 "distance": { // Renamed for clarity, added enabled style wrapper
                    "default": 1.0000001,
                    "desc": "<p>The maximum distance (in blocks) a player can be from a block's interaction point to successfully use an item on it (right-click).</p><p>Setting this to <code>-1</code> disables the distance check entirely.</p><p>⚠️ <b>Disabling the check (<code>-1</code>) or setting a very large value enables 'reach' hacks and potential exploits like NoCom (No Comply, interacting through walls). The slightly-above-1 default aims to prevent NoCom while allowing legitimate interactions. Adjusting this requires careful consideration of exploit potential.</b></p><p>📏 <b>Unit:</b> blocks.</p>"
                 }
            }
        },
        "afk-command": {
            "enabled": {
                "default": false,
                "desc": "<p>Enables a built-in <code>/afk</code> command functionality integrated with Minecraft's idle-timeout mechanism (set in <code>server.properties</code>).</p><p>Players exceeding the idle timeout may be automatically set to AFK (if supported by this feature) or kicked as per <code>server.properties</code>.</p><p>Note: AFK functionality might be further configured in other files (e.g., Purpur config if applicable, or dedicated AFK plugins).</p>"
            }
        }
    },

    "network": {
        "protocol-support": {
            "jade-protocol": {
                 "enabled": { // Added enabled wrapper for consistency
                    "default": false,
                    "desc": "<p>Enable server-side support for the Jade / WTHIT (What The Hell Is That) client mod's protocol.</p><p>Allows the server to potentially send more accurate or custom information to players using this mod.</p>"
                 }
            },
            "appleskin-protocol": {
                 "enabled": { // Added enabled wrapper for consistency
                    "default": false,
                    "desc": "<p>Enable server-side support for the AppleSkin client mod's protocol.</p><p>Sends detailed hunger, saturation, and exhaustion information to players using AppleSkin.</p>"
                 }
            },
            "appleskin-protocol-sync-tick-interval": {
                 "interval": { // Renamed for clarity, added enabled style wrapper
                    "default": 20,
                    "desc": "<p>How often (in ticks) the server should synchronize AppleSkin data (saturation, exhaustion) with clients using the mod.</p><p><code>20</code> ticks = 1 second.</p><p>📏 <b>Unit:</b> ticks.</p>"
                 }
            },
            "asteorbar-protocol": {
                 "enabled": { // Added enabled wrapper for consistency
                     "default": false,
                     "desc": "<p>Enable server-side support for the Astéor Bar client mod's protocol.</p>"
                 }
            },
            "chatimage-protocol": {
                 "enabled": { // Added enabled wrapper for consistency
                     "default": false,
                     "desc": "<p>Enable server-side support for client mods that allow embedding images in chat (e.g., ChatImage).</p><p>Requires a compatible plugin on the server to handle image uploading and distribution.</p>"
                 }
            },
            "xaero-map-protocol": {
                 "enabled": { // Added enabled wrapper for consistency
                     "default": false,
                     "desc": "<p>Enable server-side support for Xaero's World Map and Minimap client mods' protocols.</p><p>Allows the server to potentially send waypoint data or other map-related information.</p>"
                 }
            },
            "xaero-map-server-id": {
                 "id": { // Renamed for clarity, added enabled style wrapper
                     "default": 185077322,
                     "desc": "<p>A unique identifier for this server used by Xaero's map protocol.</p><p>Clients use this ID to distinguish map data from different servers. Change if needed, especially in a multi-server network environment.</p>"
                 }
            },
            "syncmatica-protocol": {
                 "enabled": { // Added enabled wrapper for consistency
                     "default": false,
                     "desc": "<p>Enable server-side support for the Syncmatica client mod's protocol.</p><p>Allows players using Syncmatica to share and synchronize schematics with the server (requires a compatible server-side implementation).</p>"
                 }
            },
            "syncmatica-quota": {
                 "enabled": { // Added enabled wrapper for consistency
                     "default": false,
                     "desc": "<p>Enable a storage quota limit for schematics uploaded via Syncmatica.</p>"
                 }
            },
            "syncmatica-quota-limit": {
                 "limit": { // Renamed for clarity, added enabled style wrapper
                     "default": 40000000,
                     "desc": "<p>The maximum total size (in bytes) allowed for Syncmatica schematic uploads per player or globally (depending on implementation) if <code>syncmatica-quota.enabled</code> is true.</p><p>Default is 40,000,000 bytes (approx 40MB).</p><p>📏 <b>Unit:</b> bytes.</p>"
                 }
            }
        },
        "OptimizeNonFlushPacketSending": {
            "enabled": {
                 "default": false,
                "desc": "<p>Optimizes the sending of non-flushed packets by using Netty's <code>lazyExecute</code> method. This can reduce thread contention and wakeup calls for certain types of network operations.</p><p>⚠️ <b>WARNING: This option is known to be INCOMPATIBLE with ProtocolLib and may cause issues with other plugins that extensively manipulate network packets. Requires a server restart to take effect. Use with extreme caution.</b></p>"
            }
        },
        "chat-message-signature": {
             "enabled": {
                "default": false,
                "desc": "<p>Whether to enable cryptographic signatures for chat messages.</p><ul><li>If <code>true</code> (Vanilla default): Messages are signed, allowing players to report messages to Mojang and enabling the 'secure chat' indicators.</li><li>If <code>false</code>: Signatures are disabled. Chat reporting is not possible, and the 'secure chat' popup/indicators are disabled (often preferred for offline-mode servers or communities wanting to handle moderation internally).</li></ul>"
            }
        }
    },

    "misc": {
        "message": {
            "unknown-command": {
                "default": "<red><lang:command.unknown.command><newline><detail>",
                "desc": "<p>Customizes the message displayed when a player enters an unrecognized command.</p><ul><li>Uses <a href='https://docs.adventure.kyori.net/minimessage/format.html'>MiniMessage</a> format for colors and styling.</li><li>Set to the string <code>\"default\"</code> to use the standard vanilla message.</li><li>Placeholder: <code><detail></code> can be used to insert the specific unknown command text entered by the player.</li></ul>"
            }
        },
        "rebrand": {
            "server-mod-name": {
                 "name": { // Renamed for clarity, added enabled style wrapper
                    "default": "Leaf",
                    "desc": "<p>The server name/brand displayed in the client's multiplayer server list (replaces 'Paper', 'Spigot', 'Vanilla', etc.).</p>"
                 }
            },
            "server-gui-name": {
                 "name": { // Renamed for clarity, added enabled style wrapper
                    "default": "Leaf Console",
                    "desc": "<p>The title displayed in the server's graphical console window (if one is used).</p>"
                 }
            }
        },
        "sentry": {
            "dsn": {
                 "key": { // Renamed for clarity, added enabled style wrapper
                    "default": "",
                    "desc": "<p>Your Sentry Data Source Name (DSN) for advanced error reporting and aggregation.</p><p>Obtain a DSN from <a href='https://sentry.io/'>sentry.io</a> by creating a project. Leave blank to disable Sentry integration.</p>"
                 }
            },
            "log-level": {
                 "level": { // Renamed for clarity, added enabled style wrapper
                    "default": "WARN",
                    "desc": "<p>The minimum logging level (e.g., <code>INFO</code>, <code>WARN</code>, <code>ERROR</code>) required for a server log message to be captured and sent to Sentry.</p>"
                 }
            },
            "only-log-thrown": {
                 "enabled": { // Added enabled wrapper for consistency
                    "default": true,
                    "desc": "<p>If true, only log messages that include a Java Throwable (an exception or error stack trace) will be sent to Sentry, ignoring plain log messages even if they meet the <code>log-level</code>.</p>"
                 }
            }
        },
        "secure-seed": {
            "enabled": {
                "default": false,
                "desc": "<p>If enabled, world generation features like ore veins and structure placements will use a secure, high-entropy 1024-bit seed derived internally from the main world seed, instead of directly using the 64-bit world seed.</p><p>This makes predicting ore/structure locations based on the world seed (seed cracking) computationally infeasible.</p><p>⚠️ <b>This fundamentally changes ore and structure positions compared to vanilla generation with the same world seed! Use only for new worlds or where vanilla seed parity is not a requirement.</b></p>"
            }
        },
        "remove-vanilla-username-check": {
            "enabled": {
                "default": true,
                "desc": "<p>Removes the default vanilla check that restricts player usernames to alphanumeric characters and underscores (<code>a-zA-Z0-9_</code>).</p><p>Enable this to allow usernames containing symbols or other characters, often necessary for specific authentication plugins (like allowing spaces or non-Latin characters) or some offline-mode setups.</p>"
            }
        },
        "remove-spigot-check-bungee-config": {
            "enabled": {
                "default": true,
                "desc": "<p>Disables Spigot's check for <code>settings.bungeecord: true</code> in <code>spigot.yml</code> when a player attempts to join via a proxy.</p><p>Enable this to allow players to connect through a BungeeCord/Velocity proxy even if the backend server doesn't have BungeeCord mode explicitly enabled in its own Spigot configuration.</p><p>⚠️ <b>This assumes your proxy is correctly configured for IP forwarding (e.g., using BungeeCord mode on the proxy itself). Failure to ensure proper IP forwarding configuration on the proxy side can lead to security vulnerabilities and incorrect player IP addresses being reported to the backend server and plugins.</b></p>"
            }
        },
        "remove-change-non-editable-sign-warning": {
            "enabled": {
                "default": false,
                "desc": "<p>Suppresses the console warning message: \"Player [...] tried to change non-editable sign\".</p><p>Enable this to reduce console spam if this warning occurs frequently due to plugins or specific player actions and is considered benign noise.</p>"
            }
        },
        "region-format-settings": {
            "region-format": {
                 "format": { // Renamed for clarity, added enabled style wrapper
                    "default": "MCA",
                    "desc": "<p>Specifies the format used for saving chunk data in region files.</p><ul><li><code>MCA</code>: Standard Minecraft Anvil format using Zlib compression. Compatible everywhere.</li><li><code>LINEAR</code>: Experimental format using Zstandard (ZSTD) compression. Offers significant disk space savings (often ~50%) but is less compatible and potentially riskier.</li></ul><p>See <a href='https://github.com/xymb-endcrystalme/LinearRegionFileFormatTools'>LinearRegionFileFormatTools Documentation</a> before using LINEAR.</p><p>⚠️ <b>LINEAR is experimental. Always back up your world before switching formats. There is a potential risk of data loss or corruption. Requires server restart.</b></p>"
                 }
            },
            "linear-compress-level": {
                 "level": { // Renamed for clarity, added enabled style wrapper
                    "default": 1,
                    "desc": "<p>The Zstandard compression level to use when <code>region-format</code> is set to <code>LINEAR</code>.</p><p>Higher levels (up to 22) provide better compression ratios but require significantly more CPU time for compression. Lower levels are faster. Level 1 is a fast, light compression setting.</p>"
                 }
            },
            "throw-on-unknown-extension-detected": {
                 "enabled": { // Added enabled wrapper for consistency
                     "default": false,
                     "desc": "<p>If true, the server will detect and throw an error (potentially stopping) if it encounters region files with an unexpected file extension in the world's region directory (e.g., finding <code>.linear</code> files when expecting <code>.mca</code>, or vice-versa).</p><p>Helps prevent data corruption from accidentally mixing region file formats in the same world.</p>"
                 }
             },
            "flush-interval-seconds": {
                 "interval": { // Renamed for clarity, added enabled style wrapper
                     "default": 5,
                     "desc": "<p>How often (in seconds) the server attempts to flush cached region file data to disk.</p><p>More frequent flushing reduces potential data loss on crash but increases disk I/O.</p><p>📏 <b>Unit:</b> seconds.</p>"
                 }
            }
        },
        "lag-compensation": {
            "enabled": {
                "default": false,
                "desc": "<p>Enables experimental lag compensation features designed to mitigate the gameplay impact of server lag spikes.</p><p>May involve techniques like client-side prediction adjustments or delaying certain actions to feel smoother during lag.</p><p>⚠️ <b>Experimental feature, may have unintended side effects or not work reliably in all situations.</b></p>"
            },
            "enable-for-water": {
                 "enabled": { // Added enabled wrapper for consistency
                    "default": false,
                    "desc": "<p>Apply lag compensation logic specifically to player interactions involving water (e.g., swimming, fluid flow effects).</p>"
                 }
            },
            "enable-for-lava": {
                 "enabled": { // Added enabled wrapper for consistency
                    "default": false,
                    "desc": "<p>Apply lag compensation logic specifically to player interactions involving lava.</p>"
                 }
            }
        },
        "including-5s-in-get-tps": {
             "enabled": {
                 "default": true,
                 "desc": "<p>Whether the server's reported TPS (Ticks Per Second) values (e.g., via <code>/tps</code> command or monitoring tools) should include the short-term 5-second average alongside the standard 1-minute, 5-minute, and 15-minute averages.</p><p>Enable for more immediate feedback on recent performance fluctuations.</p>"
            }
        },
        "connection-message": {
            "join": {
                "enabled": {
                    "default": true,
                    "desc": "<p>Whether to use the custom join message defined below instead of the default Minecraft join message.</p>"
                },
                "message": {
                     "text": { // Renamed for clarity, added enabled style wrapper
                        "default": "default",
                        "desc": "<p>The message broadcast globally when a player joins the server.</p><ul><li>Uses <a href='https://docs.adventure.kyori.net/minimessage/format.html'>MiniMessage</a> format for colors and styling.</li><li>Set to the string <code>\"default\"</code> to use the standard vanilla join message (e.g., \"Player joined the game\").</li><li>Placeholders: <code>%player_name%</code> (player's username), <code>%player_displayname%</code> (player's display name, potentially modified by plugins).</li></ul>"
                     }
                }
            },
            "quit": {
                "enabled": {
                    "default": true,
                    "desc": "<p>Whether to use the custom quit message defined below instead of the default Minecraft quit message.</p>"
                },
                "message": {
                     "text": { // Renamed for clarity, added enabled style wrapper
                        "default": "default",
                        "desc": "<p>The message broadcast globally when a player leaves the server.</p><ul><li>Uses <a href='https://docs.adventure.kyori.net/minimessage/format.html'>MiniMessage</a> format.</li><li>Set to <code>\"default\"</code> for the vanilla quit message.</li><li>Placeholders: <code>%player_name%</code>, <code>%player_displayname%</code>.</li></ul>"
                     }
                }
            }
        },
        "cache": {
            "cache-player-profile-result": {
                 "enabled": { // Added enabled wrapper for consistency
                    "default": true,
                    "desc": "<p>Cache the player's profile information (UUID, username, skin/cape textures) retrieved from Mojang's session servers upon their first successful join.</p><p>This allows players to rejoin the server even if Mojang's session servers are temporarily unavailable, as the server uses the cached profile data for authentication.</p>"
                 }
            },
            "cache-player-profile-result-timeout": {
                 "timeout": { // Renamed for clarity, added enabled style wrapper
                    "default": 1440,
                    "desc": "<p>How long (in minutes) the cached player profile information remains valid.</p><p>After this timeout, the server will attempt to re-fetch the profile from Mojang upon the player's next join to ensure the data (especially textures) is up-to-date.</p><p>Default is 1440 minutes (24 hours).</p><p>📏 <b>Unit:</b> minutes.</p>"
                 }
            }
        }
    }

}