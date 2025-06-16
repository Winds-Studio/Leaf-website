---
aside: false
---

<script setup>
import { useData, useRouter } from 'vitepress';
import OldDownloadPage from '../.vitepress/theme/components/download/old/OldDownloadPage.vue';

const { lang } = useData();
const router = useRouter();

// Redirect to localized download page if on a different language path
if (lang.value !== 'en' && window.location.pathname === '/download-old' && !window.location.pathname.includes(`/${lang.value}/download-old`)) {
  // Only redirect if we're on the root download page and should be on a localized page
  router.go(`/${lang.value}/download-old`);
}
</script>

<ClientOnly>
    <OldDownloadPage/>
</ClientOnly>
