---
layout: home

hero:
    name: "Leaf"
    text: "Yüksek performanslı Minecraft sunucu yazılımı"
    image: /logo.svg
    tagline: Performans, vanilla deneyimi ve stabilite arasında denge kuran bir Paper fork'u
    actions:
        - theme: brand-button
          text: İndir
          link: /tr/download
        - theme: brand-button
          text: Dokümanlar
          link: /tr/docs/getting-started
        - theme: alt
          text: Discord'a Katıl
          link: https://discord.gg/gfgAwdSEuM
        - theme: alt
          text: GitHub
          link: https://github.com/Winds-Studio/Leaf
features:
    - title: <span class='emoji'>⚡</span> Güçlü ve optimize edilmiş
      details: Geniş oyuncu kapasitesi için tasarlanmış stabil ve performanslı bir yapı
    - title: <span class='emoji'>🧬</span> Kullanışlı ve özelleştirilebilir
      details: Birçok kullanışlı özellik ve düzeltme içerir, hepsi yapılandırma dosyalarından ayarlanabilir
    - title: <span class='emoji'>📦</span> Güncel bağımlılıklar
      details: Modern yapı, bağımlılıklar sürekli güncel tutulur
---

<script setup>
import Contributors from '../../.vitepress/theme/components/Contributors.vue'
</script>

## Ekip ve Katkıda Bulunanlar

<Suspense>
    <Contributors />
</Suspense>
