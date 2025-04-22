<script setup>
import { ref } from 'vue';

// Performance comparison data
const performanceData = [
  {
    name: 'Default Config',
    Leaf: 2.8,
    Paper: 3.7,
    LeafAsync: null, // No async data for this scenario
    leafImprovement: ((3.7 - 2.8) / 3.7 * 100).toFixed(1)
  },
  {
    name: 'Increased Mob Caps',
    Leaf: 5.8,
    Paper: 8.1,
    LeafAsync: 4.5,
    leafImprovement: ((8.1 - 5.8) / 8.1 * 100).toFixed(1),
    asyncImprovement: ((8.1 - 4.5) / 8.1 * 100).toFixed(1)
  }
];

// Environment details
const environment = {
  leafCommit: '9db6bfb',
  paperCommit: 'a838a88',
  seed: '2618050634530417871',
  coords: '183.5 67.00 -201.5',
  version: '1.21.4',
  cpu: 'i7-10750H',
  jvm: 'GraalVM 21',
  memory: '6GB'
};

// Aikar's flags
const jvmFlags = `-Xms6144M -Xmx6144M --add-modules=jdk.incubator.vector -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true -XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20`;

// Calculate maximum MSPT value for scaling
const maxMspt = Math.max(
  ...performanceData.map(d => Math.max(d.Paper, d.Leaf, d.LeafAsync || 0))
);

// Calculate the scale factor for bar heights (pixels per mspt)
// We'll aim for the tallest bar to be about 160px tall
const scaleFactor = 160 / maxMspt;
</script>

<template>
  <div class="performance-graph">
    <!-- Test Environment Card -->
    <div class="env-card">
      <h3>Test Environment</h3>
      <div class="env-grid">
        <div class="env-item">
          <span class="label">Version:</span> {{ environment.version }}
        </div>
        <div class="env-item">
          <span class="label">CPU:</span> {{ environment.cpu }}
        </div>
        <div class="env-item">
          <span class="label">JVM:</span> {{ environment.jvm }}
        </div>
        <div class="env-item">
          <span class="label">Memory:</span> {{ environment.memory }}
        </div>
        <div class="env-item">
          <span class="label">Leaf Commit:</span> {{ environment.leafCommit }}
        </div>
        <div class="env-item">
          <span class="label">Paper Commit:</span> {{ environment.paperCommit }}
        </div>
        <div class="env-item">
          <span class="label">Seed:</span> {{ environment.seed }}
        </div>
        <div class="env-item">
          <span class="label">Coords:</span> {{ environment.coords }}
        </div>
      </div>
      
      <div class="jvm-flags">
        <h4>JVM Flags</h4>
        <div class="code-block jvm-flags-code">{{ jvmFlags }}</div>
      </div>
    </div>

    <!-- Performance Chart -->
    <h3>Performance Comparison (MSPT - lower is better)</h3>
    <div class="chart-container">
      <div class="chart">
        <div v-for="(data, index) in performanceData" :key="index" class="chart-group">
          <div class="chart-label">{{ data.name }}</div>
          <div class="chart-bars">
            <div class="bar-container">
              <div class="bar-wrapper">
                <div class="bar paper" :style="{ height: `${data.Paper * scaleFactor}px` }"></div>
              </div>
              <div class="bar-value">{{ data.Paper }} mspt</div>
              <div class="bar-name">Paper</div>
            </div>
            
            <div class="bar-container">
              <div class="bar-wrapper">
                <div class="bar leaf" :style="{ height: `${data.Leaf * scaleFactor}px` }"></div>
              </div>
              <div class="bar-value">{{ data.Leaf }} mspt</div>
              <div class="bar-name">Leaf</div>
            </div>
            
            <div v-if="data.LeafAsync" class="bar-container">
              <div class="bar-wrapper">
                <div class="bar leaf-async" :style="{ height: `${data.LeafAsync * scaleFactor}px` }"></div>
              </div>
              <div class="bar-value">{{ data.LeafAsync }} mspt</div>
              <div class="bar-name">Leaf+Async</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Improvement Cards -->
    <h3>Performance Improvement</h3>
    <div class="improvement-grid">
      <div class="improvement-card">
        <div class="improvement-percentage">{{ performanceData[0].leafImprovement }}%</div>
        <div class="improvement-title">Default Configuration</div>
        <div class="improvement-details">
          Leaf ({{ performanceData[0].Leaf }} mspt) vs Paper ({{ performanceData[0].Paper }} mspt)
        </div>
      </div>
      
      <div class="improvement-card">
        <div class="improvement-percentage">{{ performanceData[1].leafImprovement }}%</div>
        <div class="improvement-title">Leaf with Increased Mob Caps</div>
        <div class="improvement-details">
          Leaf ({{ performanceData[1].Leaf }} mspt) vs Paper ({{ performanceData[1].Paper }} mspt)
        </div>
      </div>
      
      <div class="improvement-card highlight">
        <div class="improvement-percentage">{{ performanceData[1].asyncImprovement }}%</div>
        <div class="improvement-title">Leaf+Async with Increased Mob Caps</div>
        <div class="improvement-details">
          Leaf+Async ({{ performanceData[1].LeafAsync }} mspt) vs Paper ({{ performanceData[1].Paper }} mspt)
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.performance-graph {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
}

.env-card {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
}

h3 {
  font-size: 1.3rem;
  margin-bottom: 16px;
  font-weight: 600;
}

h4 {
  font-size: 1.1rem;
  margin-bottom: 12px;
  font-weight: 500;
}

.env-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.env-item {
  font-size: 0.9rem;
}

.label {
  font-weight: 600;
  margin-right: 6px;
}

.jvm-flags {
  margin-top: 8px;
}

.jvm-flags-code {
  font-size: 0.8rem;
  line-height: 1.4;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
}

.chart-container {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
  overflow: auto;
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
  min-width: 300px;
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
  gap: 40px;
  height: 220px;
  width: 100%;
}

.bar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
}

.bar-wrapper {
  height: 180px;
  display: flex;
  align-items: flex-end;
}

.bar {
  width: 60px;
  border-radius: 4px 4px 0 0;
  transition: height 0.5s ease;
}

.bar.leaf {
  background-color: #78C287;
}

.bar.leaf-async {
  background-color: #49B858;
  border: 1px solid #2c8038;
}

.bar.paper {
  background-color: #3498db;
}

.bar-value {
  font-size: 0.9rem;
  margin-top: 8px;
  font-weight: 600;
  white-space: nowrap;
}

.bar-name {
  font-size: 0.9rem;
  margin-top: 4px;
  opacity: 0.8;
}

.improvement-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.improvement-card {
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-brand);
  border-radius: 8px;
  padding: 20px;
  text-align: center;
}

.improvement-card.highlight {
  border: 2px solid var(--vp-c-brand);
  background-color: rgba(120, 194, 135, 0.1);
}

.improvement-percentage {
  font-size: 2rem;
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

.code-block {
  background-color: var(--vp-c-bg-alt);
  padding: 12px;
  border-radius: 6px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.9em;
  line-height: 1.5;
  overflow-x: auto;
  margin: 10px 0;
}

@media (max-width: 768px) {
  .env-grid {
    grid-template-columns: 1fr;
  }
  
  .chart-group {
    width: 100%;
  }
  
  .chart-bars {
    gap: 20px;
  }
  
  .bar-container {
    width: 50px;
  }
  
  .bar {
    width: 50px;
  }
}
</style>