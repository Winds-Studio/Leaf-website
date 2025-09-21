# 实体性能

:::warning
此页面显示了 Leaf 和 Paper 关于实体处理的性能比较数据。然而，这些结果仅仅代表了一个特定的测试场景，其结果可能会因硬件，配置项设置或其他因素而异。
:::

<entity-performance-graph />

## 测试配置项说明

### Default Configuration

两者都使用 bukkit.yml, spigot.yml 和其他配置文件中的默认配置项进行测试。此测试模拟了默认条件下的性能。

### Increased Mob Caps Configuration

对 bukkit.yml 中的配置项进行了以下修改：

- monsters: 70 → 700
- animals: 10 → 100

所有其他配置文件仍保持默认配置项。此测试模拟了高压条件下经常发生的大量实体计数场景。

### Leaf+Async Configuration

启用了位于 leaf-global.yml 中的默认异步配置项：

```yaml
async:
  async-entity-tracker:
    enabled: true
  async-pathfinding:
    enabled: true
```
