# Entity Performance Benchmark

:::warning
This page presents performance comparison data between Leaf and Paper server implementations for entity processing. These results represent a specific test scenario and may vary based on hardware, configuration, and other factors.
:::

<entity-performance-graph />

## Test Configuration

### Default Settings Configuration

Both servers were tested with default settings in bukkit.yml, spigot.yml, and other configuration files. This baseline test represents performance under typical server conditions.

### Increased Mob Caps Configuration

Modified settings in bukkit.yml:

- monsters: 70 → 700
- animals: 10 → 100

All other configuration files remained at default settings. This test simulates a high-entity-count scenario that frequently occurs on busy servers.

### Leaf + Async Configuration

Enabled minimal async options in leaf-global.yml:

```yaml
async:
    async-entity-tracker:
        enabled: true
    async-pathfinding:
        enabled: true
```
