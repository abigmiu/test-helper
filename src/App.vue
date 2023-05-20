<template>
    <div>
        <n-menu
            mode="horizontal"
            :options="menuOptions"
            v-model:value="activeMenu"
        />
        <n-message-provider>
            <RouterView></RouterView>
        </n-message-provider>
    </div>
</template>
<script setup lang="ts">
import { h, reactive, ref } from 'vue';
import type { MenuOption } from 'naive-ui';
import { NMenu, NMessageProvider } from 'naive-ui';
import { RouterLink } from 'vue-router';

const activeMenu = ref<string>('Config');
const menuOptions: MenuOption[] = [
    {
        key: 'Config',
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: 'Config',
                    },
                },
                {
                    default: '配置',
                },
            ),
    },
    {
        key: 'Select',
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: 'Select',
                    },
                },
                {
                    default: '选择',
                },
            ),
    },
];
</script>
<style>
.nav-item {
}
</style>
