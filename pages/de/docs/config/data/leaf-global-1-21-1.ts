import type { ConfigRoot } from "@/.vitepress/theme/components/config/types";

const config: ConfigRoot = {
    "config-version": {
        default: "3.0"
    },

    async: {
        __desc__:
            "Dieser Abschnitt enthält asynchrone Funktionen, die dazu dienen, die Last auf dem Haupt-Thread (Server-Thread) zu verringern, indem Aufgaben asynchron verarbeitet werden.",
        "async-entity-tracker": {
            enabled: {
                default: false,
                desc: `Ob das Entity-Tracking asynchron erfolgen soll.<br>
                    Dies kann die Leistung erheblich verbessern, insbesondere in Situationen mit einer großen Anzahl von Entities in einem kleinen Bereich.
                    <br>
                    __⚡Empfohlener Wert: \`true\`__
                    <div class="tip custom-block">
                    <p class="custom-block-title custom-block-title-default">Achtung</p>
                    Wenn du Plugins wie Citizens installiert hast, die echte Entities oder spielerartige Entities als "NPC" verwenden, lies bitte auch \`compat-mode\` unten für weitere Informationen.
                    </div>`
            },
            "compat-mode": {
                default: false,
                desc: `Ob der Kompatibilitätsmodus für Plugins wie Citizens oder NPC-Plugins, die echte, spielerartige Entities verwenden, aktiviert werden soll.<br>
                    Wenn auf \`true\` gesetzt, kann das Sichtbarkeitsproblem behoben werden, bei dem spielerartige NPCs manchmal verschwinden.<br>
                    <br>
                    Du solltest \`compat-mode\` aktivieren, um die asynchrone Entity-Tracker-Funktion zu nutzen, __NUR WENN__ du Citizens oder eine andere Art von Real-Entity-NPC-Plugins installiert hast.<br>
                    <br>
                    Wir empfehlen jedoch weiterhin die Verwendung von paketbasierten / virtuellen Entity-NPC-Plugins, um eine bessere Leistung zu erzielen, z. B. [ZNPC Plus](https://github.com/Pyrbu/ZNPCsPlus), [Adyeshach](https://github.com/TabooLib/Adyeshach), [Fancy NPC](https://modrinth.com/plugin/fancynpcs) oder andere, dann kann \`compat-mode\` deaktiviert bleiben.`
            },
            "max-threads": {
                default: 0,
                desc: `Maximale Anzahl an Threads, die für die asynchrone Entity-Pfadfindung verwendet werden sollen.<br>
                    Zum Beispiel:<br>
                    <ul>
                    <li>Wenn ein Wert &leq; \`0\` angegeben wird, wird automatisch die Anzahl der CPU-Kerne plus dem Wert als Anzahl der Threads verwendet, mit einem Minimum von 1.</li>
                    <li>Wenn auf \`0\` gesetzt, werden automatisch 1/4 der CPU-Kerne verwendet, mindestens jedoch 1.</li>
                    </ul>
                    __⚡Empfohlener Wert: 1/3 der CPU-Kerne__`
            },
            keepalive: {
                default: 60,
                desc: `Die Keepalive-Zeit für Threads; Threads ohne Aufgaben werden beendet, wenn sie diese Zeit überschreiten.<br>
                    (Einheit: Sekunde)`
            }
        },
        "async-playerdata-save": {
            enabled: {
                default: false,
                desc: `Ob das Speichern von Spielerdaten asynchron erfolgen soll. (I/O-Operationen sind aufwändig)
                    <div class="warning custom-block">
                    <p class="custom-block-title custom-block-title-default">Experimentell</p>
                    Experimentelle Funktion, kann unter Umständen zu Datenverlust oder Dateninkonsistenz führen!
                    </div>`
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
            }
        },
        "async-mob-spawning": {
            enabled: {
                default: true,
                desc: `Ob Mob-Spawning asynchron erfolgen soll.<br>
                    <br>
                    Auf Servern mit vielen Entities kann dies die Leistung um bis zu ~15% verbessern. Damit dies funktioniert, muss in der Paper-Config \`per-player-mob-spawns\` auf \`true\` gesetzt sein.<br>
                    Eine kurze Anmerkung: Dies spawnt Mobs nicht tatsächlich asynchron (das wäre sehr unsicher). Es lagert lediglich einige teure Berechnungen aus, die für das Mob-Spawning erforderlich sind.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`
            }
        },
        "async-locator": {
            enabled: {
                default: false,
                desc: `Ob das Finden von Strukturen (Locator) asynchron erfolgen soll.<br>
                    Dies lagert die Struktursuche in andere Threads aus.<br>
                    Derzeit verfügbar für:
                    <ul>
                    <li>\`/locate\` Befehl</li>
                    <li>Delfin-Schatzsuche</li>
                    <li>Enderauge-Festungssuche (Stronghold)</li>
                    </ul>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`
            },
            threads: {
                default: 0,
                desc: `Maximale Anzahl an Threads, die für den asynchronen Locator verwendet werden sollen.<br>
                    Wenn ein Wert &leq; \`0\` angegeben wird, wird automatisch 1 Thread verwendet.<br>
                    <br>
                    __⚡Empfohlener Wert: \`1\` oder \`2\`__`
            },
            keepalive: {
                default: 60,
                desc: `Die Keepalive-Zeit für Threads; Threads ohne Aufgaben werden beendet, wenn sie diese Zeit überschreiten.<br>
                    (Einheit: Sekunde)`
            }
        }
    },

    performance: {
        __desc__:
            "Dieser Abschnitt enthält Leistungsoptimierungen, die darauf abzielen, unnötige Berechnungen zu reduzieren oder effizientere Methoden zur Optimierung des Servers zu verwenden.",
        "use-virtual-thread-for-async-chat-executor": {
            default: true,
            desc: `Ob der in JDK 21 eingeführte [Virtual Thread](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html) für den Async Chat Executor verwendet werden soll.<br>
                <br>
                __⚡Empfohlener Wert: \`true\`__`
        },
        "use-virtual-thread-for-async-scheduler": {
            default: true,
            desc: `Ob der in JDK 21 eingeführte [Virtual Thread](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html) für den CraftAsyncScheduler verwendet werden soll, was die Leistung von Plugins verbessern könnte, die den asynchronen Scheduler von Bukkit stark nutzen.<br>
                <br>
                __⚡Empfohlener Wert: \`true\` (Nur wenn alle Plugins Virtual Threads unterstützen)__`
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
        "inactive-goal-selector-throttle": {
            default: true,
            desc: `Ob die [goal selector](https://maven.fabricmc.net/docs/yarn-1.21.1+build.3/net/minecraft/entity/ai/goal/GoalSelector.html)-Berechnungen für Entities gedrosselt werden sollen, die inaktiv sind (typischerweise weit weg von Spielern).<br>
                Anstatt den Goal Selector jeden Tick zu ticken, tickt er weniger häufig jede Sekunde. Dies kann die Leistung leicht verbessern, hat aber geringfügige Auswirkungen auf das Gameplay.<br>
                <br>
                __⚡Empfohlener Wert: \`true\`__
                <table>
                <tr><td><b>Werte für Ziele</b></td><td></td></tr>
                <tr><td><i>Optimierung</i></td><td><code>true</code></td></tr>
                <tr><td><i>Vanilla-Verhalten</i></td><td><code>false</code></td></tr>
                </table>`
        },
        "throttle-hopper-when-full": {
            enabled: {
                default: false,
                desc: `Ob Versuche von Trichtern (Hopper), Items zu übertragen, gedrosselt werden sollen, wenn der Zielcontainer voll ist.<br>
                    Verhindert, dass der Trichter jeden Tick versucht, Items zu verschieben, selbst wenn dies immer wieder fehlschlägt.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\` (setze \`enabled\` unten auf true)__
                    <table>
                    <tr><td><b>Werte für Ziele</b></td><td></td></tr>
                    <tr><td><i>Optimierung</i></td><td><code>true</code></td></tr>
                    <tr><td><i>Vanilla-Verhalten</i></td><td><code>false</code></td></tr>
                    </table>`
            },
            "skip-ticks": {
                default: 0,
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
        "skip-ai-for-non-aware-mob": {
            default: true,
            desc: `Ob AI-Ticks für Mobs, die sowohl *inaktiv* als auch *unaware* (nicht aufmerksam) sind, komplett übersprungen werden sollen.<br>
                Nicht aufmerksame Mobs, die auf diese Weise optimiert wurden, führen keine eigenständigen Aktionen aus oder reagieren nicht, bis sie wieder aktiv werden, siehe [Mob.html#setAware(boolean)](https://jd.papermc.io/paper/1.21.1/org/bukkit/entity/Mob.html#setAware(boolean)) für weitere Informationen.<br>
                <br>
                __⚡Empfohlener Wert: \`true\`__
                <table>
                <tr><td><b>Werte für Ziele</b></td><td></td></tr>
                <tr><td><i>Optimierung</i></td><td><code>true</code></td></tr>
                <tr><td><i>Vanilla-Verhalten</i></td><td><code>false</code></td></tr>
                </table>`
        },
        "reduce-packets": {
            __desc__: "Dieser Abschnitt ist für Funktionen zur Reduzierung nutzloser Pakete.",
            "reduce-entity-move-packets": {
                default: false,
                desc: `Ob nutzlose Entity-Bewegungspakete, die an Spieler gesendet werden (z. B. kleine Bewegungen), reduziert werden sollen.<br>
                    Dies kann Bandbreite sparen und die clientseitige Verarbeitungslast verringern, was Bewegungen bei hoher Entity-Anzahl oder leichten Lags möglicherweise flüssiger erscheinen lässt.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`
            }
        },
        "optimized-powered-rails": {
            default: true,
            desc: `Ob optimierte Antriebsschienen (Powered Rails) verwendet werden sollen. Nutzt eine komplett neu geschriebene Version der Iterationslogik für Antriebsschienen, die das Vanilla-Verhalten beibehält und eine 4x schnellere Leistung erreichen kann.<br>
                <br>
                __⚡Empfohlener Wert: \`true\`__`
        },
        "optimize-minecart": {
            enabled: {
                default: false,
                desc: `Ob Minecart-Ticking optimiert werden soll. Durch das Überspringen von Tick-Kollisionen, um teure \`getEntities()\`-Aufrufe und Bukkit-Event-Aufrufe zu reduzieren.<br>
                    Dies kann eine große Menge gestapelter Minecarts besser handhaben, was für [Anarchy-Server](https://minecraftservers.org/type/anarchy) nützlich ist.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__
                    <table>
                    <tr><td><b>Werte für Ziele</b></td><td></td></tr>
                    <tr><td><i>Optimierung</i></td><td><code>true</code></td></tr>
                    <tr><td><i>Vanilla-Verhalten</i></td><td><code>false</code></td></tr>
                    </table>`
            },
            "skip-tick-count": {
                default: 30,
                desc: `Wie viele Ticks übersprungen werden sollen, bevor erneut auf Minecart-Kollisionen geprüft wird.<br>
                    <br>
                    __⚡Empfohlener Wert: \`30\`__`
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
        "faster-random-generator": {
            enabled: {
                default: false,
                desc: `Ob der schnellere Zufallsgenerator (Random Generator), der in JDK 17 eingeführt wurde, verwendet werden soll.<br>
                    Zufall wird fast überall in Minecraft verwendet; dies zu aktivieren kann eine ordentliche Leistungsverbesserung bringen.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\` (setze \`enabled\` unten auf true)__
                    <div class="tip custom-block">
                    <p class="custom-block-title custom-block-title-default">Achtung</p>
                    Dies erfordert eine JVM, die \`RandomGenerator\` unterstützt. Einige JREs unterstützen dies nicht.
                    </div>`
            },
            "random-generator": {
                default: "Xoroshiro128PlusPlus",
                desc: `Der spezifische Algorithmus des Zufallsgenerators, der verwendet werden soll.<br>
                    Verfügbare Zufallsgeneratoren findest du unter [Random Number Generators in Java](https://www.baeldung.com/java-17-random-number-generators#1-api-design-1) oder [JEP 356](https://openjdk.org/jeps/356).<br>
                    <br>
                    __⚡Empfohlener Wert: \`Xoroshiro128PlusPlus\`__`
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
        "enable-cached-minecraft-to-bukkit-entitytype-convert": {
            default: true,
            desc: `Ob das Ergebnis der Umwandlung von *Minecraft EntityType* zu *Bukkit EntityType* zwischengespeichert (gecached) werden soll. Diese Umwandlung kann etwas aufwändig sein, insbesondere in der Spawning-Logik, daher kann das Caching die Leistung leicht verbessern.<br>
                <br>
                __⚡Empfohlener Wert: \`true\`__`
        },
        dab: {
            enabled: {
                default: true,
                __desc__:
                    "Dynamic Activation of Brain, auch bekannt als DAB, optimiert das 'Gehirn' (Brain) von Entities, indem die Frequenz ihres Brain-Tickings verringert wird, wenn sie weit von Spielern entfernt sind. Dies ist ein lohnender Kompromiss zur Leistungsverbesserung, wenn viele Entities vorhanden sind.",
                enabled: {
                    default: true,
                    desc: `Ob DAB aktiviert werden soll.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\` (setze \`enabled\` unten auf true)__
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
                    default: "[]",
                    desc: `Eine Liste von Entities, die nicht von DAB betroffen sein sollen.<br>
                    <br>
                    Einige Survival-Server haben Mob-Farmen, die darauf angewiesen sind, dass Mobs ein Ziel haben. Diese Art von "Pfadfindungs"-Mob-Farm kann durch DAB beeinträchtigt werden. Diese Situation kann gelöst werden, indem spezifische Mobs der Mob-Farm zu dieser DAB-Blacklist hinzugefügt werden.<br>
                    Wenn bestimmte Mob-Farmen auf deinem Server defekt sind, Mobs einfrieren und sich nicht bewegen, und du nicht sicher bist, ob dies durch DAB verursacht wird. Du kannst versuchen, sie zu dieser Liste hinzuzufügen, um zu sehen, ob das Problem dadurch behoben wird.<br>
                    <br>
                    Format: \`[villager]\` oder \`[villager, zombified_piglin]\` (Du findest alle Entity-Typen in [Paper's Javadoc](https://jd.papermc.io/paper/1.21.1/org/bukkit/entity/EntityType.html)).<br>
                    <br>
                    [💡 Du möchtest tiefer eintauchen?](guides/dab-blacklist-format)`
                }
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
        "entity-timeouts": {
            __desc__: `Diese Werte definieren die maximale Lebensdauer eines Entities (d.h. Entity TTL).<br>
                (Einheit: Tick)<br>
                Wenn ein Entity in dieser Liste ist und länger als diese Anzahl von Ticks überlebt hat, wird es entfernt. ⓘ<br>
                Wenn ein Wert \`-1\` angegeben wird, wird die Entity TTL-Prüfung für ein spezifisches Entity deaktiviert.<br>
                <br>
                __⚡Empfohlener Wert:__
                <table>
                <thead><tr><th>Entity</th><th>Max Lifespan</th></tr></thead>
                <tbody>
                <tr><td>SNOWBALL</td><td>200</td></tr>
                <tr><td>LLAMA_SPIT</td><td>150</td></tr>
                <tr><td>DRAGON_FIREBALL</td><td>150</td></tr>
                <tr><td>EGG</td><td>300</td></tr>
                <tr><td>FIREBALL</td><td>600</td></tr>
                <tr><td>SMALL_FIREBALL</td><td>400</td></tr>
                <tr><td>WIND_CHARGE</td><td>200</td></tr>
                <tr><td>BREEZE_WIND_CHARGE</td><td>200</td></tr>
                <tr><td>WITHER_SKULL</td><td>200</td></tr>
                </tbody></table>
                ⓘ = Hier bedeutet die Zeit, die das Entity überlebt hat, die gesamte Lebenszeit des Entities und wird nicht durch Chunk-Entladen oder -Laden zurückgesetzt.`,
            ALLAY: {
                default: -1
            },
            AREA_EFFECT_CLOUD: {
                default: -1
            },
            ARMADILLO: {
                default: -1
            },
            ARMOR_STAND: {
                default: -1
            },
            ARROW: {
                default: -1
            },
            AXOLOTL: {
                default: -1
            },
            BAT: {
                default: -1
            },
            BEE: {
                default: -1
            },
            BLAZE: {
                default: -1
            },
            BOAT: {
                default: -1
            },
            BOGGED: {
                default: -1
            },
            BREEZE: {
                default: -1
            },
            BREEZE_WIND_CHARGE: {
                default: -1
            },
            CAMEL: {
                default: -1
            },
            CAT: {
                default: -1
            },
            CAVE_SPIDER: {
                default: -1
            },
            CHEST_BOAT: {
                default: -1
            },
            CHEST_MINECART: {
                default: -1
            },
            CHICKEN: {
                default: -1
            },
            COD: {
                default: -1
            },
            COMMAND_BLOCK_MINECART: {
                default: -1
            },
            COW: {
                default: -1
            },
            CREEPER: {
                default: -1
            },
            DOLPHIN: {
                default: -1
            },
            DONKEY: {
                default: -1
            },
            DRAGON_FIREBALL: {
                default: -1
            },
            DROWNED: {
                default: -1
            },
            EGG: {
                default: -1
            },
            ELDER_GUARDIAN: {
                default: -1
            },
            ENDER_DRAGON: {
                default: -1
            },
            ENDER_PEARL: {
                default: -1
            },
            ENDERMAN: {
                default: -1
            },
            ENDERMITE: {
                default: -1
            },
            EVOKER: {
                default: -1
            },
            EVOKER_FANGS: {
                default: -1
            },
            EXPERIENCE_BOTTLE: {
                default: -1
            },
            EXPERIENCE_ORB: {
                default: -1
            },
            EYE_OF_ENDER: {
                default: -1
            },
            FIREWORK_ROCKET: {
                default: -1
            },
            FOX: {
                default: -1
            },
            FROG: {
                default: -1
            },
            FURNACE_MINECART: {
                default: -1
            },
            GHAST: {
                default: -1
            },
            GIANT: {
                default: -1
            },
            GLOW_SQUID: {
                default: -1
            },
            GOAT: {
                default: -1
            },
            GUARDIAN: {
                default: -1
            },
            HOGLIN: {
                default: -1
            },
            HOPPER_MINECART: {
                default: -1
            },
            HORSE: {
                default: -1
            },
            HUSK: {
                default: -1
            },
            ILLUSIONER: {
                default: -1
            },
            IRON_GOLEM: {
                default: -1
            },
            ITEM: {
                default: -1
            },
            OMINOUS_ITEM_SPAWNER: {
                default: -1
            },
            FIREBALL: {
                default: -1
            },
            LIGHTNING_BOLT: {
                default: -1
            },
            LLAMA: {
                default: -1
            },
            LLAMA_SPIT: {
                default: -1
            },
            MAGMA_CUBE: {
                default: -1
            },
            MOOSHROOM: {
                default: -1
            },
            MULE: {
                default: -1
            },
            OCELOT: {
                default: -1
            },
            PANDA: {
                default: -1
            },
            PARROT: {
                default: -1
            },
            PHANTOM: {
                default: -1
            },
            PIG: {
                default: -1
            },
            PIGLIN: {
                default: -1
            },
            PIGLIN_BRUTE: {
                default: -1
            },
            PILLAGER: {
                default: -1
            },
            POLAR_BEAR: {
                default: -1
            },
            POTION: {
                default: -1
            },
            PUFFERFISH: {
                default: -1
            },
            RABBIT: {
                default: -1
            },
            RAVAGER: {
                default: -1
            },
            SALMON: {
                default: -1
            },
            SHEEP: {
                default: -1
            },
            SHULKER: {
                default: -1
            },
            SHULKER_BULLET: {
                default: -1
            },
            SILVERFISH: {
                default: -1
            },
            SKELETON: {
                default: -1
            },
            SKELETON_HORSE: {
                default: -1
            },
            SLIME: {
                default: -1
            },
            SMALL_FIREBALL: {
                default: -1
            },
            SNIFFER: {
                default: -1
            },
            SNOW_GOLEM: {
                default: -1
            },
            SNOWBALL: {
                default: -1
            },
            SPAWNER_MINECART: {
                default: -1
            },
            SPECTRAL_ARROW: {
                default: -1
            },
            SPIDER: {
                default: -1
            },
            SQUID: {
                default: -1
            },
            STRAY: {
                default: -1
            },
            STRIDER: {
                default: -1
            },
            TADPOLE: {
                default: -1
            },
            TNT_MINECART: {
                default: -1
            },
            TRADER_LLAMA: {
                default: -1
            },
            TRIDENT: {
                default: -1
            },
            TROPICAL_FISH: {
                default: -1
            },
            TURTLE: {
                default: -1
            },
            VEX: {
                default: -1
            },
            VILLAGER: {
                default: -1
            },
            VINDICATOR: {
                default: -1
            },
            WANDERING_TRADER: {
                default: -1
            },
            WARDEN: {
                default: -1
            },
            WIND_CHARGE: {
                default: -1
            },
            WITCH: {
                default: -1
            },
            WITHER: {
                default: -1
            },
            WITHER_SKELETON: {
                default: -1
            },
            WITHER_SKULL: {
                default: -1
            },
            WOLF: {
                default: -1
            },
            ZOGLIN: {
                default: -1
            },
            ZOMBIE: {
                default: -1
            },
            ZOMBIE_HORSE: {
                default: -1
            },
            ZOMBIE_VILLAGER: {
                default: -1
            },
            ZOMBIFIED_PIGLIN: {
                default: -1
            },
            FISHING_BOBBER: {
                default: -1
            }
        }
    },

    fixes: {
        __desc__: "Dieser Abschnitt enthält Bugfixes für spezifische Probleme.",
        "dont-place-player-if-server-full": {
            default: false,
            desc: `Ob Spielern der Beitritt verweigert werden soll, wenn der Server voll ist (definiert als \`max-players\` in \`server.properties\`).<br>
                Diese Option behebt [Paper#10668](https://github.com/PaperMC/Paper/issues/10668).<br>
                <br>
                Wenn auf \`true\` gesetzt, solltest du Spielern die Berechtigung \`purpur.joinfullserver\` geben, anstatt die \`PlayerLoginEvent#allow\` API zu verwenden, um Spielern das Umgehen des Limits zu erlauben.`
        }
    },

    "gameplay-mechanisms": {
        __desc__: "Dieser Abschnitt enthält Funktionen, die die Spielmechanik modifizieren oder verbessern.",
        "use-spigot-item-merging-mechanism": {
            default: true,
            desc: `Ob fallen gelassene Items basierend auf ihrer Tick-Reihenfolge zusammengeführt (gemerged) werden sollen, was das langjährige Standardverhalten von Spigot ist.<br>
                <br>
                In Spigot wird das Item-Entity, das später tickt, in das früher tickende zusammengeführt. Wenn der Merge-Radius relativ größer ist, kann dies verhindern, dass fallen gelassene Items an unerwarteten Orten stecken bleiben. Dies ist nützlich für Farmen oder Redstone-Bauten, die zahlreiche fallen gelassene Items erzeugen können.<br>
                In Vanilla basiert das Zusammenführen von Items jedoch auf der Item-Anzahl des Stacks. Der Stack mit der kleineren Anzahl wird mit dem mit der größeren Anzahl zusammengeführt.
                <table>
                <tr><td><b>Werte für Ziele</b></td><td></td></tr>
                <tr><td><i>SMP-freundlich</i></td><td><code>true</code></td></tr>
                <tr><td><i>Vanilla-Verhalten</i></td><td><code>false</code></td></tr>
                </table>`
        },
        "smooth-teleport": {
            default: false,
            desc: `Ob ein "sanfter Teleport" (smooth teleport) durchgeführt werden soll, wenn Spieler die Dimension wechseln.<br>
                Dies erfordert, dass die ursprüngliche Welt und die Zielwelt die gleiche logische Höhe haben, um zu funktionieren.
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">Experimentell</p>
                Experimentelle Funktion, wird aktiv getestet, bitte melde alle Fehler, die auftreten.
                </div>`
        },
        "max-item-stack-count": {
            __desc__:
                `Konfigurierbare maximale Stack-Größe von fallen gelassenen Items.
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">Warnung</p>
                Wir __empfehlen nicht__, diese Funktion zu verwenden. Es ist in Arbeit und hat bekannte Probleme.<br>
                Diese Funktion kann in Zukunft entfernt werden. __Fass dies nicht an__, es sei denn, du weißt, was du tust!
                </div>`,
            "max-dropped-items-stack-count": {
                default: 0,
                desc: "Maximale Anzahl an fallen gelassenen Items zum Stapeln."
            },
            "max-container-destroy-count": {
                default: 0,
                desc: "Maximale Anzahl von Items, die fallen gelassen werden, wenn ein Container zerstört wird."
            }
        },
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
            }
        },
        player: {
            "disable-moved-wrongly-threshold": {
                default: false,
                desc: `Ob die in Spigot eingebauten "moves too quickly / wrongly" Checks für Spieler und Fahrzeuge deaktiviert werden sollen.<br>
                    Wenn auf \`true\` gesetzt, können Spieler sich bewegen oder Fahrzeuge (z. B. Minecarts) verwenden, um sich mit abnormaler Geschwindigkeit zu bewegen.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\`__`
            },
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
        "afk-command": {
            enabled: {
                default: false,
                desc: `Ob der AFK-Befehl basierend auf Minecrafts eingebautem [Idle-Timeout-Mechanismus](https://minecraft.wiki/w/Server.properties#:~:text=player%20have%20to%20idle) aktiviert werden soll. Spieler können den Befehl /afk verwenden, um ihren AFK-Modus umzuschalten, und ihr AFK-Status kann in der Tab-Liste angezeigt werden.<br>
                    <br>
                    Setze auch \`kick-if-idle\` in der Purpur-Config auf \`false\`, um zu verhindern, dass Spieler gekickt werden, wenn sie in den AFK-Modus wechseln. Die restlichen AFK-Einstellungen, konfigurierbare AFK-Nachrichten und Titel-Nachrichten befinden sich in der Purpur-Config.`
            }
        }
    },

    network: {
        __desc__: "Dieser Abschnitt enthält Funktionen, die sich auf das Server-Netzwerk beziehen.",
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
            }
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
        }
    },

    misc: {
        __desc__: "Dieser Abschnitt enthält einige sonstige Funktionen.",
        message: {
            "unknown-command": {
                default: "<red><lang:command.unknown.command><newline><detail>",
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
        "remove-vanilla-username-check": {
            default: true,
            desc: `Ob die Vanilla-Benutzernamenprüfung entfernt werden soll, um __alle Zeichen__ als Benutzernamen zu erlauben, einschließlich Chinesisch usw. (Dies ist nur für Offline-Server nützlich).<br>
                Wenn auf \`true\` gesetzt, können Spieler mit einem nicht-englischen Namen dem Server beitreten.`
        },
        "remove-spigot-check-bungee-config": {
            default: true,
            desc: `Ob der Spieler über einen Proxy auf den Backend-Server gelangen kann, ohne dass der Backend-Server den BungeeCord-Modus in \`spigot.yml\` aktiviert hat.<br>
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">Warnung</p>
                Es wird nicht empfohlen, diese Option zu ändern, es sei denn, du bist sicher, was du tust.<br>
                Und sie könnte in Zukunft entfernt werden.
                </div>`
        },
        "remove-change-non-editable-sign-warning": {
            default: false,
            desc: `Ob der Server eine Warnmeldung ausgibt, wenn Spieler versuchen, ein Schild zu bearbeiten, das sie nicht bearbeiten dürfen.<br>
                Die Warnmeldung sieht so aus: \`Player [...] just tried to change non-editable sign\`.<br>
                Wenn auf \`true\` gesetzt, verhindert dies Konsolen-Spam, der durch Spieleraktionen oder andere Fälle verursacht wird.<br>
                <br>
                __⚡Empfohlener Wert: \`true\`__`
        },
        "region-format-settings": {
            __desc__: `Linear ist ein Regionsdateiformat, das [zstd-Kompression](https://facebook.github.io/zstd/) anstelle von zlib in Vanilla Minecraft verwendet. Dieses Format spart etwa ~50% Speicherplatz.<br>
                Um das Linear-Regionsformat zu verwenden, stelle sicher, dass du die __[Linear Documentation](https://github.com/xymb-endcrystalme/LinearRegionFileFormatTools) gelesen__ und alle erforderlichen Schritte ausgeführt hast, und ändere dann \`region-format\` unten auf \`LINEAR\`.
                <div class="warning custom-block">
                <p class="custom-block-title custom-block-title-default">Warnung</p>
                Experimentelle Funktion, es besteht ein potenzielles Risiko des Verlusts von Chunk-Daten. Erstelle ein Backup deines Servers, bevor du zu Linear wechselst.<br>
                Außerdem empfehlen wir die Verwendung von Linear nicht, da das Vanilla-ANVIL-Format (\`.mca\`) ausreichend ist. Leaf verwendet die refactored Version des Linear-Flush-Systems, die sicherer, aber langsamer beim Speichern von Chunks ist, um Datenverlust weniger wahrscheinlich zu machen. Dieser Kompromiss lohnt sich jedoch, da Daten von unschätzbarem Wert sind.
                </div>`,
            "region-format": {
                default: "MCA",
                desc: `Spezifiziert das Format, das zum Speichern von Chunk-Daten in Regionsdateien verwendet wird.<br>
                    Verfügbare Regionsformate:<br>
                    <ul>
                    <li>\`MCA\`: Standardmäßiges Minecraft-ANVIL-Format unter Verwendung von zlib-Kompression.</li>
                    <li>\`LINEAR\`: Das Linear v1 Format. Die refactored Version von [EarthMe](https://github.com/MrHua269) hat das Linear-Flush-System behoben.</li>
                    </ul>`
            },
            "linear-compress-level": {
                default: 1,
                desc: `Das Kompressionslevel der Linear-Regionsformatdatei.<br>
                    Dies hat nur Auswirkungen, wenn \`region-format\` oben auf \`LINEAR\` steht.<br>
                    <br>
                    <ul>
                    <li>Wenn auf ein höheres Level (bis zu \`22\`) gesetzt, bietet es bessere Kompressionsverhältnisse, erfordert jedoch deutlich mehr CPU-Zeit für die Kompression.</li>
                    <li>Wenn auf ein niedrigeres Level gesetzt, komprimiert es schneller, benötigt aber mehr Platz. Level 1 verwendet die schnellste und leichteste Kompression.</li>
                    </ul>`
            },
            "throw-on-unknown-extension-detected": {
                default: false,
                desc: `Ob ein Fehler geworfen und der Server abstürzen soll, wenn eine unbekannte oder nicht übereinstimmende Regionsformat-Erweiterung beim Laden von Regionsdateien von der Festplatte erkannt wird.<br>
                    Dies kann Datenkorruption durch versehentlich konfigurierte falsche Regionsdateiformate in derselben Welt verhindern.<br>
                    <br>
                    Zum Beispiel:<br>
                    Wenn auf \`true\` gesetzt, stürzt der Server sofort ab, wenn \`.linear\`-Dateien geladen werden, während \`region-format\` oben auf \`MCA\` steht, oder umgekehrt.`
            },
            "flush-interval-seconds": {
                default: 5,
                desc: `Wie oft der Server versucht, zwischengespeicherte Linear-Regionsdateidaten auf die Festplatte zu flushen (schreiben).<br>
                Häufigeres Flushen reduziert potenziellen Datenverlust bei einem Absturz, erhöht aber die Festplatten-I/O.<br>
                (Einheit: Sekunde)`
            }
        },
        "lag-compensation": {
            enabled: {
                default: false,
                desc: `Die Lag-Kompensation wurde entwickelt, um die Auswirkungen von Server-Lag-Spikes oder niedrigen TPS-Situationen auf das Gameplay zu mildern, was das grundlegende Spielerlebnis während des Lags sicherstellen könnte.<br>
                    <br>
                    __⚡Empfohlener Wert: \`true\` (Setze auch \`enabled\` unten auf true)__`
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
        "hidden-item-components": {
            default: "[]",
            desc: `Die Liste der Komponenten-Typschlüssel, die vor dem Inventar des Spielers, das an Clients gesendet wird, verborgen werden sollen.<br>
                    <br>
                    Es kann verwendet werden, um komplexe Komponentendaten eines Items zu verbergen, um die Rendering-Last, häufige Animationen auf der Client-Seite und die Netzwerknutzung zu reduzieren. Die tatsächlichen Item-Daten sind nicht betroffen.<br>
                    <br>
                    Es sei darauf hingewiesen, dass sich diese Option von Papers [Item-Obfuskation](https://docs.papermc.io/paper/reference/global-configuration/#anticheat_obfuscation_items_enable_item_obfuscation) unterscheidet. Diese Option verbirgt nur Item-Komponentendaten aus dem eigenen Inventar des Spielers, anstatt Daten zu verbergen, die an andere gesendet werden.<br>
                    Zum Beispiel:<br>
                    <ul>
                    <li>Wenn der Wert \`[]\` angegeben wird, ist kein Item betroffen.</li>
                    <li>Wenn der Wert \`[\"minecraft:custom_data\"]\`, wird die \`custom_data\`-Komponente des Items auf dem Client des Spielers verborgen.</li>
                    </ul>
                    Siehe [List of components](https://minecraft.wiki/w/Data_component_format#List_of_components) um die vollständige Liste der verfügbaren Komponenten-Typschlüssel für Items zu erhalten.<br>
                    <div class="tip custom-block">
                    <p class="custom-block-title custom-block-title-default">Achtung</p>
                    Dies kann Resource Packs, Client-Mods oder spezifische Spielmechaniken beschädigen, die auf diesen clientseitigen Komponentendaten von Items basieren. Mit Vorsicht verwenden. Du musst wissen, welche Komponenten du verbirgst!
                    </div>`
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
        cache: {
            "cache-player-profile-result": {
                default: true,
                desc: `Ob die Profildaten des Spielers (z. B. UUID, Benutzername, Skin-/Cape-Texturen) gecacht werden sollen, wenn sie dem Server beigetreten sind.<br>
                        Dies kann Netzwerkanfragen an Mojangs Authentifizierungsserver reduzieren und ist auch nützlich, wenn der Authentifizierungsserver vorübergehend nicht verfügbar ist, und erlaubt es Spielern trotzdem, dem Server unter Verwendung gecachter Profildaten erneut beizutreten.`
            },
            "cache-player-profile-result-timeout": {
                default: 1440,
                desc: `Der Timeout des Spielerprofil-Caches.<br>
                    (Einheit: Minute, Standardwert 1440 Minuten = 24 Stunden)<br>
                    Wenn der angegebene Timeout überschritten wird, sendet der Server beim nächsten Beitritt des Spielers eine weitere Anfrage, um Spielerprofildaten von Mojangs Authentifizierungsserver abzurufen.`
            }
        }
    }
};

export default config;
