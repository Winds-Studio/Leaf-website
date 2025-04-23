<script setup>
import galeGlobalConfig from './data/gale-global';
import ConfigGroup from '../../../.vitepress/theme/components/config/ConfigGroup.vue'
const data = {
    '1.21.1': galeGlobalConfig
}
</script>

# Gale global config
The YAML config below shows the structure and default config values of Gale's global config (`config/gale-global.yml`)

Click arrow button behind the config node to show description of it

<ConfigGroup :data />