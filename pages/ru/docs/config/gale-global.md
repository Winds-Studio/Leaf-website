<script setup>
import galeGlobalConfig_1_21_4 from './data/gale-global-1-21-4';
import galeGlobalConfig_1_21_1 from './data/gale-global-1-21-1';
import ConfigGroup from '../../../.vitepress/theme/components/config/ConfigGroup.vue'
const data = {
    '1.21.4': galeGlobalConfig_1_21_4,
    '1.21.1': galeGlobalConfig_1_21_1
}
</script>

# Глобальная конфигурация Gale
Ниже представлена YAML-конфигурация, отображающая структуру и значения по умолчанию глобального конфига Gale (`config/gale-global.yml`)

Нажмите на кнопку со стрелкой рядом с параметром конфигурации, чтобы увидеть его описание.

<ConfigGroup :data />