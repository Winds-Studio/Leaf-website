<script setup>
// Same with en
import leafGlobalConfig_1_21_4 from '../../../docs/config/data/leaf-global-1-21-4';
import leafGlobalConfig_1_21_1 from '../../../docs/config/data/leaf-global-1-21-1';
import ConfigGroup from '../../../../.vitepress/theme/components/config/ConfigGroup.vue'
const data = {
    '1.21.4': leafGlobalConfig_1_21_4,
    '1.21.1': leafGlobalConfig_1_21_1
}
</script>

# Leaf Ümumi Konfiqurasiya

Aşağıdakı YAML konfiqurasiyası, Leaf-in ümumi konfiqurasiya faylının (`config/leaf-global.yml`) quruluşunu və varsayılan konfiqurasiya dəyərlərini göstərir.

Konfiqurasiya qovşağının arxasındakı ox düyməsinə vuraraq əlaqəli izahatı görə bilərsiniz.

`/leaf reload` əmri istifadə edərək isti yenidən yükləmə edə bilərsiniz. Asinxron modullar üçün isti yenidən yükləmə **dəstəklənmir**.

<ConfigGroup :data />
