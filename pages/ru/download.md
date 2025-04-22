---
aside: false
---

<script setup>
import { useData, useRouter } from 'vitepress';
import DownloadPage from '../../.vitepress/theme/components/download/DownloadPage.vue';

const { lang } = useData();
const router = useRouter();

// Ensure we're on the correct language path for download page
if (lang.value && lang.value !== 'ru' && window.location.pathname.includes('/ru/download')) {
  // If language is not Russian but we're on Russian download page, redirect to correct language
  router.go(`/${lang.value}/download`);
}
</script>


<ClientOnly>
    <DownloadPage/>
</ClientOnly>
