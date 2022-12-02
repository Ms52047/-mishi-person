/**
 * 弹窗组件
 * @author lx
 */
import React, { FC, useState, useEffect } from 'react';
import styles from './index.less';
import { CenterPopup } from 'antd-mobile-v5';
import { BjMobileUrl } from '@/services/requestUrl';
export interface OtherNet {
  onClose: () => void;
  unmount: () => void;
}

const ShopCar: FC<OtherNet> = ({ onClose, unmount }) => {
  console.log({ onClose }, '渲染组件挂载');

  const [visible, setVisible] = useState(true);
  const close = () => {
    onClose && onClose();
    unmount && unmount();
    setVisible(false);
  };
  return (
    <div className={styles.otherNet}>
      <CenterPopup
        visible={visible}
        style={{
          '--min-width': '6.6rem',
        }}
        onMaskClick={() => {
          close();
        }}
      >
        <div className={styles.myContent}>
          <div className={styles.title}>开通说明</div>
          <div className={styles.textContent}>目前权益超市Plus会员仅限北京移动用户</div>
          <div className={styles.btns}>
            <div
              className={styles.closeBtn}
              onClick={() => {
                close();
              }}
            >
              关闭
            </div>
            <div
              className={styles.goOut}
              onClick={() => {
                close();
                window.location.href = BjMobileUrl;
              }}
            >
              选号入网北京移动
            </div>
          </div>
        </div>
      </CenterPopup>
    </div>
  );
};

export default ShopCar;
