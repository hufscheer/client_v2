import { ChatIcon } from '@hcc/icons';
import { Icon, Tooltip } from '@hcc/ui';
import { ButtonHTMLAttributes, useEffect, useState, MouseEvent } from 'react';

import * as styles from './CheerTalkEntryButton.css';

const CheerTalkEntryButton = ({
  onClick: parentOnClick,
  ...buttonProps
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const [isCheerTalkTooltipVisible, setIsCheerTalkTooltipVisible] =
    useState(true);

  useEffect(() => {
    const storedValue = window.localStorage.getItem('cheertalk');
    if (storedValue) {
      setIsCheerTalkTooltipVisible(JSON.parse(storedValue));
    }
  }, []);

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    setIsCheerTalkTooltipVisible(false);
    window.localStorage.setItem('cheertalk', JSON.stringify(false));
    if (parentOnClick) parentOnClick(event);
  };

  return (
    <div className={styles.cheerTalkEntryContainer}>
      <Tooltip
        content="당신의 팀을 응원하는 톡을 남겨보세요!"
        position="top"
        isVisible={isCheerTalkTooltipVisible}
        arrowPosition="rightEnd"
      >
        <div className={styles.cheerTalkEntryButtonContent}>
          <button
            className={styles.cheerTalkEntryButton}
            {...buttonProps}
            onClick={handleButtonClick}
          >
            <Icon
              source={ChatIcon}
              className={styles.cheerTalkEntryButtonIcon}
            />
          </button>
        </div>
      </Tooltip>
    </div>
  );
};

export default CheerTalkEntryButton;
