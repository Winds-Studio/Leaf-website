# Gale 全局配置

::: info 信息
以下 YAML 配置展示了 Gale 全局配置 (config/gale-global.yml) 的结构及其默认值。

此配置文件基于最新的 Leaf 1.21.1 分支。

点击配置项后面的箭头按钮以显示其描述。
:::

[[toc]]

## `small-optimizations`

### `reduced-intervals`

#### `increase-time-statistics`

时间相关统计数据（如总游戏时间、上次死亡以来的时间等）增加的间隔，以刻（ticks）为单位。更改此值不会改变统计数据从原版游戏中增加的速度。

- 示例：
  - 设置为 `20` 时，总游戏时间每秒增加 20 个刻。
  - 设置为 `100` 时，总游戏时间每 5 秒增加 100 个刻。

如果给定的值小于或等于 0，则默认为与 Paper 相同。

|            | **默认值** |         |           |
| ---------- | ---------- | ------- | --------- |
| **推荐值** | _Gale_     | _Paper_ | _Vanilla_ |
| `100`      | `20`       | `1`     | `1`       |

| **目标值** |                                                      |
| ---------- | ---------------------------------------------------- |
| _优化_     | `100`                                                |
| _原版行为_ | 较低更接近原版（`20` 还不错，但 `1` 通常是不必要的） |

#### `update-entity-line-of-sight`

更新一个实体是否在另一个实体视线内的间隔，以刻（ticks）为单位。如果给定的值小于或等于 0，则默认为与 Paper 相同。

|            | **默认值** |         |           |
| ---------- | ---------- | ------- | --------- |
| **推荐值** | _Gale_     | _Paper_ | _Vanilla_ |
| `4`        | `4`        | `1`     | `1`       |

| **目标值** |      |
| ---------- | ---- |
| _优化_     | `10` |
| _原版行为_ | `1`  |

## `use-xor-shift-random`

是否使用 [xor-shift 随机数生成器](http://www.codeproject.com/Articles/9187/A-fast-equivalent-for-System-Random) 代替 Java 默认值。

### `auto-replenish-lootable-refill`

是否为 Paper 的 `auto-replenish` 功能使用 xor-shift 随机生成器来补充可拾取物品。这不会影响普通 Minecraft 的可拾取箱子。

|            | **默认值** |         |           |
| ---------- | ---------- | ------- | --------- |
| **推荐值** | _Gale_     | _Paper_ | _Vanilla_ |
| `true`     | `true`     | `false` | -         |

| **目标值**   |                                    |
| ------------ | ---------------------------------- |
| _优化_       | `true`                             |
| _Paper 行为_ | - （玩家无论如何都无法注意到差异） |

### `elytra-firework-speed`

是否使用 xor-shift 随机生成器来增加滑翔时使用火箭的速度。

|            | **默认值** |         |           |
| ---------- | ---------- | ------- | --------- |
| **推荐值** | _Gale_     | _Paper_ | _Vanilla_ |
| `true`     | `true`     | `false` | `false`   |

| **目标值** |         |
| ---------- | ------- |
| _优化_     | `true`  |
| _原版行为_ | `false` |

### `entity-wake-up-duration`

是否使用 xor-shift 随机生成器来变更实体激活持续时间的变化。

|            | **默认值** |         |           |
| ---------- | ---------- | ------- | --------- |
| **推荐值** | _Gale_     | _Paper_ | _Vanilla_ |
| `true`     | `true`     | -       | -         |

| **目标值** |        |
| ---------- | ------ |
| _优化_     | `true` |

### `generate-tree-with-bukkit-api`

是否使用 xor-shift 随机生成器通过 Bukkit API (`World#generateTree`) 生成树。

|            | **默认值** |         |           |
| ---------- | ---------- | ------- | --------- |
| **推荐值** | _Gale_     | _Paper_ | _Vanilla_ |
| `true`     | `true`     | `false` | -         |

| **目标值**   |         |
| ------------ | ------- |
| _优化_       | `true`  |
| _Paper 行为_ | `false` |

## `gameplay-mechanics`

### `enable-book-writing`

是否允许书籍可写。如果设置为 false，拥有权限 `gale.writebooks`（默认：`op`）的玩家仍然可以使用书籍。

|            | **默认值** |         |           |
| ---------- | ---------- | ------- | --------- |
| **推荐值** | _Gale_     | _Paper_ | _Vanilla_ |
| -          | `true`     | `true`  | `true`    |

| **目标值** |        |
| ---------- | ------ |
| _优化_     | -      |
| _原版行为_ | `true` |

## `log-to-console`

是否将特定文本和事件记录到控制台和日志文件。

| **设置**                         | **描述**                                                               | **推荐值** | **默认值** | **Paper** |
| -------------------------------- | ---------------------------------------------------------------------- | ---------- | ---------- | --------- |
| `ignored-advancements`           | 当玩家的数据被加载且他们拥有不再存在的成就时                           | `false`    | `true`     | `true`    |
| `invalid-statistics`             | 当玩家的数据被加载且他们拥有不再存在的统计数据时                       | `false`    | `true`     | `true`    |
| `legacy-material-initialization` | 当加载非常旧的 Bukkit 插件时                                           | `false`    | `false`    | `true`    |
| `null-id-disconnections`         | 当玩家在登录时未发送有效的配置文件时（通常表示黑客试图淹没您的服务器） | -          | `true`     | `true`    |
| `player-login-locations`         | 是否在记录到控制台的加入消息中包含玩家的坐标                           | -          | `true`     | `true`    |
| `set-block-in-far-chunk`         | 当玩家尝试设置非常远的方块时（通常表示黑客试图获取其他玩家的位置）     | `false`    | `true`     | `true`    |
| `unrecognized-recipes`           | 当玩家的数据被加载且他们拥有不再存在的配方书配方时                     | `false`    | `false`    | `true`    |

### `chat`

| **设置**                       | **描述**                                                                   | **推荐值** | **默认值** | **Paper** |
| ------------------------------ | -------------------------------------------------------------------------- | ---------- | ---------- | --------- |
| `empty-message-warning`        | 当玩家发送的消息包为空时（这无害，通常发生在玩家的客户端过时）             | `false`    | `false`    | `true`    |
| `expired-message-warning`      | 当玩家的消息包已过期时（这无害，通常发生在玩家的客户端聊天稍微不同步时）   | `false`    | `false`    | `true`    |
| `out-of-order-message-warning` | 当玩家的消息包顺序错误时（这无害，通常发生在玩家的客户端聊天稍微不同步时） | `false`    | `false`    | `true`    |
| `not-secure-marker`            | 是否在未签名的聊天包前添加 [NOT SECURE] 标记                               | -          | `true`     | `true`    |

### `plugin-library-loader`

| **设置**                          | **描述**                         | **推荐值** | **默认值** | **Paper** |
| --------------------------------- | -------------------------------- | ---------- | ---------- | --------- |
| `downloads`                       | 当插件库加载器开始下载库时       | `true`     | `true`     | `true`    |
| `start-load-libraries-for-plugin` | 当插件库加载器开始为插件加载库时 | `true`     | `true`     | `true`    |
| `library-loaded`                  | 当插件库加载器完成加载库时       | `true`     | `true`     | `true`    |

### `invalid-pool-element-error-log-level`

服务器在世界数据中遇到无效池元素时的错误日志级别。无效池元素是生成结构的一部分（如矿井）损坏或未从旧版本正确更新。这些错误日志通常是无意义的，且在跨多个 Minecraft 版本更新的旧服务器上经常发生。

有效值为 `"none"`、`"info"`、`"warn"` 和 `"error"`。

|            | **默认值** |           |           |
| ---------- | ---------- | --------- | --------- |
| **推荐值** | _Gale_     | _Paper_   | _Vanilla_ |
| `"none"` 🛈 | `"info"`   | `"error"` | `"error"` |

> 🛈 = 默认值为 `"info"`，以防止任何错误默默无闻，但推荐值为 `"none"`，因为这些错误通常是无意义和无法解决的。

## `misc`

### `ignore-null-legacy-structure-data`

是否忽略任何遗留结构数据，NBT 标签解析器由于某种原因返回 null。

- 如果为 true，当发生这种情况时不会给出警告。
- 如果为 false，当发生这种情况时将在控制台中抛出异常。

|            | **默认值** |         |           |
| ---------- | ---------- | ------- | --------- |
| **推荐值** | _Gale_     | _Paper_ | _Vanilla_ |
| `true` 🛈   | `false`    | `false` | `false`   |

| **目标值** |         |
| ---------- | ------- |
| _优化_     | -       |
| _原版行为_ | `false` |

> 🛈 = 默认值为 `false`，以防止任何错误默默无闻，但推荐值为 `true`，因为这些错误通常是无意义和无法解决的。

### `keepalive`

#### `send-multiple`

是否发送比原版更频繁的保持连接包。

- 如果为 true，每秒向每个客户端发送一个保持连接包，如果他们在 30 秒内响应至少一个包，则不会被踢出。
- 如果为 false，每 15 秒向每个客户端发送一个保持连接包，如果他们在 30 秒内未响应，则会被踢出。

|            | **默认值** |         |           |
| ---------- | ---------- | ------- | --------- |
| **推荐值** | _Gale_     | _Paper_ | _Vanilla_ |
| `true`     | `true`     | `false` | `false`   |

| **目标值** |                        |
| ---------- | ---------------------- |
| _优化_     | -                      |
| _原版行为_ | - （这不影响游戏玩法） |

#### `last-tick-time-in-tps-command`

##### `enabled`

是否在 `/tps` 命令中包含最后一次滴答所花费的时间。

|            | **默认值** |         |           |
| ---------- | ---------- | ------- | --------- |
| **推荐值** | _Gale_     | _Paper_ | _Vanilla_ |
| `false`    | `false`    | `false` | `false`   |

| **目标值**   |         |
| ------------ | ------- |
| _优化_       | -       |
| _Paper 行为_ | `false` |

##### `add-oversleep`

是否将最后一次滴答时间的过度睡眠部分添加到 `/tps` 命令中。

|            | **默认值** |         |           |
| ---------- | ---------- | ------- | --------- |
| **推荐值** | _Gale_     | _Paper_ | _Vanilla_ |
| -          | `false`    | `false` | `false`   |

| **目标值**   |     |
| ------------ | --- |
| _优化_       | -   |
| _Paper 行为_ | -   |

#### `premium-account-slow-login-timeout`

高级账户登录所需的最大时间，以刻（ticks）为单位。如果超过此时间，连接将关闭。如果给定的值小于或等于 0，则默认为与原版相同，当前为 `600` 刻（30 秒）。

|            | **默认值** |         |           |
| ---------- | ---------- | ------- | --------- |
| **推荐值** | _Gale_     | _Paper_ | _Vanilla_ |
| -          | `-1`       | `-1`    | `-1`      |

| **目标值** |      |
| ---------- | ---- |
| _优化_     | -    |
| _原版行为_ | `-1` |

#### `verify-chat-order`

是否验证聊天消息的顺序。

- 如果此选项设置为 `true`，并且玩家发送了顺序错误的聊天包，他们将被踢出。
- 如果此选项设置为 `false`，则不会进行验证，玩家不会被踢出。

|            | **默认值** |         |           |
| ---------- | ---------- | ------- | --------- |
| **推荐值** | _Gale_     | _Paper_ | _Vanilla_ |
| -          | `true`     | `true`  | `true`    |

| **目标值** |        |
| ---------- | ------ |
| _优化_     | -      |
| _原版行为_ | `true` |

#### `include-in-timings-report`

是否在时间报告（`/timings`）中包含某些信息。

##### `hardware-specs`

是否包含硬件规格。

|          |          |            | **默认值** |         |
| -------- | -------- | ---------- | ---------- | ------- |
| **属性** | **描述** | **推荐值** | _Gale_     | _Paper_ |
| `cpu`    | CPU      | `true`     | `true`     | `false` |
| `disks`  | 存储     | `true`     | `true`     | `false` |
| `gpus`   | 显卡     | `true`     | `true`     | `false` |
| `memory` | RAM      | `true`     | `true`     | `false` |

##### `server-properties`

是否包含来自原版 `server.properties` 配置文件的某些设置。

|                                        |            | **默认值** |         |
| -------------------------------------- | ---------- | ---------- | ------- |
| **属性**                               | **推荐值** | _Gale_     | _Paper_ |
| `data-packs`                           | `true`     | `true`     | `false` |
| `enable-rcon`                          | `false`    | `false`    | `false` |
| `generator-settings`                   | `true`     | `true`     | `false` |
| `level-name`                           | -          | `false`    | `false` |
| `motd`                                 | -          | `false`    | `false` |
| `query-port`                           | `false`    | `false`    | `false` |
| `rcon-port`                            | `false`    | `false`    | `false` |
| `resource-pack-and-resource-pack-sha1` | -          | `false`    | `false` |
| `resource-pack-prompt`                 | -          | `false`    | `false` |
| `server-ip`                            | -          | `false`    | `false` |
| `server-port`                          | -          | `false`    | `false` |
| `text-filtering-config`                | -          | `false`    | `false` |
