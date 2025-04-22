---
aside: false
---

<script setup>
import { useData, useRouter } from 'vitepress';
import DownloadPage from '../../.vitepress/theme/components/download/DownloadPage.vue';

const { lang } = useData();
const router = useRouter();

// Ensure we're on the correct language path for download page
if (lang.value && lang.value !== 'pt' && window.location.pathname.includes('/pt/download')) {
  // If language is not Portuguese but we're on Portuguese download page, redirect to correct language
  router.go(`/${lang.value}/download`);
}
</script>


<ClientOnly>
    <DownloadPage/>
</ClientOnly>