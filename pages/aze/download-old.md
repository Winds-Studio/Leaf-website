---
aside: false
---

<script setup>
import { useData, useRouter } from 'vitepress';
import OldDownloadPage from '../../.vitepress/theme/components/download/old/OldDownloadPage.vue';

const { lang } = useData();
const router = useRouter();

// Fərqli bir dil yolundadırsa yönləndirmə et
if (lang.value !== 'aze' && window.location.pathname === '/download-old' && !window.location.pathname.includes(`/${lang.value}/download-old`)) {
  router.go(`/${lang.value}/download-old`);
}
</script>

<ClientOnly>
    <OldDownloadPage/>
</ClientOnly>
