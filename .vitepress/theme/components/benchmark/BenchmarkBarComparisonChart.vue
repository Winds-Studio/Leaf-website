<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

export type ComparisonBar = {
  key: string;
  label: string;
  className: string;
  value: number;
  valueLabel?: string;
};

export type ComparisonGroup = {
  name: string;
  bars: ComparisonBar[];
};

const props = withDefaults(
  defineProps<{
    groups: ComparisonGroup[];
    maxBarHeight?: number;
    chartBarsHeight?: number;
    barWrapperHeight?: number;
    groupMinWidth?: number;
    barWidth?: number;
    barGap?: number;
  }>(),
  {
    maxBarHeight: 160,
    chartBarsHeight: 220,
    barWrapperHeight: 180,
    groupMinWidth: 300,
    barWidth: 60,
    barGap: 40
  }
);

const maxValue = computed(() => {
  const values = props.groups.flatMap((group) => group.bars.map((bar) => bar.value));
  return Math.max(...values, 1);
});

const animationStarted = ref(false);

onMounted(() => {
  requestAnimationFrame(() => {
    animationStarted.value = true;
  });
});

const barHeight = (value: number) => `${(value / maxValue.value) * props.maxBarHeight}px`;
const barValueText = (bar: ComparisonBar) => bar.valueLabel ?? `${bar.value}`;
const barDelay = (groupIndex: number, barIndex: number) => `${groupIndex * 120 + barIndex * 140}ms`;
const textDelay = (groupIndex: number, barIndex: number) => `${groupIndex * 120 + barIndex * 140 + 140}ms`;
</script>

<template>
  <div class="chart">
    <div
      v-for="(group, groupIndex) in groups"
      :key="groupIndex"
      class="chart-group"
      :style="{ minWidth: `${groupMinWidth}px` }"
    >
      <div class="chart-label">{{ group.name }}</div>
      <div class="chart-bars" :style="{ height: `${chartBarsHeight}px`, gap: `${barGap}px` }">
        <div
          v-for="(bar, barIndex) in group.bars"
          :key="bar.key"
          class="bar-container"
          :style="{ width: `${barWidth}px` }"
        >
          <div class="bar-wrapper" :style="{ height: `${barWrapperHeight}px` }">
            <div
              class="bar"
              :class="bar.className"
              :style="{
                height: animationStarted ? barHeight(bar.value) : '0px',
                width: `${barWidth}px`,
                transitionDelay: barDelay(groupIndex, barIndex)
              }"
            ></div>
          </div>
          <div
            class="bar-value"
            :class="{ show: animationStarted }"
            :style="{ transitionDelay: textDelay(groupIndex, barIndex) }"
          >
            {{ barValueText(bar) }}
          </div>
          <div
            class="bar-name"
            :class="{ show: animationStarted }"
            :style="{ transitionDelay: textDelay(groupIndex, barIndex) }"
          >
            {{ bar.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$text-enter-easing: cubic-bezier(0.16, 1, 0.3, 1);
$text-enter-duration: 520ms;

%text-enter-base {
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity $text-enter-duration $text-enter-easing,
    transform $text-enter-duration $text-enter-easing;
}

.chart {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  padding: 20px 0;
}

.chart-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 45%;
}

.chart-label {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 20px;
  text-align: center;
}

.chart-bars {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
}

.bar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bar-wrapper {
  display: flex;
  align-items: flex-end;
}

.bar {
  border-radius: 4px 4px 0 0;
  transition: height 900ms cubic-bezier(0.22, 1, 0.36, 1);
}

$bar-colors: (
  paper: #3498db,
  leaf: #78c287
);

@each $name, $color in $bar-colors {
  .bar.#{$name} {
    background-color: $color;
  }
}

.bar.leaf-async {
  background-color: #49b858;
  border: 1px solid #2c8038;
}

.bar-value,
.bar-name {
  @extend %text-enter-base;
  white-space: nowrap;
}

.bar-value {
  font-size: 0.9rem;
  margin-top: 8px;
  font-weight: 600;

  &.show {
    opacity: 1;
    transform: translateY(0);
  }
}

.bar-name {
  font-size: 0.9rem;
  margin-top: 4px;

  &.show {
    opacity: 0.8;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .chart-group {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bar,
  .bar-value,
  .bar-name {
    transition: none !important;
  }

  .bar-value,
  .bar-name {
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>
