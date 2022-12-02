import { renderImperatively } from '@/utils/renderImRef';
import React, { ReactNode } from 'react';
export type ModalProps = Pick<
  any,
  | 'afterClose'
  | 'afterShow'
  | 'bodyClassName'
  | 'bodyStyle'
  | 'destroyOnClose'
  | 'disableBodyScroll'
  | 'forceRender'
  | 'getContainer'
  | 'maskClassName'
  | 'maskStyle'
  | 'stopPropagation'
  | 'visible'
> & {
  image?: string;
  header?: ReactNode;
  title?: ReactNode;
  content?: ReactNode;
  onClose?: () => void;
  closeOnAction?: boolean;
  closeOnMaskClick?: boolean;
  showCloseButton?: boolean;
};
export type ModalShowProps = Omit<ModalProps, 'visible' | 'destroyOnClose' | 'forceRender'>;

export type ModalShowHandler = {
  close: () => void;
};

export const closeFnSet = new Set<() => void>();

export function show(node: Function | ReactNode, props: { [key: string]: any }) {
  const handler: ModalShowHandler = renderImperatively(React.cloneElement(node, props));
  closeFnSet.add(handler.close);
  return handler;
}
