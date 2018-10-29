# Button

Simple button component

## Basic usage

```example
<template>
  <vue-button>Default</vue-button>
  <vue-button type="primary">Primary</vue-button>
  <vue-button type="success">Success</vue-button>
  <vue-button type="warning">Warning</vue-button>
  <vue-button type="danger">Danger</vue-button>
</template>
<script>
  export default {
    data () {
      return {}
    }
  }
</script>
```

## Disabled

```example
<template>
  <vue-button
    :disabled="true">
    Default
  </vue-button>
  <vue-button
    type="primary"
    :disabled="true">
    Primary
  </vue-button>
  <vue-button
    type="success"
    :disabled="true">
    Success
  </vue-button>
  <vue-button
    type="warning"
    :disabled="true">
    Warning
  </vue-button>
  <vue-button
    type="danger"
    :disabled="true">
    Danger
  </vue-button>
</template>
<script>
  export default {
    data () {
      return {}
    }
  }
</script>
```

## With icon

```example
<template>
  <vue-button>
    <i class="fas fa-search"></i> Search
  </vue-button>
  <vue-button type="primary">
    <i class="fas fa-pen"></i> Edit
  </vue-button>
  <vue-button type="danger">
    <i class="fas fa-trash-alt"></i> Delete
  </vue-button>
</template>
<script>
  export default {
    data () {
      return {}
    }
  }
</script>
```

## Attributes

| Attributes | Description        | Type      | Accepted values                           | Default |
| ---------- | ------------------ | --------- | ----------------------------------------- | ------- |
| `type`     | Type of button     | `String`  | `primary`, `success`, `warning`, `danger` | -       |
| `disabled` | Disable the button | `Boolean` | -                                         | false   |

## Events

| Name    | Description                  | Payload |
| ------- | ---------------------------- | ------- |
| `click` | Triggers when button clicked | -       |
