<script setup>
import galeWorldDefaultsConfig_1_21_4 from './data/gale-world-defaults-1-21-4';
import galeWorldDefaultsConfig_1_21_1 from './data/gale-world-defaults-1-21-1';
import ConfigGroup from '../../../.vitepress/theme/components/config/ConfigGroup.vue'
const data = {
    '1.21.4': galeWorldDefaultsConfig_1_21_4,
    '1.21.1': galeWorldDefaultsConfig_1_21_1
}
</script>

# Конфигурация мира Gale по умолчанию
Ниже представлена YAML-конфигурация, отображающая структуру и параметры по умолчанию для настроек мира Gale (`config/gale-world-defaults.yml`)

Нажмите на кнопку со стрелкой рядом с параметром конфигурации, чтобы увидеть его описание.

<ConfigGroup :data />