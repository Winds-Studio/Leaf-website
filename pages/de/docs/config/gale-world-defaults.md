<script setup>
import galeWorldDefaultsConfig_latest from './data/gale-world-defaults-latest';
import galeWorldDefaultsConfig_1_21_4 from './data/gale-world-defaults-1-21-4';
import galeWorldDefaultsConfig_1_21_1 from './data/gale-world-defaults-1-21-1';
import ConfigGroup from '../../../../.vitepress/theme/components/config/ConfigGroup.vue'
const data = {
    '1.21.11': galeWorldDefaultsConfig_latest,
    '1.21.8': galeWorldDefaultsConfig_1_21_4, // No change since 1.21.4
    '1.21.4': galeWorldDefaultsConfig_1_21_4,
    '1.21.1': galeWorldDefaultsConfig_1_21_1
}
</script>

# Weltspezifische Gale Konfiguration

Diese YAML Konfiguration zeigt die standardmäßige Struktur der Konfigurationswerte der weltspezifischen Konfiguration von Gale (`config/gale-world-defaults.yml`)

Klicke auf die Pfeile hinter den Konfigurationswerten, um die entsprechende Beschreibung anzusehen

<ConfigGroup :data />
