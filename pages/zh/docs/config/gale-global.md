<script setup>
import galeGlobalConfig_1_21_4 from './data/gale-global-1-21-4';
import galeGlobalConfig_1_21_1 from './data/gale-global-1-21-1';
import ConfigGroup from '../../../../.vitepress/theme/components/config/ConfigGroup.vue'
const data = {
    '1.21.4': galeGlobalConfig_1_21_4,
    '1.21.1': galeGlobalConfig_1_21_1
}
</script>

# Gale 全局配置
以下 YAML 配置展示了 Gale 全局配置 (`config/gale-global.yml`) 的结构及其默认的值

点击配置项后面的箭头按钮以显示其描述

<ConfigGroup :data />
