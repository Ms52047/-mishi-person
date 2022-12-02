---
title: ToastUI
group:
  title: ToastUI
nav:
  title: 组件
  path: /components
  order: 1
---

用来作为 Toast 展示自定义组件的 api，无自动关闭的功能，需要在弹出的自己的组件当中进行调用方法进行组件的卸载 props 会暴露卸载组件，即关闭自身弹窗的方法。

## 代码演示

<!-- <code src="./demo/index.tsx" /> -->

## 调用

`ToastUI.mineUI(nodes,props)`

## API

| 参数  | 说明                               | 类型  | 默认值 | 是否必填 |
| ----- | ---------------------------------- | ----- | ------ | -------- |
| nodes | 需要弹出的组件｜ React.Elements    | <></> | Y      |
| props | 组件所需的入参｜{unmount:()=>void} |

## valueProps

## 备注

- 顶部选中项文字和 `border-bottom` 颜色: `@alita-dform-radio-color`
