# Performance Graphs

:::warning This page presents performance comparison data between Leaf and Paper server implementations. Take these numbers with a grain of salt, it's best to do your own testings and come to a conclusion, these numbers are just "general" estimates for the most common scenarios.
:::

<performance-graph />

## Test Methodology

The tests were conducted with identical world seeds and player positions to ensure a fair comparison. Two scenarios were tested:

1. **Default Configuration**: All server configuration files (bukkit.yml, spigot.yml, etc.) were left at their default values.

2. **Increased Mob Caps**: The mob caps in bukkit.yml were increased to artificially lag the server:
   - monsters: 70 → 700
   - animals: 10 → 100

Additionally, we tested Leaf with minimal async optimizations enabled (only async entity tracker and async pathfinding) to demonstrate the impact of Leaf's async features.

All tests were conducted on the same hardware with identical worlds to make a fair comparison.

## Async Optimizations

For servers experiencing performance issues, enabling Leaf's async features can provide substantial improvements with minimal configuration. In our testing, simply enabling these two options provided a significant boost:

```yaml
# In leaf-global.yml
async:
  async-entity-tracker:
    enabled: true
  async-pathfinding:
    enabled: true
```
