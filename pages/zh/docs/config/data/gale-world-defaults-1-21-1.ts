import type { ConfigRoot } from "@/.vitepress/theme/components/config/types";

const config: ConfigRoot = {
    _version: {
        default: 1
    },

    "gameplay-mechanics": {
        "arrow-movement-resets-despawn-counter": {
            default: false,
            desc:
                `当箭开始下落时 (例如卡住箭的方块被破坏), 是否重置箭的 [自然清除计数器](https://zh.minecraft.wiki/w/%E7%94%9F%E6%88%90#%E6%B8%85%E9%99%A4).
                <table>
                <tr><td></td><td><b>默认值</b></td><td></td><td></td></tr>
                <tr><td><b>推荐值&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>原版</i></td></tr>
                <tr><td>-<br></td><td><code>false</code></td><td><code>true</code></td><td><code>true</code></td></tr>
                </table>
                <table>
                <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                <tr><td><i>优化</i></td><td><code>false</code></td></tr>
                <tr><td><i>原版行为</i></td><td><code>true</code></td></tr>
                </table>`
        },
        "entities-can-random-stroll-into-non-ticking-chunks": {
            default: true,
            desc:
                `是否允许随机游荡的生物寻路进入未加载区块.
                <table>
                <tr><td></td><td><b>默认值</b></td><td></td><td></td></tr>
                <tr><td><b>推荐值&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>原版</i></td></tr>
                <tr><td>-<br></td><td><code>true</code></td><td><code>true</code></td><td><code>true</code></td></tr>
                </table>
                <table>
                <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                <tr><td><i>优化</i></td><td><code>false</code></td></tr>
                <tr><td><i>原版行为</i></td><td><code>true</code></td></tr>
                </table>`
        },
        "entity-wake-up-duration-ratio-standard-deviation": {
            default: 0.2,
            desc:
                `如果将此值设为 > \`0\`, 则唤醒不活跃实体的过程会分布在一段时间内, 而不是同时唤醒大量实体.<br>
                这使实体的行为更加自然.<br>
                <br>
                此配置项的值应是一个 [变异系数 (Coefficient of Variation)](https://baike.baidu.com/item/%E5%8F%98%E5%BC%82%E7%B3%BB%E6%95%B0/6463621), 或实体不活跃持续时间的 σ / μ (标准差与均值的比率).<br>
                <br>
                换句话说, 此配置项是表示实体不活跃持续时间的 \`σ\` 值, 乘以 \`normal_distribution(μ = 1, σ)\` 的因子.<br>
                <br>
                如果设为 &leq; \`0\`, 则禁用此逐步实体唤醒功能.
                <table>
                <tr><td></td><td><b>默认值</b></td><td></td><td></td></tr>
                <tr><td><b>推荐值&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>原版</i></td></tr>
                <tr><td><code>0.2</code><br></td><td><code>0.2</code></td><td><code>0.0</code></td><td>-</td></tr>
                </table>
                <table>
                <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                <tr><td><i>优化</i></td><td>-</td></tr>
                <tr><td><i>Paper 行为</i></td><td><code>0.0</code></td></tr>
                </table>`
        },
        fixes: {
            "broadcast-crit-animations-as-the-entity-being-critted": {
                default: false,
                desc:
                    `是否将广播暴击动画为被攻击实体的动画.<br>
                    <br>
                    这不会改变暴击动画显示的位置: 动画始终显示在被攻击实体上.<br>
                    通常 (如果设为 \`false\`), 暴击动画会广播为暴击的玩家, 这意味着看不到玩家的人也无法看到暴击动画.<br>
                    <br>
                    如果设为 \`true\`, 暴击动画会广播为被攻击实体, 这意味着看到实体的人可以看到暴击动画.
                    <table>
                    <tr><td></td><td><b>默认值</b></td><td></td><td></td></tr>
                    <tr><td><b>推荐值&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>原版</i></td></tr>
                    <tr><td>-<br></td><td><code>false</code></td><td><code>false</code></td><td><code>false</code></td></tr>
                    </table>
                    <table>
                    <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                    <tr><td><i>优化</i></td><td>-</td></tr>
                    <tr><td><i>原版行为</i></td><td><code>false</code></td></tr>
                    </table>`
            },
            "keep-mooshroom-rotation-after-shearing": {
                default: true,
                desc:
                    `是否在用剪刀修剪哞菇后保留其旋转角度 (修复 [MC-88967](https://bugs.mojang.com/browse/MC-88967) 的部分问题).
                    <table>
                    <tr><td></td><td><b>默认值</b></td><td></td><td></td></tr>
                    <tr><td><b>推荐值&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>原版</i></td></tr>
                    <tr><td>-<br></td><td><code>true</code></td><td><code>false</code></td><td><code>false</code></td></tr>
                    </table>
                    <table>
                    <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                    <tr><td><i>优化</i></td><td>-</td></tr>
                    <tr><td><i>原版行为</i></td><td><code>false</code></td></tr>
                    </table>`
            },
            "mc-110386": {
                default: true,
                desc:
                    `是否修复 [MC-110386](https://bugs.mojang.com/browse/MC-110386).
                    <table>
                    <tr><td></td><td><b>默认值</b></td><td></td></tr>
                    <tr><td><b>推荐值&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>原版</i></td></tr>
                    <tr><td><code>true</code></td><td><code>true</code></td><td><code>false</code></td><td><code>false</code></td></tr>
                    </table>`
            },
            "mc-121706": {
                default: false,
                desc:
                    `是否修复 [MC-121706](https://bugs.mojang.com/browse/MC-121706).
                    <table>
                    <tr><td></td><td><b>默认值</b></td><td></td></tr>
                    <tr><td><b>推荐值&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>原版</i></td></tr>
                    <tr><td><code>true</code></td><td><code>false</code></td><td><code>false</code></td><td><code>false</code></td></tr>
                    </table>`
            },
            "mc-238526": {
                default: false,
                desc:
                    `是否修复 [MC-238526](https://bugs.mojang.com/browse/MC-238526).
                    <table>
                    <tr><td></td><td><b>默认值</b></td><td></td></tr>
                    <tr><td><b>推荐值&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>原版</i></td></tr>
                    <tr><td>-</td><td><code>false</code></td><td><code>false</code></td><td><code>false</code></td></tr>
                    </table>`
            },
            "mc-31819": {
                default: true,
                desc:
                    `是否修复 [MC-31819](https://bugs.mojang.com/browse/MC-31819).
                    <table>
                    <tr><td></td><td><b>默认值</b></td><td></td></tr>
                    <tr><td><b>推荐值&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>原版</i></td></tr>
                    <tr><td><code>true</code></td><td><code>true</code></td><td><code>false</code></td><td><code>false</code></td></tr>
                    </table>`
            }
        },
        "hide-flames-on-entities-with-fire-resistance": {
            default: false,
            desc:
                `对于拥有火焰抗性效果的实体, 是否在他们着火时隐藏视觉火焰.
                <table>
                <tr><td></td><td><b>默认值</b></td><td></td><td></td></tr>
                <tr><td><b>推荐值&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>原版</i></td></tr>
                <tr><td>-<br></td><td><code>false</code></td><td><code>false</code></td><td><code>false</code></td></tr>
                </table>
                <table>
                <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                <tr><td><i>优化</i></td><td><code>true</code></td></tr>
                <tr><td><i>原版行为</i></td><td><code>false</code></td></tr>
                </table>`
        },
        technical: {
            "load-portal-destination-chunk-before-entity-teleport": {
                default: false,
                desc:
                    `当实体通过传送门时, 是否在传送前完全加载目的地的区块.<br>
                    这会导致服务器主线程在传送完成之前完全暂停.
                    <table>
                    <tr><td></td><td><b>默认值</b></td><td></td><td></td></tr>
                    <tr><td><b>推荐值&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>原版</i></td></tr>
                    <tr><td><code>false</code><br></td><td><code>false</code></td><td><code>false</code></td><td><code>false</code></td></tr>
                    </table>
                    <table>
                    <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                    <tr><td><i>优化</i></td><td><code>false</code></td></tr>
                    <tr><td><i>原版行为</i></td><td><code>false</code></td></tr>
                    </table>`
            }
        },
        "try-respawn-ender-dragon-after-end-crystal-place": {
            default: true,
            desc:
                `当末影水晶被放置在返回传送门的正确位置时, 是否尝试重生末影龙.
                <table>
                <tr><td></td><td><b>默认值</b></td><td></td><td></td></tr>
                <tr><td><b>推荐值&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>原版</i></td></tr>
                <tr><td>-<br></td><td><code>true</code></td><td><code>true</code></td><td><code>true</code></td></tr>
                </table>
                <table>
                <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                <tr><td><i>优化</i></td><td>-</td></tr>
                <tr><td><i>原版行为</i></td><td><code>true</code></td></tr>
                </table>`
        }
    },

    "small-optimizations": {
        "load-chunks": {
            __desc__: "是否在特定情况下加载区块.",
            "to-activate-climbing-entities": {
                default: false,
                desc:
                    `是否加载区块以激活有攀爬能力的实体.<br>
                    <br>
                    在 Paper 中, 像僵尸这样的 "有攀爬能力" 的实体 (例如能够沿着梯子下降) 会优先被激活.<br>
                    检查实体是否在攀爬需要检查其所在的方块.<br>
                    当实体刚好移动到方块边缘触及另一个区块时, 可能导致服务器主线程暂停来等待区块的加载.<br>
                    <br>
                    如果设为 \`false\`, 将阻止这种情况: 服务器不会检查未加载区块中实体的 "攀爬" 优先级, 从而避免不必要的, 主线程暂停导致的瞬卡.
                    <table>
                    <tr><td></td><td><b>默认值</b></td><td></td><td></td></tr>
                    <tr><td><b>推荐值&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>原版</i></td></tr>
                    <tr><td><code>false</code></td><td><code>false</code></td><td><code>true</code></td><td>-</td></tr>
                    </table>
                    <table>
                    <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                    <tr><td><i>优化</i></td><td><code>false</code></td></tr>
                    <tr><td><i>Paper 行为</i></td><td><code>true</code></td></tr>
                    </table>`
            },
            "to-spawn-phantoms": {
                default: false,
                desc:
                    `是否加载区块以生成幻翼.<br>
                    如果设为 \`false\`, 当服务器尝试在未加载区块中生成幻翼时, 不会发生任何操作.
                    <table>
                    <tr><td></td><td><b>默认值</b></td><td></td><td></td></tr>
                    <tr><td><b>推荐值&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>原版</i></td></tr>
                    <tr><td><code>false</code></td><td><code>false</code></td><td><code>true</code></td><td><code>true</code></td></tr>
                    </table>
                    <table>
                    <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                    <tr><td><i>优化</i></td><td><code>false</code></td></tr>
                    <tr><td><i>原版行为</i></td><td><code>true</code></td></tr>
                    </table>`
            }
        },
        "max-projectile-chunk-loads": {
            __desc__: "以下是为弹射物 (例如箭、三叉戟或末影珍珠进入未加载区块时) 加载区块的配置.",
            "per-projectile": {
                max: {
                    default: 10,
                    desc:
                        `弹射物在其生命周期内可以同时加载的最大区块数.<br>
                        如果设为 < \`0\`, 此配置项将被禁用, 即弹射物可加载的区块数量不受限制.
                        <table>
                        <tr><td></td><td><b>默认值</b></td><td></td><td></td></tr>
                        <tr><td><b>推荐值&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>原版</i></td></tr>
                        <tr><td><code>8</code></td><td><code>10</code></td><td><code>-1</code></td><td><code>-1</code></td></tr>
                        </table>
                        <table>
                        <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                        <tr><td><i>优化</i></td><td><code>8</code></td></tr>
                        <tr><td><i>原版行为</i></td><td><code>-1</code></td></tr>
                        </table>`
                },
                "remove-from-world-after-reach-limit": {
                    default: false,
                    desc:
                        `是否清除超过上述 \`max\` 阈值的弹射物.<br>
                        <br>
                        从世界中清除弹射物具有一定风险, 因为这会影响像三叉戟这类对玩家有价值的弹射物, 因此不推荐将此值设为 \`true\`, 除非你可以接受该风险.
                        <table>
                        <tr><td></td><td><b>默认值</b></td><td></td><td></td></tr>
                        <tr><td><b>推荐值&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>原版</i></td></tr>
                        <tr><td><code>false</code></td><td><code>false</code></td><td><code>false</code></td><td><code>false</code></td></tr>
                        </table>
                        <table>
                        <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                        <tr><td><i>优化</i></td><td>推荐在极端环境下设为 <code>true</code>, 但仍有一定风险</td></tr>
                        <tr><td><i>原版行为</i></td><td><code>false</code></td></tr>
                        </table>`
                },
                "reset-movement-after-reach-limit": {
                    default: false,
                    desc:
                        `是否将超过上述 \`max\` 阈值的弹射物的平面速度设为 \`0\`, 避免其尝试穿过区块边界.<br>
                        <br>
                        如果上述 \`remove-from-world-after-reach-limit\` 设为 \`true\`, 此配置项无效.
                        <table>
                        <tr><td></td><td><b>默认值</b></td><td></td><td></td></tr>
                        <tr><td><b>推荐值&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>原版</i></td></tr>
                        <tr><td>-</td><td><code>false</code></td><td><code>false</code></td><td><code>false</code></td></tr>
                        </table>
                        <table>
                        <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                        <tr><td><i>优化</i></td><td><code>true</code></td></tr>
                        <tr><td><i>原版行为</i></td><td><code>false</code></td></tr>
                        </table>`
                }
            },
            "per-tick": {
                default: 10,
                desc:
                    `单个世界中所有弹射物在一个 tick 中可以同时加载的最大区块数.<br>
                    <br>
                    如果设为 < \`0\`, 此配置项将被禁用, 即弹射物每 tick 可加载的区块数量不受限制.
                    <table>
                    <tr><td></td><td><b>默认值</b></td><td></td><td></td></tr>
                    <tr><td><b>推荐值&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>原版</i></td></tr>
                    <tr><td><code>10</code></td><td><code>10</code></td><td><code>-1</code></td><td><code>-1</code></td></tr>
                    </table>
                    <table>
                    <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                    <tr><td><i>优化</i></td><td><code>2</code></td></tr>
                    <tr><td><i>原版行为</i></td><td><code>-1</code></td></tr>
                    </table>`
            }
        },
        "reduced-intervals": {
            "acquire-poi-for-stuck-entity": {
                default: 60,
                desc:
                    `被卡住的生物尝试搜寻兴趣点 (比如在矿车上的村民尝试获 Poi 点, 又称工作方块) 的额外间隔, 为原有间隔基础上的额外时间间隔.<br>
                    (以 tick 为单位)<br>
                    如果它们在此间隔期间不再被卡住, 则可以立即再次获取兴趣点.<br>
                    例如, 如果将此值设为 \`100\`, 卡住的生物每隔 5 秒尝试搜寻一次兴趣点.<br>
                    <br>
                    如果设为 < \`0\`, 将默认与 Paper 相同.
                    <table>
                    <tr><td></td><td><b>默认值</b></td><td></td><td></td></tr>
                    <tr><td><b>推荐值&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>原版</i></td></tr>
                    <tr><td><code>60</code></td><td><code>60</code></td><td><code>200</code></td><td><code>0</code></td></tr>
                    </table>
                    <table>
                    <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                    <tr><td><i>优化</i></td><td><code>200</code></td></tr>
                    <tr><td><i>原版行为</i></td><td><code>0</code></td></tr>
                    </table>`
            },
            "check-nearby-item": {
                hopper: {
                    __desc__:
                        `每个漏斗检查附近可拾取掉落物的频率.<br>
                        这仅影响从地面拾取掉落物 (例如掉落物), 而不影响从箱子或其他存储容器中吸取物品.`,
                    interval: {
                        default: 1,
                        desc:
                            `每个漏斗方块检查附近可拾取掉落物的频率.<br>
                            (以 tick 为单位)<br>
                            例如, 如果设为 \`20\`, 漏斗将每秒检查一次其上方的掉落物.<br>
                            <br>
                            如果设为 &leq; \`0\`, 将默认与 Paper 相同.
                            <table>
                            <tr><td></td><td><b>默认值</b></td><td></td><td></td></tr>
                            <tr><td><b>推荐值&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>原版</i></td></tr>
                            <tr><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td></tr>
                            </table>
                            <table>
                            <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                            <tr><td><i>优化</i></td><td><code>50</code></td></tr>
                            <tr><td><i>原版行为</i></td><td><code>1</code></td></tr>
                            </table>`
                    },
                    minecart: {
                        interval: {
                            default: 1,
                            desc:
                                `与上述 \`interval\` 相同, 但仅适用于漏斗矿车.
                                <table>
                                <tr><td></td><td><b>默认值</b></td><td></td><td></td></tr>
                                <tr><td><b>推荐值&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>原版</i></td></tr>
                                <tr><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td><td><code>1</code></td></tr>
                                </table>
                                <table>
                                <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                                <tr><td><i>优化</i></td><td><code>20</code></td></tr>
                                <tr><td><i>原版行为</i></td><td><code>1</code></td></tr>
                                </table>`
                        },
                        "temporary-immunity": {
                            __desc__:
                                `漏斗矿车可以暂时免疫, 免受上述 \`interval\` 的影响.<br>
                                在免疫期间, 矿车将每 tick 检查一次掉落物.`,
                            "check-for-minecart-near-item-interval": {
                                default: 20,
                                desc:
                                    `每个漏斗矿车检查附近掉落物的频率, 以给予矿车临时免疫, 免受 \`interval\` 的影响.<br>
                                    (以 tick 为单位)<br>
                                    如果设为 &leq; \`0\`, 行为将与设为 \`1\` 相同.
                                    <table>
                                    <tr><td></td><td><b>默认值</b></td><td></td><td></td></tr>
                                    <tr><td><b>推荐值&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>原版</i></td></tr>
                                    <tr><td><code>20</code></td><td><code>20</code></td><td>-</td><td>-</td></tr>
                                    </table>
                                    <table>
                                    <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                                    <tr><td><i>优化</i></td><td><code>20</code></td></tr>
                                    <tr><td><i>原版行为</i></td><td>- (如需贴合原版行为, <code>interval</code> 必须设为 1)</td></tr>
                                    </table>`
                            },
                            "check-for-minecart-near-item-while-active": {
                                default: false,
                                desc:
                                    `是否检查 __活跃__ 状态的掉落物附近的漏斗矿车, 以给予矿车临时免疫, 免受 \`interval\` 的影响.
                                    <table>
                                    <tr><td></td><td><b>默认值</b></td><td></td><td></td></tr>
                                    <tr><td><b>推荐值&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>原版</i></td></tr>
                                    <tr><td><code>false</code></td><td><code>false</code></td><td>-</td><td>-</td></tr>
                                    </table>
                                    <table>
                                    <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                                    <tr><td><i>优化</i></td><td><code>false</code></td></tr>
                                    <tr><td><i>原版行为</i></td><td>- (如需贴合原版行为, <code>interval</code> 必须设为 1)</td></tr>
                                    </table>`
                            },
                            "check-for-minecart-near-item-while-inactive": {
                                default: true,
                                desc:
                                    `是否检查 __非活跃__ 状态的掉落物附近的漏斗矿车, 以给予矿车临时免疫, 免受 \`interval\` 的影响.
                                    <table>
                                    <tr><td></td><td><b>默认值</b></td><td></td><td></td></tr>
                                    <tr><td><b>推荐值&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>原版</i></td></tr>
                                    <tr><td><code>false</code></td><td><code>true</code></td><td>-</td><td>-</td></tr>
                                    </table>
                                    <table>
                                    <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                                    <tr><td><i>优化</i></td><td><code>false</code></td></tr>
                                    <tr><td><i>原版行为</i></td><td>- (如需贴合原版行为, <code>interval</code> 必须设为 1)</td></tr>
                                    </table>`
                            },
                            duration: {
                                default: 100,
                                desc:
                                    `每个矿车临时免疫的时长, 免受 \`interval\` 的影响.<br>
                                    (以 tick 为单位)<br>
                                    如果设为 &leq; \`0\`, 漏斗矿车将永远不会拥有临时免疫.
                                    <table>
                                    <tr><td></td><td><b>默认值</b></td><td></td><td></td></tr>
                                    <tr><td><b>推荐值&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>原版</i></td></tr>
                                    <tr><td><code>100</code></td><td><code>100</code></td><td>-</td><td>-</td></tr>
                                    </table>
                                    <table>
                                    <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                                    <tr><td><i>优化</i></td><td><code>75</code></td></tr>
                                    <tr><td><i>原版行为</i></td><td>- (如需贴合原版行为, <code>interval</code> 必须设为 1)</td></tr>
                                    </table>`
                            },
                            "max-item-horizontal-distance": {
                                default: "24.0",
                                desc:
                                    `漏斗矿车与掉落物的最远水平距离, 在此范围内掉落物可以给予矿车临时免疫, 以此免受 \`interval\` 的影响.<br>
                                    (以 方块 为单位)<br>
                                    如果设为 < \`0\`, 漏斗矿车将永远不会获得临时免疫.
                                    <table>
                                    <tr><td></td><td><b>默认值</b></td><td></td><td></td></tr>
                                    <tr><td><b>推荐值&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>原版</i></td></tr>
                                    <tr><td><code>24.0</code><br></td><td><code>24.0</code></td><td>-</td><td>-</td></tr>
                                    </table>
                                    <table>
                                    <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                                    <tr><td><i>优化</i></td><td><code>24.0</code></td></tr>
                                    <tr><td><i>原版行为</i></td><td>- (如需贴合原版行为, <code>interval</code> 必须设为 1)</td></tr>
                                    </table>`
                            },
                            "max-item-vertical-distance": {
                                default: "4.0",
                                desc:
                                    `与 \`max-item-horizontal-distance\` 相同, 但这是掉落物与漏斗矿车之间的最远垂直距离.<br>
                                    (以 方块 为单位).
                                    <table>
                                    <tr><td></td><td><b>默认值</b></td><td></td><td></td></tr>
                                    <tr><td><b>推荐值&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>原版</i></td></tr>
                                    <tr><td><code>4.0</code><br></td><td><code>4.0</code></td><td>-</td><td>-</td></tr>
                                    </table>
                                    <table>
                                    <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                                    <tr><td><i>优化</i></td><td><code>4.0</code></td></tr>
                                    <tr><td><i>原版行为</i></td><td>- (如需贴合原版行为, <code>interval</code> 必须设为 1)</td></tr>
                                    </table>`
                            },
                            "nearby-item-max-age": {
                                default: 1200,
                                desc:
                                    `超过此存活时间的掉落物不会使附近的漏斗矿车获得临时免疫, 以免受 \`interval\` 的影响.<br>
                                    (以 tick 为单位)<br>
                                    如果设为 &leq; \`0\`, 表示没有存活时间的限制, 即所有掉落物都可以给予附近的漏斗矿车临时免疫.
                                    <table>
                                    <tr><td></td><td><b>默认值</b></td><td></td><td></td></tr>
                                    <tr><td><b>推荐值&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>原版</i></td></tr>
                                    <tr><td><code>1200</code></td><td><code>1200</code></td><td>-</td><td>-</td></tr>
                                    </table>
                                    <table>
                                    <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                                    <tr><td><i>优化</i></td><td><code>600</code></td></tr>
                                    <tr><td><i>原版行为</i></td><td>- (如需贴合原版行为, <code>interval</code> 必须设为 1)</td></tr>
                                    </table>`
                            }
                        }
                    }
                }
            },
            "check-stuck-in-wall": {
                default: 10,
                desc:
                    `检查实体是否被卡在墙中的频率, 以对其造成窒息伤害.<br>
                    (以 tick 为单位)<br>
                    <br>
                    由于在造成伤害后会有一个伤害间隔 (可能会在未来改变, 但目前约为 1 秒), 处在伤害间隔时无法再次造成伤害, 因此将窒息检查的频率控制在 1 秒以内几乎不会引起注意.<br>
                    <br>
                    例如:
                    <ul>
                    <li>如果设为 \`10\`, 实体将会每隔 ½ 秒检查一次是否窒息.</li>
                    <li>如果设为 &leq; \`0\`, 默认与 Paper 相同.</li>
                    </ul>
                    <table>
                    <tr><td></td><td><b>默认值</b></td><td></td><td></td></tr>
                    <tr><td><b>推荐值&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>原版</i></td></tr>
                    <tr><td><code>10</code></td><td><code>10</code></td><td><code>1</code></td><td><code>1</code></td></tr>
                    </table>
                    <table>
                    <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                    <tr><td><i>优化</i></td><td><code>10</code></td></tr>
                    <tr><td><i>原版行为</i></td><td><code>1</code></td></tr>
                    </table>`
            },
            "villager-item-repickup": {
                default: 100,
                desc:
                    `村民投掷的掉落物被其他实体拾取的最小延迟.<br>
                    (以 tick 为单位)
                    <ul>
                    <li>防止村民在某些农场设计中优先拾取种植物品, 造成漏斗无法拾取; 否则这些设计会因下面的 \`check-nearby-item.hopper\` 而失效.</li>
                    <li>减少村民不断向其他库存已满的村民投掷大量物品时造成的卡顿.</li>
                    </ul>
                    例如:
                    <ul>
                    <li>如果设为 \`100\`, 实体可以在 5 秒后拾取村民投掷的物品.</li>
                    <li>如果设为 < \`0\`, 默认与原版相同, 目前为 \`10\` ticks (½ 秒).</li>
                    </ul>
                    <table>
                    <tr><td></td><td><b>默认值</b></td><td></td><td></td></tr>
                    <tr><td><b>推荐值&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>原版</i></td></tr>
                    <tr><td><code>100</code></td><td><code>100</code></td><td><code>-1</code></td><td><code>-1</code></td></tr>
                    </table>
                    <table>
                    <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                    <tr><td><i>优化</i></td><td><code>100</code></td></tr>
                    <tr><td><i>原版行为</i></td><td><code>-1</code></td></tr>
                    </table>`
            }
        },
        "save-fireworks": {
            default: true,
            desc:
                `是否在保存区块时保存烟花.<br>
                烟花可能会出现故障而无法引爆, 并且使用发射器可以非常容易的用烟花填满一个区块.<br>
                如果设为 \`false\`, 区块卸载时会清除烟花, 从而防止这种情况发生.
                <table>
                <tr><td></td><td><b>默认值</b></td><td></td><td></td></tr>
                <tr><td><b>推荐值&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>原版</i></td></tr>
                <tr><td>-<br>(参阅下方的 <i>优化</i>)</td><td><code>true</code></td><td><code>true</code></td><td><code>true</code></td></tr>
                </table>
                <table>
                <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                <tr><td><i>优化</i></td><td><ul><li>通常情况下: - (无关紧要)<li>如果你认为你的玩家喜欢尝试破坏服务器: 设为 <code>false</code></li></ul></td></tr>
                <tr><td><i>原版行为</i></td><td><code>true</code></td></tr>
                </table>`
        },
        "use-optimized-sheep-offspring-color": {
            default: true,
            desc:
                `在生成新的绵羊或幼年绵羊时, 是否使用更快的逻辑选择羊的颜色.<br>
                选择的颜色与原版完全相同.<br>
                <br>
                但是在原版中, 可以使用数据包更改染料组合的合成配方来更改新颜色.<br>
                如果设为 \`true\`, 任何此类配方的更改都将被忽略.
                <table>
                <tr><td></td><td><b>默认值</b></td><td></td><td></td></tr>
                <tr><td><b>推荐值&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>原版</i></td></tr>
                <tr><td><code>true</code></td><td><code>true</code></td><td><code>false</code></td><td><code>false</code></td></tr>
                </table>
                <table>
                <tr><td><b>基于目标的推荐值</b></td><td></td></tr>
                <tr><td><i>优化</i></td><td><code>true</code></td></tr>
                <tr><td><i>原版行为</i></td><td><code>false</code></td></tr>
                </table>`
        }
    }
};

export default config;
