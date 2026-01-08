<script setup>
import galeGlobalConfig_latest from './data/gale-global-latest;
import galeGlobalConfig_1_21_4 from './data/gale-global-1-21-4';
import galeGlobalConfig_1_21_1 from './data/gale-global-1-21-1';
import ConfigGroup from '../../../.vitepress/theme/components/config/ConfigGroup.vue'
const data = {
    '1.21.11': galeGlobalConfig_latest,
    '1.21.4': galeGlobalConfig_1_21_4,
    '1.21.1': galeGlobalConfig_1_21_1
}
</script>

# Gale global config

The YAML config below shows the structure and default config values of Gale's global config (`config/gale-global.yml`)

Click arrow button behind the config node to show description of it

<ConfigGroup :data />
