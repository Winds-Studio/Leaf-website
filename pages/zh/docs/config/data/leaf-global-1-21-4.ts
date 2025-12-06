import type { ConfigRoot } from "@/.vitepress/theme/components/config/types";

const config: ConfigRoot = {
    "config-version": {
        default: "3.0"
    },

    async: {
        __desc__: "本节包含异步相关的特性, 旨在通过异步执行任务来减少主线程 (Server Thread) 的负载.",
        "parallel-world-tracking": {
            enabled: {
                default: false,
                desc: ""
            },
            threads: {
                default: 8,
                desc: ""
            },
            "log-container-creation-stacktraces": {
                default: false,
                desc: ""
            },
            "disable-hard-throw": {
                default: false,
                desc: ""
            },
            "run-async-tasks-sync": {
                default: false,
                desc: ""
            }
        },
        "async-entity-tracker": {
            enabled: {
                default: false,
                desc: "是否使用异步实体追踪, 可以显著提高性能, 特别是在小范围内拥有大量密集实体的场景中.<br>" +
                    "<br>" +
                    "__⚡推荐值: `true` (将下方的 `enabled` 设为 true)__" +
                    '<div class="tip custom-block">' +
                    '<p class="custom-block-title custom-block-title-default">注意</p>' +
                    '如果你安装了类似 Citizens, 使用真实实体或玩家类型的实体作为 "NPC" 的插件, 请参阅下文的 `compat-mode` 以获取更多信息.' +
                    "</div>"
            },
            "compat-mode": {
                default: false,
                desc: '是否开启兼容模式, 以兼容类似 Citizens 或其他使用真实实体或玩家类型的实体作为 "NPC" 的插件.<br>' +
                    "如果设为 `true`, 可以修复玩家类型的 NPC 有时消失的可见性问题.<br>" +
                    "<br>" +
                    "**仅当** 安装了 Citizens 或其他任意类似的基于真实实体的 NPC 插件时, 才需开启 `compat-mode` 来使用异步实体追踪功能.<br>" +
                    "<br>" +
                    "我们仍然推荐使用基于发包 / 虚拟实体的 NPC 插件以获得更好的性能, 例如: [ZNPC Plus](https://github.com/Pyrbu/ZNPCsPlus), [Adyeshach](https://github.com/TabooLib/Adyeshach), [Fancy NPC](https://modrinth.com/plugin/fancynpcs), 等, 使用这类插件后可以禁用 `compat-mode`."
            },
            "max-threads": {
                default: 0,
                desc: "异步实体追踪可使用的最大线程数.<br>" +
                    "如果设为 `0`, 默认使用 CPU 核心数 1/4 的线程数, 且不少于 1.<br>" +
                    "<br>" +
                    "__⚡推荐值: CPU 核心数的 1/2__"
            },
            keepalive: {
                default: 60,
                desc: "空闲线程的超时时间, 超过该时间并且无任务的线程将被销毁.<br>" + "(以 秒 为单位)"
            },
            "queue-size": {
                default: 0,
                desc: ""
            }
        },
        "async-target-finding": {
            enabled: {
                default: false,
                desc: ""
            }
        },
        "async-playerdata-save": {
            enabled: {
                default: false,
                desc: "是否开启异步玩家数据保存 (I/O 操作都很耗时)." +
                    '<div class="warning custom-block">' +
                    '<p class="custom-block-title custom-block-title-default">警告</p>' +
                    "实验性功能, 在某些情况下可能导致玩家数据丢失!" +
                    "</div>"
            }
        },
        "async-pathfinding": {
            enabled: {
                default: false,
                desc: "是否使用异步生物寻路.<br>" + "<br>" + "__⚡推荐值: `true` (将下方的 `enabled` 设为 true)__"
            },
            "max-threads": {
                default: 0,
                desc: "异步生物寻路可使用的最大线程数.<br>" +
                    "如果设为 `0`, 默认使用 CPU 核心数 1/4 的线程数, 且不少于 1.<br>" +
                    "<br>" +
                    "__⚡推荐值: CPU 核心数的 1/3__"
            },
            keepalive: {
                default: 60,
                desc: "空闲线程的超时时间, 超过该时间并且无任务的线程将被销毁.<br>" + "(以 秒 为单位)"
            },
            "queue-size": {
                default: 0,
                desc: ""
            },
            "reject-policy": {
                default: "CALLER_RUNS",
                desc: ""
            }
        },
        "async-mob-spawning": {
            enabled: {
                default: true,
                desc: "是否使用异步生物生成.<br>" +
                    "对于拥有大量实体的服务器, 开启此功能可以带来近 15% 的性能提升. 并且你必须将 Paper 的 `per-player-mob-spawns` 设为 `true`, 此功能才能生效.<br>" +
                    "需要注意的是: 此功能并不会将生物生成的所有逻辑完全异步 (这样做非常不安全). 它只是将生物生成的一些耗时计算分担到其他线程上.<br>" +
                    "<br>" +
                    "__⚡推荐值: `true`__"
            }
        },
        "async-locator": {
            enabled: {
                default: false,
                desc: "是否使用异步定位.<br>" +
                    "此功能将结构定位任务的负载分担到其他线程.<br>" +
                    "目前仅可用于:" +
                    "<ul>" +
                    "<li>`/locate` 命令</li>" +
                    "<li>海豚寻找附近的沉船, 海底废墟或埋葬的宝藏</li>" +
                    "<li>末影之眼定位要塞</li>" +
                    "</ul>" +
                    "<br>" +
                    "__⚡推荐值: `true` (将下方的 `enabled` 设为 true)__"
            },
            threads: {
                default: 0,
                desc: "异步定位可使用的最大线程数.<br>" +
                    "如果设为 &leq; `0`, 默认使用 1 个线程.<br>" +
                    "<br>" +
                    "__⚡推荐值: `1` 或 `2`__"
            },
            keepalive: {
                default: 60,
                desc: "空闲线程的超时时间, 超过该时间并且无任务的线程将被销毁.<br>" + "(以 秒 为单位)"
            }
        },
        "async-chunk-send": {
            enabled: {
                default: false,
                desc: ""
            }
        }
    },

    performance: {
        __desc__: "本节包含性能调优, 旨在减少不必要的计算或使用更高效的方法优化服务器.",
        "use-virtual-thread-for-user-authenticator": {
            default: true,
            desc:
                "是否为用户验证服务使用 JDK 21 引入的 [虚拟线程 (Virtual Thread)](https://javaguide.cn/java/concurrent/virtual-thread.html), 该服务负责验证正版玩家的加入.<br>" +
                "<br>" +
                "__⚡推荐值: `true`__"
        },
        "use-virtual-thread-for-profile-executor": {
            default: true,
            desc:
                "是否为玩家档案执行器 (Profile Executor) 使用 JDK 21 引入的 [虚拟线程 (Virtual Thread)](https://javaguide.cn/java/concurrent/virtual-thread.html), 该执行器用于处理玩家档案和头颅皮肤的获取.<br>" +
                "<br>" +
                "__⚡推荐值: `true`__"
        },
        "use-virtual-thread-for-async-chat-executor": {
            default: true,
            desc: "是否为异步聊天使用 JDK 21 引入的 [虚拟线程 (Virtual Thread)](https://javaguide.cn/java/concurrent/virtual-thread.html).<br>" +
                "<br>" +
                "__⚡推荐值: `true`__"
        },
        "use-virtual-thread-for-async-scheduler": {
            default: true,
            desc: "是否为异步任务调度器使用 JDK 21 引入的 [虚拟线程 (Virtual Thread)](https://javaguide.cn/java/concurrent/virtual-thread.html), 这可以提高大量使用异步调度器的插件的性能.<br>" +
                "<br>" +
                "__⚡推荐值: `true`__"
        },
        "create-snapshot-on-retrieving-blockstate": {
            default: true,
            desc: "是否默认在插件获取 TileEntity / BlockState 时创建并使用其快照.<br>" +
                "<br>" +
                "一些插件可能会调用 `getInventory().getHolder()` 来获取物品栏的所有者, 这涉及访问 BlockState. 其中涉及创建 BlockState 的副本和序列化物品 NBT 数据相当耗时.<br>" +
                "例如, 在拥有大量密集漏斗的场景中, 如果插件在监听某些事件 (例如与漏斗相关的事件) 时调用此类方法, 频繁地调用将会显著影响性能.<br>" +
                "参阅 Paper 的 [API-to-get-a-BlockState-without-a-snapshot.patch#L6](https://github.com/PaperMC/Paper-archive/blob/b48403bd69f534ffd43fe2afb4e8e1f1ffa95fe1/patches/server/0160-API-to-get-a-BlockState-without-a-snapshot.patch#L6) 补丁以获取更多信息." +
                "<ul>" +
                "<li>如果设为 `true`, 每次插件调用相关方法时, 都会创建 BlockState 的快照 (副本).</li>" +
                "<li>如果设为 `false`, 每次插件调用相关方法时将, 直接获取目标 BlockState 本身, 除非插件明确要求使用快照. 性能会有所提升，但存在由于插件设计不当而导致方块状态被意外修改的风险</li>" +
                "</ul>" +
                "<br>" +
                "__⚡推荐值: (推荐仅在遇到上述卡顿时设为 `false`)__"
        },
        "inactive-goal-selector-throttle": {
            default: true,
            desc: "限制 [意向选择器](https://zh.minecraft.wiki/w/%E7%94%9F%E7%89%A9AI#:~:text=%E6%84%8F%E5%90%91%E9%80%89%E6%8B%A9%E5%99%A8) 在非活跃实体 (通常是远离玩家的实体) 上的运行频率.<br>" +
                "不再每刻 (tick) 都执行意向选择器逻辑, 而是改为每秒一次. 这样可以略微提升性能，但可能会对游戏玩法产生轻微影响<br>" +
                "<br>" +
                "__⚡推荐值: `true`__" +
                "<table>" +
                "<tr><td><b>基于目标的推荐值</b></td><td></td></tr>" +
                "<tr><td><i>优化</i></td><td><code>true</code></td></tr>" +
                "<tr><td><i>原版行为</i></td><td><code>false</code></td></tr>" +
                "</table>"
        },
        "throttle-hopper-when-full": {
            enabled: {
                default: false,
                desc: "是否当目标容器已满时限制漏斗尝试转移物品的频率.<br>" +
                    "此选项可防止漏斗即使在失败的情况下, 也在每个 tick 都不断尝试转移物品.<br>" +
                    "<br>" +
                    "__⚡推荐值: `true` (将下方的 `enabled` 设为 true)__" +
                    "<table>" +
                    "<tr><td><b>基于目标的推荐值</b></td><td></td></tr>" +
                    "<tr><td><i>优化</i></td><td><code>true</code></td></tr>" +
                    "<tr><td><i>原版行为</i></td><td><code>false</code></td></tr>" +
                    "</table>"
            },
            "skip-ticks": {
                default: 8,
                desc: "当目标容器已满时, 等待多长时间将再次尝试移动物品的操作.<br>" +
                    "(以 tick 为单位)<br>" +
                    "仅当上方所述的 `throttle-hopper-when-full.enabled` 设为 `true` 时, 此选项才会生效.<br>" +
                    "如果设为 &leq; `0`, 将禁用此冷却功能.<br>" +
                    "<br>" +
                    "__⚡推荐值: `8`__" +
                    "<table>" +
                    "<tr><td><b>基于目标的推荐值</b></td><td></td></tr>" +
                    "<tr><td><i>优化</i></td><td><code>8</code></td></tr>" +
                    "<tr><td><i>原版行为</i></td><td><code>8</code></td></tr>" +
                    "</table>"
            }
        },
        "skip-map-item-data-updates-if-map-does-not-have-craftmaprenderer": {
            default: true,
            desc: "如果地图没有渲染器 (`CraftMapRenderer`), 是否跳过地图内容的更新.<br>" +
                "当使用 ImageMap 之类的, 能创建大量自定义图片地图的插件时, 这可以提高性能.<br>" +
                "<br>" +
                "__⚡推荐值: `true`__" +
                "<table>" +
                "<tr><td><b>基于目标的推荐值</b></td><td></td></tr>" +
                "<tr><td><i>优化</i></td><td><code>true</code></td></tr>" +
                "<tr><td><i>原版行为</i></td><td><code>false</code></td></tr>" +
                "</table>" +
                '<div class="tip custom-block">' +
                '<p class="custom-block-title custom-block-title-default">注意</p>' +
                "开启此配置项可能会导致原版地图的内容停止更新." +
                "</div>"
        },
        "skip-ai-for-non-aware-mob": {
            default: true,
            desc: "当生物同时处在 *不活跃* 且 *无感知* 的状态时, 是否跳过其 AI tick 计算.<br>" +
                "被设为无感知的生物在重新变为活跃之前将不会自主活动, 也不会在与其交互时作出反应, 更多信息请参阅: [Mob.html#setAware(boolean)](https://jd.papermc.io/paper/1.21.4/org/bukkit/entity/Mob.html#setAware(boolean)).<br>" +
                "<br>" +
                "__⚡推荐值: `true`__" +
                "<table>" +
                "<tr><td><b>基于目标的推荐值</b></td><td></td></tr>" +
                "<tr><td><i>优化</i></td><td><code>true</code></td></tr>" +
                "<tr><td><i>原版行为</i></td><td><code>false</code></td></tr>" +
                "</table>"
        },
        "reduce-packets": {
            __desc__: "本节用于无用数据包减少相关特性.",
            "reduce-entity-move-packets": {
                default: false,
                desc:
                    "是否减少发送给玩家的无用实体移动数据包 (例如微小的移动).<br>" +
                    "此配置项可以略微节省带宽并减少客户端的处理负担, 在实体数量较多或出现轻微卡顿时, 有希望使使移动看起来更流畅.<br>" +
                    "<br>" +
                    "__⚡推荐值: `true`__"
            }
        },
        "reduce-chunk-source-updates": {
            enabled: {
                default: false,
                desc: "是否减少玩家跨区块移动时的区块源更新.<br>" + "<br>" + "__⚡推荐值: `true`__"
            }
        },
        "optimized-powered-rails": {
            default: true,
            desc: "是否优化动力铁轨的逻辑. 将使用完全重写的动力铁轨迭代逻辑, 同时保持原版行为, 可提升近 4 倍 的性能.<br>" +
                "<br>" +
                "__⚡推荐值: `true`__"
        },
        "optimize-player-movement": {
            default: true,
            desc:
                "是否优化玩家移动处理, 跳过不必要的方块边缘检查并避免冗余的视距更新.<br>" +
                "<br>" +
                "__⚡推荐值: `true`__"
        },
        "faster-structure-gen-future-sequencing": {
            default: true,
            desc: "是否为世界结构生成使用更快的任务排序." +
                '<div class="tip custom-block">' +
                '<p class="custom-block-title custom-block-title-default">注意</p>' +
                "此配置项可能导致结构生成任务的合并顺序不一致." +
                "</div>"
        },
        "faster-random-generator": {
            enabled: {
                default: false,
                desc: "是否使用更快的随机数生成器.<br>" +
                    "随机数生成在 Minecraft 中几乎无处不在, 此功能可以显著提升性能.<br>" +
                    "<br>" +
                    "__⚡推荐值: `true` (将下方的 `enabled` 设为 true)__" +
                    '<div class="tip custom-block">' +
                    '<p class="custom-block-title custom-block-title-default">注意</p>' +
                    "需要使用支持 `RandomGenerator` 的 JVM 来运行服务器. 一些 JRE 可能不支持此功能." +
                    "</div>"
            },
            "random-generator": {
                default: "Xoroshiro128PlusPlus",
                desc: "需要使用哪种随机数生成器?<br>" +
                    "可参阅 [Java 随机数生成器](https://www.baeldung.com/java-17-random-number-generators#1-api-design-1), 了解所有可用的随机数生成器.<br>" +
                    "<br>" +
                    "__⚡推荐值: `Xoroshiro128PlusPlus`__"
            },
            "enable-for-worldgen": {
                default: false,
                desc: "是否为世界生成使用更快的随机数生成器.<br>" +
                    "<ul>" +
                    "<li>如果设为 `true`, 与世界生成相关的 `Random` 调用将使用上述 `random-generator` 指定的随机数生成器, 世界生成将会与原版略有不同.</li>" +
                    "<li>如果设为 `false`, 与世界生成相关的 `Random` 调用将使用原版随机数生成器.</li>" +
                    "</ul>" +
                    "<br>" +
                    "__⚡推荐值: `true`__" +
                    "<table>" +
                    "<tr><td><b>基于目标的推荐值</b></td><td></td></tr>" +
                    "<tr><td><i>优化</i></td><td><code>true</code></td></tr>" +
                    "<tr><td><i>原版行为</i></td><td><code>false</code></td></tr>" +
                    "</table>"
            },
            "warn-for-slime-chunk": {
                default: true,
                desc: "在使用快速随机数生成器生成史莱姆区块时, 是否在服务器启动时输出警告消息到控制台."
            },
            "use-legacy-random-for-slime-chunk": {
                default: false,
                desc: "是否使用原版随机数生成器来生成史莱姆区块, 以保持原版行为.<br>" +
                    "如果服务器中已存在史莱姆农场或相关依赖史莱姆区块的红石机器, 请开启此配置项; 否则, 史莱姆区块的坐标将会偏移.<br>" +
                    "<br>" +
                    "__⚡推荐值:__ (取决于你服务器的类型, 参阅下方的 `基于目标的推荐值` 了解更多.)" +
                    "<table>" +
                    "<tr><td><b>基于目标的推荐值</b></td><td></td></tr>" +
                    "<tr><td><i>优化</i></td><td><code>false</code></td></tr>" +
                    "<tr><td><i>原版行为</i></td><td><code>true</code></td></tr>" +
                    "</table>"
            },
            "use-direct-implementation": {
                default: false,
                desc: ""
            }
        },
        "enable-cached-minecraft-to-bukkit-entitytype-convert": {
            default: true,
            desc: "是否缓存 *Minecraft EntityType* 到 *Bukkit EntityType* 的类型转换结果, 这可以获得微小的性能提升.<br>" +
                "<br>" +
                "__⚡推荐值: `true`__"
        },
        dab: {
            enabled: {
                default: true,
                desc: "根据距离优化生物 AI (又称 DAB), 在生物远离玩家时减少大脑 AI tick 计算的频率.<br>" +
                    "<br>" +
                    "__⚡推荐值: `true` (将下方的 `enabled` 设为 true)__" +
                    "<table>" +
                    "<tr><td><b>基于目标的推荐值</b></td><td></td></tr>" +
                    "<tr><td><i>优化</i></td><td><code>true</code></td></tr>" +
                    "<tr><td><i>原版行为</i></td><td><code>false</code> (或参阅下方的 <code>dab.blacklisted-entities</code> 获取更多信息)</td></tr>" +
                    "</table>"
            },
            "dont-enable-if-in-water": {
                default: false,
                desc: "非水生生物在水中时, 是否不受 DAB 的影响.<br>" +
                    "如果设为 `true`, 可以修复实体远离玩家时在水中溺死的问题. 修复了 [Pufferfish 的 issue#58](https://github.com/pufferfish-gg/Pufferfish/issues/58).<br>" +
                    "<br>" +
                    "__⚡推荐值: `true`__"
            },
            "start-distance": {
                default: 12,
                desc: "距离玩家多少格 DAB 开始生效.<br>" + "<br>" + "__⚡推荐值: `8`__"
            },
            "max-tick-freq": {
                default: 20,
                desc: "最远处的实体每隔多长时间进行一次寻路和 AI 相关行为的 tick 计算.<br>" +
                    "(以 tick 为单位, 默认的 20 tick = 1 秒)<br>"
            },
            "activation-dist-mod": {
                default: 8,
                desc: "该配置项定义了距离对实体 tick 计算频率的影响程度 `tick 频率 = (生物到玩家距离 ^2) / (2^ 此 activation-dist-mod 值)`." +
                    "<ul>" +
                    "<li>如果希望距离较远的实体 __少__ tick 计算 一些, 设为 `7`.</li>" +
                    "<li>如果希望距离较远的实体 __多__ tick 计算 一些, 设为 `9`.</li>" +
                    "</ul>" +
                    "<br>" +
                    "__⚡推荐值: `7`__"
            },
            "blacklisted-entities": {
                default: "[]",
                desc: "DAB 黑名单, 名单内的生物将不受 DAB 的影响.<br>" +
                    "<br>" +
                    "例如, 一些生存服拥有很多怪物农场或者刷怪塔. 而某些寻路式刷怪塔需要怪物拥有目标来吸引仇恨, 这类刷怪塔可能会因 DAB 而无法正常工作. 通过将对应生物添加到此黑名单, 来解决刷怪塔无法工作的问题.<br>" +
                    "如果遇到这类刷怪塔的生物像被冻结了一样停在原地, 不移动. 并且你不确定是否由 DAB 造成的, 可以尝试将对应生物添加到此黑名单, 然后重启服务器并检查此问题是否修复.<br>" +
                    "<br>" +
                    "黑名单格式: `[VILLAGER]` 或者 `[VILLAGER, ZOMBIFIED_PIGLIN]`, 填入你想添加的实体类型 (你可以在 [Paper 的 Javadoc](https://jd.papermc.io/paper/1.21.1/org/bukkit/entity/EntityType.html) 里找到所有的实体类型)." +
                    // This is completely broken.
                    '<details class="tip custom-block">' +
                    '<summary class="custom-block-title custom-block-title-default">再深入一些?</summary>' +
                    "事实上,  `dab.blacklisted-entities` 接受所有 YAML 允许的列表 (list) 格式.<br>" +
                    "<br>" +
                    "如果你只添加一种实体类型到 DAB 黑名单, 可以使用以下任一格式:" +
                    "```yaml" +
                    "dab:" +
                    "  blacklisted-entities: [VILLAGER]" +
                    "```" +
                    "或者" +
                    "```yaml" +
                    "dab:" +
                    "  blacklisted-entities:" +
                    "    - VILLAGER" +
                    "```" +
                    "如果你需要添加多个实体类型到 DAB 黑名单, 可以使用以下任一格式:" +
                    "```yaml" +
                    "dab:" +
                    "  blacklisted-entities: [VILLAGER, ZOMBIFIED_PIGLIN]" +
                    "```" +
                    "或者" +
                    "```yaml" +
                    "dab:" +
                    "  blacklisted-entities:" +
                    "    - VILLAGER" +
                    "    - ZOMBIFIED_PIGLIN" +
                    "```" +
                    "</details>" +
                    "<p>如果你仍然不确定你所写的格式是否正确, 可以使用 [YAML Checker](https://yamlchecker.org/), 或者任何在线 YAML 格式效验工具来验证你的配置是否正确.</p>"
            }
        },
        "dont-save-entity": {
            "dont-save-primed-tnt": {
                default: false,
                desc: "区块卸载时不保存激活的TNT.<br>" +
                    "当玩家意外掉线或者玩家远离导致区块被卸载时, 此功能可防止机器被 TNT 炸毁. 适用于拥有较多 TNT 相关机器的生存服.<br>" +
                    "<br>" +
                    "__⚡推荐值: `true`__"
            },
            "dont-save-falling-block": {
                default: false,
                desc: "区块卸载时不保存掉落中的方块 (FallingBlock).<br>" + "<br>" + "__⚡推荐值: `true`__"
            },
            "entity-running-behavior-cache-update-interval": {
                default: 5,
                desc: ""
            }
        }
    },

    fixes: {
        __desc__: "本节包含对特定问题的修复.",
        "dont-place-player-if-server-full": {
            default: false,
            desc: "是否禁止玩家进入已满服务器.<br>" +
                "修复了 [Paper 的 issue#10668](https://github.com/PaperMC/Paper/issues/10668).<br>" +
                "如果设为 `true`, 应给予玩家 `purpur.joinfullserver` 权限以允许玩家进入满人的服务器, 而不是使用 `PlayerLoginEvent#allow` 方法."
        }
    },

    "gameplay-mechanisms": {
        __desc__: "本节包含修改游戏机制的功能.",
        "use-spigot-item-merging-mechanism": {
            default: true,
            desc: "是否使用 Spigot 默认的掉落物合并机制."
        },
        "spawner-settings": {
            enabled: {
                default: false,
                desc: ""
            },
            checks: {
                "light-level-check": {
                    default: false,
                    desc: ""
                },
                "spawner-max-nearby-check": {
                    default: true,
                    desc: ""
                },
                "check-for-nearby-players": {
                    default: true,
                    desc: ""
                },
                "spawner-block-checks": {
                    default: false,
                    desc: ""
                },
                "water-prevent-spawn-check": {
                    default: false,
                    desc: ""
                }
            },
            "min-spawn-delay": {
                default: 200,
                desc: ""
            },
            "max-spawn-delay": {
                default: 800,
                desc: ""
            }
        },
        "smooth-teleport": {
            default: false,
            desc: '是否在玩家切换维度时尝试使用 "平滑传送".<br>' +
                "此功能需要源世界和目标世界具有相同的逻辑高度才能生效." +
                '<div class="warning custom-block">' +
                '<p class="custom-block-title custom-block-title-default">警告</p>' +
                "实验性功能, 请及时反馈你遇到的问题!" +
                "</div>"
        },
        "only-player-pushable": {
            default: false,
            desc: ""
        },
        knockback: {
            __desc__: "本节包含调整击退相关行为的功能.",
            "snowball-knockback-players": {
                default: false,
                desc: "是否允许雪球击退玩家."
            },
            "egg-knockback-players": {
                default: false,
                desc: "是否允许鸡蛋击退玩家."
            },
            "can-player-knockback-zombie": {
                default: true,
                desc: "是否允许玩家击退僵尸."
            }
        },
        "hide-item-component": {
            "hidden-types": {
                default: "[]",
                desc: ""
            },
            enabled: {
                default: false,
                desc: ""
            }
        },
        "allow-tripwire-dupe": {
            default: false,
            desc: ""
        },
        player: {
            "max-use-item-distance": {
                default: 1.0000001,
                desc: "玩家允许用物品进行交互的最远距离.<br>" +
                    "<br>" +
                    "一些 [无政府服](https://minecraftservers.org/type/anarchy) 或类似服务器可能允许玩家使用黑客端作弊. 如果你希望这些玩家能够使用 基于发包的, 与水晶相关的 功能 (例如 CEV Breaker、BedAura等), 可能需要调整该配置项.<br>" +
                    "建议设为 `10.0000001`, 以允许玩家使用相关的黑客端功能." +
                    "<br>" +
                    "如果设为 `-1`, 将禁用此最远交互距离检查.<br>" +
                    "<br>" +
                    "__⚡推荐值: `10.0000001` (适用于无政府服)__" +
                    '<div class="tip custom-block">' +
                    '<p class="custom-block-title custom-block-title-default">注意</p>' +
                    "如果设为 `-1`, 玩家将可以使用黑客端的一些发包功能, 也能够使用 [Nocom 漏洞](https://github.com/nerdsinspace/nocom-explanation)!" +
                    "</div>"
            }
        },
        "afk-command": {
            enabled: {
                default: false,
                desc: "是否开启基于 Minecraft 原版 [玩家空闲机制](https://zh.minecraft.wiki/w/%E6%9C%8D%E5%8A%A1%E7%AB%AF%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E6%A0%BC%E5%BC%8F#:~:text=%E7%8E%A9%E5%AE%B6%E7%9A%84%E7%A9%BA%E9%97%B2%E6%97%B6%E9%97%B4) 的 AFK 命令.<br>" +
                    "玩家可以使用 /afk 命令切换他们的 AFK 状态, 并且状态将会在 Tab 列表中展示.<br> " +
                    "剩余的 AFK 配置项在 Purpur 配置中, 包括可配置的 AFK 提示消息, Title 消息."
            }
        }
    },

    network: {
        __desc__: "本节包含与网络相关的功能.",
        "protocol-support": {
            __desc__:
                "熙熙攘攘, 我们的协议.<br>" +
                "本部分包含为一些提升游戏体验 (QoL) 的实用模组提供额外的协议支持.<br>" +
                "<br>" +
                "这些额外的协议支持仅在客户端安装了相应模组时才会生效. 这意味着, 如果开启了特定的协议支持, 并且玩家在客户端安装了该模组, 他们可以获得下方配置中描述的额外功能. 但对于没有安装相应模组的玩家, 一切都和之前一样." +
                '<div class="tip custom-block">' +
                '<p class="custom-block-title custom-block-title-default">注意</p>' +
                "开启协议支持后, 可能导致和 [ViaVersion](https://modrinth.com/plugin/viaversion) 不兼容.<br>" +
                "并且我们建议玩家使用与服务器核心相同版本的客户端, 并安装对应模组的最新版本, 否则将会无法进入服务器." +
                "</div>",
            "jade-protocol": {
                default: false,
                desc: "是否开启对 [Jade](https://modrinth.com/mod/jade) 的协议支持.<br>" +
                    "如果设为 `true`, 安装了 Jade 模组的玩家可以在客户端显示储存容器中的物品信息, 熔炉燃烧进度, 酿造台进度, 篝火上的食物, 蜂巢中的蜜蜂数据等更多贴合原版的功能."
            },
            "appleskin-protocol": {
                default: false,
                desc: "是否开启对 [AppleSkin](https://modrinth.com/mod/appleskin) 的协议支持.<br>" +
                    "如果设为 `true`, 安装了 AppleSkin 模组的玩家可以在客户端显示准确的饱和度 / 疲劳值."
            },
            "appleskin-protocol-sync-tick-interval": {
                default: 20,
                desc: ""
            },
            "asteorbar-protocol": {
                default: false,
                desc: "是否开启对 [AsteorBar](https://modrinth.com/mod/asteorbar) 的协议支持.<br>" +
                    "如果设为 `true`, 安装了 AsteorBar 模组的玩家可以在客户端显示准确的饱和度 / 疲劳值."
            },
            "chatimage-protocol": {
                default: false,
                desc: "是否开启对 [ChatImage](https://modrinth.com/mod/chatimage) 的协议支持.<br>" +
                    "如果设为 `true`, 安装了 ChatImage 模组的玩家可以看到使用 CICode 格式发送的图片."
            },
            "xaero-map-protocol": {
                default: false,
                desc: "是否开启对 [XaeroMap](https://modrinth.com/mod/xaeros-minimap) 的协议支持.<br>" +
                    "如果设为 `true`, 安装了 Xaero's MiniMap 或 Xaero's WorldMap 模组的客户端将根据下方的 `protocol-support.xaero-map-server-id` 存储和服务器挂钩的玩家坐标点和死亡点, 防止服务器名称或 IP 更改时数据被删除或刷新."
            },
            "xaero-map-server-id": {
                default: 513317,
                desc: "XaeroMap 用于标识服务器的唯一数字 ID. 首次启动服务器时自动随机生成."
            },
            "syncmatica-protocol": {
                default: false,
                desc: "是否开启对 [Syncmatica](https://modrinth.com/mod/syncmatica) 的协议支持.<br>" +
                    "如果设为 `true`, 安装了 Syncmatica 模组的玩家可以上传其 [投影](https://modrinth.com/mod/litematica) 文件或从服务器下载共享的投影. 所有安装了 Syncmatica 模组的玩家都可以查看并使用其他玩家共享的投影."
            },
            "syncmatica-quota": {
                default: false,
                desc: "是否限制每个共享投影的文件大小."
            },
            "syncmatica-quota-limit": {
                default: 40000000,
                desc: "上传至服务器的共享投影的最大文件大小.<br>" + "(以 字节 为单位, 默认的 40,000,000 字节 ≈ 38 MB)"
            }
        },
        OptimizeNonFlushPacketSending: {
            default: false,
            desc: ""
        },
        "chat-message-signature": {
            default: true,
            desc: "是否开启 MC 1.19.1 引入的聊天消息签名.<br>" +
                "如果设为 `false`, 将无法举报玩家的聊天消息, 并且玩家进服时不会显示不安全警告弹窗.<br>" +
                "<br>" +
                "__⚡推荐值: `false`__"
        }
    },

    misc: {
        __desc__: "本节包含一些杂项功能.",
        message: {
            "unknown-command": {
                default: "default",
                desc: "未知命令提示, 在执行未知的命令时将向其发送.<br>" +
                    "需要使用 [MiniMessage](https://docs.advntr.dev/minimessage/format) 格式.<br>" +
                    "如果设为 `default` 或保留默认值, 将使用原版默认的未知命令提示.<br>" +
                    "<br>" +
                    "可用占位符:" +
                    "<ul>" +
                    "<li>__`<detail>`__ - 未知命令的详细信息.</li>" +
                    "</ul>" +
                    '<div class="tip custom-block">' +
                    '<p class="custom-block-title custom-block-title-default">API / 插件 友好</p>' +
                    "此功能对 API / 插件 友好.<br>" +
                    "这意味着插件可以使用 `UnknownCommandEvent#message` 或 `UnknownCommandEvent#setMessage` 方法覆盖此配置项." +
                    "</div>"
            }
        },
        rebrand: {
            "server-mod-name": {
                default: "Leaf",
                desc: "服务端核心名字. 在 F3 菜单和服务器 MOTD 中显示."
            },
            "server-gui-name": {
                default: "Leaf Console",
                desc: "服务端 GUI 控制台名字. 如果启动服务器时未添加 `--nogui` 选项, 将在核心自带的 GUI 控制台中显示."
            }
        },
        sentry: {
            __desc__:
                "[Sentry](https://sentry.io/welcome/) 是一个应用程序监控服务, 皆在更好地收集, 记录, 跟踪错误日志和相关信息, 协助运维人员更好的定位并修复问题.<br>" +
                "<br>" +
                "开启 Sentry 集成后, 你无需再手动审计冗长的日志以寻找错误. Sentry 可以收集服务器运行时发生的错误, 允许你通过 Sentry 的 Web 面板跟踪, 帮助你更轻松, 快速地定位问题并修复错误.<br>" +
                "<br>" +
                "参阅 __[配置 Sentry](../../how-to/setup-sentry.md)__ 以了解如何配置 Sentry 并获取下方 `sentry.dsn` 所需的 DSN 密匙.<br>",
            dsn: {
                default: "",
                desc: "Sentry 的 DSN 密匙.<br>" + "如果设为空 `''`, 则禁用 Sentry."
            },
            "log-level": {
                default: "WARN",
                desc: "等于或高于此等级的日志将被记录."
            },
            "only-log-thrown": {
                default: true,
                desc: "是否仅记录带有 Throwable 的日志. "
            }
        },
        "secure-seed": {
            enabled: {
                default: false,
                desc: "是否使用安全种子功能.<br>" +
                    "所有矿石和结构将使用 1024 位的种子生成, 而不是原版中的 64 位种子, 从而使破解种子变得不可能.<br>" +
                    "如果在已经存在的世界中使用安全种子, 则只会应用在新生成的区块.<br>" +
                    "<br>" +
                    "__⚡推荐值: `true` (将下方的 `enabled` 设为 true)__" +
                    "<table>" +
                    "<tr><td><b>基于目标的推荐值</b></td><td></td></tr>" +
                    "<tr><td><i>优化</i></td><td>-</td></tr>" +
                    "<tr><td><i>原版行为</i></td><td><code>false</code></td></tr>" +
                    "</table>"
            }
        },
        "remove-vanilla-username-check": {
            default: true,
            desc: "是否移除原版的用户名检查, 让 __所有字符__ 都可作为用户名, 包括中文等 (仅适用于离线服务器).<br>" +
                "如果设为 `true`, 允许非英文名玩家进服."
        },
        "remove-spigot-check-bungee-config": {
            default: true,
            desc: "在 `spigot.yml` 中没有开启 bungeecord 模式的情况下, 是否允许玩家通过代理端进入后端服务器."
        },
        "remove-change-non-editable-sign-warning": {
            default: false,
            desc: "当玩家尝试编辑其无法编辑的告示牌时, 是否在控制台打印警告信息.<br>" +
                "如果设为 `true`, 可以防止某些情况下玩家使用某些方法在控制台刷屏.<br>" +
                "<br>" +
                "__⚡推荐值: `true`__"
        },
        "region-format-settings": {
            __desc__:
                "Linear 是一种区块文件格式, 使用 [ZSTD 压缩](https://facebook.github.io/zstd/) 代替 MC 原版的 ZLIB 压缩算法. 此格式可以节省约 ~50% 的磁盘空间.<br>" +
                "在使用 Linear 区块格式前，请确保你已 __阅读 [Linear 文档](https://github.com/xymb-endcrystalme/LinearRegionFileFormatTools)__ 并完成所有必需步骤, 然后将下方的 `region-format-settings.region-format` 改为 `LINEAR`." +
                '<div class="warning custom-block">' +
                '<p class="custom-block-title custom-block-title-default">警告</p>' +
                "实验性功能, 存在丢失区块数据的潜在风险. 在切换到 Linear 格式之前请备份你的服务端.<br>" +
                "并且我们不推荐使用 Linear 区块格式, 用原版的 ANVIL 格式 (.mca) 就足够了. Leaf 用了重构版的 Linear 保存系统, 可以更安全的保存区块大大减小丢数据的可能性, 虽然比原版的 Linear 更慢. 但是无论如何, 这个重构的改动是值得的, 毕竟数据无价." +
                "</div>",
            "region-format": {
                default: "MCA",
                desc: '可用区块格式: `"MCA"`, `"LINEAR"`.'
            },
            "linear-compress-level": {
                default: 1,
                desc: "Linear 区块格式文件的压缩等级."
            },
            "throw-on-unknown-extension-detected": {
                default: false,
                desc: "当检测到未知的区块文件格式时, 是否在控制台抛出异常并崩溃服务器."
            },
            "flush-interval-seconds": {
                default: 5,
                desc: "Linear 区块格式数据保存到磁盘的频率.<br>" + "(以 秒 为单位)"
            }
        },
        "lag-compensation": {
            enabled: {
                default: false,
                desc: "卡顿滞后补偿, 这可以在服务器卡顿或低 TPS 时确保玩家的基本游戏体验.<br>" +
                    "<br>" +
                    "__⚡推荐值: `true` (将下方的 `enabled` 设为 true)__"
            },
            "enable-for-water": {
                default: false,
                desc: "是否开启水流动的滞后补偿.<br>" + "<br>" + "__⚡推荐值: `true`__"
            },
            "enable-for-lava": {
                default: false,
                desc: "是否开启岩浆流动的滞后补偿.<br>" + "<br>" + "__⚡推荐值: `true`__"
            }
        },
        "including-5s-in-get-tps": {
            default: true,
            desc: "是否在 `Bukkit#getTPS` 和 `Server#getTPS` API 方法的结果中包含5秒 TPS 数据.<br>" +
                "<ul>" +
                "<li>如果设为 `true`, 可以通过 `getTPS` 方法获取包含4个元素的 TPS 数组 (`5s, 1m, 5m, 15m`).</li>" +
                "<li>如果设为 `false`, 可以通过 `getTPS` 方法获取包含3个元素的 TPS 数组 (`1m, 5m, 15m`).</li>" +
                "</ul>" +
                '<details class="tip custom-block">' +
                '<summary class="custom-block-title custom-block-title-default">再深入一些?</summary>' +
                "如果你的插件基于 Gale API 或 Leaf API, 或者运行在 Leaf 上并使用反射来获取 TPS, 可以调用 `Bukkit#getTPSIncluding5SecondAverage` 方法来获取包含5秒 TPS 的 TPS 数组 (`5s, 1m, 5m, 15m`).<br>" +
                "同时, 你也可以调用 `Bukkit#get5SecondTPSAverage` 来获取5秒 TPS 的平均值 (`double` 类型)." +
                "</details>"
        },
        "connection-message": {
            __desc__:
                "玩家连接提示, 当玩家加入或退出服务器时广播发送给所有在线玩家.<br>" +
                "需要使用 [MiniMessage](https://docs.advntr.dev/minimessage/format) 格式.<br>" +
                "如果设为 `default` 或保留默认值, 将使用原版默认的进服和退服提示.<br>" +
                "<br>" +
                "可用占位符:" +
                "<ul>" +
                "<li>__`%player_name%`__ - 玩家名.</li>" +
                "<li>__`%player_displayname%`__ - 玩家显示名称.</li>" +
                "</ul>" +
                '<div class="tip custom-block">' +
                '<p class="custom-block-title custom-block-title-default">API / 插件友好</p>' +
                "此功能对 API / 插件 友好<br>" +
                "这意味着插件可以使用 `PlayerJoinEvent` 或 `PlayerQuitEvent`, 的相关方法覆盖此配置项." +
                "</div>",
            join: {
                enabled: {
                    default: true
                },
                message: {
                    default: "default",
                    desc: "玩家进服提示."
                }
            },
            quit: {
                enabled: {
                    default: true
                },
                message: {
                    default: "default",
                    desc: "玩家退服提示."
                }
            }
        },
        cache: {
            "cache-player-profile-result": {
                default: false,
                desc: "是否在玩家进服时缓存 PlayerProfile 数据.<br>" +
                    "当 Mojang 的认证服务器宕机时, 此功能可以避免玩家验证失败导致无法进服."
            },
            "cache-player-profile-result-timeout": {
                default: 1440,
                desc: "玩家 PlayerProfile 数据的缓存时间.<br>" +
                    "(以 分钟 为单位)<br>" +
                    "如果超时, 将在玩家下次加入时重新请求 Mojang 的认证服务器获取 PlayerProfile 数据."
            }
        }
    }
};

export default config;
