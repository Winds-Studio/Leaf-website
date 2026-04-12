# Häufig gestellte Fragen

## ❓ · Wie viel schneller ist Leaf als `"<irgendein anderer Paper-Fork>"`?

Weitere Informationen findest du unter [Entity Performance](benchmark/entity-performance.md) und [Chunk gen/load Performance](benchmark/chunk-generation.md). In Zukunft werden wir detailliertere und verlässlichere Performance-Benchmarks bereitstellen!

## ❓ · Unterstützt Leaf Spigot/Paper plugins?

Ja, Leaf hat genau die gleiche Plugin-Unterstützung wie Paper. Sollte ein Plugin mit Purpur aber nicht mit Leaf funktionieren, sollte das Problem auf unserer [GitHub Seite](https://github.com/Winds-Studio/Leaf/issues/new/choose) gemeldet werden.

## ❓ · Enthält Leaf die Purpur Datei?

Ja, Leaf enthält alle Purpur patches. Allerdings sind manche Optionen von Purpur in den Konfigurationsdateien von Gale und Leaf zu finden.

## ❓ · Wie oft führt Leaf Upstream Updates durch?

Normalerweise alle 1 bis 3 Wochen, je nachdem wie wichtig die Updates sind.

## ❓ · Wie kann ich meinen Server optimieren?

Die [Anleitung von YouHaveTrouble](https://github.com/YouHaveTrouble/minecraft-optimization) und die [Anleitung von Paper-chan](https://paper-chan.moe/paper-optimization/) bieten gute Informationen über die Optimierung.

## ❓ · Gibt es bekannte Inkompatibilitäten?

The neuste Leaf Version hat keine bekannten Inkompatibilitäten.

Allerdings gibt es in älteren Versionen bekannte Inkompatibilitäten:

- < 1.21.1 von Leaf ist nicht kompatibel mit dem [RealisticVillagers](https://www.spigotmc.org/resources/realisticvillagers.105055) Plugin.
- < 1.21.8 von Leaf ist nicht mit [Citizens](https://www.spigotmc.org/resources/citizens.13811) oder anderen Plugins kompatibel, die echte Entites als NPCs nutzen, sofern der Async Tracker aktiviert ist. Schalte den Async Tracker aus oder aktiviere den `compat-mode`.

Du hast ein inkompatibles Plugin gefunden? [Melde es hier](https://github.com/Winds-Studio/Leaf/issues/new/choose)!

## ❓ · Was ist der Unterschied zwischen mojmap und reobf? Was soll ich nutzen?

Es handelt sich um unterschiedliche Mappings. Mojmap verwendet die Mojang-Mappings, während reobf die Spigot-Mappings nutzt. Wenn zwei JAR-Dateien zur Verfügung stehen – eine mit dem Suffix mojmap und eine mit reobf – sollte in der Regel die mit mojmap verwendet werden.

## ❓ · Wie kann ich das Projekt unterstützen?

Jeder kann über unser [Open Collective](https://opencollective.com/Winds-Studio) oder [Dreeam's AFDIAN](https://afdian.com/a/Dreeam) (unterstützt PayPal / Stripe) spenden.

:::info Hinweis

Fehlt etwas in diesem _FAQ_? [Schreib es hier](getting-started.md#📫-kontakt)!

:::
