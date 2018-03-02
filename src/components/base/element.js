import Vue from 'vue';
// import 'element-ui/lib/theme-chalk/index.css'
import {
  Button,
  Input,
  Form,
  FormItem
} from 'element-ui';
Vue.prototype.$ELEMENT = {
  size: 'small'
}
// Vue.component(Button.name, Button)
// Vue.component(Input.name, Input)
// Vue.component(Form.name, Form)
// Vue.component(FormItem.name, FormItem)
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
