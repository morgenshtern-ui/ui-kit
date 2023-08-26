<script setup lang="ts">
import { NCheckbox } from '@teleskop-labs/ui-kit-components'
import { computed, ref } from 'vue'

type CheckedItems = Record<string, boolean>

const PARENT_ID: string = 'All projects'
const CHILD_1_ID: string = 'Design System'
const CHILD_2_ID: string = 'Jira Software'
const CHILD_3_ID: string = 'Confluence'

function getCheckedChildrenCount(checkedItems: CheckedItems) {
  const childItems = Object.keys(checkedItems).filter((i) => i !== PARENT_ID)

  return childItems.reduce((count, i) => (checkedItems[i] ? count + 1 : count), 0)
}

function getIsParentIndeterminate(checkedItems: CheckedItems) {
  const checkedChildrenCount = getCheckedChildrenCount(checkedItems)

  return checkedChildrenCount > 0 && checkedChildrenCount < 3
}

const initialCheckedItems: Record<string, boolean> = {
  [PARENT_ID]: false,
  [CHILD_1_ID]: false,
  [CHILD_2_ID]: false,
  [CHILD_3_ID]: true,
}

const checkedItems = ref(initialCheckedItems)

const isParentIndeterminate = computed(() => getIsParentIndeterminate(checkedItems.value))

function onChange(itemValue: string) {
  if (itemValue === PARENT_ID) {
    const newCheckedState = !checkedItems.value[PARENT_ID]

    // Set all items to the checked state of the parent
    checkedItems.value = Object.fromEntries(Object.keys(checkedItems.value).map((i) => [i, newCheckedState]))
  } else {
    const newCheckedItems = {
      ...checkedItems.value,

      [itemValue]: !checkedItems.value[itemValue],
    }

    checkedItems.value = {
      // If all children would be unchecked, also uncheck the parent
      ...newCheckedItems,
      [PARENT_ID]: getCheckedChildrenCount(newCheckedItems) > 0,
    }
  }
}
</script>

<template>
  <div>
    <NCheckbox name="child-1"> Design System </NCheckbox>
    <NCheckbox
      :model-value="checkedItems[PARENT_ID]"
      :is-indeterminate="isParentIndeterminate"
      name="parent"
      @update:model-value="() => onChange(PARENT_ID)"
    >
      All projects
    </NCheckbox>
    <div>
      <NCheckbox
        :model-value="checkedItems[CHILD_1_ID]"
        name="child-1"
        @update:model-value="() => onChange(CHILD_1_ID)"
      >
        Design System
      </NCheckbox>
      <NCheckbox
        :model-value="checkedItems[CHILD_2_ID]"
        name="child-2"
        @update:model-value="() => onChange(CHILD_2_ID)"
      >
        Jira Software
      </NCheckbox>
      <NCheckbox
        :model-value="checkedItems[CHILD_3_ID]"
        name="child-3"
        @update:model-value="() => onChange(CHILD_3_ID)"
      >
        Confluence
      </NCheckbox>
    </div>
  </div>
</template>
