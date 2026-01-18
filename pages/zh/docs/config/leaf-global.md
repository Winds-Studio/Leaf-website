<script setup>
import leafGlobalConfig_latest from './data/leaf-global-latest';
import leafGlobalConfig_1_21_4 from './data/leaf-global-1-21-4';
import leafGlobalConfig_1_21_1 from './data/leaf-global-1-21-1';
import ConfigGroup from '../../../../.vitepress/theme/components/config/ConfigGroup.vue'
const data = {
    '1.21.11': leafGlobalConfig_latest,
    '1.21.4': leafGlobalConfig_1_21_4,
    '1.21.1': leafGlobalConfig_1_21_1
}
</script>

# Leaf 全局配置

以下 YAML 配置展示了 Leaf 全局配置 (`config/leaf-global.yml`) 的结构及其默认的值

点击配置项后面的箭头按钮以显示其描述

使用 `/leaf reload` 重载 Leaf 配置。但是目前 **不支持** 重载异步部分的配置。

<ConfigGroup :data />
