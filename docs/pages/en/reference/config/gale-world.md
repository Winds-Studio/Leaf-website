# World Settings

The default settings for each world can be configured in `config/gale-world-defaults.yml`, while specific world overrides are set in `<world name>/gale-world.yml`.

[[toc]]

## `small-optimizations`

### `save-fireworks`

Controls whether fireworks are saved when chunks are saved.

Fireworks can malfunction, causing them not to explode, and using dispensers may fill a chunk. If set to `true`, any fireworks will be removed when the chunk unloads to prevent such issues.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| -                     | `true`            | `true`  | `true`    |

| **Target Value**   |                                                                                                    |
| ------------------ | -------------------------------------------------------------------------------------------------- |
| _Optimization_     | Generally: - (not very important) <br> If players are expected to try to crash the server: `false` |
| _Vanilla Behavior_ | `true`                                                                                             |

### `use-optimized-sheep-offspring-color`

Controls whether to use a faster method to select the color of newly born sheep.

The selected color is identical to vanilla. If set to `true`, any crafting recipes changed via packets will be ignored.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| `true`                | `true`            | `false` | `false`   |

| **Target Value**   |         |
| ------------------ | ------- |
| _Optimization_     | `true`  |
| _Vanilla Behavior_ | `false` |

### `load-chunks`

Controls whether to load chunks under specific circumstances.

#### `to-spawn-phantoms`

Whether to load chunks to spawn phantoms.

If set to `false`, nothing will happen when the server tries to spawn phantoms in unloaded chunks.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| `false`               | `false`           | `true`  | `true`    |

| **Target Value**   |         |
| ------------------ | ------- |
| _Optimization_     | `false` |
| _Vanilla Behavior_ | `true`  |

#### `to-activate-climbing-entities`

Whether to load chunks to activate climbing entities.

In Paper, entities like zombies prioritize activation when "climbing." If set to `false`, the server won’t check the climbing priority of entities in unloaded chunks, avoiding unnecessary server hangs.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| `false`               | `false`           | `true`  | -         |

| **Target Value** |         |
| ---------------- | ------- |
| _Optimization_   | `false` |
| _Paper Behavior_ | `true`  |

## `max-projectile-chunk-loads`

Controls the chunk loading settings for projectiles (like arrows, tridents, or ender pearls).

#### `per-tick`

The maximum number of chunks that can be synchronously loaded by all projectiles in a world per tick.

If the given value is less than `0`, this setting is disabled, and the number of chunks loaded by projectiles will not be limited.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| `10`                  | `10`              | `-1`    | `-1`      |

| **Target Value**   |      |
| ------------------ | ---- |
| _Optimization_     | `2`  |
| _Vanilla Behavior_ | `-1` |

#### `per-projectile`

##### `max`

The maximum number of chunks that can be synchronously loaded by a projectile during its lifecycle.

If the given value is less than `0`, this setting is disabled, and the number of chunks loaded by projectiles will not be limited.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| `10`                  | `10`              | `-1`    | `-1`      |

| **Target Value**   |      |
| ------------------ | ---- |
| _Optimization_     | `10` |
| _Vanilla Behavior_ | `-1` |

##### `reset-movement-after-reach-limit`

Whether to set the flat speed of the projectile to zero when it exceeds the `max` threshold to stop it from trying to cross chunk boundaries.

If `remove-from-world-after-reach-limit` is `true`, this setting is ineffective.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| -                     | `false`           | `false` | `false`   |

| **Target Value**   |                                      |
| ------------------ | ------------------------------------ |
| _Optimization_     | `true` (in extreme cases, but risky) |
| _Vanilla Behavior_ | `false`                              |

##### `remove-from-world-after-reach-limit`

Whether to completely remove the projectile from the world when it exceeds the `max` threshold.

Removing projectiles from the world carries risks, as this may affect valuable projectiles for players (like tridents), so it is not recommended to set this value to `true` unless you accept this risk.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| `false`               | `false`           | `false` | `false`   |

| **Target Value**   |                                    |
| ------------------ | ---------------------------------- |
| _Optimization_     | `true` in extreme cases, but risky |
| _Vanilla Behavior_ | `false`                            |

## `reduced-intervals`

### `acquire-poi-for-stuck-entity`

The additional interval in ticks for stuck entities (like vehicles) to attempt to acquire POIs (like villager work blocks).

If they are no longer stuck during this period, they will be able to acquire POIs again immediately.

For example, if this value is set to `100`, stuck entities will attempt to find a POI every 5 seconds.

If the given value is less than `0`, it defaults to the same as Paper.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| `60`                  | `60`              | `200`   | `0`       |

| **Target Value**   |       |
| ------------------ | ----- |
| _Optimization_     | `200` |
| _Vanilla Behavior_ | `0`   |

### `check-stuck-in-wall`

The interval in ticks to check if an entity is stuck in a wall to handle suffocation damage.

Since there is an interval (about 1 second) after damage is dealt where entities cannot take repeated damage, delaying the suffocation check by less than 1 second is nearly imperceptible.

For example, if this value is set to `10`, entities will check for suffocation every ½ second.

If the given value is less than or equal to `0`, it defaults to the same as Paper.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| `10`                  | `10`              | `1`     | `1`       |

| **Target Value**   |      |
| ------------------ | ---- |
| _Optimization_     | `10` |
| _Vanilla Behavior_ | `1`  |

### `villager-item-repickup`

The minimum delay in ticks before items dropped by villagers can be picked up by (other) entities.

- Prevents villagers from picking up planted items before they reach a hopper in some farm designs.
- Reduces the delay of villagers constantly throwing items at each other when their inventory is full.

For example, if this value is set to `100`, items dropped by villagers can be picked up by entities after 5 seconds.

If the given value is less than `0`, it defaults to the same as vanilla, currently `10` ticks (½ second).

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| `100`                 | `100`             | `-1`    | `-1`      |

| **Target Value**   |       |
| ------------------ | ----- |
| _Optimization_     | `100` |
| _Vanilla Behavior_ | `-1`  |

### `check-nearby-item.hopper`

The frequency at which hoppers check for items to pick up.

This setting only affects items that are in the world (e.g., dropped items) and does not affect pulling items from chests or other storage blocks.

- `interval`
  The frequency at which the hopper block checks for items, measured in ticks.

For example, if this value is set to `20`, the hopper will check for items above it once per second.

If the given value is less than or equal to `0`, it defaults to the same as Paper.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| `20`                  | `20`              | `1`     | `1`       |

| **Target Value**   |      |
| ------------------ | ---- |
| _Optimization_     | `50` |
| _Vanilla Behavior_ | `1`  |

- `minecart`

- `interval`
  Same as the above `interval` setting, but applies to hopper minecarts.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| `20`                  | `20`              | `1`     | `1`       |

| **Target Value**   |      |
| ------------------ | ---- |
| _Optimization_     | `20` |
| _Vanilla Behavior_ | `1`  |

- `temporary-immunity`

  Hopper minecarts can temporarily ignore the above `interval` setting. When the minecart is in an immune state, it can check for items once per tick.

  `duration`
  The duration in ticks for which the hopper minecart is temporarily immune to the `interval` setting.

  If the given value is less than or equal to `0`, the hopper minecart will never be temporarily immune to the `interval` setting.

  |                       | **Default Value** |         |           |
  | --------------------- | ----------------- | ------- | --------- |
  | **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
  | `100`                 | `100`             | -       | -         |

  | **Target Value**   |                                                       |
  | ------------------ | ----------------------------------------------------- |
  | _Optimization_     | `75`                                                  |
  | _Vanilla Behavior_ | - (For vanilla behavior, `interval` must be set to 1) |

  `nearby-item-max-age`
  Items older than this value (in ticks) will not cause nearby hopper minecarts to be immune to the `interval` setting.

  If the given value is less than or equal to `0`, there is no minimum age, meaning all items can temporarily make nearby hopper minecarts immune to the `interval` setting.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| `1200`                | `1200`            | -       | -         |

| **Target Value**   |                                                       |
| ------------------ | ----------------------------------------------------- |
| _Optimization_     | `600`                                                 |
| _Vanilla Behavior_ | - (For vanilla behavior, `interval` must be set to 1) |

`check-for-item-near-minecart-interval`

The frequency at which nearby items are checked to allow hopper minecarts to be temporarily immune to the `interval` setting, measured in ticks.

If the given value is less than or equal to `0`, the behavior is the same as `1`.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| `20`                  | `20`              | -       | -         |

| **Target Value**   |                                                       |
| ------------------ | ----------------------------------------------------- |
| _Optimization_     | `20`                                                  |
| _Vanilla Behavior_ | - (For vanilla behavior, `interval` must be set to 1) |

`check-for-minecart-near-item-while-inactive`

Whether to check for nearby items to allow inactive hopper minecarts to be temporarily immune to the `interval` setting.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| `true`                | `true`            | -       | -         |

| **Target Value**   |                                                       |
| ------------------ | ----------------------------------------------------- |
| _Optimization_     | `true`                                                |
| _Vanilla Behavior_ | - (For vanilla behavior, `interval` must be set to 1) |

`max-item-horizontal-distance`

The maximum horizontal distance from which dropped items can temporarily make the hopper minecart immune to the `interval` setting.

If the given value is less than `0`, the hopper minecart will never be temporarily immune to the `interval` setting.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| `24.0`                | `24.0`            | -       | -         |

| **Target Value**   |                                                       |
| ------------------ | ----------------------------------------------------- |
| _Optimization_     | `24.0`                                                |
| _Vanilla Behavior_ | - (For vanilla behavior, `interval` must be set to 1) |

`max-item-vertical-distance`

Same as `max-item-horizontal-distance`, but this is the maximum vertical distance.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| `4.0`                 | `4.0`             | -       | -         |

| **Target Value**   |                                                       |
| ------------------ | ----------------------------------------------------- |
| _Optimization_     | `4.0`                                                 |
| _Vanilla Behavior_ | - (For vanilla behavior, `interval` must be set to 1) |

## `gameplay-mechanics`

### `arrow-movement-resets-despawn-counter`

Whether to restart the despawn counter of arrows when they start to fall (e.g., when the block they are stuck in is destroyed).

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| -                     | `true`            | `true`  | `true`    |

| **Target Value**   |         |
| ------------------ | ------- |
| _Optimization_     | `false` |
| _Vanilla Behavior_ | `true`  |

### `entities-can-random-stroll-into-non-ticking-chunks`

Whether to allow randomly wandering entities to pathfind into non-ticking chunks.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| -                     | `true`            | `true`  | `true`    |

| **Target Value**   |        |
| ------------------ | ------ |
| _Optimization_     | -      |
| _Vanilla Behavior_ | `true` |

### `entity-wake-up-duration-ratio-standard-deviation`

If this value is set to greater than `0`, the process of waking inactive entities will be spread over time rather than waking multiple entities at once, making their behavior more natural.

This setting is the [coefficient of variation](https://en.wikipedia.org/wiki/Coefficient_of_variation), or `σ / μ` (the ratio of standard deviation to mean) of inactive duration.

In other words, this setting is the value of `σ`, so regular inactive durations will be multiplied by a factor of `normal_distribution(μ = 1, σ)`.

If the given value is less than or equal to `0`, variable entity waking will be disabled.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| `0.2`                 | `0.2`             | `0.0`   | -         |

| **Target Value** |       |
| ---------------- | ----- |
| _Optimization_   | -     |
| _Paper Behavior_ | `0.0` |

### `hide-flames-on-entities-with-fire-resistance`

Whether to hide the visible flames on entities that are on fire while having fire resistance potion effects.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| -                     | `false`           | `false` | `false`   |

| **Target Value**   |         |
| ------------------ | ------- |
| _Optimization_     | -       |
| _Vanilla Behavior_ | `false` |

### `player-max-interaction-distance`

The maximum distance from which players can interact with blocks (by left or right-clicking).

Increasing this value makes it more playable for players with poor connections, but it may also allow players using hacked clients to interact from further away than normal.

If the given value is less than or equal to `0`, it defaults to the same as vanilla, currently `6.0`.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| -                     | `-1.0`            | `-1.0`  | `-1.0`    |

| **Target Value**   |        |
| ------------------ | ------ |
| _Optimization_     | -      |
| _Vanilla Behavior_ | `-1.0` |

### `try-respawn-ender-dragon-after-end-crystal-place`

Whether to attempt to respawn the Ender Dragon after placing an End Crystal in the correct position.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| -                     | `true`            | `true`  | `true`    |

| **Target Value**   |        |
| ------------------ | ------ |
| _Optimization_     | -      |
| _Vanilla Behavior_ | `true` |

### `fixes`

#### `sand-duping`

Whether to fix sand duplication.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| -                     | `true`            | `true`  | `false`   |

| **Target Value**   |         |
| ------------------ | ------- |
| _Optimization_     | -       |
| _Vanilla Behavior_ | `false` |

#### `tripwire-duping`

Whether to fix tripwire duplication.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| -                     | `true`            | `true`  | `false`   |

| **Target Value**   |         |
| ------------------ | ------- |
| _Optimization_     | -       |
| _Vanilla Behavior_ | `false` |

#### `broadcast-crit-animations-as-the-entity-being-critted`

Whether to broadcast critical hit animations as the entity being critted.

This setting does not affect the position of the animation display: it always shows on the entity being critted. If set to `false`, the critical hit animation is broadcast as the player dealing the critical hit.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| -                     | `false`           | `false` | `false`   |

| **Target Value**   |         |
| ------------------ | ------- |
| _Optimization_     | -       |
| _Vanilla Behavior_ | `false` |

#### `check-can-change-dimensions-before-use-end-gateway`

Whether to check if an entity can change dimensions when using an End Gateway.

Note that setting this to `true` means vehicles (like boats or horses) and their passengers will not be able to use the End Gateway.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| -                     | `false`           | `false` | `false`   |

| **Target Value**   |         |
| ------------------ | ------- |
| _Optimization_     | -       |
| _Vanilla Behavior_ | `false` |

#### `keep-mooshroom-rotation-after-shearing`

Whether to keep the rotation of Mooshrooms after they are sheared (fixing part of [MC-88967](https://bugs.mojang.com/browse/MC-88967)).

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| -                     | `true`            | `false` | `false`   |

| **Target Value**   |         |
| ------------------ | ------- |
| _Optimization_     | -       |
| _Vanilla Behavior_ | `false` |

#### `mc-...`

Whether to fix various Minecraft bugs/inconsistencies.

|                                                       |                       |         | **Default Value** |           |
| ----------------------------------------------------- | --------------------- | ------- | ----------------- | --------- |
| **Property**                                          | **Recommended Value** | _Gale_  | _Paper_           | _Vanilla_ |
| [mc-31819](https://bugs.mojang.com/browse/MC-31819)   | `true`                | `true`  | `false`           | `false`   |
| [mc-110386](https://bugs.mojang.com/browse/MC-110386) | `true`                | `true`  | `false`           | `false`   |
| [mc-121706](https://bugs.mojang.com/browse/MC-121706) | `true`                | `false` | `false`           | `false`   |
| [mc-238526](https://bugs.mojang.com/browse/MC-238526) | -                     | `false` | `false`           | `false`   |

## `technical`

#### `load-portal-destination-chunk-before-entity-teleport`

Whether to fully load the chunk before teleporting an entity to ensure the entire server waits for the chunk to load.

|                       | **Default Value** |         |           |
| --------------------- | ----------------- | ------- | --------- |
| **Recommended Value** | _Gale_            | _Paper_ | _Vanilla_ |
| -                     | `false`           | `false` | `false`   |

| **Target Value**   |         |
| ------------------ | ------- |
| _Optimization_     | `false` |
| _Vanilla Behavior_ | `false` |
