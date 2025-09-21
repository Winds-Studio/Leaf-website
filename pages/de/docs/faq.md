# Häufig gestellte Fragen

## ❓ · Wie viel schneller ist Leaf als `"<irgendein anderer Paper-Fork>"`?

Weitere Informationen finden Sie unter [Entity Performance](benchmark/entity-performance.md) und [Chunk gen/load Performance](benchmark/chunk-generation.md). In Zukunft werden wir detailliertere und verlässlichere Performance-Benchmarks bereitstellen!

## ❓ · Unterstützt Leaf Spigot/Paper plugins?

Ja, Leaf hat genau die gleiche Plugin-Unterstützung wie Paper. Sollte ein Plugin mit Purpur aber nicht mit Leaf funktionieren, sollte das Problem auf unserer [GitHub Seite](https://github.com/Winds-Studio/Leaf/issues/new/choose) gemeldet werden.

## ❓ · Enthält Leaf die Purpur Datei?

Ja, Leaf enthält alle Purpur patches. Allerdings sind manche Optionen von Purpur in den Konfigurationsdateien von Gale und Leaf zu finden.

## ❓ · Wie oft führt Leaf Upstream Updates durch?

Normalerweise alle 1 bis 3 Wochen, je nachdem wie wichtig die Updates sind.

## ❓ · Wie kann ich meinen Server optimieren?

Die [Anleitung von YouHaveTrouble](https://github.com/YouHaveTrouble/minecraft-optimization) und die [Anleitung von Paper-chan](https://paper-chan.moe/paper-optimization/) bieten gute Informationen über die Optimierung.

## ❓ · Gibt es bekannte Inkompatibilitäten?

- [RealisticVillagers](https://www.spigotmc.org/resources/realisticvillagers.105055) (Inkompatibel ab Leaf 1.21.1).
- Wenn der `async-entity-tracker` aktiv ist, funktioniert [Citizens](https://www.spigotmc.org/resources/citizens.13811) nur, wenn auch der `compat-mode` aktiv ist
- Weitere Inkompatibilitäten sollten [hier](https://github.com/Winds-Studio/Leaf/issues/new/choose) gemeldet werden!

## ❓ · Was ist der Unterschied zwischen mojmap und reobf? Was soll ich nutzen?

Es handelt sich um unterschiedliche Mappings. Mojmap verwendet die Mojang-Mappings, während reobf die Spigot-Mappings nutzt. Wenn zwei JAR-Dateien zur Verfügung stehen – eine mit dem Suffix mojang und eine mit reobf – sollte in der Regel die mit mojmap verwendet werden.

## ❓ · Wie kann ich das Projekt unterstützen?

Jeder kann über unser [Open Collective](https://opencollective.com/Winds-Studio) oder [Dreeam's AFDIAN](https://afdian.com/a/Dreeam) (unterstützt PayPal / Stripe) spenden.

:::info Hinweis
Fehlt etwas in diesem _FAQ_? [Schreib es hier](getting-started.md#📫-kontakt)!
:::
