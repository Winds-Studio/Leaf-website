import type { ConfigRoot } from "@/.vitepress/theme/components/config/types";

const config: ConfigRoot = {
    _version: {
        default: 1
    },

    "gameplay-mechanics": {
        "arrow-movement-resets-despawn-counter": {
            default: false,
            desc:
                "Whether the [despawn counter](https://minecraft.wiki/w/Mob_spawning#Despawning) of arrows will restart when the arrow starts falling (e.g. when the block it is stuck in gets broken)." +
                "<table>" +
                "<tr><td></td><td><b>Default</b></td><td></td><td></td></tr>" +
                "<tr><td><b>Recommended&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>" +
                "<tr><td>-<br></td><td><code>false</code></td><td><code>true</code></td><td><code>true</code></td></tr>" +
                "</table>" +
                "<table>" +
                "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                "<tr><td><i>Optimization</i></td><td><code>false</code></td></tr>" +
                "<tr><td><i>Vanilla behavior</i></td><td><code>true</code></td></tr>" +
                "</table>"
        },
        "entities-can-random-stroll-into-non-ticking-chunks": {
            default: true,
            desc:
                "Whether entities that are wandering around randomly can also pathfind into non-ticking chunks." +
                "<table>" +
                "<tr><td></td><td><b>Default</b></td><td></td><td></td></tr>" +
                "<tr><td><b>Recommended&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>" +
                "<tr><td>-<br></td><td><code>true</code></td><td><code>true</code></td><td><code>true</code></td></tr>" +
                "</table>" +
                "<table>" +
                "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                "<tr><td><i>Optimization</i></td><td><code>false</code></td></tr>" +
                "<tr><td><i>Vanilla behavior</i></td><td><code>true</code></td></tr>" +
                "</table>"
        },
        "entity-wake-up-duration-ratio-standard-deviation": {
            default: 0.2,
            desc:
                "If a value > `0` is given, waking up inactive entities happens spread over time, instead of many entities at once.<br>" +
                "This makes entities feel and behave more natural.<br>" +
                "<br>" +
                "This setting is the [coefficient of variation](https://en.wikipedia.org/wiki/Coefficient_of_variation), or `σ / μ` (the ratio of the standard deviation to the mean) of the inactivity duration.<br>" +
                "<br>" +
                "In other words, this setting is the value `σ`, so that the regular inactivity duration will be multiplied by a factor `normal_distribution(μ = 1, σ)`.<br>" +
                "<br>" +
                "If a value &leq; `0` is given, variable entity wake-up is disabled." +
                "<table>" +
                "<tr><td></td><td><b>Default</b></td><td></td><td></td></tr>" +
                "<tr><td><b>Recommended&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>" +
                "<tr><td><code>0.2</code><br></td><td><code>0.2</code></td><td><code>0.0</code></td><td>-</td></tr>" +
                "</table>" +
                "<table>" +
                "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                "<tr><td><i>Optimization</i></td><td>-</td></tr>" +
                "<tr><td><i>Paper behavior</i></td><td><code>0.0</code></td></tr>" +
                "</table>"
        },
        fixes: {
            "broadcast-crit-animations-as-the-entity-being-critted": {
                default: false,
                desc:
                    "Whether to broadcast crit animations as the entity being critted.<br>" +
                    "<br>" +
                    "This does not affect where the crit animation is shown: it is always shown on the entity being critted.<br>" +
                    "However, normally (if set to `false`), the crit animation is broadcast as the player doing the crit, meaning anyone who cannot see the player cannot see the crit.<br>" +
                    "<br>" +
                    "If set to `true`, the crit animation is broadcast as the entity being hit, meaning anyone that can see the entity can see the crit." +
                    "<table>" +
                    "<tr><td></td><td><b>Default</b></td><td></td><td></td></tr>" +
                    "<tr><td><b>Recommended&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>" +
                    "<tr><td>-<br></td><td><code>false</code></td><td><code>false</code></td><td><code>false</code></td></tr>" +
                    "</table>" +
                    "<table>" +
                    "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                    "<tr><td><i>Optimization</i></td><td>-</td></tr>" +
                    "<tr><td><i>Vanilla behavior</i></td><td><code>false</code></td></tr>" +
                    "</table>"
            },
            "keep-mooshroom-rotation-after-shearing": {
                default: true,
                desc:
                    "Whether to make mooshrooms keep their rotation after being sheared (fixes part of [MC-88967](https://bugs.mojang.com/browse/MC-88967))." +
                    "<table>" +
                    "<tr><td></td><td><b>Default</b></td><td></td><td></td></tr>" +
                    "<tr><td><b>Recommended&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>" +
                    "<tr><td>-<br></td><td><code>true</code></td><td><code>false</code></td><td><code>false</code></td></tr>" +
                    "</table>" +
                    "<table>" +
                    "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                    "<tr><td><i>Optimization</i></td><td>-</td></tr>" +
                    "<tr><td><i>Vanilla behavior</i></td><td><code>false</code></td></tr>" +
                    "</table>"
            },
            "mc-110386": {
                default: true,
                desc:
                    "Whether to fix [MC-110386](https://bugs.mojang.com/browse/MC-110386)." +
                    "<table>" +
                    "<tr><td></td><td><b>Default</b></td><td></td></tr>" +
                    "<tr><td><b>Recommended&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>" +
                    "<tr><td><code>true</code></td><td><code>true</code></td><td><code>false</code></td><td><code>false</code></td></tr>" +
                    "</table>"
            },
            "mc-121706": {
                default: false,
                desc:
                    "Whether to fix [MC-121706](https://bugs.mojang.com/browse/MC-121706)." +
                    "<table>" +
                    "<tr><td></td><td><b>Default</b></td><td></td></tr>" +
                    "<tr><td><b>Recommended&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>" +
                    "<tr><td><code>true</code></td><td><code>false</code></td><td><code>false</code></td><td><code>false</code></td></tr>" +
                    "</table>"
            },
            "mc-238526": {
                default: false,
                desc:
                    "Whether to fix [MC-238526](https://bugs.mojang.com/browse/MC-238526)." +
                    "<table>" +
                    "<tr><td></td><td><b>Default</b></td><td></td></tr>" +
                    "<tr><td><b>Recommended&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>" +
                    "<tr><td>-</td><td><code>false</code></td><td><code>false</code></td><td><code>false</code></td></tr>" +
                    "</table>"
            },
            "mc-31819": {
                default: true,
                desc:
                    "Whether to fix [MC-31819](https://bugs.mojang.com/browse/MC-31819)." +
                    "<table>" +
                    "<tr><td></td><td><b>Default</b></td><td></td></tr>" +
                    "<tr><td><b>Recommended&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>" +
                    "<tr><td><code>true</code></td><td><code>true</code></td><td><code>false</code></td><td><code>false</code></td></tr>" +
                    "</table>"
            }
        },
        "hide-flames-on-entities-with-fire-resistance": {
            default: false,
            desc:
                "Whether to hide visual flames for entities that are on fire, but also have the Fire Resistance potion effect." +
                "<table>" +
                "<tr><td></td><td><b>Default</b></td><td></td><td></td></tr>" +
                "<tr><td><b>Recommended&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>" +
                "<tr><td>-<br></td><td><code>false</code></td><td><code>false</code></td><td><code>false</code></td></tr>" +
                "</table>" +
                "<table>" +
                "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                "<tr><td><i>Optimization</i></td><td><code>true</code></td></tr>" +
                "<tr><td><i>Vanilla behavior</i></td><td><code>false</code></td></tr>" +
                "</table>"
        },
        technical: {
            "load-portal-destination-chunk-before-entity-teleport": {
                default: false,
                desc:
                    "Whether to fully load chunks before teleporting an entity, when an entity enters a portal.<br>" +
                    "This forces the entire server to wait for the chunk to be loaded." +
                    "<table>" +
                    "<tr><td></td><td><b>Default</b></td><td></td><td></td></tr>" +
                    "<tr><td><b>Recommended&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>" +
                    "<tr><td><code>false</code><br></td><td><code>false</code></td><td><code>false</code></td><td><code>false</code></td></tr>" +
                    "</table>" +
                    "<table>" +
                    "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                    "<tr><td><i>Optimization</i></td><td><code>false</code></td></tr>" +
                    "<tr><td><i>Vanilla behavior</i></td><td><code>false</code></td></tr>" +
                    "</table>"
            }
        },
        "try-respawn-ender-dragon-after-end-crystal-place": {
            default: true,
            desc:
                "Whether able to attempt to respawn the ender dragon after an end crystal has been placed in one of the right positions on the fountain." +
                "<table>" +
                "<tr><td></td><td><b>Default</b></td><td></td><td></td></tr>" +
                "<tr><td><b>Recommended&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>" +
                "<tr><td>-<br></td><td><code>true</code></td><td><code>true</code></td><td><code>true</code></td></tr>" +
                "</table>" +
                "<table>" +
                "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                "<tr><td><i>Optimization</i></td><td>-</td></tr>" +
                "<tr><td><i>Vanilla behavior</i></td><td><code>true</code></td></tr>" +
                "</table>"
        }
    },

    "small-optimizations": {
        "load-chunks": {
            __desc__: "Whether to load chunks at certain times.",
            "to-activate-climbing-entities": {
                default: false,
                desc:
                    "Whether to load chunks to activate climbing entities.<br>" +
                    "<br>" +
                    'In Paper, entities, like zombies, that are "climbing" (e.g. going down a ladder) get priority to be activated.<br>' +
                    "To check whether an entity is climbing, the block it is in must be checked.<br>" +
                    "This can lead to the entire server having to wait for a chunk to load when an entity moves just over the edge.<br>" +
                    "<br>" +
                    'If set to `false`, this is prevented: the server will not check the "climbing" priority for entities that are in unloaded chunks. This prevents unnecessary server hangs.' +
                    "<table>" +
                    "<tr><td></td><td><b>Default</b></td><td></td><td></td></tr>" +
                    "<tr><td><b>Recommended&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>" +
                    "<tr><td><code>false</code></td><td><code>false</code></td><td><code>true</code></td><td>-</td></tr>" +
                    "</table>" +
                    "<table>" +
                    "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                    "<tr><td><i>Optimization</i></td><td><code>false</code></td></tr>" +
                    "<tr><td><i>Paper behavior</i></td><td><code>true</code></td></tr>" +
                    "</table>"
            },
            "to-spawn-phantoms": {
                default: false,
                desc:
                    "Whether to load chunks to spawn phantoms.<br>" +
                    "If set to `false`, when the server attempts to spawn a phantom in an unloaded chunk, nothing happens." +
                    "<table>" +
                    "<tr><td></td><td><b>Default</b></td><td></td><td></td></tr>" +
                    "<tr><td><b>Recommended&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>" +
                    "<tr><td><code>false</code></td><td><code>false</code></td><td><code>true</code></td><td><code>true</code></td></tr>" +
                    "</table>" +
                    "<table>" +
                    "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                    "<tr><td><i>Optimization</i></td><td><code>false</code></td></tr>" +
                    "<tr><td><i>Vanilla behavior</i></td><td><code>true</code></td></tr>" +
                    "</table>"
            }
        },
        "max-projectile-chunk-loads": {
            __desc__: "Settings for loading chunks for projectiles (e.g. when an arrow, trident or ender pearl enters an unloaded chunk).",
            "per-projectile": {
                max: {
                    default: 10,
                    desc:
                        "The maximum number of chunks that can be synchronously loaded by a projectile throughout its lifetime.<br>" +
                        "If a value < `0` is given, this setting is disabled: i.e. the number of chunks loaded by a projectile will be unlimited." +
                        "<table>" +
                        "<tr><td></td><td><b>Default</b></td><td></td><td></td></tr>" +
                        "<tr><td><b>Recommended&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>" +
                        "<tr><td><code>8</code></td><td><code>10</code></td><td><code>-1</code></td><td><code>-1</code></td></tr>" +
                        "</table>" +
                        "<table>" +
                        "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                        "<tr><td><i>Optimization</i></td><td><code>8</code></td></tr>" +
                        "<tr><td><i>Vanilla behavior</i></td><td><code>-1</code></td></tr>" +
                        "</table>"
                },
                "remove-from-world-after-reach-limit": {
                    default: false,
                    desc:
                        "Whether to remove projectiles that cross the `max` threshold (described above) from the world entirely.<br>" +
                        "<br>" +
                        "Removing projectiles from the world is risky, because this will also affect projectiles such as tridents that are valuable to players, so it is not recommended to set this value to `true` unless you accept that risk." +
                        "<table>" +
                        "<tr><td></td><td><b>Default</b></td><td></td><td></td></tr>" +
                        "<tr><td><b>Recommended&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>" +
                        "<tr><td><code>false</code></td><td><code>false</code></td><td><code>false</code></td><td><code>false</code></td></tr>" +
                        "</table>" +
                        "<table>" +
                        "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                        "<tr><td><i>Optimization</i></td><td><code>true</code> in extreme circumstances, but this is risky</td></tr>" +
                        "<tr><td><i>Vanilla behavior</i></td><td><code>false</code></td></tr>" +
                        "</table>"
                },
                "reset-movement-after-reach-limit": {
                    default: false,
                    desc:
                        "Whether to set the planar velocity of projectiles that cross the `max` threshold (described above) to `0`, so that they stop attempting to cross chunk boundaries.<br>" +
                        "<br>" +
                        "This has no effect if `remove-from-world-after-reach-limit` (described above) is `true`." +
                        "<table>" +
                        "<tr><td></td><td><b>Default</b></td><td></td><td></td></tr>" +
                        "<tr><td><b>Recommended&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>" +
                        "<tr><td>-</td><td><code>false</code></td><td><code>false</code></td><td><code>false</code></td></tr>" +
                        "</table>" +
                        "<table>" +
                        "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                        "<tr><td><i>Optimization</i></td><td><code>true</code></td></tr>" +
                        "<tr><td><i>Vanilla behavior</i></td><td><code>false</code></td></tr>" +
                        "</table>"
                }
            },
            "per-tick": {
                default: 10,
                desc:
                    "The maximum number of chunks that can be synchronously loaded by all projectiles in one world in a tick.<br>" +
                    "<br>" +
                    "If a value < `0` is given, this setting is disabled: i.e. the number of chunks loaded by projectiles per tick will be unlimited." +
                    "<table>" +
                    "<tr><td></td><td><b>Default</b></td><td></td><td></td></tr>" +
                    "<tr><td><b>Recommended&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>" +
                    "<tr><td><code>10</code></td><td><code>10</code></td><td><code>-1</code></td><td><code>-1</code></td></tr>" +
                    "</table>" +
                    "<table>" +
                    "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                    "<tr><td><i>Optimization</i></td><td><code>2</code></td></tr>" +
                    "<tr><td><i>Vanilla behavior</i></td><td><code>-1</code></td></tr>" +
                    "</table>"
            }
        },
        "reduced-intervals": {
            "acquire-poi-for-stuck-entity": {
                default: 60,
                desc:
                    "The extra interval (on top of the regular interval) for entities that are stuck (e.g. in a vehicle) to attempt to acquire a POI (such as a villager job block).<br>" +
                    "(Unit: tick)<br>" +
                    "If they become unstuck during this time, they will immediately be free to acquire a POI again.<br>" +
                    "For example, if set to `100`, stuck entities will try to find a POI every 5 seconds.<br>" +
                    "<br>" +
                    "If a value < `0` is given, it will default to the same as Paper's behavior." +
                    "<table>" +
                    "<tr><td></td><td><b>Default</b></td><td></td><td></td></tr>" +
                    "<tr><td><b>Recommended&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>" +
                    "<tr><td><code>60</code></td><td><code>60</code></td><td><code>200</code></td><td><code>0</code></td></tr>" +
                    "</table>" +
                    "<table>" +
                    "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                    "<tr><td><i>Optimization</i></td><td><code>200</code></td></tr>" +
                    "<tr><td><i>Vanilla behavior</i></td><td><code>0</code></td></tr>" +
                    "</table>"
            },
            "check-nearby-item": {
                hopper: {
                    __desc__: "Frequency with which hoppers check for items to pick up.<br>" +
                        "This only affects picking up in-world (e.g. dropped) items, not pulling items from chests or other storage blocks.",
                    interval: {
                        default: 1,
                        desc:
                            "Frequency with which hopper blocks check for items to pick up.<br>" +
                            "(Unit: tick)<br>" +
                            "For example, if set to `20`, hoppers will check for items above them every second.<br>" +
                            "<br>" +
                            "If a value &leq; `0` is given, it will default to the same as Paper's behavior." +
                            "<table>" +
                            "<tr><td></td><td><b>Default</b></td><td></td><td></td></tr>" +
                            "<tr><td><b>Recommended&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>" +
                            "<tr><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td></tr>" +
                            "</table>" +
                            "<table>" +
                            "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                            "<tr><td><i>Optimization</i></td><td><code>50</code></td></tr>" +
                            "<tr><td><i>Vanilla behavior</i></td><td><code>1</code></td></tr>" +
                            "</table>"
                    },
                    minecart: {
                        interval: {
                            default: 1,
                            desc:
                                "The same as the `interval` setting above, but for hopper minecarts." +
                                "<table>" +
                                "<tr><td></td><td><b>Default</b></td><td></td><td></td></tr>" +
                                "<tr><td><b>Recommended&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>" +
                                "<tr><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td></tr>" +
                                "</table>" +
                                "<table>" +
                                "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                                "<tr><td><i>Optimization</i></td><td><code>20</code></td></tr>" +
                                "<tr><td><i>Vanilla behavior</i></td><td><code>1</code></td></tr>" +
                                "</table>"
                        },
                        "temporary-immunity": {
                            __desc__: "Hopper minecarts can have temporary immunity from the `interval` setting above.<br>" +
                                "While a minecart is immune, it can check for items every tick.",
                            "check-for-minecart-near-item-interval": {
                                default: 20,
                                desc:
                                    "How often to check for hopper minecarts near items, to give the minecarts temporary immunity from the `interval` setting.<br>" +
                                    "(Unit: tick)<br>" +
                                    "If a value &leq; `0` is given, it behaves like `1`." +
                                    "<table>" +
                                    "<tr><td></td><td><b>Default</b></td><td></td><td></td></tr>" +
                                    "<tr><td><b>Recommended&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>" +
                                    "<tr><td><code>20</code></td><td><code>20</code></td><td>-</td><td>-</td></tr>" +
                                    "</table>" +
                                    "<table>" +
                                    "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                                    "<tr><td><i>Optimization</i></td><td><code>20</code></td></tr>" +
                                    "<tr><td><i>Vanilla behavior</i></td><td>- (for vanilla behavior, <code>interval</code> must be set to 1)</td></tr>" +
                                    "</table>"
                            },
                            "check-for-minecart-near-item-while-active": {
                                default: false,
                                desc:
                                    "Whether to check for hopper minecarts near items that are __active__, to give the minecarts temporary immunity from the `interval` setting." +
                                    "<table>" +
                                    "<tr><td></td><td><b>Default</b></td><td></td><td></td></tr>" +
                                    "<tr><td><b>Recommended&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>" +
                                    "<tr><td><code>false</code></td><td><code>false</code></td><td>-</td><td>-</td></tr>" +
                                    "</table>" +
                                    "<table>" +
                                    "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                                    "<tr><td><i>Optimization</i></td><td><code>false</code></td></tr>" +
                                    "<tr><td><i>Vanilla behavior</i></td><td>- (for vanilla behavior, <code>interval</code> must be set to 1)</td></tr>" +
                                    "</table>"
                            },
                            "check-for-minecart-near-item-while-inactive": {
                                default: true,
                                desc:
                                    "Whether to check for hopper minecarts near items that are __inactive__, to give the minecarts temporary immunity from the `interval` setting." +
                                    "<table>" +
                                    "<tr><td></td><td><b>Default</b></td><td></td><td></td></tr>" +
                                    "<tr><td><b>Recommended&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>" +
                                    "<tr><td><code>false</code></td><td><code>true</code></td><td>-</td><td>-</td></tr>" +
                                    "</table>" +
                                    "<table>" +
                                    "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                                    "<tr><td><i>Optimization</i></td><td><code>false</code></td></tr>" +
                                    "<tr><td><i>Vanilla behavior</i></td><td>- (for vanilla behavior, <code>interval</code> must be set to 1)</td></tr>" +
                                    "</table>"
                            },
                            duration: {
                                default: 100,
                                desc:
                                    "The duration of temporary immunity from the `interval` setting for hopper minecarts.<br>" +
                                    "(Unit: tick)<br>" +
                                    "If a value &leq; `0` is given, hopper minecarts will never have temporary immunity from the `interval` setting." +
                                    "<table>" +
                                    "<tr><td></td><td><b>Default</b></td><td></td><td></td></tr>" +
                                    "<tr><td><b>Recommended&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>" +
                                    "<tr><td><code>100</code></td><td><code>100</code></td><td>-</td><td>-</td></tr>" +
                                    "</table>" +
                                    "<table>" +
                                    "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                                    "<tr><td><i>Optimization</i></td><td><code>75</code></td></tr>" +
                                    "<tr><td><i>Vanilla behavior</i></td><td>- (for vanilla behavior, <code>interval</code> must be set to 1)</td></tr>" +
                                    "</table>"
                            },
                            "max-item-horizontal-distance": {
                                default: "24.0",
                                desc:
                                    "The maximum horizontal distance a dropped item can be away from a hopper minecart be to give it temporary immunity from the `interval` setting.<br>" +
                                    "(Unit: block)<br>" +
                                    "If a value < `0` is given, hopper minecarts will never have temporary immunity from the `interval` setting." +
                                    "<table>" +
                                    "<tr><td></td><td><b>Default</b></td><td></td><td></td></tr>" +
                                    "<tr><td><b>Recommended&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>" +
                                    "<tr><td><code>24.0</code><br></td><td><code>24.0</code></td><td>-</td><td>-</td></tr>" +
                                    "</table>" +
                                    "<table>" +
                                    "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                                    "<tr><td><i>Optimization</i></td><td><code>24.0</code></td></tr>" +
                                    "<tr><td><i>Vanilla behavior</i></td><td>- (for vanilla behavior, <code>interval</code> must be set to 1)</td></tr>" +
                                    "</table>"
                            },
                            "max-item-vertical-distance": {
                                default: "4.0",
                                desc:
                                    "Same as `max-item-horizontal-distance`, but this is the maximum distance vertically.<br>" +
                                    "(Unit: block)" +
                                    "<table>" +
                                    "<tr><td></td><td><b>Default</b></td><td></td><td></td></tr>" +
                                    "<tr><td><b>Recommended&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>" +
                                    "<tr><td><code>4.0</code><br></td><td><code>4.0</code></td><td>-</td><td>-</td></tr>" +
                                    "</table>" +
                                    "<table>" +
                                    "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                                    "<tr><td><i>Optimization</i></td><td><code>4.0</code></td></tr>" +
                                    "<tr><td><i>Vanilla behavior</i></td><td>- (for vanilla behavior, <code>interval</code> must be set to 1)</td></tr>" +
                                    "</table>"
                            },
                            "nearby-item-max-age": {
                                default: 1200,
                                desc:
                                    "Items with an age higher than this value will not cause nearby hopper minecarts to become immune from the `interval` setting.<br>" +
                                    "(Unit: tick)<br>" +
                                    "If a value &leq; `0` is given, it means no minimum age: in other words, all items can give nearby hopper minecarts temporary immunity from the `interval` setting." +
                                    "<table>" +
                                    "<tr><td></td><td><b>Default</b></td><td></td><td></td></tr>" +
                                    "<tr><td><b>Recommended&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>" +
                                    "<tr><td><code>1200</code></td><td><code>1200</code></td><td>-</td><td>-</td></tr>" +
                                    "</table>" +
                                    "<table>" +
                                    "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                                    "<tr><td><i>Optimization</i></td><td><code>600</code></td></tr>" +
                                    "<tr><td><i>Vanilla behavior</i></td><td>- (for vanilla behavior, <code>interval</code> must be set to 1)</td></tr>" +
                                    "</table>"
                            }
                        }
                    }
                }
            },
            "check-stuck-in-wall": {
                default: 10,
                desc:
                    "The interval at which to check whether an entity is stuck in a wall, to deal suffocation damage.<br>" +
                    "(Unit: tick)<br>" +
                    "<br>" +
                    "Since after dealing damage, there is an interval (this may change in the future, but approximately 1 second) at which entities cannot take repeated damage, delaying the suffocation check by less than 1 second is almost unnoticeable.<br>" +
                    "<br>" +
                    "For example:" +
                    "<ul>" +
                    "<li>If set to `10`, entities will check whether they are being suffocated every ½ second.</li>" +
                    "<li>If a value &leq; `0` is given, it will default to the same as Paper's behavior.</li>" +
                    "</ul>" +
                    "<table>" +
                    "<tr><td></td><td><b>Default</b></td><td></td><td></td></tr>" +
                    "<tr><td><b>Recommended&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>" +
                    "<tr><td><code>10</code></td><td><code>10</code></td><td><code>1</code></td><td><code>1</code></td></tr>" +
                    "</table>" +
                    "<table>" +
                    "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                    "<tr><td><i>Optimization</i></td><td><code>10</code></td></tr>" +
                    "<tr><td><i>Vanilla behavior</i></td><td><code>1</code></td></tr>" +
                    "</table>"
            },
            "villager-item-repickup": {
                default: 100,
                desc:
                    "The minimum delay for items dropped by villagers to be picked up by (other) entities.<br>" +
                    "(Unit: tick)" +
                    "<ul>" +
                    "<li>Prevents villagers picking up farmed items before hoppers do in certain farm designs; that would otherwise be broken by the `check-nearby-item.hopper` setting described below.</li>" +
                    "<li>Reduces lag from villagers continuously throwing many items at each other when their inventories are full.</li>" +
                    "</ul>" +
                    "For example:" +
                    "<ul>" +
                    "<li>If set to `100`, entities can pick up items dropped by villagers after 5 seconds.</li>" +
                    "<li>If a value < `0` is given, it will default to the same as vanilla's behavior, which is currently `10` ticks (½ second).</li>" +
                    "</ul>" +
                    "<table>" +
                    "<tr><td></td><td><b>Default</b></td><td></td><td></td></tr>" +
                    "<tr><td><b>Recommended&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>" +
                    "<tr><td><code>100</code></td><td><code>100</code></td><td><code>-1</code></td><td><code>-1</code></td></tr>" +
                    "</table>" +
                    "<table>" +
                    "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                    "<tr><td><i>Optimization</i></td><td><code>100</code></td></tr>" +
                    "<tr><td><i>Vanilla behavior</i></td><td><code>-1</code></td></tr>" +
                    "</table>"
            }
        },
        "save-fireworks": {
            default: true,
            desc:
                "Whether fireworks are saved when saving a chunk.<br>" +
                "Fireworks can bug out and not detonate, and it can very easily fill a chunk by using an automated dispenser.<br>" +
                "If set to `false`, chunk unloads will remove any fireworks, preventing this scenario." +
                "<table>" +
                "<tr><td></td><td><b>Default</b></td><td></td><td></td></tr>" +
                "<tr><td><b>Recommended&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>" +
                "<tr><td>-<br>(See <i>Optimization</i> below)</td><td><code>true</code></td><td><code>true</code></td><td><code>true</code></td></tr>" +
                "</table>" +
                "<table>" +
                "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                "<tr><td><i>Optimization</i></td><td><ul><li>Normally: - (doesn't matter much)<li>If you expect players to try to break your server: <code>false</code></li></ul></td></tr>" +
                "<tr><td><i>Vanilla behavior</i></td><td><code>true</code></td></tr>" +
                "</table>"
        },
        "use-optimized-sheep-offspring-color": {
            default: true,
            desc:
                "Whether to use a (much) faster way to choose a color when a new baby sheep is born.<br>" +
                "The color chosen is exactly the same as vanilla's behavior.<br>" +
                "<br>" +
                "However, in vanilla, it is possible to change the new color by changing the crafting recipe for combining dyes using a data pack.<br>" +
                "If set to `true`, any such crafting recipe changes will be ignored." +
                "<table>" +
                "<tr><td></td><td><b>Default</b></td><td></td><td></td></tr>" +
                "<tr><td><b>Recommended&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>" +
                "<tr><td><code>true</code></td><td><code>true</code></td><td><code>false</code></td><td><code>false</code></td></tr>" +
                "</table>" +
                "<table>" +
                "<tr><td><b>Values for goals</b></td><td></td></tr>" +
                "<tr><td><i>Optimization</i></td><td><code>true</code></td></tr>" +
                "<tr><td><i>Vanilla behavior</i></td><td><code>false</code></td></tr>" +
                "</table>"
        }
    }
};

export default config;
