import { Button, IconButton } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

interface PaginationProps {
  total: number;
  active: number;
  setActive: Dispatch<SetStateAction<number>>;
}
/**
 * @param {PaginationProps} props
 * @returns {JSX.Element}
 * @description 페이지네이션 컴포넌트
 * 전체 컨텐츠의 total 값, 현재 페이지 number, 현재 페이지 set 함수가 필요합니다.
 */
export default function Pagination({
  total,
  active,
  setActive,
}: PaginationProps) {
  const [buttons, setButtons] = useState<number[]>([]);

  /**
   * @description 다음 버튼
   */
  const next = () => {
    if (active === total) return;
    setActive(active + 1);
  };

  /**
   * @description 이전 버튼
   */
  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
  };

  /**
   * @description 페이지 번호 생성
   */
  const makePageNumber = useCallback(() => {
    const arrayFromTotal = Array.from(
      { length: total },
      (_, index) => index + 1,
    );

    if (arrayFromTotal.length <= 5) {
      setButtons(arrayFromTotal);
      return;
    }
    if ([1, 2, 3].includes(active)) {
      setButtons([1, 2, 3, 4, 5]);
      return;
    }

    if ([total - 2, total - 1, total].includes(active)) {
      setButtons([total - 4, total - 3, total - 2, total - 1, total]);
      return;
    }

    setButtons([active - 2, active - 1, active, active + 1, active + 2]);
  }, [total, active]);

  useEffect(() => {
    makePageNumber();
  }, [active, makePageNumber]);

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {buttons.map((number) => (
          <IconButton
            key={number}
            variant="text"
            ripple={false}
            className={active === number ? 'text-lg font-bold' : ''}
            color="gray"
            onClick={() => setActive(number)}
          >
            {number}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={active === total}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
