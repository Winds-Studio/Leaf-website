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

# Gale 默认世界配置

以下 YAML 配置展示了 Gale 默认世界配置 (`config/gale-world-defaults.yml`) 的结构及其默认的值

点击配置项后面的箭头按钮以显示其描述

<ConfigGroup :data />
