<script setup>
// Same with en
import galeWorldDefaultsConfig_1_21_4 from '../../../docs/config/data/gale-world-defaults-1-21-4';
import galeWorldDefaultsConfig_1_21_1 from '../../../docs/config/data/gale-world-defaults-1-21-1';
import ConfigGroup from '../../../../.vitepress/theme/components/config/ConfigGroup.vue'
const data = {
    '1.21.4': galeWorldDefaultsConfig_1_21_4,
    '1.21.1': galeWorldDefaultsConfig_1_21_1
}
</script>

# Gale Dünya Varsayılan Yapılandırma

Aşağıdaki YAML yapılandırması, Gale'in dünya varsayılan yapılandırma dosyasının (`config/gale-world-defaults.yml`) yapısını ve varsayılan yapılandırma değerlerini gösterir.

Yapılandırma düğümünün arkasındaki ok düğmesine tıklayarak ilgili açıklamayı görebilirsiniz.

<ConfigGroup :data />
