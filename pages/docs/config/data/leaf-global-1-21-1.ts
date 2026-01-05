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
                desc: `Whether to make entity tracking asynchronous.<br>
                    This can improve performance significantly, especially in situations with a large number of entities in a small area.<br>
                    <br>
                    __⚡Recommended value: \`true\`__<br>
                    <br>
                    <div class="tip custom-block">
                    <p class="custom-block-title custom-block-title-default">Attention</p>
                    If you installed plugins like Citizens, which uses the real entity or player-type entity as the "NPC", also read \`compat-mode\` below for more information.
                    </div>`
            },
            "compat-mode": {
                default: false,
                desc: `Whether to enable compatibility mode for plugins like Citizens or NPC plugins that use the real, player-type entity.<br>
                    If set to \`true\`, the visibility issue that player-type NPCs may disappear sometimes can be fixed.<br>
                    <br>
                    You should enable \`compat-mode\` to use the async entity tracker feature __ONLY IF__ you installed Citizens or any other kind of real entity NPC plugins.<br>
                    <br>
                    But we still recommend using packet-based / virtual entity NPC plugin to gain better performance, e.g., [ZNPC Plus](https://github.com/Pyrbu/ZNPCsPlus), [Adyeshach](https://github.com/TabooLib/Adyeshach), [Fancy NPC](https://modrinth.com/plugin/fancynpcs), or else, and then \`compat-mode\` can be disabled.`
            },
            "max-threads": {
                default: 0,
                desc: `Maximum number of threads for async entity pathfinding to use.<br>
                    For example:<br>
                    <ul>
                    <li>If a value &lt; \`0\` is given, it automatically uses the number of CPU cores plus the value as the count of threads, with a minimum of 1.</li>
                    <li>If set to \`0\`, it automatically uses 1/4 of the number of CPU cores, with a minimum of 1.</li>
                    </ul>
                    <br>
                    __⚡Recommended value: 1/2 of CPU cores__`
            },
            keepalive: {
                default: 60,
                desc: `The thread keepalive time, threads with no tasks will be terminated if they exceed the time.<br>
                    (Unit: second)`
            }
        },
        "async-playerdata-save": {
            enabled: {
                default: false,
                desc: `Whether to make player data saving asynchronous (I/O operations are expensive).<br>
                    <br>
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">Experimental</p>
                    Experimental feature, may cause data loss or data inconsistency in some circumstances!
                    </div>`
            }
        },
        "async-pathfinding": {
            enabled: {
                default: false,
                desc: `Whether to make the mob pathfinding calculation asynchronously.<br>
                    <br>
                    __⚡Recommended value: \`true\`__`
            },
            "max-threads": {
                default: 0,
                desc: `Maximum number of threads for async mob pathfinding to use.<br>
                    If a value &leq; \`0\` is given, it automatically uses 1/4 of the number of CPU cores, with a minimum of 1.<br>
                    <br>
                    __⚡Recommended value: 1/3 of CPU cores__`
            },
            keepalive: {
                default: 60,
                desc: `The thread keepalive time, threads with no tasks will be terminated if they exceed the time.<br>
                    (Unit: second)`
            }
        },
        "async-mob-spawning": {
            enabled: {
                default: true,
                desc: `Whether to make mob spawning asynchronous.<br>
                    <br>
                    On servers with heavy mob spawning, this can improve performance by up to ~15%. You must have Paper's \`per-player-mob-spawns\` config set to \`true\` for this to work.<br>
                    One quick note: this does not actually spawn mobs async (that would be very unsafe). This just offloads some expensive calculations that are required for mob spawning.<br>
                    <br>
                    __⚡Recommended value: \`true\`__`
            }
        },
        "async-locator": {
            enabled: {
                default: false,
                desc: `Whether to make locator finding structures asynchronous.<br>
                    This offloads structure locating to other threads.<br>
                    Currently available for:
                    <ul>
                    <li>\`/locate\` command</li>
                    <li>Dolphin treasure finding</li>
                    <li>Eye of Ender stronghold finding</li>
                    </ul>
                    <br>
                    __⚡Recommended value: \`true\`__`
            },
            threads: {
                default: 0,
                desc: `Maximum number of threads for async locator to use.<br>
                    If a value &leq; \`0\` is given, it automatically uses 1 thread.<br>
                    <br>
                    __⚡Recommended value: \`1\` or \`2\`__`
            },
            keepalive: {
                default: 60,
                desc: `The thread keepalive time, threads with no tasks will be terminated if they exceed the time.<br>
                    (Unit: second)`
            }
        }
    },

    performance: {
        __desc__:
            "This section contains performance tuning intended to reduce unnecessary calculations or use more efficient methods to optimize the server.",
        "use-virtual-thread-for-async-chat-executor": {
            default: true,
            desc: `Whether to use the [Virtual Thread](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html) introduced in Java 21 for the __Async Chat Executor__.<br>
                <br>
                __⚡Recommended value: \`true\`__`
        },
        "use-virtual-thread-for-async-scheduler": {
            default: true,
            desc: `Whether to use the [Virtual Thread](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html) introduced in Java 21 for the __CraftAsyncScheduler__, which could improve the performance of plugins that heavily utilize Bukkit's async scheduler.<br>
                <br>
                __⚡Recommended value: \`true\` (Only if all plugins support Virtual Thread)__`
        },
        "create-snapshot-on-retrieving-blockstate": {
            default: true,
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
                __⚡Recommended value: \`false\` (Only if you encounter specific lag described above)__`
        },
        "inactive-goal-selector-throttle": {
            default: true,
            desc: `Whether to throttle the [goal selector](https://maven.fabricmc.net/docs/yarn-1.21.1+build.3/net/minecraft/entity/ai/goal/GoalSelector.html) calculations for entities that are inactive (typically far from players).<br>
                Instead of ticking the goal selector every tick, it ticks less frequently every second. This can improve performance slightly, but has minor gameplay implications.<br>
                <br>
                __⚡Recommended value: \`true\`__
                <table>
                <tr><td><b>Values for goals</b></td><td></td></tr>
                <tr><td><i>Optimization</i></td><td><code>true</code></td></tr>
                <tr><td><i>Vanilla behavior</i></td><td><code>false</code></td></tr>
                </table>`
        },
        "throttle-hopper-when-full": {
            enabled: {
                default: false,
                desc: `Whether to throttle hopper item transfer attempts if the target container is full.<br>
                    Prevents the hopper from constantly trying to push items every tick, even if it keeps failing.<br>
                    <br>
                    __⚡Recommended value: \`true\`__
                    <table>
                    <tr><td><b>Values for goals</b></td><td></td></tr>
                    <tr><td><i>Optimization</i></td><td><code>true</code></td></tr>
                    <tr><td><i>Vanilla behavior</i></td><td><code>false</code></td></tr>
                    </table>`
            },
            "skip-ticks": {
                default: 0,
                desc: `How many ticks should a hopper wait before trying to move items again if the target container is full.<br>
                    (Unit: tick)<br>
                    Only active if \`throttle-hopper-when-full.enabled\` above is \`true\`.<br>
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
        "skip-map-item-data-updates-if-map-does-not-have-craftmaprenderer": {
            default: true,
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
                </div>`
        },
        "skip-ai-for-non-aware-mob": {
            default: true,
            desc: `Whether to skip AI ticks entirely for mobs that are both _inactive_ and _unaware_.<br>
                Unaware mobs optimized this way will not perform self actions or react until they become active again, see [Mob.html#setAware(boolean)](https://jd.papermc.io/paper/1.21.1/org/bukkit/entity/Mob.html#setAware(boolean)) for more information.<br>
                <br>
                __⚡Recommended value: \`true\`__
                <table>
                <tr><td><b>Values for goals</b></td><td></td></tr>
                <tr><td><i>Optimization</i></td><td><code>true</code></td></tr>
                <tr><td><i>Vanilla behavior</i></td><td><code>false</code></td></tr>
                </table>`
        },
        "reduce-packets": {
            __desc__: "This section is for the useless packet-reducing features.",
            "reduce-entity-move-packets": {
                default: false,
                desc: `Whether to reduce the useless entity movement packets sent to players (e.g., small movements).<br>
                    This can save bandwidth and reduce client-side processing load, potentially to make movement appear smoother during high entity counts or minor lag.<br>
                    <br>
                    __⚡Recommended value: \`true\`__`
            }
        },
        "optimized-powered-rails": {
            default: true,
            desc: `Whether to use optimized powered rails.<br>
                Uses a fully rewritten version of powered rail iteration logic, which also keeps vanilla behavior, and can achieve 4x faster performance.<br>
                The implementation is originally based on the fabric mod [FX's Rail Optimization](https://modrinth.com/mod/rail-optimization) made by [Fx Morin](https://github.com/FxMorin).<br>
                <br>
                __⚡Recommended value: \`true\`__`
        },
        "optimize-minecart": {
            enabled: {
                default: false,
                desc: `Whether to optimize minecart ticking. By skipping tick collisions to reduce expensive \`getEntities()\` calls and Bukkit event calls.<br>
                    This can handle a large amount of stacked minecarts better, which is useful for [Anarchy servers](https://minecraftservers.org/type/anarchy).<br>
                    <br>
                    __⚡Recommended value: \`true\`__
                    <table>
                    <tr><td><b>Values for goals</b></td><td></td></tr>
                    <tr><td><i>Optimization</i></td><td><code>true</code></td></tr>
                    <tr><td><i>Vanilla behavior</i></td><td><code>false</code></td></tr>
                    </table>`
            },
            "skip-tick-count": {
                default: 30,
                desc: `How many ticks to skip before checking for the next minecart collisions.<br>
                    <br>
                    __⚡Recommended value: \`30\`__`
            }
        },
        "faster-structure-gen-future-sequencing": {
            default: true,
            desc: `Whether to use faster task sequencing for generating structures.<br>
                <br>
                __⚡Recommended value: \`true\`__<br>
                <br>
                <div class="tip custom-block">
                <p class="custom-block-title custom-block-title-default">Attention</p>
                This may cause the inconsistent order of future compose tasks in rare edge cases, which may lead to different structure generation results.
                </div>`
        },
        "faster-random-generator": {
            enabled: {
                default: false,
                desc: `Whether to use the faster random generator introduced in Java 17.<br>
                    Random is used almost everywhere in Minecraft, enabling this can get a decent performance improvement.<br>
                    <br>
                    __⚡Recommended value: \`true\`__<br>
                    <br>
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
                    </div>`
            },
            "warn-for-slime-chunk": {
                default: true,
                desc: "Whether the server prints a warning message on startup if the faster random generator for slime chunk generation is enabled."
            },
            "use-legacy-random-for-slime-chunk": {
                default: false,
                desc: `Whether to use legacy random source (\`java.util.Random\`) for slime chunk generation to follow the vanilla behavior.<br>
                    If your server has existing slime farms or related facilities that need slime chunk, enable this; otherwise, the location of slime chunk will be offset.<br>
                    <br>
                    __⚡Recommended value: (Depends on your server type, see \`Values for goals\` below for more)__
                    <table>
                    <tr><td><b>Values for goals</b></td><td></td></tr>
                    <tr><td><i>Optimization</i></td><td><code>false</code></td></tr>
                    <tr><td><i>Vanilla behavior</i></td><td><code>true</code></td></tr>
                    </table>`
            }
        },
        "enable-cached-minecraft-to-bukkit-entitytype-convert": {
            default: true,
            desc: `Whether to cache the result of *Minecraft EntityType* to *Bukkit EntityType* conversion. This conversion can be somewhat expensive, especially in the spawning logic, so caching it can improve performance slightly.<br>
                <br>
                __⚡Recommended value: \`true\`__`
        },
        dab: {
            __desc__:
                "Dynamic Activation of Brain, also known as DAB, optimizes the brain of entities by decreasing the frequency of their brain ticking when they are far away from players. It is a worthwhile trade-off to improve performance if there are many entities.",
            enabled: {
                default: true,
                desc: `Whether to enable the DAB.<br>
                    <br>
                    __⚡Recommended value: \`true\`__
                    <table>
                    <tr><td><b>Values for goals</b></td><td></td></tr>
                    <tr><td><i>Optimization</i></td><td><code>true</code></td></tr>
                    <tr><td><i>Vanilla behavior</i></td><td><code>false</code> (or see <code>dab.blacklisted-entities</code> below for more)</td></tr>
                    </table>`
            },
            "dont-enable-if-in-water": {
                default: false,
                desc: `Whether the non-aquatic entities in the water will be excluded by DAB. This can fix [Pufferfish#58](https://github.com/pufferfish-gg/Pufferfish/issues/58).<br>
                    If set to \`true\`, this could fix entities suffocating in the water if they are far from the player.<br>
                    <br>
                    __⚡Recommended value: \`true\`__`
            },
            "start-distance": {
                default: 12,
                desc: `The distance determines how far away an entity has to be from the player to start being affected by DAB.<br>
                    (Unit: block)<br>
                    <br>
                    __⚡Recommended value: \`8\`__`
            },
            "max-tick-freq": {
                default: 20,
                desc: `The maximum tick time defines how often the furthest entity will get their pathfinders and behaviors ticked.<br>
                    (Unit: tick, default value 20 ticks = 1s)`
            },
            "activation-dist-mod": {
                default: 8,
                desc: `The tick frequency that defines how much distance modifies an entity's tick frequency. \`freq = (distanceToPlayer^2) / (2^value)\`.
                    <ul>
                    <li>If you want entities further away to tick __less__ often, try \`7\`.</li>
                    <li>If you want entities further away to tick __more__ often, try \`9\`.</li>
                    </ul>
                    <br>
                    __⚡Recommended value: \`7\`__`
            },
            "blacklisted-entities": {
                default: "[]",
                desc: `A list of entity types that will not be affected by DAB.<br>
                    <br>
                    Some survival servers have mob farms, which need mobs to have a target. This kind of "pathfinding" mob farm may be broken by DAB. This situation can be solved by adding specific mobs of the mob farm to this DAB blacklist.<br>
                    If some specific mob farms are broken in your server, mobs freeze and don't move, and you are not sure whether it is caused by DAB. You can try to add them to this blacklist to see if it fixes the issue.<br>
                    <br>
                    Format: \`[villager]\` or \`[villager, zombified_piglin]\` (You can find all entity types in [Paper's Javadoc](https://jd.papermc.io/paper/1.21.1/org/bukkit/entity/EntityType.html)).<br>
                    <br>
                    [💡 Want to Go Deeper?](guides/dab-blacklist-format)`
            }
        },
        "dont-save-entity": {
            "dont-save-primed-tnt": {
                default: false,
                desc: `Whether to disable saving primed TNT on chunk unloads.<br>
                    This can prevent machines or redstone builds from being exploded by TNT when the player accidentally disconnects or when the chunk unloads when the player is far away. Useful for redstone/technical/survival servers that have machines involving TNTs.<br>
                    <br>
                    __⚡Recommended value: \`true\`__`
            },
            "dont-save-falling-block": {
                default: false,
                desc: `Whether to disable saving falling blocks on chunk unloads.<br>
                    This can prevent potential issues with glitched or duplicated falling blocks (sand, gravel, etc.) after server restarts or chunk loads, especially if caused by lag.<br>
                    <br>
                    __⚡Recommended value: \`true\`__`
            }
        },
        "entity-timeouts": {
            __desc__: `These values define an entity's maximum lifespan (i.e., Entity TTL).<br>
                (Unit: tick)<br>
                If an entity is in this list and it has survived for longer than that number of ticks, then it will be removed. ⓘ<br>
                If a value \`-1\` is given, the Entity TTL check will be disabled for a specific entity.<br>
                <br>
                __⚡Recommended values:__
                <table>
                <thead><tr><th>Entity</th><th>Max Lifespan</th></tr></thead>
                <tbody>
                <tr><td>SNOWBALL</td><td>200</td></tr>
                <tr><td>LLAMA_SPIT</td><td>150</td></tr>
                <tr><td>DRAGON_FIREBALL</td><td>150</td></tr>
                <tr><td>EGG</td><td>300</td></tr>
                <tr><td>FIREBALL</td><td>600</td></tr>
                <tr><td>SMALL_FIREBALL</td><td>400</td></tr>
                <tr><td>WIND_CHARGE</td><td>200</td></tr>
                <tr><td>BREEZE_WIND_CHARGE</td><td>200</td></tr>
                <tr><td>WITHER_SKULL</td><td>200</td></tr>
                </tbody></table>
                ⓘ = In here, the time that the entity survived means the total living time of the entity, and will not be reset by chunk unloading or loading.`,
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
        }
    },

    fixes: {
        __desc__: "This section contains bug fixes for specific issues.",
        "dont-place-player-if-server-full": {
            default: false,
            desc: `Whether to disallow players from joining if the server is full (defined as \`max-players\` in \`server.properties\`).<br>
                This option fixed [Paper#10668](https://github.com/PaperMC/Paper/issues/10668).<br>
                <br>
                If set to \`true\`, you should grant player \`purpur.joinfullserver\` permission rather than using \`PlayerLoginEvent#allow\` API to allow players to bypass the limit.`
        }
    },

    "gameplay-mechanisms": {
        __desc__: "This section contains the features that modify or improve the game mechanics.",
        "use-spigot-item-merging-mechanism": {
            default: true,
            desc: `Whether to merge dropped items based on their tick sequence, which is the long-standing default behavior of Spigot.<br>
                <br>
                In Spigot, the item entity that ticks later will merge into the earlier ticking one. If the merge radius is relatively larger, it can prevent dropped items from getting stuck at unexpected locations. So that this is useful for farms or redstone builds that can create numerous dropped items.<br>
                However, in vanilla, the item merging is based on the item count of the stack. The stack with the smaller count will merge with the one with the larger count.
                <table>
                <tr><td><b>Values for goals</b></td><td></td></tr>
                <tr><td><i>SMP friendly</i></td><td><code>true</code></td></tr>
                <tr><td><i>Vanilla behavior</i></td><td><code>false</code></td></tr>
                </table>`
        },
        "smooth-teleport": {
            default: false,
            desc: `Whether to make a "smooth teleport" when players change dimensions.<br>
                This requires original world and target world that have the same logical height to work.<br>
                <br>
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">Experimental</p>
                Experimental feature, actively testing, please report any bugs you encounter.
                </div>`
        },
        "max-item-stack-count": {
            __desc__: `Configurable max stack size of dropped item.<br>
                <br>
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">Warning</p>
                We __do not__ recommend using this feature. It is a work in progress and has known issues.<br>
                This feature may also be removed in the future. __Do not__ touch this unless you know what you are doing!
                </div>`,
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
                desc: "Whether the player can knockback zombies using the hand, weapon, projectile, etc."
            }
        },
        player: {
            "disable-moved-wrongly-threshold": {
                default: false,
                desc: `Whether to disable the Spigot built-in moves too quickly / wrongly checks for players and vehicles.<br>
                    If set to \`true\`, players can move or use vehicles (e.g., Minecart) to move at an abnormal speed.<br>
                    <br>
                    __⚡Recommended value: \`true\`__`
            },
            "max-use-item-distance": {
                default: 1.0000001,
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
                    </div>`
            }
        },
        "afk-command": {
            enabled: {
                default: false,
                desc: `Whether to enable the AFK command based on Minecraft's built-in [idle-timeout mechanism](https://minecraft.wiki/w/Server.properties#:~:text=player%20have%20to%20idle). Players can use /afk command to switch their AFK mode, and their AFK status can be shown in the Tab list.<br>
                    <br>
                    Also set \`kick-if-idle\` to \`false\` in Purpur config, to prevent players from being kicked when they enter AFK mode. The rest of the AFK settings, configurable AFK messages, and title messages are in Purpur config.`
            }
        }
    },

    network: {
        __desc__: "This section contains features related to server networking.",
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
            "jade-protocol": {
                default: false,
                desc: `Whether to enable [Jade](https://modrinth.com/mod/jade) protocol support.<br>
                    If set to \`true\`, players who have the Jade mod installed can display item information inside the storage container, progress of the furnace, brewing stand, foods on the campfire, bee data in the beehive, and more vanilla-friendly features.`
            },
            "appleskin-protocol": {
                default: false,
                desc: `Whether to enable [AppleSkin](https://modrinth.com/mod/appleskin) protocol support.<br>
                    If set to \`true\`, players who have the AppleSkin mod installed can display the accurate saturation/exhaustion values on the client.`
            },
            "asteorbar-protocol": {
                default: false,
                desc: `Whether to enable [AsteorBar](https://modrinth.com/mod/asteorbar) protocol support.<br>
                    If set to \`true\`, players who have the AsteorBar mod installed can display the accurate saturation/exhaustion values on the client.`
            },
            "chatimage-protocol": {
                default: false,
                desc: `Whether to enable [ChatImage](https://modrinth.com/mod/chatimage) protocol support.<br>
                    If set to \`true\`, players who have the ChatImage mod installed can see the image sent by others using the CICode format.`
            },
            "xaero-map-protocol": {
                default: false,
                desc: `Whether to enable [XaeroMap](https://modrinth.com/mod/xaeros-minimap) protocol support.<br>
                    If set to \`true\`, players who have Xaero's MiniMap mod or Xaero's WorldMap mod installed can store players' coordinate points and death points based on the server's \`protocol-support.xaero-map-server-id\` below.`
            },
            "xaero-map-server-id": {
                default: 513317,
                desc: `Unique number ID for XaeroMap to identify the server.<br>
                    This can prevent points from being deleted/refreshed if the server name or IP address changes. Change this value if needed.<br>
                    This value will be generated randomly on the first server start.`
            },
            "syncmatica-protocol": {
                default: false,
                desc: `Whether to enable [Syncmatica](https://modrinth.com/mod/syncmatica) protocol support.<br>
                    If set to \`true\`, players who have Syncmatica mod installed can upload their [Litematica](https://modrinth.com/mod/litematica) schematic files or download shared schematics files from the server. Every player with the Syncmatica mod installed can access shared schematics uploaded by others.`
            },
            "syncmatica-quota": {
                default: false,
                desc: "Whether to enable the maximum file size limit for each shared schematics file of the Litematica mod."
            },
            "syncmatica-quota-limit": {
                default: 40000000,
                desc: `The maximum file size of each shared schematic file is uploaded to the server.<br>
                    (Unit: byte, default value 40,000,000 bytes ≈ 38 MB)`
            }
        },
        "chat-message-signature": {
            default: true,
            desc: `Whether to enable chat message signature, which was introduced in Minecraft 1.19.1.<br>
                <ul>
                <li>If set to \`true\`, messages are signed and able to report just like in vanilla.</li>
                <li>If set to \`false\`, the chat signature is disabled. Players are unable to report messages, and the insecure warning pop-up will be disabled when the player joins the server.</li>
                </ul>
                <br>
                __⚡Recommended value: \`false\`__ (Only for offline-mode server or servers that have alternative moderation methods)`
        }
    },

    misc: {
        __desc__: "This section contains some miscellaneous features.",
        message: {
            "unknown-command": {
                default: "<red><lang:command.unknown.command><newline><detail>",
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
                    </div>`
            }
        },
        rebrand: {
            "server-mod-name": {
                default: "Leaf",
                desc: "The server brand name that will be shown on the client's F3 debug menu and server MOTD."
            },
            "server-gui-name": {
                default: "Leaf Console",
                desc: "The title displayed on the server GUI window, if you launched the server without adding the \`--nogui\` option in the startup flag."
            }
        },
        sentry: {
            __desc__: `[Sentry](https://sentry.io/welcome/) is an application monitor service for improved error logging and tracing. Helping the server dev team to maintain better.<br>
                <br>
                After enabling Sentry integration for your server, you don't need to audit long logs to find errors manually. Sentry can collect errors that happened in your server, enable you to track errors on Sentry's web panel, and help you to locate and fix them more easily and quickly.<br>
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
                    The valid values for this option are: \`"WARN"\`, \`"ERROR"\`, and \`"FATAL"\`.`
            },
            "only-log-thrown": {
                default: true,
                desc: "Whether the Sentry only records the log with Java's \`Throwable\`."
            }
        },
        "secure-seed": {
            enabled: {
                default: false,
                desc: `Whether to use the secure seed.<br>
                    <br>
                    The secure seed ensures that all ores and structures are generated with a 1024-bit seed using a high security cryptographic hash function instead of using a 64-bit seed like in vanilla. This protects the structure seeds with computational secrecy and makes the seed cracking nearly impossible.<br>
                    <br>
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">Warning</p>
                    The secure seed fundamentally changes the positions of ore and structure compared to vanilla.<br>
                    It only applies to newly generated chunks. Thus, you must prepare a new world if you want to enable this option.<br>
                    Once this option is enabled, you can not disable it to return to the vanilla generation, unless you pre-generate the entire world, or newly generated chunks will have terrain mismatch.
                    </div>`
            }
        },
        "remove-vanilla-username-check": {
            default: true,
            desc: `Whether to remove vanilla's username check to allow __all characters__ as usernames, including Chinese, etc. (It's only useful for offline servers).<br>
                If set to \`true\`, players are allowed to use a non-English name to join the server.`
        },
        "remove-spigot-check-bungee-config": {
            default: true,
            desc: `Whether the player can enter the backend server via proxy, without the backend server enabling BungeeCord mode in \`spigot.yml\`.<br>
                <br>
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">Warning</p>
                This option is not recommended to touch, unless you are sure what you are doing.<br>
                And it may be removed in the future.
                </div>`
        },
        "remove-change-non-editable-sign-warning": {
            default: false,
            desc: `Whether the server prints a warning message when players try to edit the sign that they are not allowed to edit.<br>
                The warning message looks like: \`Player [...] just tried to change non-editable sign\`.<br>
                If set to \`true\`, it will prevent console spam caused by player actions or other cases.<br>
                <br>
                __⚡Recommended value: \`true\`__`
        },
        "region-format-settings": {
            __desc__: `Linear is a region file format that uses [zstd compression](https://facebook.github.io/zstd/) instead of zlib in vanilla Minecraft. This format saves about ~50% of disk space.<br>
                To use Linear region format, make sure you __read [Linear Documentation](https://github.com/xymb-endcrystalme/LinearRegionFileFormatTools)__, and have done all steps required, then change \`region-format\` below to \`LINEAR\`.<br>
                <br>
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">Warning</p>
                Experimental feature, there is a potential risk of losing chunk data. Backup your server before switching to Linear.<br>
                Also, we do not recommend using Linear, since vanilla's ANVIL format (\`.mca\`) is enough. Leaf uses the refactored version of the Linear flush system, which is safer but slower to save chunks to make data loss less likely. However, this trade-off is worthwhile, since data is invaluable.
                </div>`,
            "region-format": {
                default: "MCA",
                desc: `Specifies the format used for saving chunk data in region files.<br>
                    Available region formats:<br>
                    <ul>
                    <li>\`MCA\`: Standard Minecraft ANVIL format using zlib compression.</li>
                    <li>\`LINEAR\`: The Linear v1 format. The refactored version by [EarthMe](https://github.com/MrHua269) fixed the Linear flush system.</li>
                    </ul>`
            },
            "linear-compress-level": {
                default: 1,
                desc: `The compression level of the Linear region format file.<br>
                    This only has any effect if \`region-format\` above is \`LINEAR\`.<br>
                    <br>
                    <ul>
                    <li>If set to a higher level (up to \`22\`), it provides better compression ratios but requires significantly more CPU time for compression.</li>
                    <li>If set to a lower level, it compresses faster, but requires more space. The level 1 uses the fastest and lightest compression.</li>
                    </ul>`
            },
            "throw-on-unknown-extension-detected": {
                default: false,
                desc: `Whether to throw an error and crash the server when an unknown or unmatched region format extension is detected during loading region files from the disk.<br>
                    It can prevent data corruption from accidentally configured wrong region file formats in the same world.<br>
                    <br>
                    For example:<br>
                    If set to \`true\`, the server will crash immediately when loaded \`.linear\` files when \`region-format\` above is \`MCA\`, or vice-versa.`
            },
            "flush-interval-seconds": {
                default: 5,
                desc: `How often the server attempts to flush cached Linear region file data to the disk.<br>
                More frequent flushing reduces potential data loss on a crash but increases disk I/O.<br>
                (Unit: second)`
            }
        },
        "lag-compensation": {
            enabled: {
                default: false,
                desc: `The lag compensation is designed to mitigate the gameplay impact of server lag spikes or low TPS situations, which could ensure the basic game experience for players during the lag.<br>
                    <br>
                    __⚡Recommended value: \`true\`__`
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
        "including-5s-in-get-tps": {
            default: true,
            desc: `Whether to include 5-second TPS in the result of API \`Bukkit#getTPS\` and \`Server#getTPS\`.<br>
                Commands like \`/tps\` display it regardless.<br>
                <ul>
                <li>If set to \`true\`, you can use the \`getTPS\` method to get a TPS long array with 4 elements \`[5s, 1m, 5m, 15m]\`.</li>
                <li>If set to \`false\`, you can use the \`getTPS\` method to get a TPS long array with 3 elements \`[1m, 5m, 15m]\`.</li>
                </ul>
                <br>
                <details class="tip custom-block">
                <summary class="custom-block-title custom-block-title-default">Want to Go Deeper?</summary>
                If you are using the Leaf API for your plugins. Or running on Leaf and using reflection to get TPS, you can use \`Bukkit#getTPSIncluding5SecondAverage\`, to get the TPS array including 5-second TPS \`[5s, 1m, 5m, 15m]\`.<br>
                Also, you can use \`Bukkit#get5SecondTPSAverage\` to get the average value of 5-second TPS in \`double\`.
                </details>`
        },
        "hidden-item-components": {
            default: "[]",
            desc: `The list of component type keys that will be hidden from the player's inventory sent to clients.<br>
                    <br>
                    It can be used to hide complex component data on an item to reduce rendering load, frequent animations on the client side, and network usage. The actual item data will not be affected.<br>
                    <br>
                    It is noted that this option is different from Paper's [item obfuscation](https://docs.papermc.io/paper/reference/global-configuration/#anticheat_obfuscation_items_enable_item_obfuscation). This option only hides item component data from the player's own inventory, instead of hiding data sent to others.<br>
                    For example:<br>
                    <ul>
                    <li>If a value \`[]\` is given, no item will be affected.</li>
                    <li>If a value \`[\"minecraft:custom_data\"]\` is given, the item's \`custom_data\` component will be hidden on the player's client.</li>
                    </ul>
                    <br>
                    See [List of components](https://minecraft.wiki/w/Data_component_format#List_of_components) to get the full list of available component type keys for items.<br>
                    <br>
                    <div class="tip custom-block">
                    <p class="custom-block-title custom-block-title-default">Attention</p>
                    It may break resource packs, client mods, or specific gameplay mechanics that rely on these client-side component data of items. Use with caution. You must know what components you are hiding!
                    </div>`
        },
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
                    default: true,
                    desc: "Whether to broadcast a message when the player joins."
                },
                message: {
                    default: "default",
                    desc: "The join message of the player."
                }
            },
            quit: {
                enabled: {
                    default: true,
                    desc: "Whether to broadcast a message when the player quits."
                },
                message: {
                    default: "default",
                    desc: "The quit message of the player."
                }
            }
        },
        cache: {
            "cache-player-profile-result": {
                default: true,
                desc: `Whether to cache the player's profile data (e.g., UUID, username, skin/cape textures) when they joined the server.<br>
                        This can reduce network requests to Mojang's authentication server, and is also useful if the authentication server is temporarily unavailable, and still allows players to rejoin the server using cached profile data.`
            },
            "cache-player-profile-result-timeout": {
                default: 1440,
                desc: `The timeout of the player profile cache.<br>
                    (Unit: minute, default value 1440 minutes = 24 hours)<br>
                    If the given timeout is exceeded, the server will send another request to fetch player profile data from Mojang's authentication server on the player's next join.`
            }
        }
    }
};

export default config;
