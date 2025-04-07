<script setup>
import leafGlobalConfig_1_21_4 from './data/leaf-global-1-21-4';
import leafGlobalConfig_1_21_1 from './data/leaf-global-1-21-1';
import ConfigGroup from '../../../.vitepress/theme/components/config/ConfigGroup.vue'
const data = {
    '1.21.4': leafGlobalConfig_1_21_4,
    '1.21.1': leafGlobalConfig_1_21_1
}
</script>

# Leaf global config

Located at `config/leaf-global.yml`. 

You can hot reload it using `/leaf reload`.
Hot reload for async modules is **not supported**.

<ConfigGroup :data />