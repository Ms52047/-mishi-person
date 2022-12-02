import React, { FC, useState, useEffect } from 'react';
import { connect, ConnectProps, plusModelState } from 'alita';
import Static from './static';
import { useSessionStorageState } from 'ahooks';
import styles from './index.less';
import jumpBtn from '@/assets/img/yindao/jumpBtn.png';
import { getUserInfo } from '@/utils/tool';
import { memberUpdate } from '@/services/myServices';

interface GuideProps extends ConnectProps {
  plus?: plusModelState;
  pageType:
    | 'goldVip'
    | 'xxVip'
    | 'plusVip'
    | 'goldIndex'
    | 'jtIndex'
    | 'xxIndex'
    | 'plusIndex'
    | 'xxDong'
    | 'goldDong'
    | 'plusDong';
  onClose: () => void;
  unmount: () => void;
}

const Guide: FC<GuideProps> = ({ onClose, unmount, dispatch, plus, pageType = 'plusIndex' }) => {
  let isOpen = {
    index: false,
    xxvip: false,
    plusvip: false,
    goldvip: false,
    xxDong: false,
    goldDong: false,
    plusDong: false,
  };
  // const userInfo = getUserInfo()

  const [userInfo, setUserInfo] = useSessionStorageState<string | any>('userInfo', {
    defaultValue: sessionStorage.getItem('userInfo'),
  });

  const { remark = isOpen } = userInfo?.memberInfo || {}; // 配置

  console.log('属性', typeof remark == 'object', typeof JSON.stringify(remark) == 'object');

  const [index, setIndex] = useState(0);
  const [chooseData, setChooseData] = useState<any>([]);
  const [showOver, setShowOver] = useState(true);
  const [limit, setLimit] = useState(true); // 节流
  const [typeOpen, setTypeOpen] = useState('');

  useEffect(() => {
    setChooseData(Static[pageType]);
  }, [pageType]);

  useEffect(() => {
    if (index >= chooseData.length && index !== 0) {
      over();
    }
  }, [index]);

  useEffect(() => {
    switch (pageType) {
      case 'goldIndex':
      case 'plusIndex':
      case 'xxIndex':
      case 'jtIndex':
        setTypeOpen('index');
        break;
      case 'goldVip':
        setTypeOpen('goldvip');
        break;
      case 'plusVip':
        setTypeOpen('plusvip');
        break;
      case 'xxVip':
        setTypeOpen('xxvip');
        break;
      case 'xxDong':
        setTypeOpen('xxDong');
        break;
      case 'goldDong':
        setTypeOpen('goldDong');
        break;
      case 'plusDong':
        setTypeOpen('plusDong');
        break;
      default:
        break;
    }
  }, [pageType]);

  useEffect(() => {
    if (!sessionStorage.getItem('sessKey')) {
      unmount && unmount();
      return;
    }
  }, []);

  useEffect(() => {
    if (typeof remark !== 'object') {
      if (JSON.parse(remark)[typeOpen]) {
        unmount && unmount();
      }
    } else {
      if (remark[typeOpen]) {
        unmount && unmount();
      }
    }
  }, [typeOpen]);

  const add = () => {
    if (limit) {
      setIndex((e) => ++e);
      setLimit(false);
      setTimeout(() => {
        setLimit(true);
      }, 500);
    }
  };

  const over = () => {
    onClose && onClose();
    unmount && unmount();
    setShowOver(false);
    let NewRemark = {};
    if (typeof remark !== 'object') {
      NewRemark = {
        ...JSON.parse(remark),
        [typeOpen]: true,
      };
    } else {
      NewRemark = {
        ...remark,
        [typeOpen]: true,
      };
    }
    memberUpdate({
      memberGuideInfo: JSON.stringify(NewRemark),
    }).then((res: any) => {
      const { resultCode } = res;
      if (resultCode === '0') {
        setUserInfo({
          ...userInfo,
          memberInfo: {
            ...userInfo.memberInfo,
            remark: JSON.stringify(NewRemark),
          },
        });
      }
    });
    setIndex(chooseData.length);
  };

  return (
    <div className={styles.Guide} style={{}}>
      <img className={styles.over} onClick={over} hidden={!showOver} src={jumpBtn} alt="" />
      {chooseData?.map((item: any, inedxNum: any) => (
        <div
          key={`imgs_${inedxNum}`}
          className={styles.imgs}
          onClick={add}
          style={{
            display: index != inedxNum ? 'none' : '',
            background: `url(${item}) no-repeat center/ 100% 100%`,
          }}
        ></div>
      ))}
    </div>
  );
};
export default Guide;
// export default connect(({ plus }: { plus: plusModelState }) => ({ plus }))(Guide);
