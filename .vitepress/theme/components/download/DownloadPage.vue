<script setup lang="ts">
import { ref, onMounted, computed, watch, onUnmounted } from "vue";
import { Icon } from "@iconify/vue";
import { useTranslation } from "./useTranslation";
import { marked } from 'marked'
import { useData } from "vitepress";

interface Branch {
  name: string;
}

interface ReleaseAsset {
  name: string;
  browser_download_url: string;
  size: number;
  created_at: string;
  download_count: number;
}

interface Release {
  assets: ReleaseAsset[];
  published_at: string;
  name: string;
  body: string;
  tag_name: string;
}

interface WorkflowRun {
  id: string;
  created_at?: string;
  head_branch?: string;
  html_url?: string;
  head_commit?: {
    message: string;
    id: string;
  }
}

// Get VitePress data
const { isDark } = useData();

// States
const versions = ref<string[]>([]);
const selectedVersion = ref<string | undefined>(undefined);
const isLoadingVersions = ref(true);
const versionError = ref(false);

// Download states
const downloadAsset = ref<ReleaseAsset | null>(null);
const releaseData = ref<Release | null>(null);
const isLoadingDownload = ref(false);
const downloadError = ref(false);

// Build history states
const buildRuns = ref<WorkflowRun[]>([]);
const isLoadingBuilds = ref(false);
const expandedCommit = ref<string | null>(null);

// Active tab
const activeTab = ref<'download' | 'history'>('download');

// Version status mapping
const versionStatus = {
  "experimental": ["1.21.5"],
  "eol": ["1.21.1", "1.20.4"],
  "dead": [
    "1.21.3", "1.20.6", "1.21", "1.20.2", "1.20.1", "1.20",
    "1.19.4", "1.19.3", "1.19.2", "1.19.1", "1.19",
    "1.18.2"
  ]
};

// Get localization content
const { t } = useTranslation();

// Check version status
const getVersionStatus = (version: string) => {
  if (versionStatus.experimental && versionStatus.experimental.includes(version)) return 'experimental';
  if (versionStatus.dead.includes(version)) return 'dead';
  if (versionStatus.eol.includes(version)) return 'eol';
  return 'stable';
};

// Get version status CSS class
const getVersionStatusClass = (version: string) => {
  const status = getVersionStatus(version);
  if (status === 'experimental') return 'status-info';
  if (status === 'dead') return 'status-danger';
  if (status === 'eol') return 'status-warning';
  return 'status-success';
};

// Format file size
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

// Load versions
function loadVersions() {
  isLoadingVersions.value = true;
  versionError.value = false;
  
  fetch('https://api.github.com/repos/Winds-Studio/Leaf/branches')
    .then(resp => {
      if (!resp.ok) throw new Error(`GitHub API request failed with status ${resp.status}`);
      return resp.json();
    })
    .then((branches: Branch[]) => {
      const filtered = branches
        .filter(branch => branch.name.startsWith("ver/"))
        .map(branch => branch.name.slice(4));
      
      // Ensure 1.21.5 is in the list (pre-release)
      if (!filtered.includes("1.21.5")) {
        filtered.push("1.21.5");
      }
      
      versions.value = filtered.reverse();
      if (versions.value.length > 0) {
        selectedVersion.value = versions.value[0];
        // 自动加载选中版本的下载信息
        loadDownload(selectedVersion.value);
        loadBuildHistory(selectedVersion.value);
      }
    })
    .catch(error => {
      console.error("Error loading versions:", error);
      versionError.value = true;
    })
    .finally(() => {
      isLoadingVersions.value = false;
    });
}

// Load download assets
function loadDownload(version: string) {
  if (!version) return;
  
  isLoadingDownload.value = true;
  downloadError.value = false;
  downloadAsset.value = null;
  releaseData.value = null;
  
  // Special handling for 1.21.5 pre-release
  const apiUrl = version === "1.21.5" 
    ? `https://api.github.com/repos/Winds-Studio/Leaf/releases?per_page=5` 
    : `https://api.github.com/repos/Winds-Studio/Leaf/releases/tags/ver-${version}`;
  
  fetch(apiUrl)
    .then(resp => {
      if (!resp.ok) throw new Error(`API request failed with status ${resp.status}`);
      return resp.json();
    })
    .then((data) => {
      // Handle pre-release for 1.21.5
      if (version === "1.21.5" && Array.isArray(data)) {
        // Find pre-release for 1.21.5
        const release = data.find(r => r.tag_name.includes("1.21.5") || r.name.includes("1.21.5"));
        if (!release) throw new Error('No pre-release found for 1.21.5');
      releaseData.value = release;
      if (release.assets && release.assets.length > 0) {
        downloadAsset.value = release.assets[0];
        } else {
          throw new Error('No download assets found for 1.21.5 pre-release');
        }
      } else {
        // Handle regular releases
        releaseData.value = data;
        if (data.assets && data.assets.length > 0) {
          downloadAsset.value = data.assets[0];
      } else {
        throw new Error('No download assets found');
        }
      }
    })
    .catch(error => {
      console.error("Error loading download:", error);
      downloadError.value = true;
    })
    .finally(() => {
      isLoadingDownload.value = false;
    });
}

// Load build history
function loadBuildHistory(version: string) {
  if (!version) return;
  
  isLoadingBuilds.value = true;
  buildRuns.value = [];
  
  // For 1.21.5 pre-release, adjust the branch name
  const branchName = version === "1.21.5" ? "ver-1.21.5" : `ver/${version}`;
  
  fetch(`https://api.github.com/repos/Winds-Studio/Leaf/actions/runs?event=push&branch=${branchName}`)
    .then(resp => resp.json())
    .then(data => {
      if (data.workflow_runs) {
        buildRuns.value = data.workflow_runs.filter((item: any) => item.event === 'push');
      }
    })
    .catch(error => {
      console.error("Error loading build history:", error);
    })
    .finally(() => {
      isLoadingBuilds.value = false;
    });
}

// Format commit message
function formatCommitMessage(message: string | undefined, expanded: boolean) {
  if (!message) return '';
  if (expanded) return message;
  
  const firstLine = message.split('\n')[0];
  return message.includes('\n') ? `${firstLine}\n...` : firstLine;
}

// Handle version selection
function onVersionSelect(version: string) {
  selectedVersion.value = version;
  loadDownload(version);
  loadBuildHistory(version);
}

// Toggle expanded commit message
function toggleCommitExpand(commitId: string) {
  expandedCommit.value = expandedCommit.value === commitId ? null : commitId;
}

// Get version tag icon
function getVersionTagIcon(status: string) {
  switch(status) {
    case 'experimental': return 'lucide:beaker';
    case 'dead': return 'lucide:alert-triangle';
    case 'eol': return 'lucide:alert-circle';
    default: return 'lucide:check-circle';
  }
}

// Get version tag message
function getVersionTagMessage(status: string) {
  const tFunc = t.value; // Get the actual translation function
  
  switch(status) {
    case 'experimental':
      return tFunc('versionStatus.experimental');
    case 'dead':
      return tFunc('versionStatus.unsupported');
    case 'eol':
      return tFunc('versionStatus.endOfLife');
    case 'stable':
      // Provide stable version message for different languages
      const langMap = {
        'en': 'This version of Leaf is <b>actively maintained</b> and receives regular updates and bug fixes.',
        'zh': '此版本的 Leaf <b>正在积极维护中</b>，会定期接收更新和错误修复。',
        'de': 'Diese Version von Leaf wird <b>aktiv gewartet</b> und erhält regelmäßige Updates und Fehlerbehebungen.',
        'ru': 'Эта версия Leaf <b>активно поддерживается</b> и регулярно получает обновления и исправления ошибок.',
        'pt': 'Esta versão do Leaf é <b>mantida ativamente</b> e recebe atualizações e correções de bugs regularmente.'
      };
      
      // Get current language
      const currentLang = useData().lang.value as keyof typeof langMap;
      return langMap[currentLang] || langMap['en']; // Fallback to English
    default:
      return getVersionTagMessage('stable'); // Default to stable version
  }
}

// Parse release notes from Markdown
function parseReleaseNotes(notes) {
  if (!notes) return '';

  return marked(notes)
}

// Initial loading
onMounted(() => {
  loadVersions();
});

// Computed property: Get selected version status
const selectedVersionStatus = computed(() => {
  if (!selectedVersion.value) return null;
  return getVersionStatus(selectedVersion.value);
});

// States for custom dropdown
const dropdownOpen = ref(false);
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};
const closeDropdown = () => {
  dropdownOpen.value = false;
};

// Click outside handler
const dropdownRef = ref<HTMLElement | null>(null);

function setupClickOutside() {
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node) && dropdownOpen.value) {
      closeDropdown();
    }
  };

  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
  });
}

setupClickOutside();

// 添加手动刷新方法
function refreshAll() {
  if (selectedVersion.value) {
    loadDownload(selectedVersion.value);
    loadBuildHistory(selectedVersion.value);
  }
}
</script>

<template>
  <div class="dl-page">
    <!-- Loading state -->
    <div v-if="isLoadingVersions" class="dl-loading">
      <div class="dl-spinner"></div>
      <p v-html="t('loading.versions')"></p>
    </div>
    
    <!-- Error state -->
    <div v-else-if="versionError" class="dl-error">
      <Icon icon="lucide:alert-circle" />
      <h3>{{ t('error.versions') }}</h3>
      <button class="dl-button primary" @click="loadVersions">
        <Icon icon="lucide:refresh-cw" />
        <span>{{ t('actions.retry') }}</span>
      </button>
    </div>
    
    <!-- No version state -->
    <div v-else-if="versions.length === 0" class="dl-empty">
      <Icon icon="lucide:package" />
      <h3>{{ t('labels.noVersions') }}</h3>
      <button class="dl-button primary" @click="loadVersions">
        <Icon icon="lucide:refresh-cw" />
        <span>{{ t('actions.refresh') }}</span>
      </button>
    </div>
    
    <!-- Main content -->
    <div v-else class="dl-content">
      <!-- Header -->
      <div class="dl-header">
        <div class="dl-header-content">
          <h1>Leaf</h1>
          <p class="dl-subtitle">{{ t('labels.description') }}</p>
        </div>
      </div>
      
      <!-- Version selector -->
      <div class="dl-version-selector">
        <div class="dl-selector-label">
          {{ t('labels.version') }}
          <button class="dl-refresh-btn" @click="refreshAll" title="刷新数据">
            <Icon icon="lucide:refresh-cw" />
          </button>
        </div>
        <div ref="dropdownRef" class="dl-version-dropdown">
          <div 
            class="dl-custom-select" 
            @click="toggleDropdown"
            :class="selectedVersion ? getVersionStatusClass(selectedVersion) : ''"
          >
            <div class="dl-selected-version">
              <span :class="['dl-version-status-indicator', getVersionStatusClass(selectedVersion || '')]"></span>
              <span>{{ selectedVersion }}</span>
            </div>
            <div class="dl-select-icon">
              <Icon icon="lucide:chevron-down" :class="{ 'rotate': dropdownOpen }" />
            </div>
          </div>
          <div class="dl-dropdown-options" v-show="dropdownOpen">
            <div 
              v-for="version in versions" 
              :key="version" 
              :class="['dl-dropdown-option', { 'selected': selectedVersion === version }, getVersionStatusClass(version)]"
              @click="onVersionSelect(version); closeDropdown();"
            >
              <span class="dl-version-status-indicator"></span>
              <span>{{ version }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Version warning -->
      <div v-if="selectedVersionStatus" class="dl-version-tag" :class="selectedVersionStatus">
        <Icon :icon="getVersionTagIcon(selectedVersionStatus)" />
        <span v-html="getVersionTagMessage(selectedVersionStatus)"></span>
      </div>
      
      <!-- Tab switcher -->
      <div class="dl-tabs">
        <button 
          class="dl-tab" 
          :class="{ 'active': activeTab === 'download' }"
          @click="activeTab = 'download'"
        >
          <Icon icon="lucide:download" />
          <span>{{ t('tabs.download') }}</span>
        </button>
        <button 
          class="dl-tab" 
          :class="{ 'active': activeTab === 'history' }"
          @click="activeTab = 'history'"
        >
          <Icon icon="lucide:history" />
          <span>{{ t('tabs.history') }}</span>
        </button>
      </div>
      
      <!-- Download tab content -->
      <div v-if="activeTab === 'download'" class="dl-tab-content">
        <!-- Download loading -->
        <div v-if="isLoadingDownload" class="dl-loading-small">
          <div class="dl-spinner"></div>
          <p>{{ t('loading.download') }}</p>
        </div>
        
        <!-- Download error -->
        <div v-else-if="downloadError" class="dl-error-small">
          <Icon icon="lucide:x-circle" />
          <h3>{{ t('error.download') }}</h3>
          <div class="dl-actions">
            <button class="dl-button primary" @click="loadDownload(selectedVersion as string)">
              <Icon icon="lucide:refresh-cw" />
              <span>{{ t('actions.retry') }}</span>
            </button>
            <a 
              :href="`https://github.com/Winds-Studio/Leaf/releases/tag/ver-${selectedVersion}`" 
              target="_blank" 
              class="dl-button secondary"
            >
              <Icon icon="lucide:github" />
              <span>{{ t('actions.viewOnGitHub') }}</span>
            </a>
          </div>
        </div>
        
        <!-- Download content -->
        <div v-else-if="downloadAsset && releaseData" class="dl-release-wrapper">
          <!-- Download card -->
          <div class="dl-card dl-download-card">
            <div class="dl-card-content">
              <div class="dl-release-info">
                <h2 class="dl-release-title">
                  {{ releaseData.name || `Leaf ${selectedVersion}` }}
                </h2>
                <div class="dl-release-meta">
                  <div class="dl-meta-item">
                    <Icon icon="lucide:calendar" />
                    <span>{{ formatDate(releaseData.published_at || '') }}</span>
                  </div>
                  <div class="dl-meta-item">
                    <Icon icon="lucide:file" />
                    <span>{{ formatFileSize(downloadAsset.size || 0) }}</span>
                  </div>
                  <div class="dl-meta-item">
                    <Icon icon="lucide:download" />
                    <span>{{ downloadAsset.download_count || 0 }}</span>
                  </div>
                </div>
              </div>
              
              <div class="dl-download-actions">
                <a :href="downloadAsset.browser_download_url" class="dl-button primary download">
                  <Icon icon="lucide:download" />
                  <span>{{ t('actions.download') }}</span>
                </a>
                <a 
                  :href="`https://github.com/Winds-Studio/Leaf/releases/tag/ver-${selectedVersion}`" 
                  target="_blank"
                  class="dl-button secondary"
                >
                  <Icon icon="lucide:github" />
                  <span>{{ t('actions.viewRelease') }}</span>
                </a>
              </div>
              
              <div class="dl-file-detail">
                <div class="dl-file-name">{{ downloadAsset.name }}</div>
              </div>
            </div>
          </div>
          
          <!-- Release notes -->
          <div v-if="releaseData.body" class="dl-card dl-release-notes">
            <div class="dl-card-header">
              <Icon icon="lucide:file-text" />
              <h3>{{ t('labels.releaseNotes') }}</h3>
            </div>
            <div class="dl-card-content">
              <div class="dl-markdown release-notes" v-html="parseReleaseNotes(releaseData.body)"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- History tab content -->
      <div v-if="activeTab === 'history'" class="dl-tab-content">
        <!-- Build history loading -->
        <div v-if="isLoadingBuilds" class="dl-loading-small">
          <div class="dl-spinner"></div>
          <p>{{ t('loading.builds') }}</p>
        </div>
        
        <!-- No build history -->
        <div v-else-if="buildRuns.length === 0" class="dl-empty-small">
          <Icon icon="lucide:info" />
          <h3>{{ t('error.builds') }}</h3>
          <a 
            :href="`https://github.com/Winds-Studio/Leaf/tree/ver/${selectedVersion}`" 
            target="_blank"
            class="dl-link"
          >
            <Icon icon="lucide:github" />
            <span>{{ t('actions.viewBranch') }}</span>
          </a>
        </div>
        
        <!-- Build history list -->
        <div v-else class="dl-build-list">
          <div v-for="run in buildRuns" :key="run.id" class="dl-card dl-build-item">
            <div class="dl-card-content">
              <div class="dl-build-header">
                <div class="dl-build-meta">
                  <div class="dl-meta-item">
                    <Icon icon="lucide:calendar" />
                    <span>{{ run.created_at ? formatDate(run.created_at) : t('labels.unknown') }}</span>
                  </div>
                  
                  <div class="dl-meta-item">
                    <Icon icon="lucide:git-commit" />
                    <a 
                      v-if="run.head_commit" 
                      :href="`https://github.com/Winds-Studio/Leaf/commit/${run.head_commit.id}`" 
                      target="_blank"
                      class="dl-link"
                    >
                      {{ run.head_commit.id.slice(0, 7) }}
                    </a>
                    <span v-else>{{ t('labels.unknown') }}</span>
                  </div>
                  
                  <div class="dl-meta-item">
                    <Icon icon="lucide:github" />
                    <a :href="run.html_url" target="_blank" class="dl-link">{{ t('labels.action') }}</a>
                  </div>
                </div>
              </div>
              
              <div v-if="run.head_commit?.message" class="dl-commit-message">
                <div class="dl-commit-content" :class="{ 'expanded': expandedCommit === run.id }">
                  {{ formatCommitMessage(run.head_commit.message, expandedCommit === run.id) }}
                </div>
                
                <button 
                  v-if="run.head_commit.message.includes('\n')" 
                  @click="toggleCommitExpand(run.id)" 
                  class="dl-expand-btn"
                >
                  <Icon :icon="`lucide:chevron-${expandedCommit === run.id ? 'up' : 'down'}`" />
                  <span>{{ t(`actions.${expandedCommit === run.id ? 'showLess' : 'showMore'}`) }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* Basic settings */
.dl-page {
  max-width: 960px;
  margin: 0 auto;
  font-family: var(--vp-font-family-base);
}

/* ===== Animation effects ===== */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0% { transform: scale(1); }
  100% { transform: scale(1); }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ===== Loading states ===== */
.dl-loading, .dl-error, .dl-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 3rem 2rem;
  text-align: center;
  border-radius: 4px;
  background-color: var(--vp-c-bg-alt);
  margin: 2rem 0;
  animation: fadeIn 0.4s ease;
}

.dl-loading-small, .dl-error-small, .dl-empty-small {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  text-align: center;
  border-radius: 4px;
  background-color: var(--vp-c-bg-alt);
  animation: fadeIn 0.3s ease;
}

.dl-spinner {
  width: 2.5rem;
  height: 2.5rem;
  border: 2px solid rgba(var(--vp-c-brand-rgb), 0.1);
  border-radius: 50%;
  border-top-color: var(--vp-c-brand);
  animation: spin 0.8s linear infinite;
}

.dl-error svg, .dl-error-small svg {
  color: var(--vp-c-danger);
  width: 2.5rem;
  height: 2.5rem;
}

.dl-empty svg, .dl-empty-small svg {
  color: var(--vp-c-text-3);
  width: 2.5rem;
  height: 2.5rem;
}

.dl-error h3, .dl-empty h3, .dl-error-small h3, .dl-empty-small h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

/* ===== Main content area ===== */
.dl-content {
  animation: fadeIn 0.5s ease;
}

/* ===== Title bar ===== */
.dl-header {
  margin-bottom: 2.5rem;
  padding: 2.5rem 0;
  background: transparent;
  color: var(--vp-c-text-1);
  text-align: center;
  position: relative;
  border-bottom: 1px solid var(--vp-c-divider);
}

.dl-header-content {
  position: relative;
  max-width: 85%;
  margin: 0 auto;
}

.dl-header h1 {
  margin: 0 0 0.75rem;
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.dl-subtitle {
  font-size: 1rem;
  margin: 0;
  opacity: 0.75;
  font-weight: 400;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.5;
}

/* ===== Version selector ===== */
.dl-version-selector {
  margin-bottom: 1.5rem;
  width: 100%;
}

.dl-selector-label {
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dl-refresh-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  color: var(--vp-c-text-2);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dl-refresh-btn:hover {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-soft);
}

.dl-refresh-btn svg {
  width: 0.9rem;
  height: 0.9rem;
}

.dl-version-dropdown {
  position: relative;
  width: 100%;
  z-index: 10;
}

.dl-custom-select {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.8rem 1rem;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: all 0.2s ease;
  
  &.status-success {
    border-color: #10b981;
  }
  
  &.status-warning {
    border-color: #f59e0b;
  }
  
  &.status-info {
    border-color: #3b82f6;
  }
  
  &.status-danger {
    border-color: #ef4444;
  }
}

.dl-custom-select:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 1px rgba(var(--vp-c-brand-rgb), 0.1);
  
  &.status-success:hover {
    border-color: #10b981;
    box-shadow: 0 0 0 1px rgba(16, 185, 129, 0.2);
  }
  
  &.status-warning:hover {
    border-color: #f59e0b;
    box-shadow: 0 0 0 1px rgba(245, 158, 11, 0.2);
  }
  
  &.status-info:hover {
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.2);
  }
  
  &.status-danger:hover {
    border-color: #ef4444;
    box-shadow: 0 0 0 1px rgba(239, 68, 68, 0.2);
  }
}

.dl-selected-version {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 自定义下拉菜单滚动条样式 */
.dl-dropdown-options {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

/* Firefox自定义滚动条 */
.dl-dropdown-options {
  scrollbar-width: thin;
  scrollbar-color: rgba(var(--vp-c-brand-rgb), 0.3) transparent;
}

/* WebKit浏览器自定义滚动条 */
.dl-dropdown-options::-webkit-scrollbar {
  width: 4px;
}

.dl-dropdown-options::-webkit-scrollbar-track {
  background: transparent;
  margin: 4px 0;
}

.dl-dropdown-options::-webkit-scrollbar-thumb {
  background: rgba(var(--vp-c-brand-rgb), 0.3);
  border-radius: 4px;
  transition: background 0.2s ease;
}

.dl-dropdown-options::-webkit-scrollbar-thumb:hover {
  background: rgba(var(--vp-c-brand-rgb), 0.6);
}

.dl-dropdown-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.7rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.dl-dropdown-option:hover {
  background-color: var(--vp-c-bg-mute);
}

.dl-dropdown-option.selected {
  background-color: rgba(var(--vp-c-brand-rgb), 0.1);
  font-weight: 500;
}

.dl-select-icon svg {
  width: 1.2rem;
  height: 1.2rem;
  transition: transform 0.2s ease;
}

.status-success .dl-select-icon svg {
  color: #10b981;
}

.status-warning .dl-select-icon svg {
  color: #f59e0b;
}

.status-info .dl-select-icon svg {
  color: #3b82f6;
}

.status-danger .dl-select-icon svg {
  color: #ef4444;
}

.dl-select-icon svg.rotate {
  transform: rotate(180deg);
}

/* Status indicator styles */
.dl-version-status-indicator {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.status-success .dl-version-status-indicator {
  background-color: #10b981;
}

.status-warning .dl-version-status-indicator {
  background-color: #f59e0b;
}

.status-info .dl-version-status-indicator {
  background-color: #3b82f6;
}

.status-danger .dl-version-status-indicator {
  background-color: #ef4444;
}

/* ===== Version status hint ===== */
.dl-version-tag {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  margin-bottom: 1.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  width: 100%;
  box-sizing: border-box;
  animation: fadeIn 0.3s ease;
}

.dl-version-tag svg {
  width: 1.0rem;
  height: 1.0rem;
  flex-shrink: 0;
}

.dl-version-tag.stable {
  background-color: rgba(16, 185, 129, 0.1);
  border: 1px solid #10b981;
  color: #10b981;
}

.dl-version-tag.stable svg {
  color: #10b981;
}

.dl-version-tag.experimental {
  background-color: rgba(59, 130, 246, 0.1);
  border: 1px solid #3b82f6;
  color: #3b82f6;
}

.dl-version-tag.experimental svg {
  color: #3b82f6;
}

.dl-version-tag.eol {
  background-color: rgba(245, 158, 11, 0.1);
  border: 1px solid #f59e0b;
  color: #f59e0b;
}

.dl-version-tag.eol svg {
  color: #f59e0b;
}

.dl-version-tag.dead {
  background-color: rgba(239, 68, 68, 0.1);
  border: 1px solid #ef4444;
  color: #ef4444;
}

.dl-version-tag.dead svg {
  color: #ef4444;
}

/* ===== Tab switcher ===== */
.dl-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.dl-tab {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.75rem;
  background: transparent;
  border: none;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 150ms ease-in-out;
  position: relative;
  margin-bottom: -1px;
}

.dl-tab::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: transparent;
  transition: background-color 150ms ease-in-out;
}

.dl-tab:hover {
  color: var(--vp-c-text-1);
}

.dl-tab.active {
  color: var(--vp-c-brand);
}

.dl-tab.active::after {
  background-color: var(--vp-c-brand);
}

.dl-tab svg {
  width: 1.1rem;
  height: 1.1rem;
}

.dl-tab-content {
  min-height: 200px;
  animation: fadeIn 0.3s ease;
}

/* ===== Card component ===== */
.dl-card {
  margin-bottom: 1rem;
  border-radius: 4px;
  background-color: var(--vp-c-bg-alt);
  overflow: hidden;
  transition: border-color 150ms ease-in-out, transform 150ms ease-in-out;
  border: 1px solid var(--vp-c-divider);
}

.dl-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
}

.dl-card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
}

.dl-card-header svg {
  width: 1.1rem;
  height: 1.1rem;
  color: var(--vp-c-brand);
}

.dl-card-header h3 {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
}

.dl-card-content {
  padding: 1rem;
}

/* ===== Download card ===== */
.dl-release-info {
  margin-bottom: 1.5rem;
}

.dl-release-title {
  margin: 0 0 1rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.dl-release-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2rem;
  padding: 0.75rem 1rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 4px;
  margin-bottom: 1rem;
}

.dl-meta-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.dl-meta-item svg {
  width: 1rem;
  height: 1rem;
  color: var(--vp-c-brand);
}

.dl-download-actions {
  display: grid;
  gap: 0.75rem;
  margin-bottom: 1rem;
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .dl-download-actions {
    grid-template-columns: max-content 1fr;
  }
}

.dl-file-detail {
  padding: 0.5rem 0.75rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 4px;
  margin-top: 0.5rem;
}

.dl-file-name {
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  word-break: break-all;
}

/* ===== Release notes ===== */
.dl-markdown {
  line-height: 1.6;
  font-size: 0.95rem;
}

.dl-markdown h3 {
  margin: 1.25rem 0 0.5rem;
  font-size: 1rem;
  font-weight: 600;
}

.dl-markdown h3:first-child {
  margin-top: 0;
}

.dl-markdown code {
  padding: 0.15rem 0.3rem;
  border-radius: 4px;
  background-color: var(--vp-c-bg-soft);
  font-family: var(--vp-font-family-mono);
  font-size: 0.85em;
}

/* Table style */
.release-notes :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 0.9rem;
  border: 1px solid var(--vp-c-divider);
}

.release-notes :deep(th),
.release-notes :deep(td) {
  padding: 0.6rem 1rem;
  border: 1px solid var(--vp-c-divider);
  text-align: left;
}

.release-notes :deep(thead) {
  background-color: var(--vp-c-bg-soft);
  font-weight: 600;
}

.release-notes :deep(tbody tr:nth-child(even)) {
  background-color: var(--vp-c-bg-alt);
}

.release-notes :deep(.commit-link) {
  font-family: var(--vp-font-family-mono);
  padding: 0.15rem 0.3rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.85em;
}

.release-notes :deep(.checkbox) {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.25rem 0;
}

.release-notes :deep(.checkbox.checked) {
  color: var(--vp-c-brand);
}

.release-notes :deep(ul) {
  padding-left: 1.5rem;
  margin: 0.5rem 0;
}

.release-notes :deep(li) {
  margin-bottom: 0.25rem;
}

/* ===== Build history ===== */
.dl-build-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .dl-build-list {
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  }
}

.dl-build-header {
  margin-bottom: 0.75rem;
}

.dl-build-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.5rem;
}

.dl-commit-message {
  position: relative;
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
  line-height: 1.5;
}

.dl-commit-content {
  padding: 0.75rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 4px;
  max-height: 100px;
  overflow: hidden;
  transition: max-height 0.3s ease;
  white-space: pre-wrap;
}

.dl-commit-content.expanded {
  max-height: 500px;
}

.dl-expand-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.25rem 0.5rem;
  margin-top: 0.5rem;
  border: none;
  border-radius: 4px;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 150ms ease-in-out;
}

.dl-expand-btn:hover {
  background-color: var(--vp-c-brand);
  color: white;
}

.dl-expand-btn svg {
  width: 0.9rem;
  height: 0.9rem;
}

/* ===== Buttons ===== */
.dl-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 150ms ease-in-out, color 150ms ease-in-out, box-shadow 150ms ease-in-out, border-color 150ms ease-in-out;
  white-space: nowrap;
  text-decoration: none;
  outline: none;
  box-sizing: border-box;
}

.dl-button.primary {
  background: var(--vp-c-brand);
  color: white;
  box-shadow: 0 2px 6px rgba(var(--vp-c-brand-rgb), 0.15);
  border: 2px solid transparent;
}

.dl-button.primary:hover {
  background: var(--vp-c-brand-dark);
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-rgb), 0.2);
}

.dl-button.primary.download {
  padding: 0.7rem 1.25rem;
  font-size: 1rem;
  font-weight: 600;
}

.dl-button.primary.download:hover {
  background: var(--vp-c-brand-dark);
  box-shadow: 0 6px 15px rgba(var(--vp-c-brand-rgb), 0.3);
  border-color: #2ecc71;
}

.dl-button.secondary {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  width: auto;
  min-width: 5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-family: var(--vp-font-family-base);
  transition: all 150ms;
}

.dl-button.secondary:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand-dimm);
  color: var(--vp-c-brand);
}

.dl-button svg {
  width: 1.1rem;
  height: 1.1rem;
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.dl-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
  justify-content: center;
}

/* ===== Links ===== */
.dl-link {
  color: var(--vp-c-brand);
  text-decoration: none;
  transition: color 150ms ease-in-out;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
}

.dl-link:hover {
  color: var(--vp-c-brand-dark);
  text-decoration: underline;
}

.dl-link svg {
  width: 0.9rem;
  height: 0.9rem;
}

/* ===== Responsive adjustments ===== */
@media (max-width: 640px) {
  .dl-header {
    padding: 1.75rem 0;
    margin-bottom: 2rem;
  }
  
  .dl-header h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .dl-subtitle {
    font-size: 0.9rem;
    max-width: 90%;
  }
  
  .dl-version-select {
    width: 100%;
  }
  
  .dl-button {
    width: 100%;
  }
  
  .dl-release-meta {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .dl-version-dropdown {
    width: 100%;
  }
  
  .dl-dropdown-options {
    max-height: 250px;
  }
}
</style>