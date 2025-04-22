---
aside: false
---

<script setup>
import { useData, useRouter } from 'vitepress';
import DownloadPage from '../../.vitepress/theme/components/download/DownloadPage.vue';

const { lang } = useData();
const router = useRouter();

// Ensure we're on the correct language path for download page
if (lang.value && lang.value !== 'zh' && window.location.pathname.includes('/zh/download')) {
  // If language is not Chinese but we're on Chinese download page, redirect to correct language
  router.go(`/${lang.value}/download`);
}
</script>

<ClientOnly>
  <DownloadPage />
</ClientOnly>
