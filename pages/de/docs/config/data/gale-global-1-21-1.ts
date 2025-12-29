import type { ConfigRoot } from "@/.vitepress/theme/components/config/types";

const config: ConfigRoot = {
    _version: {
        default: 1
    },

    "gameplay-mechanics": {
        "enable-book-writing": {
            default: true,
            desc: `Gibt an, ob Bücher beschreibbar sein sollen.<br>
                Wenn diese Option auf \`false\` gesetzt wird, können Spieler mit der Permission \`gale.writebooks\` (Standard: \`op\`) trotzdem Bücher nutzen.
                <table>
                <tr><td></td><td><b>Standard</b></td><td></td><td></td></tr>
                <tr><td><b>Empfohlen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>
                <tr><td>-</td><td><code>true</code></td><td><code>true</code></td><td><code>true</code></td></tr>
                </table>
                <table>
                <tr><td><b>Werte für Ziele</b></td><td></td></tr>
                <tr><td><i>Optimierung</i></td><td>-</td></tr>
                <tr><td><i>Vanilla Verhalten</i></td><td><code>true</code></td></tr>
                </table>`
        }
    },

    "log-to-console": {
        __desc__:
            "Gibt an, ob bestimmte Texte und Ereignisse in der Konsole und in den Logdateien geloggt werden sollen.",
        chat: {
            "empty-message-warning": {
                default: false,
                desc: `Wenn ein Spieler ein leeres Nachrichtenpaket sendet.<br>
                    (Dies ist harmlos und passiert meistens, wenn der Client des Spielers veraltet ist)
                    <table>
                    <tr><td></td><td><b>Standard</b></td><td></td></tr>
                    <tr><td><b>Empfohlen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td></tr>
                    <tr><td><code>false</code></td><td><code>false</code></td><td><code>true</code></td></tr>
                    </table>`
            },
            "expired-message-warning": {
                default: false,
                desc: `Wenn das Nachrichtenpaket eines Spielers abgelaufen ist.<br>
                    (Dies ist harmlos und passiert meistens, wenn ein Bit des Clients des Spielers nicht mehr synchron ist)
                    <table>
                    <tr><td></td><td><b>Standard</b></td><td></td></tr>
                    <tr><td><b>Empfohlen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td></tr>
                    <tr><td><code>false</code></td><td><code>false</code></td><td><code>true</code></td></tr>
                    </table>`
            },
            "not-secure-marker": {
                default: true,
                desc: `Gibt an, ob ein [NOT SECURE] Marker vor unsignierte Chatpakete angefügt werden soll.
                    <table>
                    <tr><td></td><td><b>Standard</b></td><td></td></tr>
                    <tr><td><b>Empfohlen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td></tr>
                    <tr><td><code>false</code></td><td><code>true</code></td><td><code>true</code></td></tr>
                    </table>`
            }
        },
        "ignored-advancements": {
            default: true,
            desc: `Wenn Spielerdaten geladen werden und Advancements beinhalten, die nicht mehr existieren.<br>
                (Dies ist harmlos und passiert meistens, wenn der Server auf eine neue Minecraft Version aktualisiert wurde)
                <table>
                <tr><td></td><td><b>Standard</b></td><td></td></tr>
                <tr><td><b>Empfohlen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td></tr>
                <tr><td><code>false</code></td><td><code>true</code></td><td><code>true</code></td></tr>
                </table>`
        },
        "invalid-pool-element-error-log-level": {
            default: "info",
            desc: `Das Logging-Level für Fehler, wenn *ungültige Pool-Elemente* in den Weltdaten auftreten.<br>
                <br>
                *Ungültige Pool-Elemente* sind Teil von generierten Strukturen (wie Minenschachte), die korrupt sind oder nicht richtig von älteren Versionen übernommen wurden.<br>
                <br>
                Diese Fehler sind sehr groß und treten häufig auf alten Servern auf, die zwischen Minecraft versionen wechseln.<br>
                <br>
                Die Fehler sind meistens nutzlos: Man kann nichts dagegen tun.<br>
                <br>
                Gültige Werte sind: \`"none"\`, \`"info"\`, \`"warn"\` und \`"error"\`.
                <table>
                <tr><td></td><td><b>Standard</b></td><td></td><td></td></tr>
                <tr><td><b>Empfohlen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>
                <tr><td><code>"none"</code> ⓘ</td><td><code>"info"</code></td><td><code>"error"</code></td><td><code>"error"</code></td></tr>
                </table>
                <p>ⓘ = Der Standardwert ist \`"info"\` um zu verhindern, dass Fehler nicht gesehen werden, aber der empfohlene Wert ist \`"none"\` weil die Fehler meistens nutzlos und sowieso nicht lösbar sind.</p>`
        },
        "invalid-statistics": {
            default: true,
            desc: `Wenn Spielerdaten geladen werden und Statistiken beinhalten, die nicht mehr existieren.
                <table>
                <tr><td></td><td><b>Standard</b></td><td></td></tr>
                <tr><td><b>Empfohlen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td></tr>
                <tr><td><code>false</code></td><td><code>true</code></td><td><code>true</code></td></tr>
                </table>`
        },
        "legacy-material-initialization": {
            default: false,
            desc: `Wenn ein sehr altes Bukkit Plugin geladen wird
                <table>
                <tr><td></td><td><b>Standard</b></td><td></td></tr>
                <tr><td><b>Empfohlen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td></tr>
                <tr><td><code>false</code></td><td><code>false</code></td><td><code>true</code></td></tr>
                </table>`
        },
        "null-id-disconnections": {
            default: true,
            desc: `Wenn ein Spieler kein gültiges Profil während dem Login gesendet hat.<br>
                (Dies bedeutet meistens, dass ein Hacker versucht die Join-Kapazität des Servers zu überlasten)
                <table>
                <tr><td></td><td><b>Standard</b></td><td></td></tr>
                <tr><td><b>Empfohlen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td></tr>
                <tr><td><code>false</code></td><td><code>true</code></td><td><code>true</code></td></tr>
                </table>`
        },
        "player-login-locations": {
            default: true,
            desc: `Gibt an, ob die Koordinaten eines Spielers in der Join-Nachricht in der Konsole enthalten sein soll.
                <table>
                <tr><td></td><td><b>Standard</b></td><td></td></tr>
                <tr><td><b>Empfohlen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td></tr>
                <tr><td>-</td><td><code>true</code></td><td><code>true</code></td></tr>
                </table>`
        },
        "plugin-library-loader": {
            downloads: {
                default: true,
                desc: `Wenn der Plugin Library-Loader mit dem Download der Libraries beginnt.
                    <table>
                    <tr><td></td><td><b>Standard</b></td><td></td></tr>
                    <tr><td><b>Empfohlen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td></tr>
                    <tr><td><code>true</code></td><td><code>true</code></td><td><code>true</code></td></tr>
                    </table>`
            },
            "library-loaded": {
                default: true,
                desc: `Wenn der Plugin Library-Loader mit dem Download einer Library fertig ist.
                    <table>
                    <tr><td></td><td><b>Standard</b></td><td></td></tr>
                    <tr><td><b>Empfohlen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td></tr>
                    <tr><td><code>true</code></td><td><code>true</code></td><td><code>true</code></td></tr>
                    </table>`
            },
            "start-load-libraries-for-plugin": {
                default: true,
                desc: `Wenn der Plugin Library-Loader mit dem Laden der Libraries für ein Plugin beginnt.
                    <table>
                    <tr><td></td><td><b>Standard</b></td><td></td></tr>
                    <tr><td><b>Empfohlen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td></tr>
                    <tr><td><code>true</code></td><td><code>true</code></td><td><code>true</code></td></tr>
                    </table>`
            }
        },
        "set-block-in-far-chunk": {
            default: true,
            desc: `Wenn ein Spieler versucht, einen Block zu platzieren, der *sehr* weit entfernt ist.<br>
                (Dies bedeutet meistens, dass ein Hacker versucht, Informationen über die Standorte anderer Spieler zu erhalten oder einen Hack Client nutzt)
                <table>
                <tr><td></td><td><b>Standard</b></td><td></td></tr>
                <tr><td><b>Empfohlen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td></tr>
                <tr><td><code>false</code></td><td><code>true</code></td><td><code>true</code></td></tr>
                </table>`
        },
        "unrecognized-recipes": {
            default: false,
            desc: `Wenn Spielerdaten geladen werden und Rezeptbuch-Rezepte beinhaltet, die nicht mehr existieren.
                <table>
                <tr><td></td><td><b>Standard</b></td><td></td></tr>
                <tr><td><b>Empfohlen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td></tr>
                <tr><td><code>false</code></td><td><code>false</code></td><td><code>true</code></td></tr>
                </table>`
        }
    },

    misc: {
        "ignore-null-legacy-structure-data": {
            default: false,
            desc: `Gibt an, ob veraltete Strukturdaten ignoriert werden sollen, für die der NBT Tag Parser aus irgendeinem Grund null zurückgegeben hat.
                <ul>
                <li>Bei \`true\` wird in diesem Fall keine Warnung ausgegeben.</li>
                <li>Bei \`false\` wird in diesem Fall eine Exception geworfen und in der Konsole geworfen.</li>
                </ul>
                <table>
                <tr><td></td><td><b>Standard</b></td><td></td><td></td></tr>
                <tr><td><b>Empfohlen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>
                <tr><td><code>true</code> ⓘ</td><td><code>false</code></td><td><code>false</code></td><td><code>false</code></td></tr>
                </table>
                <table>
                <tr><td><b>Werte für Ziele</b></td><td></td></tr>
                <tr><td><i>Optimierung</i></td><td>-</td></tr>
                <tr><td><i>Vanilla Verhalten</i></td><td><code>false</code></td></tr>
                </table>
                <p>ⓘ = Der Standardwert ist \`false\` um zu verhindern, dass Fehler nicht gesehen werden, aber der empfohlene Wert ist \`true\` weil die Fehler meistens nutzlos und sowieso nicht lösbar sind.</p>`
        },
        keepalive: {
            "send-multiple": {
                default: true,
                desc: `Gibt an, ob Keepalive-Pakete häufiger als in Vanilla gesendet werden sollen.
                    <ul>
                    <li>Bei \`true\` wird ein Keepalive-Paket jedem Client jede Sekunde gesendet und diese werden nicht gekickt, solange sie innerhalb von 30 Sekunden mindestens einmal antworten.</li>
                    <li>Bei \`false\` wird ein Keepalive-Paket jedem Client alle 15 Sekunden gesendet und werden gekickt, falls diese nicht innerhalb von 30 Sekunden antworten.</li>
                    </ul>
                    <table>
                    <tr><td></td><td><b>Standard</b></td><td></td><td></td></tr>
                    <tr><td><b>Empfohlen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>
                    <tr><td><code>true</code></td><td><code>true</code></td><td><code>false</code></td><td><code>false</code></td></tr>
                    </table>
                    <table>
                    <tr><td><b>Werte für Ziele</b></td><td></td></tr>
                    <tr><td><i>Optimierung</i></td><td>-</td></tr>
                    <tr><td><i>Vanilla Verhalten</i></td><td>- (Dies hat keinen Einfluss auf das Gameplay)</td></tr>
                    </table>`
            }
        },
        "last-tick-time-in-tps-command": {
            "add-oversleep": {
                default: false,
                desc: `Gibt an, ob der Oversleep-Anteil der letzten Tickzeit im \`/tps\` Command enthalten sein soll.<br>
                    Diese Option wird ignoriert, wenn \`enabled\` auf \`false\` gestellt ist.
                    <table>
                    <tr><td></td><td><b>Standard</b></td><td></td><td></td></tr>
                    <tr><td><b>Empfohlen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>
                    <tr><td>-</td><td><code>false</code></td><td><code>false</code></td><td><code>false</code></td></tr>
                    </table>
                    <table>
                    <tr><td><b>Werte für Ziele</b></td><td></td></tr>
                    <tr><td><i>Optimierung</i></td><td>-</td></tr>
                    <tr><td><i>Paper Verhalten</i></td><td>-</td></tr>
                    </table>`
            },
            enabled: {
                default: false,
                desc: `Gibt an, ob die Zeit, die der letzte Tick gedauert hat, im \`/tps\` Command enthalten sein soll.<br>
                    Die Zeit des letzten Ticks ist meistens nicht sehr nützlich, das es sich nur um einen einzelnen Tick handelt.
                    <table>
                    <tr><td></td><td><b>Standard</b></td><td></td><td></td></tr>
                    <tr><td><b>Empfohlen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>
                    <tr><td><code>false</code></td><td><code>false</code></td><td><code>false</code></td><td><code>false</code></td></tr>
                    </table>
                    <table>
                    <tr><td><b>Werte für Ziele</b></td><td></td></tr>
                    <tr><td><i>Optimierung</i></td><td>-</td></tr>
                    <tr><td><i>Paper Verhalten</i></td><td><code>false</code></td></tr>
                    </table>`
            }
        },
        "premium-account-slow-login-timeout": {
            default: -1,
            desc: `Die maximale Zeit, die ein Login Vorgang eines Premium-Accounts dauern kann.
                (Einheit: Tick)
                <ul>
                <li>Wenn die Zeit abläuft, wird die Verbindung geschlossen.</li>
                <li>Wenn ein Wert &leq; \`0\` gesetzt wird, wird der Vanilla-Wert genutzt, der aktuell bei \`600\` Ticks (30 Sekunden) liegt.</li>
                </ul>
                <table>
                <tr><td></td><td><b>Standard</b></td><td></td><td></td></tr>
                <tr><td><b>Empfohlen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>
                <tr><td>-</td><td><code>-1</code></td><td><code>-1</code></td><td><code>-1</code></td></tr>
                </table>
                <table>
                <tr><td><b>Werte für Ziele</b></td><td></td></tr>
                <tr><td><i>Optimierung</i></td><td>-</td></tr>
                <tr><td><i>Vanilla Verhalten</i></td><td><code>-1</code></td></tr>
                </table>`
        },
        "verify-chat-order": {
            default: true,
            desc: `Gibt an, ob die Reihenfolge der Chatnachrichten verifiziert werden soll.
                <ul>
                <li>Bei \`true\` wird ein Spieler gekickt, wenn er ein Chat-Paket senden sollte, das nicht in der korrekten Reihenfolge entspricht.</li>
                <li>Bei \`false\` findet keine Überprüfung statt und Spieler werden nicht gekickt.</li>
                </ul>
                <table>
                <tr><td></td><td><b>Standard</b></td><td></td><td></td></tr>
                <tr><td><b>Empfohlen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>
                <tr><td>-</td><td><code>true</code></td><td><code>true</code></td><td><code>true</code></td></tr>
                </table>
                <table>
                <tr><td><b>Werte für Ziele</b></td><td></td></tr>
                <tr><td><i>Optimierung</i></td><td>-</td></tr>
                <tr><td><i>Vanilla Verhalten</i></td><td><code>true</code></td></tr>
                </table>`
        }
    },

    "small-optimizations": {
        "reduced-intervals": {
            "increase-time-statistics": {
                default: 20,
                desc: `Das Interval, in welchem die zeitbasierten Statistiken, wie Spielzeit oder Zeit seit dem letzten Tod erhöht werden sollen.<br>
                    (Einheit: Tick)
                    Das Ändern dieses Wertes ändert nicht die Geschwindigkeit, mit der Statistiken von Vanilla erhöht werden.<br>
                    <br>
                    Zum Beispiel:
                    <ul>
                    <li>Wenn dieser Wert \`20\` beträgt, wird die Spielzeit in Ticks jede Sekunde um 20 erhöht.</li>
                    <li>Wenn dieser Wert \`100\` beträgt, wird die Spielzeit in Ticks alle 5 Sekunden um 100 erhöht.</li>
                    <li>Wenn ein Wert &leq; \`0\` gesetzt ist, ist der Wert gleich wie bei Paper.</li>
                    </ul>
                    <table>
                    <tr><td></td><td><b>Standard</b></td><td></td><td></td></tr>
                    <tr><td><b>Empfohlen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>
                    <tr><td><code>100</code></td><td><code>20</code></td><td><code>1</code></td><td><code>1</code></td></tr>
                    </table>
                    <table>
                    <tr><td><b>Werte für Ziele</b></td><td></td></tr>
                    <tr><td><i>Optimierung</i></td><td><code>100</code></td></tr>
                    <tr><td><i>Vanilla Verhalten</i></td><td>Geringere Werte sind mehr wie Vanilla<br>(<code>20</code> ist aber auch in Ordnung, <code>1</code> ist meistens unnötig)</td></tr>
                    </table>`
            },
            "update-entity-line-of-sight": {
                default: 4,
                desc: `Das Interval, in welchem aktualisiert wird, ob ein Entity in der Sicht eines anderen Entity ist.<br>
                    (Einheit: Tick)
                    Wenn ein Wert &leq; \`0\` gesetzt ist, ist der Wert gleich wie bei Paper.
                    <table>
                    <tr><td></td><td><b>Standard</b></td><td></td><td></td></tr>
                    <tr><td><b>Empfohlen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>
                    <tr><td><code>4</code></td><td><code>4</code></td><td><code>1</code></td><td><code>1</code></td></tr>
                    </table>
                    <table>
                    <tr><td><b>Werte für Ziele</b></td><td></td></tr>
                    <tr><td><i>Optimierung</i></td><td><code>10</code></td></tr>
                    <tr><td><i>Vanilla Verhalten</i></td><td><code>1</code></td></tr>
                    </table>`
            }
        },
        "use-xor-shift-random": {
            __desc__:
                "Gibt an, ob ein [XorShift](https://www.codeproject.com/Articles/9187/A-fast-equivalent-for-System-Random) Zufallsgenerator anstelle des Standardgenerators von Java genutzt werden soll.",
            "auto-replenish-lootable-refill": {
                default: true,
                desc: `Gibt an, ob der XorShift Generator für das Auffüllen von Lootables des Paper \`auto-replenish\` Features genutzt werden soll.<br>
                    Dies hat keine Auswirkung auf normale Minecraft Lootable Truhen.
                    <table>
                    <tr><td></td><td><b>Standard</b></td><td></td><td></td></tr>
                    <tr><td><b>Empfohlen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>
                    <tr><td><code>true</code></td><td><code>true</code></td><td><code>false</code></td><td>-</td></tr>
                    </table>
                    <table>
                    <tr><td><b>Werte für Ziele</b></td><td></td></tr>
                    <tr><td><i>Optimierung</i></td><td><code>true</code></td></tr>
                    <tr><td><i>Paper Verhalten</i></td><td>- (Spieler merken sowieso keinen Unterschied)</td></tr>
                    </table>`
            },
            "elytra-firework-speed": {
                default: true,
                desc: `Gibt an, ob der XorShift Generator für den Speed-Boost einer Feuerwerksraketen beim Gleiten genutzt werden soll.
                    <table>
                    <tr><td></td><td><b>Standard</b></td><td></td><td></td></tr>
                    <tr><td><b>Empfohlen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>
                    <tr><td><code>true</code></td><td><code>true</code></td><td><code>false</code></td><td><code>false</code></td></tr>
                    </table>
                    <table>
                    <tr><td><b>Werte für Ziele</b></td><td></td></tr>
                    <tr><td><i>Optimierung</i></td><td><code>true</code></td></tr>
                    <tr><td><i>Vanilla Verhalten</i></td><td><code>false</code></td></tr>
                    </table>`
            },
            "entity-wake-up-duration": {
                default: true,
                desc: `Gibt an, ob der XorShift Generator für Variationen in Entity-Aktivierung-Zeiten genutzt werden soll.
                    <table>
                    <tr><td></td><td><b>Standard</b></td><td></td><td></td></tr>
                    <tr><td><b>Empfohlen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>
                    <tr><td><code>true</code></td><td><code>true</code></td><td>-</td><td>-</td></tr>
                    </table>
                    <table>
                    <tr><td><b>Werte für Ziele</b></td><td></td></tr>
                    <tr><td><i>Optimierung</i></td><td><code>true</code></td></tr>
                    </table>`
            },
            "generate-tree-with-bukkit-api": {
                default: true,
                desc: `Gibt an, ob der XorShift Generator für die Generierung von Bäumen mit der Bukkit API (\`World#generateTree\`) genutzt werden soll.
                    <table>
                    <tr><td></td><td><b>Standard</b></td><td></td><td></td></tr>
                    <tr><td><b>Empfohlen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>
                    <tr><td><code>true</code></td><td><code>true</code></td><td><code>false</code></td><td>-</td></tr>
                    </table>
                    <table>
                    <tr><td><b>Werte für Ziele</b></td><td></td></tr>
                    <tr><td><i>Optimierung</i></td><td><code>true</code></td></tr>
                    <tr><td><i>Paper Verhalten</i></td><td><code>false</code></td></tr>
                    </table>`
            },
            "lightning-random-tick": {
                default: true,
                desc: `Gibt an, ob der XorShift Generator für die Chance eines Blitzes genutzt werden soll.
                    <table>
                    <tr><td></td><td><b>Standard</b></td><td></td><td></td></tr>
                    <tr><td><b>Empfohlen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></td><td><i>Leaf</i></td><td><i>Paper</i></td><td><i>Vanilla</i></td></tr>
                    <tr><td><code>true</code></td><td><code>true</code></td><td><code>false</code></td><td>-</td></tr>
                    </table>
                    <table>
                    <tr><td><b>Werte für Ziele</b></td><td></td></tr>
                    <tr><td><i>Optimierung</i></td><td><code>true</code></td></tr>
                    <tr><td><i>Paper Verhalten</i></td><td><code>false</code></td></tr>
                    </table>`
            }
        }
    }
};

export default config;
