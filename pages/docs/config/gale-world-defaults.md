<script setup>
import galeWorldDefaultsConfig_1_21_4 from './data/gale-world-defaults-1-21-4';
import galeWorldDefaultsConfig_1_21_1 from './data/gale-world-defaults-1-21-1';
import ConfigGroup from '../../../.vitepress/theme/components/config/ConfigGroup.vue'
const data = {
    '1.21.4': galeWorldDefaultsConfig_1_21_4,
    '1.21.1': galeWorldDefaultsConfig_1_21_1
}
</script>

# Gale world default config

The YAML config below shows the structure and default config values of Gale's world defaults config (`config/gale-world-defaults.yml`)

Click arrow button behind the config node to show description of it

<ConfigGroup :data />
