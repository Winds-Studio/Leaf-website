---
aside: false
---

<script setup>
import { useData, useRouter } from 'vitepress';
import DownloadPage from '../../.vitepress/theme/components/download/DownloadPage.vue';

const { lang } = useData();
const router = useRouter();

// Fərqli bir dil yolundadırsa yönləndirmə et
if (lang.value !== 'aze' && window.location.pathname === '/download' && !window.location.pathname.includes(`/${lang.value}/download`)) {
  router.go(`/${lang.value}/download`);
}
</script>

<ClientOnly>
    <DownloadPage/>
</ClientOnly>
