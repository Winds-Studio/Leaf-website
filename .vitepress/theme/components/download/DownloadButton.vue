<script setup lang="ts">
/* 
  ** DEPRECATED ** 
  This component has been superseded by the integrated DownloadPage component
  with multilingual support. This file is kept for reference only.
*/
import {computed, onMounted, ref, watch} from "vue";
import {Icon} from "@iconify/vue";

interface FileInfo {
  name: string | null;
  url: string | null;
}

const fileInfo = ref<FileInfo>({name: null, url: null});
const props = defineProps<{
  branch: string
}>()
const loaded = ref(false);
const hasError = ref(false);
const errorMessage = ref('');

const branch = computed(() => props.branch);

const fetchData = () => {
  loaded.value = false;
  hasError.value = false;
  fileInfo.value = {name: null, url: null};
  
  fetch(`https://api.github.com/repos/Winds-Studio/Leaf/releases/tags/ver-${branch.value}`)
    .then(resp => {
      if (!resp.ok) {
        throw new Error(`API request failed with status ${resp.status}`);
      }
      return resp.json();
    })
    .then(data => {
      if (data.assets?.[0]) {
        fileInfo.value.name = data.assets[0].name;
        fileInfo.value.url = data.assets[0].browser_download_url;
      } else {
        throw new Error('No download assets found');
      }
    })
    .catch(error => {
      console.error("Error fetching download:", error);
      hasError.value = true;
      errorMessage.value = "Could not find download for this version";
    })
    .finally(() => { 
      loaded.value = true;
    });
}

watch(branch, fetchData);
onMounted(fetchData);
</script>

<template>
  <div class="download-section">
    <!-- 加载状态 -->
    <div v-if="!loaded" class="download-loading">
      <div class="spinner"></div>
      <span>Finding download assets...</span>
    </div>
    
    <!-- 错误状态 -->
    <div v-else-if="hasError" class="download-error">
      <Icon icon="lucide:file-x" width="1.8rem" height="1.8rem" />
      <span>{{ errorMessage }}</span>
      <div class="error-actions">
        <button class="retry-button" @click="fetchData">
          <Icon icon="lucide:refresh-cw" width="1rem" height="1rem" />
          Retry
        </button>
        <a :href="`https://github.com/Winds-Studio/Leaf/releases/tag/ver-${branch}`" target="_blank" class="view-github">
          <Icon icon="lucide:github" width="1rem" height="1rem" />
          View on GitHub
        </a>
      </div>
    </div>
    
    <!-- 下载按钮 -->
    <div class="download-button-container" v-else-if="fileInfo.name && fileInfo.url">
      <a :href="fileInfo.url" class="download-link">
        <button class="download-button">
          <div class="button-content">
            <Icon icon="lucide:file-down" width="1.8rem" height="1.8rem" />
            <span class="texts">
              <span class="title">Download</span>
              <span class="filename">{{ fileInfo.name }}</span>
            </span>
          </div>
          <div class="button-shine"></div>
        </button>
      </a>
      
      <a :href="`https://github.com/Winds-Studio/Leaf/releases/tag/ver-${branch}`" target="_blank" class="github-link">
        <Icon icon="lucide:github" width="0.9rem" height="0.9rem" />
        View release on GitHub
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.download-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 2.5rem 0;
  min-height: 120px;
}

.download-loading, .download-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 1.2rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  
  span {
    color: var(--vp-c-text-2);
    font-size: 1.05rem;
  }
}

.download-error {
  svg {
    color: var(--vp-c-danger-1);
  }
}

.error-actions {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
}

.retry-button, .view-github {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
}

.retry-button {
  background-color: var(--vp-c-brand-1);
  color: white;
  
  &:hover {
    background-color: var(--vp-c-brand-2);
  }
}

.view-github {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  text-decoration: none;
  
  &:hover {
    background-color: var(--vp-c-bg-mute);
  }
}

.spinner {
  width: 2rem;
  height: 2rem;
  border: 2px solid rgba(var(--vp-c-brand-rgb), 0.2);
  border-top-color: var(--vp-c-brand-1);
  border-radius: 50%;
  animation: spin 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

.download-button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  
  .download-link {
    text-decoration: none;
    width: 100%;
    max-width: 560px;
  }
  
  .github-link {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    margin-top: 1rem;
    font-size: 0.9rem;
    color: var(--vp-c-text-2);
    text-decoration: none;
    transition: all 0.2s ease;
    
    &:hover {
      color: var(--vp-c-brand-1);
      transform: translateY(-1px);
    }
  }
}

.download-button {
  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 5px 20px rgba(var(--vp-c-brand-rgb), 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(var(--vp-c-brand-rgb), 0.4);
    
    .button-shine {
      transform: skewX(-20deg) translateX(170%);
    }
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(var(--vp-c-brand-rgb), 0.3);
  }
  
  .button-content {
    display: flex;
    align-items: center;
    gap: 1rem;
    z-index: 1;
  }
  
  .button-shine {
    position: absolute;
    top: 0;
    left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-20deg) translateX(-110%);
    transition: transform 0.8s ease;
  }
  
  .texts {
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 0.2rem;
    
    .title {
      font-size: 1.2rem;
      font-weight: 600;
    }
    
    .filename {
      font-size: 0.95rem;
      font-weight: 500;
      opacity: 0.9;
    }
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 600px) {
  .download-button {
    padding: 0.9rem 1rem;
    
    .texts {
      .title {
        font-size: 1.1rem;
      }
      
      .filename {
        font-size: 0.85rem;
      }
    }
  }
}
</style>