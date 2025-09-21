# Entity Performans Karşılaştırması

:::warning
Bu sayfa, Leaf ve Paper sunucu uygulamaları arasında entity işleme için performans karşılaştırma verilerini sunar. Bu sonuçlar, belirli bir test senaryosunu temsil eder ve donanım, yapılandırma ve diğer faktörlere bağlı olarak değişiklik gösterebilir.
:::

<entity-performance-graph />

## Test Yapılandırması

### Varsayılan Ayarlar Yapılandırması

Her iki sunucu, bukkit.yml, spigot.yml ve diğer yapılandırma dosyalarında varsayılan ayarlarla test edildi. Bu temel test, tipik sunucu koşulları altında performansı temsil eder.

### Artırılmış Canavar Sınırları Yapılandırması

bukkit.yml dosyasında değiştirilen ayarlar:

- monsters: 70 → 700
- animals: 10 → 100

Diğer tüm yapılandırma dosyaları varsayılan ayarlarında kaldı. Bu test, yoğun sunucularda sıkça görülen yüksek entity sayılı bir senaryoyu simüle eder.

### Leaf+Async Yapılandırması

leaf-global.yml dosyasında minimal asenkron seçenekler etkinleştirildi:

```yaml
async:
    async-entity-tracker:
        enabled: true
    async-pathfinding:
        enabled: true
```
