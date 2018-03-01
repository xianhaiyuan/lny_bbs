# lny_bbs

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 开发工具

> VSCode

### 安装的插件

- Auto Close Tag
- Auto Rename Tag
- Beautify
- ESlint
- SCSS IntelliSense
- scss-lint
- Vetur
- Vue VSCode Snippets

### 用户设置

```
{
    // 窗口失去焦点自动保存
    "files.autoSave": "onFocusChange",
    "search.exclude": {
        "**/node_modules": true,
        "**/bower_components": true,
        "**/dist": true
    },
    "files.associations": {
        "*.vue": "vue",
        "*.html": "html"
    },
    // 编辑粘贴自动格式化
    "editor.formatOnPaste": true,
    // 控制字体系列。
    "editor.fontFamily": "pingfang,Menlo, Monaco, 'Courier New', monospace",
    // 字体大小
    "editor.fontSize": 12,
    // 行高
    "editor.lineHeight": 17,
    // 通过使用鼠标滚轮同时按住 Ctrl 可缩放编辑器的字体
    "editor.mouseWheelZoom": false,
    // 行太长自动换行
    "editor.wordWrap": "on",
    //Windows bash终端"terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",
    // 主体
    "workbench.colorTheme": "Monokai",
    "workbench.iconTheme": "vs-seti",
    // eslint设置
    "eslint.validate": [
        "javascript",
        "html",
        "vue",
        {
            "language": "vue",
            "autoFix": true
        },
        "vue-html"
    ],
    "eslint.options": {
        "plugins": [
            "html"
        ],
        "extensions": [
            ".js",
            ".vue"
        ]
    },
    // 保存自动修复
    "eslint.autoFixOnSave": true,
    // tab锁紧
    "editor.tabSize": 2,
    // 保存自动化
    "editor.formatOnSave": true,
    // 空格变成......
    "editor.renderWhitespace": "all",
    "window.zoomLevel": 0,
    "vetur.format.defaultFormatter.html": "js-beautify-html",
    "vetur.validation.template": false,
    // 自动识别文件类型
    // "emmet.syntaxProfiles": {
    //     "vue-html": "html",
    //     "vue": "html"
    // }
    "emmet.includeLanguages": {
        "vue": "html",
        "vue-html": "html"
    }
}
```

### .eslintrc.json
```
{
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "sourceType": "module"
  },
  "rules": {
    "no-const-assign": "warn",
    "no-this-before-super": "warn",
    "no-undef": "warn",
    "no-unreachable": "warn",
    "no-unused-vars": "warn",
    "constructor-super": "warn",
    "valid-typeof": "warn"
  },
  "plugins": [
    "vue"
  ]
}
```