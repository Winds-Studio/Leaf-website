# Entity Leistung Benchmark

:::warning WARNUNG
Diese Seite zeigt einen Leistungsvergleich zwischen Leaf und Paper für die Verarbeitung von Entities. Die Ergebnisse repräsentieren ein spezifisches Testszenario, welches sich je nach Hardware, Konfiguration und dem Seed der Welt unterscheiden kann.
:::

<entity-performance-graph />

## Details der Testkonfiguration

### Standardeinstellungen der Konfiguration

Beide Server wurden mit Standardeinstellungen in den bukkit.yml, spigot.yml und anderen Konfigurationsdateien ausgeführt. Der Basistest repräsentiert die Leistung unter typischen Serverbedingungen.

### Erhöhte Moblimits Konfiguration

Geänderte Einstellungen in bukkit.yml:

- monsters: 70 → 700
- animals: 10 → 100

Alle anderen Konfigurationen sind weiterhin die Standardwerte. Dieser Test simuliert ein Szenario mit sehr vielen Entities, das häufig auf stark ausgelasteten Servern auftritt.

### Leaf+Async Konfiguration

Minimale asynchrone Einstellungen wurden in leaf-global.yml aktiviert:

```yaml
async:
    async-entity-tracker:
        enabled: true
    async-pathfinding:
        enabled: true
```
