# Leaf Sunucunuzu Optimize Edin (1.21.4/5)

**Başlamadan Önce:**

1. **SUNUCUNUZU YEDEKLEYİN!** Ciddi anlamda. Yapılandırmaları, özellikle deneysel olanları değiştirmeden önce dünyanızı, eklentilerinizi ve yapılandırmalarınızı yedekleyin.
2. **Profil Oluşturun, Tahmin Etmeyin:** Optimizasyon, varsayımlarla değil, verilerle en etkili şekilde yapılır. [Spark](https://spark.lucko.me/) gibi bir profil oluşturma aracı kullanarak sunucunuzda *gerçekten* neyin gecikmeye neden olduğunu belirleyin. Ayarları rastgele değiştirmeyin; önce darboğazı bulun!
   * **Genel Düşük TPS/Gecikme İçin:** Eğer sunucunuz sürekli olarak 20 TPS'nin altında çalışıyorsa, standart profil oluşturucuyu kullanın:
     1. Konsolda veya operatör olarak `/spark profiler start` komutunu çalıştırın.
     2. Tipik sunucu etkinliği sırasında veya TPS düşükken birkaç dakika çalışmasına izin verin.
     3. `/spark profiler stop` komutunu çalıştırın.
     4. Oluşturulan bağlantıyı açın ve ana iş parçacığında en fazla zaman tüketen işlemleri görmek için "Hotspots" veya çağrı ağacını analiz edin.
   * **Ani Gecikme Artışları/Donmalar İçin:** Sunucunuz genellikle iyi çalışıyorsa ancak ani, keskin TPS düşüşleri veya donmalar yaşıyorsa, bu belirli anları hedefleyin:
     1. `/spark profiler --only-ticks-over 100` komutunu çalıştırın (`100`ms eşiğini ayarlayabilirsiniz). Bu komut, yalnızca belirtilen süreden daha uzun süren sunucu tikleri için veri kaydeder (normal tikler 50ms'dir).
     2. Bir veya daha fazla gecikme artışı yaşayana kadar çalışmasına izin verin.
     3. `/spark profiler stop` komutunu çalıştırın.
     4. Raporu analiz edin. Bu, gecikmeli tikler sırasında sunucunun tam olarak ne yaptığını gösterir. Çağrı ağacında yüksek yüzdeli yöntemleri/işlemleri arayın. Bu, donmanın doğrudan nedenini (örneğin, belirli bir eklenti olayı, dünya oluşturma, aşırı varlık işleme) belirlemeye yardımcı olur.
   * **Değiştirmeden Önce Analiz Edin:** Profil oluşturma sonuçlarını kullanarak yapılandırma değişikliklerinize yön verin. Eğer Spark, varlık yol bulmaya işaret ediyorsa, `async-pathfinding` ayarlarına odaklanın. Eğer parça yüklemeye işaret ediyorsa, görünüm mesafelerine veya `async-chunk-send` ayarlarına bakın.
3. **Kademeli Değişiklik Yapın:** Aynı anda yalnızca birkaç ilgili ayarı değiştirin, ardından sunucuyu yeniden başlatın ve test edin. Bu, bir değişikliğin sorun çıkarıp çıkarmadığını veya performansı iyileştirip iyileştirmediğini belirlemeyi kolaylaştırır.
4. **Açıklamaları Okuyun:** Yapılandırma dosyasının kendisi, her seçenek için ayrıntılı açıklamalar (`desc`) içerir. Bunları dikkatlice okuyun!

## `leaf-global.yml` Dosyasındaki Ana Optimizasyon Alanları

Önemli performans etkileri olan bölümlere odaklanacağız. Önerilen değerler genellikle performansı önceliklendirir, bazen küçük vanilya davranış sapmaları pahasına veya daha yeni donanım/Java sürümleri gerektirir.

### 1. Asenkron İşlemler (`async`)

Buradaki amaç, hesaplamaları ana sunucu iş parçacığından (oyun tiklerini işleyen) arka plan iş parçacıklarına taşıyarak ana iş parçacığı yükünü azaltmak ve TPS'yi (Saniyedeki Tik Sayısı) iyileştirmektir.

* **`async-entity-tracker.enabled: true`**
  * **Neden:** Varlık izleme, hangi oyuncuların hangi varlıkları görebilecek kadar yakın olduğunu sürekli kontrol etmeyi ve oyuncunun görüş alanına varlık ekleme/güncelleme/kaldırma paketleri göndermeyi içerir. Bu, özellikle çok sayıda oyuncu ve varlık olduğunda çok talepkar olabilir. Bu seçeneği etkinleştirmek, bu görünürlük kontrollerinin ve paket hazırlama görevlerinin çoğunu ayrı arka plan iş parçacıklarına taşır.
  * **Nasıl Çalışır:** Sistem, özel izleyici iş parçacıkları kullanır. Etkinleştirildiğinde, dahili veri yapıları (örneğin, bir varlığı gören oyuncuların kümesi veya varlık öznitelik haritaları) thread-safe sürümlere (örneğin, `ConcurrentHashSet`, `ConcurrentHashMap`) geçer. Mesafe kontrolü mantığı (`updatePlayer`), bu arka plan iş parçacıklarında çalışır. Ana iş parçacığında *gerçekleşmesi gereken* işlemler (örneğin, bir oyuncunun aracı görüşten kaldırıldığında teleport edilmesi) ana iş parçacığına geri zamanlanır.
  * **`compat-mode: false` (Önerilen, aksi gerekmedikçe)**
    * **Neden `compat-mode` Var:** Bazı NPC eklentileri (özellikle Citizens), NPC'leri *gerçek oyuncu varlıkları* kullanarak oluşturur. İzleyicinin asenkron doğası, bu tür NPC'lerde görsel aksaklıklara (örneğin, NPC'lerin kısa süreliğine kaybolması veya gecikmesi) neden olabilir, çünkü güncellemeleri ana iş parçacığıyla senkronize olmayabilir.
    * **Nasıl Çalışır (`compat-mode: true`):** Kod, izlenen varlığın *gerçek oyuncu* mu yoksa *sahte oyuncu* mu (örneğin, Citizens NPC'si) olduğunu özel olarak kontrol eder. Uyumluluk modu etkinleştirildiğinde, *sahte oyuncular* için izleme güncellemeleri ana iş parçacığında *senkron* olarak çalıştırılırken, diğer tüm varlıklar (canavarlar, eşyalar, gerçek oyuncular) için izleme asenkron kalır. Bu, bu belirli NPC türleri için görsel aksaklıkları düzeltir.
    * **Öneri:** En iyi performans için `compat-mode: false` bırakın. Yalnızca Citizens veya benzeri *gerçek varlık* NPC eklentileri kullanıyorsanız *ve* görünürlük sorunları yaşıyorsanız `true` yapın. Paket tabanlı/sanal varlık NPC eklentileri (ZNPCsPlus, Adyeshach, FancyNPCs gibi) genellikle etkilenmez ve `compat-mode` değerinin `false` kalmasına izin verir.
  * **`max-threads`:** Varlık izleme için iş parçacığı havuzunun boyutunu kontrol eder. Varsayılan (`0` = 1/4 çekirdek) güvenli bir başlangıçtır. Spark, varlık izlemede önemli zaman harcandığını gösteriyorsa, CPU çekirdeklerinin `1/2` sine çıkarmayı düşünün, ancak fazla iş parçacığı ayırmaktan kaçının.
  * **`keepalive` / `queue-size`:** İş parçacığı havuzu davranışını (boşta iş parçacığı zaman aşımı) ve görev kuyruğu sınırlarını ince ayar yapar. Varsayılanlar genellikle uygundur.
* **`async-target-finding.enabled: true`**
  * **Neden:** Canavar AI'sının pahalı bir parçası olan yakındaki varlıkları hedef bulmak için aramayı arka plan iş parçacıklarına taşır. Ana iş parçacığı yükünü AI hesaplamalarından azaltır.
* **`async-pathfinding.enabled: true`**
  * **Neden:** Canavarlar için navigasyon yollarını hesaplamak (özellikle karmaşık olanlar) CPU yoğun bir işlemdir. Bu, yol *hesaplamasını* arka plan iş parçacıklarına taşıyarak ana iş parçacığının canavarların bir yere ulaşmaya çalışırken takılmasını önler.
  * **Nasıl Çalışır:** Bir canavar bir yola ihtiyaç duyduğunda, istek asenkron yol bulma iş parçacığı havuzuna gönderilir. Canavarın AI'si yolu hemen almaz. Bunun yerine, navigasyon sistemi ve AI davranışları, yol hesaplamasının tamamlanmasını *beklemek* (örneğin, `path.isProcessed()` kontrolleriyle) veya yol arka plan iş parçacığından alındıktan sonra mantığı yürüten bir *geri çağrı* (`AsyncPathProcessor.awaitProcessing`) kullanacak şekilde değiştirilir. Bu, ana iş parçacığının hesaplama sırasında durmasını önler.
  * **`max-threads`:** Yol bulma iş parçacığı havuzunun boyutunu kontrol eder. Varsayılan (`0` = 1/4 çekirdek) muhafazakardır. Yol bulma (Spark'ta `PathFinder` veya navigasyon görevleri için kontrol edin) önemli bir gecikme kaynağıysa, CPU çekirdeklerinin `1/3` ünü düşünün.
  * **`keepalive` / `queue-size`:** İş parçacığı havuzu davranışını ayarlar.
  * **`reject-policy`:** Yol bulma kuyruğu dolduğunda ne olacağını belirler.
    * `FLUSH_ALL`: Bekleyen tüm yol bulma görevleri hemen ana sunucu iş parçacığında çalıştırılır. Gecikme artışı yaratabilir ancak tüm bekleyen istekleri işler.
    * `CALLER_RUNS`: Yalnızca kuyruğa sığamayan *yeni* görev ana sunucu iş parçacığında çalıştırılır. Büyük bir artışa neden olma olasılığı daha düşüktür ancak bazı yol bulma isteklerini daha fazla geciktirebilir.
* **`async-mob-spawning.enabled: true`**
  * **Neden:** Canavarlar oluşturulmadan önce gereken bazı hesaplamaları arka plana taşır. Etkili olması için Paper'ın `per-player-mob-spawns: true` ayarının etkin olması gerekir. Gerçek oluşturmayı asenkron yapmaz (bu güvenli değildir).
* **`async-locator.enabled: true`**
  * **Neden:** `/locate` gibi komutları ve Ender Gözü/Yunus aramaları gibi süreçleri arka planda çalıştırarak bu potansiyel olarak yavaş aramalar sırasında sunucu takılmalarını önler.
  * **`threads`:** `1` veya `2` genellikle yeterlidir.
* **`async-chunk-send.enabled: true`**
  * **Neden:** Parça verilerini oyunculara asenkron olarak hazırlar ve gönderir. Oyuncular katıldığında, teleport olduğunda veya hızlı uçtuğunda gecikmeyi büyük ölçüde azaltır. Şiddetle önerilir.
* **`async-block-finding.enabled: true`**
  * **Neden:** Hedef bulmaya benzer, ancak AI'nın belirli blokları araması için. Bazı AI görevlerinden ana iş parçacığı yükünü azaltır.
* **`parallel-world-tracking`** (Deneysel)
  * **Neden:** Farklı dünyaları/bölgeleri çok çekirdekli CPU'larda eşzamanlı olarak tiklemeyi amaçlar.
  * **Uyarı:** Oldukça deneysel. Yalnızca *çok sayıda* dünya varsa, belirli darboğazlar yaşıyorsanız ve eşzamanlılık sorunlarının risklerini anlıyorsanız etkinleştirin (`enabled: true`). Varsayılan (`false`) daha güvenlidir.
* **`async-playerdata-save`**
  * **Neden:** Oyuncu verilerini asenkron olarak kaydetmeye çalışır. Spark profil raporlarında gösterilen maksimum mspt artışlarını azaltır.

---

### 2. Performans İnce Ayarları (`performance`)

Bu bölüm, çeşitli hedeflenmiş optimizasyonlar içerir.

* **Sanal İş Parçacıkları (Virtual Threads) (Java 21+ Gereklidir)**
  * `use-virtual-thread-for-user-authenticator.enabled: true`
  * `use-virtual-thread-for-async-chat-executor.enabled: true`
  * `use-virtual-thread-for-async-scheduler.enabled: true`
  * **Neden:** Oyuncu giriş kimlik doğrulaması ve potansiyel olarak eklenti asenkron görevleri gibi görevler için modern Java 21+ hafif iş parçacıklarını kullanır. Sunucunuz Java 21 veya daha yenisini çalıştırıyorsa, geleneksel iş parçacıklarına kıyasla yükü azaltır.
* **`create-snapshot-on-retrieving-blockstate.enabled: false`**
  * **Neden:** Bir eklenti blok verilerini her istediğinde bir kopya (snapshot) oluşturulmasını önler. Bu, önemli ölçüde daha hızlıdır ancak eklentilerin canlı verileri yanlışlıkla değiştirmemesine dayanır.
  * **Uyarı:** Genellikle güvenlidir, ancak garip blokla ilgili eklenti sorunlarıyla karşılaşırsanız, bunu tekrar `true` yapmayı deneyin.
* **Kısıtlama/Gereksiz İşleri Atlatma**
  * `inactive-goal-selector-throttle.enabled: true`: Oyunculardan uzak canavarlar için AI hesaplamalarını azaltır.
  * `throttle-hopper-when-full.enabled: true` (Set `skip-ticks: 8`): Huni dolduğunda sürekli olarak eşya itmeye çalışmasını durdurur. `8` tik, vanilya bekleme süresiyle eşleşir.
  * `skip-map-item-data-updates-if-map-does-not-have-craftmaprenderer.enabled: true`: Eklentiler, renderersiz çok sayıda özel harita (örneğin, resim haritaları) oluşturuyorsa yardımcı olur. Küçük vanilya etkisi (envanterdeki haritalar, tutulup görüntülenene kadar güncellenmeyebilir).
  * `skip-ai-for-non-aware-mob.enabled: true`: Etkileşime girilmemiş inaktif canavarlar için AI işlemlerini daha da azaltır.
* **`reduce-packets.reduce-entity-move-packets.enabled: true`**
  * **Neden:** Küçük varlık hareketleri için daha az/küçük paket gönderir. Bant genişliğini ve istemci işlem yükünü azaltır, yük altında hareketi daha akıcı gösterebilir.
* **`faster-random-generator.enabled: true`** (Java 17+ Gereklidir)
  * **Neden:** Modern Java'da mevcut daha hızlı rasgele sayı üretme algoritmalarını kullanır. Rasgelelik *her yerde* kullanıldığından, bu önemli bir artış sağlayabilir.
  * **`random-generator: Xoroshiro128PlusPlus`**: Hız ve kalite arasında iyi bir denge.
  * **`enable-for-worldgen: false`**: **KRİTİK:** Bunu `true` yapmak **DÜNYA OLUŞUMUNU DEĞİŞTİRECEK**. Cevherler, yapılar vb. vanilya tohumlarından farklı olacaktır. Yalnızca vanilya tohum paritesinin önemli olmadığı **YENİ** dünyalarda `true` kullanın.
  * **`use-legacy-random-for-slime-chunk: true`**: **KRİTİK:** Mevcut dünyalarda, balçık parçalarının (slime chunks) çiftlikler için aynı konumlarda kalması için bunu `true` yapın. Yalnızca yeni dünyalarda ve vanilya balçık parçası konumlarını önemsemiyorsanız `false` yapın.
* **`dab` (Uzak Etkinleştirme Davranışı - Distant Activation Behavior)**
  * `enabled: true`: Uzak varlıklar için AI işlemlerini (beyin tikleri, yol bulma) azaltır.
  * `dont-enable-if-in-water: true`: Oyunculardan uzak kara canavarlarının AI duraklatıldığında gereksiz yere boğulmasını önler.
  * `start-distance: 8`, `max-tick-freq: 20`, `activation-dist-mod: 7`: Optimizasyon ve davranış dengesi için makul başlangıç noktalarıdır. Gerekirse gözlem yaparak ayarlayın.
  * `blacklisted-entities`: Uzakta olsalar bile AI'larının çalışması gereken varlık türlerini buraya ekleyin (örneğin, `minecraft:villager`, `minecraft:zombified_piglin`) (örneğin, belirli çiftlikler için).
* **`dont-save-entity`**
  * `dont-save-primed-tnt.enabled: true`: TNT varlıklarının kaydedilmesini önler, parça yükleme/boşaltma döngülerinden kaynaklanan patlamaları önler. Teknik/redstone sunucuları için iyidir.
  * `dont-save-falling-block.enabled: true`: Yeniden başlatmalar veya gecikmeler sonrası kum/çakıl hatalarını/duplikasyonlarını önler.

---

### 3. Ağ Ayarları (`network`)

* **`protocol-support`**: Yalnızca oyuncularınızın bu istemci modlarını kullandığını biliyor ve sunucu tarafında destek istiyorsanız belirli protokolleri (`jade`, `appleskin` vb.) etkinleştirin. Aksi takdirde performans iyileştirmez.
* **`OptimizeNonFlushPacketSending.enabled: false`**
  * **Neden `false`:** Bu optimizasyon, ProtocolLib ve potansiyel olarak diğer ağ yoğun eklentilerle **UYUMSUZ** olduğu bilinmektedir. Eklentilerinizi bozmayacağından kesinlikle emin olmadıkça **ETKİNLEŞTİRMEYİN**.
* **`chat-message-signature.enabled: false`**
  * **Neden:** Sohbet mesajlarının kriptografik imzasını devre dışı bırakır. Bu, oyuncuların sohbeti Mojang'a bildirmesini önler ve "güvenli sohbet" popup'larını/göstergelerini devre dışı bırakır. Genellikle moderasyonu dahili olarak yapan veya çevrimdışı modda çalışan sunucular için tercih edilir.

---

### 4. Çeşitli (`misc`)

* **`secure-seed.enabled: false`**
  * **Neden `false`:** Bunu `true` yapmak, cevher/yapı yerleşimi için farklı bir dahili tohum kullanır, tohum kırmayı imkansız hale getirir ancak vanilya tohumlarına kıyasla oluşturmayı **TEMELDEN DEĞİŞTİRİR**. Yalnızca vanilya paritesinin gerekli olmadığı **YENİ** dünyalarda ve tohum kırma bir endişeyse `true` yapın.
* **`region-format-settings.region-format: MCA`**
  * **Neden `MCA`:** Bu, standart, güvenli, uyumlu Minecraft Anvil formatıdır.
  * **`LINEAR`:** Deneysel Zstandard sıkıştırması. Disk alanından tasarruf sağlar ancak **RİSKLİ**, daha az uyumludur ve dikkatli kullanım gerektirir (bağlantılı araçlara bakın). Tamamen anlamadığınız ve yedekleriniz olmadığı sürece **KULLANMAYIN**.
* **`lag-compensation`** (Deneysel)
  * `enabled: true`, `enable-for-water: true`, `enable-for-lava: true`
  * **Neden:** Gecikme artışları sırasında oynanışı daha akıcı hissettirmeye çalışır.
  * **Uyarı:** Deneysel. Beklenmedik yan etkileri olabilir. Etkinleştirirseniz davranışı izleyin.

## Kalıtım Ayarları (Gale, Purpur, Paper)

Leaf, Gale, Purpur ve Paper üzerine inşa edilmiştir. Birçok önemli performans ayarı, bu yazılımların yapılandırma dosyalarında bulunur (`gale-global.yml`, `gale-world-defaults.yml`, `purpur.yml`, `paper-global.yml`, `paper-world-defaults.yml`).

Bu ayarları optimize etmek için ilgili belgelerine ([Kullanışlı Web Siteleri](../useful-sites.md) bağlantılarında) ve topluluk rehberlerine (örneğin, Paper-chan'ın rehberi) bakın.

## Test ve Yineleme

* Değişiklik yaptıktan sonra sunucuyu **yeniden başlatın**.
* Normal oyun sırasında performansı izlemek için `/spark tps` ve daha önemlisi `/spark profiler` kullanın.
* **Oynanışı gözlemleyin:** Canavarlar doğru davranıyor mu? Yeni hatalar var mı?
* **Ayar yapın:** Performans iyileşmediyse veya sorunlar ortaya çıktıysa, son değişiklikleri geri alın veya ayarları daha fazla ince ayar yapın. Optimizasyon genellikle sunucunuzun özel yüküne ve donanımına göre deneme-yanılma sürecidir.

Sorun yaşarsanız veya sorularınız olursa, [Leaf Discord sunucusunda](https://discord.com/invite/gfgAwdSEuM) sormaktan çekinmeyin. İyi şanslar!