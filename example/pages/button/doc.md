## Button 按钮
常用的操作按钮。

### 基础用法

基础的按钮用法

:::demo
#### 基本类型
按钮有三种类型：默认按钮、虚线按钮、文字按钮。主按钮在同一个操作区域最多出现一次。
```js
render() {
  return (
    <div>
      <Button>默认按钮</Button>
      <Button type="dashed">虚线按钮</Button>
      <Button type="text">文字按钮</Button>
    </div>
  )
}
```
:::

### 颜色按钮

Button 组件提供四种不同颜色的按钮

:::demo
#### 颜色
设置type属性为`info`、`warning`、`success`、`danger`。
```js
render() {
  return (
    <div>
      <Button type="info">默认按钮</Button>
      <Button type="warning">警告按钮</Button>
      <Button type="success">成功按钮</Button>
      <Button type="danger">危险按钮</Button>
    </div>
  )
}
```
:::

### 按钮尺寸

Button 组件提供三种不同的按钮尺寸

:::demo
#### 尺寸
按钮有大、中、小三种尺寸。`large`、`small`
```js
render() {
  return (
    <div>
      <Button size="large">大型按钮</Button>
      <Button>默认按钮</Button>
      <Button size="small">小型按钮</Button>
    </div>
  )
}
```
:::

### 图标按钮

含有icon的按钮

:::demo
#### 图标
按钮设置`icon`属性，也可直接定义`className`
```js
render() {
  return (
    <div>
      <Button icon="shouye" type="info">首页</Button>
      <Button icon="tixing" type="warning">提醒</Button>
      <Button icon="jingshi" type="danger">警示</Button>
    </div>
  )
}
```
:::

### 禁用按钮

设置按钮为不可用状态

:::demo
#### 禁用
按钮设置`icon`属性，也可直接定义`className`
```js
render() {
  return (
    <div>
      <Button disabled={true} type="info">默认按钮</Button>
      <Button disabled={true} type="dashed">虚线按钮</Button>
      <Button disabled={true} type="text">文字按钮</Button>
    </div>
  )
}
```
:::

### 属性API

按钮的属性说明：

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|--------- |-------- |---------- |-------------  |-------- |
| type     | 类型   | string    |   dashed,info,warning,success,danger,info,text |     -    |
| htmlType | 原生type值 | string    |  button,submit,reset  |  button  |
| size     | 尺寸   | string    |   large,small            |    -     |
| disabled | 禁用   | boolean   |   true,flase             |  flase  |
| icon     | 图标   | string    |   shouye,tixing          |    -     |

