import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import {
  Button,
  Select,
  Input,
  Form,
  FormItem
} from 'element-ui'
Vue.prototype.$ELEMENT = {
  size: 'small'
}
Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
Vue.component(Input.name, Input)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
