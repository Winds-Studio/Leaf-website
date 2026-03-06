# Sunucular için Java Bayrakları

## Başlamadan Önce: Temel Uygulamalar

Doğru optimizasyon, sistematik bir yaklaşım gerektirir. **Ayrıntılı adımlar için ["Leaf Sunucunuzu Optimize Edin"](../how-to/optimize-leaf-server.md) rehberine bakın.** Özetle, her zaman:

1. **Sunucunuzu Yedekleyin:** Herhangi bir değişiklik yapmadan önce her şeyi yedekleyin. (Bu rehber için mutlaka gerekli olmasa da iyi bir alışkanlıktır.)
2. **Profil Oluşturun, Tahmin Etmeyin:** Ayarları değiştirmeden önce gerçek darboğazları (düşük TPS, gecikme artışları) belirlemek için [Spark](https://spark.lucko.me/) gibi araçlar kullanın. Bağlantılı belge, Spark'ı genel gecikme ve belirli artışlar için nasıl kullanacağınızı detaylandırır.
3. **Kademeli Değişiklik Yapın:** Aynı anda yalnızca birkaç ilgili ayarı değiştirin, ardından yeniden başlatın ve test edin.

## Java Çalışma Zamanı Ortamınızı (JRE/JDK) Seçme

- **Öneri:** İstenen GC seçeneklerini (G1GC standarttır, ZGC ve Shenandoah çoğu büyük yapıda yaygındır, ancak satıcıya göre biraz farklılık gösterebilir) içeren, saygın bir OpenJDK satıcısından yakın tarihli bir Java 21 Uzun Süreli Destek (LTS) sürümünü kullanın. İyi seçenekler şunlardır:
    - **Adoptium Eclipse Temurin:** Saf OpenJDK ikilik dosyaları sağlayan, topluluk destekli, yaygın olarak önerilen bir yapı [3].
    - **Amazon Corretto:** Uzun süreli destekle, üretim için hazır OpenJDK dağıtımı [4].
    - **GraalVM (OpenJDK tabanlı):** Gelişmiş Graal Just-In-Time (JIT) derleyicisiyle potansiyel performans avantajları sunar. Ancak, standart HotSpot JVM'lerden farklı davranabilir ve uyumluluk sorunları yaratabilir. GraalVM seçerseniz kapsamlı test yapın [6]. **GraalVM kullanmak, daha sonra tartışılan belirli JIT ayar seçeneklerini etkinleştirir.**
- **Kaçının:** Minecraft sunucularının ihtiyaç duyabileceği bileşenlerden yoksun olabilecek başsız (headless) varyantları (genellikle `-headless` sonekli). Tam JDK (Java Geliştirme Kiti) kullanın.

## Java Başlangıç Bayrakları (JVM Argümanları) - Çöp Toplama

Java bayrakları, JVM'nin nasıl çalıştığını, özellikle bellek yönetimini (Çöp Toplama - GC) ve performans optimizasyonlarını kontrol eder [7]. Bu bölüm, GC ayarına odaklanır.

### Temel: Aikar'ın Bayrakları (G1GC)

- **Amaç:** Aikar'ın bayrakları, Minecraft sunucuları için optimize edilmiş, Çöp-Öncelikli Çöp Toplayıcı (G1GC) kullanan tanınmış bir argüman setidir [8]. G1GC, modern Java sürümlerinde varsayılan GC'dir ve genellikle verim (sunucunun ne kadar iş yaptığı) ile duraklama süreleri (sunucunun GC için ne kadar süre donduğu) arasında iyi bir denge sağlar [9, 10].
- **Uygunluk:** Bu bayraklar, **çoğu sunucu** için (yaklaşık 1-100 oyuncu) mükemmel bir başlangıç noktasıdır ve çalışır. Minecraft'ın tipik nesne ayırma kalıplarına (çok sayıda kısa ömürlü nesne) özel olarak G1GC'yi ayarlayarak GC duraklamalarının neden olduğu gecikme artışlarını azaltmayı amaçlar [8].
- **Java 21+ Aikar'ın Bayrakları (G1GC kullanarak):**

    ```bash
    java -Xms<RAM>M -Xmx<RAM>M \
    -XX:+UseG1GC \
    -XX:+ParallelRefProcEnabled \
    -XX:MaxGCPauseMillis=200 \
    -XX:+UnlockExperimentalVMOptions \
    -XX:+DisableExplicitGC \
    -XX:+AlwaysPreTouch \
    -XX:G1NewSizePercent=30 \
    -XX:G1MaxNewSizePercent=40 \
    -XX:G1HeapRegionSize=8M \
    -XX:G1ReservePercent=20 \
    -XX:G1HeapWastePercent=5 \
    -XX:G1MixedGCCountTarget=4 \
    -XX:InitiatingHeapOccupancyPercent=15 \
    -XX:G1MixedGCLiveThresholdPercent=90 \
    -XX:G1RSetUpdatingPauseTimePercent=5 \
    Policing:32 \
    -XX:SurvivorRatio=32 \
    -XX:+PerfDisableSharedMem \
    -XX:MaxTenuringThreshold=1 \
    -Dusing.aikars.flags=https://mcflags.emc.gs \
    -Daikars.new.flags=true \
    -jar your-server-jar-file.jar nogui
    ```

    - `<RAM>`'i RAM miktarıyla değiştirin (örneğin, 10GB için `10240`).
    - **Önemli:** `-Xms` ve `-Xmx` değerlerini _aynı_ yapın [8, 11].
    - `-XX:+AlwaysPreTouch`: Bellek sayfalarını önceden ayırır [7, 8].
    - **Not:** Gerçek yığın kullanımını ve GC performansını görmek için oyunda `/spark health` veya `/spark gcmonitor` kullanın [8].

### Ölçeklendirme: Düşük Gecikmeli Nesilsel GC'ler (150+)

Çok büyük veya aktif sunucular (150-300 oyuncu) için, **nesne ayırma hızı** büyük bir zorluk haline gelir. Minecraft, oyuncu hareketleri, AI hesaplamaları, blok güncellemeleri vb. nedeniyle büyük miktarda geçici veri üretir ve bu hızla çöp haline gelir [12]. G1GC bunu oldukça iyi idare etse de, aşırı yük altında duraklama süreleri fark edilebilir hale gelebilir. Java 21, yüksek ayırma hızlarındaki kısa ömürlü nesneleri verimli bir şekilde işlemek ve duraklamaları en aza indirmek için özel olarak tasarlanmış, _nesilsel_ özelliklere sahip gelişmiş düşük gecikmeli GC'ler sunar [10, 12, 13, 17].

- **Nesilsel ZGC (GZGC):**
    - **Neden:** ZGC'nin eşzamanlı, ultra düşük duraklama süresi performansını nesilsel bir yığın yapısıyla birleştirir [10, 13, 17]. Genç nesil, çoğu nesnenin öldüğü yer olarak sık sık toplanır, tam yığın taramalarına olan ihtiyacı azaltır ve eski nesilsel olmayan ZGC'ye kıyasla yüksek ayırma hızlarını daha iyi idare eder [12, 17].
    - **Uygunluk:** Düşük duraklama süresinin öncelikli olduğu güçlü sunucular için mükemmeldir (yüksek çekirdek sayısı, 16GB+ RAM önerilir) [10, 13].
    - **Örnek Bayraklar (Java 21):**

        ```bash
        java -Xms<RAM>M -Xmx<RAM>M \
        -XX:+UnlockExperimentalVMOptions \
        -XX:+UseZGC \
        -XX:+ZGenerational \
        -XX:+AlwaysPreTouch \
        -XX:+DisableExplicitGC \
        -XX:+PerfDisableSharedMem \
        -XX:+UseDynamicNumberOfGCThreads \
        -jar your-server-jar-file.jar nogui
        ```

        - `-XX:+UseZGC -XX:+ZGenerational`: Nesilsel ZGC'yi etkinleştirir [13, 17]. (Java 23+'te varsayılan olur) [10].
        - `-XX:+UseDynamicNumberOfGCThreads`: GC iş parçacıklarının dinamik ayarlanmasını sağlar [7].

- **Nesilsel Shenandoah:**
    - **Neden:** Shenandoah da çoğu GC işini eşzamanlı olarak yapar ve yığın boyutundan bağımsız olarak düşük duraklamalar hedefler [14]. JEP 404, Java 17-23'te deneysel olarak nesilsel yetenekler getirdi ve daha sonraki yapılarla daha kararlı hale geldi [18]. GZGC'ye benzer şekilde, genç nesil koleksiyonlarını daha verimli bir şekilde idare eder [18].
    - **Uygunluk:** Birçok OpenJDK yapısında (Oracle JDK değil) mevcut olan alternatif bir düşük gecikmeli nesilsel toplayıcı. GZGC'ye göre performansı, belirli iş yüküne bağlıdır; özellikle Java 24+ için nesilsel modda test edilmesi önerilir [12, 18].
    - **Örnek Bayraklar (Java 24 Kullanımı - _Deneysel_ Nesilsel Mod):**

        ```bash
        java -Xms<RAM>M -Xmx<RAM>M \
        -XX:+UnlockExperimentalVMOptions \
        -XX:+UseShenandoahGC \
        -XX:ShenandoahGCMode=generational \
        -XX:+AlwaysPreTouch \
        -XX:+DisableExplicitGC \
        -XX:+UseNUMA \
        -XX:+AlwaysActAsServerClassMachine \
        -XX:+ParallelRefProcEnabled \
        -XX:+PerfDisableSharedMem \
        -XX:+UseDynamicNumberOfGCThreads \
        -jar your-server-jar-file.jar nogui
        ```

        - `-XX:+UseShenandoahGC`: Shenandoah'yı etkinleştirir [14]. (Java 24'e özgü değil)
        - `-XX:ShenandoahGCMode=generational`: JEP 404 ile tanıtılan nesilsel modu açıkça seçer [18].

### G1GC vs. Düşük Gecikmeli Nesilsel GC'ler (GZGC/GenShen) Karşılaştırması (Java 21+)

| Özellik               | G1GC (Aikar'ın Bayraklarıyla)                   | Nesilsel ZGC / Nesilsel Shenandoah                                 |
| :-------------------- | :---------------------------------------------- | :----------------------------------------------------------------- |
| **Birincil Amaç**     | Verim ve duraklama süreleri dengesi             | Duraklama sürelerini en aza indirme (ultra düşük gecikme)          |
| **Tipik Duraklama**   | Düşük, ancak yükle artabilir (<200ms hedef) [8] | Son derece düşük, milisaniye altı hedef [13, 14]                   |
| **Ayırma İşleme**     | İyi (Nesilsel)                                  | Mükemmel (Nesilsel + Eşzamanlı) [12, 17, 18]                       |
| **Verim**             | Genellikle çok iyi                              | Eşzamanlı işler nedeniyle potansiyel olarak biraz daha düşük [12]  |
| **CPU Kullanımı**     | Duraklamalar sırasında orta, pik yapar          | Eşzamanlı görevler için daha yüksek _arka plan_ CPU kullanımı [12] |
| **RAM Yükü**          | Verimli                                         | Biraz daha fazla yük gerektirebilir [12]                           |
| **Karmaşıklık**       | İyi anlaşılmış temel [8]                        | G1GC'den daha basit ayar [10, 12, 14]                              |
| **Olgunluk**          | Çok olgun [9]                                   | Nesilsel modlar daha yeni (Java 21+) [10, 18]                      |
| **En İyi Olduğu Yer** | Çoğu sunucu (<100 oyuncu), denge [8]            | Çok büyük sunucular (150/300+), gecikme hassas [12]                |

**Öneri:** Aikar'ın G1GC bayraklarıyla başlayın. Eğer `/spark gcmonitor` sık veya uzun GC duraklamaları gösteriyorsa _ayar yapılmasına rağmen_ veya profil oluşturma, yüksek oyuncu sayılı bir sunucuda **ayırma hızıyla** mücadele ettiğini gösteriyorsa (ve yeterli donanım + Java 21 varsa), Nesilsel ZGC'ye geçmeyi düşünün. Java 24+ kullanıyorsanız veya GZGC sorun çıkarıyorsa Nesilsel Shenandoah'yı test edin.

### Aşırı Ölçek (300+ Oyuncu) ve Gelişmiş Ayar

- **Ayırma Hızı Önemlidir:** Bu ölçekte, saniyede oluşturulan geçici nesnelerin hacmi (ayırma hızı), GC üzerinde büyük bir baskı oluşturur. GZGC veya Nesilsel Shenandoah gibi ultra düşük duraklamalı toplayıcılar bile, uygulama bellek ayırmasını GC'nin eşzamanlı olarak geri kazanabileceğinden daha hızlı yaparsa zorlanabilir. Bu, ayırma duraklamalarına (kısa donmalara) veya yığın boyutunun önemli ölçüde büyütülmesine neden olabilir.
- **Derin Profil Oluşturma (Spark):** Zorunlu. Yüksek ayırma hızlarına neden olan uygulama sıcak noktalarını (örneğin, verimsiz eklentiler, karmaşık varlık AI) belirlemek için `/spark profiler` kullanın. GC duraklama sürelerini _ve_ ayırma hızlarını gözlemlemek için `/spark gcmonitor` kullanın. Uygulamanın kendisinde gereksiz ayırmaları azaltmak (eklenti optimizasyonu, sunucu yapılandırma ayarı), bu seviyede yalnızca GC ayarına güvenmekten daha etkili olabilir.
- **Donanım:** Güçlü CPU'lar (yüksek tek iş parçacığı _ve_ çok çekirdek performansı), bol RAM (32GB++, potansiyel olarak 64GB+ ayırma hızlarına ve yığın ihtiyaçlarına bağlı olarak) ve hızlı NVMe depolama gerektirir.

## Gelişmiş JVM Ayarı: Derleyici ve Çalışma Zamanı Optimizasyonları

Çöp Toplama'nın ötesinde, diğer JVM bayrakları, özellikle bellek kullanımı, kod derleme (JIT) ve iş parçacığı işleme ile ilgili performansı etkileyebilir. **Bunlar gelişmiş seçeneklerdir; değişiklikleri Spark veya diğer yollarla dikkatlice test edin.** Varsayılanlar, aksi belirtilmedikçe Java 21 içindir.

### Standart HotSpot (C1/C2) Derleyici ve Çalışma Zamanı Ayarı

Bu bayraklar, Temurin veya Corretto gibi standart OpenJDK yapıları kullanıldığında geçerlidir.

- **Bellek ve İşaretçiler:**
    - `-XX:+UseCompressedOops` (Varsayılan: false): 64-bit sistemlerde nesne işaretçileri için bellek kullanımını azaltır. Küçük bir bellek tasarrufuyla performansı biraz etkileyebilir [7].
    - `-XX:+UseCompressedClassPointers` (Varsayılan: true): İşaretçiler için benzer ancak sınıf işaretçileri için. Meta veri bellek kullanımını azaltır. Etkin bırakın [7].
    - `-XX:+UseStringDeduplication` (Varsayılan: false, G1GC Gerektirir): Çok sayıda yinelenen dizge (sohbet, tabelalar, eşya adları) olan sunucularda, aynı altta yatan karakter dizisini paylaşmalarını sağlayarak önemli miktarda bellek tasarrufu sağlayabilir. GC döngüleri sırasında biraz CPU yükü ekler. Yüksek RAM kullanımı ve G1GC olan sunucularda `+XX:+UseStringDeduplication` ekleyerek test etmeye değer [7, 8].
- **Kod Önbelleği:** (Derlenmiş yerel kodu depolar)
    - `-XX:ReservedCodeCacheSize=<size>` (Varsayılan: platforma bağlı, genellikle 240M): Maksimum boyutu ayarlar. Yalnızca günlüklerde "CodeCache is full. Compiler has been disabled." uyarısı görüyorsanız artırın (örneğin, `512M`) [7]. Kullanımı izleyin (`jcmd <pid> VM.native_memory` veya Spark).
    - `-XX:+UseCodeCacheFlushing` (Varsayılan: true): Önbellek alanı azaldığında daha az kullanılan derlenmiş kodun temizlenmesine izin verir. Etkin bırakın [7].
- **İş Parçacığı ve Zamanlama:**
    - `-XX:+UseThreadPriorities` (Varsayılan: true): JVM iş parçacıklarının farklı işletim sistemi önceliklerine sahip olmasına izin verir (örneğin, GC iş parçacıkları vs ana iş parçacığı). Etkin bırakın [7].
    - `-XX:ThreadPriorityPolicy=1` (Varsayılan: 0): `1` yapmak, Java iş parçacıklarına diğer süreçlere göre daha yüksek işletim sistemi öncelikleri vermeye çalışır. Yük altında sunucuyu daha duyarlı hale getirebilir ancak diğer temel sistem süreçlerini aç bırakabilir. Dikkatle kullanın ve sistem kararlılığını izleyin [7].
- **Donanıma Özgü:**
    - `-XX:+UseNUMA` (Varsayılan: false): NUMA farkındalığını etkinleştirir, belleği çalıştıran CPU'ya yerel NUMA düğümünde ayırmaya çalışır. Çok soketli sistemlerde veya büyük tek soketli CPU'larda (EPYC, Threadripper) donanım ve işletim sistemi düzgün destekliyorsa performansı önemli ölçüde artırabilir. `+XX:+UseNUMA` ekleyerek dikkatlice test edin, çünkü yanlış yapılandırma performansı düşürebilir [7]. ZGC/Shenandoah gibi düşük gecikmeli GC'ler genellikle kendi NUMA işlemlerine sahiptir.
    - `-XX:+UseLargePages` (Varsayılan: false, İşletim Sistemi yapılandırması gerektirir): JVM'nin daha büyük bellek sayfaları kullanmasına izin verir (örneğin, 4KB yerine 2MB/1GB). Çok büyük yığınlarda (>32GB) TLB (Çeviri Önbelleği) kaçırmalarını azaltarak performansı artırabilir. İşletim sistemi yapılandırması (izinler, büyük sayfa havuzu ayarları) gerektirir ve karmaşık olabilir. Denemek isterseniz `+XX:+UseLargePages` ekleyerek dikkatlice test edin [7].
    - `-XX:+AlwaysActAsServerClassMachine` (Varsayılan: false): Donanım algılama başarısız olsa veya sunucu bir Docker konteynerindeyse bile JVM'nin sunucu modu varsayılanlarını (C2 derleyicisi gibi) kullanmasını sağlar. Açıkça eklemek zararsızdır [7].

---

- Kısacası - çoğu "ağır iş" zaten varsayılan olarak etkinleştirilmiştir, "aşırı ayar" yapmaya gerek yoktur. Ancak, bayraklar hakkında daha fazla bilgi edinmek isterseniz, her Java sürümündeki değişiklikleri harika açıklamalarla takip eden [bu harika web sitesini](https://chriswhocodes.com/hotspot_options_openjdk21.html) ziyaret edin!

---

### GraalVM JIT Derleyici Ayarı

- **Genel Seçenekler:**
    - `-XX:+UseJVMCIVMCompiler` (GraalVM'de Varsayılan: true): GraalVM derleyicisini üst düzey JIT olarak etkinleştirir. Bunu devre dışı bırakmak (`-XX:-UseJVMCIVMCompiler`), HotSpot'un C2 derleyicisine geri döner, karşılaştırma için kullanışlıdır [19].
    - `-Dgraal.CompilerConfiguration=<community|enterprise|economy>` (CE için Varsayılan: community): Derleyici yapılandırmasını seçer. `community` standarttır, `enterprise` daha agresif optimizasyonlar sunar ancak derleme süresi daha uzun olabilir, `economy` daha hızlı derler ancak daha az optimize eder [19].
    - `-Dgraal.ShowConfiguration=<none|info|verbose>` (Varsayılan: none): Başlangıç sırasında seçilen Graal derleyici yapılandırması hakkında bilgi yazdırır [19]. Doğrulama için kullanışlıdır.
    - `-Dgraal.MitigateSpeculativeExecutionAttacks=<None|AllTargets|GuardTargets|NonDeoptGuardTargets>` (Varsayılan değişir, genellikle `GuardTargets`): (Bu bayrak, GraalVM JDK 24'ten itibaren -Djdk.graal.SpectrePHTBarriers=<None|AllTargets|GuardTargets|NonDeoptGuardTargets> olarak değiştirildi.) Spectre gibi CPU güvenlik açıkları için azaltmaları kontrol eder. `None` en iyi performansı sunar ancak en az güvenlidir. `AllTargets` en güvenli ancak büyük bir performans etkisi vardır. `GuardTargets` yaygın bir dengedir [19]. Güvenilir sunucu ortamlarında, dikkatli risk değerlendirmesinden sonra `None` düşünülebilir, aksi takdirde varsayılan genellikle uygundur.
- **Performans Ayar Seçenekleri:**
    - `-Dgraal.UsePriorityInlining=true` (Varsayılan: true): Verimi derleme hızına tercih eden gelişmiş bir satır içi algoritmayı etkinleştirir [19]. Devre dışı bırakmak (`false`), ısınma süresini hızlandırabilir ancak potansiyel olarak tepe performansını azaltır.
    - `-Dgraal.Vectorization=true` (Varsayılan: true): Matematiksel/dizi işlemlerinde potansiyel olarak daha hızlı SIMD talimatlarının (vektörizasyon) otomatik kullanımını etkinleştirir [19]. Devre dışı bırakmak (`false`), sorun çıkarmadıkça pek faydalı değildir.
    - `-Dgraal.OptDuplication=true` (Varsayılan: true): Farklı kod yollarını ayrı ayrı optimize ederek performansı artırabilen yol kopyalama optimizasyonunu etkinleştirir [19]. Devre dışı bırakmak (`false`), derleme süresini azaltabilir ancak çalışma zamanı performansını muhtemelen düşürür.
    - `-Dgraal.TuneInlinerExploration=<float>` (Varsayılan: 0, Aralık: -1 ile 1): Satır içi olasılıklarını keşfetmek için harcanan çabayı ayarlar. 0'dan büyük değerler çabayı artırır (potansiyel olarak daha iyi tepe performansı, daha yavaş ısınma), 0'dan küçük değerler çabayı azaltır (daha hızlı ısınma, potansiyel olarak daha düşük tepe) [19]. Ayar yapmak için dikkatli profil oluşturma gerekir.
    - `-Dgraal.TraceInlining=false` (Varsayılan: false): Satır içi kararlarının ayrıntılı günlüğünü etkinleştirir [19]. Yalnızca derin hata ayıklama için kullanışlıdır.
- **Seçenekleri Bulma:** GraalVM çalıştırırken `java -XX:+UnlockExperimentalVMOptions -XX:+PrintFlagsFinal -version | grep graal` kullanarak mevcut Graal ile ilgili bayrakları listeleyin, ancak bunları anlamak derin bilgi veya dokümantasyon gerektirir [19].

---

**Derleyici/Çalışma Zamanı Bayrakları için Genel Tavsiye:**

- **Varsayılanlar Genellikle İyidir:** Modern JVM'ler (hem HotSpot hem GraalVM) iyi ayarlanmıştır. Profil oluşturma (Spark) açıkça derleme veya kod önbelleği ile ilgili bir darboğaz göstermedikçe varsayılanlara sadık kalın.
- **GC ve Uygulamaya Odaklanın:** Minecraft için, GC'yi optimize etmek (Aikar'ın bayrakları veya GZGC/GenShen gibi uygun bayraklar kullanmak) ve uygulama davranışını (sunucu yapılandırmaları, eklenti verimliliği) optimize etmek genellikle en önemli performans kazanımlarını sağlar.
- **Kademeli Test Yapın:** Bu bayraklarla deneme yaparsanız, yalnızca birini değiştirin ve Spark ile etkisini ölçün.

## Sunucu Yazılımı Yapılandırması (Paper, Purpur, Leaf, vb.)

JVM ayarı çok önemliyken, **sunucu yazılımı yapılandırması da aynı derecede önemlidir.** `paper-global.yml`, `paper-world-defaults.yml`, `purpur.yml`, `leaf-global.yml` gibi dosyalardaki ayarlar, performansı ve **ayırma hızlarını** büyük ölçüde etkileyen oyun mekaniklerini kontrol eder.

- **Önemi:** JVM bayrakları _sunucunun nasıl çalıştığını_ yönetirken (bellek, derleme), sunucu yapılandırmaları _sunucunun ne yaptığını_ yönetir (varlık tikleme, parça yükleme, AI). Her ikisini de optimize etmek gereklidir.
- **Ana Alanlar:** Görünüm mesafesi, simülasyon mesafesi, canavar oluşturma sınırları/oranları, varlık etkinleştirme aralıkları (AI/tik yükünü ve ayırmaları azaltmak için kritik), parça yükleme/oluşturma ayarları, huni davranışı ve asenkron işlemler (işi ana iş parçacığından uzaklaştırma). Bu ayarlar için Paper [15] ve Purpur [16] dokümantasyonuna bakın.
- **Eylem:** **Bu dosyaları ihmal etmeyin.** Kullandığınız sunucu yazılımının dokümantasyonuna bakın. **Leaf'in özel ayarları (`leaf-global.yml`) için ayrıntılı rehber için ["Leaf Sunucunuzu Optimize Edin"](../how-to/optimize-leaf-server.md) rehberine geri dönün.** Profil oluşturma sonuçlarını (Spark) kullanarak hangi oyun yönlerinin (genellikle yüksek ayırmayla ilişkili) bu yapılandırmalarda ayarlanması gerektiğini belirleyin.

## Test, Yineleme ve Yardım Arama

- **Yeniden Başlatın:** Değişiklikleri uygulamak için sunucuyu yeniden başlatın.
- **İzleyin:** Performansı, GC davranışını ve ayırma hızlarını kontrol etmek için `/spark tps`, `/spark profiler` ve `/spark gcmonitor` kullanın.
- **Gözlemleyin:** Oyun hatalarını veya beklenmedik davranışları izleyin.
- **Ayar Yapın:** Sorunlar ortaya çıkarsa değişiklikleri geri alın. Profil oluşturma verilerine göre ayarları ince ayar yapın. Optimizasyon yinelemelidir.
- **Topluluk:** Sorunlarla karşılaşırsanız ilgili Discord sunucularında (PaperMC, Purpur, Leaf) yardım isteyin.

## Referanslar

1. Mojang Studios (Minecraft 1.20.5 Sürüm Notları): [https://www.minecraft.net/en-us/article/minecraft-java-edition-1-20-5](https://www.minecraft.net/en-us/article/minecraft-java-edition-1-20-5)
2. PaperMC Dokümantasyonu (Başlarken): [https://docs.papermc.io/paper/getting-started](https://docs.papermc.io/paper/getting-started)
3. Adoptium Eclipse Temurin: [https://adoptium.net/](https://adoptium.net/)
4. Amazon Corretto: [https://aws.amazon.com/corretto/](https://aws.amazon.com/corretto/)
5. Oracle OpenJDK Yapıları: [https://jdk.java.net/](https://jdk.java.net/)
6. GraalVM: [https://www.graalvm.org/](https://www.graalvm.org/)
7. Oracle Java HotSpot VM Seçenekleri (Java 21): [https://chriswhocodes.com/hotspot_options_openjdk21.html](https://chriswhocodes.com/hotspot_options_openjdk21.html) (Resmi olmayan ancak kapsamlı liste) / Resmi alt küme: [https://docs.oracle.com/en/java/javase/21/docs/specs/man/java.html](https://docs.oracle.com/en/java/javase/21/docs/specs/man/java.html)
8. Aikar'ın Minecraft Java Bayrakları Rehberi: [https://aikar.co/2018/07/02/tuning-the-jvm-g1gc-garbage-collector-flags-for-minecraft/](https://aikar.co/2018/07/02/tuning-the-jvm-g1gc-garbage-collector-flags-for-minecraft/)
9. Oracle G1 Çöp Toplayıcı Dokümantasyonu: [https://docs.oracle.com/en/java/javase/21/gctuning/garbage-first-g1-garbage-collector.html](https://docs.oracle.com/en/java/javase/21/gctuning/garbage-first-g1-garbage-collector.html)
10. Oracle Java 21 Sürüm Notları (Nesilsel ZGC): [https://www.oracle.com/java/technologies/javase/21-relnote-issues.html#JDK-8293822](https://www.oracle.com/java/technologies/javase/21-relnote-issues.html#JDK-8293822)
11. Oracle Java Platformu, Standart Sürüm HotSpot Sanal Makine Çöp Toplama Ayar Kılavuzu (Yığın Boyutu Ayarı): [https://docs.oracle.com/en/java/javase/21/gctuning/factors-affecting-garbage-collection-performance.html#GUID-B0408057-SAF8-4C88-A484-E4565CEA6F75](https://docs.oracle.com/en/java/javase/21/gctuning/factors-affecting-garbage-collection-performance.html#GUID-B0408057-SAF8-4C88-A484-E4565CEA6F75)
12. BellSoft Blog: JDK 21'de Nesilsel ZGC: Nedir ve nasıl kullanılır: [https://bell-sw.com/blog/Generational-ZGC-in-JDK-21/](https://bell-sw.com/blog/Generational-ZGC-in-JDK-21/)
13. OpenJDK ZGC Projesi (JEP 439: Nesilsel ZGC): [https://openjdk.org/jeps/439](https://openjdk.org/jeps/439)
14. OpenJDK Shenandoah Projesi: [https://wiki.openjdk.org/display/shenandoah/Main](https://wiki.openjdk.org/display/shenandoah/Main)
15. PaperMC Dokümantasyonu: [https://docs.papermc.io/paper/](https://docs.papermc.io/paper/)
16. Purpur Dokümantasyonu: [https://purpurmc.org/docs/](https://purpurmc.org/docs/)
17. Inside.java Açıklayıcı: Nesilsel ZGC: [https://inside.java/2023/11/28/gen-zgc-explainer/](https://inside.java/2023/11/28/gen-zgc-explainer/)
18. OpenJDK JEP 404: Nesilsel Shenandoah (Deneysel): [https://openjdk.org/jeps/404](https://openjdk.org/jeps/404)
19. GraalVM Dokümantasyonu - Java Çalışma Zamanı Seçenekleri: [https://www.graalvm.org/jdk21/reference-manual/java/options/](https://www.graalvm.org/jdk21/reference-manual/java/options/)
