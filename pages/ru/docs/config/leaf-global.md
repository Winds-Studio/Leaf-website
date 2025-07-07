<script setup>
import leafGlobalConfig_1_21_4 from './data/leaf-global-1-21-4';
import leafGlobalConfig_1_21_1 from './data/leaf-global-1-21-1';
import ConfigGroup from '../../../.vitepress/theme/components/config/ConfigGroup.vue'
const data = {
    '1.21.4': leafGlobalConfig_1_21_4,
    '1.21.1': leafGlobalConfig_1_21_1
}
</script>

# Глобальная конфигурация Leaf
Ниже представлен YAML-файл с параметрами по умолчанию для глобальной конфигурации Leaf (`config/leaf-global.yml`)

Чтобы увидеть описание конкретного параметра, нажмите на кнопку со стрелкой рядом с ним.

Вы можете быстро перезагрузить конфигурацию командой `/leaf reload`. Асинхронные модули **не поддерживают** быструю перезагрузку.

<ConfigGroup :data />
