import Home from './home/index.js'
import Button from './button/index.js'

export default {
  components: {
    Home,
    Button
  },
  Nav: {
    'General': {
      'color': 'Color',
      'layout': 'Layout',
      'icon': 'Icon',
      'button': 'Button',
    },
    'From': {
      'Radio': 'Radio 单选框',
      'Checkout': 'Checkbox 多选框',
      'Input': 'Input 输入框',
      'Select': 'Select 选择器'
    },
    'Layout': {
      'Grid': 'Grid删格',
      'Layout': 'Layout布局',
    }
  }
}