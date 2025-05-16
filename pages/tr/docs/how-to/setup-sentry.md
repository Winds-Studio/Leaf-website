# Leaf ile Sentry Kurulumu

[Sentry](https://sentry.io/), gerçek zamanlı hata izleme ve performans izleme için güçlü bir servistir. Leaf sunucunuzla entegre edilmesi, hataları ve istisnaları otomatik olarak yakalamanızı sağlar, bu da sunucunuzda ortaya çıkan sorunları teşhis etmeyi ve düzeltmeyi çok daha kolay hale getirir.

Bu rehber, Leaf'in Sentry projenize hata raporları göndermesi için nasıl yapılandırılacağını açıklar.

## Ön Koşullar

1. **Sentry Hesabı:** [sentry.io](https://sentry.io/) üzerinde bir hesabınızın olması gerekir. Birçok sunucu için uygun ücretsiz katmanlar sunarlar.
2. **Sentry Projesi:** Sentry organizasyonunuz içinde yeni bir proje oluşturun.
   * Platform seçimi istendiğinde, **Java**'yı seçin. Eğer Java hemen görünmüyorsa, "Diğer" seçeneğini seçebilir veya aratabilirsiniz. Belirli platform seçimi, genellikle Sentry tarafındaki başlangıç kurulum talimatlarını etkiler, ancak Leaf entegrasyonu kendisi halleder.
3. **DSN (Veri Kaynağı Adı):** Projeniz oluşturulduktan sonra, proje ayarlarına gidin. "Client Keys (DSN)" bölümünü bulun. DSN dizesini kopyalayın – bu bir URL gibi görünür (örneğin, `https://xxxxxxxxxxxxxxxxxxxxxxxx@o######.ingest.sentry.io/#######`).

## Yapılandırma Adımları

1. **Leaf Yapılandırmasını Bulun:** Ana Leaf sunucu yapılandırma dosyasını açın. Bu genellikle sunucunuzun kök dizininde veya `config` alt klasöründe bulunan `leaf-global.yml` dosyasıdır.

2. **Sentry Bölümünü Bulun:** Yapılandırma dosyası içinde `sentry:` bölümünü bulun. Varsayılan olarak bu bölüm aşağıdaki gibi görünür:

   ```yaml
   sentry:
     # Geliştirilmiş hata günlüğü için Sentry DSN, devre dışı bırakmak için boş bırakın,
     # https://sentry.io/ adresinden alın
     dsn: ''
     # Bu seviye veya daha yüksek seviyedeki günlükler kaydedilecektir.
     log-level: WARN
     # Bunu etkinleştirdikten sonra yalnızca Throwable içeren günlükler kaydedilecektir.
     only-log-thrown: true
   ```

3. **Ayarları Yapılandırın:**

   * **`dsn`:**
     * Boş tek tırnakları (`''`) Sentry proje ayarlarından kopyaladığınız DSN ile değiştirin. Tek tırnak içinde olduğundan emin olun.
     * **Örnek:** `dsn: 'https://xxxxxxxxxxxxxxxxxxxxxxxx@o######.ingest.sentry.io/#######'`
     * *Bunu boş bırakırsanız, Sentry entegrasyonu devre dışı kalır.*

   * **`log-level`:**
     * Bu, Leaf'in Sentry'ye göndereceği günlük mesajlarının minimum önem seviyesini belirler. Yaygın seviyeler `ERROR`, `WARN`, `INFO`, `DEBUG` içerir.
     * Varsayılan `WARN`, yalnızca uyarı veya hata olarak kaydedilen mesajların (genellikle istisnalar dahil) gönderileceği anlamına gelir.
     * Yalnızca kritik hataları istiyorsanız `ERROR` olarak ayarlayabilirsiniz. Daha düşük bir seviye (örneğin, `INFO`) ayarlamak çok daha fazla veri gönderebilir ve aktif olarak hata ayıklama yapmadığınız sürece istenmeyebilir.
     * **Öneri:** Varsayılan olan `WARN` ile başlayın.

   * **`only-log-thrown`:**
     * `true` olarak ayarlanırsa (varsayılan), Leaf yalnızca açıkça bir Java `Throwable` (örneğin, bir istisna veya yığın izi içeren hata) içeren günlük mesajlarını Sentry'ye gönderir. Bu, Sentry'nin gerçek kod hatalarına odaklanması için şiddetle önerilir.
     * `false` olarak ayarlanırsa, `log-level` eşiğini karşılayan *herhangi* bir günlük mesajı, hata içermeyen yalnızca bilgilendirme metni olsa bile gönderilir. Bu, Sentry'de çok fazla gürültü yaratabilir.
     * **Öneri:** Varsayılan olan `true` değerini koruyun.

4. **Kaydedin ve Yeniden Başlatın:**
   * Yapılandırma dosyasındaki değişiklikleri kaydedin.
   * Yeni ayarların etkili olması için Leaf sunucunuzu tamamen yeniden başlatın.

## Sorun Giderme

* **Hatalar Görünmüyor:**
  * `dsn` değerinin doğru kopyalandığından ve YAML dosyasında tek tırnak içinde olduğundan emin olun.
  * `log-level` değerinin çok yüksek olmadığından emin olun (örneğin, `ERROR` olarak ayarlanmışsa uyarılar gönderilmez).
  * `only-log-thrown` ayarının beklediğiniz hatalar için uygun olduğunu doğrulayın.
  * Yapılandırma değişikliğinden sonra sunucunun tamamen yeniden başlatıldığından emin olun.
  * Sunucunuzun güvenlik duvarının `ingest.sentry.io` adresine 443 numaralı port (HTTPS) üzerinden giden bağlantıları engelleyip engellemediğini kontrol edin.
* **Çok Fazla Sorun:**
  * `log-level` değerini artırın (örneğin, `WARN` yerine `ERROR`).
  * `only-log-thrown` ayarının `true` olduğundan emin olun.