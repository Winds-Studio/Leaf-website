import type { ConfigRoot } from "@/.vitepress/theme/components/config/types";

const config: ConfigRoot = {
    "config-version": {
        default: "3.0"
    },

    async: {
        __desc__:
            "Dieser Abschnitt enthält asynchrone Funktionen, die dazu dienen, die Last auf dem Haupt-Thread (Server-Thread) zu verringern, indem Aufgaben asynchron verarbeitet werden.",
        "async-chunk-send": {
            enabled: {
                default: false,
                desc: `Ob das Packen und Senden von Chunk-Paketen asynchron erfolgen soll.<br>
                    Dies kann die Last auf dem Haupt-Thread erheblich reduzieren, insbesondere wenn viele Spieler gleichzeitig Chunks laden (z. B. beim Beitreten, Teleportieren oder schnellen Fliegen).<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`
            }
        },
        "async-mob-spawning": {
            enabled: {
                default: true,
                desc: `Ob Mob-Spawning asynchron erfolgen soll.<br>
                    <br>
                    Auf Servern mit vielen Entities kann dies die Leistung um bis zu ~15% verbessern. Damit dies funktioniert, muss in der Paper-Config \`per-player-mob-spawns\` auf \`true\` gesetzt sein.<br>
                    Anmerkung: Dies spawnt Mobs nicht tatsächlich asynchron (das wäre sehr unsicher). Es lagert lediglich einige teure Berechnungen aus, die für das Mob-Spawning erforderlich sind.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`
            }
        },
        "async-pathfinding": {
            enabled: {
                default: false,
                desc: `Ob die Berechnung der Mob-Pfadfindung asynchron erfolgen soll.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`
            },
            "max-threads": {
                default: 0,
                desc: `Maximale Anzahl an Threads, die für die asynchrone Entity-Pfadfindung verwendet werden sollen.<br>
                    Wenn ein Wert &leq; \`0\` angegeben wird, werden automatisch 1/4 der CPU-Kerne verwendet, mindestens jedoch 1.<br>
                    <br>
                    __⚡Empfohlener Wert: 1/3 der CPU-Kerne__`
            },
            keepalive: {
                default: 60,
                desc: `Die Keepalive-Zeit für Threads; Threads ohne Aufgaben werden beendet, wenn sie diese Zeit überschreiten.<br>
                    (Einheit: Sekunde)`
            },
            "queue-size": {
                default: 0,
                desc: `Maximale Größe der Warteschlange für ausstehende Entity-Tracking-Aufgaben.<br>
                    Wenn ein Wert &leq; \`0\` angegeben wird, wird die Warteschlangengröße dynamisch als \`max-threads * 256\` berechnet.`
            },
            "reject-policy": {
                default: "CALLER_RUNS",
                desc: `Die Richtlinie, die verwendet werden soll, wenn die Warteschlange für Pfadfindungsaufgaben voll ist und eine neue Aufgabe eingereicht wird.<br>
                <ul>
                <li>\`FLUSH_ALL\`: Alle ausstehenden Aufgaben in der Warteschlange werden sofort im Server-Thread ausgeführt.</li>
                <li>\`CALLER_RUNS\`: Die eingehende eingereichte Aufgabe wird im Server-Thread ausgeführt.</li>
                </ul>
                <br>
                __⚡Empfohlener Wert: \`CALLER_RUNS\`__`
            }
        },
        "async-playerdata-save": {
            enabled: {
                default: false,
                desc: "Ob das Speichern von Spielerdaten asynchron erfolgen soll. (I/O-Operationen sind aufwändig)"
                // TODO
                // <div class="warning custom-block">
                // <p class="custom-block-title custom-block-title-default">Experimentell</p>
                // Experimentelle Funktion, kann unter Umständen zu Datenverlust oder Dateninkonsistenz führen!
                // </div>`
            }
        },
        "async-entity-tracker": {
            enabled: {
                default: false,
                desc: `Ob das Entity-Tracking asynchron erfolgen soll.<br>
                    Dies kann die Leistung erheblich verbessern, insbesondere in Situationen mit einer großen Anzahl von Entities in einem kleinen Bereich.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">Experimentell</p>
                    Experimentelle Funktion, wird aktiv getestet, bitte melde alle Fehler, die auftreten.
                    </div>`
            },
            threads: {
                default: 0,
                desc: `Maximale Anzahl an Threads, die für den asynchronen Entity-Tracker verwendet werden sollen.<br>
                    Wenn ein Wert &leq; \`0\` angegeben wird, werden automatisch 1/4 der CPU-Kerne verwendet, mindestens jedoch 1.<br>
                    <br>
                    __⚡Empfohlener Wert: 1/2 der CPU-Kerne__`
            }
        },
        "parallel-world-ticking": {
            enabled: {
                default: false,
                desc: `Ob verschiedene Welten parallel in separaten Threads verarbeitet werden sollen, was die Leistung auf Multi-Core-Systemen verbessern kann.<br>
                    <br>
                    Parallel World Ticking, auch bekannt als "PWT", ist ein Konzept von [SparklyPaper](https://github.com/SparklyPower/SparklyPaper), bei dem jede Welt in ihrem eigenen dedizierten Thread getickt wird, um die Arbeitslast von einem einzelnen Thread für alle Welten aufzuteilen und zu reduzieren.<br>
                    In dieser PWT-Implementierung wartet jede Welt, bis der letzte Welt-Tick abgeschlossen ist. Mehr dazu in der Erklärung von SparklyPaper: [PARALLEL_WORLD_TICKING.md](https://github.com/SparklyPower/SparklyPaper/blob/13aff425238ea322658de0d9f4f7bd906bd9f431/docs/PARALLEL_WORLD_TICKING.md).<br>
                    <br>
                    Wann sollte ich PWT in Betracht ziehen?
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
                    </div>`
            },
            threads: {
                default: 8,
                desc: `Anzahl der Threads, die für das parallele World-Ticking reserviert sind.<br>
                    <br>
                    __⚡Empfohlener Wert: gleich der Anzahl der Welten__`
            },
            "log-container-creation-stacktraces": {
                default: false,
                desc: `Ob Stacktraces protokolliert werden sollen, wenn Container (wie Tile Entities oder Entities) während des parallelen Tickings erstellt werden.<br>
                    Dies ist nützlich für das Debuggen potenzieller Nebenläufigkeitsprobleme (Concurrency Issues).`
            },
            "disable-hard-throw": {
                default: false,
                desc: `Ob "Hard Throws" (die normalerweise den Server stoppen) im Zusammenhang mit Fehlern beim parallelen Ticking deaktiviert werden sollen.<br>
                    <div class="tip custom-block">
                    <p class="custom-block-title custom-block-title-default">Achtung</p>
                    Dies kann zugrundeliegende Probleme maskieren, aber helfen, Abstürze während der Testphase der Serverentwicklung zu verhindern. Mit Vorsicht verwenden.
                    </div>`
            },
            "async-unsafe-read-handling": {
                default: "DISABLED",
                desc: `Ob asynchrone Aufgaben innerhalb des parallelen Ticking-Systems synchron ausgeführt werden sollen.<br>
                    Dies könnte für die Kompatibilität mit bestimmten Plugins erforderlich sein, macht jedoch die Leistungsvorteile des parallelen Tickings weitgehend zunichte.<br>
                    <br>
                    __⚡Empfohlener Wert: \`BUFFERED\`__`
            }
        }
    },

    performance: {
        __desc__:
            "Dieser Abschnitt enthält Leistungsoptimierungen, die darauf abzielen, unnötige Berechnungen zu reduzieren oder effizientere Methoden zur Optimierung des Servers zu verwenden.",
        "check-survival-before-growth": {
            "cactus-check-survival": {
                default: false,
                desc: `Ob überprüft werden soll, ob der Kaktus überleben kann, bevor versucht wird, ihn wachsen zu lassen.<br>
                    Dies kann die Leistung verbessern, wenn riesige Kaktusfarmen auf dem Server existieren.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`
            }
        },
        "despawn-time": {
            "proactive-weak-loading-despawn": {
                default: false,
                desc: `Ob die proaktive Despawn-Prüfung für weak-loaded Entities aktiviert werden soll.<br>
                    Dies kann helfen, Lag zu reduzieren, der durch das Laden und Ticking einer großen Menge angesammelter Entities in weak-loaded Chunks verursacht wird.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__<br>
                    <br>
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">Experimentell</p>
                    Experimentelles Feature, das aktiv getestet wird. Bitte melde alle auftretenden Bugs.
                    </div>`
            }
        },
        "dont-save-entity": {
            "dont-save-primed-tnt": {
                default: false,
                desc: `Ob das Speichern von gezündetem TNT beim Entladen von Chunks deaktiviert werden soll.<br>
                    Dies kann verhindern, dass Maschinen oder Redstone-Bauten durch TNT explodieren, wenn der Spieler versehentlich die Verbindung trennt oder der Chunk entladen wird, während der Spieler weit weg ist. Nützlich für Redstone-/Technik-/Survival-Server, die Maschinen mit TNT verwenden.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`
            },
            "dont-save-falling-block": {
                default: false,
                desc: `Ob das Speichern von fallenden Blöcken beim Entladen von Chunks deaktiviert werden soll.<br>
                    Dies kann potenzielle Probleme mit verbuggten oder duplizierten fallenden Blöcken (Sand, Kies usw.) nach Server-Neustarts oder Chunk-Laden verhindern, insbesondere wenn diese durch Lags verursacht wurden.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`
            }
        },
        dab: {
            __desc__:
                "Dynamic Activation of Brain, auch bekannt als DAB, optimiert das 'Gehirn' (Brain) von Entities, indem die Frequenz ihres Brain-Tickings verringert wird, wenn sie weit von Spielern entfernt sind. Dies ist ein lohnender Kompromiss zur Leistungsverbesserung, wenn viele Entities vorhanden sind.",
            enabled: {
                default: false,
                desc: `Ob DAB aktiviert werden soll.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__
                    <table>
                    <tr><td><b>Werte für Ziele</b></td><td></td></tr>
                    <tr><td><i>Optimierung</i></td><td><code>true</code></td></tr>
                    <tr><td><i>Vanilla-Verhalten</i></td><td><code>false</code> (oder siehe <code>dab.blacklisted-entities</code> unten für mehr)</td></tr>
                    </table>`
            },
            "dont-enable-if-in-water": {
                default: false,
                desc: `Ob nicht-aquatische Entities im Wasser von DAB ausgeschlossen werden sollen. Dies kann [Pufferfish#58](https://github.com/pufferfish-gg/Pufferfish/issues/58) beheben.<br>
                    Wenn auf \`true\` gesetzt, könnte dies verhindern, dass Entities im Wasser ersticken, wenn sie weit vom Spieler entfernt sind.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`
            },
            "start-distance": {
                default: 12,
                desc: `Die Distanz bestimmt, wie weit ein Entity vom Spieler entfernt sein muss, um von DAB beeinflusst zu werden.<br>
                    (Einheit: Block)<br>
                    <br>
                    __⚡Empfohlener Wert: \`8\`__`
            },
            "max-tick-freq": {
                default: 20,
                desc: `Die maximale Tick-Zeit definiert, wie oft das am weitesten entfernte Entity seine Pathfinder und Verhaltensweisen getickt bekommt.<br>
                    (Einheit: Tick, Standardwert 20 Ticks = 1s)`
            },
            "activation-dist-mod": {
                default: 8,
                desc: `Die Tick-Frequenz, die definiert, wie stark die Distanz die Tick-Frequenz eines Entities beeinflusst. \`freq = (distanceToPlayer^2) / (2^value)\`.
                    <ul>
                    <li>Wenn du möchtest, dass weiter entfernte Entities __weniger__ oft ticken, verwende \`7\`.</li>
                    <li>Wenn du möchtest, dass weiter entfernte Entities __öfter__ ticken, versuche \`9\`.</li>
                    </ul>
                    <br>
                    __⚡Empfohlener Wert: \`7\`__`
            },
            "blacklisted-entities": {
                default: `
                - villager
                - axolotl
                - hoglin
                - zombified_piglin
                - goat`,
                desc: `Eine Liste von Entities, die nicht von DAB betroffen sein sollen.<br>
                    <br>
                    Einige Survival-Server haben Mob-Farmen, die darauf angewiesen sind, dass Mobs ein Ziel haben. Diese Art von "Pfadfindungs"-Mob-Farm kann durch DAB beeinträchtigt werden. Diese Situation kann gelöst werden, indem spezifische Mobs der Mob-Farm zu dieser DAB-Blacklist hinzugefügt werden.<br>
                    Wenn bestimmte Mob-Farmen auf deinem Server defekt sind, Mobs einfrieren und sich nicht bewegen, und du nicht sicher bist, ob dies durch DAB verursacht wird, kannst du versuchen, sie zu dieser Liste hinzuzufügen, um zu sehen, ob das Problem dadurch behoben wird.<br>
                    <br>
                    Format: \`[villager]\` oder \`[villager, zombified_piglin]\` (Du findest alle Entity-Typen in [Paper's Javadoc](https://jd.papermc.io/paper/1.21.11/org/bukkit/entity/EntityType.html)).<br>
                    <br>
                    [💡 Du möchtest tiefer eintauchen?](guides/dab-blacklist-format)`
            }
        },
        "enable-cached-minecraft-to-bukkit-entitytype-convert": {
            default: true,
            desc: `Ob das Ergebnis der Umwandlung von *Minecraft EntityType* zu *Bukkit EntityType* zwischengespeichert (gecached) werden soll. Diese Umwandlung kann etwas aufwändig sein, insbesondere in der Spawning-Logik, daher kann das Caching die Leistung leicht verbessern.<br>
                <br>
                __⚡Empfohlener Wert: \`true\`__`
        },
        "entity-goal": {
            "start-tick-chance": {
                __desc__: `Wie oft die Startversuche für gewöhnliche Mob-Goals berechnet werden.<br>
                    In Vanilla prüft das Goal jeden Tick, ob es starten kann. Durch das Erhöhen der untenstehenden Werte werden diese Prüfungen gedrosselt, was die Performance deutlich verbessern kann, aber kleinere Auswirkungen auf das Gameplay haben kann.<br>
                    Wenn auf \`-1\` gesetzt, verhält sich die Tick-Frequenz wie in Vanilla.<br>
                    <br>
                    __⚡Empfohlene Werte:__
                    <table>
                    <thead><tr><th>Entity Goal</th><th>Start Tick Chance</th></tr></thead>
                    <tbody>
                    <tr><td>nearest-attackable-target</td><td>20</td></tr>
                    <tr><td>follow-parent</td><td>20</td></tr>
                    <tr><td>avoid-entity</td><td>20</td></tr>
                    <tr><td>temptation</td><td>20</td></tr>
                    <tr><td>enderman-look-for-player</td><td>20</td></tr>
                    </tbody></table>`,
                "nearest-attackable-target": {
                    default: -1,
                    desc: "Wie oft das __nearest attackable target__ Goal versucht, für eine Entity zu starten."
                },
                "follow-parent": {
                    default: -1,
                    desc: "Wie oft das __follow parent__ Goal versucht, für eine Entity zu starten."
                },
                "avoid-entity": {
                    default: -1,
                    desc: "Wie oft das __avoid entity__ Goal versucht, für eine Entity zu starten."
                },
                temptation: {
                    default: -1,
                    desc: "Wie oft das __temptation__ Goal versucht, für eine Entity zu starten."
                },
                "enderman-look-for-player": {
                    default: -1,
                    desc: "Wie oft das __look for player__ Goal versucht, für einen Enderman zu starten."
                }
            }
        },
        "fast-biome-manager-seed-obfuscation": {
            enabled: {
                default: false,
                desc: `Ob die Vanilla SHA-256 Seed-Obfuskation im \`BiomeManager\` durch XXHash ersetzt werden soll.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`
            },
            "seed-obfuscation-key": {
                default: 513317,
                desc: `Seed-Obfuskationsschlüssel für XXHash.<br>
                    Dieser Wert wird beim ersten Serverstart zufällig generiert.`
            }
        },
        "faster-random-generator": {
            enabled: {
                default: false,
                desc: `Ob der schnellere Zufallsgenerator (Random Generator), der in JDK 17 eingeführt wurde, verwendet werden soll (\`Xoroshiro128PlusPlus\`).<br>
                    Zufall wird fast überall in Minecraft verwendet; dies zu aktivieren kann eine ordentliche Leistungsverbesserung bringen.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__
                    <div class="tip custom-block">
                    <p class="custom-block-title custom-block-title-default">Achtung</p>
                    Dies erfordert eine JVM, die \`Xoroshiro128PlusPlus\` unterstützt. Einige JREs unterstützen dies nicht.
                    </div>`
            },
            "enable-for-worldgen": {
                default: false,
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
                    </table>`
            },
            "warn-for-slime-chunk": {
                default: true,
                desc: "Ob der Server beim Start eine Warnmeldung ausgibt, wenn der schnellere Zufallsgenerator für die Slime-Chunk-Generierung aktiviert ist."
            },
            "use-legacy-random-for-slime-chunk": {
                default: false,
                desc: `Ob die alte Zufallsquelle (\`java.util.Random\`) für die Slime-Chunk-Generierung verwendet werden soll, um dem Vanilla-Verhalten zu folgen.<br>
                    Wenn dein Server bestehende Slime-Farmen oder ähnliche Einrichtungen hat, die Slime-Chunks benötigen, aktiviere dies; andernfalls wird die Position der Slime-Chunks verschoben sein.<br>
                    <br>
                    __⚡Empfohlener Wert: (Hängt von deinem Servertyp ab, siehe \`Werte für Ziele\` unten für mehr)__
                    <table>
                    <tr><td><b>Werte für Ziele</b></td><td></td></tr>
                    <tr><td><i>Optimierung</i></td><td><code>false</code></td></tr>
                    <tr><td><i>Vanilla-Verhalten</i></td><td><code>true</code></td></tr>
                    </table>`
            }
        },
        "faster-structure-gen-future-sequencing": {
            default: true,
            desc: `Ob eine schnellere Aufgaben-Sequenzierung für die Generierung von Strukturen verwendet werden soll.<br>
                <br>
                __⚡Empfohlener Wert: \`true\`__
                <div class="tip custom-block">
                <p class="custom-block-title custom-block-title-default">Achtung</p>
                Dies kann in seltenen Grenzfällen zu einer inkonsistenten Reihenfolge zukünftiger Compose-Tasks führen, was unterschiedliche Ergebnisse bei der Strukturgenerierung zur Folge haben kann.
                </div>`
        },
        "reuse-random-ticking-blockpos": {
            default: false,
            desc: `Ob ein Teil der blockpos-Instanz während des Random Block Tickings wiederverwendet werden soll.<br>
                Dies kann unnötige Speicherzuweisungen vermeiden und den GC-Overhead bei einer großen Menge an Random Block Ticking leicht reduzieren.<br>
                <br>
                __⚡Empfohlener Wert: \`false\`__<br>
                <br>
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">Experimentell</p>
                Experimentelles Feature, das aktiv getestet wird. Es kann zu Konflikten mit einigen Plugins führen oder verursachen, dass Ticking-Positionen verschoben werden. Bitte mit Vorsicht verwenden und alle auftretenden Bugs melden.
                </div>`
        },
        "cache-biome": {
            enabled: {
                default: false,
                desc: `Ob die Biom-Daten der Blockposition gecacht werden sollen, anstatt das Biom bei jeder Suche neu zu berechnen.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\` (Erfordert auch das Aktivieren der Optionen unten)__`
            },
            "mob-spawning": {
                default: false,
                desc: `Ob das Biom in der Mob-Spawning-Logik gecacht werden soll.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`
            },
            advancements: {
                default: false,
                desc: `Ob das Biom in der Berechnungslogik für Spieler-Fortschritte (Advancements) gecacht werden soll.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`
            }
        },
        "optimize-block-entities": {
            default: true,
            desc: `Ob die effizientere Map-Datenstruktur für den Block-Entity-Ticker-Speicher verwendet werden soll.<br>
                <br>
                __⚡Empfohlener Wert: \`true\`__`
        },
        "optimize-mob-despawn": {
            default: false,
            desc: `Ob eine effizientere Logik für das natürliche Despawning von Mobs verwendet werden soll.<br>
                Dies kann die hohen Kosten der Vanilla-Despawn-Logik vermeiden, die über jeden Spieler iteriert und dann die Distanz zwischen den Mobs und dem Spieler vergleicht.<br>
                <br>
                Es wird empfohlen, das Flag [\`-DLeaf.enableFMA=true\`](http://localhost:5173/docs/config/system-properties#dleaf-enablefma) für eine bessere Leistung hinzuzufügen.<br>
                <br>
                __⚡Empfohlener Wert: \`true\`__
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">Experimentell</p>
                Experimentelle Funktion, wird aktiv getestet, bitte melde alle Fehler, die auftreten.
                </div>`
        },
        "only-tick-items-in-hand": {
            default: false,
            desc: `Ob Items nur getickt oder aktualisiert werden sollen, wenn der Spieler sie in der Haupt- oder Nebenhand hält, anstatt das gesamte Inventar zu ticken.<br>
                Dies betrifft derzeit nur Kompass- und Karten-Items.<br>
                <br>
                __⚡Empfohlener Wert: \`true\`__`
        },
        "optimize-no-action-time": {
            "disable-light-check": {
                default: false,
                desc: `Ob der Licht-Check im \`noActionTime\`-Update von Monstern übersprungen werden soll.<br>
                    Erhöht den \`noActionTime\`-Zähler direkt um 1, ohne bei jedem Entity-Ticking das Lichtlevel zu prüfen. In Vanilla erhöht sich der Zähler um 2, wenn das Monster an einem Ort ist, an dem das Lichtlevel höher als ein bestimmter Wert ist.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__
                    <table>
                    <tr><td><b>Werte für Ziele</b></td><td></td></tr>
                    <tr><td><i>Optimierung</i></td><td><code>true</code></td></tr>
                    <tr><td><i>Vanilla-Verhalten</i></td><td><code>false</code></td></tr>
                    </table>
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">Experimentell</p>
                    Experimentelle Funktion, wird aktiv getestet, bitte melde alle Fehler, die auftreten.
                    </div>`
            }
        },
        "optimize-player-movement": {
            default: true,
            desc: `Ob unnötige Blockkanten-Checks bei der Spielerbewegung übersprungen und redundante Aktualisierungen der Sichtweite vermieden werden sollen.<br>
                <br>
                __⚡Empfohlener Wert: \`true\`__`
        },
        "optimize-random-tick": {
            default: false,
            desc: `Ob das neu geschriebene Random-Ticking-System verwendet werden soll.<br>
                <br>
                Dieses neu geschriebene System nutzt gewichtete Statistiken und Stichproben, um tickbare Blöcke in aktiven Chunks auszuwählen. Es kann die unnötigen Kosten reduzieren, die durch das häufige Auswählen nicht-tickbarer Positionen in der Vanilla-Random-Ticking-Logik entstehen.<br>
                <br>
                __⚡Empfohlener Wert: \`true\`__
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">Experimentell</p>
                Experimentelle Funktion, wird aktiv getestet, bitte melde alle Fehler, die auftreten.
                </div>`
        },
        "optimize-waypoint": {
            default: false,
            desc: `Ob die Wegpunkt-Tracking-Daten des Spielers nur aktualisiert werden sollen, wenn sich ihre Blockposition ändert.<br>
                <br>
                __⚡Empfohlener Wert: \`true\`__
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">Experimentell</p>
                Experimentelle Funktion, wird aktiv getestet, bitte melde alle Fehler, die auftreten.
                </div>`
        },
        "optimized-powered-rails": {
            default: false,
            desc: `Ob optimierte Antriebsschienen (Powered Rails) verwendet werden sollen. Nutzt eine komplett neu geschriebene Version der Iterationslogik für Antriebsschienen, die das Vanilla-Verhalten beibehält und eine 4x schnellere Leistung erreichen kann.<br>
                <br>
                __⚡Empfohlener Wert: \`true\`__`
        },
        "reduce-packets": {
            __desc__: "Dieser Abschnitt ist für Funktionen zur Reduzierung nutzloser Pakete.",
            "reduce-entity-move-packets": {
                default: false,
                desc: `Ob nutzlose Entity-Bewegungspakete, die an Spieler gesendet werden (z. B. kleine Bewegungen), reduziert werden sollen.<br>
                    Dies kann Bandbreite sparen und die clientseitige Verarbeitungslast verringern, was Bewegungen bei hoher Entity-Anzahl oder leichten Lags möglicherweise flüssiger erscheinen lässt.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`
            },
            "reduce-entity-motion-packets": {
                default: false,
                desc: `Ob nutzlose Entity-Motion-Pakete (\`ClientboundSetEntityMotionPacket\`) gefiltert werden sollen.<br>
                    Dies kann die Netzwerkauslastung (Netty) auf größeren Servern signifikant um bis zu 60 % reduzieren. Dabei wird sorgfältig gefiltert, um sicherzustellen, dass es keine visuellen Nebenwirkungen für den Client gibt.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`
            },
            "disable-useless-particles": {
                default: false,
                desc: `Ob die serverseitige Logik für kosmetische Partikel (Sprinten, Tod, Zustandseffekte, Wasserspritzer und Blasensäulen) deaktiviert werden soll.<br>
                    Da der Client die meisten dieser Partikel bereits anzeigt, wird die serverseitige Partikellogik nicht benötigt. Das Deaktivieren spart Netzwerkbandbreite und Serverlast.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`
            }
        },
        "skip-ai-for-non-aware-mob": {
            default: true,
            desc: `Ob AI-Ticks für Mobs, die sowohl *inaktiv* als auch *unaware* (nicht aufmerksam) sind, komplett übersprungen werden sollen.<br>
                Nicht aufmerksame Mobs, die auf diese Weise optimiert wurden, führen keine eigenständigen Aktionen aus oder reagieren nicht, bis sie wieder aktiv werden, siehe [Mob.html#setAware(boolean)](https://jd.papermc.io/paper/1.21.11/org/bukkit/entity/Mob.html#setAware(boolean)) für weitere Informationen.<br>
                <br>
                __⚡Empfohlener Wert: \`true\`__
                <table>
                <tr><td><b>Werte für Ziele</b></td><td></td></tr>
                <tr><td><i>Optimierung</i></td><td><code>true</code></td></tr>
                <tr><td><i>Vanilla-Verhalten</i></td><td><code>false</code></td></tr>
                </table>`
        },
        datapack: {
            "skip-inactive-entity-for-execute-command": {
                default: false,
                desc: `Ob die Auswahl inaktiver Entities beim Verwenden des execute-Befehls übersprungen werden soll.<br>
                    Dies kann die Leistung auf Servern mit massiven Datapack-Funktionen verbessern.`
            }
        },
        "skip-map-item-data-updates-if-map-does-not-have-craftmaprenderer": {
            default: true,
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
                </div>`
        },
        "throttle-hopper-when-full": {
            enabled: {
                default: false,
                desc: `Ob Versuche von Trichtern (Hopper), Items zu übertragen, gedrosselt werden sollen, wenn der Zielcontainer voll ist.<br>
                    Verhindert, dass der Trichter jeden Tick versucht, Items zu verschieben, selbst wenn dies immer wieder fehlschlägt.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__
                    <table>
                    <tr><td><b>Werte für Ziele</b></td><td></td></tr>
                    <tr><td><i>Optimierung</i></td><td><code>true</code></td></tr>
                    <tr><td><i>Vanilla-Verhalten</i></td><td><code>false</code></td></tr>
                    </table>`
            },
            "skip-ticks": {
                default: 8,
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
                    </table>`
            }
        },
        "throttle-mob-spawning": {
            enabled: {
                default: false,
                desc: `Ob Mob-Spawning in Chunks übersprungen werden soll, die wiederholt beim Spawnen von Mobs über den konfigurierten \`min-failed\`-Wert hinaus fehlgeschlagen sind.<br>
                    Sobald die Mindestanzahl fehlgeschlagener Spawn-Versuche erreicht ist, wird der Server zufällig zwischen 1 ~ \`spawn-chance\`% der Spawn-Versuche in diesem Chunk überspringen.<br>
                    Fehlgeschlagene Spawn-Versuche werden nicht gezählt, wenn Spawn-Limits erreicht sind, und der Fehlerzähler wird nach einem erfolgreichen Spawn zurückgesetzt.`
            },
            monster: {
                "min-failed": {
                    default: 8,
                    desc: "Die minimalen fehlgeschlagenen Spawn-Versuche für feindliche Monster."
                },
                "spawn-chance": {
                    default: "25.0",
                    desc: "Die Spawn-Chance für feindliche Monster nach Erreichen des `min-failed`-Wertes oben."
                }
            },
            creature: {
                "min-failed": {
                    default: 8,
                    desc: "Die minimalen fehlgeschlagenen Spawn-Versuche für passive Kreaturen (Tiere)."
                },
                "spawn-chance": {
                    default: "25.0",
                    desc: "Die Spawn-Chance für passive Kreaturen (Tiere) nach Erreichen des `min-failed`-Wertes oben."
                }
            },
            ambient: {
                "min-failed": {
                    default: 8,
                    desc: "Die minimalen fehlgeschlagenen Spawn-Versuche für ambiente Mobs (Fledermäuse)."
                },
                "spawn-chance": {
                    default: "25.0",
                    desc: "Die Spawn-Chance für ambiente Mobs (Fledermäuse) nach Erreichen des `min-failed`-Wertes oben."
                }
            },
            axolotls: {
                "min-failed": {
                    default: 8,
                    desc: "Die minimalen fehlgeschlagenen Spawn-Versuche für Axolotl."
                },
                "spawn-chance": {
                    default: "25.0",
                    desc: "Die Spawn-Chance für Axolotl nach Erreichen des `min-failed`-Wertes oben."
                }
            },
            underground_water_creature: {
                "min-failed": {
                    default: 8,
                    desc: "Die minimalen fehlgeschlagenen Spawn-Versuche für Unterwasser-Kreaturen (Leuchttintenfisch)."
                },
                "spawn-chance": {
                    default: "25.0",
                    desc: "Die Spawn-Chance für Unterwasser-Kreaturen (Leuchttintenfisch) nach Erreichen des `min-failed`-Wertes oben."
                }
            },
            water_creature: {
                "min-failed": {
                    default: 8,
                    desc: "Die minimalen fehlgeschlagenen Spawn-Versuche für Wasserkreaturen (Tintenfisch, Delfine)."
                },
                "spawn-chance": {
                    default: "25.0",
                    desc: "Die Spawn-Chance für Wasserkreaturen (Tintenfisch, Delfine) nach Erreichen des `min-failed`-Wertes oben."
                }
            },
            water_ambient: {
                "min-failed": {
                    default: 8,
                    desc: "Die minimalen fehlgeschlagenen Spawn-Versuche für ambiente Wassermobs (Tropenfische)."
                },
                "spawn-chance": {
                    default: "25.0",
                    desc: "Die Spawn-Chance für ambiente Wassermobs (Tropenfische) nach Erreichen des `min-failed`-Wertes oben."
                }
            }
        },
        "create-snapshot-on-retrieving-blockstate": {
            default: true,
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
                __⚡Empfohlener Wert: \`false\` (Nur wenn du spezifische Lags wie oben beschrieben feststellst)__`
        },
        "use-virtual-thread-for-async-scheduler": {
            default: false,
            desc: `Ob der in JDK 21 eingeführte [Virtual Thread](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html) für den CraftAsyncScheduler verwendet werden soll, was die Leistung von Plugins verbessern könnte, die den asynchronen Scheduler von Bukkit stark nutzen.<br>
                <br>
                __⚡Empfohlener Wert: \`true\` (Nur wenn alle Plugins Virtual Threads unterstützen)__`
        },
        "use-virtual-thread-for-async-chat-executor": {
            default: true,
            desc: `Ob der in JDK 21 eingeführte [Virtual Thread](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html) für den Async Chat Executor verwendet werden soll.<br>
                <br>
                __⚡Empfohlener Wert: \`true\`__`
        },
        "use-virtual-thread-for-profile-executor": {
            default: false,
            desc: `Ob der in JDK 21 eingeführte [Virtual Thread](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html) für den Profile Executor verwendet werden soll, der das Abrufen von Spielerprofilen und Schädel-Skins handhabt.<br>
                <br>
                __⚡Empfohlener Wert: \`false\`__`
        },
        "use-virtual-thread-for-user-authenticator": {
            default: true,
            desc: `Ob der in JDK 21 eingeführte [Virtual Thread](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html) für den User Authenticator Service verwendet werden soll, der die Premium-Spieler-Beitrittsverifizierung handhabt.<br>
                <br>
                __⚡Empfohlener Wert: \`true\`__`
        }
    },

    fixes: {
        __desc__: "Dieser Abschnitt enthält Bugfixes für spezifische Probleme.",
        "prevent-moving-into-weak-loaded-chunks": {
            __desc__: "Ob verhindert werden soll, dass Entities sich in weak-loaded Chunks bewegen.",
            enabled: {
                default: false,
                desc: "Setze dies auf `true`, um die untenstehenden Optionen nutzen zu können."
            },
            projectiles: {
                default: false,
                desc: "Ob verhindert werden soll, dass Projektile sich in weak-loaded Chunks bewegen."
            }
        },
        "vanilla-bug-fix": {
            __desc__: "Dieser Abschnitt enthält Fixes für Vanilla Minecraft Bugs.",
            "mc-270656": {
                default: false,
                desc: `Ob die fehlerhafte Vergabe des \`Wer braucht schon Raketen?\` Advancements behoben werden soll.<br>
                    Mojira-Link: [MC-270656](https://mojira.dev/MC-270656).`
            }
        }
    },

    "gameplay-mechanisms": {
        __desc__: "Dieser Abschnitt enthält Funktionen, die die Spielmechanik modifizieren oder verbessern.",
        "afk-command": {
            enabled: {
                default: false,
                desc: `Ob der AFK-Befehl basierend auf Minecrafts eingebautem [Idle-Timeout-Mechanismus](https://minecraft.wiki/w/Server.properties#:~:text=player%20have%20to%20idle) aktiviert werden soll. Spieler können den Befehl /afk verwenden, um ihren AFK-Modus umzuschalten, und ihr AFK-Status kann in der Tab-Liste angezeigt werden.<br>
                    <br>
                    Setze auch \`kick-if-idle\` in der Purpur-Config auf \`false\`, um zu verhindern, dass Spieler gekickt werden, wenn sie in den AFK-Modus wechseln. Die restlichen AFK-Einstellungen, konfigurierbare AFK-Nachrichten und Titel-Nachrichten befinden sich in der Purpur-Config.`
            }
        },
        "inventory-overflow-event": {
            enabled: {
                default: false,
                desc: `Ob das Inventar-Überlauf-Event (Inventory Overflow Event) aktiviert werden soll. Das Event wird aufgerufen, wenn ein Plugin \`Inventory#addItem\` verwendet, um Items zum Inventar des Spielers hinzuzufügen, und das Zielinventar voll ist.
                    <div class="tip custom-block">
                    <p class="custom-block-title custom-block-title-default">Achtung</p>
                    Dies ist keine saubere Lösung! Bitte überarbeite deine Plugin-Logik, um die zurückgegebene Map der \`Inventory#addItem\`-Methode so schnell wie möglich zu verwenden!
                    </div>`
            },
            "listener-class": {
                default: "com.example.package.PlayerInventoryOverflowEvent",
                desc: "Der vollständige Name der Listener-Klasse, die auf dieses Inventar-Überlauf-Event hört. Setze dies auf deine eigene Listener-Klasse, um dieses Event zu nutzen."
            }
        },
        player: {
            "max-use-item-distance": {
                default: 1.0000001,
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
                    </div>`
            }
        },
        "allow-tripwire-dupe": {
            default: false,
            desc: "Ob der Tripwire-Dupe ([MC-59471](https://bugs.mojang.com/browse/MC/issues/MC-59471)), der in den 1.21.2-Snapshots 24w33a und 24w36a behoben wurde, zurückgebracht werden soll. Er ist auch als String-Dupe bekannt."
        },
        "death-item-drop-knockback": {
            "drop-around": {
                default: true,
                desc: `Ob Items beim Tod zufällig um den Spieler herum fallen gelassen werden sollen.
                    <ul>
                    <li>Wenn auf \`true\` gesetzt, werden Items mit einer zufälligen Bewegung fallen gelassen und um den toten Spieler verstreut.</li>
                    <li>Wenn auf \`false\` gesetzt, werden Items unter dem toten Spieler fallen gelassen.</li>
                    </ul>`
            },
            "horizontal-force": {
                default: 0.5,
                desc: "Basisgeschwindigkeit der horizontalen Kraft, die auf die fallen gelassenen Items des Spielers beim Tod wirkt."
            },
            "vertical-force": {
                default: 0.2,
                desc: "Dasselbe wie \`horizontal-force\`, aber für die vertikale Geschwindigkeit."
            }
        },
        // TODO: Add back when implemented it
        // "hide-item-component": {
        //     "hidden-types": {
        //         default: "[]",
        //         desc: `The list of component type keys that will be hidden from the client.<br>
        //             <br>
        //             See [List of components](https://minecraft.wiki/w/Data_component_format#List_of_components) to get the full list of available component type keys for items.<br>
        //             For example:
        //             <ul>
        //             <li>If a value \`[]\` is given, no item will be affected.</li>
        //             <li>If a value \`[\"minecraft:custom_data\"]\` is given, the item's \`custom_data\` component will be hidden on the player's client.</li>
        //             </ul>`
        //     },
        //     "enabled": {
        //         default: false,
        //         desc: `Whether to hide specified component information from the player's inventory sent to clients. Also see \`hidden-types\` above.<br>
        //             <br>
        //             It can be used to hide complex component data on an item to reduce rendering load, frequent animations on the client side, and network usage. The actual item data will not be affected.<br>
        //             <br>
        //             It is noted that this option is different from Paper's [item obfuscation](https://docs.papermc.io/paper/reference/global-configuration/#anticheat_obfuscation_items_enable_item_obfuscation). This option only hides item component data from the player's own inventory, instead of hiding data sent to others.
        //             <div class="tip custom-block">
        //             <p class="custom-block-title custom-block-title-default">Attention</p>
        //             It may break resource packs, client mods, or specific gameplay mechanics that rely on these client-side component data of items. Use with caution. You must know what components you are hiding!
        //             </div>`
        //     }
        // },
        knockback: {
            __desc__: "Dieser Abschnitt enthält Optionen zum Anpassen des Rückstoßverhaltens (Knockback).",
            "snowball-knockback-players": {
                default: false,
                desc: "Ob Schneebälle Spieler zurückstoßen können."
            },
            "egg-knockback-players": {
                default: false,
                desc: "Ob Eier Spieler zurückstoßen können."
            },
            "can-player-knockback-zombie": {
                default: true,
                desc: "Ob der Spieler Zombies mit der Hand, Waffe, Projektilen usw. zurückstoßen kann."
            },
            "flush-location-while-knockback-player": {
                default: false,
                desc: `Ob Bewegungsänderungen sofort an den Client gesendet werden sollen, sobald der Zielspieler getroffen wird und Rückstoß erhält. Dies kann ein flüssigeres PVP-Spielerlebnis mit schnelleren Rückstoß-Reaktionen bieten. In Vanilla geschieht das Senden des Pakets stattdessen am Ende des Ticks, was das PVP-Spielerlebnis beeinträchtigen kann.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\` (Für PVP-Server)__
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">Experimentell</p>
                    Experimentelle Funktion, wird aktiv getestet, bitte melde alle Fehler, die auftreten.
                    </div>`
            },
            "old-blast-protection-explosion-knockback": {
                default: false,
                desc: `Ob das alte Explosions-Rückstoßverhalten (<= 1.20.4) verwendet werden soll, das für Rüstungen mit Explosionsschutz-Verzauberung gilt.
                    <ul>
                    <li>Wenn auf \`true\` gesetzt, wird der Explosions-Rückstoß basierend auf der Explosionsschutz-Verzauberung des Spielers berechnet. Der Rückstoß ist etwas größer als nach der Version 1.20.4.</li>
                    <li>Wenn auf \`false\` gesetzt, folgt der Explosions-Rückstoß dem Vanilla-Verhalten der aktuellen Version.</li>
                    </ul>`
            }
        },
        "only-player-pushable": {
            default: false,
            desc: `Ob nur der Spieler verschiebbar (pushable) sein soll.<br>
                Wenn auf \`true\` gesetzt, überschreibt diese Option Werte verwandter Kollisionsoptionen in Papers globaler und Welt-Konfiguration, und Mobs werden nicht durch den Effekt der [maxEntityCramming](https://minecraft.wiki/w/Game_rule#:~:text=entity%20cramming%20damage) Gamerule getötet.
                <div class="tip custom-block">
                <p class="custom-block-title custom-block-title-default">Achtung</p>
                Dies kann Mob-Farmen zerstören, die Mob-Kollision nutzen, um Mobs fallen zu lassen oder Mobs zu töten, indem der Wert der [maxEntityCramming](https://minecraft.wiki/w/Game_rule#:~:text=entity%20cramming%20damage) Gamerule überschritten wird.
                </div>`
        },
        "spawner-settings": {
            enabled: {
                default: false,
                desc: "Ob die benutzerdefinierten Spawner-Optionen unten verwendet werden sollen. Die Optionen unten betreffen nur das Spawnen von Spawner-Blöcken statt des natürlichen Spawnens."
            },
            checks: {
                "light-level-check": {
                    default: false,
                    desc: `Ob überprüft werden soll, ob das Lichtlevel ausreicht, um den Mob zu spawnen.
                        <ul>
                        <li>Wenn auf \`true\` gesetzt, versucht der Spawner, Mobs unter Verwendung derselben Lichtlevel-Bedingungen zu spawnen, die für natürliches Mob-Spawning verwendet werden.</li>
                        <li>Wenn auf \`false\` gesetzt, folgt der Spawner dem Vanilla-Verhalten, das versucht zu spawnen, ohne das Lichtlevel zu prüfen.</li>
                        </ul>`
                },
                "spawner-max-nearby-check": {
                    default: true,
                    desc: `Ob überprüft werden soll, ob die maximale Anzahl an Mobs in der Nähe erreicht ist, um den Mob zu spawnen. Der Spawner hört auf, neue Mobs zu spawnen, um Überfüllung zu vermeiden.
                        <ul>
                        <li>Wenn auf \`true\` gesetzt, folgt der Spawner dem Vanilla-Verhalten, das das Spawnen neuer Mobs verhindert, wenn die Anzahl der Mobs in der Nähe das Limit überschreitet.</li>
                        <li>Wenn auf \`false\` gesetzt, versucht der Spawner immer zu spawnen, ohne die Anzahl der Mobs in der Nähe zu prüfen.</li>
                        </ul>`
                },
                "check-for-nearby-players": {
                    default: true,
                    desc: `Ob überprüft werden soll, ob sich Spieler in einem Radius befinden, um den Mob zu spawnen.
                        <ul>
                        <li>Wenn auf \`true\` gesetzt, versucht der Spawner immer, Mobs zu spawnen, ohne zu prüfen, ob ein Spieler in der Nähe ist.</li>
                        <li>Wenn auf \`false\` gesetzt, versucht der Spawner nur dann Mobs zu spawnen, wenn ein Spieler im Radius ist.</li>
                        </ul>`
                },
                "spawner-block-checks": {
                    default: false,
                    desc: "Ob Spawn-Versuche verhindert werden sollen, wenn der Spawn-Punkt durch Blöcke blockiert ist."
                },
                "water-prevent-spawn-check": {
                    default: false,
                    desc: "Ob Spawn-Versuche verhindert werden sollen, wenn der Spawn-Punkt Wasser enthält."
                },
                "ignore-spawn-rules": {
                    default: false,
                    desc: `Ob zusätzliche Spawn-Regeln von Mobs ignoriert werden sollen.<br>
                        <br>
                        Viele Mobs haben Spawn-Beschränkungen, dass sie nur auf bestimmten Blöcken spawnen oder nicht spawnen können. Zum Beispiel können die meisten Tiere nur auf Grasblöcken spawnen, oder der Hoglin kann nicht auf Netherwarzen-Blöcken spawnen. Du findest die Liste zusätzlicher Spawn-Regeln unter [Additional Rules](https://minecraft.wiki/w/Mob_spawning#:~:text=additional%20rules).<br>
                        <br>
                        Diese Option beeinflusst nicht die obigen Optionen \`spawner-block-checks\` und \`water-prevent-spawn-check\` und ist von diesen getrennt.`
                }
            },
            "min-spawn-delay": {
                default: 200,
                desc: `Die minimale Verzögerung zwischen jedem Spawn-Versuch des Spawners. Höhere Werte verlangsamen die Spawning-Geschwindigkeit von Spawnern.<br>
                    (Einheit: Tick)`
            },
            "max-spawn-delay": {
                default: 800,
                desc: `Die maximale Verzögerung zwischen jedem Spawn-Versuch des Spawners. Höhere Werte verlangsamen die Spawning-Geschwindigkeit von Spawnern.<br>
                    (Einheit: Tick)`
            }
        },
        "use-spigot-item-merging-mechanism": {
            default: false,
            desc: `Ob fallen gelassene Items basierend auf ihrer Tick-Reihenfolge zusammengeführt (gemerged) werden sollen, was das langjährige Standardverhalten von Spigot ist.<br>
                <br>
                In Spigot wird das Item-Entity, das später tickt, in das früher tickende zusammengeführt. Wenn der Merge-Radius relativ größer ist, kann dies verhindern, dass fallen gelassene Items an unerwarteten Orten stecken bleiben. Dies ist nützlich für Farmen oder Redstone-Bauten, die zahlreiche fallen gelassene Items erzeugen können.<br>
                In Vanilla basiert das Zusammenführen von Items jedoch auf der Item-Anzahl des Stacks. Der Stack mit der kleineren Anzahl wird mit dem mit der größeren Anzahl zusammengeführt.
                <table>
                <tr><td><b>Werte für Ziele</b></td><td></td></tr>
                <tr><td><i>SMP-freundlich</i></td><td><code>true</code></td></tr>
                <tr><td><i>Vanilla-Verhalten</i></td><td><code>false</code></td></tr>
                </table>`
        }
    },

    network: {
        __desc__: "Dieser Abschnitt enthält Funktionen, die sich auf das Server-Netzwerk beziehen.",
        "async-switch-state": {
            default: false,
            desc: "Ob die Logik zum Umschalten des Verbindungsstatus des Spielers asynchron verarbeitet werden soll. Dies kann das Problem der Blockierung des Haupt-Threads beheben, das durch die Nutzung von Exploits aufgrund eines Designfehlers in der Vanilla-Logik verursacht wird."
        },
        "chat-message-signature": {
            default: true,
            desc: `Ob die Chatnachrichten-Signatur aktiviert werden soll, die in Minecraft 1.19.1 eingeführt wurde.<br>
                <ul>
                <li>Wenn auf \`true\` gesetzt, werden Nachrichten signiert und können wie in Vanilla gemeldet werden.</li>
                <li>Wenn auf \`false\` gesetzt, ist die Chat-Signatur deaktiviert. Spieler können Nachrichten nicht melden, und das Pop-up mit der Warnung vor unsicheren Nachrichten wird deaktiviert, wenn der Spieler dem Server beitritt.</li>
                </ul>
                <br>
                __⚡Empfohlener Wert: \`false\`__ (Nur für Offline-Mode-Server oder Server, die alternative Moderationsmethoden haben)`
        },
        OptimizeNonFlushPacketSending: {
            default: false,
            desc: `Ob das Senden von nicht-geflushten Paketen optimiert werden soll, indem Nettys [\`lazyExecute\`](https://netty.io/4.2/api/io/netty/util/concurrent/SingleThreadEventExecutor.html#lazyExecute(java.lang.Runnable))-Methode verwendet wird. Dies kann Thread-Konkurrenz und Wakeup-Aufrufe für bestimmte Arten von Netzwerkoperationen reduzieren.
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">Warnung</p>
                Diese Option ist bekannt dafür, __INKOMPATIBEL__ mit ProtocolLib zu sein und kann Probleme mit anderen Plugins verursachen, die Netzwerkpakete intensiv manipulieren.<br>
                Erfordert einen Neustart des Servers, um wirksam zu werden. Mit extremer Vorsicht verwenden.
                </div>`
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
            "jade-protocol": {
                default: false,
                desc: `Ob die [Jade](https://modrinth.com/mod/jade)-Protokoll-Unterstützung aktiviert werden soll.<br>
                    Wenn auf \`true\` gesetzt, können Spieler, die die Jade-Mod installiert haben, Item-Informationen in Lagercontainern, den Fortschritt von Öfen und Brauständen, Nahrung auf dem Lagerfeuer, Bienendaten im Bienenstock und weitere vanilla-freundliche Funktionen anzeigen lassen.`
            },
            "appleskin-protocol": {
                default: false,
                desc: `Ob die [AppleSkin](https://modrinth.com/mod/appleskin)-Protokoll-Unterstützung aktiviert werden soll.<br>
                    Wenn auf \`true\` gesetzt, können Spieler, die die AppleSkin-Mod installiert haben, die genauen Sättigungs-/Erschöpfungswerte auf dem Client anzeigen lassen.`
            },
            "appleskin-protocol-sync-tick-interval": {
                default: 20,
                desc: `Wie oft der Server AppleSkin-Daten mit Clients synchronisieren soll, die AppleSkin installiert haben.<br>
                    Dies hat nur Auswirkungen, wenn \`appleskin-protocol\` oben \`true\` ist.<br>
                    (Einheit: Tick, Standardwert 20 Ticks = 1 Sekunde)`
            },
            "asteorbar-protocol": {
                default: false,
                desc: `Ob die [AsteorBar](https://modrinth.com/mod/asteorbar)-Protokoll-Unterstützung aktiviert werden soll.<br>
                    Wenn auf \`true\` gesetzt, können Spieler, die die AsteorBar-Mod installiert haben, die genauen Sättigungs-/Erschöpfungswerte auf dem Client anzeigen lassen.`
            },
            "chatimage-protocol": {
                default: false,
                desc: `Ob die [ChatImage](https://modrinth.com/mod/chatimage)-Protokoll-Unterstützung aktiviert werden soll.<br>
                    Wenn auf \`true\` gesetzt, können Spieler, die die ChatImage-Mod installiert haben, das Bild sehen, das von anderen im CICode-Format gesendet wurde.`
            },
            "xaero-map-protocol": {
                default: false,
                desc: `Ob die [XaeroMap](https://modrinth.com/mod/xaeros-minimap)-Protokoll-Unterstützung aktiviert werden soll.<br>
                    Wenn auf \`true\` gesetzt, können Spieler, die Xaero's MiniMap Mod oder Xaero's WorldMap Mod installiert haben, Koordinatenpunkte und Todespunkte basierend auf der \`protocol-support.xaero-map-server-id\` des Servers unten speichern.`
            },
            "xaero-map-server-id": {
                default: 513317,
                desc: `Eindeutige Nummer-ID für XaeroMap, um den Server zu identifizieren.<br>
                    Dies kann verhindern, dass Punkte gelöscht/aktualisiert werden, wenn sich der Servername oder die IP-Adresse ändert. Ändere diesen Wert bei Bedarf.<br>
                    Dieser Wert wird beim ersten Serverstart zufällig generiert.`
            },
            "syncmatica-protocol": {
                default: false,
                desc: `Ob die [Syncmatica](https://modrinth.com/mod/syncmatica)-Protokoll-Unterstützung aktiviert werden soll.<br>
                    Wenn auf \`true\` gesetzt, können Spieler, die die Syncmatica-Mod installiert haben, ihre [Litematica](https://modrinth.com/mod/litematica)-Schematic-Dateien hochladen oder geteilte Schematic-Dateien vom Server herunterladen. Jeder Spieler mit installierter Syncmatica-Mod kann auf geteilte Schematics zugreifen, die von anderen hochgeladen wurden.`
            },
            "syncmatica-quota": {
                default: false,
                desc: "Ob das maximale Dateigrößenlimit für jede geteilte Schematic-Datei der Litematica-Mod aktiviert werden soll."
            },
            "syncmatica-quota-limit": {
                default: 40000000,
                desc: `Die maximale Dateigröße jeder geteilten Schematic-Datei, die auf den Server hochgeladen wird.<br>
                    (Einheit: Byte, Standardwert 40.000.000 Bytes ≈ 38 MB)`
            },
            "do-a-barrel-roll-protocol": {
                default: false,
                desc: `Ob die [Do a Barrel Roll](https://modrinth.com/mod/do-a-barrel-roll)-Protokoll-Unterstützung aktiviert werden soll.<br>
                    Wenn auf \`true\` gesetzt, können die visuellen Effekte von Do a Barrel Roll mit anderen Spielern synchronisiert werden, die diese Mod installiert haben.`
            },
            "do-a-barrel-roll-allow-thrusting": {
                default: false,
                desc: "Ob Spielern erlaubt werden soll, die Option \`enable_thrust\` in ihrer Client-Konfiguration zu aktivieren."
            },
            "do-a-barrel-roll-force-enabled": {
                default: false,
                desc: "Ob die Mod für alle Spieler, die diese Mod installiert haben, zwangsweise aktiviert werden soll, unabhängig von ihrer Client-Konfiguration."
            },
            "do-a-barrel-roll-force-installed": {
                default: false,
                desc: "Ob Spieler abgewiesen werden sollen, wenn sie diese Mod nicht in ihrem Client installiert haben."
            },
            "do-a-barrel-roll-installed-timeout": {
                default: 0,
                desc: `Die Zeitspanne, die gewartet werden soll, bis ein Client auf das \`do_a_barrel_roll:config_sync\`-Paket antwortet.<br>
                    (Einheit: Tick)<br>
                    Wenn auf \`true\` gesetzt, werden Spieler, die diese Mod nicht in ihrem Client installiert haben, nach Ablauf dieses Timeouts gekickt.`
            }
        }
    },

    misc: {
        __desc__: "Dieser Abschnitt enthält einige sonstige Funktionen.",
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
                    default: true,
                    desc: "Ob eine Nachricht gesendet werden soll, wenn der Spieler beitritt."
                },
                message: {
                    default: "default",
                    desc: "Die Beitrittsnachricht des Spielers."
                }
            },
            quit: {
                enabled: {
                    default: true,
                    desc: "Ob eine Nachricht gesendet werden soll, wenn der Spieler den Server verlässt."
                },
                message: {
                    default: "default",
                    desc: "Die Verlassensnachricht des Spielers."
                }
            }
        },
        "including-5s-in-get-tps": {
            default: true,
            desc: `Ob 5-Sekunden-TPS in das Ergebnis der API \`Bukkit#getTPS\` und \`Server#getTPS\` aufgenommen werden sollen.<br>
                Befehle wie \`/tps\` zeigen dies unabhängig davon an.<br>
                <ul>
                <li>Wenn auf \`true\` gesetzt, kannst du die \`getTPS\`-Methode verwenden, um ein TPS-Long-Array mit 4 Elementen \`[5s, 1m, 5m, 15m]\` zu erhalten.</li>
                <li>Wenn auf \`false\` gesetzt, kannst du die \`getTPS\`-Methode verwenden, um ein TPS-Long-Array mit 3 Elementen \`[1m, 5m, 15m]\` zu erhalten.</li>
                </ul>
                <details class="tip custom-block">
                <summary class="custom-block-title custom-block-title-default">Möchtest du tiefer eintauchen?</summary>
                Wenn du die Leaf API für deine Plugins verwendest. Oder auf Leaf läufst und Reflection verwendest, um TPS zu erhalten, kannst du \`Bukkit#getTPSIncluding5SecondAverage\` verwenden, um das TPS-Array einschließlich 5-Sekunden-TPS \`[5s, 1m, 5m, 15m]\` zu erhalten.<br>
                Außerdem kannst du \`Bukkit#get5SecondTPSAverage\` verwenden, um den Durchschnittswert der 5-Sekunden-TPS als \`double\` zu erhalten.
                </details>`
        },
        "lag-compensation": {
            enabled: {
                default: false,
                desc: `Die Lag-Kompensation wurde entwickelt, um die Auswirkungen von Server-Lag-Spikes oder niedrigen TPS-Situationen auf das Gameplay zu mildern, was das grundlegende Spielerlebnis während des Lags sicherstellen könnte.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`
            },
            "enable-for-water": {
                default: false,
                desc: `Ob Lag-Kompensation für fließendes Wasser aktiviert werden soll.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`
            },
            "enable-for-lava": {
                default: false,
                desc: `Ob Lag-Kompensation für fließende Lava aktiviert werden soll.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`
            }
        },
        "remove-change-non-editable-sign-warning": {
            default: false,
            desc: `Ob der Server eine Warnmeldung ausgibt, wenn Spieler versuchen, ein Schild zu bearbeiten, das sie nicht bearbeiten dürfen.<br>
                Die Warnmeldung sieht so aus: \`Player [...] just tried to change non-editable sign\`.<br>
                Wenn auf \`true\` gesetzt, verhindert dies Konsolen-Spam, der durch Spieleraktionen oder andere Fälle verursacht wird.<br>
                <br>
                __⚡Empfohlener Wert: \`true\`__`
        },
        "remove-spigot-check-bungee-config": {
            default: false,
            desc: `Ob der Spieler über einen Proxy auf den Backend-Server gelangen kann, ohne dass der Backend-Server den BungeeCord-Modus in \`spigot.yml\` aktiviert hat.<br>
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">Warnung</p>
                Es wird nicht empfohlen, diese Option zu ändern, es sei denn, du bist sicher, was du tust.<br>
                Und sie könnte in Zukunft entfernt werden.
                </div>`
        },
        "secure-seed": {
            enabled: {
                default: false,
                desc: `Ob der sichere Seed (Secure Seed) verwendet werden soll.<br>
                    <br>
                    Der sichere Seed stellt sicher, dass alle Erze und Strukturen mit einem 1024-Bit-Seed unter Verwendung einer kryptografischen Hash-Funktion mit hoher Sicherheit generiert werden, anstatt einen 64-Bit-Seed wie in Vanilla zu verwenden. Dies schützt die Struktur-Seeds durch rechnerische Sicherheit und macht das Seed-Cracking nahezu unmöglich.<br>
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">Warnung</p>
                    Der sichere Seed ändert grundlegend die Positionen von Erzen und Strukturen im Vergleich zu Vanilla.<br>
                    Dies gilt nur für neu generierte Chunks. Daher musst du eine neue Welt vorbereiten, wenn du diese Option aktivieren möchtest.<br>
                    Sobald diese Option aktiviert ist, kannst du sie nicht deaktivieren, um zur Vanilla-Generierung zurückzukehren, es sei denn, du generierst die gesamte Welt vor, da neu generierte Chunks sonst Terrain-Unstimmigkeiten aufweisen.
                    </div>`
            }
        },
        sentry: {
            __desc__: `[Sentry](https://sentry.io/welcome/) ist ein Anwendungsüberwachungsdienst für verbesserte Fehlerprotokollierung und -verfolgung. Hilft dem Server-Entwicklerteam bei der besseren Wartung.<br>
                <br>
                Nach der Aktivierung der Sentry-Integration für deinen Server musst du keine langen Logs mehr manuell prüfen, um Fehler zu finden. Sentry kann Fehler sammeln, die auf deinem Server aufgetreten sind, ermöglicht es dir, Fehler im Web-Panel von Sentry zu verfolgen, und hilft dir, diese einfacher und schneller zu lokalisieren und zu beheben.<br>
                <br>
                Siehe __[How to Setup Sentry](../how-to/setup-sentry)__, um zu erfahren, wie du es einrichtest und den DSN-Key für \`sentry.dsn\` unten erhältst.<br>`,
            dsn: {
                default: "''",
                desc: `Der DSN-Key deines Sentry.<br>
                    Wenn ein leerer Wert \`''\` angegeben wird, ist Sentry deaktiviert.`
            },
            "log-level": {
                default: "WARN",
                desc: `Logs mit einem Level höher oder gleich diesem Level werden aufgezeichnet.<br>
                    Die gültigen Werte für diese Option sind: \`"WARN"\`, \`"ERROR"\` und \`"FATAL"\`.`
            },
            "only-log-thrown": {
                default: true,
                desc: "Ob Sentry nur Logs mit Javas \`Throwable\` aufzeichnet."
            }
        },
        rebrand: {
            "server-mod-name": {
                default: "Leaf",
                desc: "Der Server-Markenname, der im F3-Debug-Menü des Clients und in der Server-MOTD angezeigt wird."
            },
            "server-gui-name": {
                default: "Leaf Console",
                desc: "Der Titel, der im Server-GUI-Fenster angezeigt wird, wenn du den Server ohne die Option \`--nogui\` im Start-Flag gestartet hast."
            }
        },
        message: {
            "unknown-command": {
                default: "default",
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
                    </div>`
            }
        },
        "vanilla-username-check": {
            "remove-all-check": {
                default: false,
                desc: `Ob die Vanilla-Benutzernamenprüfung entfernt werden soll, was alle Zeichen als Benutzernamen erlaubt, einschließlich chinesischer Zeichen usw.
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">Experimentell</p>
                    Das Entfernen aller Benutzernamenprüfungen ist __UNSICHER UND GEFÄHRLICH, VERWENDUNG AUF EIGENE GEFAHR!__
                    </div>`
            },
            "enforce-skull-validation": {
                default: true,
                desc: "Ob die Schädel-Validierung erzwungen werden soll, um zu verhindern, dass Schädel mit ungültigen Namen die Verbindung des Clients trennen."
            },
            "allow-old-players-join": {
                default: false,
                desc: `Ob alten Spielern erlaubt werden soll, dem Server beizutreten, nachdem der Benutzernamen-Regex geändert wurde, auch wenn ihre Namen die neuen Anforderungen nicht erfüllen.
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">Experimentell</p>
                    Das Entfernen aller Benutzernamenprüfungen für alte Spieler ist __UNSICHER UND GEFÄHRLICH, VERWENDUNG AUF EIGENE GEFAHR!__
                    </div>`
            },
            "use-username-regex": {
                default: false,
                desc: `Ob der Benutzername-Regex zur Validierung von Benutzernamen verwendet werden soll, wodurch nur im Regex spezifizierte Zeichen erlaubt sind.<br>
                    Diese Option ist inkompatibel mit \`remove-all-check\` oben. Du kannst nur eine dieser beiden Optionen verwenden.`
            },
            "username-regex": {
                default: "^[a-zA-Z0-9_.]*$",
                desc: `Der Benutzername-Regex legt fest, welche Zeichen in Benutzernamen erlaubt sind.<br>
                    Dies hat nur Auswirkungen, wenn \`use-username-regex\` oben \`true\` ist.`
            }
        }
    }
};

export default config;
