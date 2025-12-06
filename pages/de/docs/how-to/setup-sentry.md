# Einrichten von Sentry

[Sentry](https://sentry.io/) ist ein hilfreicher Dienst für das Nachverfolgen von Fehlern und der Überwachung von Performance in Echtzeit. Durch die Integration in deinen Leaf-Server kannst du Fehler und Exceptions automatisch aufzeichnen, was es einfach macht, Probleme auf dem Server zu erkennen und zu beheben.

Diese Anleitung erklärt, wie man Leaf so konfiguriert, dass es Fehlerberichte an dein Sentry-Projekt sendet.

## Voraussetzungen

1.  **Sentry Account:** Du benötigst einen Account bei [sentry.io](https://sentry.io/). Es gibt auch kostenlose Stufen, die sich für viele Server eignen.
2.  **Sentry Projekt:** Erstelle ein neues Projekt innerhalb deiner Sentry Organisation.
    - Falls eine Plattform angegeben werden muss, wähle **Java**. Wenn Java nicht direkt sichtbar ist, musst du eventuell danach in der Suchleiste suchen. Die Wahl der Plattform beeinflusst hauptsächlich die Ersteinrichtung auf der Seite von Sentry, während Leaf die eigentliche Integration bereitstellt.
3.  **DSN (Data Source Name):** Nachdem das Projekt erstellt wurde, navigiere zu den Projekteinstellungen. Öffne die Sektion "Client Keys (DSN)". Kopiere den DSN String - er sieht aus wie eine URL (z.B. `https://xxxxxxxxxxxxxxxxxxxxxxxx@o######.ingest.sentry.io/#######`).

## Konfiguration

1.  **Finde die Leaf Konfiguration:** Öffne die Konfigurationsdatei von deinem Leaf-Server. Normalerweise handelt es sich um die Datei `leaf-global.yml` im Hauptverzeichnis des Servers oder im `config` Unterordner.

2.  **Finde den Sentry-Abschnitt:** In dieser Datei gibt es einen `sentry:` Abschnitt. Standardmäßig sieht er etwa so aus:

    ```yaml
    sentry:
        # Sentry DSN for improved error logging, leave blank to disable,
        # Obtain from https://sentry.io/
        dsn: ""
        # Logs with a level higher than or equal to this level will be recorded.
        log-level: WARN
        # Only log with a Throwable will be recorded after enabling this.
        only-log-thrown: true
    ```

3.  **Konfiguriere die Einstellungen:**
    - **`dsn`:**
        - Ersetze die leeren, einfachen Anführungsstriche (`''`) mit dem DSN, den du aus den Einstellungen des Sentry-Projekts kopiert hast. Stelle sicher, dass er von einfachen Anführungsstrichen umgeben ist.
        - **Beispiel:** `dsn: 'https://xxxxxxxxxxxxxxxxxxxxxxxx@o######.ingest.sentry.io/#######'`
        - _Wenn dieser Wert leer bleibt, wird die Sentry-Integration deaktiviert._

    - **`log-level`:**
        - Dies bestimmt die minimale Stufe einer Lognachricht, die von Leaf an Sentry gesendet wird. Übliche Level sind `ERROR`, `WARN`, `INFO`, `DEBUG`.
        - Der Standardwert `WARN` bedeutet, dass nur Nachrichten gesendet werden, die Warnungen oder Fehler (Üblicherweise auch Exceptions) sind.
        - Wenn du nur kritische Fehler sehen willst, kannst du den Wert auf `ERROR` stellen. Niedrigere Werte (wie `INFO`) können deutlich mehr Daten senden, was beim Debuggen potenziell unerwünscht ist.
        - **Empfehlung:** Starte mit `WARN` (der Standardwert).

    - **`only-log-thrown`:**
        - Bei `true` (dem Standardwert), sendet Leaf _ausschließlich_ Nachrichten an Sentry, die explizit ein Java `Throwable` (Wie eine Exception oder ein Fehler mit Stacktrace) beinhalten. Dies wird empfohlen, da es Sentry auf die wichtigen Fehler im Code fokussiert.
        - Bei `false`, werden _alle_ Nachrichten gesendet, die das `log-level` erfüllen, selbst wenn es sich nur um einen informativen Text ohne Fehler handelt. Dies kann viele unnötige Nachrichten in Sentry zur Folge haben.
        - **Empfehlung:** Bleibe bei `true` (der Standardwert).

4.  **Speichern und neu starten:**
    - Speichere die Änderungen in der Konfiguration.
    - Starte deinen Leaf-Server komplett neu, damit die neuen Einstellungen übernommen werden.

## Fehlerbehandlung

- **Fehler erscheinen nicht:**
    - Überprüfe, ob der `dsn` korrekt kopiert wurde und mit einfachen Anführungsstrichen in der YAML Datei umgeben ist.
    - Stelle sicher, dass das `log-level` nicht zu hoch ist (z.B. zeigt `ERROR` keine Warnungen an).
    - Überprüfe, dass `only-log-thrown` zu den erwarteten Fehlertypen passt.
    - Stelle sicher, dass der Server vollständig neu gestartet wurde, nachdem die Konfiguration geändert wurde.
    - Überprüfe, ob die Firewall deines Servers ausgehende Verbindungen nach `ingest.sentry.io` auf Port 443 (HTTPS) blockiert.
- **Zu viele Fehler:**
    - Erhöhe das `log-level` (z.B. von `WARN` zu `ERROR`).
    - Stelle sicher, dass `only-log-thrown` auf `true` gesetzt ist.
