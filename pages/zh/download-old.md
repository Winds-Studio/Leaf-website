---
aside: false
---

<script setup>
import { useData, useRouter } from 'vitepress';
import OldDownloadPage from '../../.vitepress/theme/components/download/old/OldDownloadPage.vue';

const { lang } = useData();
const router = useRouter();

// Ensure we're on the correct language path for download page
if (lang.value && lang.value !== 'zh' && window.location.pathname.includes('/zh/download-old')) {
  // If language is not Chinese but we're on Chinese download page, redirect to correct language
  router.go(`/${lang.value}/download-old`);
}
</script>

<ClientOnly>
  <OldDownloadPage />
</ClientOnly>
