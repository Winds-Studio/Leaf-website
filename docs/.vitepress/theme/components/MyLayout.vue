<!-- .vitepress/theme/MyLayout.vue -->

<script setup lang="ts">
import { useData, inBrowser } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { watchEffect } from 'vue'
import { nextTick, provide } from 'vue'
import {
    NolebaseEnhancedReadabilitiesMenu,
    NolebaseEnhancedReadabilitiesScreenMenu,
} from "@nolebase/vitepress-plugin-enhanced-readabilities";
import { NolebaseHighlightTargetedHeading } from "@nolebase/vitepress-plugin-highlight-targeted-heading/client";
const { isDark } = useData()

const enableTransitions = () =>
    'startViewTransition' in document &&
    window.matchMedia('(prefers-reduced-motion: no-preference)').matches

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
    if (!enableTransitions()) {
        isDark.value = !isDark.value
        return
    }

    const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${Math.hypot(
            Math.max(x, innerWidth - x),
            Math.max(y, innerHeight - y)
        )}px at ${x}px ${y}px)`
    ]

    await document.startViewTransition(async () => {
        isDark.value = !isDark.value
        await nextTick()
    }).ready

    document.documentElement.animate(
        { clipPath: isDark.value ? clipPath.reverse() : clipPath },
        {
            duration: 300,
            easing: 'ease-in',
            pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
        }
    )
})

const { lang } = useData()
watchEffect(() => {
    if (inBrowser) {
        const userLang = navigator.language
        // 在控制台输出用户的语言
        if (userLang.startsWith('zh')) {
            lang.value = 'zh'
        }
        document.cookie = `nf_lang=${lang.value}; expires=Mon, 1 Jan 2030 00:00:00 UTC; path=/`
    }
})
</script>

<template>
    <DefaultTheme.Layout>
        <template #nav-bar-content-after>
            <NolebaseEnhancedReadabilitiesMenu />
        </template>
        <template #nav-screen-content-after>
            <NolebaseEnhancedReadabilitiesScreenMenu />
        </template>
        <template #layout-top>
            <NolebaseHighlightTargetedHeading />
        </template>
    </DefaultTheme.Layout>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
    animation: none;
    mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
    z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
    z-index: 9999;
}

.VPSwitchAppearance {
    width: 22px !important;
}

.VPSwitchAppearance .check {
    transform: none !important;
}
</style>