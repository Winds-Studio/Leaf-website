# 常见问题与解答

## ❓ · Leaf 相比 `"<其他任意 Paper 分支>"` 有多少性能提升？

你可以参考 [实体性能](benchmark/entity-performance.md) 和 [区块加载/生成性能](benchmark/chunk-generation.md)。我们将在未来提供更详细严谨的性能对比！

## ❓ · Leaf 是否兼容 Spigot/Paper 插件？

是的，Leaf 的插件兼容性与 Paper 完全相同。如果某个插件无法正常工作，可以将 Leaf 替换为 Purpur 并再次测试。如果问题仍然存在，请在 [Leaf 的 GitHub](https://github.com/Winds-Studio/Leaf/issues/new/choose) 上反馈。

## ❓ · Leaf 是否包括 Purpur？

是的，Leaf 包含所有 Purpur 的补丁，但部分 Purpur 配置项已移至 Gale 和 Leaf 的配置中。

## ❓ · Leaf 多久更新一次上游？

通常来说为 1 ~ 3 周，具体取决于上游的更新是否重要。

## ❓ · 我该如何优化我的服务器？

你可以参考 [YouHaveTrouble 的优化指南](https://github.com/YouHaveTrouble/minecraft-optimization) 和 [Paper 酱的优化指南](https://paper-chan.moe/paper-optimization/)，或者参考由社区为中文用户撰写的 [笨蛋 Wiki 优化指南](https://nitwikit.8aka.org/java/optimize)。

## ❓ · Leaf 有任何已知的不兼容问题吗？

目前，Leaf 的最新版本没有已知的兼容性问题。

但是一些旧版本存在以下兼容性问题：

- < 1.21.1：与 [RealisticVillagers](https://www.spigotmc.org/resources/realisticvillagers.105055) 插件不兼容。
- < 1.21.8：如果您启用了 Leaf 配置里的异步追踪，并且安装了 [Citizens](https://www.spigotmc.org/resources/citizens.13811) 或任何使用真实实体作为 NPC 的插件，请同时开启异步追踪的 `compat-mode` 或关闭异步追踪！

发现有不兼容的插件？[请在这里反馈](https://github.com/Winds-Studio/Leaf/issues/new/choose)！

## ❓ · mojmap 和 reobf 有什么区别？我该使用哪个？

它们是基于不同的映射方式。mojmap 使用 Mojang 映射，而 reobf 使用 Spigot 的 reobf 映射。如提供了带有两种后缀结尾的核心，请使用 mojmap 结尾的核心。

## ❓ · 我该如何支持该项目？

任何人都可以通过我们的 [Open Collective](https://opencollective.com/Winds-Studio) 或者 [Dreeam 的 爱发电](https://afdian.com/a/Dreeam) (支持 支付宝 / 微信支付) 来赞助，支持 Leaf。

:::info 提示

是否需要为此 _常见问题与解答_ 添加更多内容？[点此反馈](getting-started.md#📫-联系方式)！

:::
