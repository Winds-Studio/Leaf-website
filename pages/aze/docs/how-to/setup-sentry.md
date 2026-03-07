# Leaf ilə Sentry Qurulumu

[Sentry](https://sentry.io/), real vaxt xəta izləmə və performans izləmə üçün güclü bir xidmətdir. Leaf serverinizlə inteqrasiya edilməsi, xətaları və istisnaları avtomatik olaraq yaxalamanızı təmin edir, bu da serverinizdə ortaya çıxan problemları diaqnoz etməyi və düzəltməyi çox daha asan edir.

Bu rəhbər, Leaf'in Sentry layihənizə xəta hesabatları göndərməsi üçün necə konfiqurasiya ediləcəyini izah edir.

## Əvvəl Şərtlər

1. **Sentry Hesabı:** [sentry.io](https://sentry.io/) üzərində bir hesabınızın olması lazımdır. Bir çox server üçün uyğun pulsuz qatmanlar təklif edirlər.
2. **Sentry Layihəsi:** Sentry təşkilatınız daxilində yeni bir layihə yaradın.
    - Platform seçimi istəndikdə, **Java**'yı seçin. Əgər Java dərhal görünmürsə, "Digər" seçimini seçə bilər və ya axtara bilərsiniz. Müəyyən platform seçimi, adətən Sentry tərəfindəki başlanğıc qurulum təlimatlarını təsir edir, lakin Leaf inteqrasiyası özü həll edir.
3. **DSN (Veri Mənbəyi Adı):** Layihəniz yaradıldıqdan sonra, layihə ayarlarına gidin. "Client Keys (DSN)" bölməsini tapın. DSN sətrini köçürün – bu URL kimi görünür (məsələn, `https://xxxxxxxxxxxxxxxxxxxxxxxx@o######.ingest.sentry.io/#######`).

## Konfiqurasiya Addımları

1. **Leaf Konfiqurasiyasını Tapın:** Ana Leaf server konfiqurasiya faylını açın. Bu adətən serverinizin kök qovluğunda və ya `config` alt qovluğunda yerləşən `leaf-global.yml` faylıdır.

2. **Sentry Bölməsini Tapın:** Konfiqurasiya faylı daxilində `sentry:` bölməsini tapın. Susmaya görə bu bölmə aşağıdakı kimi görünür:

    ```yaml
    sentry:
        # İnkişaf etmiş xəta jurnalı üçün Sentry DSN, söndürmək üçün boş buraxın,
        # https://sentry.io/ adresinden alın
        dsn: ""
        # Bu səviyyə və ya daha yüksək səviyyədəki jurnallar qeyd ediləcəkdir.
        log-level: WARN
        # Bunu aktiv etdikdən sonra yalnız Throwable ehtiva edən jurnallar qeyd ediləcəkdir.
        only-log-thrown: true
    ```

3. **Ayarları Yapılandırın:**
    - **`dsn`:**
        - Boş tek tırnakları (`''`) Sentry proje ayarlarından kopyaladığınız DSN ile değiştirin. Tek tırnak içinde olduğundan emin olun.
        - **Örnek:** `dsn: 'https://xxxxxxxxxxxxxxxxxxxxxxxx@o######.ingest.sentry.io/#######'`
        - _Bunu boş bırakırsanız, Sentry entegrasyonu devre dışı kalır._

    - **`log-level`:**
        - Bu, Leaf'in Sentry'ye göndereceği günlük mesajlarının minimum önem seviyesini belirler. Yaygın seviyeler `ERROR`, `WARN`, `INFO`, `DEBUG` içerir.
        - Varsayılan `WARN`, yalnızca uyarı veya hata olarak kaydedilen mesajların (genellikle istisnalar dahil) gönderileceği anlamına gelir.
        - Yalnızca kritik hataları istiyorsanız `ERROR` olarak ayarlayabilirsiniz. Daha düşük bir seviye (örneğin, `INFO`) ayarlamak çok daha fazla veri gönderebilir ve aktif olarak hata ayıklama yapmadığınız sürece istenmeyebilir.
        - **Öneri:** Varsayılan olan `WARN` ile başlayın.

    - **`only-log-thrown`:**
        - `true` olarak ayarlanırsa (varsayılan), Leaf yalnızca açıkça bir Java `Throwable` (örneğin, bir istisna veya yığın izi içeren hata) içeren günlük mesajlarını Sentry'ye gönderir. Bu, Sentry'nin gerçek kod hatalarına odaklanması için şiddetle önerilir.
        - `false` olarak ayarlanırsa, `log-level` eşiğini karşılayan _herhangi_ bir günlük mesajı, hata içermeyen yalnızca bilgilendirme metni olsa bile gönderilir. Bu, Sentry'de çok fazla gürültü yaratabilir.
        - **Öneri:** Varsayılan olan `true` değerini koruyun.

4. **Kaydedin ve Yeniden Başlatın:**
    - Yapılandırma dosyasındaki değişiklikleri kaydedin.
    - Yeni ayarların etkili olması için Leaf sunucunuzu tamamen yeniden başlatın.

## Sorun Giderme

- **Hatalar Görünmüyor:**
    - `dsn` değerinin doğru kopyalandığından ve YAML dosyasında tek tırnak içinde olduğundan emin olun.
    - `log-level` değerinin çok yüksek olmadığından emin olun (örneğin, `ERROR` olarak ayarlanmışsa uyarılar gönderilmez).
    - `only-log-thrown` ayarının beklediğiniz hatalar için uygun olduğunu doğrulayın.
    - Yapılandırma değişikliğinden sonra sunucunun tamamen yeniden başlatıldığından emin olun.
    - Sunucunuzun güvenlik duvarının `ingest.sentry.io` adresine 443 numaralı port (HTTPS) üzerinden giden bağlantıları engelleyip engellemediğini kontrol edin.
- **Çok Fazla Sorun:**
    - `log-level` değerini artırın (örneğin, `WARN` yerine `ERROR`).
    - `only-log-thrown` ayarının `true` olduğundan emin olun.
