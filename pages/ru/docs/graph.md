# Performance Graphs

:::warning
This page presents performance comparison data between Leaf and Paper server implementations. Take these numbers with a grain of salt, it's best to do your own testings and come to a conclusion, these numbers are just "general" estimates for the most common scenarios.
:::

<performance-graph />

## Test Configuration

Default settings in bukkit.yml, spigot.yml, and other configuration files.

### Increased Mob Caps Configuration

Modified settings in bukkit.yml:

- monsters: 70 → 700
- animals: 10 → 100

All other configuration files remained at default settings.

### Leaf+Async Configuration

Enabled minimal async options in leaf-global.yml:

```yaml
async:
  async-entity-tracker:
    enabled: true
  async-pathfinding:
    enabled: true
```

Combined with the increased mob caps configuration.