import type { ConfigRoot } from "@/.vitepress/theme/components/config/types";

const config: ConfigRoot = {
    "config-version": {
        default: "3.0"
    },

    async: {
        __desc__:
            "This section contains asynchronous features intended to reduce the load on the main thread (Server Thread) by processing tasks asynchronously.",
        "async-entity-tracker": {
            enabled: {
                default: false,
                desc:
                    "Make entity tracking asynchronously, can improve performance significantly, especially in some massive entities in small area situations.<br>" +
                    "<br>" +
                    "__⚡Recommended value: `true` (set `enabled` below to true)__" +
                    '<div class="tip custom-block">' +
                    '<p class="custom-block-title custom-block-title-default">Attention</p>' +
                    'If you installed plugins like Citizens, which uses real, and player type entity as "NPC", also read `compat-mode` below for more infomration.' +
                    "</div>"
            },
            "compat-mode": {
                default: false,
                desc:
                    "Enable compat mode to be compatible with plugins like Citizens or NPC plugins that use real, and player-type entity.<br>" +
                    "If `true`, visibility issue that player-type NPCs may disappear sometimes can be fixed.<br>" +
                    "<br>" +
                    "You should enable `compat-mode` to use async entity tracker feature **ONLY IF** you installed Citizens or any other kind of real entity NPC plugins.<br>" +
                    "<br>" +
                    "But we still recommend to use packet-based / virtual entity NPC plugin to gain better performance, e.g., [ZNPC Plus](https://github.com/Pyrbu/ZNPCsPlus), [Adyeshach](https://github.com/TabooLib/Adyeshach), [Fancy NPC](https://modrinth.com/plugin/fancynpcs), or else, and then `compat-mode` can be disabled."
            },
            "max-threads": {
                default: 0,
                desc:
                    "Maximum number of threads for async entity tracker to use.<br>" +
                    "If the value is set to `0`, it automatically uses 1/4 of the number of CPU cores and no less than 1.<br>" +
                    "<br>" +
                    "__⚡Recommended value: 1/2 of CPU cores__"
            },
            keepalive: {
                default: 60,
                desc:
                    "Thread keepalive time, threads with no tasks will be terminated if they exceed the time.<br>" +
                    "(Unit: second)"
            }
        },
        "async-playerdata-save": {
            enabled: {
                default: false,
                desc:
                    "Make PlayerData saving asynchronously. (I/O operations are expensive)" +
                    '<div class="warning custom-block">' +
                    '<p class="custom-block-title custom-block-title-default">Warning</p>' +
                    "Experimental feature, may cause data lost in some circumstances!" +
                    "</div>"
            }
        },
        "async-pathfinding": {
            enabled: {
                default: false,
                desc:
                    "Make mob pathfinding calculation asynchronously.<br>" +
                    "<br>" +
                    "__⚡Recommended value: `true` (set `enabled` below to true)__"
            },
            "max-threads": {
                default: 0,
                desc:
                    "Maximum number of threads for async entity pathfinding to use.<br>" +
                    "If the value is set to `0`, it automatically uses 1/4 of the number of CPU cores and no less than 1.<br>" +
                    "<br>" +
                    "__⚡Recommended value: 1/3 of CPU cores__"
            },
            keepalive: {
                default: 60,
                desc:
                    "Thread keepalive time, threads with no tasks will be terminated if they exceed the time.<br>" +
                    "(Unit: second)"
            }
        },
        "async-mob-spawning": {
            enabled: {
                default: true,
                desc:
                    "Whether asynchronous mob spawning should be enabled.<br>" +
                    "On servers with many entities, this can improve performance by up to 15%. You must have Paper's `per-player-mob-spawns` config set to `true` for this to work.<br>" +
                    "One quick note: this does not actually spawn mobs async (that would be very unsafe). This just offloads some expensive calculations that are required for mob spawning.<br>" +
                    "<br>" +
                    "__⚡Recommended value: `true`__"
            }
        },
        "async-locator": {
            enabled: {
                default: false,
                desc:
                    "Whether asynchronous locator should be enabled.<br>" +
                    "This offloads structure locating to other threads.<br>" +
                    "Currently available for:" +
                    "<ul>" +
                    "<li>`/locate` command</li>" +
                    "<li>Dolphin treasure finding</li>" +
                    "<li>Eye of ender stronghold finding</li>" +
                    "</ul>" +
                    "<br>" +
                    "__⚡Recommended value: `true` (set `enabled` below to true)__"
            },
            threads: {
                default: 0,
                desc:
                    "Maximum number of threads for async locator to use.<br>" +
                    "If a value &leq; `0` is given, it automatically uses 1 thread.<br>" +
                    "<br>" +
                    "__⚡Recommended value: `1` or `2`__"
            },
            keepalive: {
                default: 60,
                desc:
                    "Thread keepalive time, threads with no tasks will be terminated if they exceed the time.<br>" +
                    "(Unit: second)"
            }
        }
    },

    performance: {
        __desc__:
            "This section contains performance tuning intended to reduce unnecessary calculations or use more efficient methods to optimize the server.",
        "use-virtual-thread-for-async-chat-executor": {
            default: true,
            desc:
                "Whether to use the [Virtual Thread](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html) introduced in JDK 21 for the Async Chat Executor.<br>" +
                "<br>" +
                "__⚡Recommended value: `true`__"
        },
        "use-virtual-thread-for-async-scheduler": {
            default: true,
            desc:
                "Whether to use the [Virtual Thread](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html) introduced in JDK 21 for the CraftAsyncScheduler, which could improve performance of plugin that heavily utilizing Bukkit's async scheduler.<br>" +
                "<br>" +
                "__⚡Recommended value: `true`__"
        },
        "create-snapshot-on-retrieving-blockstate": {
            default: true,
            desc:
                "Whether to create a snapshot (copy) of TileEntity / BlockState data by default when plugins retrieve them.<br>" +
                "<br>" +
                "Some plugins may call `getInventory().getHolder()` to get the holder of an inventory, which involves accessings the BlockState.<br>" +
                "For example, if there are tons of hoppers and plugins call this method when listening to some events (e.g. hopper related events, call frequently). Re-creating BlockState and parsing item stack in massive and frequent calls are very expensive.<br>" +
                "See Paper's [API-to-get-a-BlockState-without-a-snapshot.patch#L6](https://github.com/PaperMC/Paper-archive/blob/b48403bd69f534ffd43fe2afb4e8e1f1ffa95fe1/patches/server/0160-API-to-get-a-BlockState-without-a-snapshot.patch#L6) for more information." +
                "<ul>" +
                "<li>If `true`, always creates snapshot (copy) of BlockState when the plugin calls related methods.</li>" +
                "<li>If `false`, gets real BlockState directly unless the plugin explicitly requests a snapshot. Performance improves, but has risk that block state gets modified due to plugin's poor design.</li>" +
                "</ul>" +
                "<br>" +
                "__⚡Recommended value: `false` (Only if you encounter specific lag described above)__"
        },
        "inactive-goal-selector-throttle": {
            default: true,
            desc:
                "Throttles the [goal selector](https://maven.fabricmc.net/docs/yarn-1.21.4+build.8/net/minecraft/entity/ai/goal/GoalSelector.html) calculations for entities that are inactive (typically far from players).<br>" +
                "Instead of ticking goal selector every tick, it ticks less frequently to every second. This can improve performance slightly, but has minor gameplay implications.<br>" +
                "<br>" +
                "__⚡Recommended value: `true`__" +
                "<table>" +
                "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                "<tr><td><i>Optimization</i></td><td><code>true</code></td></tr>" +
                "<tr><td><i>Vanilla behavior</i></td><td><code>false</code></td></tr>" +
                "</table>"
        },
        "throttle-hopper-when-full": {
            enabled: {
                default: false,
                desc:
                    "Whether to throttle hopper item transfer attempts if the target container is full.<br>" +
                    "Prevents the hopper from constantly trying to push items every tick, even if it keeps failing.<br>" +
                    "<br>" +
                    "__⚡Recommended value: `true` (set `enabled` below to true)__" +
                    "<table>" +
                    "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                    "<tr><td><i>Optimization</i></td><td><code>true</code></td></tr>" +
                    "<tr><td><i>Vanilla behavior</i></td><td><code>false</code></td></tr>" +
                    "</table>"
            },
            "skip-ticks": {
                default: 0,
                desc:
                    "How many ticks a hopper should wait before trying to move items again if the target container is full.<br>" +
                    "(Unit: tick)<br>" +
                    "Only active if `throttle-hopper-when-full.enabled` (described above) is `true`.<br>" +
                    "If a value &leq; `0` is given, this throttling feature is disabled.<br>" +
                    "<br>" +
                    "__⚡Recommended value: `8`__" +
                    "<table>" +
                    "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                    "<tr><td><i>Optimization</i></td><td><code>8</code></td></tr>" +
                    "<tr><td><i>Vanilla behavior</i></td><td><code>8</code></td></tr>" +
                    "</table>"
            }
        },
        "skip-map-item-data-updates-if-map-does-not-have-craftmaprenderer": {
            default: true,
            desc:
                "Whether to skip updating map item data update if the map doesn't have a renderer (`CraftMapRenderer`).<br>" +
                "This can improve performance if using ImageMap kind of plugins that create many custom maps.<br>" +
                "<br>" +
                "__⚡Recommended value: `true`__" +
                "<table>" +
                "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                "<tr><td><i>Optimization</i></td><td><code>true</code></td></tr>" +
                "<tr><td><i>Vanilla behavior</i></td><td><code>false</code></td></tr>" +
                "</table>" +
                '<div class="tip custom-block">' +
                '<p class="custom-block-title custom-block-title-default">Attention</p>' +
                "This may cause vanilla map item data to stop be updated." +
                "</div>"
        },
        "skip-ai-for-non-aware-mob": {
            default: true,
            desc:
                " Whether to skip AI ticks entirely for mobs that are both *inactive* and *unaware*.<br>" +
                "Unaware mobs optimized this way will not perform self actions or react until they become active again, see [Mob.html#setAware(boolean)](https://jd.papermc.io/paper/1.21.4/org/bukkit/entity/Mob.html#setAware(boolean)) for more information.<br>" +
                "<br>" +
                "__⚡Recommended value: `true`__" +
                "<table>" +
                "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                "<tr><td><i>Optimization</i></td><td><code>true</code></td></tr>" +
                "<tr><td><i>Vanilla behavior</i></td><td><code>false</code></td></tr>" +
                "</table>"
        },
        "reduce-packets": {
            __desc__: "This section is for the useless packet reducing features.",
            "reduce-entity-move-packets": {
                default: false,
                desc:
                    "Whether to reduce the useless entity movement packets sent to players (e.g., small movements).<br>" +
                    "This can save bandwidth and reduces client-side processing load, potentially making movement appear smoother during high entity counts or minor lag.<br>" +
                    "<br>" +
                    "__⚡Recommended value: `true`__"
            }
        },
        "optimized-powered-rails": {
            default: true,
            desc:
                "Whether to use optimized powered rails. Uses fully rewritten version of powered rail iteration logic which also keeps vanilla behavior, can achieve 4x faster performance.<br>" +
                "<br>" +
                "__⚡Recommended value: `true`__"
        },
        "optimize-minecart": {
            enabled: {
                default: false,
                desc:
                    "Whether to optimize minecart ticking. By skipping tick collisions to reduce expensive `getEntities()` calls and bukkit event calls.<br>" +
                    "This can handle a large amount of stacked minecarts better which is useful for [Anarchy servers](https://minecraftservers.org/type/anarchy).<br>" +
                    "<br>" +
                    "__⚡Recommended value: `true`__" +
                    "<table>" +
                    "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                    "<tr><td><i>Optimization</i></td><td><code>true</code></td></tr>" +
                    "<tr><td><i>Vanilla behavior</i></td><td><code>false</code></td></tr>" +
                    "</table>"
            },
            "skip-tick-count": {
                default: 30,
                desc:
                    "How many ticks to skip before checking for the next minecart collisions.<br>" +
                    "<br>" +
                    "__⚡Recommended value: `30`__"
            }
        },
        "faster-structure-gen-future-sequencing": {
            default: true,
            desc:
                "Whether to use faster task sequencing for generating structures." +
                '<div class="tip custom-block">' +
                '<p class="custom-block-title custom-block-title-default">Attention</p>' +
                "This may cause the inconsistent order of future compose tasks." +
                "</div>"
        },
        "faster-random-generator": {
            enabled: {
                default: false,
                desc:
                    "Whether to use the faster random generator.<br>" +
                    "Random is used almost everywhere in Minecraft, enable this can get a decent performance improvement.<br>" +
                    "<br>" +
                    "__⚡Recommended value: `true` (set `enabled` below to true)__" +
                    '<div class="tip custom-block">' +
                    '<p class="custom-block-title custom-block-title-default">Attention</p>' +
                    "Requires a JVM that supports `RandomGenerator`. Some JREs don't support this." +
                    "</div>"
            },
            "random-generator": {
                default: "Xoroshiro128PlusPlus",
                desc:
                    "Which random generator will be used?<br>" +
                    "Available random generators can be found in [Random Number Generators in Java](https://www.baeldung.com/java-17-random-number-generators#1-api-design-1).<br>" +
                    "<br>" +
                    "__⚡Recommended value: `Xoroshiro128PlusPlus`__"
            },
            "enable-for-worldgen": {
                default: false,
                desc:
                    "Whether to use the faster random generator for world generation.<br>" +
                    "<ul>" +
                    "<li>If `true`, `Random` calls involved in world generation will use faster random generator you chose in `random-generator` above. The world generation will be slightly different from vanilla.</li>" +
                    "<li>If `false`, `Random` calls involved in world generation will use legacy random generator of vanilla.</li>" +
                    "</ul>" +
                    "<br>" +
                    "__⚡Recommended value: `true`__" +
                    "<table>" +
                    "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                    "<tr><td><i>Optimization</i></td><td><code>true</code></td></tr>" +
                    "<tr><td><i>Vanilla behavior</i></td><td><code>false</code></td></tr>" +
                    "</table>"
            },
            "warn-for-slime-chunk": {
                default: true,
                desc: "Whether server prints a warning message on startup if you are using faster random generator for slime chunk generation."
            },
            "use-legacy-random-for-slime-chunk": {
                default: false,
                desc:
                    "Whether to use legacy random source for slime chunk generation to follow the vanilla behavior.<br>" +
                    "If your server has existing slime farms or related facilities need slime chunk, enable this, otherwise the location of slime chunk will offset.<br>" +
                    "<br>" +
                    "__⚡Recommended value:__ (Depends on your server type, see `Values for goals` below for more.)" +
                    "<table>" +
                    "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                    "<tr><td><i>Optimization</i></td><td><code>false</code></td></tr>" +
                    "<tr><td><i>Vanilla behavior</i></td><td><code>true</code></td></tr>" +
                    "</table>"
            }
        },
        "entity-timeouts": {
            __desc__:
                "These values define an entity's maximum lifespan (i.e. Entity TTL).<br>" +
                "(Unit: tick)<br>" +
                "If an entity is in this list, and it has survived for longer than that number of ticks, then it will be removed. 🛈<br>" +
                "If a value `-1` is given, the Entity TTL check will disable for specific entity.<br>" +
                "<br>" +
                "__⚡Recommended values:__" +
                "<table>" +
                "<thead><tr><th>Entity</th><th>Max Lifespan</th></tr></thead>" +
                "<tbody>" +
                "<tr><td>SNOWBALL</td><td>200</td></tr>" +
                "<tr><td>LLAMA_SPIT</td><td>150</td></tr>" +
                "<tr><td>DRAGON_FIREBALL</td><td>150</td></tr>" +
                "<tr><td>EGG</td><td>300</td></tr>" +
                "<tr><td>FIREBALL</td><td>600</td></tr>" +
                "<tr><td>SMALL_FIREBALL</td><td>400</td></tr>" +
                "<tr><td>WIND_CHARGE</td><td>200</td></tr>" +
                "<tr><td>BREEZE_WIND_CHARGE</td><td>200</td></tr>" +
                "<tr><td>WITHER_SKULL</td><td>200</td></tr>" +
                "</tbody></table>" +
                "🛈 = In here, the time that the entity survived means the total living time of entity, and will not be reset by chunk unloading or loading.",
            ALLAY: {
                default: -1
            },
            AREA_EFFECT_CLOUD: {
                default: -1
            },
            ARMADILLO: {
                default: -1
            },
            ARMOR_STAND: {
                default: -1
            },
            ARROW: {
                default: -1
            },
            AXOLOTL: {
                default: -1
            },
            BAT: {
                default: -1
            },
            BEE: {
                default: -1
            },
            BLAZE: {
                default: -1
            },
            BOAT: {
                default: -1
            },
            BOGGED: {
                default: -1
            },
            BREEZE: {
                default: -1
            },
            BREEZE_WIND_CHARGE: {
                default: -1
            },
            CAMEL: {
                default: -1
            },
            CAT: {
                default: -1
            },
            CAVE_SPIDER: {
                default: -1
            },
            CHEST_BOAT: {
                default: -1
            },
            CHEST_MINECART: {
                default: -1
            },
            CHICKEN: {
                default: -1
            },
            COD: {
                default: -1
            },
            COMMAND_BLOCK_MINECART: {
                default: -1
            },
            COW: {
                default: -1
            },
            CREEPER: {
                default: -1
            },
            DOLPHIN: {
                default: -1
            },
            DONKEY: {
                default: -1
            },
            DRAGON_FIREBALL: {
                default: -1
            },
            DROWNED: {
                default: -1
            },
            EGG: {
                default: -1
            },
            ELDER_GUARDIAN: {
                default: -1
            },
            ENDER_DRAGON: {
                default: -1
            },
            ENDER_PEARL: {
                default: -1
            },
            ENDERMAN: {
                default: -1
            },
            ENDERMITE: {
                default: -1
            },
            EVOKER: {
                default: -1
            },
            EVOKER_FANGS: {
                default: -1
            },
            EXPERIENCE_BOTTLE: {
                default: -1
            },
            EXPERIENCE_ORB: {
                default: -1
            },
            EYE_OF_ENDER: {
                default: -1
            },
            FIREWORK_ROCKET: {
                default: -1
            },
            FOX: {
                default: -1
            },
            FROG: {
                default: -1
            },
            FURNACE_MINECART: {
                default: -1
            },
            GHAST: {
                default: -1
            },
            GIANT: {
                default: -1
            },
            GLOW_SQUID: {
                default: -1
            },
            GOAT: {
                default: -1
            },
            GUARDIAN: {
                default: -1
            },
            HOGLIN: {
                default: -1
            },
            HOPPER_MINECART: {
                default: -1
            },
            HORSE: {
                default: -1
            },
            HUSK: {
                default: -1
            },
            ILLUSIONER: {
                default: -1
            },
            IRON_GOLEM: {
                default: -1
            },
            ITEM: {
                default: -1
            },
            OMINOUS_ITEM_SPAWNER: {
                default: -1
            },
            FIREBALL: {
                default: -1
            },
            LIGHTNING_BOLT: {
                default: -1
            },
            LLAMA: {
                default: -1
            },
            LLAMA_SPIT: {
                default: -1
            },
            MAGMA_CUBE: {
                default: -1
            },
            MOOSHROOM: {
                default: -1
            },
            MULE: {
                default: -1
            },
            OCELOT: {
                default: -1
            },
            PANDA: {
                default: -1
            },
            PARROT: {
                default: -1
            },
            PHANTOM: {
                default: -1
            },
            PIG: {
                default: -1
            },
            PIGLIN: {
                default: -1
            },
            PIGLIN_BRUTE: {
                default: -1
            },
            PILLAGER: {
                default: -1
            },
            POLAR_BEAR: {
                default: -1
            },
            POTION: {
                default: -1
            },
            PUFFERFISH: {
                default: -1
            },
            RABBIT: {
                default: -1
            },
            RAVAGER: {
                default: -1
            },
            SALMON: {
                default: -1
            },
            SHEEP: {
                default: -1
            },
            SHULKER: {
                default: -1
            },
            SHULKER_BULLET: {
                default: -1
            },
            SILVERFISH: {
                default: -1
            },
            SKELETON: {
                default: -1
            },
            SKELETON_HORSE: {
                default: -1
            },
            SLIME: {
                default: -1
            },
            SMALL_FIREBALL: {
                default: -1
            },
            SNIFFER: {
                default: -1
            },
            SNOW_GOLEM: {
                default: -1
            },
            SNOWBALL: {
                default: -1
            },
            SPAWNER_MINECART: {
                default: -1
            },
            SPECTRAL_ARROW: {
                default: -1
            },
            SPIDER: {
                default: -1
            },
            SQUID: {
                default: -1
            },
            STRAY: {
                default: -1
            },
            STRIDER: {
                default: -1
            },
            TADPOLE: {
                default: -1
            },
            TNT_MINECART: {
                default: -1
            },
            TRADER_LLAMA: {
                default: -1
            },
            TRIDENT: {
                default: -1
            },
            TROPICAL_FISH: {
                default: -1
            },
            TURTLE: {
                default: -1
            },
            VEX: {
                default: -1
            },
            VILLAGER: {
                default: -1
            },
            VINDICATOR: {
                default: -1
            },
            WANDERING_TRADER: {
                default: -1
            },
            WARDEN: {
                default: -1
            },
            WIND_CHARGE: {
                default: -1
            },
            WITCH: {
                default: -1
            },
            WITHER: {
                default: -1
            },
            WITHER_SKELETON: {
                default: -1
            },
            WITHER_SKULL: {
                default: -1
            },
            WOLF: {
                default: -1
            },
            ZOGLIN: {
                default: -1
            },
            ZOMBIE: {
                default: -1
            },
            ZOMBIE_HORSE: {
                default: -1
            },
            ZOMBIE_VILLAGER: {
                default: -1
            },
            ZOMBIFIED_PIGLIN: {
                default: -1
            },
            FISHING_BOBBER: {
                default: -1
            }
        },
        "enable-cached-minecraft-to-bukkit-entitytype-convert": {
            default: true,
            desc:
                "Whether to cache the result of *Minecraft EntityType* to *Bukkit EntityType* conversion. It can get a tiny improvement.<br>" +
                "<br>" +
                "__⚡Recommended value: `true`__"
        },
        dab: {
            enabled: {
                default: true,
                desc:
                    "Dynamic Activation of Brain, as known as DAB, optimizes entity's brain to decrease the frequency of their brain ticking when they are far away from players.<br>" +
                    "<br>" +
                    "__⚡Recommended value: `true` (set `enabled` below to true)__" +
                    "<table>" +
                    "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                    "<tr><td><i>Optimization</i></td><td><code>true</code></td></tr>" +
                    "<tr><td><i>Vanilla behavior</i></td><td><code>false</code> (or see <code>dab.blacklisted-entities</code> below for more)</td></tr>" +
                    "</table>"
            },
            "dont-enable-if-in-water": {
                default: false,
                desc:
                    "Whether non-aquatic entities in the water will not be affected by DAB.<br>" +
                    "If `true`, this could fix entities suffocate in the water if they are far from the player. This fixed [Pufferfish's issue#58](https://github.com/pufferfish-gg/Pufferfish/issues/58).<br>" +
                    "<br>" +
                    "__⚡Recommended value: `true`__"
            },
            "start-distance": {
                default: 12,
                desc:
                    "This value determines how far away an entity has to be from the player to start being affected by DAB.<br>" +
                    "<br>" +
                    "__⚡Recommended value: `8`__"
            },
            "max-tick-freq": {
                default: 20,
                desc:
                    "This value defines how often the furthest entity will get their pathfinders and behaviors ticked<br>." +
                    "(Unit: tick, default value 20 ticks = 1s)"
            },
            "activation-dist-mod": {
                default: 8,
                desc:
                    "This value defines how much distance modifies an entity's tick frequency. `freq = (distanceToPlayer^2) / (2^value)`." +
                    "<ul>" +
                    "<li>If you want entities further away to tick __less__ often, use `7`.</li>" +
                    "<li>If you want entities further away to tick __more__ often, try `9`.</li>" +
                    "</ul>" +
                    "<br>" +
                    "__⚡Recommended value: `7`__"
            },
            "blacklisted-entities": {
                default: "[]",
                desc:
                    "A list of entities that will not be affected by DAB.<br>" +
                    "<br>" +
                    'Some survival servers have mob farms which need mobs to have a target. This kind of "pathfinding" mob farm may break by DAB. This situation can be solved by adding specific mob of mob farm into this DAB blacklist.<br>' +
                    "If some specific mob farms are broken in your server, mobs freeze and don't move, and you are not sure whether it is caused by DAB. You can try to add them into this blacklist to see if it fixes the issue.<br>" +
                    "<br>" +
                    "Format: `[VILLAGER]` or `[VILLAGER, ZOMBIFIED_PIGLIN]` (You can find all entity types in [Paper's Javadoc](https://jd.papermc.io/paper/1.21.1/org/bukkit/entity/EntityType.html))." +
                    // This is completely broken.
                    '<details class="tip custom-block">' +
                    '<summary class="custom-block-title custom-block-title-default">Want to Go Deeper?</summary>' +
                    "For the format of `dab.blacklisted-entities`, it accepts all valid format of a YAML list.<br>" +
                    "<br>" +
                    "If you only need to add one entity into blacklist, these formats below are allowed:" +
                    "```yaml" +
                    "dab:" +
                    "  blacklisted-entities: [VILLAGER]" +
                    "```" +
                    "or" +
                    "```yaml" +
                    "dab:" +
                    "  blacklisted-entities:" +
                    "    - VILLAGER" +
                    "```" +
                    "And if you need to add multiple entities into blacklist, these formats below are allowed:" +
                    "```yaml" +
                    "dab:" +
                    "  blacklisted-entities: [VILLAGER, ZOMBIFIED_PIGLIN]" +
                    "```" +
                    "or" +
                    "```yaml" +
                    "dab:" +
                    "  blacklisted-entities:" +
                    "    - VILLAGER" +
                    "    - ZOMBIFIED_PIGLIN" +
                    "```" +
                    "If you are not sure, use [YAML Checker](https://yamlchecker.org/), or any online YAML syntax validator to check your config."
            }
        },
        "dont-save-entity": {
            "dont-save-primed-tnt": {
                default: false,
                desc:
                    "Disable save primed tnt on chunk unloads.<br>" +
                    "It can prevent machines from being exploded by TNT when the player accidentally disconnected or chunk unloads when the player is far away. Useful for survival servers which have machines involved TNT.<br>" +
                    "<br>" +
                    "__⚡Recommended value: `true`__"
            },
            "dont-save-falling-block": {
                default: false,
                desc: "Disable save falling block on chunk unloads.<br>" + "<br>" + "__⚡Recommended value: `true`__"
            }
        }
    },

    fixes: {
        __desc__: "This section contains bugfixes for specific issues.",
        "dont-place-player-if-server-full": {
            default: false,
            desc:
                "Whether to disallow player join a server if the server is full.<br>" +
                "If `true`, you should give player `purpur.joinfullserver` permission instead of using `PlayerLoginEvent#allow` to enable player to join a full server."
        }
    },

    "gameplay-mechanisms": {
        __desc__: "This section contains the features that modify the game mechanics.",
        "use-spigot-item-merging-mechanism": {
            default: true,
            desc: "Whether to use Spigot's dropped item merging mechanism."
        },
        "smooth-teleport": {
            default: false,
            desc:
                'hether to make a "smooth teleport" when players change dimension.<br>' +
                "This requires original world and target world that have the same logical height to work." +
                '<div class="warning custom-block">' +
                '<p class="custom-block-title custom-block-title-default">Warning</p>' +
                "Experimental feature, report any bugs you encounter!" +
                "</div>"
        },
        "max-item-stack-count": {
            __desc__:
                "Configurable max stack size of dropped item." +
                '<div class="warning custom-block">' +
                '<p class="custom-block-title custom-block-title-default">Warning</p>' +
                "We __do not__ recommended to use this feature. It is working in progress and has known issues.<br>" +
                "This feature also maybe remove in the future. __Do not__ touch this unless you know what you are doing!" +
                "</div>",
            "max-dropped-items-stack-count": {
                default: 0,
                desc: "Maximum number of dropped items to stack."
            },
            "max-container-destroy-count": {
                default: 0,
                desc: "Maximum count of items to drop when container is destroyed."
            }
        },
        knockback: {
            __desc__: "This section contains options to adjust knockback related behaviors.",
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
                desc: "Whether the player can knockback zombies."
            }
        },
        player: {
            "disable-moved-wrongly-threshold": {
                default: false,
                desc:
                    "Whether to disable the Spigot built-in moved too quickly / wrongly checks for players and vehicles.<br>" +
                    "If `true`, players can move or use vehicles (e.g. Minecart) to move with abnormal speed.<br>" +
                    "<br>" +
                    "__⚡Recommended value: `true`__"
            },
            "max-use-item-distance": {
                default: 1.0000001,
                desc:
                    "The max distance that the player is allowed to interact with an item.<br>" +
                    "<br>" +
                    "Some [Anarchy servers](https://minecraftservers.org/type/anarchy) or similar type of servers may allow players to use hacks / cheats. If you want players able to use crystal related modules that are packet-based (e.g. CEV Breaker, BedAura), you may need to adjust this value.<br>" +
                    "It's better to set value to `10.0000001`, to allow using related hack modules." +
                    "<br>" +
                    "If a value `-1` is given, the check of max allowed distance to use an item will be disabled.<br>" +
                    "<br>" +
                    "__⚡Recommended value: `10.0000001` (For anarchy server)__" +
                    '<div class="tip custom-block">' +
                    '<p class="custom-block-title custom-block-title-default">Attention</p>' +
                    "If set to `-1`, players are able to use some packet modules of hack clients, and also [Nocom Exploit](https://github.com/nerdsinspace/nocom-explanation)!" +
                    "</div>"
            }
        },
        "afk-command": {
            enabled: {
                default: false,
                desc:
                    "Wether to enable rhe AFK command based on Minecraft built-in [idle-timeout mechanism](https://minecraft.wiki/w/Server.properties#:~:text=player%20have%20to%20idle).<br>" +
                    "Players can use /afk command to switch their AFK mode, and their AFK status can be shown in Tab list.<br> " +
                    "Rest of AFK settings, configurable AFK messages, title messages, are in Purpur config."
            }
        }
    },

    network: {
        __desc__: "This section contains features for server networking related.",
        "protocol-support": {
            __desc__:
                "This section contains features that provide extra protocol support for some QoL / Utility mods.<br>" +
                "<br>" +
                "The extra protocol support is only functional if there is corresponding client-side mod installed. It means if a specific protocol support is enabled, and a player installed that mod on client, they can get the additional features described in each config below. But for players who have no corresponding mod installed, then everything is the same as before." +
                '<div class="tip custom-block">' +
                '<p class="custom-block-title custom-block-title-default">Attention</p>' +
                "The protocol support may cause incompatibility with the [ViaVersion](https://modrinth.com/plugin/viaversion).<br>" +
                " We recommend players to use client that has same version with the server core and install latest corresponding mod, otherwise they may unable to join the server." +
                "</div>",
            "jade-protocol": {
                default: false,
                desc:
                    "Whether to enable [Jade](https://modrinth.com/mod/jade) protocol support.<br>" +
                    "If `true`, player who has Jade mod installed, can display item information inside the storage container, progress of furnace, brewing stand, foods on the campfire, bee data in beehive, and more vanilla-friendly features."
            },
            "appleskin-protocol": {
                default: false,
                desc:
                    "Whether to enable [AppleSkin](https://modrinth.com/mod/appleskin) protocol support.<br>" +
                    "If `true`, player who has AppleSkin mod installed, can display the accurate saturation / exhaustion values on the client."
            },
            "asteorbar-protocol": {
                default: false,
                desc:
                    "Whether to enable [AsteorBar](https://modrinth.com/mod/asteorbar) protocol support.<br>" +
                    "If `true`, player who has AsteorBar mod installed, can display the accurate saturation / exhaustion values on the client."
            },
            "chatimage-protocol": {
                default: false,
                desc:
                    "Whether to enable [ChatImage](https://modrinth.com/mod/chatimage) protocol support.<br>" +
                    "If `true`, player who has ChatImage mod installed, can see the image sent by others using CICode format."
            },
            "xaero-map-protocol": {
                default: false,
                desc:
                    "Whether to enable [XaeroMap](https://modrinth.com/mod/xaeros-minimap) protocol support.<br>" +
                    "If `true`, player who has Xaero's MiniMap mod or Xaero's WorldMap mod installed, can store players' coordinate points and death points based on server's `protocol-support.xaero-map-server-id` below, to prevent points from been deleted / refreshed if server name or IP address changed."
            },
            "xaero-map-server-id": {
                default: 513317,
                desc: "Numeric id for XaeroMap to identify the server. This will generate randomly on first start."
            },
            "syncmatica-protocol": {
                default: false,
                desc:
                    "Whether to enable [Syncmatica](https://modrinth.com/mod/syncmatica) protocol support.<br>" +
                    "If `true`, player who has Syncmatica mod installed, can upload their [Litematica](https://modrinth.com/mod/litematica) schematics files or download shared schematics files from the server. Every player with Syncmatica mod installed can access shared schematics uploaded by others."
            },
            "syncmatica-quota": {
                default: false,
                desc: "Whether to enable maximum file size limit for each shared schematics file of Litematica mod."
            },
            "syncmatica-quota-limit": {
                default: 40000000,
                desc:
                    "Maximum file size, in bytes, for each shared schematics file uploading to server.<br>" +
                    "(Unit: byte, default value 40,000,000 bytes ≈ 38 MB)"
            }
        },
        "chat-message-signature": {
            default: true,
            desc:
                "Whether to enable chat message signature which introduced since Minecraft 1.19.1.<br>" +
                "If `false`, players' chat messages become unable to report, and the insecure warning popup when player joined the server will be disabled.<br>" +
                "<br>" +
                "__⚡Recommended value: `false`__"
        }
    },

    misc: {
        __desc__: "This section contains some miscellaneous features.",
        message: {
            "unknown-command": {
                default: "<red><lang:command.unknown.command><newline><detail>",
                desc:
                    "Unknown command message, will send to player if they execute an unknown command.<br>" +
                    "The message needs to use [MiniMessage](https://docs.advntr.dev/minimessage/format) format.<br>" +
                    "If set message to `default` or leave the default value, the vanilla unknown command message will be used.<br>" +
                    "<br>" +
                    "Available placeholders:" +
                    "<ul>" +
                    "<li>__`<detail>`__ - the detailed information of the unknown command.</li>" +
                    "</ul>" +
                    '<div class="tip custom-block">' +
                    '<p class="custom-block-title custom-block-title-default">API / Plugin Friendly</p>' +
                    "This feature is API / plugin friendly." +
                    "It means that this message can be overrided by plugins using `UnknownCommandEvent#message` or `UnknownCommandEvent#setMessage`." +
                    "</div>"
            }
        },
        rebrand: {
            "server-mod-name": {
                default: "Leaf",
                desc: "Server brand name that shows in F3 menu and server MOTD."
            },
            "server-gui-name": {
                default: "Leaf Console",
                desc: "Server GUI window name, if you launched server without adding `--nogui` option in the startup flag."
            }
        },
        sentry: {
            __desc__:
                "[Sentry](https://sentry.io/welcome/) is an application monitor service for improved error logging, tracing. Helping the server dev team to maintain better.<br>" +
                "<br>" +
                "After enabled Sentry integration for your server, you don't need to audit long logs to find errors manually. Sentry can collect errors happened in your server, enable you to track errors on Sentry's web panel and help you to locate and fix them easier and faster.<br>" +
                "<br>" +
                "See __[How to Setup Sentry](../../how-to/setup-sentry.md)__ to know how to set up and get the DSN key for `sentry.dsn` below.<br>",
            dsn: {
                default: "",
                desc:
                    "The DSN key of your Sentry.<br>" + "If an empty value `''` is given, the Sentry will be disabled."
            },
            "log-level": {
                default: "WARN",
                desc: "Logs with a level higher than or equal to this level will be recorded."
            },
            "only-log-thrown": {
                default: true,
                desc: "Only to log with a Throwable will be recorded after enabling this.  "
            }
        },
        "secure-seed": {
            enabled: {
                default: false,
                desc:
                    "Whether to use secure seed.<br>" +
                    "All ores and structures are generated with 1024-bit seed instead of using 64-bit seed in vanilla, made seed cracker become impossible.<br>" +
                    "If used in the existing world, then the secure seed will only apply to new generating chunks.<br>" +
                    "<br>" +
                    "__⚡Recommended value: `true` (set `enabled` below to true)__" +
                    "<table>" +
                    "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                    "<tr><td><i>Optimization</i></td><td>-</td></tr>" +
                    "<tr><td><i>Vanilla behavior</i></td><td><code>false</code></td></tr>" +
                    "</table>"
            }
        },
        "remove-vanilla-username-check": {
            default: true,
            desc:
                "Whether to remove vanilla's username check to allow __all characters__ as username, including Chinese, etc. (It's only useful for offline servers).<br>" +
                "If `true`, players are allowed to use non-English name to join the server."
        },
        "remove-spigot-check-bungee-config": {
            default: true,
            desc: "Whether player can enter backend server via proxy, without the backend server to enable bungeecord mode in `spigot.yml`."
        },
        "remove-change-non-editable-sign-warning": {
            default: false,
            desc:
                "Whether the server prints warning when players tried to edit the sign that they are not allowed to edit.<br>" +
                "Enable this to prevent console spam in some cases.<br>" +
                "<br>" +
                "__⚡Recommended value: `true`__"
        },
        "region-format-settings": {
            __desc__:
                "Linear is a region file format that uses [ZSTD compression](https://facebook.github.io/zstd/) instead of ZLIB in vanilla Minecraft. This format saves about ~50% of disk space.<br>" +
                "To use Linear region format, make sure you __Read [Linear Documentation](https://github.com/xymb-endcrystalme/LinearRegionFileFormatTools)__, and have done all steps required, then change `region-format-settings.region-format` below to `LINEAR`." +
                '<div class="warning custom-block">' +
                '<p class="custom-block-title custom-block-title-default">Warning</p>' +
                "Experimental feature, there is potential risk to lose chunk data. Backup your server before switching to Linear.<br>" +
                "Also, we do not recommend using Linear, since vanilla's ANVIL format (.mca) is enough. Leaf uses the refactored version of the Linear flush system, which is safer but slower to save chunks to make data lost less possible. However this change is worth it, data is invaluable." +
                "</div>",
            "region-format": {
                default: "MCA",
                desc: 'Available region formats: `"MCA"`, `"LINEAR"`.'
            },
            "linear-compress-level": {
                default: 1,
                desc: "The compression level for Linear region format file."
            },
            "throw-on-unknown-extension-detected": {
                default: false,
                desc: "Whether to throw error to crash the server when unknown region format extension is detected."
            },
            "flush-interval-seconds": {
                default: 5,
                desc: "The flush interval for Linear region format file data.<br>" + "(Unit: second)"
            }
        },
        "lag-compensation": {
            enabled: {
                default: false,
                desc:
                    "Lag compensation, which could ensure the basic game experience for players when server is lagging or low TPS situation.<br>" +
                    "<br>" +
                    "__⚡Recommended value: `true` (set `enabled` below to true)__"
            },
            "enable-for-water": {
                default: false,
                desc:
                    "Whether to enable lag compensation for water flowing.<br>" +
                    "<br>" +
                    "__⚡Recommended value: `true`__"
            },
            "enable-for-lava": {
                default: false,
                desc:
                    "Whether to enable lag compensation for lava flowing.<br>" +
                    "<br>" +
                    "__⚡Recommended value: `true`__"
            }
        },
        "including-5s-in-get-tps": {
            default: true,
            desc:
                "Whether to include 5-second TPS in the result of API `Bukkit#getTPS` and `Server#getTPS`.<br>" +
                "<ul>" +
                "<li>If `true`, you can use `getTPS` method to get a TPS long array with 4 elements (`5s, 1m, 5m, 15m`).</li>" +
                "<li>If `false`, you can use `getTPS` method to get a TPS long array with 3 elements (`1m, 5m, 15m`).</li>" +
                "</ul>" +
                '<details class="tip custom-block">' +
                '<summary class="custom-block-title custom-block-title-default">Want to Go Deeper?</summary>' +
                "If you are using Gale API or Leaf API for your plugins. Or runinng on Leaf and use reflection to get TPS, you can use `Bukkit#getTPSIncluding5SecondAverage`, to get the TPS array including 5-seconds TPS (`5s, 1m, 5m, 15m`).<br>" +
                "Also, you can use `Bukkit#get5SecondTPSAverage` to get the average value of 5-seconds TPS in `double`." +
                "</details>"
        },
        "hidden-item-components": {
            default: "[]",
            desc:
                "Controls whether specified component information is sent to clients. This may break resource packs and client mods that rely on this information. It needs a component type list, incorrect things will not work.<br>" +
                'For example, you can fill it with `["custom_data"]` to hide components of *CUSTOM_DATA*. Also, it can avoid some frequent client animations.' +
                '<div class="tip custom-block">' +
                '<p class="custom-block-title custom-block-title-default">Attention</p>' +
                "You must know what you're filling in and how it works! It handles all item stacks!" +
                "</div>"
        },
        "connection-message": {
            __desc__:
                "Connection message, broadcasts to all online players, when they join or quit the server.<br>" +
                "The message needs to use [MiniMessage](https://docs.advntr.dev/minimessage/format) format.<br>" +
                "If set message to `default` or leave the default value, the vanilla join / quit message will be used.<br>" +
                "<br>" +
                "Available placeholders:" +
                "<ul>" +
                "<li>__`%player_name%`__ - player name.</li>" +
                "<li>__`%player_displayname%`__ - player display name.</li>" +
                "</ul>" +
                '<div class="tip custom-block">' +
                '<p class="custom-block-title custom-block-title-default">API / Plugin Friendly</p>' +
                "This feature is API / plugin friendly." +
                "It means that the connection message can be overrided by plugins using `PlayerJoinEvent` or `PlayerQuitEvent`." +
                "</div>",
            join: {
                enabled: {
                    default: true
                },
                message: {
                    default: "default",
                    desc: "The join message of the player."
                }
            },
            quit: {
                enabled: {
                    default: true
                },
                message: {
                    default: "default",
                    desc: "The left message of the player."
                }
            }
        },
        cache: {
            "cache-player-profile-result": {
                default: true,
                desc:
                    "Whether to cache the player profile result when they joined server.<br>" +
                    "It's useful if Mojang's authentication server is down."
            },
            "cache-player-profile-result-timeout": {
                default: 1440,
                desc:
                    "The timeout of the player profile cache.<br>" +
                    "(Unit: minute)<br>" +
                    "If the given timeout is exceeded, it will send another request to Mojang's authentication server to get profile data on player's next join.<br>"
            }
        }
    }
};

export default config;
