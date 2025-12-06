<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { Icon } from "@iconify/vue";
import { getVerStatus } from "../versionStatus";
import { useTranslation } from "../useTranslation";

const props = defineProps<{
  selectedVersion: string;
  versions: string[];
}>();
const { t } = useTranslation();

const emit = defineEmits(["update:selectedVersion"]);
const dropdownOpen = ref(false);

const selectVersion = (version: string) => {
  emit("update:selectedVersion", version);
  dropdownOpen.value = false;
};

const dropdownRef = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node) && dropdownOpen.value) {
    dropdownOpen.value = false;
  }
};

onMounted(() => document.addEventListener("click", handleClickOutside));
onUnmounted(() => document.removeEventListener("click", handleClickOutside));
</script>

<template>
  <div class="dl-version-selector">
    <div class="dl-selector-label">
      {{ t("labels.version") }}
    </div>
    <div ref="dropdownRef" class="dl-version-dropdown">
      <div
        class="dl-custom-select"
        @click="dropdownOpen = !dropdownOpen"
        :class="selectedVersion ? getVerStatus(selectedVersion).cssClass : ''"
      >
        <div class="dl-selected-version">
          <span class="dl-version-status-indicator"></span>
          <span>{{ selectedVersion }}</span>
        </div>
        <div class="dl-select-icon">
          <Icon icon="lucide:chevron-down" :class="{ rotate: dropdownOpen }" />
        </div>
      </div>

      <transition name="fade">
        <div class="dl-dropdown-options" v-show="dropdownOpen">
          <div
            v-for="version in versions"
            :key="version"
            :class="['dl-dropdown-option', { selected: selectedVersion === version }, getVerStatus(version).cssClass]"
            @click="selectVersion(version)"
          >
            <span class="dl-version-status-indicator"></span>
            <span>{{ version }}</span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../statusColors";

// ---------------------------------------

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
  border: 1px solid var(--status-color-1);
  border-radius: var(--vp-border-radius);
  padding: 0.8rem 1rem;
  font-size: 16px;
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: var(--vp-anim-dur) ease-in-out;
}

.dl-custom-select:hover {
  border-color: var(--status-color-1);
  box-shadow: 0 0 0 1px var(--status-color-soft);
}

.dl-selected-version {
  display: flex;
  align-items: center;
  gap: 8px;
}

.dl-dropdown-options {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--vp-border-radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.dl-dropdown-options {
  scrollbar-width: thin;
  scrollbar-color: rgba(var(--vp-c-brand-rgb), 0.3) transparent;
}

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
  transition: var(--vp-anim-dur) ease-in-out background;
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
  transition: var(--vp-anim-dur) ease-in-out background-color;
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
  color: var(--status-color-1);
  transition: var(--vp-anim-dur) ease-in-out transform;
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
  background-color: var(--status-color-1);
}

.fade-enter-active,
.fade-leave-active {
  transition: var(--vp-anim-dur) ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
