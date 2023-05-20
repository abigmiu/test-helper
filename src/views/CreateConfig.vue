<!-- 创建配置文件 -->
<template>
    <div class="wrapper">
        <n-button type="primary" @click="onSave" class="save-button"
            >保存</n-button
        >
        <n-tree
            block-line
            :data="treeData"
            :selectable="false"
            :render-label="renderLabel"
            :render-suffix="renderSuffix"
            :default-expand-all="true"
        />
    </div>
</template>

<script lang="ts" setup>
import type { VNodeChild } from 'vue';
import { useMessage, type TreeOption } from 'naive-ui';
import { h, ref } from 'vue';
import { NButton, NTree, NInput } from 'naive-ui';
import { getUuid } from '@/scripts/utils/dataHandle';
import { onMounted } from 'vue';
import { unref } from 'vue';
import { reactive } from 'vue';
import { nextTick } from 'vue';

const onCreateBtn = (childrenData: TreeOption[], parentKey: string) => {
    const key = getUuid();
    childrenData.push(
        createTreeOption({
            key: key,
            parentKey,
            isEdit: true,
            label: '',
        }),
    );
};

const getTreeChildrenByKey = (
    data: TreeOption[],
    key: string,
): TreeOption[] => {
    for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
            return data[i].children!;
        }
        if (data[i].children) {
            return getTreeChildrenByKey(data[i].children!, key);
        }
    }
    return [];
};
const onDelete = (key: string, parentKay?: string) => {
    if (!parentKay) return;

    const parentData = getTreeChildrenByKey(treeData, parentKay);
    const index = parentData.findIndex((item) => item.key === key);
    if (index !== -1) {
        parentData.splice(index, 1);
    }
};

const createTreeOption = (data: {
    key: string;
    label: string;
    parentKey?: string;
    isEdit: boolean;
}): TreeOption => {
    return {
        label: data.label,
        key: data.key,
        isEdit: data.isEdit,
        parentKey: data.parentKey,
        children: [],
    };
};

const createRoot = () => {
    const root = createTreeOption({
        key: 'root',
        isEdit: false,
        label: '根节点',
    });
    return root;
};
const treeData = reactive<TreeOption[]>([createRoot()]);
const localConfig = localStorage.getItem('config');
if (localConfig) {
    const config = JSON.parse(localConfig) as TreeOption[];
    treeData.length = 0;
    treeData.push(...config);
}

/** 渲染Label */
const renderLabel = ({ option }: { option: TreeOption }): VNodeChild => {
    if (option.isEdit) {
        nextTick(() => {
            const inputEls = document.querySelectorAll('input');
            inputEls[0].focus();
        });
        return h(NInput, {
            autofocus: true,
            value: option.label,
            size: 'small',
            onUpdateValue: (value) => {
                option.label = value;
            },
            onChange: () => {
                if (option.label) {
                    option.isEdit = false;
                }
            },
            onBlur: () => {
                if (option.label) {
                    option.isEdit = false;
                }
            },
        });
    }
    return h(
        'div',
        {
            'data-id': option.key,
            onClick: () => {
                option.isEdit = true;
            },
        },
        option.label,
    );
};
const renderSuffix = ({ option }: { option: TreeOption }): VNodeChild => {
    const children = option.children || [];
    const key = option.key as string;
    return h('div', {}, [
        h(
            NButton,
            {
                text: true,
                type: 'primary',
                style: 'marginLeft: 10px;',
                onClick: () => onCreateBtn(children, key),
            },
            {
                default: () => '新增',
            },
        ),
        key !== 'root' &&
            h(
                NButton,
                {
                    text: true,
                    type: 'error',
                    style: 'marginLeft: 10px;',
                    onClick: () => onDelete(key, option.parentKey as string),
                },
                {
                    default: () => '删除',
                },
            ),
    ]);
};

const message = useMessage();
const onSave = () => {
    try {
        localStorage.setItem('config', JSON.stringify(treeData));
        message.success('保存成功');
    } catch {
        message.error('保存失败');
    }
};
</script>

<style scoped>
.wrapper {
    max-width: 800px;
    margin: 20px auto;
}
.save-button {
    margin-bottom: 20px;
}
</style>
