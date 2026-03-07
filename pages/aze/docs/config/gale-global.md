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

# Gale Ümumi Konfiqurasiya

Aşağıdakı YAML konfiqurasiyası, Gale-in ümumi konfiqurasiya faylının (`config/gale-global.yml`) quruluşunu və varsayılan konfiqurasiya dəyərlərini göstərir.

Konfiqurasiya qovşağının arxasındakı ox düyməsinə vuraraq əlaqəli izahatı görə bilərsiniz.

<ConfigGroup :data />
