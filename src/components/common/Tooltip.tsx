import commonUtil from '@/utils/commonUtil';
import ReactTooltip from 'react-tooltip';
import { useEffect, useState } from 'react';
import { TooltipProps } from '@@/components/common/tooltip.model';

export default function Tooltip({
  message,
  children,
  type = 'dark',
  direction = 'top',
  effect = 'solid',
}: TooltipProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [randomId, setRandomId] = useState('id');
  useEffect(() => {
    setIsMounted(true);
    setRandomId(commonUtil.randomString(12));
  }, []);

  return (
    <>
      <div className="h-fit w-fit" data-for={randomId} data-tip>
        {children}
      </div>
      {isMounted && (
        <ReactTooltip
          id={randomId}
          aria-haspopup="true"
          place={direction}
          type={type}
          effect={effect}
        >
          {message}
        </ReactTooltip>
      )}
    </>
  );
}
