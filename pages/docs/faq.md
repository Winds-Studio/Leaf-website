# Frequently Asked Questions

## ❓ · How much more performant is Leaf than `"<insert any paper fork>"`?
You can refer to [Entity Performance](benchmark/entity-performance.md) and [Chunk gen/load Performance](benchmark/chunk-generation.md). We will provide more detailed and reliable performance benchmark in the future!

## ❓ · Does Leaf support Spigot/Paper plugins?
Yes, Leaf has exactly the same plugin compatibility compared to Paper. If the plugin doesn't work, replace Leaf with Purpur and test again. If the issue persists, report it on [Leaf GitHub](https://github.com/Winds-Studio/Leaf/issues/new/choose).

## ❓ · Does Leaf include Purpur?
Yes, Leaf includes all the Purpur patches and features, but some Purpur settings are moved to configurations of Gale and Leaf.

## ❓ · How often does Leaf update upstream?
Generally 1 ˜ 3 weeks, depends on how important an update on upstream.

## ❓ · How can I optimize my server?
You can refer to [YouHaveTrouble's guide](https://github.com/YouHaveTrouble/minecraft-optimization) and [Paper-chan optimization guide](https://paper-chan.moe/paper-optimization/), or [optimization guide](https://nitwikit.8aka.org/Java/optimize/) of NitWikit made by the community (For Chinese user).

## ❓ · Any known incompatibilities?
* [RealisticVillagers](https://www.spigotmc.org/resources/realisticvillagers.105055) (Incompatible with the Leaf version lower than 1.21.1).
* In Async Tracker, if the server has [Citizens](https://www.spigotmc.org/resources/citizens.13811) the Tracker's `compat-mode` should be toggled on or disable the async tracker!

Found an incompatible plugin? [Report it here](https://github.com/Winds-Studio/Leaf/issues/new/choose)!

## ❓ · What's the difference between mojmap and reobf? Which should I use?
They use different mappings. Mojmap uses mojang mapping, and reobf uses spigot mapping. If two jar files provided, one ends with mojmap,
and another is reobf, you should use the one ends with mojmap.

## ❓ · How can I support the project?
Anyone can donate via our [Open Collective](https://opencollective.com/Winds-Studio) or [Dreeam's AFDIAN](https://afdian.com/a/Dreeam) (Supports PayPal / Stripe).

:::info Note
Do we need to add something to this *FAQ*? [Write it here](getting-started.md#📫-contact)!
:::
