<script setup>
import galeWorldDefaultsConfig from './data/gale-world-defaults';
import ConfigGroup from '../../../.vitepress/theme/components/config/ConfigGroup.vue'
const data = {
    '1.21.1': galeWorldDefaultsConfig
}
</script>

# Gale world default config
The YAML config below shows the structure and default config values of Gale's world defaults config (`config/gale-world-defaults.yml`)

Click arrow button behind the config node to show description of it

<ConfigGroup :data />