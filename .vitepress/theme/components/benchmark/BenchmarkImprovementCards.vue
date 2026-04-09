<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

export type ImprovementCardItem = {
  title: string;
  details: string;
  improvement: string;
  highlight?: boolean;
};

const props = withDefaults(
  defineProps<{
    cards: ImprovementCardItem[];
    minColumnWidth?: number;
    singleColumn?: boolean;
    maxCardWidth?: number | null;
    percentageFontSize?: string;
  }>(),
  {
    minColumnWidth: 250,
    singleColumn: false,
    maxCardWidth: null,
    percentageFontSize: "2rem"
  }
);

const animationStarted = ref(false);

const displayedImprovements = ref<string[]>([]);

const getImprovementMeta = (raw: string) => {
  const normalized = raw.trim().replace(/[^\d.+-]/g, "");
  const numericValue = Number.parseFloat(normalized);
  const target = Number.isFinite(numericValue) ? numericValue : 0;
  const decimalMatch = normalized.match(/\.(\d+)/);
  const decimals = decimalMatch ? decimalMatch[1].length : 0;

  return {
    target,
    decimals
  };
};

const resetDisplayedValues = () => {
  displayedImprovements.value = props.cards.map(() => "0");
};

const prefersReducedMotion = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const animateImprovementValues = () => {
  const targets = props.cards.map(({ improvement }) => getImprovementMeta(improvement));

  if (prefersReducedMotion()) {
    displayedImprovements.value = targets.map(({ target, decimals }) => target.toFixed(decimals));
    return;
  }

  const duration = 1200;
  const start = performance.now();

  const tick = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    displayedImprovements.value = targets.map(({ target, decimals }) => (target * eased).toFixed(decimals));

    if (progress < 1) {
      requestAnimationFrame(tick);
      return;
    }

    displayedImprovements.value = targets.map(({ target, decimals }) => target.toFixed(decimals));
  };

  requestAnimationFrame(tick);
};

onMounted(() => {
  resetDisplayedValues();

  requestAnimationFrame(() => {
    animationStarted.value = true;
    animateImprovementValues();
  });
});

watch(
  () => props.cards,
  () => {
    resetDisplayedValues();
    animateImprovementValues();
  },
  { deep: true }
);
</script>

<template>
  <div
    class="improvement-grid"
    :class="{ 'single-column': singleColumn }"
    :style="{
      gridTemplateColumns: singleColumn
        ? `minmax(${minColumnWidth}px, 1fr)`
        : `repeat(auto-fit, minmax(${minColumnWidth}px, 1fr))`
    }"
  >
    <div
      v-for="(card, cardIndex) in cards"
      :key="cardIndex"
      class="improvement-card"
      :class="{ highlight: card.highlight, show: animationStarted }"
      :style="{
        width: maxCardWidth === null ? '100%' : `min(100%, ${maxCardWidth}px)`,
        ...(maxCardWidth === null ? {} : { justifySelf: 'center' })
      }"
    >
      <div class="improvement-percentage" :style="{ fontSize: percentageFontSize }">
        {{ displayedImprovements[cardIndex] ?? card.improvement }}%
      </div>
      <div class="improvement-title">{{ card.title }}</div>
      <div class="improvement-details">{{ card.details }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
%surface-card {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.improvement-grid {
  display: grid;
  align-items: stretch;
  gap: 16px;
  margin-bottom: 24px;

  &.single-column {
    justify-content: center;
  }
}

.improvement-card {
  @extend %surface-card;
  border: 1px solid var(--vp-c-brand);
  padding: 20px;
  text-align: center;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 620ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 620ms cubic-bezier(0.22, 1, 0.36, 1);

  &.show {
    opacity: 1;
    transform: translateY(0);
  }

  &.highlight {
    border: 2px solid var(--vp-c-brand);
    background-color: rgba(120, 194, 135, 0.1);
  }
}

.improvement-percentage {
  font-weight: 700;
  color: var(--vp-c-brand);
  margin-bottom: 8px;
}

.improvement-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.improvement-details {
  font-size: 0.9rem;
  opacity: 0.8;
}

@media (prefers-reduced-motion: reduce) {
  .improvement-card {
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>
