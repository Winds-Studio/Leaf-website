<!-- Love the code from the leaves -->
<!-- https://github.com/LeavesMC/Documentation/blob/96c1b626ae9b2333a9e3ae57995e847655c562d5/src/components/ConfigViewer.vue -->
<script setup lang="ts">
import { onMounted, ref, defineProps, defineExpose } from "vue";
import ConfigViewerNode from "./ConfigViewerNode.vue";

const hover = ref({});
const expand = ref({});
const children = ref<(typeof ConfigViewerNode)[]>([]);

const props = defineProps({
    data: Object,
    parent: String,
    padding: Boolean,
});

function isSpecial(value: string): boolean {
    return value === "true" || value === "false" || !isNaN(Number(value));
}

const valueMap: string[] = [];

function resolveValue(value: { default: string; vId?: number }): string {
    if (value?.vId !== undefined && valueMap[value.vId]) {
        return valueMap[value.vId];
    }
    value.vId = valueMap.length;
    valueMap[value.vId] = value.default.startsWith("$")
        ? dynamicValue(value.default)
        : value.default;
    return valueMap[value.vId];
}

function setChildRef(el: typeof ConfigViewerNode) {
    children.value.push(el);
}

function expandAll() {
    Object.keys(props.data).forEach(dataKey => {
        expand.value[dataKey] = true;
    });
    children.value.forEach(child => {
        child.expandAll();
    });
}

function collapseAll() {
    Object.keys(props.data).forEach(dataKey => {
        expand.value[dataKey] = false;
    });
    children.value.forEach(child => {
        child.collapseAll();
    });
}

defineExpose({ expandAll, collapseAll });

function dynamicValue(value: string): string {
    const args = value.split("$");
    if (args[1] === "random" && args[2] === "int") {
        const min = args[3] ? Number(args[3]) : -2147483648;
        const max = args[4] ? Number(args[4]) : 2147483647;
        return String(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return value;
}

onMounted(() => {
    const dist = window.location.hash.replace("#", ".") as string;
    const key = dist.replace(props.parent, "").split(".")[1];
    if (key) {
        expand.value[key] = true;
    }
});

</script>

<template>
    <div v-for="(value, key) in data" :key="key" style="padding-left: 8px">
        <div v-if="key !== 'inline-block'" @mouseover="hover[key] = true" @mouseleave="hover[key] = false"
            :style="{ paddingLeft: padding ? '8px' : '0' }">
            <div v-if="value['default'] === undefined" :id="`${parent}.${key}`.slice(1)">
                <span class="line config-line" role="button">
                    <span :class="hover[key] ? 'config-key-text-hover' : 'config-key-text'">{{ key }}</span>
                    <span class="config-value-text">:</span>
                </span>
                <ConfigViewerNode :ref="setChildRef" :data="value" :padding="true" :parent="`${parent}.${key}`" />
            </div>
            <div v-else style="white-space: pre-wrap" :id="`${parent}.${key}`.slice(1)">
                <span class="line config-line" role="button" @click="expand[key] = !expand[key]">
                    <span :class="hover[key] ? 'config-key-text-hover' : 'config-key-text'">{{ key }}</span>
                    <span class="config-value-text">: </span>
                    <span v-if="typeof value.default != 'object'" :class="value.default.startsWith('$')
                        ? 'config-value-random'
                        : isSpecial(resolveValue(value))
                            ? 'config-value-special'
                            : 'config-value-text'
                        ">{{ resolveValue(value) }}</span>
                </span>
                <div v-if="typeof value.default == 'object'" v-for="v in value.default" :key="key"
                    style="padding-left: 16px">
                    <span class="config-line">
                        <span class="config-list">- </span>
                        <span :class="isSpecial(v) ? 'config-value-special' : 'config-value-text'
                            ">{{ v }}</span>
                    </span>
                </div>
                <div v-if="expand[key] && value.description" class="custom-block info inline-block"
                    style="width: 100%; padding: 16px; white-space: normal" v-html="value.description" />
            </div>
        </div>
        <div v-else :class="value.type + ` custom-block inline-block`" style="margin-right: 16px; width: 100%">
            <p class="custom-block-title">
                {{ value.title === undefined ? value.type.toUpperCase() : value.title }}
            </p>
            <p style="white-space: normal" v-html="value.content" />
        </div>
    </div>
</template>

<!--suppress CssUnusedSymbol -->
<style>
.config-key-text {
    --shiki-light: #22863a;
    --shiki-dark: #85e89d;
    transition: color 0.2s;
}

.config-key-text-hover {
    --shiki-light: #6f42c1;
    --shiki-dark: #b392f0;
    transition: color 0.2s;
}

.config-value-text {
    --shiki-light: #032f62;
    --shiki-dark: #9ecbff;
    transition: color 0.2s;
}

.config-value-special {
    --shiki-light: #005cc5;
    --shiki-dark: #79b8ff;
    transition: color 0.2s;
}

.config-value-random {
    --shiki-light: #08979c;
    --shiki-dark: #5cdbd3;
    transition: color 0.2s;
}

.config-list {
    --shiki-light: #24292e;
    --shiki-dark: #e1e4e8;
}

.inline-block {
    font-family: var(--vp-font-family-base);
}

.config-line {
    display: inline-block;
    padding: 0;
    text-indent: -1rem;
    margin-left: 1rem;

    transition: all 0.5s;
}
</style>
