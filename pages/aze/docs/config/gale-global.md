<script setup>
// Same with en
import galeGlobalConfig_1_21_4 from '../../../docs/config/data/gale-global-1-21-4';
import galeGlobalConfig_1_21_1 from '../../../docs/config/data/gale-global-1-21-1';
import ConfigGroup from '../../../../.vitepress/theme/components/config/ConfigGroup.vue'
const data = {
    '1.21.4': galeGlobalConfig_1_21_4,
    '1.21.1': galeGlobalConfig_1_21_1
}
</script>

# Gale Genel Yapılandırma

Aşağıdaki YAML yapılandırması, Gale'in genel yapılandırma dosyasının (`config/gale-global.yml`) yapısını ve varsayılan yapılandırma değerlerini gösterir.

Yapılandırma düğümünün arkasındaki ok düğmesine tıklayarak ilgili açıklamayı görebilirsiniz.

<ConfigGroup :data />
