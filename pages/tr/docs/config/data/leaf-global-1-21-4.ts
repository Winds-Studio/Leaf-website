import type { ConfigRoot } from "@/.vitepress/theme/components/config/types";

const config: ConfigRoot = {

    "config-version": {
        default: "3.0"
    },

    async: {
        "parallel-world-tracking": {
            "enabled": {
                default: false,
                desc:
                    "**Experimental feature**\n\n" +
                    "Enables parallel world ticking to improve performance on multi-core systems " +
                    "by processing different worlds or regions concurrently.\n\n" +
                    "⚡ **Recommended value:** `false` (unless experiencing specific bottlenecks and understand the risks)"
            },
            "threads": {
                default: 8,
                desc:
                    "Number of threads dedicated to parallel world ticking.\n\n" +
                    "Consider setting based on amount of worlds in the server."
            },
            "log-container-creation-stacktraces": {
                default: false,
                desc:
                    "Log stacktraces when containers (like Tile Entities or Entities) are created during parallel ticking.\n\n" +
                    "Useful for debugging potential concurrency issues."
            },
            "disable-hard-throw": {
                default: false,
                desc:
                    "Disable hard throws (which usually stop the server) related to parallel ticking errors.\n\n" +
                    "⚠️ **Might mask underlying issues but could prevent crashes in unstable experimental phases. Use with caution.**"
            },
            "run-async-tasks-sync": {
                default: false,
                desc:
                    "Run asynchronous tasks synchronously within the parallel ticking system.\n\n" +
                    "Might be needed for compatibility with certain plugins but largely negates the performance benefits of parallel ticking."
            }
        },
        "async-entity-tracker": {
            "enabled": {
                default: false,
                desc:
                    "Make entity tracking asynchronous, can improve performance significantly, " +
                    "especially in situations with massive numbers of entities in a small area.\n\n" +
                    "⚡ **Recommended value:** `true`\n\n" +
                    "📝 **Note:** If you installed plugins like Citizens, which uses real, player-type " +
                    "entities as NPCs, also read the `compat-mode` description below."
            },
            "compat-mode": {
                default: false,
                desc:
                    "Enable compatibility mode for plugins like Citizens or other NPC plugins that use real, player-type entities.\n\n" +
                    "If `true`, visibility issues where player-type NPCs might disappear sometimes can be fixed.\n\n" +
                    "You should enable `compat-mode` ONLY IF you have installed Citizens or similar real-entity NPC " +
                    "plugins and are experiencing issues.\n\n" +
                    "Using packet-based / virtual entity NPC plugins (e.g., [ZNPC Plus](https://github.com/Pyrbu/ZNPCsPlus), " +
                    "[Adyeshach](https://github.com/TabooLib/Adyeshach), [FancyNPCs](https://modrinth.com/plugin/fancynpcs)) " +
                    "is generally recommended for better performance, allowing this to remain `false`."
            },
            "max-threads": {
                default: 0,
                desc:
                    "Maximum number of threads for the async entity tracker to use.\n\n" +
                    "If the value is set to `0`, it automatically uses 1/4 of the number of CPU cores (minimum 1).\n\n" +
                    "⚡ **Recommended value:** 1/2 of CPU cores (or adjust based on server load and core count)"
            },
            "keepalive": {
                default: 60,
                desc:
                    "Thread keepalive time. Threads with no tasks will be terminated if " +
                    "they remain idle for longer than this duration.\n\n 📏 **Unit:** seconds."
            },
            "queue-size": {
                default: 0,
                desc:
                    "Maximum size of the queue for pending entity tracking tasks.\n\n" +
                    "If set to `0`, the queue size is dynamically calculated as `max-threads * 384`.\n\n" +
                    "A limit might prevent excessive memory usage under extreme load but could potentially " +
                    "lead to tasks being dropped or delayed depending on the rejection policy " +
                    "(which is not configurable here)."
            }
        },
        "async-target-finding": {
            "enabled": {
                default: false,
                desc:
                    "**Experimental feature**\n\n Moves the expensive entity target search calculations " +
                    "(finding nearby entities to attack or interact with) to a background thread while keeping " +
                    "the actual entity validation on the main thread.\n\n" +
                    "Can improve performance by reducing main thread load from AI calculations.\n\n" +
                    "⚡ **Recommended value:** `true`"
            }
        },
        "async-playerdata-save": {
            "enabled": {
                default: false,
                desc:
                    "**Experimental feature**\n\n Make PlayerData saving asynchronous.\n\n" +
                    "⚠️ **Warning: May cause data loss in some circumstances (e.g., server crashes " +
                    "during the save operation)! Use with extreme caution and ensure robust backups.**"
            }
        },
        "async-pathfinding": {
            "enabled": {
                default: false,
                desc: "Make mob pathfinding calculations asynchronous.\n\n ⚡ **Recommended value:** `true`"
            },
            "max-threads": {
                default: 0,
                desc:
                    "Maximum number of threads for async entity pathfinding to use.\n\n" +
                    "If the value is set to `0`, it automatically uses 1/4 of the number of CPU cores (minimum 1).\n\n" +
                    "⚡ **Recommended value:** 1/3 of CPU cores (or adjust based on server load)"
            },
            "keepalive": {
                default: 60,
                desc:
                    "Thread keepalive time. Threads with no tasks will be terminated if they remain idle " +
                    "longer than this duration.\n\n 📏 **Unit:** seconds."
            },
            "queue-size": {
                default: 0,
                desc:
                    "Maximum size of the queue for pending pathfinding tasks.\n\n" +
                    "If set to `0`, the queue size is dynamically calculated as `max-threads * 256`."
            },
            "reject-policy": {
                default: "FLUSH_ALL",
                desc:
                    "The policy to use when the pathfinding task queue is full (only relevant if `queue-size` is > 0) and a new task is submitted.\n\n" +
                    "- `FLUSH_ALL`: All pending tasks in the queue are immediately run on the main server thread.\n" +
                    "- `CALLER_RUNS`: The newly submitted task (that couldn't fit in the queue) is run on the main server thread."
            }
        },
        "async-mob-spawning": {
            "enabled": {
                default: true,
                desc:
                    "Whether asynchronous mob spawning calculations should be enabled.\n\n" +
                    "On servers with many entities, this can improve performance by offloading some expensive " +
                    "calculations required for mob spawning to other threads. You must have Paper's `per-player-mob-spawns` " +
                    "config set to `true` in `paper-world-defaults.yml` for this to work effectively.\n\n" +
                    "📝 **Note:** This does not actually spawn mobs asynchronously (which would be unsafe), " +
                    "only some prerequisite calculations.\n\n" +
                    "⚡ **Recommended value:** `true`"
            }
        },
        "async-locator": {
            "enabled": {
                default: false,
                desc:
                    "Whether asynchronous structure locating should be enabled.\n\n" +
                    "This offloads potentially slow structure searches (like finding strongholds or monuments) to other threads.\n\n" +
                    "Currently available for:\n\n" +
                    "- `/locate` command\n" +
                    "- Dolphin treasure finding\n" +
                    "- Eye of Ender stronghold finding\n\n" +
                    "⚡ **Recommended value:** `true`"
            },
            "threads": {
                default: 0,
                desc:
                    "Maximum number of threads for the async locator to use.\n\n" +
                    "If a value ≤ `0` is given, it automatically uses 1 thread.\n\n" +
                    "⚡ **Recommended value:** `1` or `2` (usually sufficient as these lookups aren't constant)"
            },
            "keepalive": {
                default: 60,
                desc:
                    "Thread keepalive time. Threads with no tasks will be terminated if " +
                    "they remain idle longer than this duration.\n\n 📏 **Unit:** seconds."
            }
        },
        "async-chunk-send": {
            "enabled": {
                default: false,
                desc:
                    "Makes chunk packet preparation and sending asynchronous.\n\n" +
                    "This can significantly reduce main thread load, especially when many players " +
                    "are loading chunks simultaneously (e.g., joining, teleporting, flying fast).\n\n" +
                    "⚡ **Recommended value:** `true`"
            }
        },
        "async-block-finding": {
            "enabled": {
                default: false,
                desc:
                    "Moves expensive block search calculations (e.g., used by some commands or AI behaviors) " +
                    "to a background thread while keeping the actual block validation on the main thread.\n\n" +
                    "Can improve performance by reducing main thread load during these searches.\n\n" +
                    "⚡ **Recommended value:** `true`"
            }
        }
    },

    "performance": {
        "use-virtual-thread-for-user-authenticator": {
            "enabled": {
                default: true,
                desc:
                    "Whether to use [Virtual Threads](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html) " +
                    "(if available, requires Java 21+) for the User Authenticator service, which handles player login verification.\n\n" +
                    "⚡ **Recommended value:** `true` (on Java 21+)"
            }
        },
        "use-virtual-thread-for-async-chat-executor": {
            "enabled": {
                default: true,
                desc:
                    "Whether to use [Virtual Threads](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html) " +
                    "(if available, requires Java 21+) for the Async Chat Executor.\n\n" +
                    "⚡ **Recommended value:** `true` (on Java 21+)"
            }
        },
        "use-virtual-thread-for-async-scheduler": {
            "enabled": {
                default: true,
                desc:
                    "Whether to use [Virtual Threads](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html) " +
                    "(if available, requires Java 21+) for the CraftAsyncScheduler.\n\n" +
                    "Could improve performance for plugins heavily utilizing Bukkit's async scheduler.\n\n" +
                    "⚡ **Recommended value:** `true` (on Java 21+)"
            }
        },
        "create-snapshot-on-retrieving-blockstate": {
            "enabled": {
                default: true,
                desc:
                    "Whether to create a snapshot (copy) of TileEntity / BlockState data when plugins retrieve them by default.\n\n" +
                    "Some plugins frequently access BlockState (e.g., checking hopper contents via `getInventory().getHolder()`). " +
                    "Constantly creating snapshots can be expensive.\n\n" +
                    "- If `true`: Creates a safe copy (snapshot) every time, preventing plugins from accidentally modifying the live state." +
                    "- If `false`: Returns the live BlockState unless the plugin specifically requests a snapshot. " +
                    "Faster, but relies on plugins behaving correctly.\n\n" +
                    "See Paper's discussion on [API-to-get-a-BlockState-without-a-snapshot.patch](https://github.com/PaperMC/Paper/blob/master/patches/server/0160-API-to-get-a-BlockState-without-a-snapshot.patch) for context.\n\n" +
                    "⚡ **Recommended value:** `false` (Improved performance, generally safe unless specific plugin issues arise or lag described in MD #(17) is observed)"
            }
        },
        "inactive-goal-selector-throttle": {
            "enabled": {
                default: true,
                desc:
                    "Throttles the AI goal selector calculations for entities that are inactive (typically far from players).\n\n" +
                    "Instead of running every tick, it runs less frequently (e.g., every second), improving performance slightly at " +
                    "the cost of minor delays in AI reaction for inactive mobs.\n\n" +
                    "⚡ **Recommended value:** `true` for optimization, `false` for vanilla behavior."
            }
        },
        "throttle-hopper-when-full": {
            "enabled": {
                default: false,
                desc:
                    "Whether to throttle hopper item transfer attempts if the target container is full.\n\n" +
                    "Prevents the hopper from constantly trying (and failing) to push items every tick.\n\n" +
                    "⚡ **Recommended value:** `true` for optimization, `false` for vanilla behavior."
            },
            "skip-ticks": {
                default: 0,
                desc:
                    "How many ticks a hopper should wait before trying to move items again after finding the target container full.\n\n" +
                    "Only active if `throttle-hopper-when-full.enabled` is `true`. A value ≤ `0` effectively disables throttling.\n\n" +
                    "⚡ **Recommended value:** `8` (Vanilla hopper cooldown) or `5` (Leaf default) for optimization, `0` for vanilla behavior."
            }
        },
        "skip-map-item-data-updates-if-map-does-not-have-craftmaprenderer": {
            "enabled": {
                default: true,
                desc:
                    "Whether to skip updating map item data if the map doesn't have an " +
                    "associated renderer (`CraftMapRenderer`).\n\n" +
                    "Can improve performance significantly if using plugins that create " +
                    "many custom maps without renderers (e.g., image map plugins).\n\n" +
                    "⚠️ **This may cause vanilla maps held by players but not currently " +
                    "displayed in an item frame or their hand to stop updating until viewed again.**\n\n" +
                    "⚡ **Recommended value:** `true` for optimization, `false` for vanilla behavior."
            }
        },
        "skip-ai-for-non-aware-mob": {
            "enabled": {
                default: true,
                desc:
                    "Whether to skip AI ticks entirely for mobs that are both inactive (far from players) " +
                    "and unaware (e.g., `PersistenceRequired=false` and haven't interacted recently).\n\n" +
                    "Unaware mobs optimized this way will not perform actions or react until they become active again.\n\n" +
                    "⚡ **Recommended value:** `true` for optimization, `false` for vanilla behavior."
            }
        },
        "reduce-packets": {
            "reduce-entity-move-packets": {
                "enabled": {
                    default: false,
                    desc:
                        "Reduces the frequency or necessity of sending entity movement packets " +
                        "under certain conditions (e.g., small movements).\n\n" +
                        "Saves bandwidth and reduces client-side processing load, potentially making " +
                        "movement appear smoother during high entity counts or minor lag.\n\n" +
                        "⚡ **Recommended value:** `true`"
                }
            }
        },
        "faster-structure-gen-future-sequencing": {
            "enabled": {
                default: true,
                desc:
                    "Uses a potentially faster method for sequencing asynchronous tasks " +
                    "related to structure generation.\n\n" +
                    "⚠️ **May cause inconsistent order of future composition tasks in rare " +
                    "edge cases, potentially affecting structure generation results subtly.**\n\n" +
                    "⚡ **Recommended value:** `true` (if no issues observed)"
            }
        },
        "faster-random-generator": {
            "enabled": {
                default: false,
                desc:
                    "Use faster random number generator implementations provided by Java 17+.\n\n" +
                    "Random is used almost everywhere in Minecraft, enabling this can provide a decent " +
                    "performance improvement.\n\n" +
                    "📝 **Note:** Requires a JVM that supports `java.util.random.RandomGenerator` and " +
                    "the LXM generators. Some JREs don't support this and may cause a crash.\n\n" +
                    "⚡ **Recommended value:** `true` (if using Java 17+ and compatible JRE)"
            },
            "random-generator": {
                default: "Xoroshiro128PlusPlus",
                desc:
                    "Specifies which random generator algorithm to use when `faster-random-generator.enabled` is true.\n\n" +
                    "See [JEP 356](https://openjdk.org/jeps/356) or [Java RNG Info](https://www.baeldung.com/java-17-random-number-generators#1-api-design-1) " +
                    "for details on Java's available generators. `Xoroshiro128PlusPlus` generally offers a good balance of speed " +
                    "and statistical quality.\n\n" +
                    "⚡ **Recommended value:** `Xoroshiro128PlusPlus`"
            },
            "enable-for-worldgen": {
                default: false,
                desc:
                    "Enable the faster random generator for world generation processes.\n\n" +
                    "⚠️ **WARNING: This WILL change world generation results! Use only for new worlds " +
                    "or if vanilla seed parity is not required. Structures, ore veins, etc., will be " +
                    "different from vanilla generation with the same seed.**\n\n" +
                    "⚡ **Recommended value:** `true` for optimization (on new worlds), `false` for vanilla behavior/seed parity."
            },
            "warn-for-slime-chunk": {
                default: true,
                desc:
                    "Log a warning on startup if slime chunk calculations are using the faster random generator " +
                    "instead of the legacy one, as this will change slime chunk locations."
            },
            "use-legacy-random-for-slime-chunk": {
                default: false,
                desc:
                    "Force the use of the legacy random source (`java.util.Random`) specifically " +
                    "for slime chunk calculations, even if faster generators are enabled elsewhere.\n\n" +
                    "Set to `true` to maintain vanilla slime chunk locations (important for existing slime farms).\n\n" +
                    "⚡ **Recommended value:** `true` for vanilla behavior/existing farms, `false` for optimization " +
                    "(on new worlds where slime chunk location doesn't matter)."
            },
            "use-direct-implementation": {
                default: false,
                desc:
                    "Use direct Java implementations of the selected random algorithm instead of " +
                    "delegating through the standard `RandomGenerator` interface.\n\n" +
                    "May offer a minor performance improvement but could potentially change RNG " +
                    "behavior compared to the standard library's delegation mechanism."
            }
        },
        "enable-cached-minecraft-to-bukkit-entitytype-convert": {
            "enabled": {
                default: true,
                desc:
                    "Whether to cache the result of the `CraftEntityType#minecraftToBukkit` conversion call.\n\n" +
                    "This conversion can be somewhat expensive, so caching can improve performance slightly in code " +
                    "that frequently converts between Minecraft and Bukkit entity types.\n\n" +
                    "⚡ **Recommended value:** `true`"
            }
        },
        "dab": {
            "enabled": {
                default: true,
                desc:
                    "Enables Distant Activation Behavior (DAB) / Dynamic Activation of Brain optimization for entities.\n\n" +
                    "Reduces the AI processing (like pathfinding and goal execution / brain ticking) for entities that are " +
                    "far away from players, improving performance.\n\n" +
                    "⚡ **Recommended value:** `true` for optimization, `false` (or use blacklist) for vanilla behavior."
            },
            "dont-enable-if-in-water": {
                default: false,
                desc:
                    "If true, non-aquatic entities that are in water will not have their AI throttled by DAB, even if they are far away.\n\n" +
                    "Can prevent issues like terrestrial mobs suffocating unexpectedly in water when far from players due to paused AI " +
                    "(Fixes [Pufferfish issue #58](https://github.com/pufferfish-gg/Pufferfish/issues/58)).\n\n" +
                    "⚡ **Recommended value:** `true`"
            },
            "start-distance": {
                default: 12,
                desc:
                    "The distance (in blocks) an entity must be from the nearest player to start being affected by DAB throttling.\n\n" +
                    "⚡ **Recommended value:** `8`\n\n" +
                    "📏 **Unit:** blocks."
            },
            "max-tick-freq": {
                default: 20,
                desc:
                    "Defines the maximum frequency (most often, in ticks) that the furthest " +
                    "entities affected by DAB will have their AI/brain ticked.\n\n" +
                    "Lower values mean more frequent updates even for distant mobs (less optimization). " +
                    "Higher values mean less frequent updates (more optimization). `20` ticks = 1 second.\n\n" +
                    "📏 **Unit:** ticks."
            },
            "activation-dist-mod": {
                default: 8,
                desc:
                    "Controls how aggressively distance impacts the entity's tick frequency. " +
                    "The effective frequency is influenced by the formula: " +
                    "`freq ≈ (distanceToPlayer^2) / (2^value)` (clamped by `max-tick-freq`).\n\n" +
                    "- Lower value (e.g., 7): Further entities tick less often (more aggressive optimization).\n" +
                    "- Higher value (e.g., 9): Further entities tick more often (less aggressive optimization).\n\n" +
                    "⚡ **Recommended value:** `7`"
            },
            "blacklisted-entities": {
                default: [],
                desc:
                    "A list of entity types (e.g., `minecraft:villager`, `minecraft:creeper`) that should be " +
                    "completely ignored by the DAB optimization system.\n\nUseful for mob farms that rely on " +
                    "specific AI behaviors (like pathfinding) even when players are distant. If mobs in a farm freeze, " +
                    "try adding their type here (e.g., `[ZOMBIFIED_PIGLIN]` or `[VILLAGER, ZOMBIE]`).\n\n" +
                    "See [Bukkit EntityType Javadoc](https://jd.papermc.io/paper/1.21.1/org/bukkit/entity/EntityType.html) " +
                    "for type names. Use YAML list format (e.g., `- VILLAGER` newline `- ZOMBIE` or `[VILLAGER, ZOMBIE]`)."
            }
        },
        "dont-save-entity": {
            "dont-save-primed-tnt": {
                "enabled": {
                    default: false,
                    desc:
                        "If enabled, Primed TNT entities will not be saved when chunks unload.\n\n" +
                        "Useful for redstone/technical/survival servers to prevent TNT explosions " +
                        "caused by chunk loading/unloading cycles (e.g., when a player disconnects " +
                        "or moves far away from an active TNT device).\n\n" +
                        "⚡ **Recommended value:** `true`"
                }
            },
            "dont-save-falling-block": {
                "enabled": {
                    default: false,
                    desc:
                        "If enabled, Falling Block entities will not be saved when chunks unload.\n\n" +
                        "Can prevent issues with glitched or duplicated falling blocks (sand, gravel, etc.) " +
                        "after server restarts or chunk reloads, especially if caused by lag.\n\n" +
                        "⚡ **Recommended value:** `true`"
                }
            }
        },
        "entity-running-behavior-cache-update-interval": {
            default: 5,
            desc:
                "How often (in ticks) an entity updates its internal cache of currently running brain behaviors (AI tasks).\n\n" +
                "Lower values mean the cache is more up-to-date but involves slightly more frequent checks. Higher values reduce " +
                "check frequency but might slightly delay internal AI state tracking.\n\n" +
                "📏 **Unit:** ticks."
        }
    },

    "fixes": {
        "dont-place-player-if-server-full": {
            "enabled": {
                default: false,
                desc:
                    "Prevents players from being fully placed into the world if the server is already at its maximum " +
                    "player capacity (`max-players` in `server.properties`).\n\n" +
                    "If enabled, bypass access relies solely on permissions (e.g., `purpur.joinfullserver` or similar, " +
                    "check server/plugin documentation) rather than allowing plugins to override the limit via the `PlayerLoginEvent#allow` method."
            }
        }
    },

    "gameplay-mechanisms": {
        "use-spigot-item-merging-mechanism": {
            "enabled": {
                default: true,
                desc:
                    "Whether to use Spigot's specific logic for merging item stacks (e.g., dropped items).\n\n" +
                    "Set to `true` to potentially restore item merging behavior closer to Spigot if Leaf/Paper has different mechanics."
            }
        },
        "spawner-settings": {
            "enabled": {
                default: false,
                desc:
                    "Enable the custom mob spawner settings defined below. If `false`, spawners will use default behavior " +
                    "(likely closer to vanilla or Paper)."
            },
            checks: {
                "light-level-check": {
                    default: false,
                    desc: "Check if there is the required light level to spawn the mob. Vanilla spawners ignore light levels."
                },
                "spawner-max-nearby-check": {
                    default: true,
                    desc: "Check if there are the max amount of nearby mobs to spawn the mob (prevents overcrowding)."
                },
                "check-for-nearby-players": {
                    default: true,
                    desc: "Check if any players are in a radius to spawn the mob. Spawners only activate when players are nearby."
                },
                "spawner-block-checks": {
                    default: false,
                    desc: "Check if there are blocks blocking the spawner to spawn the mob."
                },
                "water-prevent-spawn-check": {
                    default: false,
                    desc: "Checks if there is water around that prevents spawning (e.g., for mobs that shouldn't spawn in water)."
                }
            },
            "min-spawn-delay": {
                default: 200,
                desc:
                    "Minimum delay (in ticks) between spawner spawns. The actual delay is randomized between min and max. " +
                    "Higher values slow down spawners. Vanilla default: 200.\n\n" +
                    "📏 **Unit:** ticks."
            },
            "max-spawn-delay": {
                default: 800,
                desc:
                    "Maximum delay (in ticks) between spawner spawns. Higher values slow down spawners. " +
                    "Vanilla default: 800.\n\n 📏 **Unit:** ticks."
            }
        },
        "smooth-teleport": {
            "enabled": {
                default: false,
                desc:
                    "**Experimental feature**\n\nAttempts to make dimension changes (e.g., entering Nether/End portals) " +
                    "smoother for the player, reducing the jarring screen blackout effect.\n\n" +
                    "⚠️ **Warning: Requires the origin world and the destination world to have the same logical height " +
                    "(`logical-height` in world settings) to function correctly. May have visual glitches or compatibility issues. " +
                    "Report any bugs encountered.**"
            }
        },
        "only-player-pushable": {
            "enabled": {
                default: false,
                desc: "If enabled, only players will have collisions."
            }
        },
        "knockback": {
            "snowball-knockback-players": {
                "enabled": {
                    default: false,
                    desc: "Allow snowballs thrown by players (or dispensers) to apply knockback to other players upon impact."
                }
            },
            "egg-knockback-players": {
                "enabled": {
                    default: false,
                    desc: "Allow eggs thrown by players (or dispensers) to apply knockback to other players upon impact."
                }
            },
            "can-player-knockback-zombie": {
                "enabled": {
                    default: true,
                    desc:
                        "Determines if players' attacks apply standard knockback to Zombies " +
                        "(and potentially related undead mobs like Husks, Drowned).\n\n" +
                        "May be useful if other settings or plugins interfere with default knockback mechanics."
                }
            }
        },
        "hide-item-component": {
            "enabled": {
                default: false,
                desc:
                    "If enabled, specified item component information from player's inventory will be hidden from the client.\n\n" +
                    "This only affects what the client sees, not the actual item data on the server. It can be used to hide complex " +
                    "internal data or potentially reduce client-side rendering load for items with excessive component data (e.g., " +
                    "avoid frequent client animations).\n\n" +
                    "⚠️ **Warning: May break resource packs, client mods, or specific gameplay mechanics that rely on reading " +
                    "this component data client-side. Use with caution. You must know what components you are hiding! " +
                    "This is not the same as Paper's item-obfuscation.**"
            },
            "hidden-types": {
                default: [],
                desc:
                    "A list of component type IDs (e.g., `minecraft:custom_data`, `minecraft:attribute_modifiers`, " +
                    "`minecraft:trim`) that will be hidden from the client if `hide-item-component.enabled` is true.\n\n" +
                    "Consult Minecraft component documentation or tools like NBT viewers to identify relevant component IDs. " +
                    'Example: `["minecraft:custom_data"]`'
            }
        },
        "allow-tripwire-dupe": {
            "enabled": {
                default: false,
                desc:
                    "Whether to allow the vanilla behavior where tripwire hooks can sometimes " +
                    "duplicate items (like sand or TNT) under specific circumstances.\n\n" +
                    "Set to `true` to enable this vanilla mechanic/exploit."
            }
        },
        "player": {
            "max-use-item-distance": {
                default: 1.0000001,
                desc:
                    "The maximum distance (in blocks) a player can be from a block's interaction " +
                    "point to successfully use an item on it (right-click).\n\n" +
                    "Setting this to `-1` disables the distance check entirely.\n\n" +
                    "⚠️ **Warning: Disabling the check (`-1`) or setting a very large value enables " +
                    "'reach' hacks and potential exploits like NoCom (No Comply, interacting through walls). " +
                    "The slightly-above-1 default aims to prevent NoCom while allowing legitimate interactions. " +
                    "Adjusting this requires careful consideration of exploit potential.**\n\n" +
                    "⚡ **Recommended value:** `10.0000001` for [anarchy servers](https://minecraftservers.org/type/anarchy) " +
                    "allowing packet-based hacks (like CrystalAura); `1.0000001` otherwise.\n\n" +
                    "📏 **Unit:** blocks."
            }
        },
        "afk-command": {
            "enabled": {
                default: false,
                desc:
                    "Enables a built-in `/afk` command functionality integrated with " +
                    "Minecraft's idle-timeout mechanism (set in `server.properties`).\n\n" +
                    "Players exceeding the idle timeout may be automatically set to AFK " +
                    "(if supported by this feature) or kicked as per `server.properties`.\n\n" +
                    "Note: Rest of AFK settings might be in Purpur config if applicable, or dedicated AFK plugins."
            }
        }
    },

    "network": {
        "protocol-support": {
            "jade-protocol": {
                "enabled": {
                    default: false,
                    desc:
                        "Enable server-side support for the [Jade / WTHIT](https://modrinth.com/mod/jade) " +
                        "(What The Hell Is That) client mod's protocol.\n\n" +
                        "Allows the server to potentially send more accurate or custom information " +
                        "(like storage contents, furnace progress, beehive data) to players using this mod."
                }
            },
            "appleskin-protocol": {
                "enabled": {
                    default: false,
                    desc:
                        "Enable server-side support for the [AppleSkin](https://modrinth.com/mod/appleskin) client mod's protocol.\n\n" +
                        "Sends detailed hunger, saturation, and exhaustion information to players using AppleSkin, " +
                        "allowing accurate display on the client."
                }
            },
            "appleskin-protocol-sync-tick-interval": {
                default: 20,
                desc:
                    "How often (in ticks) the server should synchronize AppleSkin data (saturation, exhaustion) " +
                    "with clients using the mod, if `appleskin-protocol.enabled` is true.\n\n" +
                    "`20` ticks = 1 second.\n\n" +
                    "📏 **Unit:** ticks."
            },
            "asteorbar-protocol": {
                "enabled": {
                    default: false,
                    desc:
                        "Enable server-side support for the [Astéor Bar](https://modrinth.com/mod/asteorbar) client mod's protocol.\n\n" +
                        "Sends detailed saturation/exhaustion information for display on the client."
                }
            },
            "chatimage-protocol": {
                "enabled": {
                    default: false,
                    desc:
                        "Enable server-side support for client mods that allow embedding images in chat " +
                        "(e.g., [ChatImage](https://modrinth.com/mod/chatimage)).\n\n" +
                        "Requires a compatible plugin on the server to handle image uploading, " +
                        "distribution, and display using formats like CICode."
                }
            },
            "xaero-map-protocol": {
                "enabled": {
                    default: false,
                    desc:
                        "Enable server-side support for [Xaero's World Map and Minimap](https://modrinth.com/mod/xaeros-minimap) " +
                        "client mods' protocols.\n\n" +
                        "Allows the server to potentially send waypoint data or other map-related information. " +
                        "Clients can store map data (like player coordinates, death points) tied to the server ID, " +
                        "preventing data loss if server IP/name changes."
                }
            },
            "xaero-map-server-id": {
                default: -739812325,
                desc:
                    "A unique numeric identifier for this server used by Xaero's map protocol.\n\n" +
                    "Clients use this ID to distinguish map data from different servers. Change if needed " +
                    "(especially in a multi-server network environment). Generated randomly on first start if not set."
            },
            "syncmatica-protocol": {
                "enabled": {
                    default: false,
                    desc:
                        "Enable server-side support for the [Syncmatica](https://modrinth.com/mod/syncmatica) client mod's protocol.\n\n" +
                        "Allows players using Syncmatica to share and synchronize [Litematica](https://modrinth.com/mod/litematica) " +
                        "schematics with the server and other players (requires a compatible server-side implementation)."
                }
            },
            "syncmatica-quota": {
                "enabled": {
                    default: false,
                    desc: "Enable a storage quota limit for schematics uploaded via Syncmatica, if `syncmatica-protocol.enabled` is true."
                }
            },
            "syncmatica-quota-limit": {
                default: 40000000,
                desc:
                    "The maximum total size allowed for Syncmatica schematic uploads per player or globally " +
                    "(depending on implementation) if `syncmatica-quota.enabled` is true.\n\n" +
                    "Default is 40,000,000 bytes (approx 38-40MB).\n\n" +
                    "📏 **Unit:** bytes."
            }
        },
        OptimizeNonFlushPacketSending: {
            "enabled": {
                default: false,
                desc:
                    "Optimizes the sending of non-flushed packets by using Netty's `lazyExecute` method. " +
                    "This can reduce thread contention and wakeup calls for certain types of network operations.\n\n" +
                    "⚠️ **WARNING: This option is known to be INCOMPATIBLE with ProtocolLib and may cause issues " +
                    "with other plugins that extensively manipulate network packets. " +
                    "Requires a server restart to take effect. Use with extreme caution.**"
            }
        },
        "chat-message-signature": {
            "enabled": {
                default: true,
                desc:
                    "Whether to enable cryptographic signatures for chat messages (introduced in 1.19.1).\n\n" +
                    "- If `true` (Vanilla default): Messages are signed, allowing players to report messages to " +
                    "Mojang and enabling the 'secure chat' indicators/popups.\n" +
                    "- If `false`: Signatures are disabled. Chat reporting is not possible, and the 'secure chat' " +
                    "popup/indicators are disabled (often preferred for offline-mode servers or communities wanting to handle moderation internally).\n\n" +
                    "⚡ **Recommended value:** `false`"
            }
        }
    },

    "misc": {
        "message": {
            "unknown-command": {
                default: "<red><lang:command.unknown.command><newline><detail>",
                desc:
                    "Customizes the message displayed when a player enters an unrecognized command.\n\n" +
                    "- Uses [MiniMessage](https://docs.adventure.kyori.net/minimessage/format.html) format for colors and styling.\n" +
                    '- Set to the string `"default"` to use the standard vanilla message.\n' +
                    "- Placeholder: `<detail>` can be used to insert the specific unknown command text entered by the player.\n\n" +
                    "📝 **Note:** This message can be overridden by plugins using `UnknownCommandEvent#message`."
            }
        },
        "rebrand": {
            "server-mod-name": {
                default: "Leaf",
                desc:
                    "The server name/brand displayed in the client's F3 debug screen and potentially the " +
                    "multiplayer server list (replaces 'Paper', 'Spigot', 'Vanilla', etc.)."
            },
            "server-gui-name": {
                default: "Leaf Console",
                desc: "The title displayed in the server's graphical console window (if one is used, i.e., not launched with `--nogui`)."
            }
        },
        "sentry": {
            "dsn": {
                default: "",
                desc:
                    "Your Sentry Data Source Name (DSN) for advanced error reporting and aggregation.\n\n" +
                    "Obtain a DSN from [sentry.io](https://sentry.io/) by creating a project. " +
                    "Leave blank (`''`) to disable Sentry integration."
            },
            "log-level": {
                default: "WARN",
                desc:
                    "The minimum logging level (e.g., `INFO`, `WARN`, `ERROR`) required for a server " +
                    "log message to be captured and sent to Sentry, if Sentry is enabled."
            },
            "only-log-thrown": {
                "enabled": {
                    default: true,
                    desc:
                        "If true, only log messages that include a Java Throwable (an exception or error stack trace) " +
                        "will be sent to Sentry, ignoring plain log messages even if they meet the `log-level`."
                }
            }
        },
        "secure-seed": {
            "enabled": {
                default: false,
                desc:
                    "If enabled, world generation features like ore veins and structure placements " +
                    "will use a secure, high-entropy 1024-bit seed derived internally from the main world " +
                    "seed, instead of directly using the 64-bit world seed.\n\n" +
                    "This makes predicting ore/structure locations based on the world seed (seed cracking) " +
                    "computationally infeasible.\n\n" +
                    "⚠️ **WARNING: This fundamentally changes ore and structure positions compared to vanilla " +
                    "generation with the same world seed! Use only for new worlds or where vanilla seed parity " +
                    "is not a requirement. Applies only to newly generated chunks in existing worlds.**\n\n" +
                    "⚡ **Recommended value:** `true` (on new worlds where seed cracking is a concern), `false` for vanilla behavior/seed parity."
            }
        },
        "remove-vanilla-username-check": {
            "enabled": {
                default: true,
                desc:
                    "Removes the default vanilla check that restricts player usernames " +
                    "to alphanumeric characters and underscores (`a-zA-Z0-9_`).\n\n" +
                    "Enable this (`true`) to allow usernames containing symbols or other " +
                    "characters (e.g., Chinese, spaces), often necessary for specific " +
                    "authentication plugins or some offline-mode setups."
            }
        },
        "remove-spigot-check-bungee-config": {
            "enabled": {
                default: true,
                desc:
                    "Disables Spigot's check for `settings.bungeecord: true` in `spigot.yml` " +
                    "when a player attempts to join via a proxy.\n\n" +
                    "Enable this (`true`) to allow players to connect through a BungeeCord/Velocity " +
                    "proxy even if the backend server doesn't have BungeeCord mode explicitly enabled " +
                    "in its own Spigot configuration.\n\n" +
                    "⚠️ **WARNING: This assumes your proxy is correctly configured for IP forwarding " +
                    "(e.g., using BungeeCord mode on the proxy itself). Failure to ensure proper IP " +
                    "forwarding configuration on the proxy side can lead to security vulnerabilities " +
                    "(like IP spoofing) and incorrect player IP addresses being reported to the backend server and plugins.**"
            }
        },
        "remove-change-non-editable-sign-warning": {
            "enabled": {
                default: false,
                desc:
                    'Suppresses the console warning message: "Player [...] tried to change non-editable sign".\n\n' +
                    "Enable this (`true`) to reduce console spam if this warning occurs frequently due to plugins " +
                    "or specific player actions and is considered benign noise.\n\n" +
                    "⚡ **Recommended value:** `true` (to reduce console spam)"
            }
        },
        "region-format-settings": {
            "region-format": {
                default: "MCA",
                desc:
                    "Specifies the format used for saving chunk data in region files.\n\n" +
                    "- `MCA`: Standard Minecraft Anvil format using Zlib compression. Compatible everywhere. Safer.\n" +
                    "- `LINEAR`: Experimental format using Zstandard (ZSTD) compression. Offers significant disk " +
                    "space savings but is less compatible and potentially riskier.\n\n" +
                    "See [LinearRegionFileFormatTools Documentation](https://github.com/xymb-endcrystalme/LinearRegionFileFormatTools) " +
                    "before using LINEAR.\n\n" +
                    "⚠️ **LINEAR is experimental. Always back up your world before switching formats. " +
                    "Potential risk of data loss or corruption. Requires server restart.**"
            },
            "linear-compress-level": {
                default: 1,
                desc:
                    "The Zstandard compression level to use when `region-format` is set to `LINEAR`.\n\n" +
                    "Higher levels (up to 22) provide better compression ratios but require significantly more " +
                    "CPU time for compression. Lower levels are faster. Level 1 is a fast, light compression setting."
            },
            "throw-on-unknown-extension-detected": {
                "enabled": {
                    default: false,
                    desc:
                        "If true, the server will detect and throw an error (potentially stopping) if it " +
                        "encounters region files with an unexpected file extension in the world's region directory " +
                        "(e.g., finding `.linear` files when expecting `.mca`, or vice-versa).\n\n" +
                        "Helps prevent data corruption from accidentally mixing region file formats in the same world."
                }
            },
            "flush-interval-seconds": {
                default: 5,
                desc: "How often (in seconds) the server attempts to flush cached region file data (relevant for LINEAR format) to disk.\n\nMore frequent flushing reduces potential data loss on crash but increases disk I/O.\n\n📏 **Unit:** seconds.\n\n"
            }
        },
        "lag-compensation": {
            "enabled": {
                default: false,
                desc:
                    "**Experimental feature**\n\n Enables lag compensation features designed to " +
                    "mitigate the gameplay impact of server lag spikes or low TPS situations, potentially " +
                    "ensuring a basic level of playability.\n\nMay involve techniques like client-side " +
                    "prediction adjustments or delaying certain actions to feel smoother during lag.\n\n" +
                    "⚠️ **Experimental: May have unintended side effects or not work reliably in all situations. Use with caution.**\n\n" +
                    "⚡ **Recommended value:** `true`"
            },
            "enable-for-water": {
                "enabled": {
                    default: false,
                    desc:
                        "Apply lag compensation logic specifically to player interactions involving water " +
                        "(e.g., swimming, fluid flow effects), if `lag-compensation.enabled` is true.\n\n" +
                        "⚡ **Recommended value:** `true`"
                }
            },
            "enable-for-lava": {
                "enabled": {
                    default: false,
                    desc:
                        "Apply lag compensation logic specifically to player interactions " +
                        "involving lava, if `lag-compensation.enabled` is true.\n\n" +
                        "⚡ **Recommended value:** `true`"
                }
            }
        },
        "including-5s-in-get-tps": {
            "enabled": {
                default: true,
                desc:
                    "Whether the server's reported TPS (Ticks Per Second) values should include the " +
                    "short-term 5-second average alongside the standard 1-minute, 5-minute, and 15-minute " +
                    "averages when accessed via API methods like `Bukkit#getTPS()` or `Server#getTPS()`.\n\n" +
                    "- If `true`: `getTPS()` returns `[5s, 1m, 5m, 15m]`.\n" +
                    "- If `false`: `getTPS()` returns `[1m, 5m, 15m]`.\n\n" +
                    "Enable (`true`) for more immediate feedback on recent performance fluctuations via API. " +
                    "Commands like `/tps` might display it regardless.\n\n" +
                    "📝 **Note:** Methods like `Bukkit#getTPSIncluding5SecondAverage()` and `Bukkit#get5SecondTPSAverage()` " +
                    "may be available via Leaf/Gale API regardless of this setting."
            }
        },
        "connection-message": {
            "join": {
                "enabled": {
                    default: true,
                    desc: "Whether to use the custom join message defined below instead of the default Minecraft join message."
                },
                "message": {
                    default: "default",
                    desc:
                        "The message broadcast globally when a player joins the server.\n\n" +
                        "- Uses [MiniMessage](https://docs.adventure.kyori.net/minimessage/format.html) format.\n" +
                        'Set to `"default"` for vanilla message (e.g., "Player joined the game").\n' +
                        "Placeholders: `%player_name%`, `%player_displayname%`."
                }
            },
            "quit": {
                "enabled": {
                    default: true,
                    desc: "Whether to use the custom quit message defined below instead of the default Minecraft quit message."
                },
                "message": {
                    default: "default",
                    desc:
                        "The message broadcast globally when a player leaves the server.\n\n" +
                        "- Uses [MiniMessage](https://docs.adventure.kyori.net/minimessage/format.html) format.\n" +
                        '- Set to `"default"` for vanilla message.\n' +
                        "- Placeholders: `%player_name%`, `%player_displayname%`."
                }
            }
        },
        "cache": {
            "cache-player-profile-result": {
                "enabled": {
                    default: true,
                    desc:
                        "Cache the player's profile information (UUID, username, skin/cape textures) " +
                        "retrieved from Mojang's session servers upon their first successful join.\n\n" +
                        "This allows players to rejoin the server using cached data even if Mojang's " +
                        "authentication servers are temporarily unavailable (useful during outages)."
                }
            },
            "cache-player-profile-result-timeout": {
                default: 1440,
                desc:
                    "How long (in minutes) the cached player profile information remains valid.\n\n" +
                    "After this timeout, the server will attempt to re-fetch the profile from Mojang upon " +
                    "the player's next join to ensure the data (especially textures) is up-to-date.\n\n" +
                    "Default is 1440 minutes (24 hours).\n\n" +
                    "📏 **Unit:** minutes."
            }
        }
    }
};

export default config;
