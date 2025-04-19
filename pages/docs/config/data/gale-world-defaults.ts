export default {
    "gameplay-mechanisms": {
        "arrow-movement-resets-despawn-counter": {
            "enabled": {
                "default": false,
                "desc": "<p>Whether the <a href='https://minecraft.wiki/w/Mob_spawning#Despawning' target='_blank' rel='noopener noreferrer'>despawn counter</a> of arrows will restart when the arrow starts falling (e.g. when the block it is stuck in gets broken).</p><p><b>Comparison:</b></p><ul><li>Gale Recommended: -</li><li>Gale Default: <code>false</code></li><li>Paper Default: <code>true</code></li><li>Vanilla Default: <code>true</code></li></ul><p><b>Values for Goals:</b></p><ul><li>Optimization: <code>false</code></li><li>Vanilla behavior: <code>true</code></li></ul>"
            }
        },
        "entities-can-random-stroll-into-non-ticking-chunks": {
            "enabled": {
                "default": true,
                "desc": "<p>Whether entities that are wandering around randomly can also pathfind into non-ticking chunks.</p><p><b>Comparison:</b></p><ul><li>Gale Recommended: -</li><li>Gale Default: <code>true</code></li><li>Paper Default: <code>true</code></li><li>Vanilla Default: <code>true</code></li></ul><p><b>Values for Goals:</b></p><ul><li>Optimization: -</li><li>Vanilla behavior: <code>true</code></li></ul>"
            }
        },
        "entity-wake-up-duration-ratio-standard-deviation": {
            "value": {
                "default": 0.2,
                "desc": "<p>If this value is set to any value > <code>0</code>, waking up inactive entities happens spread over time, instead of many entities at once. This makes entities feel and behave more natural.</p><p>This setting is the <a href='https://en.wikipedia.org/wiki/Coefficient_of_variation' target='_blank' rel='noopener noreferrer'>coefficient of variation</a>, or <code>σ / μ</code> (the ratio of the standard deviation to the mean) of the inactivity duration.</p><p>In other words, this setting is the value <code>σ</code>, so that the regular inactivity duration will be multiplied by a factor <code>normal_distribution(μ = 1, σ)</code>.</p><p>If a value ≤ <code>0</code> is given, variable entity wake-up is disabled.</p><p><b>Comparison:</b></p><ul><li>Gale Recommended/Default: <code>0.2</code></li><li>Paper Default: <code>0.0</code></li><li>Vanilla: -</li></ul><p><b>Values for Goals:</b></p><ul><li>Optimization: -</li><li>Paper behavior: <code>0.0</code></li></ul>"
            }
        },
        "fixes": {
            "broadcast-crit-animations-as-the-entity-being-critted": {
                "enabled": {
                    "default": false,
                    "desc": "<p>Whether to broadcast crit animations as the entity being critted.</p><p>This does not affect where the crit animation is shown: it is always shown on the entity being critted. However, normally (if this setting is set to <code>false</code>), the crit animation is broadcast as the player doing the crit, meaning anyone who cannot see the player cannot see the crit.</p><p>If this setting is set to <code>true</code>, the crit animation is broadcast as the entity being hit, meaning anyone that can see the entity can see the crit.</p><p><b>Comparison:</b></p><ul><li>Gale Recommended: -</li><li>Gale Default: <code>false</code></li><li>Paper Default: <code>false</code></li><li>Vanilla Default: <code>false</code></li></ul><p><b>Values for Goals:</b></p><ul><li>Optimization: -</li><li>Vanilla behavior: <code>false</code></li></ul>"
                }
            },
            "keep-mooshroom-rotation-after-shearing": {
                "enabled": {
                    "default": true,
                    "desc": "<p>Whether to make mooshrooms keep their rotation after being sheared (fixes part of <a href='https://bugs.mojang.com/browse/MC-88967' target='_blank' rel='noopener noreferrer'>MC-88967</a>).</p><p><b>Comparison:</b></p><ul><li>Gale Recommended: -</li><li>Gale Default: <code>true</code></li><li>Paper Default: <code>false</code></li><li>Vanilla Default: <code>false</code></li></ul><p><b>Values for Goals:</b></p><ul><li>Optimization: -</li><li>Vanilla behavior: <code>false</code></li></ul>"
                }
            },
            "mc-110386": {
                "enabled": {
                    "default": true,
                    "desc": "<p>Whether to fix <a href='https://bugs.mojang.com/browse/MC-110386' target='_blank' rel='noopener noreferrer'>MC-110386</a>.</p><p><b>Comparison:</b></p><ul><li>Gale Recommended/Default: <code>true</code></li><li>Paper Default: <code>false</code></li><li>Vanilla Default: <code>false</code></li></ul>"
                }
            },
            "mc-121706": {
                "enabled": {
                    "default": false,
                    "desc": "<p>Whether to fix <a href='https://bugs.mojang.com/browse/MC-121706' target='_blank' rel='noopener noreferrer'>MC-121706</a>.</p><p><b>Comparison:</b></p><ul><li>Gale Recommended: <code>true</code></li><li>Gale Default: <code>false</code></li><li>Paper Default: <code>false</code></li><li>Vanilla Default: <code>false</code></li></ul>"
                }
            },
            "mc-238526": {
                "enabled": {
                    "default": false,
                    "desc": "<p>Whether to fix <a href='https://bugs.mojang.com/browse/MC-238526' target='_blank' rel='noopener noreferrer'>MC-238526</a>.</p><p><b>Comparison:</b></p><ul><li>Gale Recommended: -</li><li>Gale Default: <code>false</code></li><li>Paper Default: <code>false</code></li><li>Vanilla Default: <code>false</code></li></ul>"
                }
            },
            "mc-31819": {
                "enabled": {
                    "default": true,
                    "desc": "<p>Whether to fix <a href='https://bugs.mojang.com/browse/MC-31819' target='_blank' rel='noopener noreferrer'>MC-31819</a>.</p><p><b>Comparison:</b></p><ul><li>Gale Recommended/Default: <code>true</code></li><li>Paper Default: <code>false</code></li><li>Vanilla Default: <code>false</code></li></ul>"
                }
            }
        },
        "hide-flames-on-entities-with-fire-resistance": {
            "enabled": {
                "default": false,
                "desc": "<p>Whether to hide visual flames for entities that are on fire, but also have the Fire Resistance potion effect.</p><p><b>Comparison:</b></p><ul><li>Gale Recommended: -</li><li>Gale Default: <code>false</code></li><li>Paper Default: <code>false</code></li><li>Vanilla Default: <code>false</code></li></ul><p><b>Values for Goals:</b></p><ul><li>Optimization: -</li><li>Vanilla behavior: <code>false</code></li></ul>"
            }
        },
        "technical": {
            "load-portal-destination-chunk-before-entity-teleport": {
                "enabled": {
                    "default": false,
                    "desc": "<p>Whether to fully load chunks before teleporting an entity, when an entity enters a portal. This forces the entire server to wait for the chunk to be loaded.</p><p><b>Comparison:</b></p><ul><li>Gale Recommended/Default: <code>false</code></li><li>Paper Default: <code>false</code></li><li>Vanilla Default: <code>false</code></li></ul><p><b>Values for Goals:</b></p><ul><li>Optimization: <code>false</code></li><li>Vanilla behavior: <code>false</code></li></ul>"
                }
            }
        },
        "try-respawn-ender-dragon-after-end-crystal-place": {
            "enabled": {
                "default": true,
                "desc": "<p>Whether able to attempt to respawn the ender dragon after an end crystal has been placed in one of the right positions on the fountain.</p><p><b>Comparison:</b></p><ul><li>Gale Recommended: -</li><li>Gale Default: <code>true</code></li><li>Paper Default: <code>true</code></li><li>Vanilla Default: <code>true</code></li></ul><p><b>Values for Goals:</b></p><ul><li>Optimization: -</li><li>Vanilla behavior: <code>true</code></li></ul>"
            }
        }
    },
    "performance": {
        "load-chunks": {
            "to-activate-climbing-entities": {
                "enabled": {
                    "default": false,
                    "desc": "<p>Whether to load chunks to activate climbing entities.</p><p>In Paper, entities, like zombies, that are \"climbing\" (e.g. going down a ladder) get priority to be activated. To check whether an entity is climbing, the block it is in must be checked. This can lead to the entire server having to wait for a chunk to load when an entity moves just over the edge.</p><p>If this value is set to <code>false</code>, this is prevented: the server will not check the \"climbing\" priority for entities that are in unloaded chunks. This prevents unnecessary server hangs.</p><p><b>Comparison:</b></p><ul><li>Gale Recommended/Default: <code>false</code></li><li>Paper Default: <code>true</code></li><li>Vanilla: -</li></ul><p><b>Values for Goals:</b></p><ul><li>Optimization: <code>false</code></li><li>Paper behavior: <code>true</code></li></ul>"
                }
            },
            "to-spawn-phantoms": {
                "enabled": {
                    "default": false,
                    "desc": "<p>Whether to load chunks to spawn phantoms. If this value is set to <code>false</code>, when the server attempts to spawn a phantom in an unloaded chunk, nothing happens.</p><p><b>Comparison:</b></p><ul><li>Gale Recommended/Default: <code>false</code></li><li>Paper Default: <code>true</code></li><li>Vanilla Default: <code>true</code></li></ul><p><b>Values for Goals:</b></p><ul><li>Optimization: <code>false</code></li><li>Vanilla behavior: <code>true</code></li></ul>"
                }
            }
        },
        "max-projectile-chunk-loads": {
            "per-projectile": {
                "max": {
                    "value": {
                        "default": 10,
                        "desc": "<p>The maximum number of chunks that can be synchronously loaded by a projectile throughout its lifetime. If a value < <code>0</code> is given, this setting is disabled: i.e. the number of chunks loaded by a projectile will be unlimited.</p><p><b>Comparison:</b></p><ul><li>Gale Recommended/Default: <code>10</code></li><li>Paper Default: <code>-1</code></li><li>Vanilla Default: <code>-1</code></li></ul><p><b>Values for Goals:</b></p><ul><li>Optimization: <code>10</code></li><li>Vanilla behavior: <code>-1</code></li></ul>"
                    }
                },
                "remove-from-world-after-reach-limit": {
                    "enabled": {
                        "default": false,
                        "desc": "<p>Whether to remove projectiles that cross the <code>max</code> threshold (described above) from the world entirely.</p><p>Removing projectiles from the world is risky, because this will also affect projectiles such as tridents that are valuable to players, so it is not recommended to set this value to <code>true</code> unless you accept that risk.</p><p><b>Comparison:</b></p><ul><li>Gale Recommended/Default: <code>false</code></li><li>Paper Default: <code>false</code></li><li>Vanilla Default: <code>false</code></li></ul><p><b>Values for Goals:</b></p><ul><li>Optimization: <code>true</code> in extreme circumstances, but this is risky</li><li>Vanilla behavior: <code>false</code></li></ul>"
                    }
                },
                "reset-movement-after-reach-limit": {
                    "enabled": {
                        "default": false,
                        "desc": "<p>Whether to set the planar velocity of projectiles that cross the <code>max</code> threshold (described above) to <code>0</code>, so that they stop attempting to cross chunk boundaries.</p><p>This has no effect if <code>remove-from-world-after-reach-limit</code> (described above) is <code>true</code>.</p><p><b>Comparison:</b></p><ul><li>Gale Recommended: -</li><li>Gale Default: <code>false</code></li><li>Paper Default: <code>false</code></li><li>Vanilla Default: <code>false</code></li></ul><p><b>Values for Goals:</b></p><ul><li>Optimization: <code>true</code></li><li>Vanilla behavior: <code>false</code></li></ul>"
                    }
                }
            },
            "per-tick": {
                "value": {
                    "default": 10,
                    "desc": "<p>The maximum number of chunks that can be synchronously loaded by all projectiles in one world in a tick. If a value < <code>0</code> is given, this setting is disabled: i.e. the number of chunks loaded by projectiles per tick will be unlimited.</p><p><b>Comparison:</b></p><ul><li>Gale Recommended/Default: <code>10</code></li><li>Paper Default: <code>-1</code></li><li>Vanilla Default: <code>-1</code></li></ul><p><b>Values for Goals:</b></p><ul><li>Optimization: <code>2</code></li><li>Vanilla behavior: <code>-1</code></li></ul>"
                }
            }
        },
        "reduced-intervals": {
            "acquire-poi-for-stuck-entity": {
                "interval": {
                    "default": 60,
                    "desc": "<p>The extra interval (on top of the regular interval), given in ticks, for entities that are stuck (e.g. in a vehicle) to attempt to acquire a POI (such as a villager job block). If they become unstuck during this time, they will immediately be free to acquire a POI again. For example, if this value is set to <code>100</code>, stuck entities will try to find a POI every 5 seconds.</p><p>If a value < <code>0</code> is given, it will default to the same as Paper.</p><p>📏 <b>Unit:</b> ticks.</p><p><b>Comparison:</b></p><ul><li>Gale Recommended/Default: <code>60</code></li><li>Paper Default: <code>200</code></li><li>Vanilla Default: <code>0</code></li></ul><p><b>Values for Goals:</b></p><ul><li>Optimization: <code>200</code></li><li>Vanilla behavior: <code>0</code></li></ul>"
                }
            },
            "check-nearby-item": {
                "hopper": {
                    "interval": {
                        "value": {
                            "default": 1,
                            "desc": "<p>Frequency, given in ticks, with which hopper blocks check for items to pick up. For example, if this value is set to <code>20</code>, hoppers will check for items above them every second.</p><p>If a value ≤ <code>0</code> is given, it will default to the same as Paper.</p><p>📏 <b>Unit:</b> ticks.</p><p><b>Comparison:</b></p><ul><li>Gale Recommended: <code>20</code></li><li>Gale Default: <code>1</code></li><li>Paper Default: <code>1</code></li><li>Vanilla Default: <code>1</code></li></ul><p><b>Values for Goals:</b></p><ul><li>Optimization: <code>50</code></li><li>Vanilla behavior: <code>1</code></li></ul>"
                        }
                    },
                    "minecart": {
                        "interval": {
                             "value": {
                                "default": 1,
                                "desc": "<p>The same as the <code>hopper.interval.value</code> setting above, but for hopper minecarts.</p><p>📏 <b>Unit:</b> ticks.</p><p><b>Comparison:</b></p><ul><li>Gale Recommended: <code>20</code></li><li>Gale Default: <code>1</code></li><li>Paper Default: <code>1</code></li><li>Vanilla Default: <code>1</code></li></ul><p><b>Values for Goals:</b></p><ul><li>Optimization: <code>20</code></li><li>Vanilla behavior: <code>1</code></li></ul>"
                             }
                        },
                        "temporary-immunity": {
                            "check-for-minecart-near-item-interval": {
                                "value": {
                                    "default": 20,
                                    "desc": "<p>How often, given in ticks, to check for hopper minecarts near items, to give the minecarts temporary immunity from the <code>interval</code> setting. If a value ≤ <code>0</code> is given, it behaves like <code>1</code>.</p><p>📏 <b>Unit:</b> ticks.</p><p><b>Comparison:</b></p><ul><li>Gale Recommended/Default: <code>20</code></li><li>Paper: -</li><li>Vanilla: -</li></ul><p><b>Values for Goals:</b></p><ul><li>Optimization: <code>20</code></li><li>Vanilla behavior: - (for vanilla behavior, <code>interval</code> must be set to 1)</li></ul>"
                                }
                            },
                            "check-for-minecart-near-item-while-active": {
                                "enabled": {
                                    "default": false,
                                    "desc": "<p>Whether to check for hopper minecarts near items that are __active__, to give the minecarts temporary immunity from the <code>interval</code> setting.</p><p><b>Comparison:</b></p><ul><li>Gale Recommended: <code>true</code> (setting this value to <code>false</code> is strongly not recommended)</li><li>Gale Default: <code>false</code></li><li>Paper: -</li><li>Vanilla: -</li></ul><p><b>Values for Goals:</b></p><ul><li>Optimization: <code>false</code></li><li>Vanilla behavior: - (for vanilla behavior, <code>interval</code> must be set to 1)</li></ul>"
                                }
                            },
                            "check-for-minecart-near-item-while-inactive": {
                                "enabled": {
                                    "default": true,
                                    "desc": "<p>Whether to check for hopper minecarts near items that are __inactive__, to give the minecarts temporary immunity from the <code>interval</code> setting.</p><p><b>Comparison:</b></p><ul><li>Gale Recommended: <code>true</code> (setting this value to <code>false</code> is strongly not recommended)</li><li>Gale Default: <code>true</code></li><li>Paper: -</li><li>Vanilla: -</li></ul><p><b>Values for Goals:</b></p><ul><li>Optimization: <code>true</code></li><li>Vanilla behavior: - (for vanilla behavior, <code>interval</code> must be set to 1)</li></ul>"
                                }
                            },
                            "duration": {
                                "value": {
                                    "default": 100,
                                    "desc": "<p>The duration, given in ticks, of temporary immunity from the <code>interval</code> setting for hopper minecarts. If a value ≤ <code>0</code> is given, hopper minecarts will never have temporary immunity from the <code>interval</code> setting.</p><p>📏 <b>Unit:</b> ticks.</p><p><b>Comparison:</b></p><ul><li>Gale Recommended/Default: <code>100</code></li><li>Paper: -</li><li>Vanilla: -</li></ul><p><b>Values for Goals:</b></p><ul><li>Optimization: <code>75</code></li><li>Vanilla behavior: - (for vanilla behavior, <code>interval</code> must be set to 1)</li></ul>"
                                }
                            },
                            "max-item-horizontal-distance": {
                                "value": {
                                    "default": 24.0,
                                    "desc": "<p>The maximum horizontal distance a dropped item can be away from a hopper minecart be to give it temporary immunity from the <code>interval</code> setting. If a value < <code>0</code> is given, hopper minecarts will never have temporary immunity from the <code>interval</code> setting.</p><p>📏 <b>Unit:</b> blocks.</p><p><b>Comparison:</b></p><ul><li>Gale Recommended/Default: <code>24.0</code></li><li>Paper: -</li><li>Vanilla: -</li></ul><p><b>Values for Goals:</b></p><ul><li>Optimization: <code>24.0</code></li><li>Vanilla behavior: - (for vanilla behavior, <code>interval</code> must be set to 1)</li></ul>"
                                }
                            },
                            "max-item-vertical-distance": {
                                "value": {
                                    "default": 4.0,
                                    "desc": "<p>Same as <code>max-item-horizontal-distance</code>, but this is the maximum distance vertically.</p><p>📏 <b>Unit:</b> blocks.</p><p><b>Comparison:</b></p><ul><li>Gale Recommended/Default: <code>4.0</code></li><li>Paper: -</li><li>Vanilla: -</li></ul><p><b>Values for Goals:</b></p><ul><li>Optimization: <code>4.0</code></li><li>Vanilla behavior: - (for vanilla behavior, <code>interval</code> must be set to 1)</li></ul>"
                                }
                            },
                            "nearby-item-max-age": {
                                "value": {
                                    "default": 1200,
                                    "desc": "<p>Items with an age (given in ticks) higher than this value will not cause nearby hopper minecarts to become immune from the <code>interval</code> setting. If a value ≤ <code>0</code> is given, it means no minimum age: in other words, all items can give nearby hopper minecarts temporary immunity from the <code>interval</code> setting.</p><p>📏 <b>Unit:</b> ticks.</p><p><b>Comparison:</b></p><ul><li>Gale Recommended/Default: <code>1200</code></li><li>Paper: -</li><li>Vanilla: -</li></ul><p><b>Values for Goals:</b></p><ul><li>Optimization: <code>600</code></li><li>Vanilla behavior: - (for vanilla behavior, <code>interval</code> must be set to 1)</li></ul>"
                                }
                            }
                        }
                    }
                }
            },
            "check-stuck-in-wall": {
                "interval": {
                    "default": 10,
                    "desc": "<p>The interval, given in ticks, at which to check whether an entity is stuck in a wall, to deal suffocation damage.</p><p>Since after dealing damage, there is an interval (this may change in the future, but approximately 1 second) at which entities cannot take repeated damage, delaying the suffocation check by less than 1 second is almost unnoticeable.</p><p>For example:</p><ul><li>If this value is set to <code>10</code>, entities will check whether they are being suffocated every ½ second.</li><li>If a value ≤ <code>0</code> is given, it will default to the same as Paper.</li></ul><p>📏 <b>Unit:</b> ticks.</p><p><b>Comparison:</b></p><ul><li>Gale Recommended/Default: <code>10</code></li><li>Paper Default: <code>1</code></li><li>Vanilla Default: <code>1</code></li></ul><p><b>Values for Goals:</b></p><ul><li>Optimization: <code>10</code></li><li>Vanilla behavior: <code>1</code></li></ul>"
                }
            },
            "villager-item-repickup": {
                "interval": {
                    "default": 100,
                    "desc": "<p>The minimum delay, given in ticks, for items dropped by villagers to be picked up by (other) entities.</p><ul><li>Prevents villagers picking up farmed items before hoppers do in certain farm designs; that would otherwise be broken by the <code>check-nearby-item.hopper</code> setting described below.</li><li>Reduces lag from villagers continuously throwing many items at each other when their inventories are full.</li></ul><p>For example:</p><ul><li>if this value is set to <code>100</code>, entities can pick up items dropped by villagers after 5 seconds.</li><li>If a value < <code>0</code> is given, it will default to the same as vanilla, which is currently <code>10</code> ticks (½ second).</li></ul><p>📏 <b>Unit:</b> ticks.</p><table><tr><td></td><td><b>Default</b></td><td></td><td></td></tr><tr><td><b>Recommended        </b></td><td><i>Gale</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr><tr><td><code>100</code></td><td><code>100</code></td><td><code>-1</code></td><td><code>-1</code></td></tr></table><table><tr><td><b>Values for goals</b></td><td></td></tr><tr><td><i>Optimization</i></td><td><code>100</code></td></tr><tr><td><i>Vanilla behavior</i></td><td><code>-1</code></td></tr></table>"
                }
            }
        },
        "save-fireworks": {
            "enabled": {
                "default": true,
                "desc": "<p>Whether fireworks are saved when saving a chunk. Fireworks can bug out and not detonate, and an automated launcher can very easily fill a chunk. If this value is set to <code>true</code>, chunk unloads will remove any fireworks, preventing this scenario.</p><p><b>Comparison:</b></p><ul><li>Gale Recommended: - (See Optimization below)</li><li>Gale Default: <code>true</code></li><li>Paper Default: <code>true</code></li><li>Vanilla Default: <code>true</code></li></ul><p><b>Values for Goals:</b></p><ul><li>Optimization:<ul><li>Normally: - (doesn't matter much)<li>If you expect players to try to break your server: <code>false</code></li></ul></li><li>Vanilla behavior: <code>true</code></li></ul>"
            }
        },
        "use-optimized-sheep-offspring-color": {
            "enabled": {
                "default": true,
                "desc": "<p>Whether to use a (much) faster way to choose a color when a new baby sheep is born. The color chosen is exactly the same as vanilla.</p><p>However, in vanilla, it is possible to change the new color by changing the crafting recipe for combining dyes using a data pack. If this value is set to <code>true</code>, any such crafting recipe changes will be ignored.</p><p><b>Comparison:</b></p><ul><li>Gale Recommended/Default: <code>true</code></li><li>Paper Default: <code>false</code></li><li>Vanilla Default: <code>false</code></li></ul><p><b>Values for Goals:</b></p><ul><li>Optimization: <code>true</code></li><li>Vanilla behavior: <code>false</code></li></ul>"
            }
        }
    }
}