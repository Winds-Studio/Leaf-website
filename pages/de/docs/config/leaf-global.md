<script setup>
import leafGlobalConfig_latest from './data/leaf-global-latest';
import leafGlobalConfig_1_21_4 from './data/leaf-global-1-21-4';
import leafGlobalConfig_1_21_1 from './data/leaf-global-1-21-1';
import ConfigGroup from '../../../../.vitepress/theme/components/config/ConfigGroup.vue'
const data = {
    '1.21.8': leafGlobalConfig_latest,
    '1.21.4': leafGlobalConfig_1_21_4,
    '1.21.1': leafGlobalConfig_1_21_1
}
</script>

# Globale Leaf Konfiguration

Diese YAML Konfiguration zeigt die standardmäßige Struktur der Konfigurationswerte der globalen Konfiguration von Leaf (`config/leaf-global.yml`)

Klicke auf die Pfeile hinter den Konfigurationswerten, um die entsprechende Beschreibung anzusehen

Ein Hot-Reload kann mit `/leaf reload` durchgeführt werden. Hot-Reload wird für asynchrone Optionen **nicht unterstützt**.

<ConfigGroup :data />
