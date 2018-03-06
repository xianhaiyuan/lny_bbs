import Vue from 'vue';
// import 'element-ui/lib/theme-chalk/index.css'
import {
  Button,
  Input,
  Form,
  FormItem,
  MessageBox,
  Message,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Radio,
  RadioGroup,
  RadioButton,
  DatePicker,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Table,
  TableColumn,
  Pagination
} from 'element-ui';
Vue.prototype.$ELEMENT = {
  size: 'small'
}

Vue.component(Pagination.name, Pagination)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Card.name, Card)
Vue.component(Breadcrumb.name, Breadcrumb)
Vue.component(BreadcrumbItem.name, BreadcrumbItem)
Vue.component(DatePicker.name, DatePicker)
Vue.component(Radio.name, Radio)
Vue.component(RadioGroup.name, RadioGroup)
Vue.component(RadioButton.name, RadioButton)
Vue.component(DropdownMenu.name, DropdownMenu)
Vue.component(DropdownItem.name, DropdownItem)
Vue.component(Dropdown.name, Dropdown)
Vue.component(Autocomplete.name, Autocomplete)
Vue.component(Button.name, Button)
Vue.component(Input.name, Input)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(MessageBox.name, MessageBox)
Vue.component(Container.name, Container)
Vue.component(Header.name, Header)
Vue.component(Aside.name, Aside)
Vue.component(Main.name, Main)
Vue.component(Footer.name, Footer)
// Vue.use(Button)
// Vue.use(Input)
// Vue.use(Form)
// Vue.use(FormItem)
// Vue.use(MessageBox)
// Vue.use(Container)
// Vue.use(Header)
// Vue.use(Aside)
// Vue.use(Main)
// Vue.use(Footer)

Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
