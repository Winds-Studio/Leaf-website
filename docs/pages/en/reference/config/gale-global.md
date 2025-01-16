# Gale Global Configuration

:::info
The following YAML configuration showcases the structure and default values of the Gale global configuration (config/gale-global.yml).

This configuration file is based on the latest Leaf 1.21.1 branch.

Click the arrow button next to the configuration items to display their descriptions.
:::

[[toc]]

## `small-optimizations`

### `reduced-intervals`

#### `increase-time-statistics`

The interval at which time-related statistics (like total game time, time since last death, etc.) increase, measured in ticks. Changing this value does not affect the speed at which statistics increase from the original game.

- Example:
  - Setting to `20` means total game time increases by 20 ticks per second.
  - Setting to `100` means total game time increases by 100 ticks every 5 seconds.

If the given value is less than or equal to 0, it defaults to the same as Paper.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| `100`                 | `20`              | `1`     | `1`       |

| **Target Value**   |                                                                                     |
| ------------------ | ----------------------------------------------------------------------------------- |
| _Optimization_     | `100`                                                                               |
| _Vanilla Behavior_ | Lower values are closer to vanilla (`20` is decent, but `1` is usually unnecessary) |

#### `update-entity-line-of-sight`

The interval at which it checks if one entity is in the line of sight of another entity, measured in ticks. If the given value is less than or equal to 0, it defaults to the same as Paper.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| `4`                   | `4`               | `1`     | `1`       |

| **Target Value**   |      |
| ------------------ | ---- |
| _Optimization_     | `10` |
| _Vanilla Behavior_ | `1`  |

## `use-xor-shift-random`

Whether to use the [xor-shift random number generator](http://www.codeproject.com/Articles/9187/A-fast-equivalent-for-System-Random) instead of the Java default.

### `auto-replenish-lootable-refill`

Whether to use the xor-shift random generator for Paper's `auto-replenish` feature to replenish lootable items. This does not affect regular Minecraft lootable chests.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| `true`                | `true`            | `false` | -         |

| **Target Value** |                                         |
| ---------------- | --------------------------------------- |
| _Optimization_   | `true`                                  |
| _Paper Behavior_ | - (Players won’t notice the difference) |

### `elytra-firework-speed`

Whether to use the xor-shift random generator to increase the speed of rockets used while gliding.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| `true`                | `true`            | `false` | `false`   |

| **Target Value**   |         |
| ------------------ | ------- |
| _Optimization_     | `true`  |
| _Vanilla Behavior_ | `false` |

### `entity-wake-up-duration`

Whether to use the xor-shift random generator to change the duration of entity activation.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| `true`                | `true`            | -       | -         |

| **Target Value** |        |
| ---------------- | ------ |
| _Optimization_   | `true` |

### `generate-tree-with-bukkit-api`

Whether to use the xor-shift random generator to generate trees through the Bukkit API (`World#generateTree`).

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| `true`                | `true`            | `false` | -         |

| **Target Value** |         |
| ---------------- | ------- |
| _Optimization_   | `true`  |
| _Paper Behavior_ | `false` |

## `gameplay-mechanics`

### `enable-book-writing`

Whether to allow books to be written. If set to false, players with the permission `gale.writebooks` (default: `op`) can still use books.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| -                     | `true`            | `true`  | `true`    |

| **Target Value**   |        |
| ------------------ | ------ |
| _Optimization_     | -      |
| _Vanilla Behavior_ | `true` |

## `log-to-console`

Whether to log specific text and events to the console and log files.

| **Setting**                      | **Description**                                                                                                      | **Recommended Value** | **Default Value** | **Paper** |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------------- | --------- |
| `ignored-advancements`           | When player data is loaded and they have advancements that no longer exist                                           | `false`               | `true`            | `true`    |
| `invalid-statistics`             | When player data is loaded and they have statistics that no longer exist                                             | `false`               | `true`            | `true`    |
| `legacy-material-initialization` | When loading very old Bukkit plugins                                                                                 | `false`               | `false`           | `true`    |
| `null-id-disconnections`         | When a player logs in without sending a valid profile (usually indicates a hacker trying to flood your server)       | -                     | `true`            | `true`    |
| `player-login-locations`         | Whether to include player coordinates in the join message logged to console                                          | -                     | `true`            | `true`    |
| `set-block-in-far-chunk`         | When a player tries to set a block very far away (usually indicates a hacker trying to get other players' locations) | `false`               | `true`            | `true`    |
| `unrecognized-recipes`           | When player data is loaded and they have recipes that no longer exist                                                | `false`               | `false`           | `true`    |

### `chat`

| **Setting**                    | **Description**                                                                                                                  | **Recommended Value** | **Default Value** | **Paper** |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------------- | --------- |
| `empty-message-warning`        | When a player sends an empty message packet (harmless, usually happens when the player's client is out of date)                  | `false`               | `false`           | `true`    |
| `expired-message-warning`      | When a player's message packet has expired (harmless, usually happens when the player's client chat is slightly out of sync)     | `false`               | `false`           | `true`    |
| `out-of-order-message-warning` | When a player's message packet is out of order (harmless, usually happens when the player's client chat is slightly out of sync) | `false`               | `false`           | `true`    |
| `not-secure-marker`            | Whether to prepend a [NOT SECURE] marker to unsigned chat packets                                                                | -                     | `true`            | `true`    |

### `plugin-library-loader`

| **Setting**                       | **Description**                                                      | **Recommended Value** | **Default Value** | **Paper** |
| --------------------------------- | -------------------------------------------------------------------- | --------------------- | ----------------- | --------- |
| `downloads`                       | When the plugin library loader starts downloading libraries          | `true`                | `true`            | `true`    |
| `start-load-libraries-for-plugin` | When the plugin library loader starts loading libraries for a plugin | `true`                | `true`            | `true`    |
| `library-loaded`                  | When the plugin library loader finishes loading libraries            | `true`                | `true`            | `true`    |

### `invalid-pool-element-error-log-level`

The error log level when the server encounters invalid pool elements in world data. Invalid pool elements are parts of generated structures (like mines) that are corrupted or not correctly updated from old versions. These error logs are often meaningless and frequently occur on old servers that have been updated across multiple Minecraft versions.

Valid values are `"none"`, `"info"`, `"warn"`, and `"error"`.

|                       | **Default Value** |           |           |
| --------------------- | ----------------- | --------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_   | _Vanilla_ |
| `"none"` 🛈            | `"info"`          | `"error"` | `"error"` |

> 🛈 = The default value is `"info"` to prevent any errors from going unnoticed, but the recommended value is `"none"` since these errors are usually meaningless and unresolvable.

## `misc`

### `ignore-null-legacy-structure-data`

Whether to ignore any legacy structure data that the NBT tag parser returns null for.

- If true, no warning will be given when this occurs.
- If false, an exception will be thrown in the console when this occurs.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| `true` 🛈              | `false`           | `false` | `false`   |

| **Target Value**   |         |
| ------------------ | ------- |
| _Optimization_     | -       |
| _Vanilla Behavior_ | `false` |

> 🛈 = The default value is `false` to prevent any errors from going unnoticed, but the recommended value is `true` since these errors are usually meaningless and unresolvable.

### `keepalive`

#### `send-multiple`

Whether to send keep-alive packets more frequently than vanilla.

- If true, a keep-alive packet is sent to each client every second, and if they respond to at least one packet within 30 seconds, they will not be kicked.
- If false, a keep-alive packet is sent to each client every 15 seconds, and if they do not respond within 30 seconds, they will be kicked.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| `true`                | `true`            | `false` | `false`   |

| **Target Value**   |                                   |
| ------------------ | --------------------------------- |
| _Optimization_     | -                                 |
| _Vanilla Behavior_ | - (this does not affect gameplay) |

#### `last-tick-time-in-tps-command`

##### `enabled`

Whether to include the time taken for the last tick in the `/tps` command.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| `false`               | `false`           | `false` | `false`   |

| **Target Value** |         |
| ---------------- | ------- |
| _Optimization_   | -       |
| _Paper Behavior_ | `false` |

##### `add-oversleep`

Whether to add the oversleep portion of the last tick time to the `/tps` command.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| -                     | `false`           | `false` | `false`   |

| **Target Value** |     |
| ---------------- | --- |
| _Optimization_   | -   |
| _Paper Behavior_ | -   |

#### `premium-account-slow-login-timeout`

The maximum time required for premium account login, measured in ticks. If this time is exceeded, the connection will be closed. If the given value is less than or equal to 0, it defaults to the same as vanilla, currently `600` ticks (30 seconds).

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| -                     | `-1`              | `-1`    | `-1`      |

| **Target Value**   |      |
| ------------------ | ---- |
| _Optimization_     | -    |
| _Vanilla Behavior_ | `-1` |

#### `verify-chat-order`

Whether to verify the order of chat messages.

- If this option is set to `true`, and a player sends chat packets out of order, they will be kicked.
- If this option is set to `false`, verification will not occur, and players will not be kicked.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| -                     | `true`            | `true`  | `true`    |

| **Target Value**   |        |
| ------------------ | ------ |
| _Optimization_     | -      |
| _Vanilla Behavior_ | `true` |

#### `include-in-timings-report`

Whether to include certain information in the timings report (`/timings`).

##### `hardware-specs`

Whether to include hardware specifications.

|              |                 |                       | **Default Value** |         |
| ------------ | --------------- | --------------------- | ----------------- | ------- |
| **Property** | **Description** | **Recommended Value** | _Gale_            | _Paper_ |
| `cpu`        | CPU             | `true`                | `true`            | `false` |
| `disks`      | Storage         | `true`                | `true`            | `false` |
| `gpus`       | GPU             | `true`                | `true`            | `false` |
| `memory`     | RAM             | `true`                | `true`            | `false` |

##### `server-properties`

Whether to include certain settings from the vanilla `server.properties` configuration file.

|                                        |                       | **Default Value** |         |
| -------------------------------------- | --------------------- | ----------------- | ------- |
| **Property**                           | **Recommended Value** | _Gale_            | _Paper_ |
| `data-packs`                           | `true`                | `true`            | `false` |
| `enable-rcon`                          | `false`               | `false`           | `false` |
| `generator-settings`                   | `true`                | `true`            | `false` |
| `level-name`                           | -                     | `false`           | `false` |
| `motd`                                 | -                     | `false`           | `false` |
| `query-port`                           | `false`               | `false`           | `false` |
| `rcon-port`                            | `false`               | `false`           | `false` |
| `resource-pack-and-resource-pack-sha1` | -                     | `false`           | `false` |
| `resource-pack-prompt`                 | -                     | `false`           | `false` |
| `server-ip`                            | -                     | `false`           | `false` |
| `server-port`                          | -                     | `false`           | `false` |
| `text-filtering-config`                | -                     | `false`           | `false` |
