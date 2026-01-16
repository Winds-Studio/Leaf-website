# Optimierung deines Leaf-Servers (1.21.4/5)

**Bevor du beginnst:**

1.  **BACKUP DEINES SERVERS!** Ernsthaft. Bevor du Konfigurationen änderst – insbesondere experimentelle – sichere deine Welt, Plugins und Konfigurationsdateien.
2.  **Profiling statt Raten:** Optimierung ist am effektivsten, wenn sie auf Daten basiert und nicht auf Annahmen. Nutze einen Profiler wie [Spark](https://spark.lucko.me/), um herauszufinden, _was_ auf _deinem_ Server tatsächlich Lag verursacht. Ändere nicht einfach wahllos Einstellungen – finde zuerst den Bottleneck!
    - **Bei dauerhaft niedrigen TPS/Lag:** Wenn dein Server konstant unter 20 TPS läuft, nutze den Standard-Profiler:
        1.  Führe `/spark profiler start` in der Konsole oder als OP aus.
        2.  Lass ihn einige Minuten während typischer Serveraktivität laufen (oder wenn die TPS niedrig sind).
        3.  Führe `/spark profiler stop` aus.
        4.  Öffne den generierten Link und analysiere die "Hotspots" oder den Call Tree, um zu sehen, welche Operationen insgesamt die meiste Main-Thread-Zeit verbrauchen.
    - **Bei plötzlichen Lag-Spikes/Freezes:** Wenn dein Server normalerweise stabil läuft, aber gelegentlich starke TPS-Einbrüche oder Freezes auftreten, fokussiere dich gezielt auf diese Momente:
        1.  Führe `/spark profiler --only-ticks-over 100` aus (du kannst den `100`-ms-Schwellwert anpassen). Dieser Befehl zeichnet _nur_ Server-Ticks auf, die länger als die angegebene Dauer benötigen (normale Ticks dauern 50 ms).
        2.  Lass den Profiler laufen, bis ein oder mehrere Lag-Spikes auftreten.
        3.  Führe `/spark profiler stop` aus.
        4.  Analysiere den Report. Er zeigt dir exakt, was der Server während dieser spezifischen laggy Ticks gemacht hat. Achte im Call Tree der aufgezeichneten Spikes auf Methoden/Operationen mit hohen Prozentwerten. So lässt sich die direkte Ursache des Freezes finden (z. B. ein bestimmtes Plugin-Event, World-Generation oder exzessive Entity-Verarbeitung).
    - **Erst analysieren, dann ändern:** Nutze die Profilergebnisse als Grundlage für deine Konfigurationsänderungen. Zeigt Spark auf Entity-Pathfinding, konzentriere dich auf `async-pathfinding`. Zeigt es auf Chunk-Loading, prüfe View Distances oder `async-chunk-send`.
3.  **Schrittweise Änderungen:** Ändere immer nur wenige zusammenhängende Einstellungen gleichzeitig, starte den Server neu und teste anschließend. So erkennst du leichter, ob eine Änderung Probleme verursacht oder die Performance verbessert hat.
4.  **Beschreibungen lesen:** Die Konfigurationsdatei selbst enthält detaillierte Beschreibungen (`desc`) für jede Option. Lies sie sorgfältig!

## Zentrale Optimierungsbereiche in `leaf-global.yml`

Wir konzentrieren uns auf Abschnitte mit spürbaren Performance-Auswirkungen. Empfohlene Werte priorisieren oft Performance, teils auf Kosten kleiner Vanilla-Abweichungen oder mit Anforderungen an neuere Hardware/Java-Versionen.

### 1. Asynchrone Operationen (`async`)

Ziel ist es, Berechnungen vom Main Server Thread (der die Gameplay-Ticks verarbeitet) auf Hintergrund-Threads auszulagern, um die Main-Thread-Last zu senken und die TPS (Ticks Per Second) zu verbessern.

- **`async-entity-tracker.enabled: true`**
    - **Warum:** Entity-Tracking prüft kontinuierlich, welche Spieler welche Entities sehen können, und versendet Pakete zum Hinzufügen/Aktualisieren/Entfernen von Entities. Das ist besonders mit vielen Spielern und Entities sehr teuer. Diese Option verschiebt den Großteil dieser Sichtbarkeitsprüfungen und die Paketvorbereitung auf separate Hintergrund-Threads.
    - **Funktionsweise:** Das System nutzt dedizierte Tracker-Threads. Bei Aktivierung werden interne Datenstrukturen (z. B. die Menge der Spieler, die eine Entity sehen, oder Attribut-Maps) auf thread-sichere Varianten umgestellt (z. B. `ConcurrentHashSet`, `ConcurrentHashMap`). Die Kernlogik der Distanzprüfung (`updatePlayer`) läuft in diesen Hintergrund-Threads. Operationen, die _zwingend_ auf dem Main Thread stattfinden müssen (z. B. Teleportieren eines Spielers, wenn sein Vehicle aus dem Sichtbereich entfernt wird), werden zurück auf den Main Thread eingeplant.
    - **`compat-mode: false` (Empfohlen, sofern nicht benötigt)**
        - **Warum es `compat-mode` gibt:** Manche NPC-Plugins (insbesondere Citizens) erstellen NPCs als _echte Spieler-Entities_. Die asynchrone Arbeitsweise des Trackers kann bei diesen NPCs visuelle Probleme verursachen (z. B. kurzes Verschwinden oder Ruckeln), da Updates nicht synchron zum Main Thread erfolgen.
        - **Wie `compat-mode: true` funktioniert:** Der Code prüft explizit, ob eine getrackte Entity ein _echter Spieler_ oder ein _Fake Player_ (z. B. ein Citizens-NPC) ist. Ist der Kompatibilitätsmodus aktiviert, werden Tracking-Updates für _Fake Player_ **synchron** auf dem Main Thread ausgeführt, während alle anderen Entities (Mobs, Items, echte Spieler) weiterhin asynchron verarbeitet werden. Das behebt die visuellen Probleme bei diesen NPC-Typen.
        - **Empfehlung:** Lass `compat-mode: false` für maximale Performance. Aktiviere ihn nur (`true`), wenn du Citizens oder ein ähnliches _Real-Entity_-NPC-Plugin nutzt **und** Sichtbarkeitsprobleme auftreten. Paketbasierte/virtuelle NPC-Plugins (z. B. ZNPCsPlus, Adyeshach, FancyNPCs) sind in der Regel nicht betroffen und profitieren von `compat-mode: false`.
    - **`max-threads`:** Steuert die Größe des Thread-Pools für Entity-Tracking. Der Default (`0` = 1/4 der CPU-Kerne) ist ein sicherer Start. Erwäge eine Erhöhung auf `1/2` deiner CPU-Kerne, wenn Spark zeigt, dass viel Zeit im Entity-Tracking verbracht wird – vermeide aber eine Überallokation von Threads.
    - **`keepalive` / `queue-size`:** Feinabstimmung des Thread-Pool-Verhaltens (Idle-Timeout) und der Task-Queue-Größe. Die Defaults sind meist sinnvoll.
- **`async-target-finding.enabled: true`**
    - **Warum:** Lagert den teuren Teil der Mob-AI (Suche nach Zielen in der Umgebung) auf Hintergrund-Threads aus und reduziert so die Main-Thread-Last.
- **`async-pathfinding.enabled: true`**
    - **Warum:** Das Berechnen von Navigationspfaden für Mobs (besonders komplexe) ist sehr CPU-intensiv. Diese Option lagert die _Berechnung_ der Pfade aus, sodass der Main Thread nicht durch Mobs blockiert wird, die ihren Weg finden wollen.
    - **Funktionsweise:** Benötigt ein Mob einen Pfad, wird die Anfrage an den Async-Pathfinding-Thread-Pool gesendet. Die AI erhält den Pfad nicht sofort. Stattdessen wurden Navigationssystem und AI so angepasst, dass sie auf den Abschluss der Berechnung _warten_ (z. B. über `path.isProcessed()`) oder einen _Callback_ (`AsyncPathProcessor.awaitProcessing`) verwenden, der die Logik (z. B. Start der Bewegung) **erst nach** Erhalt des Pfades ausführt. Dadurch blockiert der Main Thread nicht.
    - **`max-threads`:** Größe des Pathfinding-Thread-Pools. Default (`0` = 1/4 Kerne) ist konservativ. Erwäge `1/3` der CPU-Kerne, wenn Pathfinding (in Spark z. B. `PathFinder` oder Navigations-Tasks) eine wesentliche Lag-Ursache ist.
    - **`keepalive` / `queue-size`:** Thread-Pool-Feintuning.
    - **`reject-policy`:** Legt fest, was passiert, wenn die Pathfinding-Queue voll ist.
        - `FLUSH_ALL`: Alle wartenden Pathfinding-Tasks werden sofort auf dem Main Thread ausgeführt. Kann einen Lag-Spike verursachen, verarbeitet aber alle offenen Anfragen.
        - `CALLER_RUNS`: Nur der _neue_ Task, der nicht mehr in die Queue passt, wird auf dem Main Thread ausgeführt. Geringeres Spike-Risiko, aber einzelne Pfadanfragen können sich verzögern.
- **`async-mob-spawning.enabled: true`**
    - **Warum:** Lagert Berechnungen aus, die _vor_ dem Spawnen von Mobs stattfinden. Benötigt Paper `per-player-mob-spawns: true`, um effektiv zu sein. Das eigentliche Spawnen bleibt synchron (aus Sicherheitsgründen).
- **`async-locator.enabled: true`**
    - **Warum:** Führt Befehle wie `/locate` sowie Eye-of-Ender-/Dolphin-Suchen im Hintergrund aus und verhindert Server-Hänger bei potenziell langsamen Abfragen.
    - **`threads`:** `1` oder `2` sind in der Regel ausreichend.
- **`async-chunk-send.enabled: true`**
    - **Warum:** Bereitet Chunk-Daten asynchron vor und sendet sie asynchron an Spieler. Reduziert Lag massiv bei Joins, Teleports oder schnellem Fliegen. Sehr empfohlen.
- **`async-block-finding.enabled: true`**
    - **Warum:** Ähnlich wie Target-Finding, aber für AI, die bestimmte Blöcke sucht. Reduziert Main-Thread-Last bei bestimmten AI-Aufgaben.
- **`parallel-world-tracking`** (Experimentell)
    - **Warum:** Versucht, unterschiedliche Welten/Regionen parallel auf Multi-Core-CPUs zu ticken.
    - **Hinweis:** Hochgradig experimentell. Aktiviere (`enabled: true`) dies nur, wenn du _viele_ Welten hast **und** konkrete Bottlenecks bestehen **und** dir der Risiken von Concurrency-Problemen bewusst bist. Default (`false`) ist sicherer.
- **`async-playerdata-save`**
    - **Warum:** Versucht, Playerdaten asynchron zu speichern und reduziert so Max-MSPT-Spikes in Spark-Profilen.

---

### 2. Performance-Tweaks (`performance`)

Dieser Abschnitt enthält gezielte Optimierungen.

- **Virtual Threads (Java 21+ erforderlich)**
    - `use-virtual-thread-for-user-authenticator.enabled: true`
    - `use-virtual-thread-for-async-chat-executor.enabled: true`
    - `use-virtual-thread-for-async-scheduler.enabled: true`
    - **Warum:** Nutzt moderne, leichtgewichtige Java-21+-Threads für Login-Authentifizierung und potenziell Plugin-Async-Tasks. Reduziert Overhead gegenüber klassischen Threads.
- **`create-snapshot-on-retrieving-blockstate.enabled: false`**
    - **Warum:** Verhindert das Erstellen einer Kopie (Snapshot) von Blockdaten bei jeder Plugin-Abfrage. Deutlich schneller, setzt aber voraus, dass Plugins die Live-Daten nicht unbeabsichtigt verändern.
    - **Hinweis:** In der Regel sicher. Bei seltsamen blockbezogenen Plugin-Problemen testweise wieder auf `true` setzen.
- **Drosselung / Überspringen unnötiger Arbeit**
    - `inactive-goal-selector-throttle.enabled: true`: Reduziert AI-Berechnungen für Mobs weit entfernt von Spielern.
    - `throttle-hopper-when-full.enabled: true` (`skip-ticks: 8`): Verhindert, dass Hopper ständig versuchen, in volle Container zu pushen. `8` Ticks entsprechen der Vanilla-Cooldown.
    - `skip-map-item-data-updates-if-map-does-not-have-craftmaprenderer.enabled: true`: Hilfreich bei vielen Custom-Maps ohne Renderer (z. B. Image-Maps). Geringe Vanilla-Abweichung (Maps im Inventar aktualisieren sich ggf. erst beim Halten).
    - `skip-ai-for-non-aware-mob.enabled: true`: Reduziert AI-Verarbeitung für inaktive Mobs weiter.
- **`reduce-packets.reduce-entity-move-packets.enabled: true`**
    - **Warum:** Sendet weniger/kleinere Pakete für kleine Entity-Bewegungen. Spart Bandbreite und Client-Rechenleistung, Bewegungen wirken unter Last oft flüssiger.
- **`faster-random-generator.enabled: true`** (Java 17+ erforderlich)
    - **Warum:** Nutzt schnellere Zufallszahlengeneratoren moderner Java-Versionen. Zufälligkeit wird _überall_ genutzt – das bringt messbare Vorteile.
    - **`random-generator: Xoroshiro128PlusPlus`**: Gutes Verhältnis aus Geschwindigkeit und Qualität.
    - **`enable-for-worldgen: false`**: **KRITISCH:** `true` **VERÄNDERT DIE WORLD GENERATION**. Erze, Strukturen usw. weichen von Vanilla-Seeds ab. Nur auf **NEUEN** Welten nutzen.
    - **`use-legacy-random-for-slime-chunk: true`**: **KRITISCH:** Auf bestehenden Welten `true`, damit Slime-Chunks für Farmen an derselben Position bleiben. Nur auf neuen Welten ggf. `false`.
- **`dab` (Distant Activation Behavior)**
    - `enabled: true`: Reduziert AI-Verarbeitung (Brain-Ticks, Pathfinding) für entfernte Entities.
    - `dont-enable-if-in-water: true`: Verhindert, dass weit entfernte Land-Mobs durch pausierte AI ertrinken.
    - `start-distance: 8`, `max-tick-freq: 20`, `activation-dist-mod: 7`: Gute Startwerte für ein ausgewogenes Verhältnis aus Performance und Verhalten.
    - `blacklisted-entities`: Trage hier Entities ein (z. B. `minecraft:villager`, `minecraft:zombified_piglin`), deren AI auch in der Ferne aktiv bleiben muss (z. B. für bestimmte Farmen).
- **`dont-save-entity`**
    - `dont-save-primed-tnt.enabled: true`: Verhindert das Speichern von TNT-Entities und vermeidet Explosionen durch Chunk-Load/Unload-Zyklen. Gut für technische/Redstone-Server.
    - `dont-save-falling-block.enabled: true`: Verhindert geglitchten oder duplizierten Sand/Kies nach Restarts oder Lag.

---

### 3. Network-Einstellungen (`network`)

- **`protocol-support`**: Aktiviere spezifische Protokolle (`jade`, `appleskin` usw.) **nur**, wenn deine Spieler diese Client-Mods nutzen und du serverseitige Unterstützung möchtest. Sie verbessern sonst nicht die Performance.
- **`OptimizeNonFlushPacketSending.enabled: false`**
    - **Warum `false`:** Diese Optimierung ist **BEKANNT INKOMPATIBEL** mit ProtocolLib und potenziell anderen netzwerkintensiven Plugins. **NICHT AKTIVIEREN**, außer du bist dir absolut sicher, dass nichts kaputtgeht.
- **`chat-message-signature.enabled: false`**
    - **Warum:** Deaktiviert die kryptografische Signierung von Chat-Nachrichten. Dadurch ist das Melden von Chats an Mojang nicht möglich und "Secure Chat"-Indikatoren entfallen. Oft gewünscht auf Servern mit eigener Moderation oder im Offline-Mode.

---

### 4. Sonstiges (`misc`)

- **`secure-seed.enabled: false`**
    - **Warum `false`:** `true` nutzt einen anderen internen Seed für Erze/Strukturen und macht Seed-Cracking unmöglich, **VERÄNDERT ABER GRUNDLEGEND** die Generation im Vergleich zu Vanilla-Seeds. Nur auf **NEUEN** Welten aktivieren.
- **`region-format-settings.region-format: MCA`**
    - **Warum `MCA`:** Standardmäßiges, sicheres und kompatibles Minecraft-Anvil-Format.
    - **`LINEAR`:** Experimentelle Zstandard-Kompression. Spart Speicherplatz, ist aber **RISIKOREICH**, weniger kompatibel und erfordert spezielle Tools. **NICHT VERWENDEN**, außer du kennst die Risiken und hast Backups.
- **`lag-compensation`** (Experimentell)
    - `enabled: true`, `enable-for-water: true`, `enable-for-lava: true`
    - **Warum:** Versucht, Gameplay während Lag-Spikes flüssiger wirken zu lassen.
    - **Hinweis:** Experimentell, mögliche Nebenwirkungen beobachten.

## Vererbte Einstellungen (Gale, Purpur, Paper)

Bedenke, dass Leaf auf Gale, Purpur und Paper aufbaut. Viele wichtige Performance-Settings befinden sich in deren Konfigurationsdateien (`gale-global.yml`, `gale-world.yml`, `purpur.yml`, `paper-global.yml`, `paper-world-defaults.yml`).

Nutze deren Dokumentationen (verlinkt unter [Useful Websites](../useful-sites.md)) und Community-Guides (z. B. Paper-chan), um diese ebenfalls zu optimieren.

## Testen und Iteration

- Nach Änderungen den Server **neu starten**.
- **Performance überwachen** mit `/spark tps` und vor allem `/spark profiler` während normalem Gameplay.
- **Gameplay beobachten:** Verhalten sich Mobs korrekt? Gibt es neue Glitches?
- **Anpassen:** Falls keine Verbesserung eintritt oder Probleme auftreten, letzte Änderungen rückgängig machen oder weiter feinjustieren. Optimierung ist fast immer ein iterativer Prozess, der an deinen Server und deine Hardware angepasst werden muss.

Wenn du Probleme hast oder Fragen auftauchen, frag gern im [Leaf Discord Server](https://discord.com/invite/gfgAwdSEuM). Viel Erfolg!
