---
category: Components
type: Data Entry
title: ModalInput
subtitle: 带弹出框的输入控件
---

在弹出框中选择输入框的内容，并自动填充到输入框内。

## API

| 参数             | 说明                                         | 类型     | 默认值                          |
|------------------|----------------------------------------------|----------|---------------------------------|
| callback           | 弹出框的回调事件 | Function | 无 |
| mapper           | 子组件回调数据与Input内容的映射方法 | Function | 无 |
| placeholder | 设置占位符 | string |  |  |

## 其它

支持 callback 的注入传递，并在子组件的 callback 后将弹出框自动关闭，同时将值填充到输入框内。
