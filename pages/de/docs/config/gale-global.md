<script setup>
import galeGlobalConfig_latest from './data/gale-global-latest';
import galeGlobalConfig_1_21_4 from './data/gale-global-1-21-4';
import galeGlobalConfig_1_21_1 from './data/gale-global-1-21-1';
import ConfigGroup from '../../../../.vitepress/theme/components/config/ConfigGroup.vue'
const data = {
    '1.21.11': galeGlobalConfig_latest,
    '1.21.8': galeGlobalConfig_1_21_4, // No change since 1.21.4
    '1.21.4': galeGlobalConfig_1_21_4,
    '1.21.1': galeGlobalConfig_1_21_1
}
</script>

# Globale Gale Konfiguration

Diese YAML Konfiguration zeigt die standardmäßige Struktur der Konfigurationswerte der globalen Konfiguration von Gale (`config/gale-global.yml`)

Klicke auf die Pfeile hinter den Konfigurationswerten, um die entsprechende Beschreibung anzusehen

<ConfigGroup :data />
