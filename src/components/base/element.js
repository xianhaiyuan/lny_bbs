import Vue from 'vue';
// import 'element-ui/lib/theme-chalk/index.css'
import {
  Button,
  Input,
  Form,
  FormItem,
  MessageBox,
  Message
} from 'element-ui';
Vue.prototype.$ELEMENT = {
  size: 'small'
}
Vue.component(Button.name, Button)
Vue.component(Input.name, Input)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(MessageBox.name, MessageBox)
// Vue.use(Button)
// Vue.use(Input)
// Vue.use(Form)
// Vue.use(FormItem)
// Vue.use(MessageBox)

Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
