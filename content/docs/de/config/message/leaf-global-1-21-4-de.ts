import type { ConfigMessages } from "@/components/config/config-viewer"
import type config from "@/components/config/data/leaf-global-1-21-4"

const de: ConfigMessages<typeof config> = {
  async: {
    __desc__: `Dieser Abschnitt enthält asynchrone Funktionen, die dazu dienen, die Last auf dem Haupt-Thread (Server-Thread) zu verringern, indem Aufgaben asynchron verarbeitet werden.`,
    "async-chunk-send": {
      enabled: {
        desc: `Ob das Packen und Senden von Chunk-Paketen asynchron erfolgen soll.<br>
                    Dies kann die Last auf dem Haupt-Thread erheblich reduzieren, insbesondere wenn viele Spieler gleichzeitig Chunks laden (z. B. beim Beitreten, Teleportieren oder schnellen Fliegen).<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`,
      },
    },
    "async-entity-tracker": {
      "compat-mode": {
        desc: `Ob der Kompatibilitätsmodus für Plugins wie Citizens oder NPC-Plugins, die echte, spielerartige Entities verwenden, aktiviert werden soll.<br>
                    Wenn auf \`true\` gesetzt, kann das Sichtbarkeitsproblem behoben werden, bei dem spielerartige NPCs manchmal verschwinden.<br>
                    <br>
                    Du solltest \`compat-mode\` aktivieren, um die asynchrone Entity-Tracker-Funktion zu nutzen, __NUR WENN__ du Citizens oder eine andere Art von Real-Entity-NPC-Plugins installiert hast.<br>
                    <br>
                    Wir empfehlen jedoch weiterhin die Verwendung von paketbasierten / virtuellen Entity-NPC-Plugins, um eine bessere Leistung zu erzielen, z. B. [ZNPC Plus](https://github.com/Pyrbu/ZNPCsPlus), [Adyeshach](https://github.com/TabooLib/Adyeshach), [Fancy NPC](https://modrinth.com/plugin/fancynpcs) oder andere, dann kann \`compat-mode\` deaktiviert bleiben.`,
      },
      enabled: {
        desc: `Ob das Entity-Tracking asynchron erfolgen soll.<br>
                    Dies kann die Leistung erheblich verbessern, insbesondere in Situationen mit einer großen Anzahl von Entities in einem kleinen Bereich.
                    <br>
                    __⚡Empfohlener Wert: \`true\`__
                    <div class="tip custom-block">
                    <p class="custom-block-title custom-block-title-default">Achtung</p>
                    Wenn du Plugins wie Citizens installiert hast, die echte Entities oder spielerartige Entities als "NPC" verwenden, lies bitte auch \`compat-mode\` unten für weitere Informationen.
                    </div>`,
      },
      keepalive: {
        desc: `Die Keepalive-Zeit für Threads; Threads ohne Aufgaben werden beendet, wenn sie diese Zeit überschreiten.<br>
                    (Einheit: Sekunde)`,
      },
      "max-threads": {
        desc: `Maximale Anzahl an Threads, die für die asynchrone Entity-Pfadfindung verwendet werden sollen.<br>
                    Zum Beispiel:<br>
                    <ul>
                    <li>Wenn ein Wert &leq; \`0\` angegeben wird, wird automatisch die Anzahl der CPU-Kerne plus dem Wert als Anzahl der Threads verwendet, mit einem Minimum von 1.</li>
                    <li>Wenn auf \`0\` gesetzt, werden automatisch 1/4 der CPU-Kerne verwendet, mindestens jedoch 1.</li>
                    </ul>
                    __⚡Empfohlener Wert: 1/3 der CPU-Kerne__`,
      },
      "queue-size": {
        desc: `Maximale Größe der Warteschlange für ausstehende Entity-Tracking-Aufgaben.<br>
                    Wenn ein Wert &leq; \`0\` angegeben wird, wird die Warteschlangengröße dynamisch als \`max-threads * 384\` berechnet.`,
      },
    },
    "async-locator": {
      enabled: {
        desc: `Ob das Finden von Strukturen (Locator) asynchron erfolgen soll.<br>
                    Dies lagert die Struktursuche in andere Threads aus.<br>
                    Derzeit verfügbar für:
                    <ul>
                    <li>\`/locate\` Befehl</li>
                    <li>Delfin-Schatzsuche</li>
                    <li>Enderauge-Festungssuche (Stronghold)</li>
                    </ul>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`,
      },
      keepalive: {
        desc: `Die Keepalive-Zeit für Threads; Threads ohne Aufgaben werden beendet, wenn sie diese Zeit überschreiten.<br>
                    (Einheit: Sekunde)`,
      },
      threads: {
        desc: `Maximale Anzahl an Threads, die für den asynchronen Locator verwendet werden sollen.<br>
                    Wenn ein Wert &leq; \`0\` angegeben wird, wird automatisch 1 Thread verwendet.<br>
                    <br>
                    __⚡Empfohlener Wert: \`1\` oder \`2\`__`,
      },
    },
    "async-mob-spawning": {
      enabled: {
        desc: `Ob Mob-Spawning asynchron erfolgen soll.<br>
                    <br>
                    Auf Servern mit vielen Entities kann dies die Leistung um bis zu ~15% verbessern. Damit dies funktioniert, muss in der Paper-Config \`per-player-mob-spawns\` auf \`true\` gesetzt sein.<br>
                    Eine kurze Anmerkung: Dies spawnt Mobs nicht tatsächlich asynchron (das wäre sehr unsicher). Es lagert lediglich einige teure Berechnungen aus, die für das Mob-Spawning erforderlich sind.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`,
      },
    },
    "async-pathfinding": {
      enabled: {
        desc: `Ob die Berechnung der Mob-Pfadfindung asynchron erfolgen soll.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`,
      },
      keepalive: {
        desc: `Die Keepalive-Zeit für Threads; Threads ohne Aufgaben werden beendet, wenn sie diese Zeit überschreiten.<br>
                    (Einheit: Sekunde)`,
      },
      "max-threads": {
        desc: `Maximale Anzahl an Threads, die für die asynchrone Entity-Pfadfindung verwendet werden sollen.<br>
                    Wenn ein Wert &leq; \`0\` angegeben wird, werden automatisch 1/4 der CPU-Kerne verwendet, mindestens jedoch 1.<br>
                    <br>
                    __⚡Empfohlener Wert: 1/3 der CPU-Kerne__`,
      },
      "queue-size": {
        desc: `Maximale Größe der Warteschlange für ausstehende Entity-Tracking-Aufgaben.<br>
                    Wenn ein Wert &leq; \`0\` angegeben wird, wird die Warteschlangengröße dynamisch als \`max-threads * 256\` berechnet.`,
      },
      "reject-policy": {
        desc: `Die Richtlinie, die verwendet werden soll, wenn die Warteschlange für Pfadfindungsaufgaben voll ist und eine neue Aufgabe eingereicht wird.<br>
                <ul>
                <li>\`FLUSH_ALL\`: Alle ausstehenden Aufgaben in der Warteschlange werden sofort im Server-Thread ausgeführt.</li>
                <li>\`CALLER_RUNS\`: Die eingehende eingereichte Aufgabe wird im Server-Thread ausgeführt.</li>
                <li>\`DISCARD\`: Die eingehende eingereichte Aufgabe wird verworfen.</li>
                </ul>
                <br>
                __⚡Empfohlener Wert: \`CALLER_RUNS\`__`,
      },
    },
    "async-playerdata-save": {
      enabled: {
        desc: `Ob das Speichern von Spielerdaten asynchron erfolgen soll. (I/O-Operationen sind aufwändig)`,
      },
    },
    "async-target-finding": {
      "async-alert-other": {
        desc: `Ob das Alarmieren anderer Mobs durch Mobs asynchron erfolgen soll.<br>
                    Dies hat nur Auswirkungen, wenn \`enabled\` oben \`true\` ist.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`,
      },
      "async-search-block": {
        desc: `Ob die Suche von Mobs nach Block-Zielen asynchron erfolgen soll.<br>
                    Dies hat nur Auswirkungen, wenn \`enabled\` oben \`true\` ist.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`,
      },
      "async-search-entity": {
        desc: `Ob die Suche von Mobs nach Entity-Zielen asynchron erfolgen soll.<br>
                    Dies hat nur Auswirkungen, wenn \`enabled\` oben \`true\` ist.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`,
      },
      enabled: {
        desc: `Ob die Zielsuche (Target Finding) von Entities asynchron erfolgen soll.<br>
                    <br>
                    Die Zielsuchberechnungen von Mobs, zum Beispiel das Finden von Entities in der Nähe zum Angreifen oder Interagieren mit Blöcken in der Nähe, sind aufwändig, insbesondere wenn es eine große Anzahl von Mobs gibt oder viele Mob-Farmen existieren.<br>
                    Dies kann die Leistung verbessern, indem die KI-bezogenen Berechnungen in einen anderen Thread verlagert werden, während die eigentliche Validierung im Haupt-Thread verbleibt.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`,
      },
      "queue-size": {
        desc: `Maximale Größe der Warteschlange für ausstehende Entity-Zielsuchaufgaben.<br>
                    Wenn ein Wert &leq; \`0\` angegeben wird, wird automatisch \`4096\` verwendet.`,
      },
    },
    "parallel-world-ticking": {
      "async-unsafe-read-handling": {
        desc: `Ob asynchrone Aufgaben innerhalb des parallelen Ticking-Systems synchron ausgeführt werden sollen.<br>
                    Dies könnte für die Kompatibilität mit bestimmten Plugins erforderlich sein, macht jedoch die Leistungsvorteile des parallelen Tickings weitgehend zunichte.<br>
                    <br>
                    __⚡Empfohlener Wert: \`BUFFERED\`__`,
      },
      "disable-hard-throw": {
        desc: `Ob "Hard Throws" (die normalerweise den Server stoppen) im Zusammenhang mit Fehlern beim parallelen Ticking deaktiviert werden sollen.<br>
                    <div class="tip custom-block">
                    <p class="custom-block-title custom-block-title-default">Achtung</p>
                    Dies kann zugrundeliegende Probleme maskieren, aber helfen, Abstürze während der Testphase der Serverentwicklung zu verhindern. Mit Vorsicht verwenden.
                    </div>`,
      },
      enabled: {
        desc: `Ob verschiedene Welten parallel in separaten Threads verarbeitet werden sollen, was die Leistung auf Multi-Core-Systemen verbessern kann.<br>
                    <br>
                    Parallel World Ticking, auch bekannt als "PWT", ist ein Konzept von [SparklyPaper](https://github.com/SparklyPower/SparklyPaper), bei dem jede Welt in ihrem eigenen dedizierten Thread getickt wird, um die Arbeitslast von einem einzelnen Thread für alle Welten aufzuteilen und zu reduzieren.<br>
                    In dieser PWT-Implementierung wartet jede Welt, bis der letzte Welt-Tick abgeschlossen ist. Mehr dazu in der Erklärung von SparklyPaper: [PARALLEL_WORLD_TICKING.md](https://github.com/SparklyPower/SparklyPaper/blob/13aff425238ea322658de0d9f4f7bd906bd9f431/docs/PARALLEL_WORLD_TICKING.md).<br>
                    <br>
                    Wann solltest du PWT in Betracht ziehen?
                    <ol>
                    <li>Ich kann wirklich nicht zu [Folia](https://papermc.io/software/folia) oder dessen Forks wechseln.</li>
                    <li>Ich habe einen Multi-Core-Server.</li>
                    <li>Meine Spieler verteilen sich gleichmäßig auf jede Welt.</li>
                    <li>(Oder ich habe viele Welten, z. B. einige RPG-Server)</li>
                    </ol>
                    <br>
                    __⚡Empfohlener Wert: \`true\` (Nur wenn spezifische Engpässe auftreten und die Risiken verstanden werden)__
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">Experimentell</p>
                    Experimentelle Funktion, möglicherweise instabil und kann Kompatibilitätsprobleme mit einigen Plugins verursachen.
                    </div>`,
      },
      "log-container-creation-stacktraces": {
        desc: `Ob Stacktraces protokolliert werden sollen, wenn Container (wie Tile Entities oder Entities) während des parallelen Tickings erstellt werden.<br>
                    Dies ist nützlich für das Debuggen potenzieller Nebenläufigkeitsprobleme (Concurrency Issues).`,
      },
      threads: {
        desc: `Anzahl der Threads, die für das parallele World-Ticking reserviert sind.<br>
                    <br>
                    __⚡Empfohlener Wert: gleich der Anzahl der Welten__`,
      },
    },
  },
  fixes: {
    __desc__: `Dieser Abschnitt enthält Bugfixes für spezifische Probleme.`,
    "dont-place-player-if-server-full": {
      desc: `Ob Spielern der Beitritt verweigert werden soll, wenn der Server voll ist (definiert als \`max-players\` in \`server.properties\`).<br>
                Diese Option behebt [Paper#10668](https://github.com/PaperMC/Paper/issues/10668).<br>
                <br>
                Wenn auf \`true\` gesetzt, solltest du Spielern die Berechtigung \`purpur.joinfullserver\` geben, anstatt die \`PlayerLoginEvent#allow\` API zu verwenden, um Spielern das Umgehen des Limits zu erlauben.`,
    },
  },
  "gameplay-mechanisms": {
    __desc__: `Dieser Abschnitt enthält Funktionen, die die Spielmechanik modifizieren oder verbessern.`,
    "afk-command": {
      enabled: {
        desc: `Ob der AFK-Befehl basierend auf Minecrafts eingebautem [Idle-Timeout-Mechanismus](https://minecraft.wiki/w/Server.properties#:~:text=player%20have%20to%20idle) aktiviert werden soll. Spieler können den Befehl /afk verwenden, um ihren AFK-Modus umzuschalten, und ihr AFK-Status kann in der Tab-Liste angezeigt werden.<br>
                    <br>
                    Setze auch \`kick-if-idle\` in der Purpur-Config auf \`false\`, um zu verhindern, dass Spieler gekickt werden, wenn sie in den AFK-Modus wechseln. Die restlichen AFK-Einstellungen, konfigurierbare AFK-Nachrichten und Titel-Nachrichten befinden sich in der Purpur-Config.`,
      },
    },
    "allow-tripwire-dupe": {
      desc: `Ob der Tripwire-Dupe ([MC-59471](https://bugs.mojang.com/browse/MC/issues/MC-59471)), der in den 1.21.2-Snapshots 24w33a und 24w36a behoben wurde, zurückgebracht werden soll. Er ist auch als String-Dupe bekannt.`,
    },
    "death-item-drop-knockback": {
      "drop-around": {
        desc: `Ob Items beim Tod zufällig um den Spieler herum fallen gelassen werden sollen.
                    <ul>
                    <li>Wenn auf \`true\` gesetzt, werden Items mit einer zufälligen Bewegung fallen gelassen und um den toten Spieler verstreut.</li>
                    <li>Wenn auf \`false\` gesetzt, werden Items unter dem toten Spieler fallen gelassen.</li>
                    </ul>`,
      },
      "horizontal-force": {
        desc: `Basisgeschwindigkeit der horizontalen Kraft, die auf die fallen gelassenen Items des Spielers beim Tod wirkt.`,
      },
      "vertical-force": {
        desc: `Dasselbe wie \`horizontal-force\`, aber für die vertikale Geschwindigkeit.`,
      },
    },
    "hide-item-component": {
      enabled: {
        desc: `Ob spezifizierte Komponenten-Informationen aus dem Inventar des Spielers, das an Clients gesendet wird, verborgen werden sollen. Siehe auch \`hidden-types\` oben.<br>
                    <br>
                    Es kann verwendet werden, um komplexe Komponentendaten eines Items zu verbergen, um die Rendering-Last, häufige Animationen auf der Client-Seite und die Netzwerknutzung zu reduzieren. Die tatsächlichen Item-Daten sind nicht betroffen.<br>
                    <br>
                    Es sei darauf hingewiesen, dass sich diese Option von Papers [Item-Obfuskation](https://docs.papermc.io/paper/reference/global-configuration/#anticheat_obfuscation_items_enable_item_obfuscation) unterscheidet. Diese Option verbirgt nur Item-Komponentendaten aus dem eigenen Inventar des Spielers, anstatt Daten zu verbergen, die an andere gesendet werden.
                    <div class="tip custom-block">
                    <p class="custom-block-title custom-block-title-default">Achtung</p>
                    Dies kann Resource Packs, Client-Mods oder spezifische Spielmechaniken beschädigen, die auf diesen clientseitigen Komponentendaten von Items basieren. Mit Vorsicht verwenden. Du musst wissen, welche Komponenten du verbirgst!
                    </div>`,
      },
      "hidden-types": {
        desc: `Die Liste der Komponenten-Typschlüssel, die vor dem Client verborgen werden sollen.<br>
                    <br>
                    Siehe [List of components](https://minecraft.wiki/w/Data_component_format#List_of_components) um die vollständige Liste der verfügbaren Komponenten-Typschlüssel für Items zu erhalten.<br>
                    Zum Beispiel:
                    <ul>
                    <li>Wenn der Wert \`[]\` angegeben wird, ist kein Item betroffen.</li>
                    <li>Wenn der Wert \`["minecraft:custom_data"]\`, wird die \`custom_data\`-Komponente des Items auf dem Client des Spielers verborgen.</li>
                    </ul>`,
      },
    },
    "inventory-overflow-event": {
      enabled: {
        desc: `Ob das Inventar-Überlauf-Event (Inventory Overflow Event) aktiviert werden soll. Das Event wird aufgerufen, wenn ein Plugin \`Inventory#addItem\` verwendet, um Items zum Inventar des Spielers hinzuzufügen, und das Zielinventar voll ist.
                    <div class="tip custom-block">
                    <p class="custom-block-title custom-block-title-default">Achtung</p>
                    Dies ist keine saubere Lösung! Bitte überarbeite deine Plugin-Logik, um die zurückgegebene Map der \`Inventory#addItem\`-Methode so schnell wie möglich zu verwenden!
                    </div>`,
      },
      "listener-class": {
        desc: `Der vollständige Name der Listener-Klasse, die auf dieses Inventar-Überlauf-Event hört. Setze dies auf deine eigene Listener-Klasse, um dieses Event zu nutzen.`,
      },
    },
    knockback: {
      __desc__: `Dieser Abschnitt enthält Optionen zum Anpassen des Rückstoßverhaltens (Knockback).`,
      "can-player-knockback-zombie": {
        desc: `Ob der Spieler Zombies mit der Hand, Waffe, Projektilen usw. zurückstoßen kann.`,
      },
      "egg-knockback-players": {
        desc: `Ob Eier Spieler zurückstoßen können.`,
      },
      "flush-location-while-knockback-player": {
        desc: `Ob Bewegungsänderungen sofort an den Client gesendet werden sollen, sobald der Zielspieler getroffen wird und Rückstoß erhält. Dies kann ein flüssigeres PVP-Spielerlebnis mit schnelleren Rückstoß-Reaktionen bieten. In Vanilla geschieht das Senden des Pakets stattdessen am Ende des Ticks, was das PVP-Spielerlebnis beeinträchtigen kann.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\` (Für PVP-Server)__
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">Experimentell</p>
                    Experimentelle Funktion, wird aktiv getestet, bitte melde alle Fehler, die auftreten.
                    </div>`,
      },
      "old-blast-protection-explosion-knockback": {
        desc: `Ob das alte Explosions-Rückstoßverhalten (<= 1.20.4) verwendet werden soll, das für Rüstungen mit Explosionsschutz-Verzauberung gilt.
                    <ul>
                    <li>Wenn auf \`true\` gesetzt, wird der Explosions-Rückstoß basierend auf der Explosionsschutz-Verzauberung des Spielers berechnet. Der Rückstoß ist etwas größer als nach der Version 1.20.4.</li>
                    <li>Wenn auf \`false\` gesetzt, folgt der Explosions-Rückstoß dem Vanilla-Verhalten der aktuellen Version.</li>
                    </ul>`,
      },
      "snowball-knockback-players": {
        desc: `Ob Schneebälle Spieler zurückstoßen können.`,
      },
    },
    "only-player-pushable": {
      desc: `Ob nur der Spieler verschiebbar (pushable) sein soll.<br>
                Wenn auf \`true\` gesetzt, überschreibt diese Option Werte verwandter Kollisionsoptionen in Papers globaler und Welt-Konfiguration, und Mobs werden nicht durch den Effekt der [maxEntityCramming](https://minecraft.wiki/w/Game_rule#:~:text=entity%20cramming%20damage) Gamerule getötet.
                <div class="tip custom-block">
                <p class="custom-block-title custom-block-title-default">Achtung</p>
                Dies kann Mob-Farmen zerstören, die Mob-Kollision nutzen, um Mobs fallen zu lassen oder Mobs zu töten, indem der Wert der [maxEntityCramming](https://minecraft.wiki/w/Game_rule#:~:text=entity%20cramming%20damage) Gamerule überschritten wird.
                </div>`,
    },
    player: {
      "max-use-item-distance": {
        desc: `Die maximale Distanz, über die der Spieler ein Item benutzen darf.<br>
                    (Einheit: Block)<br>
                    <br>
                    Einige [Anarchy-Server](https://minecraftservers.org/type/anarchy) oder ähnliche Servertypen erlauben Spielern möglicherweise die Nutzung von Hacks/Cheats. Wenn du möchtest, dass Spieler Crystal-bezogene Module nutzen können, die paketbasiert sind (z. B. CEV Breaker, BedAura), musst du diesen Wert möglicherweise anpassen.<br>
                    Es ist besser, den Wert auf \`10.0000001\` zu setzen, um die Nutzung entsprechender Hack-Module zu erlauben.
                    <br>
                    Wenn \`-1\` angegeben wird, wird die Prüfung der maximal erlaubten Distanz zur Item-Nutzung deaktiviert.<br>
                    <br>
                    __⚡Empfohlener Wert: \`10.0000001\` (Nur für Anarchy-Server)__
                    <div class="tip custom-block">
                    <p class="custom-block-title custom-block-title-default">Achtung</p>
                    Wenn auf \`-1\` oder einen großen positiven Wert gesetzt, können Spieler einige Paket-Module von Hack-Clients nutzen und sind auch in der Lage, den [Nocom Exploit](https://github.com/nerdsinspace/nocom-explanation) zu nutzen! Das Anpassen dieser Option erfordert eine sorgfältige Abwägung möglicher Exploits.
                    </div>`,
      },
    },
    "spawner-settings": {
      checks: {
        "check-for-nearby-players": {
          desc: `Ob überprüft werden soll, ob sich Spieler in einem Radius befinden, um den Mob zu spawnen.
                        <ul>
                        <li>Wenn auf \`true\` gesetzt, versucht der Spawner immer, Mobs zu spawnen, ohne zu prüfen, ob ein Spieler in der Nähe ist.</li>
                        <li>Wenn auf \`false\` gesetzt, versucht der Spawner nur dann Mobs zu spawnen, wenn ein Spieler im Radius ist.</li>
                        </ul>`,
        },
        "ignore-spawn-rules": {
          desc: `Ob zusätzliche Spawn-Regeln von Mobs ignoriert werden sollen.<br>
                        <br>
                        Viele Mobs haben Spawn-Beschränkungen, dass sie nur auf bestimmten Blöcken spawnen oder nicht spawnen können. Zum Beispiel können die meisten Tiere nur auf Grasblöcken spawnen, oder der Hoglin kann nicht auf Netherwarzen-Blöcken spawnen. Du findest die Liste zusätzlicher Spawn-Regeln unter [Additional Rules](https://minecraft.wiki/w/Mob_spawning#:~:text=additional%20rules).<br>
                        <br>
                        Diese Option beeinflusst nicht die obigen Optionen \`spawner-block-checks\` und \`water-prevent-spawn-check\` und ist von diesen getrennt.`,
        },
        "light-level-check": {
          desc: `Ob überprüft werden soll, ob das Lichtlevel ausreicht, um den Mob zu spawnen.
                        <ul>
                        <li>Wenn auf \`true\` gesetzt, versucht der Spawner, Mobs unter Verwendung derselben Lichtlevel-Bedingungen zu spawnen, die für natürliches Mob-Spawning verwendet werden.</li>
                        <li>Wenn auf \`false\` gesetzt, folgt der Spawner dem Vanilla-Verhalten, das versucht zu spawnen, ohne das Lichtlevel zu prüfen.</li>
                        </ul>`,
        },
        "spawner-block-checks": {
          desc: `Ob Spawn-Versuche verhindert werden sollen, wenn der Spawn-Punkt durch Blöcke blockiert ist.`,
        },
        "spawner-max-nearby-check": {
          desc: `Ob überprüft werden soll, ob die maximale Anzahl an Mobs in der Nähe erreicht ist, um den Mob zu spawnen. Der Spawner hört auf, neue Mobs zu spawnen, um Überfüllung zu vermeiden.
                        <ul>
                        <li>Wenn auf \`true\` gesetzt, folgt der Spawner dem Vanilla-Verhalten, das das Spawnen neuer Mobs verhindert, wenn die Anzahl der Mobs in der Nähe das Limit überschreitet.</li>
                        <li>Wenn auf \`false\` gesetzt, versucht der Spawner immer zu spawnen, ohne die Anzahl der Mobs in der Nähe zu prüfen.</li>
                        </ul>`,
        },
        "water-prevent-spawn-check": {
          desc: `Ob Spawn-Versuche verhindert werden sollen, wenn der Spawn-Punkt Wasser enthält.`,
        },
      },
      enabled: {
        desc: `Ob die benutzerdefinierten Spawner-Optionen unten verwendet werden sollen. Die Optionen unten betreffen nur das Spawnen von Spawner-Blöcken statt des natürlichen Spawnens.`,
      },
      "max-spawn-delay": {
        desc: `Die maximale Verzögerung zwischen jedem Spawn-Versuch des Spawners. Höhere Werte verlangsamen die Spawning-Geschwindigkeit von Spawnern.<br>
                    (Einheit: Tick)`,
      },
      "min-spawn-delay": {
        desc: `Die minimale Verzögerung zwischen jedem Spawn-Versuch des Spawners. Höhere Werte verlangsamen die Spawning-Geschwindigkeit von Spawnern.<br>
                    (Einheit: Tick)`,
      },
    },
    "use-spigot-item-merging-mechanism": {
      desc: `Ob fallen gelassene Items basierend auf ihrer Tick-Reihenfolge zusammengeführt (gemerged) werden sollen, was das langjährige Standardverhalten von Spigot ist.<br>
                <br>
                In Spigot wird das Item-Entity, das später tickt, in das früher tickende zusammengeführt. Wenn der Merge-Radius relativ größer ist, kann dies verhindern, dass fallen gelassene Items an unerwarteten Orten stecken bleiben. Dies ist nützlich für Farmen oder Redstone-Bauten, die zahlreiche fallen gelassene Items erzeugen können.<br>
                In Vanilla basiert das Zusammenführen von Items jedoch auf der Item-Anzahl des Stacks. Der Stack mit der kleineren Anzahl wird mit dem mit der größeren Anzahl zusammengeführt.
                <table>
                <tr><td><b>Werte für Ziele</b></td><td></td></tr>
                <tr><td><i>SMP-freundlich</i></td><td><code>true</code></td></tr>
                <tr><td><i>Vanilla-Verhalten</i></td><td><code>false</code></td></tr>
                </table>`,
    },
  },
  misc: {
    __desc__: `Dieser Abschnitt enthält einige sonstige Funktionen.`,
    "async-catcher": {
      enabled: {
        desc: `Ob der Haupt-Thread-Check von Spigot aktiviert werden soll.
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">Warnung</p>
                    Das Deaktivieren wird NICHT empfohlen und kann zu schwerwiegender Serverinstabilität führen.<br>
                    Es wird nicht empfohlen, diese Option zu ändern, es sei denn, du bist sicher, was du tust.
                    </div>`,
      },
    },
    cache: {
      "profile-lookup": {
        enabled: {
          desc: `Ob die Profildaten des Spielers (z. B. UUID, Benutzername, Skin-/Cape-Texturen) gecacht werden sollen, wenn sie dem Server beigetreten sind.<br>
                        Dies kann Netzwerkanfragen an Mojangs Authentifizierungsserver reduzieren und ist auch nützlich, wenn der Authentifizierungsserver vorübergehend nicht verfügbar ist, und erlaubt es Spielern trotzdem, dem Server unter Verwendung gecachter Profildaten erneut beizutreten.`,
        },
        "max-size": {
          desc: `Die maximale Anzahl an Profilen, die gecached werden sollen.<br>
                        Höhere Werte können etwas mehr Speicher beanspruchen.`,
        },
        timeout: {
          desc: `Der Timeout des Spielerprofil-Caches.<br>
                    (Einheit: Minute, Standardwert 1440 Minuten = 24 Stunden)<br>
                    Wenn der angegebene Timeout überschritten wird, sendet der Server beim nächsten Beitritt des Spielers eine weitere Anfrage, um Spielerprofildaten von Mojangs Authentifizierungsserver abzurufen.`,
        },
      },
    },
    "connection-message": {
      __desc__: `Die Verbindungsnachricht wird an alle Online-Spieler gesendet, wenn sie dem Server beitreten oder ihn verlassen.<br>
                Die Nachricht muss das [MiniMessage](https://docs.papermc.io/adventure/minimessage/format/)-Format verwenden.<br>
                Wenn \`message\` unten auf \`default\` gesetzt ist, wird die Vanilla-Beitritts-/Verlassensnachricht verwendet.<br>
                Wenn \`enabled\` unten auf \`false\` gesetzt ist, wird die Verbindungsnachricht deaktiviert, und ein anderes Plugin wird verwendet, um die Verbindungsnachricht zu senden.<br>
                <br>
                Verfügbare Platzhalter:
                <ul>
                <li>__\`<player_name%>\`__ - Spielername.</li>
                <li>__\`<player_displayname>\`__ - Anzeigename des Spielers.</li>
                </ul>
                <div class="tip custom-block">
                <p class="custom-block-title custom-block-title-default">API / Plugin-Freundlich</p>
                Diese Funktion ist API- / Plugin-freundlich. Das bedeutet, dass der Inhalt der Verbindungsnachricht von Plugins überschrieben werden kann, die \`PlayerJoinEvent\` oder \`PlayerQuitEvent\` verwenden.
                </div>`,
      join: {
        enabled: {
          desc: `Ob eine Nachricht gesendet werden soll, wenn der Spieler beitritt.`,
        },
        message: {
          desc: `Die Beitrittsnachricht des Spielers.`,
        },
      },
      quit: {
        enabled: {
          desc: `Ob eine Nachricht gesendet werden soll, wenn der Spieler den Server verlässt.`,
        },
        message: {
          desc: `Die Verlassensnachricht des Spielers.`,
        },
      },
    },
    "including-5s-in-get-tps": {
      desc: `Ob 5-Sekunden-TPS in das Ergebnis der API \`Bukkit#getTPS\` und \`Server#getTPS\` aufgenommen werden sollen.<br>
                Befehle wie \`/tps\` zeigen dies unabhängig davon an.<br>
                <ul>
                <li>Wenn auf \`true\` gesetzt, kannst du die \`getTPS\`-Methode verwenden, um ein TPS-Long-Array mit 4 Elementen \`[5s, 1m, 5m, 15m]\` zu erhalten.</li>
                <li>Wenn auf \`false\` gesetzt, kannst du die \`getTPS\`-Methode verwenden, um ein TPS-Long-Array mit 3 Elementen \`[1m, 5m, 15m]\` zu erhalten.</li>
                </ul>
                <div class="tip custom-block">
                <p class="custom-block-title custom-block-title-default">Möchtest du tiefer eintauchen?</p>
                Wenn du die Leaf API für deine Plugins verwendest. Oder auf Leaf läufst und Reflection verwendest, um TPS zu erhalten, kannst du \`Bukkit#getTPSIncluding5SecondAverage\` verwenden, um das TPS-Array einschließlich 5-Sekunden-TPS \`[5s, 1m, 5m, 15m]\` zu erhalten.<br>
                Außerdem kannst du \`Bukkit#get5SecondTPSAverage\` verwenden, um den Durchschnittswert der 5-Sekunden-TPS als \`double\` zu erhalten.
                </div>`,
    },
    "lag-compensation": {
      "enable-for-lava": {
        desc: `Ob Lag-Kompensation für fließende Lava aktiviert werden soll.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`,
      },
      "enable-for-water": {
        desc: `Ob Lag-Kompensation für fließendes Wasser aktiviert werden soll.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`,
      },
      enabled: {
        desc: `Die Lag-Kompensation wurde entwickelt, um die Auswirkungen von Server-Lag-Spikes oder niedrigen TPS-Situationen auf das Gameplay zu mildern, was das grundlegende Spielerlebnis während des Lags sicherstellen könnte.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`,
      },
    },
    message: {
      "unknown-command": {
        desc: `Die Nachricht für unbekannte Befehle, die an den Spieler gesendet wird, wenn er einen unbekannten Befehl ausführt.<br>
                    Die Nachricht muss das [MiniMessage](https://docs.papermc.io/adventure/minimessage/format/)-Format verwenden.<br>
                    Wenn auf \`default\` gesetzt, wird die Vanilla-Nachricht für unbekannte Befehle verwendet.<br>
                    <br>
                    Verfügbare Platzhalter:
                    <ul>
                    <li>__\`<detail>\`__ - die detaillierten Informationen des unbekannten Befehls.</li>
                    </ul>
                    <div class="tip custom-block">
                    <p class="custom-block-title custom-block-title-default">API / Plugin-Freundlich</p>
                    Diese Funktion ist API- / Plugin-freundlich. Das bedeutet, dass diese Nachricht von Plugins überschrieben werden kann, die \`UnknownCommandEvent#message\` oder \`UnknownCommandEvent#setMessage\` verwenden.
                    </div>`,
      },
    },
    rebrand: {
      "server-gui-name": {
        desc: `Der Titel, der im Server-GUI-Fenster angezeigt wird, wenn du den Server ohne die Option \`--nogui\` im Start-Flag gestartet hast.`,
      },
      "server-mod-name": {
        desc: `Der Server-Markenname, der im F3-Debug-Menü des Clients und in der Server-MOTD angezeigt wird.`,
      },
    },
    "region-format-settings": {
      __desc__: `Linear ist ein Regionsdateiformat, das [zstd-Kompression](https://facebook.github.io/zstd/) anstelle von zlib in Vanilla Minecraft verwendet. Dieses Format spart etwa ~50% Speicherplatz.<br>
                Um das Linear-Regionsformat zu verwenden, stelle sicher, dass du die __[Linear Documentation](https://github.com/xymb-endcrystalme/LinearRegionFileFormatTools) gelesen__ und alle erforderlichen Schritte ausgeführt hast, und ändere dann \`region-format\` unten auf \`LINEAR\`.
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">Warnung</p>
                Experimentelle Funktion, es besteht ein potenzielles Risiko des Verlusts von Chunk-Daten. Erstelle ein Backup deines Servers, bevor du zu Linear wechselst.<br>
                Außerdem empfehlen wir die Verwendung von Linear nicht, da das Vanilla-ANVIL-Format (\`.mca\`) ausreichend ist. Leaf verwendet die refactored Version des Linear-Flush-Systems, die sicherer, aber langsamer beim Speichern von Chunks ist, um Datenverlust weniger wahrscheinlich zu machen. Dieser Kompromiss lohnt sich jedoch, da Daten von unschätzbarem Wert sind.
                </div>`,
      "flush-interval-seconds": {
        desc: `Wie oft der Server versucht, zwischengespeicherte Linear-Regionsdateidaten auf die Festplatte zu flushen (schreiben).<br>
                Häufigeres Flushen reduziert potenziellen Datenverlust bei einem Absturz, erhöht aber die Festplatten-I/O.<br>
                (Einheit: Sekunde)`,
      },
      "linear-compress-level": {
        desc: `Das Kompressionslevel der Linear-Regionsformatdatei.<br>
                    Dies hat nur Auswirkungen, wenn \`region-format\` oben auf \`LINEAR\` steht.<br>
                    <br>
                    <ul>
                    <li>Wenn auf ein höheres Level (bis zu \`22\`) gesetzt, bietet es bessere Kompressionsverhältnisse, erfordert jedoch deutlich mehr CPU-Zeit für die Kompression.</li>
                    <li>Wenn auf ein niedrigeres Level gesetzt, komprimiert es schneller, benötigt aber mehr Platz. Level 1 verwendet die schnellste und leichteste Kompression.</li>
                    </ul>`,
      },
      "region-format": {
        desc: `Spezifiziert das Format, das zum Speichern von Chunk-Daten in Regionsdateien verwendet wird.<br>
                    Verfügbare Regionsformate:<br>
                    <ul>
                    <li>\`MCA\`: Standardmäßiges Minecraft-ANVIL-Format unter Verwendung von zlib-Kompression.</li>
                    <li>\`LINEAR\`: Das Linear v1 Format. Die refactored Version von [EarthMe](https://github.com/MrHua269) hat das Linear-Flush-System behoben.</li>
                    </ul>`,
      },
      "throw-on-unknown-extension-detected": {
        desc: `Ob ein Fehler geworfen und der Server abstürzen soll, wenn eine unbekannte oder nicht übereinstimmende Regionsformat-Erweiterung beim Laden von Regionsdateien von der Festplatte erkannt wird.<br>
                    Dies kann Datenkorruption durch versehentlich konfigurierte falsche Regionsdateiformate in derselben Welt verhindern.<br>
                    <br>
                    Zum Beispiel:<br>
                    Wenn auf \`true\` gesetzt, stürzt der Server sofort ab, wenn \`.linear\`-Dateien geladen werden, während \`region-format\` oben auf \`MCA\` steht, oder umgekehrt.`,
      },
    },
    "remove-change-non-editable-sign-warning": {
      desc: `Ob der Server eine Warnmeldung ausgibt, wenn Spieler versuchen, ein Schild zu bearbeiten, das sie nicht bearbeiten dürfen.<br>
                Die Warnmeldung sieht so aus: \`Player [...] just tried to change non-editable sign\`.<br>
                Wenn auf \`true\` gesetzt, verhindert dies Konsolen-Spam, der durch Spieleraktionen oder andere Fälle verursacht wird.<br>
                <br>
                __⚡Empfohlener Wert: \`true\`__`,
    },
    "remove-spigot-check-bungee-config": {
      desc: `Ob der Spieler über einen Proxy auf den Backend-Server gelangen kann, ohne dass der Backend-Server den BungeeCord-Modus in \`spigot.yml\` aktiviert hat.<br>
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">Warnung</p>
                Es wird nicht empfohlen, diese Option zu ändern, es sei denn, du bist sicher, was du tust.<br>
                Und sie könnte in Zukunft entfernt werden.
                </div>`,
    },
    "remove-vanilla-username-check": {
      desc: `Ob die Vanilla-Benutzernamenprüfung entfernt werden soll, um __alle Zeichen__ als Benutzernamen zu erlauben, einschließlich Chinesisch usw. (Dies ist nur für Offline-Server nützlich).<br>
                Wenn auf \`true\` gesetzt, können Spieler mit einem nicht-englischen Namen dem Server beitreten.`,
    },
    "secure-seed": {
      enabled: {
        desc: `Ob der sichere Seed (Secure Seed) verwendet werden soll.<br>
                    <br>
                    Der sichere Seed stellt sicher, dass alle Erze und Strukturen mit einem 1024-Bit-Seed unter Verwendung einer kryptografischen Hash-Funktion mit hoher Sicherheit generiert werden, anstatt einen 64-Bit-Seed wie in Vanilla zu verwenden. Dies schützt die Struktur-Seeds durch rechnerische Sicherheit und macht das Seed-Cracking nahezu unmöglich.<br>
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">Warnung</p>
                    Der sichere Seed ändert grundlegend die Positionen von Erzen und Strukturen im Vergleich zu Vanilla.<br>
                    Dies gilt nur für neu generierte Chunks. Daher musst du eine neue Welt vorbereiten, wenn du diese Option aktivieren möchtest.<br>
                    Sobald diese Option aktiviert ist, kannst du sie nicht deaktivieren, um zur Vanilla-Generierung zurückzukehren, es sei denn, du generierst die gesamte Welt vor, da neu generierte Chunks sonst Terrain-Unstimmigkeiten aufweisen.
                    </div>`,
      },
    },
    sentry: {
      __desc__: `[Sentry](https://sentry.io/welcome/) ist ein Anwendungsüberwachungsdienst für verbesserte Fehlerprotokollierung und -verfolgung. Hilft dem Server-Entwicklerteam bei der besseren Wartung.<br>
                <br>
                Nach der Aktivierung der Sentry-Integration für deinen Server musst du keine langen Logs mehr manuell prüfen, um Fehler zu finden. Sentry kann Fehler sammeln, die auf deinem Server aufgetreten sind, ermöglicht es dir, Fehler im Web-Panel von Sentry zu verfolgen, und hilft dir, diese einfacher und schneller zu lokalisieren und zu beheben.<br>
                <br>
                Siehe __[How to Setup Sentry](../how-to/setup-sentry)__, um zu erfahren, wie du es einrichtest und den DSN-Key für \`sentry.dsn\` unten erhältst.<br>`,
      dsn: {
        desc: `Der DSN-Key deines Sentry.<br>
                    Wenn ein leerer Wert \`''\` angegeben wird, ist Sentry deaktiviert.`,
      },
      "log-level": {
        desc: `Logs mit einem Level höher oder gleich diesem Level werden aufgezeichnet.<br>
                    Die gültigen Werte für diese Option sind: \`"WARN"\`, \`"ERROR"\` und \`"FATAL"\`.`,
      },
      "only-log-thrown": {
        desc: `Ob Sentry nur Logs mit Javas \`Throwable\` aufzeichnet.`,
      },
    },
  },
  network: {
    __desc__: `Dieser Abschnitt enthält Funktionen, die sich auf das Server-Netzwerk beziehen.`,
    OptimizeNonFlushPacketSending: {
      desc: `Ob das Senden von nicht-geflushten Paketen optimiert werden soll, indem Nettys [\`lazyExecute\`](https://netty.io/4.2/api/io/netty/util/concurrent/SingleThreadEventExecutor.html#lazyExecute(java.lang.Runnable))-Methode verwendet wird. Dies kann Thread-Konkurrenz und Wakeup-Aufrufe für bestimmte Arten von Netzwerkoperationen reduzieren.
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">Warnung</p>
                Diese Option ist bekannt dafür, __INKOMPATIBEL__ mit ProtocolLib zu sein und kann Probleme mit anderen Plugins verursachen, die Netzwerkpakete intensiv manipulieren.<br>
                Erfordert einen Neustart des Servers, um wirksam zu werden. Mit extremer Vorsicht verwenden.
                </div>`,
    },
    "async-switch-state": {
      desc: `Ob die Logik zum Umschalten des Verbindungsstatus des Spielers asynchron verarbeitet werden soll. Dies kann das Problem der Blockierung des Haupt-Threads beheben, das durch die Nutzung von Exploits aufgrund eines Designfehlers in der Vanilla-Logik verursacht wird.`,
    },
    "chat-message-signature": {
      desc: `Ob die Chatnachrichten-Signatur aktiviert werden soll, die in Minecraft 1.19.1 eingeführt wurde.<br>
                <ul>
                <li>Wenn auf \`true\` gesetzt, werden Nachrichten signiert und können wie in Vanilla gemeldet werden.</li>
                <li>Wenn auf \`false\` gesetzt, ist die Chat-Signatur deaktiviert. Spieler können Nachrichten nicht melden, und das Pop-up mit der Warnung vor unsicheren Nachrichten wird deaktiviert, wenn der Spieler dem Server beitritt.</li>
                </ul>
                <br>
                __⚡Empfohlener Wert: \`false\`__ (Nur für Offline-Mode-Server oder Server, die alternative Moderationsmethoden haben)`,
    },
    "protocol-support": {
      __desc__: `Dieser Abschnitt enthält Funktionen, die zusätzliche Protokoll-Unterstützung für einige QoL- / Utility-Mods bieten.<br>
                <br>
                Die zusätzliche Protokoll-Unterstützung funktioniert nur, wenn eine entsprechende clientseitige Mod installiert ist. Das bedeutet, wenn eine bestimmte Protokoll-Unterstützung aktiviert ist und ein Spieler diese Mod auf dem Client installiert hat, kann er die zusätzlichen Funktionen nutzen, die in jeder Konfiguration unten beschrieben sind. Aber für Spieler, die keine entsprechende Mod installiert haben, bleibt alles wie zuvor.
                <div class="tip custom-block">
                <p class="custom-block-title custom-block-title-default">Achtung</p>
                Die Protokoll-Unterstützung kann zu Inkompatibilität mit [ViaVersion](https://modrinth.com/plugin/viaversion) führen.<br>
                Wir empfehlen Spielern, einen Client zu verwenden, der dieselbe Version wie der Server-Core hat, und die neueste entsprechende Mod zu installieren; andernfalls können sie dem Server möglicherweise nicht beitreten.
                </div>`,
      "appleskin-protocol": {
        desc: `Ob die [AppleSkin](https://modrinth.com/mod/appleskin)-Protokoll-Unterstützung aktiviert werden soll.<br>
                    Wenn auf \`true\` gesetzt, können Spieler, die die AppleSkin-Mod installiert haben, die genauen Sättigungs-/Erschöpfungswerte auf dem Client anzeigen lassen.`,
      },
      "appleskin-protocol-sync-tick-interval": {
        desc: `Wie oft der Server AppleSkin-Daten mit Clients synchronisieren soll, die AppleSkin installiert haben.<br>
                    Dies hat nur Auswirkungen, wenn \`appleskin-protocol\` oben \`true\` ist.<br>
                    (Einheit: Tick, Standardwert 20 Ticks = 1 Sekunde)`,
      },
      "asteorbar-protocol": {
        desc: `Ob die [AsteorBar](https://modrinth.com/mod/asteorbar)-Protokoll-Unterstützung aktiviert werden soll.<br>
                    Wenn auf \`true\` gesetzt, können Spieler, die die AsteorBar-Mod installiert haben, die genauen Sättigungs-/Erschöpfungswerte auf dem Client anzeigen lassen.`,
      },
      "chatimage-protocol": {
        desc: `Ob die [ChatImage](https://modrinth.com/mod/chatimage)-Protokoll-Unterstützung aktiviert werden soll.<br>
                    Wenn auf \`true\` gesetzt, können Spieler, die die ChatImage-Mod installiert haben, das Bild sehen, das von anderen im CICode-Format gesendet wurde.`,
      },
      "do-a-barrel-roll-allow-thrusting": {
        desc: `Ob Spielern erlaubt werden soll, die Option \`enable_thrust\` in ihrer Client-Konfiguration zu aktivieren.`,
      },
      "do-a-barrel-roll-force-enabled": {
        desc: `Ob die Mod für alle Spieler, die diese Mod installiert haben, zwangsweise aktiviert werden soll, unabhängig von ihrer Client-Konfiguration.`,
      },
      "do-a-barrel-roll-force-installed": {
        desc: `Ob Spieler abgewiesen werden sollen, wenn sie diese Mod nicht in ihrem Client installiert haben.`,
      },
      "do-a-barrel-roll-installed-timeout": {
        desc: `Die Zeitspanne, die gewartet werden soll, bis ein Client auf das \`do_a_barrel_roll:config_sync\`-Paket antwortet.<br>
                    (Einheit: Tick)<br>
                    Wenn auf \`true\` gesetzt, werden Spieler, die diese Mod nicht in ihrem Client installiert haben, nach Ablauf dieses Timeouts gekickt.`,
      },
      "do-a-barrel-roll-protocol": {
        desc: `Ob die [Do a Barrel Roll](https://modrinth.com/mod/do-a-barrel-roll)-Protokoll-Unterstützung aktiviert werden soll.<br>
                    Wenn auf \`true\` gesetzt, können die visuellen Effekte von Do a Barrel Roll mit anderen Spielern synchronisiert werden, die diese Mod installiert haben.`,
      },
      "jade-protocol": {
        desc: `Ob die [Jade](https://modrinth.com/mod/jade)-Protokoll-Unterstützung aktiviert werden soll.<br>
                    Wenn auf \`true\` gesetzt, können Spieler, die die Jade-Mod installiert haben, Item-Informationen in Lagercontainern, den Fortschritt von Öfen und Brauständen, Nahrung auf dem Lagerfeuer, Bienendaten im Bienenstock und weitere vanilla-freundliche Funktionen anzeigen lassen.`,
      },
      "syncmatica-protocol": {
        desc: `Ob die [Syncmatica](https://modrinth.com/mod/syncmatica)-Protokoll-Unterstützung aktiviert werden soll.<br>
                    Wenn auf \`true\` gesetzt, können Spieler, die die Syncmatica-Mod installiert haben, ihre [Litematica](https://modrinth.com/mod/litematica)-Schematic-Dateien hochladen oder geteilte Schematic-Dateien vom Server herunterladen. Jeder Spieler mit installierter Syncmatica-Mod kann auf geteilte Schematics zugreifen, die von anderen hochgeladen wurden.`,
      },
      "syncmatica-quota": {
        desc: `Ob das maximale Dateigrößenlimit für jede geteilte Schematic-Datei der Litematica-Mod aktiviert werden soll.`,
      },
      "syncmatica-quota-limit": {
        desc: `Die maximale Dateigröße jeder geteilten Schematic-Datei, die auf den Server hochgeladen wird.<br>
                    (Einheit: Byte, Standardwert 40.000.000 Bytes ≈ 38 MB)`,
      },
      "xaero-map-protocol": {
        desc: `Ob die [XaeroMap](https://modrinth.com/mod/xaeros-minimap)-Protokoll-Unterstützung aktiviert werden soll.<br>
                    Wenn auf \`true\` gesetzt, können Spieler, die Xaero's MiniMap Mod oder Xaero's WorldMap Mod installiert haben, Koordinatenpunkte und Todespunkte basierend auf der \`protocol-support.xaero-map-server-id\` des Servers unten speichern.`,
      },
      "xaero-map-server-id": {
        desc: `Eindeutige Nummer-ID für XaeroMap, um den Server zu identifizieren.<br>
                    Dies kann verhindern, dass Punkte gelöscht/aktualisiert werden, wenn sich der Servername oder die IP-Adresse ändert. Ändere diesen Wert bei Bedarf.<br>
                    Dieser Wert wird beim ersten Serverstart zufällig generiert.`,
      },
    },
  },
  performance: {
    __desc__: `Dieser Abschnitt enthält Leistungsoptimierungen, die darauf abzielen, unnötige Berechnungen zu reduzieren oder effizientere Methoden zur Optimierung des Servers zu verwenden.`,
    "cache-biome": {
      advancements: {
        desc: `Ob das Biom in der Berechnungslogik für Spieler-Fortschritte (Advancements) gecacht werden soll.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`,
      },
      enabled: {
        desc: `Ob die Biom-Daten der Blockposition gecacht werden sollen, anstatt das Biom bei jeder Suche neu zu berechnen.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\` (Erfordert auch das Aktivieren der Optionen unten)__`,
      },
      "mob-spawning": {
        desc: `Ob das Biom in der Mob-Spawning-Logik gecacht werden soll.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`,
      },
    },
    "cache-eye-fluid-status": {
      desc: `Ob die \`Entity#isEyeInFluid\`-Methode gecacht werden soll, um die Leistung zu verbessern und die Speichernutzung zu reduzieren.<br>
                <br>
                __⚡Empfohlener Wert: \`false\`__`,
    },
    "check-survival-before-growth": {
      "cactus-check-survival": {
        desc: `Ob überprüft werden soll, ob der Kaktus überleben kann, bevor versucht wird, ihn wachsen zu lassen.<br>
                    Dies kann die Leistung verbessern, wenn riesige Kaktusfarmen auf dem Server existieren.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`,
      },
    },
    "count-all-chunks-for-ticking": {
      desc: `Ob der zusätzliche Check übersprungen werden soll, der prüft, ob Ticking-Chunks während des Mob-Spawnings in der Nähe des Spielers sind.<br>
                <br>
                Die Kosten für diesen Check können hoch sein, wenn es eine große Anzahl von Spielern und geladenen Chunks gibt. Es ist besser, diesen Check zu überspringen, da Ticking-Chunks meistens sowieso in der Nähe oder um Spieler herum sind. Es ist auch zu erwarten, dass das Mob-Spawning in einigen Randbedingungen leicht zunimmt.
                <br>
                __⚡Empfohlener Wert: \`true\`__`,
    },
    "create-snapshot-on-retrieving-blockstate": {
      desc: `Ob standardmäßig ein Snapshot (Kopie) der TileEntity- / BlockState-Daten erstellt werden soll, wenn Plugins diese abrufen.<br>
                <br>
                Einige Plugins rufen möglicherweise \`getInventory().getHolder()\` auf, um den Halter eines Inventars zu erhalten, was den Zugriff auf den BlockState beinhaltet.<br>
                Wenn es beispielsweise viele Trichter gibt und Plugins diese Methode beim Abhören einiger Events (z. B. Hopper-bezogene Events, häufige Aufrufe) aufrufen, ist das Neuerstellen des BlockStates und das Parsen von Item-Stacks bei massiven und häufigen Aufrufen sehr aufwändig.<br>
                Siehe Paper's [API-to-get-a-BlockState-without-a-snapshot.patch#L6](https://github.com/PaperMC/Paper-archive/blob/b48403bd69f534ffd43fe2afb4e8e1f1ffa95fe1/patches/server/0160-API-to-get-a-BlockState-without-a-snapshot.patch#L6) für weitere Informationen.
                <ul>
                <li>Wenn auf \`true\` gesetzt, wird immer ein Snapshot (Kopie) des BlockState erstellt, wenn das Plugin entsprechende Methoden aufruft.</li>
                <li>Wenn auf \`false\` gesetzt, wird der echte BlockState direkt abgerufen, es sei denn, das Plugin fordert explizit einen Snapshot an. Die Leistung verbessert sich, aber es besteht das Risiko, dass der Blockstatus aufgrund schlechten Plugin-Designs modifiziert wird.</li>
                </ul>
                <br>
                __⚡Empfohlener Wert: \`false\` (Nur wenn du spezifische Lags wie oben beschrieben feststellst)__`,
    },
    dab: {
      __desc__: `Dynamic Activation of Brain, auch bekannt als DAB, optimiert das 'Gehirn' (Brain) von Entities, indem die Frequenz ihres Brain-Tickings verringert wird, wenn sie weit von Spielern entfernt sind. Dies ist ein lohnender Kompromiss zur Leistungsverbesserung, wenn viele Entities vorhanden sind.`,
      "activation-dist-mod": {
        desc: `Die Tick-Frequenz, die definiert, wie stark die Distanz die Tick-Frequenz eines Entities beeinflusst. \`freq = (distanceToPlayer^2) / (2^value)\`.
                    <ul>
                    <li>Wenn du möchtest, dass weiter entfernte Entities __weniger__ oft ticken, verwende \`7\`.</li>
                    <li>Wenn du möchtest, dass weiter entfernte Entities __öfter__ ticken, versuche \`9\`.</li>
                    </ul>
                    <br>
                    __⚡Empfohlener Wert: \`7\`__`,
      },
      "blacklisted-entities": {
        desc: `Eine Liste von Entities, die nicht von DAB betroffen sein sollen.<br>
                    <br>
                    Einige Survival-Server haben Mob-Farmen, die darauf angewiesen sind, dass Mobs ein Ziel haben. Diese Art von "Pfadfindungs"-Mob-Farm kann durch DAB beeinträchtigt werden. Diese Situation kann gelöst werden, indem spezifische Mobs der Mob-Farm zu dieser DAB-Blacklist hinzugefügt werden.<br>
                    Wenn bestimmte Mob-Farmen auf deinem Server defekt sind, Mobs einfrieren und sich nicht bewegen, und du nicht sicher bist, ob dies durch DAB verursacht wird, kannst du versuchen, sie zu dieser Liste hinzuzufügen, um zu sehen, ob das Problem dadurch behoben wird.<br>
                    <br>
                    Format: \`[villager]\` oder \`[villager, zombified_piglin]\` (Du findest alle Entity-Typen in [Paper's Javadoc](https://jd.papermc.io/paper/1.21.4/org/bukkit/entity/EntityType.html)).<br>
                    <br>
                    [💡 Du möchtest tiefer eintauchen?](guides/dab-blacklist-format)`,
      },
      "dont-enable-if-in-water": {
        desc: `Ob nicht-aquatische Entities im Wasser von DAB ausgeschlossen werden sollen. Dies kann [Pufferfish#58](https://github.com/pufferfish-gg/Pufferfish/issues/58) beheben.<br>
                    Wenn auf \`true\` gesetzt, könnte dies verhindern, dass Entities im Wasser ersticken, wenn sie weit vom Spieler entfernt sind.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`,
      },
      enabled: {
        desc: `Ob DAB aktiviert werden soll.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__
                    <table>
                    <tr><td><b>Werte für Ziele</b></td><td></td></tr>
                    <tr><td><i>Optimierung</i></td><td><code>true</code></td></tr>
                    <tr><td><i>Vanilla-Verhalten</i></td><td><code>false</code> (oder siehe <code>dab.blacklisted-entities</code> unten für mehr)</td></tr>
                    </table>`,
      },
      "max-tick-freq": {
        desc: `Die maximale Tick-Zeit definiert, wie oft das am weitesten entfernte Entity seine Pathfinder und Verhaltensweisen getickt bekommt.<br>
                    (Einheit: Tick, Standardwert 20 Ticks = 1s)`,
      },
      "start-distance": {
        desc: `Die Distanz bestimmt, wie weit ein Entity vom Spieler entfernt sein muss, um von DAB beeinflusst zu werden.<br>
                    (Einheit: Block)<br>
                    <br>
                    __⚡Empfohlener Wert: \`8\`__`,
      },
    },
    "dont-save-entity": {
      "dont-save-falling-block": {
        desc: `Ob das Speichern von fallenden Blöcken beim Entladen von Chunks deaktiviert werden soll.<br>
                    Dies kann potenzielle Probleme mit verbuggten oder duplizierten fallenden Blöcken (Sand, Kies usw.) nach Server-Neustarts oder Chunk-Laden verhindern, insbesondere wenn diese durch Lags verursacht wurden.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`,
      },
      "dont-save-primed-tnt": {
        desc: `Ob das Speichern von gezündetem TNT beim Entladen von Chunks deaktiviert werden soll.<br>
                    Dies kann verhindern, dass Maschinen oder Redstone-Bauten durch TNT explodieren, wenn der Spieler versehentlich die Verbindung trennt oder der Chunk entladen wird, während der Spieler weit weg ist. Nützlich für Redstone-/Technik-/Survival-Server, die Maschinen mit TNT verwenden.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`,
      },
    },
    "enable-cached-minecraft-to-bukkit-entitytype-convert": {
      desc: `Ob das Ergebnis der Umwandlung von *Minecraft EntityType* zu *Bukkit EntityType* zwischengespeichert (gecached) werden soll. Diese Umwandlung kann etwas aufwändig sein, insbesondere in der Spawning-Logik, daher kann das Caching die Leistung leicht verbessern.<br>
                <br>
                __⚡Empfohlener Wert: \`true\`__`,
    },
    "faster-random-generator": {
      "enable-for-worldgen": {
        desc: `Ob der schnellere Zufallsgenerator für die Weltgenerierung verwendet werden soll.<br>
                    <ul>
                    <li>Wenn auf \`true\` gesetzt, verwenden \`Random\`-Aufrufe, die an der Weltgenerierung beteiligt sind, den schnelleren Zufallsgenerator, den du oben in \`random-generator\` gewählt hast. Die Weltgenerierung wird sich leicht von Vanilla unterscheiden.</li>
                    <li>Wenn auf \`false\` gesetzt, verwenden \`Random\`-Aufrufe bei der Weltgenerierung den alten Zufallsgenerator von Vanilla.</li>
                    </ul>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__
                    <table>
                    <tr><td><b>Werte für Ziele</b></td><td></td></tr>
                    <tr><td><i>Optimierung</i></td><td><code>true</code></td></tr>
                    <tr><td><i>Vanilla-Verhalten</i></td><td><code>false</code></td></tr>
                    </table>`,
      },
      enabled: {
        desc: `Ob der schnellere Zufallsgenerator (Random Generator), der in JDK 17 eingeführt wurde, verwendet werden soll.<br>
                    Zufall wird fast überall in Minecraft verwendet; dies zu aktivieren kann eine ordentliche Leistungsverbesserung bringen.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__
                    <div class="tip custom-block">
                    <p class="custom-block-title custom-block-title-default">Achtung</p>
                    Dies erfordert eine JVM, die \`RandomGenerator\` unterstützt. Einige JREs unterstützen dies nicht.
                    </div>`,
      },
      "random-generator": {
        desc: `Der spezifische Algorithmus des Zufallsgenerators, der verwendet werden soll.<br>
                    Verfügbare Zufallsgeneratoren findest du unter [Random Number Generators in Java](https://www.baeldung.com/java-17-random-number-generators#1-api-design-1) oder [JEP 356](https://openjdk.org/jeps/356).<br>
                    <br>
                    __⚡Empfohlener Wert: \`Xoroshiro128PlusPlus\`__`,
      },
      "use-direct-implementation": {
        desc: `Ob eine direkte Random-Implementierung (LCG ohne Synchronisation) verwendet werden soll, anstatt an Javas RandomGenerator zu delegieren.<br>
                    Dies kann die Leistung verbessern, ändert aber möglicherweise das RNG-Verhalten.<br>
                    <br>
                    __⚡Empfohlener Wert: \`false\`__`,
      },
      "use-legacy-random-for-slime-chunk": {
        desc: `Ob die alte Zufallsquelle (\`java.util.Random\`) für die Slime-Chunk-Generierung verwendet werden soll, um dem Vanilla-Verhalten zu folgen.<br>
                    Wenn dein Server bestehende Slime-Farmen oder ähnliche Einrichtungen hat, die Slime-Chunks benötigen, aktiviere dies; andernfalls wird die Position der Slime-Chunks verschoben sein.<br>
                    <br>
                    __⚡Empfohlener Wert: (Hängt von deinem Servertyp ab, siehe \`Werte für Ziele\` unten für mehr)__
                    <table>
                    <tr><td><b>Werte für Ziele</b></td><td></td></tr>
                    <tr><td><i>Optimierung</i></td><td><code>false</code></td></tr>
                    <tr><td><i>Vanilla-Verhalten</i></td><td><code>true</code></td></tr>
                    </table>`,
      },
      "warn-for-slime-chunk": {
        desc: `Ob der Server beim Start eine Warnmeldung ausgibt, wenn der schnellere Zufallsgenerator für die Slime-Chunk-Generierung aktiviert ist.`,
      },
    },
    "faster-structure-gen-future-sequencing": {
      desc: `Ob eine schnellere Aufgaben-Sequenzierung für die Generierung von Strukturen verwendet werden soll.<br>
                <br>
                __⚡Empfohlener Wert: \`true\`__
                <div class="tip custom-block">
                <p class="custom-block-title custom-block-title-default">Achtung</p>
                Dies kann in seltenen Grenzfällen zu einer inkonsistenten Reihenfolge zukünftiger Compose-Tasks führen, was unterschiedliche Ergebnisse bei der Strukturgenerierung zur Folge haben kann.
                </div>`,
    },
    "inactive-goal-selector-throttle": {
      desc: `Ob die [goal selector](https://maven.fabricmc.net/docs/yarn-1.21.4+build.8/net/minecraft/entity/ai/goal/GoalSelector.html)-Berechnungen für Entities gedrosselt werden sollen, die inaktiv sind (typischerweise weit weg von Spielern).<br>
                Anstatt den Goal Selector jeden Tick zu ticken, tickt er weniger häufig jede Sekunde. Dies kann die Leistung leicht verbessern, hat aber geringfügige Auswirkungen auf das Gameplay.<br>
                <br>
                __⚡Empfohlener Wert: \`true\`__
                <table>
                <tr><td><b>Werte für Ziele</b></td><td></td></tr>
                <tr><td><i>Optimierung</i></td><td><code>true</code></td></tr>
                <tr><td><i>Vanilla-Verhalten</i></td><td><code>false</code></td></tr>
                </table>`,
    },
    "only-tick-items-in-hand": {
      desc: `Ob Items nur getickt oder aktualisiert werden sollen, wenn der Spieler sie in der Haupt- oder Nebenhand hält, anstatt das gesamte Inventar zu ticken.<br>
                Dies betrifft derzeit nur Kompass- und Karten-Items.<br>
                <br>
                __⚡Empfohlener Wert: \`true\`__`,
    },
    "optimise-random-tick": {
      desc: `Ob das neu geschriebene Random-Ticking-System verwendet werden soll.<br>
                <br>
                Dieses neu geschriebene System nutzt gewichtete Statistiken und Stichproben, um tickbare Blöcke in aktiven Chunks auszuwählen. Es kann die unnötigen Kosten reduzieren, die durch das häufige Auswählen nicht-tickbarer Positionen in der Vanilla-Random-Ticking-Logik entstehen.<br>
                <br>
                __⚡Empfohlener Wert: \`true\`__
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">Experimentell</p>
                Experimentelle Funktion, wird aktiv getestet, bitte melde alle Fehler, die auftreten.
                </div>`,
    },
    "optimize-block-entities": {
      desc: `Ob die effizientere Map-Datenstruktur für den Block-Entity-Ticker-Speicher verwendet werden soll.<br>
                <br>
                __⚡Empfohlener Wert: \`true\`__`,
    },
    "optimize-player-movement": {
      desc: `Ob unnötige Blockkanten-Checks bei der Spielerbewegung übersprungen und redundante Aktualisierungen der Sichtweite vermieden werden sollen.<br>
                <br>
                __⚡Empfohlener Wert: \`true\`__`,
    },
    "optimized-powered-rails": {
      desc: `Ob optimierte Antriebsschienen (Powered Rails) verwendet werden sollen. Nutzt eine komplett neu geschriebene Version der Iterationslogik für Antriebsschienen, die das Vanilla-Verhalten beibehält und eine 4x schnellere Leistung erreichen kann.<br>
                <br>
                __⚡Empfohlener Wert: \`true\`__`,
    },
    "reduce-packets": {
      __desc__: `Dieser Abschnitt ist für Funktionen zur Reduzierung nutzloser Pakete.`,
      "reduce-entity-move-packets": {
        desc: `Ob nutzlose Entity-Bewegungspakete, die an Spieler gesendet werden (z. B. kleine Bewegungen), reduziert werden sollen.<br>
                    Dies kann Bandbreite sparen und die clientseitige Verarbeitungslast verringern, was Bewegungen bei hoher Entity-Anzahl oder leichten Lags möglicherweise flüssiger erscheinen lässt.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`,
      },
    },
    "skip-ai-for-non-aware-mob": {
      desc: `Ob AI-Ticks für Mobs, die sowohl *inaktiv* als auch *unaware* (nicht aufmerksam) sind, komplett übersprungen werden sollen.<br>
                Nicht aufmerksame Mobs, die auf diese Weise optimiert wurden, führen keine eigenständigen Aktionen aus oder reagieren nicht, bis sie wieder aktiv werden, siehe [Mob.html#setAware(boolean)](https://jd.papermc.io/paper/1.21.4/org/bukkit/entity/Mob.html#setAware(boolean)) für weitere Informationen.<br>
                <br>
                __⚡Empfohlener Wert: \`true\`__
                <table>
                <tr><td><b>Werte für Ziele</b></td><td></td></tr>
                <tr><td><i>Optimierung</i></td><td><code>true</code></td></tr>
                <tr><td><i>Vanilla-Verhalten</i></td><td><code>false</code></td></tr>
                </table>`,
    },
    "skip-map-item-data-updates-if-map-does-not-have-craftmaprenderer": {
      desc: `Ob die Aktualisierung von Karten-Item-Daten übersprungen werden soll, wenn die Karte keinen Renderer (\`CraftMapRenderer\`) hat.<br>
                Dies kann die Leistung verbessern, wenn Plugins wie ImageMap verwendet werden, die viele benutzerdefinierte Karten erstellen.<br>
                <br>
                __⚡Empfohlener Wert: \`true\`__
                <table>
                <tr><td><b>Werte für Ziele</b></td><td></td></tr>
                <tr><td><i>Optimierung</i></td><td><code>true</code></td></tr>
                <tr><td><i>Vanilla-Verhalten</i></td><td><code>false</code></td></tr>
                </table>
                <div class="tip custom-block">
                <p class="custom-block-title custom-block-title-default">Achtung</p>
                Dies kann dazu führen, dass Vanilla-Karten-Item-Daten nicht mehr aktualisiert werden.
                </div>`,
    },
    "throttle-hopper-when-full": {
      enabled: {
        desc: `Ob Versuche von Trichtern (Hopper), Items zu übertragen, gedrosselt werden sollen, wenn der Zielcontainer voll ist.<br>
                    Verhindert, dass der Trichter jeden Tick versucht, Items zu verschieben, selbst wenn dies immer wieder fehlschlägt.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__
                    <table>
                    <tr><td><b>Werte für Ziele</b></td><td></td></tr>
                    <tr><td><i>Optimierung</i></td><td><code>true</code></td></tr>
                    <tr><td><i>Vanilla-Verhalten</i></td><td><code>false</code></td></tr>
                    </table>`,
      },
      "skip-ticks": {
        desc: `Wie viele Ticks ein Trichter warten soll, bevor er erneut versucht, Items zu verschieben, wenn der Zielcontainer voll ist.<br>
                    (Einheit: Tick)<br>
                    Nur aktiv, wenn \`throttle-hopper-when-full.enabled\` oben \`true\` ist.<br>
                    Wenn ein Wert &leq; \`0\` angegeben wird, ist diese Drosselungsfunktion deaktiviert.<br>
                    <br>
                    __⚡Empfohlener Wert: \`8\`__
                    <table>
                    <tr><td><b>Werte für Ziele</b></td><td></td></tr>
                    <tr><td><i>Optimierung</i></td><td><code>8</code></td></tr>
                    <tr><td><i>Vanilla-Verhalten</i></td><td><code>8</code></td></tr>
                    </table>`,
      },
    },
    "throttle-mob-spawning": {
      ambient: {
        "min-failed": {
          desc: `Die minimalen fehlgeschlagenen Spawn-Versuche für ambiente Mobs (Fledermäuse).`,
        },
        "spawn-chance": {
          desc: `Die Spawn-Chance für ambiente Mobs (Fledermäuse) nach Erreichen des \`min-failed\`-Wertes oben.`,
        },
      },
      axolotls: {
        "min-failed": {
          desc: `Die minimalen fehlgeschlagenen Spawn-Versuche für Axolotl.`,
        },
        "spawn-chance": {
          desc: `Die Spawn-Chance für Axolotl nach Erreichen des \`min-failed\`-Wertes oben.`,
        },
      },
      creature: {
        "min-failed": {
          desc: `Die minimalen fehlgeschlagenen Spawn-Versuche für passive Kreaturen (Tiere).`,
        },
        "spawn-chance": {
          desc: `Die Spawn-Chance für passive Kreaturen (Tiere) nach Erreichen des \`min-failed\`-Wertes oben.`,
        },
      },
      enabled: {
        desc: `Ob Mob-Spawning in Chunks übersprungen werden soll, die wiederholt beim Spawnen von Mobs über den konfigurierten \`min-failed\`-Wert hinaus fehlgeschlagen sind.<br>
                    Sobald die Mindestanzahl fehlgeschlagener Spawn-Versuche erreicht ist, wird der Server den konfigurierten Wert von \`spawn-chance\`% nutzen, um bestimmte Spawn-Versuche zu verlangsamen.<br>
                    Fehlgeschlagene Spawn-Versuche werden nicht gezählt, wenn Spawn-Limits erreicht sind, und der Fehlerzähler wird nach einem erfolgreichen Spawn zurückgesetzt.`,
      },
      misc: {
        "min-failed": {
          desc: `Die minimalen fehlgeschlagenen Spawn-Versuche für sonstige Entities.`,
        },
        "spawn-chance": {
          desc: `Die Spawn-Chance für sonstige Entities nach Erreichen des \`min-failed\`-Wertes oben.`,
        },
      },
      monster: {
        "min-failed": {
          desc: `Die minimalen fehlgeschlagenen Spawn-Versuche für feindliche Monster.`,
        },
        "spawn-chance": {
          desc: `Die Spawn-Chance für feindliche Monster nach Erreichen des \`min-failed\`-Wertes oben.`,
        },
      },
      underground_water_creature: {
        "min-failed": {
          desc: `Die minimalen fehlgeschlagenen Spawn-Versuche für Unterwasser-Kreaturen (Leuchttintenfisch).`,
        },
        "spawn-chance": {
          desc: `Die Spawn-Chance für Unterwasser-Kreaturen (Leuchttintenfisch) nach Erreichen des \`min-failed\`-Wertes oben.`,
        },
      },
      water_ambient: {
        "min-failed": {
          desc: `Die minimalen fehlgeschlagenen Spawn-Versuche für ambiente Wassermobs (Tropenfische).`,
        },
        "spawn-chance": {
          desc: `Die Spawn-Chance für ambiente Wassermobs (Tropenfische) nach Erreichen des \`min-failed\`-Wertes oben.`,
        },
      },
      water_creature: {
        "min-failed": {
          desc: `Die minimalen fehlgeschlagenen Spawn-Versuche für Wasserkreaturen (Tintenfisch, Delfine).`,
        },
        "spawn-chance": {
          desc: `Die Spawn-Chance für Wasserkreaturen (Tintenfisch, Delfine) nach Erreichen des \`min-failed\`-Wertes oben.`,
        },
      },
    },
    "use-virtual-thread-for-async-chat-executor": {
      desc: `Ob der in JDK 21 eingeführte [Virtual Thread](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html) für den Async Chat Executor verwendet werden soll.<br>
                <br>
                __⚡Empfohlener Wert: \`true\`__`,
    },
    "use-virtual-thread-for-async-scheduler": {
      desc: `Ob der in JDK 21 eingeführte [Virtual Thread](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html) für den CraftAsyncScheduler verwendet werden soll, was die Leistung von Plugins verbessern könnte, die den asynchronen Scheduler von Bukkit stark nutzen.<br>
                <br>
                __⚡Empfohlener Wert: \`true\` (Nur wenn alle Plugins Virtual Threads unterstützen)__`,
    },
    "use-virtual-thread-for-profile-executor": {
      desc: `Ob der in JDK 21 eingeführte [Virtual Thread](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html) für den Profile Executor verwendet werden soll, der das Abrufen von Spielerprofilen und Schädel-Skins handhabt.<br>
                <br>
                __⚡Empfohlener Wert: \`false\`__`,
    },
    "use-virtual-thread-for-user-authenticator": {
      desc: `Ob der in JDK 21 eingeführte [Virtual Thread](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html) für den User Authenticator Service verwendet werden soll, der die Premium-Spieler-Beitrittsverifizierung handhabt.<br>
                <br>
                __⚡Empfohlener Wert: \`true\`__`,
    },
  },
}

export default de
