import type { ConfigRoot } from "@/.vitepress/theme/components/config/types";

const config: ConfigRoot = {
    "config-version": {
        default: "3.0"
    },

    async: {
        __desc__: "本节包含异步相关的功能，旨在通过将部分任务异步处理，来降低主线程（Server Thread）的负载。",
        "async-chunk-send": {
            enabled: {
                default: false,
                desc: `是否使用异步区块数据打包与发送。<br>
                    在大量玩家同时加载区块时，此功能可以显著降低主线程负载，例如：进入服务器、传送、快速飞行。<br>
                    <br>
                    __⚡推荐值：\`true\`__`
            }
        },
        "async-mob-spawning": {
            enabled: {
                default: true,
                desc: `是否使用异步生物生成。<br>
                    <br>
                    在生物生成量较多的服务器上，开启此功能可以带来近 15% 的性能。要使其生效，必须将 Paper 的 \`per-player-mob-spawns\` 配置项设为 \`true\`。<br>
                    需要注意的是：此功能并不会将生物生成的所有逻辑完全异步（那样做非常不安全）。它只是将生物生成的一些开销较大的计算分担到另一个线程。<br>
                    <br>
                    __⚡推荐值：\`true\`__`
            }
        },
        "async-pathfinding": {
            enabled: {
                default: false,
                desc: `是否使用异步生物寻路。<br>
                    <br>
                    __⚡推荐值：\`true\`__`
            },
            "max-threads": {
                default: 0,
                desc: `异步生物寻路可使用的最大线程数。<br>
                    如果设为 &leq; \`0\`，将自动使用 CPU 核心数的 1/4，且最小为 1。<br>
                    <br>
                    __⚡推荐值：CPU 核心数的 1/3__`
            },
            keepalive: {
                default: 60,
                desc: `空闲线程的存活时间。<br>
                    当线程超过此事件并且没有任务时，将会被销毁。<br>
                    （单位：秒）`
            },
            "queue-size": {
                default: 0,
                desc: `异步生物寻路任务队列的最大容量。<br>
                    如果设为 &leq; \`0\`，队列大小将会动态计算为 \`max-threads * 256\`。`
            },
            "reject-policy": {
                default: "CALLER_RUNS",
                desc: `当寻路任务队列已满时，接收到新任务时所采用的策略。<br>
                    <ul>
                    <li>\`FLUSH_ALL\`：立即在主线程上执行队列里所有等待中的任务。</li>
                    <li>\`CALLER_RUNS\`：仅新提交的任务会直接在主线程上同步执行。</li>
                    </ul>
                    <br>
                    __⚡推荐值：\`CALLER_RUNS\`__`
            }
        },
        "async-playerdata-save": {
            enabled: {
                default: false,
                desc: "是否使用异步玩家数据保存（I/O 操作都很耗时）。"
                // TODO
                // <div class="warning custom-block">
                // <p class="custom-block-title custom-block-title-default">实验性功能</p>
                // 实验性功能，在某些情况下可能导致数据丢失或数据不一致！
                // </div>`
            }
        },
        "async-entity-tracker": {
            enabled: {
                default: false,
                desc: `是否使用异步实体追踪。<br>
                    这可以显著提升性能，尤其是在大量密集实体集中于小范围区域的场景中。<br>
                    <br>
                    __⚡推荐值：\`true\`__<br>
                    <br>
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">实验性功能</p>
                    实验性功能，正在积极测试中，如遇到问题请反馈。
                    </div>`
            },
            threads: {
                default: 0,
                desc: `异步实体追踪可使用的最大线程数。<br>
                    如果设为 &leq; \`0\`，将自动使用 CPU 核心数的 1/4，且最小为 1。<br>
                    <br>
                    __⚡推荐值：CPU 核心数的 1/2__`
            }
        },
        "parallel-world-ticking": {
            enabled: {
                default: false,
                desc: `是否将不同世界的 tick 过程并行地分配到独立线程中执行，从而在多核系统上提升性能。<br>
                    <br>
                    Parallel World Ticking（又称“PWT”，或“平行世界”）是由 [SparklyPaper](https://github.com/SparklyPower/SparklyPaper) 提出的一个概念，其核心设计是让每个世界在独立的线程中进行 tick，以将原本集中在单一线程中的世界计算负载拆分开来。<br>
                    在当前的 PWT 实现中，每个世界在开始下一次 tick 前，都会等待其他世界完成当前的 tick。更多细节可参考 SparklyPaper 的概念解释：[PARALLEL_WORLD_TICKING.md](https://github.com/SparklyPower/SparklyPaper/blob/13aff425238ea322658de0d9f4f7bd906bd9f431/docs/PARALLEL_WORLD_TICKING.md)。<br>
                    <br>
                    什么时候才推荐使用 PWT？
                    <ol>
                    <li>我实在无法迁移到 [Folia](https://papermc.io/software/folia) 核心或者 Folia fork。</li>
                    <li>我使用的是多核服务器。</li>
                    <li>玩家在各个世界中的分布较为均匀。</li>
                    <li>（或者服务器有很多世界，例如 RPG 服务器）</li>
                    </ol>
                    <br>
                    __⚡推荐值：\`false\`（仅在遇到特定性能瓶颈，且充分理解其风险的情况下才考虑是否启用）__<br>
                    <br>
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">实验性功能</p>
                    实验性功能，可能不稳定，并且可能与部分插件存在兼容性问题。
                    </div>`
            },
            threads: {
                default: 8,
                desc: `用于 PWT 的线程数。<br>
                    <br>
                    __⚡推荐值：与世界数量相同__`
            },
            "log-container-creation-stacktraces": {
                default: false,
                desc: `是否在创建容器时（如方块实体或者实体的物品栏实例）记录相关堆栈信息。<br>
                    这对于调试潜在的并发问题非常有帮助。`
            },
            "disable-hard-throw": {
                default: false,
                desc: `是否禁用与 PWT 相关的异常抛出（通常会直接导致崩服）。<br>
                    <br>
                    <div class="tip custom-block">
                    <p class="custom-block-title custom-block-title-default">注意</p>
                    这可以在服务器开发与测试阶段避免频繁崩溃，但可能会掩盖潜在的问题。请谨慎使用。
                    </div>`
            },
            "async-unsafe-read-handling": {
                default: "DISABLED",
                desc: `是否在 PWT 中以同步方式执行部分异步任务。<br>
                    这在解决插件兼容性问题上很有帮助，但会在很大程度上抵消 PWT 带来的性能收益。<br>
                    <br>
                    __⚡推荐值：\`BUFFERED\`__`
            }
        }
    },

    performance: {
        __desc__: "本节包含性能调优相关的优化，旨在减少不必要的计算或使用更高效的方法优化服务器。",
        "check-survival-before-growth": {
            "cactus-check-survival": {
                default: false,
                desc: `是否在仙人掌尝试生长之前检查其是否能够生长。<br>
                    如果服务器中存在大型仙人掌农场，此配置项可以提升性能。<br>
                    <br>
                    __⚡推荐值：\`true\`__`
            }
        },
        "dont-save-entity": {
            "dont-save-primed-tnt": {
                default: false,
                desc: `是否在区块卸载时不保存已点燃的 TNT 实体。<br>
                    当玩家意外掉线或者玩家远离导致区块被卸载时，此功能可防止机器被 TNT 炸毁。适用于拥有较多 TNT 相关机器的生存服。<br>
                    <br>
                    __⚡推荐值：\`true\`__`
            },
            "dont-save-falling-block": {
                default: false,
                desc: `是否在区块卸载时不保存下落的方块（如沙子、沙砾）。<br>
                    这可以避免在服务器重启或区块重新加载后，受卡顿影响导致下落的方块出现潜在的问题。<br>
                    <br>
                    __⚡推荐值：\`true\`__`
            }
        },
        dab: {
            __desc__:
                "Dynamic Activation of Brain（简称 DAB）会在实体远离玩家时，降低其大脑 tick 计算的频率，以此优化实体 AI。若服务器中存在大量实体，这是一个值得采用的权衡优化和原版行为的优化方案。",
            enabled: {
                default: false,
                desc: `是否启用 DAB。<br>
                    <br>
                    __⚡推荐值：\`true\`__
                    <table>
                    <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                    <tr><td><i>优化</i></td><td><code>true</code></td></tr>
                    <tr><td><i>原版行为</i></td><td><code>false</code>（或参阅下方的 <code>dab.blacklisted-entities</code>）</td></tr>
                    </table>`
            },
            "dont-enable-if-in-water": {
                default: false,
                desc: `非水生生物在水中时，是否不受 DAB 的影响。此配置项修复了 [Pufferfish#58](https://github.com/pufferfish-gg/Pufferfish/issues/58)。<br>
                    如果设为 \`true\`，可以避免远离玩家的实体在水中溺死的问题。<br>
                    <br>
                    __⚡推荐值：\`true\`__`
            },
            "start-distance": {
                default: 12,
                desc: `实体距离玩家多远时，才会开始受到 DAB 的影响。<br>
                    （单位：方块）<br>
                    <br>
                    __⚡推荐值：\`8\`__`
            },
            "max-tick-freq": {
                default: 20,
                desc: `最远处的实体每隔多长时间进行一次寻路和 AI 相关行为的 tick 计算。<br>
                    （单位：tick，默认值 20 tick = 1 秒）`
            },
            "activation-dist-mod": {
                default: 8,
                desc: `用于定义距离对实体 tick 计算频率的影响程度。公式：\`tick 频率 = (生物到玩家距离 ^2) / (2^ 此 activation-dist-mod 值)\`。
                    <ul>
                    <li>如果你希望距离越远的实体 __少__ tick 计算 一些，设为 \`7\`。</li>
                    <li>如果你希望距离越远的实体 __多__ tick 计算 一些，设为 \`9\`。</li>
                    </ul>
                    <br>
                    __⚡推荐值：\`7\`__`
            },
            "blacklisted-entities": {
                default: `
                - villager
                - axolotl
                - hoglin
                - zombified_piglin
                - goat`,
                desc: `DAB 黑名单，名单内的生物将不受 DAB 的影响。<br>
                    <br>
                    例如，一些生存服拥有很多基于实体寻路的生物农场或者刷怪塔。这些寻路式刷怪塔需要怪物拥有目标来吸引仇恨，这类刷怪塔可能会受 DAB 影响而无法正常工作。可以通过将对应生物类型添加到此黑名单，来解决刷怪塔无法工作的问题。<br>
                    如果你的服务器中某些刷怪塔出现实体冻结、不移动的情况，而你不确定是否由 DAB 导致，可以尝试将对应生物添加到此黑名单，然后重启服务器并检查此问题是否修复。<br>
                    <br>
                    黑名单格式：\`[villager]\` 或 \`[villager, zombified_piglin]\`（可参见 [Paper 的 Javadoc](https://jd.papermc.io/paper/1.21.11/org/bukkit/entity/EntityType.html) 查看所有实体类型）。<br>
                    <br>
                    [💡 再深入一些？](guides/dab-blacklist-format)`
            }
        },
        "enable-cached-minecraft-to-bukkit-entitytype-convert": {
            default: true,
            desc: `是否缓存 *Minecraft EntityType* 到 *Bukkit EntityType* 的类型转换结果。<br>
                该转换在生物生成逻辑中可能有一定性能开销，进行缓存可以略微提升性能。<br>
                <br>
                __⚡推荐值：\`true\`__`
        },
        "fast-biome-manager-seed-obfuscation": {
            enabled: {
                default: false,
                desc: `是否使用 XXHash 替换 \`BiomeManager\` 中原版的 SHA-256 种子混淆实现。<br>
                    <br>
                    __⚡推荐值：\`true\`__`
            },
            "seed-obfuscation-key": {
                default: 513317,
                desc: `用于 XXHash 种子混淆的密钥。<br>
                    该值将在首次启动服务器时随机生成。`
            }
        },
        "faster-random-generator": {
            enabled: {
                default: false,
                desc: `是否使用 Java 17 中引入的更快的随机数生成器（\`Xoroshiro128PlusPlus\`）。<br>
                    随机数生成在 Minecraft 中几乎无处不在，此功能可以显著提升性能。<br>
                    <br>
                    __⚡推荐值：\`true\`__<br>
                    <br>
                    <div class="tip custom-block">
                    <p class="custom-block-title custom-block-title-default">注意</p>
                    该功能需要使用 支持 \`Xoroshiro128PlusPlus\` 的 JVM，部分 JRE 可能不支持。
                    </div>`
            },
            "enable-for-worldgen": {
                default: false,
                desc: `是否为世界生成使用更快的随机数生成器。<br>
                    <ul>
                    <li>如果设为 \`true\`，与世界生成相关的 \`Random\` 调用将使用上方的 \`random-generator\` 指定的随机数生成器，世界生成将会与原版略有不同。</li>
                    <li>如果设为 \`false\`，与世界生成相关的 \`Random\` 调用将使用原版随机数生成器。</li>
                    </ul>
                    <br>
                    __⚡推荐值：\`true\`__
                    <table>
                    <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                    <tr><td><i>优化</i></td><td><code>true</code></td></tr>
                    <tr><td><i>原版行为</i></td><td><code>false</code></td></tr>
                    </table>
                    <br>
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">警告</p>
                    此配置项将影响世界生成，地形等将会与原版略有不同。
                    </div>`
            },
            "warn-for-slime-chunk": {
                default: true,
                desc: "在使用快速随机数生成器生成史莱姆区块时，是否在服务器启动时输出警告消息到控制台。"
            },
            "use-legacy-random-for-slime-chunk": {
                default: false,
                desc: `是否使用原版随机数生成器（\`java.util.Random\`）来生成史莱姆区块，以保持原版行为。<br>
                    如果服务器中已存在史莱姆农场或依赖史莱姆区块的红石机器，请开启此配置项; 否则，史莱姆区块的坐标将会偏移。<br>
                    <br>
                    __⚡推荐值：（取决于你服务器的类型，详见下方的“基于目标的推荐值”）__
                    <table>
                    <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                    <tr><td><i>优化</i></td><td><code>false</code></td></tr>
                    <tr><td><i>原版行为</i></td><td><code>true</code></td></tr>
                    </table>`
            }
        },
        "faster-structure-gen-future-sequencing": {
            default: true,
            desc: `是否在世界结构生成中使用更快的任务排序。<br>
                <br>
                __⚡推荐值：\`true\`__<br>
                <br>
                <div class="tip custom-block">
                <p class="custom-block-title custom-block-title-default">注意</p>
                在可能存在的边缘情况下，这可能会导致结构生成任务的合并顺序不一致，从而引起结构生成结果和原版有差异。
                </div>`
        },
        "cache-biome": {
            enabled: {
                default: false,
                desc: `是否缓存方块位置的生物群系数据，而不是在每次查询时重新计算。<br>
                    <br>
                    __⚡推荐值：\`true\`（同时需要启用下方选项）__`
            },
            "mob-spawning": {
                default: false,
                desc: `是否在生物生成逻辑中使用生物群系缓存。<br>
                    <br>
                    __⚡推荐值：\`true\`__`
            },
            advancements: {
                default: false,
                desc: `是否在玩家进度判定逻辑中使用生物群系缓存。<br>
                    <br>
                    __⚡推荐值：\`true\`__`
            }
        },
        "optimize-block-entities": {
            default: true,
            desc: `是否为方块实体的 ticker 存储使用更高效的 map 数据结构。<br>
                <br>
                __⚡推荐值：\`true\`__`
        },
        "optimize-mob-despawn": {
            default: false,
            desc: `是否为生物自然消失使用更高效的逻辑。<br>
                这避免了在原版中生物自然消失中，遍历所有玩家并逐一计算生物与玩家距离所带来的高昂开销。<br>
                <br>
                建议同时添加 JVM 启动参数 [\`-DLeaf.enableFMA=true\`](system-properties#dleaf-enablefma) 以获得更好的性能。<br>
                <br>
                __⚡推荐值：\`true\`__<br>
                <br>
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">实验性功能</p>
                实验性功能，正在积极测试中，如遇到问题请反馈。
                </div>`
        },
        "only-tick-items-in-hand": {
            default: false,
            desc: `是否仅在玩家主手或副手持有物品时才对手上物品进行 tick 计算和更新，而不是像在原版一样对整个物品栏进行多余的更新。<br>
                此配置项目前仅影响指南针和地图物品的更新。<br>
                <br>
                __⚡推荐值：\`true\`__`
        },
        "optimize-no-action-time": {
            "disable-light-check": {
                default: false,
                desc: `是否在怪物的 \`noActionTime\` 更新过程中跳过光照检测。<br>
                    在不对每个实体的 tick 进行光照等级判断的情况下，直接将 \`noActionTime\` 计数器加 1。<br>
                    在原版中，如果怪物处于光照等级高于特定阈值的位置，该计数器会增加 2。<br>
                    <br>
                    __⚡推荐值：\`true\`__
                    <table>
                    <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                    <tr><td><i>优化</i></td><td><code>true</code></td></tr>
                    <tr><td><i>原版行为</i></td><td><code>false</code></td></tr>
                    </table>
                    <br>
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">实验性功能</p>
                    实验性功能，正在积极测试中，如遇到问题请反馈。
                    </div>`
            }
        },
        "optimize-player-movement": {
            default: true,
            desc: `是否优化玩家移动处理，跳过不必要的方块边缘检查，并避免冗余的视距更新。<br>
                <br>
                __⚡推荐值：\`true\`__`
        },
        "optimize-random-tick": {
            default: false,
            desc: `是否使用重写的随机刻系统。<br>
                <br>
                重写的随机刻系统使用加权统计与采样的方式，在活跃区块中选择可 tick 计算的方块，从而减少原版随机刻逻辑中频繁选中不可 tick 位置所带来的不必要开销。<br>
                <br>
                __⚡推荐值：\`true\`__<br>
                <br>
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">实验性功能</p>
                实验性功能，正在积极测试中，如遇到问题请反馈。
                </div>`
        },
        "optimize-waypoint": {
            default: false,
            desc: `是否仅在玩家所在的方块坐标发生变化时，才更新其定位栏的路径点追踪数据。<br>
                <br>
                __⚡推荐值：\`true\`__<br>
                <br>
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">实验性功能</p>
                实验性功能，正在积极测试中，如遇到问题请反馈。
                </div>`
        },
        "optimized-powered-rails": {
            default: false,
            desc: `是否优化动力铁轨的逻辑。<br>
                将使用完全重写的动力铁轨迭代逻辑，在保持原版行为一致的前提下，性能可提升约 4 倍。<br>
                该实现最初基于 Fabric 模组 [FX's Rail Optimization](https://modrinth.com/mod/rail-optimization)，作者为 [Fx Morin](https://github.com/FxMorin)。<br>
                <br>
                __⚡推荐值：\`true\`__`
        },
        "reduce-packets": {
            __desc__: "本节包含减少无用数据包发送的相关功能。",
            "reduce-entity-move-packets": {
                default: false,
                desc: `是否减少发送给玩家的无用实体移动数据包（例如极小幅度的移动）。<br>
                    这可以略微节省带宽并减少客户端的处理负担。在实体数量较多或出现轻微卡顿时，有希望使移动看起来更流畅。<br>
                    <br>
                    __⚡推荐值：\`true\`__`
            }
        },
        "skip-ai-for-non-aware-mob": {
            default: true,
            desc: `是否跳过同时处于 _不活跃_ 且 _无感知_ 状态的生物的 AI tick 计算。<br>
                被设为无感知的生物在重新变为活跃之前将不会自主活动，也不会在与其交互时作出反应。更多信息请参阅 [Mob.html#setAware(boolean)](https://jd.papermc.io/paper/1.21.11/org/bukkit/entity/Mob.html#setAware(boolean))。<br>
                <br>
                __⚡推荐值：\`true\`__
                <table>
                <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                <tr><td><i>优化</i></td><td><code>true</code></td></tr>
                <tr><td><i>原版行为</i></td><td><code>false</code></td></tr>
                </table>`
        },
        datapack: {
            "skip-inactive-entity-for-execute-command": {
                default: false,
                desc: `是否在使用 \`/execute\` 命令时跳过选择处于非活跃状态的实体。<br>
                    这可以在拥有大量数据包函数的服务器上提升性能。`
            }
        },
        "skip-map-item-data-updates-if-map-does-not-have-craftmaprenderer": {
            default: true,
            desc: `当地图没有渲染器（\`CraftMapRenderer\`）时，是否跳过地图内容的更新。<br>
                如果使用了 ImageMap 等能创建大量自定义图片地图的插件，此配置项可以提升性能。<br>
                <br>
                __⚡推荐值：\`true\`__
                <table>
                <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                <tr><td><i>优化</i></td><td><code>true</code></td></tr>
                <tr><td><i>原版行为</i></td><td><code>false</code></td></tr>
                </table>
                <br>
                <div class="tip custom-block">
                <p class="custom-block-title custom-block-title-default">注意</p>
                开启此配置项可能会导致原版地图物品的内容停止更新。
                </div>`
        },
        "throttle-hopper-when-full": {
            enabled: {
                default: false,
                desc: `当目标容器已满时，是否限制漏斗尝试传输物品的频率。<br>
                    此功能可以防止漏斗在物品传输失败时，也在每个 tick 都不断尝试传输物品。<br>
                    <br>
                    __⚡推荐值：\`true\`__
                    <table>
                    <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                    <tr><td><i>优化</i></td><td><code>true</code></td></tr>
                    <tr><td><i>原版行为</i></td><td><code>false</code></td></tr>
                    </table>`
            },
            "skip-ticks": {
                default: 8,
                desc: `当目标容器已满时，漏斗将等待多长时间再尝试移动物品。<br>
                    （单位：tick）<br>
                    仅在上方的 \`throttle-hopper-when-full.enabled\` 为 \`true\` 时，此配置项才会生效。<br>
                    如果设为 &leq; \`0\`，将禁用此冷却功能。<br>
                    <br>
                    __⚡推荐值：\`8\`__
                    <table>
                    <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                    <tr><td><i>优化</i></td><td><code>8</code></td></tr>
                    <tr><td><i>原版行为</i></td><td><code>8</code></td></tr>
                    </table>`
            }
        },
        "throttle-mob-spawning": {
            enabled: {
                default: false,
                desc: `是否跳过生成失败次数过多的区块内的生物生成。<br>
                    在每个区块中，当多次生成生物失败并超以下配置的 \`min-failed\` 值后，跳过后续的生物生成尝试。<br>
                    一旦生成达到以下的最小失败次数，将随机跳过该区块中概率为 1 ~ \`spawn-chance\`% 的刷怪尝试。<br>
                    达到生成数量上限的生成失败将不会计入失败次数；并且一旦成功生成生物，失败计数将被重置。`
            },
            monster: {
                "min-failed": {
                    default: 8,
                    desc: "敌对生物生成失败次数超过此值时，将被限制生成频率。"
                },
                "spawn-chance": {
                    default: "25.0",
                    desc: "在达到上方的 `min-failed` 值后，敌对生物所使用的刷怪概率。"
                }
            },
            creature: {
                "min-failed": {
                    default: 8,
                    desc: "动物生成失败次数超过此值时，将被限制生成频率。"
                },
                "spawn-chance": {
                    default: "25.0",
                    desc: "在达到上方的 `min-failed` 值后，动物所使用的刷怪概率。"
                }
            },
            ambient: {
                "min-failed": {
                    default: 8,
                    desc: "蝙蝠生成失败次数超过此值时，将被限制生成频率。"
                },
                "spawn-chance": {
                    default: "25.0",
                    desc: "在达到上方的 `min-failed` 值后，蝙蝠所使用的刷怪概率。"
                }
            },
            axolotls: {
                "min-failed": {
                    default: 8,
                    desc: "美西螈生成失败次数超过此值时，将被限制生成频率。"
                },
                "spawn-chance": {
                    default: "25.0",
                    desc: "在达到上方的 `min-failed` 值后，美西螈所使用的刷怪概率。"
                }
            },
            underground_water_creature: {
                "min-failed": {
                    default: 8,
                    desc: "发光鱿鱼生成失败次数超过此值时，将被限制生成频率。"
                },
                "spawn-chance": {
                    default: "25.0",
                    desc: "在达到上方的 `min-failed` 值后，发光鱿鱼所使用的刷怪概率。"
                }
            },
            water_creature: {
                "min-failed": {
                    default: 8,
                    desc: "鱿鱼、海豚生成失败次数超过此值时，将被限制生成频率。"
                },
                "spawn-chance": {
                    default: "25.0",
                    desc: "在达到上方的 `min-failed` 值后，鱿鱼、海豚所使用的刷怪概率。"
                }
            },
            water_ambient: {
                "min-failed": {
                    default: 8,
                    desc: "热带鱼生成失败次数超过此值时，将被限制生成频率。"
                },
                "spawn-chance": {
                    default: "25.0",
                    desc: "在达到上方的 `min-failed` 值后，热带鱼所使用的刷怪概率。"
                }
            }
        },
        "create-snapshot-on-retrieving-blockstate": {
            default: true,
            desc: `是否默认在插件获取 \`BlockEntity\` / \`BlockState\` 时创建并使用其快照。<br>
                <br>
                一些插件可能会调用 \`getInventory().getHolder()\` 来获取物品栏的所有者，这会涉及 BlockState 的访问。<br>
                例如，当服务器中存在大量漏斗，并且插件在监听某些事件（如漏斗相关事件）时频繁调用该方法，会不断重新创建 BlockState 快照并序列化物品数据，这在大量、频繁调用的情况下开销非常高。<br>
                参阅 Paper 的 [API-to-get-a-BlockState-without-a-snapshot.patch#L6](https://github.com/PaperMC/Paper-archive/blob/b48403bd69f534ffd43fe2afb4e8e1f1ffa95fe1/patches/server/0160-API-to-get-a-BlockState-without-a-snapshot.patch#L6) 补丁以获取更多信息。
                <ul>
                <li>如果设为 \`true\`，每次插件调用相关方法时，都会创建 BlockState 的快照。</li>
                <li>如果设为 \`false\`，每次插件调用相关方法时，将直接获取目标 BlockState 本身，除非插件显式请求快照。这样可以提升性能，但如果插件的逻辑设计不当，可能存在目标方块状态被意外修改的风险。</li>
                </ul>
                <br>
                __⚡推荐值：\`false\`（仅当你遇到上述卡顿时）__`
        },
        "use-virtual-thread-for-async-scheduler": {
            default: false,
            desc: `是否为 __异步任务调度器（CraftAsyncScheduler）__ 使用 Java 21 引入的 [虚拟线程（Virtual Thread）](https://javaguide.cn/java/concurrent/virtual-thread.html)。<br>
                这可能会提升大量使用 Bukkit 异步调度器的插件的性能。<br>
                <br>
                __⚡推荐值：\`true\`（仅当所有插件都支持虚拟线程时）__`
        },
        "use-virtual-thread-for-async-chat-executor": {
            default: true,
            desc: `是否为 __异步聊天__ 使用 Java 21 引入的 [虚拟线程（Virtual Thread）](https://javaguide.cn/java/concurrent/virtual-thread.html)。<br>
                <br>
                __⚡推荐值：\`true\`__`
        },
        "use-virtual-thread-for-profile-executor": {
            default: false,
            desc: `是否为 __玩家档案执行器（Profile Executor）__ 使用 Java 21 引入的 [虚拟线程（Virtual Thread）](https://javaguide.cn/java/concurrent/virtual-thread.html)。<br>
                该执行器用于处理玩家档案与头颅皮肤的获取。<br>
                <br>
                __⚡推荐值：\`false\`__`
        },
        "use-virtual-thread-for-user-authenticator": {
            default: true,
            desc: `是否为 __用户验证服务（User Authenticator）__ 使用 Java 21 引入的 [虚拟线程（Virtual Thread）](https://javaguide.cn/java/concurrent/virtual-thread.html)。<br>
                该服务用于处理正版玩家的加入验证。<br>
                <br>
                __⚡推荐值：\`true\`__`
        }
    },

    // fixes: {
    //     __desc__: "本节包含对特定问题的修复。",
    // },

    "gameplay-mechanisms": {
        __desc__: "本节包含修改或改进游戏机制的相关功能。",
        "afk-command": {
            enabled: {
                default: false,
                desc: `是否开启基于 Minecraft 原版 [玩家空闲机制](https://zh.minecraft.wiki/w/%E6%9C%8D%E5%8A%A1%E7%AB%AF%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E6%A0%BC%E5%BC%8F#:~:text=%E7%8E%A9%E5%AE%B6%E7%9A%84%E7%A9%BA%E9%97%B2%E6%97%B6%E9%97%B4) 的 AFK 命令。玩家可以使用 \`/afk\` 命令切换 AFK 状态，其 AFK 状态也会显示在 Tab 列表中。<br>
                    <br>
                    同时请在 Purpur 配置中将 \`kick-if-idle\` 设置为 \`false\`，以避免玩家进入 AFK 状态时被踢出服务器。其余 AFK 相关设置（如 AFK 提示消息和 Title 提示）同样位于 Purpur 配置中。`
            }
        },
        "inventory-overflow-event": {
            enabled: {
                default: false,
                desc: `是否启用物品栏溢出事件。当插件使用 \`Inventory#addItem\` 向玩家物品栏添加物品且目标物品栏已满时，会触发该事件。<br>
                    <br>
                    <div class="tip custom-block">
                    <p class="custom-block-title custom-block-title-default">注意</p>
                    这并不是一个推荐的解决方案！请尽快重构你的插件逻辑，直接使用 \`Inventory#addItem\` 方法返回的 Map 结果！
                    </div>`
            },
            "listener-class": {
                default: "com.example.package.PlayerInventoryOverflowEvent",
                desc: "监听该物品栏溢出事件的完整监听器类名。请替换为你自己的监听器类的类名以使用此事件。"
            }
        },
        player: {
            "max-use-item-distance": {
                default: 1.0000001,
                desc: `玩家使用物品进行交互时允许的最大距离。<br>
                    （单位：方块）<br>
                    <br>
                    一些 [无政府服](https://minecraftservers.org/type/anarchy) 或类似类型的服务器可能允许玩家使用黑客端作弊。如果你希望玩家能够使用基于发包的，与水晶相关的模块功能（如 CEV Breaker、BedAura 等），可能需要调整此配置项。<br>
                    通常建议将其设为 \`10.0000001\` 以允许玩家使用相关的黑客端功能。<br>
                    如果设为 \`-1\`，将禁用此最远物品交互距离的检查。<br>
                    <br>
                    __⚡推荐值：\`10.0000001\`（适用于无政府服）__<br>
                    <br>
                    <div class="tip custom-block">
                    <p class="custom-block-title custom-block-title-default">注意</p>
                    如果设为 \`-1\` 或极大的数值，玩家将可以使用黑客端的一些发包功能，并且可能利用 [Nocom 漏洞](https://github.com/nerdsinspace/nocom-explanation)。调整此选项前请充分评估潜在风险。
                    </div>`
            }
        },
        "allow-tripwire-dupe": {
            default: false,
            desc: "是否恢复已在 1.21.2 快照 24w33a 与 24w36a 中修复的绊线复制漏洞（[MC-59471](https://bugs.mojang.com/browse/MC/issues/MC-59471)），也被称为 String Dupe。"
        },
        "death-item-drop-knockback": {
            "drop-around": {
                default: true,
                desc: `玩家死亡时是否将掉落物随机散落在其周围。
                    <ul>
                    <li>如果设为 \`true\`，掉落物将被施加随机偏移并散落在玩家周围。</li>
                    <li>如果设为 \`false\`，掉落物将直接掉落在玩家下方。</li>
                    </ul>`
            },
            "horizontal-force": {
                default: 0.5,
                desc: "玩家死亡时，掉落物所受到的水平方向基础速度。"
            },
            "vertical-force": {
                default: 0.2,
                desc: "与 \`horizontal-force\` 类似，但作用于垂直方向速度。"
            }
        },
        // TODO: Add back when implemented it
        // "hide-item-component": {
        //     "hidden-types": {
        //         default: "[]",
        //         desc: `需隐藏的物品组件类型列表，列表中的组件数据将被隐藏并且不会发送给客户端<br>
        //             <br>
        //             可在 [数据组件类型](https://zh.minecraft.wiki/w/%E6%95%B0%E6%8D%AE%E7%BB%84%E4%BB%B6#%E6%95%B0%E6%8D%AE%E7%BB%84%E4%BB%B6%E7%B1%BB%E5%9E%8B) 中查看所有可用的组件类型。<br>
        //             例如：
        //             <ul>
        //             <li>如果设为 \`[]\`，则不会影响任何物品。</li>
        //             <li>如果设为 \`["minecraft:custom_data"]\`，物品的 \`custom_data\` 组件将在客户端上被隐藏。</li>
        //             </ul>`
        //     },
        //     enabled: {
        //         default: false,
        //         desc: `是否从发送给客户端的玩家物品栏数据中隐藏指定的组件信息。另请参阅上方的 \`hidden-types\`。<br>
        //             <br>
        //             可用于隐藏物品上复杂的组件数据，以减少客户端渲染负载、频繁动画以及网络传输开销。物品的实际数据不会受到影响。<br>
        //             <br>
        //             需要注意的是，此选项不同于 Paper 的 [物品数据混淆](https://docs.papermc.io/paper/reference/global-configuration/#anticheat_obfuscation_items_enable_item_obfuscation)。该选项仅隐藏玩家自身物品栏中的组件数据，而不是对其他玩家隐藏。<br>
        //             <br>
        //             <div class="tip custom-block">
        //             <p class="custom-block-title custom-block-title-default">注意</p>
        //             这可能会破坏依赖这些客户端组件数据的资源包、客户端模组或特定玩法机制。请谨慎使用，并确保你正确配置了隐藏的物品组件列表。
        //             </div>`
        //     }
        // },
        knockback: {
            __desc__: "本节包含调整击退相关行为的功能。",
            "snowball-knockback-players": {
                default: false,
                desc: "是否允许雪球击退玩家。"
            },
            "egg-knockback-players": {
                default: false,
                desc: "是否允许鸡蛋击退玩家。"
            },
            "can-player-knockback-zombie": {
                default: true,
                desc: "是否允许玩家使用空手、武器或抛射物击退僵尸。"
            },
            "flush-location-while-knockback-player": {
                default: false,
                desc: `是否在玩家受到击退时立即向客户端发送位置数据更新包。<br>
                    当目标玩家被击中并受到击退时，此配置项可以提供更顺畅、响应更快的击退反馈。而在原版中，相关数据包会在每次 tick 的最后发送，可能会影响 PVP 体验。<br>
                    <br>
                    __⚡推荐值：\`true\`（适用于 PVP 服务器）__<br>
                    <br>
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">实验性功能</p>
                    实验性功能，正在积极测试中，如遇到问题请反馈。
                    </div>`
            },
            "old-blast-protection-explosion-knockback": {
                default: false,
                desc: `是否使用 ≤ 1.20.4 版本的爆炸击退行为，该行为适用于带有爆炸保护附魔的盔甲。
                    <ul>
                    <li>如果设为 \`true\`，爆炸击退将基于玩家身上的爆炸保护附魔等级进行计算，其击退力度略大于 1.20.4 之后的版本。</li>
                    <li>如果设为 \`false\`，爆炸击退将遵循当前 MC 版本的原版行为。</li>
                    </ul>`
            }
        },
        "only-player-pushable": {
            default: false,
            desc: `是否仅允许玩家被实体推动。<br>
                如果设为 \`true\`，此配置项将覆盖 Paper 全局及世界配置中与碰撞相关的设置，并且生物不会因超过 [maxEntityCramming](https://minecraft.wiki/w/Game_rule#:~:text=entity%20cramming%20damage) 游戏规则上限而死亡。<br>
                <br>
                __⚡推荐值：\`true\`__<br>
                <br>
                <div class="tip custom-block">
                <p class="custom-block-title custom-block-title-default">注意</p>
                这可能会破坏依赖生物碰撞来推动生物掉落或通过超过 [maxEntityCramming](https://minecraft.wiki/w/Game_rule#:~:text=entity%20cramming%20damage) 游戏规则上限来杀死生物的刷怪塔。
                </div>`
        },
        "spawner-settings": {
            enabled: {
                default: false,
                desc: "是否启用下方的自定义刷怪笼配置项。以下配置项仅影响刷怪笼生成的生物，不影响生物自然生成。"
            },
            checks: {
                "light-level-check": {
                    default: false,
                    desc: `是否检查光照等级是否满足生物生成条件。
                        <ul>
                        <li>如果设为 \`true\`，刷怪笼将使用与对应生物的自然生成相同的光照条件来尝试生成。</li>
                        <li>如果设为 \`false\`，刷怪笼将遵循原版行为，不检查光照等级。</li>
                        </ul>`
                },
                "spawner-max-nearby-check": {
                    default: true,
                    desc: `是否检查附近的生物数量是否已达到最大生成数量限制。刷怪笼会在生物过多时停止生成，以防止过度拥挤。
                        <ul>
                        <li>如果设为 \`true\`，刷怪笼将遵循原版行为，在附近生物数量超过上限时不再生成新生物。</li>
                        <li>如果设为 \`false\`，刷怪笼将始终尝试生成生物，不检查附近生物数量。</li>
                        </ul>`
                },
                "check-for-nearby-players": {
                    default: true,
                    desc: `是否检查有玩家在生物的生成半径内才允许生成生物。
                        <ul>
                        <li>如果设为 \`true\`，刷怪笼将始终尝试生成生物，不检查附近是否存在玩家。</li>
                        <li>如果设为 \`false\`，仅在附近存在玩家时才会尝试生成生物。</li>
                        </ul>`
                },
                "spawner-block-checks": {
                    default: false,
                    desc: "是否在生成点被方块阻挡时阻止生成尝试。"
                },
                "water-prevent-spawn-check": {
                    default: false,
                    desc: "是否在生成点存在水时阻止生成尝试。"
                },
                "ignore-spawn-rules": {
                    default: false,
                    desc: `是否忽略生物的附加生成规则。<br>
                        <br>
                        许多生物都有额外的生成限制，例如只能在特定方块上生成，或禁止在某些方块上生成。例如，大多数动物只能在草方块上生成，而疣猪兽无法在下界疣块、岩浆块或菌光体上生成。你可以在 [Additional Rules](https://minecraft.wiki/w/Mob_spawning#:~:text=additional%20rules) 中查看这些规则。<br>
                        <br>
                        此配置项与上方的 \`spawner-block-checks\` 和 \`water-prevent-spawn-check\` 相互独立，互不影响。`
                }
            },
            "min-spawn-delay": {
                default: 200,
                desc: `刷怪笼每次生成尝试之间的最小间隔。数值越高，刷怪笼生成速度越慢。<br>
                    （单位：tick）`
            },
            "max-spawn-delay": {
                default: 800,
                desc: `刷怪笼每次生成尝试之间的最大间隔。数值越高，刷怪笼生成速度越慢。<br>
                    （单位：tick）`
            }
        },
        "use-spigot-item-merging-mechanism": {
            default: false,
            desc: `是否基于物品的 tick 顺序来合并掉落物，这是 Spigot 长期以来的默认行为。<br>
                <br>
                在 Spigot 中，后 tick 的物品实体会合并到先 tick 的实体上。如果合并半径相对较大，可以避免掉落物卡在一些非预期的奇怪位置。因此，这对于会产生大量掉落物的刷怪塔或红石装置非常有用。<br>
                而在原版中，掉落物合并是基于物品堆叠数量进行的，数量较少的物品堆会合并到数量较多的堆中。
                <table>
                <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                <tr><td><i>SMP 友好</i></td><td><code>true</code></td></tr>
                <tr><td><i>原版行为</i></td><td><code>false</code></td></tr>
                </table>`
        }
    },

    network: {
        __desc__: "本节包含与网络相关的功能。",
        "async-switch-state": {
            default: false,
            desc: `是否异步处理玩家连接状态切换逻辑。<br>
                这可以修复由原版逻辑设计缺陷导致的，利用漏洞使主线程阻塞的问题。<br>
                <br>
                __⚡推荐值：\`true\`__`
        },
        "chat-message-signature": {
            default: true,
            desc: `是否开启 MC 1.19.1 引入的聊天消息签名。<br>
                <ul>
                <li>如果设为 \`true\`，聊天消息将被签名，并且可以像原版一样进行举报。</li>
                <li>如果设为 \`false\`，将禁用聊天签名，玩家无法举报消息，且进服时不会显示“不安全聊天”的警告弹窗。</li>
                </ul>
                <br>
                __⚡推荐值：\`false\`__（仅限离线模式服务器或拥有其他聊天管理策略的服务器）`
        },
        OptimizeNonFlushPacketSending: {
            default: false,
            desc: `是否通过使用 Netty 的 [\`lazyExecute\`](https://netty.io/4.2/api/io/netty/util/concurrent/SingleThreadEventExecutor.html#lazyExecute(java.lang.Runnable)) 方法来优化非 flush 数据包的发送。该方式可以减少线程竞争和不必要的唤醒开销，适用于部分网络相关操作的逻辑。<br>
                <br>
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">警告</p>
                该配置项已知与 ProtocolLib __不兼容__，并且可能与有着大量发包操作的插件不兼容。<br>
                启用后需要重启服务器才能生效。请谨慎使用。
                </div>`
        },
        "protocol-support": {
            __desc__: `熙熙攘攘，我们的协议。<br>
                本部分包含为一些提升游戏体验（QoL）的实用模组提供额外的协议支持。<br>
                <br>
                这些额外的协议支持仅在客户端安装了相应模组时才会生效。这意味着，如果开启了特定的协议支持，并且玩家在客户端安装了对应模组，他们可以使用下方配置中描述的额外功能；但对于没有安装相应模组的玩家，一切都和之前一样。<br>
                <br>
                <div class="tip custom-block">
                <p class="custom-block-title custom-block-title-default">注意</p>
                开启协议支持后，可能导致和 [ViaVersion](https://modrinth.com/plugin/viaversion) 不兼容。<br>
                并且我们建议玩家使用与服务器核心相同版本的客户端，并安装对应模组的最新版本，否则将会无法进入服务器。
                </div>`,
            "jade-protocol": {
                default: false,
                desc: `是否开启对 [Jade](https://modrinth.com/mod/jade) 的协议支持。<br>
                    如果设为 \`true\`，安装了 Jade 模组的玩家可以在客户端显示储存容器中的物品信息，熔炉燃烧进度，酿造台进度，篝火上的食物，蜂巢中的蜜蜂数据等更多贴合原版的功能。`
            },
            "appleskin-protocol": {
                default: false,
                desc: `是否开启对 [AppleSkin](https://modrinth.com/mod/appleskin) 的协议支持。<br>
                    如果设为 \`true\`，安装了 AppleSkin 模组的玩家可以在客户端显示准确的饱和度 / 消耗度。`
            },
            "appleskin-protocol-sync-tick-interval": {
                default: 20,
                desc: `服务器向已安装 AppleSkin 模组的客户端同步数据的频率。<br>
                    仅在上方的 \`appleskin-protocol\` 为 \`true\` 时生效。<br>
                    （单位：tick，默认 20 tick = 1 秒）`
            },
            "asteorbar-protocol": {
                default: false,
                desc: `是否开启对 [AsteorBar](https://modrinth.com/mod/asteorbar) 的协议支持。<br>
                    如果设为 \`true\`，安装了 AsteorBar 模组的玩家可以在客户端显示准确的饱和度 / 消耗度。`
            },
            "chatimage-protocol": {
                default: false,
                desc: `是否开启对 [ChatImage](https://modrinth.com/mod/chatimage) 的协议支持。<br>
                    如果设为 \`true\`，安装了 ChatImage 模组的玩家可以看到使用 CICode 格式发送的图片。`
            },
            "xaero-map-protocol": {
                default: false,
                desc: `是否开启对 [XaeroMap](https://modrinth.com/mod/xaeros-minimap) 的协议支持。<br>
                    如果设为 \`true\`，安装了 Xaero's MiniMap 或 Xaero's WorldMap 模组的玩家可以基于下方 \`protocol-support.xaero-map-server-id\` 存储和服务器挂钩的玩家坐标点与死亡点，防止服务器名称或 IP 更改时数据被删除或刷新。`
            },
            "xaero-map-server-id": {
                default: 513317,
                desc: `用于 XaeroMap 识别服务器的唯一数字 ID。<br>
                    即使服务器名称或 IP 地址发生变化，也可防止标记点被删除或刷新。如有需要可自行修改。<br>
                    该值将在首次启动服务器时随机生成。`
            },
            "syncmatica-protocol": {
                default: false,
                desc: `是否开启对 [Syncmatica](https://modrinth.com/mod/syncmatica) 的协议支持。<br>
                    如果设为 \`true\`，安装了 Syncmatica 模组的玩家可以上传或下载服务器共享的 [投影](https://modrinth.com/mod/litematica) 文件。所有安装了 Syncmatica 模组的玩家都可以查看并使用其他玩家共享的投影。`
            },
            "syncmatica-quota": {
                default: false,
                desc: "是否限制每个共享投影的文件大小。"
            },
            "syncmatica-quota-limit": {
                default: 40000000,
                desc: `上传至服务器的共享投影的最大单个文件大小。<br>
                    （单位：字节，默认 40,000,000 字节 ≈ 38 MB）`
            },
            "do-a-barrel-roll-protocol": {
                default: false,
                desc: `是否开启对 [Do a Barrel Roll](https://modrinth.com/mod/do-a-barrel-roll) 的协议支持。<br>
                    如果设为 \`true\`，Do a Barrel Roll 的视觉效果将同步给其他已安装该模组的玩家。`
            },
            "do-a-barrel-roll-allow-thrusting": {
                default: false,
                desc: "是否允许玩家在客户端配置中启用 \`enable_thrust\` 选项。"
            },
            "do-a-barrel-roll-force-enabled": {
                default: false,
                desc: "是否强制对所有已安装该模组的玩家启用该模组，无视其客户端配置。"
            },
            "do-a-barrel-roll-force-installed": {
                default: false,
                desc: "是否拒绝未在客户端安装该模组的玩家加入服务器。"
            },
            "do-a-barrel-roll-installed-timeout": {
                default: 0,
                desc: `等待客户端响应 \`do_a_barrel_roll:config_sync\` 数据包的超时时间。<br>
                    （单位：tick）<br>
                    若超过该时间仍未响应，则未安装该模组的玩家将被踢出服务器。`
            }
        }
    },

    misc: {
        __desc__: "本节包含一些杂项功能。",
        "connection-message": {
            __desc__: `玩家连接提示，当玩家加入或离开服务器时广播发送给所有在线玩家。<br>
                该消息需要使用 [MiniMessage](https://docs.papermc.io/adventure/minimessage/format/) 格式。<br>
                如果将下方的 \`message\` 设为 \`default\`，将使用原版的进服 / 退服提示。<br>
                如果将下方的 \`enabled\` 设为 \`false\`，则将禁用连接提示，并由其他插件负责发送提示信息。<br>
                <br>
                可用占位符：
                <ul>
                <li>__\`<player_name>\`__ - 玩家名</li>
                <li>__\`<player_displayname>\`__ - 玩家显示名</li>
                </ul>
                <br>
                <div class="tip custom-block">
                <p class="custom-block-title custom-block-title-default">API / 插件 友好</p>
                此功能对 API / 插件 友好。这意味着插件可以使用 \`PlayerJoinEvent\` 或 \`PlayerQuitEvent\` 的相关方法覆盖此配置项的消息。
                </div>`,
            join: {
                enabled: {
                    default: true,
                    desc: "玩家加入服务器时是否广播提示消息。"
                },
                message: {
                    default: "default",
                    desc: "玩家加入服务器时的提示消息。"
                }
            },
            quit: {
                enabled: {
                    default: true,
                    desc: "玩家离开服务器时是否广播提示消息。"
                },
                message: {
                    default: "default",
                    desc: "玩家离开服务器时的提示消息。"
                }
            }
        },
        "including-5s-in-get-tps": {
            default: true,
            desc: `是否在 \`Bukkit#getTPS\` 和 \`Server#getTPS\` API 方法的返回结果中包含 5 秒 TPS 数据。<br>
                像 \`/tps\` 这样的命令一直会显示 5 秒 TPS 数据。<br>
                <ul>
                <li>如果设为 \`true\`，可以通过 \`getTPS\` 方法获取包含 4 个元素的 TPS 数组：\`[5s, 1m, 5m, 15m]\`。</li>
                <li>如果设为 \`false\`，可以通过 \`getTPS\` 方法获取包含 3 个元素的 TPS 数组：\`[1m, 5m, 15m]\`。</li>
                </ul>
                <br>
                <details class="tip custom-block">
                <summary class="custom-block-title custom-block-title-default">再深入一些？</summary>
                如果你的插件基于 Leaf API，或运行在 Leaf 上并通过反射获取 TPS，可以使用 \`Bukkit#getTPSIncluding5SecondAverage\` 方法来获取包含 5 秒 TPS 的数组 \`[5s, 1m, 5m, 15m]\`。<br>
                同时，你也可以使用 \`Bukkit#get5SecondTPSAverage\` 来获取 5 秒 TPS 的平均值（\`double\` 类型）。
                </details>`
        },
        "lag-compensation": {
            enabled: {
                default: false,
                desc: `卡顿滞后补偿，可以用于缓解服务器卡顿或较低 TPS 对游戏体验的影响，从而在卡顿期间尽可能确保玩家的基本游戏体验。<br>
                <br>
                __⚡推荐值：\`true\`__`
            },
            "enable-for-water": {
                default: false,
                desc: `是否开启水流动的滞后补偿。<br>
                <br>
                __⚡推荐值：\`true\`__`
            },
            "enable-for-lava": {
                default: false,
                desc: `是否开启岩浆流动的滞后补偿。<br>
                <br>
                __⚡推荐值：\`true\`__`
            }
        },
        "remove-change-non-editable-sign-warning": {
            default: false,
            desc: `当玩家尝试编辑其无法编辑的告示牌时，是否在控制台打印警告信息。<br>
                该警告信息类似于：\`Player [...] just tried to change non-editable sign\`。<br>
                如果设为 \`true\`，可以防止某些情况下由玩家使用一些方法或其他原因导致的控制台刷屏。<br>
                <br>
                __⚡推荐值：\`true\`__`
        },
        "remove-spigot-check-bungee-config": {
            default: false,
            desc: `是否允许玩家在后端服务器未开启 \`spigot.yml\` 中的 BungeeCord 模式的情况下，通过代理服务器进入后端服务器。<br>
                <br>
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">警告</p>
                不建议修改此选项，除非你非常清楚自己在做什么。<br>
                并且该选项未来可能会被移除。
                </div>`
        },
        "secure-seed": {
            enabled: {
                default: false,
                desc: `是否使用安全种子。<br>
                    <br>
                    安全种子会使用高安全性的密码学哈希函数，通过 1024 位种子来生成所有矿石和结构，而不是原版使用的 64 位种子。这可以从计算层面保护结构种子，使种子破解几乎不可能。<br>
                    <br>
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">警告</p>
                    安全种子将从根本上改变矿石与结构相对于原版的生成位置。<br>
                    该选项仅作用于新生成的区块，因此如果你希望完整使用该功能，必须创建一个新世界。<br>
                    一旦启用该配置项，便无法再切换回原版生成方式，除非你预生成整个世界，否则新生成的区块将出现地形割裂的问题。
                    </div>`
            }
        },
        sentry: {
            __desc__: `[Sentry](https://sentry.io/welcome/) 是一个应用程序监控服务，皆在更好地收集，记录，跟踪错误日志和相关信息，帮助服务器开发与运维更好地定位并修复问题。<br>
                <br>
                开启 Sentry 集成后，你无需再手动审计冗长的日志来定位错误。Sentry 可以收集服务器运行时发生的错误，并允许你在 Sentry 的 Web 面板中进行跟踪，帮助你更轻松、快速地定位并修复问题。<br>
                <br>
                请参阅 __[如何配置 Sentry](../how-to/setup-sentry)__ 以了解如何配置 Sentry，并获取下方 \`sentry.dsn\` 所需的 DSN 密钥。<br>`,
            dsn: {
                default: "''",
                desc: `Sentry 的 DSN 密钥。<br>
                    如果设为空 \`''\`，则将禁用 Sentry。`
            },
            "log-level": {
                default: "WARN",
                desc: `等于或高于该等级的日志将被记录。<br>
                    可用的日志等级包括：\`"WARN"\`、\`"ERROR"\` 和 \`"FATAL"\`。`
            },
            "only-log-thrown": {
                default: true,
                desc: "是否仅记录带有 Java \`Throwable\` 的日志。"
            }
        },
        rebrand: {
            "server-mod-name": {
                default: "Leaf",
                desc: "服务端核心名字。将显示在客户端的 F3 调试界面以及服务器 MOTD 中。"
            },
            "server-gui-name": {
                default: "Leaf Console",
                desc: "服务端 GUI 控制台标题。如果在启动服务器时未添加 `--nogui` 启动参数，则会在核心自带的 GUI 控制台中显示该标题。"
            }
        },
        message: {
            "unknown-command": {
                default: "default",
                desc: `未知命令提示，将在玩家执行未知的命令时向其发送。<br>
                    该消息需要使用 [MiniMessage](https://docs.papermc.io/adventure/minimessage/format/) 格式。<br>
                    如果设为 \`default\`，将使用原版的未知命令提示。<br>
                    <br>
                    可用占位符：
                    <ul>
                    <li>__\`<detail>\`__ - 未知命令的详细信息。</li>
                    </ul>
                    <br>
                    <div class="tip custom-block">
                    <p class="custom-block-title custom-block-title-default">API / 插件 友好</p>
                    此功能对 API / 插件 友好。这意味着插件可以使用 \`UnknownCommandEvent#message\` 或 \`UnknownCommandEvent#setMessage\` 方法覆盖该消息内容。
                    </div>`
            }
        },
        "vanilla-username-check": {
            "remove-all-check": {
                default: false,
                desc: `是否移除原版的用户名检查。这将允许玩家使用包括中文在内的所有字符作为用户名。<br>
                    <br>
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">实验性功能</p>
                    移除所有用户名校验是 __极度不安全且具有风险的行为，请自行承担风险！__
                    </div>`
            },
            "enforce-skull-validation": {
                default: true,
                desc: "是否强制校验头颅数据，以防止带有特殊字符的头颅导致客户端崩端 / 掉线。"
            },
            "allow-old-players-join": {
                default: false,
                desc: `在配置的用户名正则规则发生更改后，是否允许老玩家加入服务器，即使其用户名不符合新的规则。<br>
                    <br>
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">实验性功能</p>
                    对老玩家移除所有用户名校验是 __极度不安全且具有风险的行为，请自行承担风险！__
                    </div>`
            },
            "use-username-regex": {
                default: false,
                desc: `是否使用用户名正则表达式来校验用户名，仅允许玩家使用正则规定的字符作为玩家名。<br>
                    该配置项与上方的 \`remove-all-check\` 不兼容，两者只能启用其中之一。`
            },
            "username-regex": {
                default: "^[a-zA-Z0-9_.]*$",
                desc: `用于定义用户名中允许字符的正则表达式。<br>
                    仅当上方的 \`use-username-regex\` 设为 \`true\` 时才会生效。`
            }
        }
    }
};

export default config;
