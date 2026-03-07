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

# Gale Dünya Varsayılan Konfiqurasiya

Aşağıdakı YAML konfiqurasiyası, Gale-in dünya varsayılan konfiqurasiya faylının (`config/gale-world-defaults.yml`) quruluşunu və varsayılan konfiqurasiya dəyərlərini göstərir.

Konfiqurasiya qovşağının arxasındakı ox düyməsinə vuraraq əlaqəli izahatı görə bilərsiniz.

<ConfigGroup :data />
