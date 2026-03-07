# Entity Performans Müqayisəsi

::::::warning ÖNƏMLİ

Bu səhifə, Leaf və Paper server proqramları arasında entity emalı üçün performans müqayisə məlumatlarını təqdim edir. Bu nəticələr, müəyyən bir test senariyasını təmsil edir və avadanlıq, konfiqurasiya və digər amillərdən asılı olaraq dəyişiklik göstərə bilər.

:::

<entity-performance-graph />

## Test Konfiqurasiyası

### Varsayılan Ayarlar Konfiqurasiyası

Hər iki server, bukkit.yml, spigot.yml və digər konfiqurasiya fayllarında varsayılan ayarlarla test edildi. Bu əsas test, tipik server şərtləri altında performansı təmsil edir.

### Artırılmış Canavar Hədləri Konfiqurasiyası

bukkit.yml faylında dəyişdirilən ayarlar:

- monsters: 70 → 700
- animals: 10 → 100

Digər bütün konfiqurasiya faylları varsayılan ayarlarında qaldı. Bu test, intensiv serverlərdə tez-tez görünən yüksək entity sayılı bir senariyanı simulyasiya edir.

### Leaf + Async Konfiqurasiyası

leaf-global.yml faylında minimal asinxron seçənəklər aktiv edildi:

```yaml
async:
    async-entity-tracker:
        enabled: true
    async-pathfinding:
        enabled: true
```
