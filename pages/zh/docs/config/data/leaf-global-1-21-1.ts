import type { ConfigRoot } from "@/.vitepress/theme/components/config/types";

const config: ConfigRoot = {
    "config-version": {
        default: "3.0"
    },

    async: {
        __desc__: "本节包含异步相关的功能，旨在通过将部分任务异步处理，来降低主线程（Server Thread）的负载。",
        "async-entity-tracker": {
            enabled: {
                default: false,
                desc: `是否使用异步生物追踪。<br>
                    这可以显著提升性能，尤其是在大量密集实体集中于小范围区域的场景中。<br>
                    <br>
                    __⚡推荐值：\`true\`__<br>
                    <br>
                    <div class="tip custom-block">
                    <p class="custom-block-title custom-block-title-default">注意</p>
                    如果你安装了类似 Citizens 的，使用真实实体或玩家类型的实体作为“NPC”的插件，请一并参阅下方的 \`compat-mode\` 以获取更多信息。
                    </div>`
            },
            "compat-mode": {
                default: false,
                desc: `是否使用兼容模式，以兼容 Citizens 或其他使用真实实体或玩家类型的实体的 NPC 插件。<br>
                    如果设为 \`true\`，可以修复玩家类型 NPC 有时会消失的可见性问题。<br>
                    <br>
                    __仅当__ 你安装了 Citizens 或任何其他使用真实实体的 NPC 插件时，才需在使用异步实体追踪时一并启用 \`compat-mode\`。<br>
                    <br>
                    但我们仍然建议使用基于发包 / 虚拟实体 / 展示实体 的 NPC 插件以获得更好的性能，例如：[ZNPC Plus](https://github.com/Pyrbu/ZNPCsPlus)、[Adyeshach](https://github.com/TabooLib/Adyeshach)、[Fancy NPC](https://modrinth.com/plugin/fancynpcs) 等。在这种情况下，可以关闭 \`compat-mode\`。`
            },
            "max-threads": {
                default: 0,
                desc: `异步实体追踪可使用的最大线程数。<br>
                    例如：<br>
                    <ul>
                    <li>如果设为 &lt; \`0\`，则会自动使用（CPU 核心数 + 该值）作为线程数量，最少为 1。</li>
                    <li>如果设为 \`0\`，则会自动使用 CPU 核心数 1/4 的线程数，最少为 1。</li>
                    </ul>
                    <br>
                    __⚡推荐值：CPU 核心数的 1/2__`
            },
            keepalive: {
                default: 60,
                desc: `空闲线程的存活时间。<br>
                    当线程超过此事件并且没有任务时，将会被销毁。<br>
                    （单位：秒）`
            }
        },
        "async-playerdata-save": {
            enabled: {
                default: false,
                desc: `是否使用异步玩家数据保存（I/O 操作都很耗时）。<br>
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">实验性功能</p>
                    实验性功能，在某些情况下可能导致数据丢失或数据不一致！
                    </div>`
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
        "async-locator": {
            enabled: {
                default: false,
                desc: `是否使用异步定位。<br>
                    结构定位任务的负载将被分担到其他线程。<br>
                    当前支持以下功能：
                    <ul>
                    <li>\`/locate\` 命令</li>
                    <li>海豚寻找附近的沉船，海底废墟或埋葬的宝藏</li>
                    <li>末影之眼定位要塞</li>
                    </ul>
                    <br>
                    __⚡推荐值：\`true\`__`
            },
            threads: {
                default: 0,
                desc: `异步定位可使用的最大线程数。<br>
                    如果设为 &leq; \`0\`，则会自动使用 1 个线程。<br>
                    <br>
                    __⚡推荐值：\`1\` 或 \`2\`__`
            },
            keepalive: {
                default: 60,
                desc: `空闲线程的存活时间。<br>
                    当线程超过此事件并且没有任务时，将会被销毁。<br>
                    （单位：秒）`
            }
        }
    },

    performance: {
        __desc__: "本节包含性能调优相关的优化，旨在减少不必要的计算或使用更高效的方法优化服务器。",
        "use-virtual-thread-for-async-chat-executor": {
            default: true,
            desc: `是否为 __异步聊天__ 使用 Java 21 引入的 [虚拟线程（Virtual Thread）](https://javaguide.cn/java/concurrent/virtual-thread.html)。<br>
                <br>
                __⚡推荐值：\`true\`__`
        },
        "use-virtual-thread-for-async-scheduler": {
            default: true,
            desc: `是否为 __异步任务调度器（CraftAsyncScheduler）__ 使用 Java 21 引入的 [虚拟线程（Virtual Thread）](https://javaguide.cn/java/concurrent/virtual-thread.html)。<br>
                这可能会提升大量使用 Bukkit 异步调度器的插件的性能。<br>
                <br>
                __⚡推荐值：\`true\`（仅当所有插件都支持虚拟线程时）__`
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
        "inactive-goal-selector-throttle": {
            default: true,
            desc: `是否限制处于非活跃状态（通常远离玩家）实体的 [意向选择器（Goal Selector）](https://zh.minecraft.wiki/w/%E7%94%9F%E7%89%A9AI#:~:text=%E6%84%8F%E5%90%91%E9%80%89%E6%8B%A9%E5%99%A8) 的计算频率。<br>
                不再每刻（tick）都执行意向选择器的计算，而是改为每秒执行一次。这样可以略微提升性能，但可能会对游戏玩法产生轻微影响。<br>
                <br>
                __⚡推荐值：\`true\`__
                <table>
                <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                <tr><td><i>优化</i></td><td><code>true</code></td></tr>
                <tr><td><i>原版行为</i></td><td><code>false</code></td></tr>
                </table>`
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
                default: 0,
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
        "skip-ai-for-non-aware-mob": {
            default: true,
            desc: `是否跳过同时处于 _不活跃_ 且 _无感知_ 状态的生物的 AI tick 计算。<br>
                被设为无感知的生物在重新变为活跃之前将不会自主活动，也不会在与其交互时作出反应。更多信息请参阅 [Mob.html#setAware(boolean)](https://jd.papermc.io/paper/1.21.1/org/bukkit/entity/Mob.html#setAware(boolean))。<br>
                <br>
                __⚡推荐值：\`true\`__
                <table>
                <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                <tr><td><i>优化</i></td><td><code>true</code></td></tr>
                <tr><td><i>原版行为</i></td><td><code>false</code></td></tr>
                </table>`
        },
        "reduce-packets": {
            __desc__: "本节包含减少无用数据包发送的相关功能。",
            "reduce-entity-move-packets": {
                default: false,
                desc: `是否减少发送给玩家的无用实体移动数据包（例如极小幅度的移动）。<br>
                    这可以略微节省带宽并减少客户端的处理负担。在实体数量较多或出现轻微卡顿时，有希望移动看起来更流畅。<br>
                    <br>
                    __⚡推荐值：\`true\`__`
            }
        },
        "optimized-powered-rails": {
            default: true,
            desc: `是否优化动力铁轨的逻辑。<br>
                将使用完全重写的动力铁轨迭代逻辑，在保持原版行为一致的前提下，性能可提升约 4 倍。<br>
                该实现最初基于 Fabric 模组 [FX's Rail Optimization](https://modrinth.com/mod/rail-optimization)，作者为 [Fx Morin](https://github.com/FxMorin)。<br>
                <br>
                __⚡推荐值：\`true\`__`
        },
        "optimize-minecart": {
            enabled: {
                default: false,
                desc: `是否优化矿车的 tick 计算。通过跳过部分碰撞计算的方式，以减少 \`getEntities()\` 和一些 Bukkit 事件高频调用的开销。<br>
                    这可以更好地承载大量的堆叠矿车，特别适用于 [无政府服](https://minecraftservers.org/type/anarchy)。<br>
                    <br>
                    __⚡推荐值：\`true\`__
                    <table>
                    <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                    <tr><td><i>优化</i></td><td><code>true</code></td></tr>
                    <tr><td><i>原版行为</i></td><td><code>false</code></td></tr>
                    </table>`
            },
            "skip-tick-count": {
                default: 30,
                desc: `每隔多少 tick 计算一次矿车碰撞。<br>
                    （单位：tick）<br>
                    <br>
                    __⚡推荐值：\`30\`__`
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
        "faster-random-generator": {
            enabled: {
                default: false,
                desc: `是否使用 Java 17 中引入的更快的随机数生成器。<br>
                    随机数生成在 Minecraft 中几乎无处不在，此功能可以显著提升性能。<br>
                    <br>
                    __⚡推荐值：\`true\`__<br>
                    <br>
                    <div class="tip custom-block">
                    <p class="custom-block-title custom-block-title-default">注意</p>
                    该功能需要使用 支持 \`RandomGenerator\` 的 JVM，部分 JRE 可能不支持。
                    </div>`
            },
            "random-generator": {
                default: "Xoroshiro128PlusPlus",
                desc: `需要使用哪种随机数生成器算法？<br>
                    可参阅 [Random Number Generators in Java](https://www.baeldung.com/java-17-random-number-generators#1-api-design-1) 或 [JEP 356](https://openjdk.org/jeps/356)，了解所有可用的随机数生成器。<br>
                    <br>
                    __⚡推荐值：\`Xoroshiro128PlusPlus\`__`
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
        "enable-cached-minecraft-to-bukkit-entitytype-convert": {
            default: true,
            desc: `是否缓存 *Minecraft EntityType* 到 *Bukkit EntityType* 的类型转换结果。<br>
                该转换在生物生成逻辑中可能有一定性能开销，进行缓存可以略微提升性能。<br>
                <br>
                __⚡推荐值：\`true\`__`
        },
        dab: {
            __desc__:
                "Dynamic Activation of Brain（简称 DAB）会在实体远离玩家时，降低其大脑 tick 计算的频率，以此优化实体 AI。若服务器中存在大量实体，这是一个值得采用的权衡优化和原版行为的优化方案。",
            enabled: {
                default: true,
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
                default: "[]",
                desc: `DAB 黑名单，名单内的生物将不受 DAB 的影响。<br>
                    <br>
                    例如，一些生存服拥有很多基于实体寻路的生物农场或者刷怪塔。这些寻路式刷怪塔需要怪物拥有目标来吸引仇恨，这类刷怪塔可能会受 DAB 影响而无法正常工作。可以通过将对应生物类型添加到此黑名单，来解决刷怪塔无法工作的问题。<br>
                    如果你的服务器中某些刷怪塔出现实体冻结、不移动的情况，而你不确定是否由 DAB 导致，可以尝试将对应生物添加到此黑名单，然后重启服务器并检查此问题是否修复。<br>
                    <br>
                    黑名单格式：\`[villager]\` 或 \`[villager, zombified_piglin]\`（可参见 [Paper 的 Javadoc](https://jd.papermc.io/paper/1.21.1/org/bukkit/entity/EntityType.html) 查看所有实体类型）。<br>
                    <br>
                    [💡 再深入一些？](guides/dab-blacklist-format)`
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
        "entity-timeouts": {
            __desc__: `实体的最长存活时间（又称 Entity TTL）。<br>
                （单位：tick）<br>
                如果下列列表中某实体的存活时间超过此值，将清除该实体。ⓘ<br>
                如果设为 \`-1\`，则对相应实体禁用 Entity TTL 检查。<br>
                <br>
                __⚡推荐值:__
                <table>
                <thead><tr><th>实体</th><th>最长存活时间</th></tr></thead>
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
                ⓘ = 此处所指的实体存活的时间为实体存在的总时间，该时间不会因区块的卸载或加载而重置。`,
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
        __desc__: "本节包含对特定问题的修复。",
        "dont-place-player-if-server-full": {
            default: false,
            desc: `是否在服务器已满时禁止玩家加入（“已满”由 \`server.properties\` 中的 \`max-players\` 定义）。<br>
                此配置项修复了 [Paper#10668](https://github.com/PaperMC/Paper/issues/10668)。<br>
                <br>
                如果设为 \`true\`，应给予玩家 \`purpur.joinfullserver\` 权限，以允许玩家绕过人数上限，而不是使用 \`PlayerLoginEvent#allow\` API 来放行玩家。`
        }
    },

    "gameplay-mechanisms": {
        __desc__: "本节包含修改或改进游戏机制的相关功能。",
        "use-spigot-item-merging-mechanism": {
            default: true,
            desc: `是否基于物品的 tick 顺序来合并掉落物，这是 Spigot 长期以来的默认行为。<br>
                <br>
                在 Spigot 中，后 tick 的物品实体会合并到先 tick 的实体上。如果合并半径相对较大，可以避免掉落物卡在一些非预期的奇怪位置。因此，这对于会产生大量掉落物的刷怪塔或红石装置非常有用。<br>
                而在原版中，掉落物合并是基于物品堆叠数量进行的，数量较少的物品堆会合并到数量较多的堆中。
                <table>
                <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                <tr><td><i>SMP 友好</i></td><td><code>true</code></td></tr>
                <tr><td><i>原版行为</i></td><td><code>false</code></td></tr>
                </table>`
        },
        "smooth-teleport": {
            default: false,
            desc: `是否在玩家切换维度时尝试使用“平滑传送”。<br>
                此配置项需要源世界和目标世界具有相同的逻辑高度才能正常工作。
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">实验性功能</p>
                实验性功能，正在积极测试中，如遇到问题请反馈。
                </div>`
        },
        "max-item-stack-count": {
            __desc__: `每组掉落物的最大堆叠大小。
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">警告</p>
                我们 __不推荐__ 使用此功能。此功能仍在开发中，并且存在已知问题。<br>
                此配置项可能在未来被移除。__请勿__ 修改此配置，除非你知道自己做什么！
                </div>`,
            "max-dropped-items-stack-count": {
                default: 0,
                desc: "每组掉落物可以堆叠的最大数量。"
            },
            "max-container-destroy-count": {
                default: 0,
                desc: "容器被破坏时，允许掉落的最大物品堆叠数量。"
            }
        },
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
            }
        },
        player: {
            "disable-moved-wrongly-threshold": {
                default: false,
                desc: `是否禁用 Spigot 内置的 \"moved too quickly / wrongly\" 移动速度检查（适用于玩家和载具）。<br>
                    如果设为 \`true\`, 玩家将可以高速移动或使用载具（例如矿车）以异常速度移动.<br>
                    <br>
                    __⚡推荐值：\`true\`__`
            },
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
        "afk-command": {
            enabled: {
                default: false,
                desc: `是否开启基于 Minecraft 原版 [玩家空闲机制](https://zh.minecraft.wiki/w/%E6%9C%8D%E5%8A%A1%E7%AB%AF%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E6%A0%BC%E5%BC%8F#:~:text=%E7%8E%A9%E5%AE%B6%E7%9A%84%E7%A9%BA%E9%97%B2%E6%97%B6%E9%97%B4) 的 AFK 命令。玩家可以使用 \`/afk\` 命令切换 AFK 状态，其 AFK 状态也会显示在 Tab 列表中。<br>
                    <br>
                    同时请在 Purpur 配置中将 \`kick-if-idle\` 设置为 \`false\`，以避免玩家进入 AFK 状态时被踢出服务器。其余 AFK 相关设置（如 AFK 提示消息和 Title 提示）同样位于 Purpur 配置中。`
            }
        }
    },

    network: {
        __desc__: "本节包含与网络相关的功能。",
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
            }
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
        }
    },

    misc: {
        __desc__: "本节包含一些杂项功能。",
        message: {
            "unknown-command": {
                default: "<red><lang:command.unknown.command><newline><detail>",
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
        "remove-vanilla-username-check": {
            default: true,
            desc: `是否移除原版的用户名检查，让 __所有字符__ 都可作为用户名，包括中文等（仅适用于离线服务器）。<br>
                如果设为 \`true\`，玩家将可以使用非英文用户名进入服务器。`
        },
        "remove-spigot-check-bungee-config": {
            default: true,
            desc: `是否允许玩家在后端服务器未开启 \`spigot.yml\` 中的 BungeeCord 模式的情况下，通过代理服务器进入后端服务器。<br>
                <br>
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">警告</p>
                不建议修改此选项，除非你非常清楚自己在做什么。<br>
                并且该选项未来可能会被移除。
                </div>`
        },
        "remove-change-non-editable-sign-warning": {
            default: false,
            desc: `当玩家尝试编辑其无法编辑的告示牌时，是否在控制台打印警告信息。<br>
                该警告信息类似于：\`Player [...] just tried to change non-editable sign\`。<br>
                如果设为 \`true\`，可以防止某些情况下由玩家使用一些方法或其他原因导致的控制台刷屏。<br>
                <br>
                __⚡推荐值：\`true\`__`
        },
        "region-format-settings": {
            __desc__: `Linear 是一种区块文件格式，使用 [zstd 压缩算法](https://facebook.github.io/zstd/) 来替代 MC 原版的 zlib 压缩算法。此格式可节省约 ~50% 的磁盘空间。<br>
                在使用 Linear 区块格式之前，请确保你已经 __阅读 [Linear 文档](https://github.com/xymb-endcrystalme/LinearRegionFileFormatTools)__ 并完成所有必要步骤，然后将下方的 \`region-format\` 设为 \`LINEAR\`。<br>
                <br>
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">警告</p>
                实验性功能，存在区块数据丢失的潜在风险。在切换至 Linear 格式前请务必备份你的服务端。<br>
                同时，我们并不推荐使用 Linear 格式，因为原版的 ANVIL 格式（\`.mca\`）已经足够稳定。Leaf 使用了重构的 Linear 保存系统，以更安全的保存区块大大减小丢数据的可能性，但保存区块速度比原版 Linear 更慢。但是无论如何，这样的权衡是值得的，毕竟数据无价。
                </div>`,
            "region-format": {
                default: "MCA",
                desc: `用于保存区块数据的区块文件格式。<br>
                    可用的区块格式：
                    <ul>
                    <li>\`MCA\`：MC 原版的 ANVIL 格式，使用 zlib 压缩。</li>
                    <li>\`LINEAR\`：Linear v1 格式，由 [EarthMe](https://github.com/MrHua269) 重构并修复了保存系统。</li>
                    </ul>`
            },
            "linear-compress-level": {
                default: 1,
                desc: `Linear 区块格式文件的压缩等级。<br>
                    仅当上方的 \`region-format\` 设为 \`LINEAR\` 时生效。<br>
                    <br>
                    <ul>
                    <li>如果设为更高的等级（最高 \`22\`）可以获得更好的压缩率，但会显著增加 CPU 开销。</li>
                    <li>如果设为较低的等级可以加快压缩速度，但会占用更多磁盘空间。等级 \`1\` 使用的是最快、最轻量的压缩方式。</li>
                    </ul>`
            },
            "throw-on-unknown-extension-detected": {
                default: false,
                desc: `当从磁盘加载区块文件时，如果检测到未知或不匹配的区块文件扩展名，是否直接抛出异常并使服务器崩溃。<br>
                    此配置项可以防止由于同一世界中对区块文件格式的错误配置而导致的数据损坏。<br>
                    <br>
                    例如：<br>
                    如果设为 \`true\`，当 \`region-format\` 为 \`MCA\` 时加载 \`.linear\` 文件将立即导致服务器崩溃，反之亦然。`
            },
            "flush-interval-seconds": {
                default: 5,
                desc: `Linear 区块数据保存到磁盘的频率。<br>
                    更频繁的保存可以减少服务器崩溃时的数据丢失风险，但会增加磁盘的 I/O 开销。<br>
                    （单位：秒）`
            }
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
        "hidden-item-components": {
            default: "[]",
            desc: `需隐藏的物品组件类型列表，列表中的组件数据将被隐藏并且不会发送给客户端<br>
                <br>
                可用于隐藏物品上复杂的组件数据，以减少客户端渲染负载、频繁动画以及网络传输开销。物品的实际数据不会受到影响。<br>
                <br>
                需要注意的是，此选项不同于 Paper 的 [物品数据混淆](https://docs.papermc.io/paper/reference/global-configuration/#anticheat_obfuscation_items_enable_item_obfuscation)。该选项仅隐藏玩家自身物品栏中的组件数据，而不是对其他玩家隐藏。<br>
                例如：
                <ul>
                <li>如果设为 \`[]\`，则不会影响任何物品。</li>
                <li>如果设为 \`["minecraft:custom_data"]\`，物品的 \`custom_data\` 组件将在客户端上被隐藏。</li>
                </ul>
                <br>
                可在 [数据组件类型](https://zh.minecraft.wiki/w/%E6%95%B0%E6%8D%AE%E7%BB%84%E4%BB%B6#%E6%95%B0%E6%8D%AE%E7%BB%84%E4%BB%B6%E7%B1%BB%E5%9E%8B) 中查看所有可用的组件类型。<br>
                <br>
                <div class="tip custom-block">
                <p class="custom-block-title custom-block-title-default">注意</p>
                这可能会破坏依赖这些客户端组件数据的资源包、客户端模组或特定玩法机制。请谨慎使用，并确保你正确配置了隐藏的物品组件列表。
                </div>`
        },
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
        cache: {
            "cache-player-profile-result": {
                default: true,
                desc: `是否在玩家加入服务器时缓存其 Profile 数据（例如 UUID、用户名、皮肤 / 披风材质）。<br>
                    这可以减少对 Mojang 认证服务器的网络请求，同时在认证服务器宕机时，玩家仍可以凭借缓存的 Profile 数据重新加入服务器。`
            },
            "cache-player-profile-result-timeout": {
                default: 1440,
                desc: `玩家 Profile 数据缓存的有效时间。<br>
                    （单位：分钟，默认值 1440 分钟 = 24 小时）<br>
                    超过该时间后，玩家下次加入服务器时将重新向 Mojang 认证服务器请求 Profile 数据。`
            }
        }
    }
};

export default config;
