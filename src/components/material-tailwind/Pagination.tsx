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
  // maxVisible?: number;
  active: number;
  setActive: Dispatch<SetStateAction<number>>;
}

export default function Pagination({
  total,
  // maxVisible,
  active,
  setActive,
}: PaginationProps) {
  const [buttons, setButtons] = useState<number[]>([]);

  const next = () => {
    if (active === total) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  const makeButtons = useCallback(() => {
    const arrayFromTotal = Array.from(
      { length: total },
      (_, index) => index + 1,
    );
    setButtons(arrayFromTotal);
  }, [total]);

  useEffect(() => {
    makeButtons();
  }, [active, makeButtons]);

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
            variant={active === number ? 'filled' : 'text'}
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
        disabled={active === 5}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}

/* Pagination.defaultProps = {
  maxVisible: 5,
}; */
