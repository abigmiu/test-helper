<!-- 创建配置文件 -->
<template>
    <div class="wrapper">
        <n-tree
            block-line
            :data="treeData"
            checkable
            expand-on-click
            selectable
            cascade
            :selected-keys="checkedKeys"
            :default-expand-all="true"
            @update:checked-keys="onChange"
            ref="treeRef"
        />
        <n-input
            type="textarea"
            :value="selectText"
            class="mt-2"
            disabled
        ></n-input>
        <n-button type="primary" class="mt-2" @click="onCopy">复制</n-button>
    </div>
</template>

<script lang="ts" setup>
import { useMessage, type TreeOption } from 'naive-ui';
import { onMounted, ref, reactive } from 'vue';
import { NTree, NInput, NButton } from 'naive-ui';

let treeData: TreeOption[] = [];
const localConfig = localStorage.getItem('config');
if (localConfig) {
    const config = JSON.parse(localConfig) as TreeOption[];
    treeData = config;
}

const selectText = ref('');
const checkedKeys = reactive<string[]>([]);

const treeRef = ref<typeof NTree>();
const onChange = (keys: string[]) => {
    checkedKeys.length = 0;
    checkedKeys.push(...keys);
    const data = treeRef.value!.getCheckedData();
    selectText.value = data.options
        .filter((item: TreeOption) => !item.children || !item.children.length)
        .map((item: TreeOption) => item.label)
        .join('\n');
};

const message = useMessage();
const onCopy = () => {
    try {
        navigator.clipboard.writeText(selectText.value);
        message.success('复制成功');
    } catch {
        message.error('复制失败');
    }
};
</script>

<style scoped>
.wrapper {
    max-width: 800px;
    margin: 20px auto;
}
.mt-2 {
    margin-top: 20px;
}
</style>
