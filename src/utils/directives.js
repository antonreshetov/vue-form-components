export const clickOutside = {
  bind (el, binding, vNode) {
    if (typeof binding.value !== 'function') {
      const compName = vNode.context.name

      let warn = `provided expression '${
        binding.expression
      }' is not a function, but has to be`

      if (compName) warn += `Found in component '${compName}'`

      console.warn('[v-click-outside]', warn)
    }

    const bubble = binding.modifiers.bubble
    const handler = e => {
      if (bubble || (!el.contains(e.target) && el !== e.target)) {
        binding.value(e)
      }
    }
    el.$_vfcClickOutside_ = handler

    document.addEventListener('click', handler)
  },

  unbind (el, binding) {
    document.removeEventListener('click', el.$_vfcClickOutside_)
    el.$_vfcClickOutside_ = null
  }
}
