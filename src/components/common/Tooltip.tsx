import commonUtil from '@/utils/commonUtil';
import ReactTooltip from 'react-tooltip';

interface TooltipProps {
  message: JSX.Element | React.ReactNode | string;
  children: React.ReactNode;
  type?: 'dark' | 'light' | 'success' | 'warning' | 'info' | 'error';
  direction?: 'top' | 'right' | 'left' | 'bottom';
  effect?: 'solid' | 'float';
}

export default function Tooltip({
  message,
  children,
  type = 'dark',
  direction = 'top',
  effect = 'solid',
}: TooltipProps) {
  const randomId = commonUtil.randomString(20);
  return (
    <>
      <div className="h-fit w-fit" data-for={randomId} data-tip>
        {children}
      </div>
      <ReactTooltip
        id={randomId}
        aria-haspopup="true"
        place={direction}
        type={type}
        effect={effect}
      >
        {message}
      </ReactTooltip>
    </>
  );
}
