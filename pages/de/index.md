---
layout: home

hero:
  name: "Leaf"
  text: "Eine leistungsstarke Minecraft Server Software"
  image: /logo.svg
  tagline: Ein Paper-Fork mit dem Ziel, die Balance zwischen Leistung, Stabilität und Vanilla-Gameplay zu finden
  actions:
    - theme: brand
      text: Veröffentlichungen
      link: /download
    - theme: alt
      text: Dokumentation
      link: https://docs.leafmc.one/
features:
  - title: <span class='emoji'>⚡</span> Leistungsstark und optimiert
    details: Stabil, performant und für große Spielerzahlen entwickelt
  - title: <span class='emoji'>🧬</span> Nützlich und anpassbar
    details: Enthält viele nützliche Features und Fixes, die in der Konfiguration angepasst werden können
  - title: <span class='emoji'>📦</span> Neueste Abhängigkeiten
    details: Modern, da Abhängigkeiten immer aktuell gehalten werden
---

<script setup>
import Contributors from '../../.vitepress/theme/components/download/Contributors.vue'
</script>

## Team und Mitwirkende

<Suspense>
    <Contributors lang="de" />
</Suspense>
