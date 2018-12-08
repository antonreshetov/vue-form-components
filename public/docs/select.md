# Select

Single and multiple select component with dropdown.

## Basic usage

```example
<template>
  <vue-select
    v-model="selected"
    :data="options"
    placeholder="Select">
    <vue-option
      v-for="i in options"
      :key="i.value"
      :value="i.value"
      :label="i.label">
    </vue-option>
  </vue-select>
</template>
<script>
  export default {
    data () {
      return {
        options: [
            { label: 'label 1', value: 1 },
            { label: 'label 2', value: 2 },
            { label: 'label 3', value: 3 }
        ],
        selected: ''
      }
    }
  }
</script>
```

## Disabled

```example
<template>
  <vue-select
    v-model="selected"
    :data="options"
    placeholder="Select"
    :disabled="true">
    <vue-option
      v-for="i in options"
      :key="i.value"
      :value="i.value"
      :label="i.label">
    </vue-option>
  </vue-select>
</template>
<script>
  export default {
    data () {
      return {
        options: [
            { label: 'label 1', value: 1 },
            { label: 'label 2', value: 2 },
            { label: 'label 3', value: 3 }
        ],
        selected: ''
      }
    }
  }
</script>
```

## Disabled option

```example
<template>
  <vue-select
    v-model="selected"
    :data="options"
    placeholder="Select">
    <vue-option
      v-for="i in options"
      :key="i.value"
      :value="i.value"
      :label="i.label"
      :disabled="i.disabled">
    </vue-option>
  </vue-select>
</template>
<script>
  export default {
    data () {
      return {
        options: [
            { label: 'label 1', value: 1, disabled: false },
            { label: 'label 2', value: 2, disabled: true },
            { label: 'label 3', value: 3, disabled: false }
        ],
        selected: ''
      }
    }
  }
</script>
```

## Multiple

Multiple select uses tags to display selected options.

```example
<template>
  <vue-select
    v-model="selected"
    :data="options"
    placeholder="Select"
    :multiple="true">
    <vue-option
      v-for="i in options"
      :key="i.value"
      :value="i.value"
      :label="i.label">
    </vue-option>
  </vue-select>
  <vue-select
    v-model="selected2"
    :data="options"
    placeholder="Select"
    :multiple="true"
    :collapse-tags="true">
    <vue-option
      v-for="i in options"
      :key="i.value"
      :value="i.value"
      :label="i.label">
    </vue-option>
  </vue-select>
</template>
<script>
  export default {
    data () {
      return {
        options: [
            { label: 'label 1', value: 1 },
            { label: 'label 2', value: 2 },
            { label: 'label 3', value: 3 }
        ],
        selected: [],
        selected2: []
      }
    }
  }
</script>
```

## Select attributes

| Attributes      | Description                                     | Type      | Accepted values | Default |
| --------------- | ----------------------------------------------- | --------- | --------------- | ------- |
| `data`          | List of select options                          | `Array`   | -               | -       |
| `multiple`      | Multiple select options                         | `Boolean` |                 | `false` |
| `collapse-tags` | Collapse tags to a text when multiple selecting | `Boolean` |                 | `false` |
| `disabled`      | Disable the select                              | `Boolean` | -               | `false` |
| `placeholder`   | Placeholder of select                           | `String`  | -               | -       |
| `name`          | Same as `name` in native select                 | `String`  | -               | -       |
| `empty-text`    | Displayed text when there is no options         | `String`  | -               | -       |

## Option attributes

| Attributes | Description        | Type               | Accepted values | Default |
| ---------- | ------------------ | ------------------ | --------------- | ------- |
| `value`    | Value of option    | `String`, `Number` | -               | -       |
| `label`    | Label of option    | `String`           | -               | -       |
| `disabled` | Disable the option | `Boolean`          | -               | `false` |

## Select events

| Name              | Description                                     | Payload                                           |
| ----------------- | ----------------------------------------------- | ------------------------------------------------- |
| `change`          | Triggers when selected value changed            | In single mode `value`, in multiple mode `object` |
| `option:selected` | Triggers when select the option                 | Selected `object`                                 |
| `remove-tag`      | Triggers when a tag is removed in multiple mode | Removed tag `object`                              |
