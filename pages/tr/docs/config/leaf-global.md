<script setup>
import leafGlobalConfig_1_21_4 from './data/leaf-global-1-21-4';
import leafGlobalConfig_1_21_1 from './data/leaf-global-1-21-1';
import ConfigGroup from '../../../../.vitepress/theme/components/config/ConfigGroup.vue'
const data = {
    '1.21.4': leafGlobalConfig_1_21_4,
    '1.21.1': leafGlobalConfig_1_21_1
}
</script>

# Leaf Genel Yapılandırma
Aşağıdaki YAML yapılandırması, Leaf'in genel yapılandırma dosyasının (`config/leaf-global.yml`) yapısını ve varsayılan yapılandırma değerlerini gösterir.

Yapılandırma düğümünün arkasındaki ok düğmesine tıklayarak ilgili açıklamayı görebilirsiniz.

`/leaf reload` komutunu kullanarak sıcak yeniden yükleme yapabilirsiniz. Asenkron modüller için sıcak yeniden yükleme **desteklenmez**.

<ConfigGroup :data />