import useLocalStorageWithSync from '@/hooks/useLocalStorageWithSync';
import { AnimatePresence, Reorder, motion } from 'framer-motion';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

export interface Ingredient {
  icon: string;
  label: string;
}

export const allIngredients = [
  { icon: '🍅', label: 'Tomato' },
  { icon: '🥬', label: 'Lettuce' },
  { icon: '🧀', label: 'Cheese' },
  { icon: '🥕', label: 'Carrot' },
  { icon: '🍌', label: 'Banana' },
  { icon: '🫐', label: 'Blueberries' },
  { icon: '🥂', label: 'Champers?' },
];

const [tomato, lettuce, cheese] = allIngredients;
export const initialTabs = [tomato, lettuce, cheese];

export function getNextIngredient(
  ingredients: Ingredient[],
): Ingredient | undefined {
  const existing = new Set(ingredients);
  return allIngredients.find((ingredient) => !existing.has(ingredient));
}

export function removeItem<T>([...arr]: T[], item: T) {
  const index = arr.indexOf(item);
  index > -1 && arr.splice(index, 1);
  return arr;
}

export function closestItem<T>(arr: T[], item: T) {
  const index = arr.indexOf(item);
  if (index === -1) {
    return arr[0];
  }
  if (index === arr.length - 1) {
    return arr[arr.length - 2];
  }
  return arr[index + 1];
}

interface Props {
  item: Ingredient;
  isSelected: boolean;
  onClick: () => void;
  onRemove: () => void;
}

export const Tab = ({ item, onClick, onRemove, isSelected }: Props) => (
  <Reorder.Item
    value={item}
    id={item.label}
    initial={{ opacity: 0, y: 30 }}
    animate={{
      opacity: 1,
      backgroundColor: isSelected ? '#f3f3f3' : '#fff',
      y: 0,
      transition: { duration: 0.15 },
    }}
    exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
    whileDrag={{ backgroundColor: '#e3e3e3' }}
    className={twMerge(
      isSelected ? 'selected' : '',
      'relative flex h-[24px] w-full min-w-0 flex-1 cursor-pointer select-none items-center justify-between overflow-hidden rounded-sm bg-white p-4',
    )}
    onPointerDown={onClick}
  >
    <motion.span layout="position">{`${item.icon} ${item.label}`}</motion.span>
    <motion.div
      layout
      className="absolute bottom-0 right-3 top-0 flex flex-shrink-0 items-center justify-end"
    >
      <motion.button
        onPointerDown={(event) => {
          event.stopPropagation();
          onRemove();
        }}
        initial={false}
        animate={{ backgroundColor: isSelected ? '#e3e3e3' : '#fff' }}
      >
        닫기
      </motion.button>
    </motion.div>
  </Reorder.Item>
);

/* Componnet */
export default function PostHeader() {
  const [visitedPostList] = useLocalStorageWithSync('visitedPosts');

  const [tabs, setTabs] = useState(initialTabs);
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const remove = (item: Ingredient) => {
    if (item === selectedTab) {
      setSelectedTab(closestItem(tabs, item));
    }

    setTabs(removeItem(tabs, item));
  };

  const add = () => {
    const nextItem = getNextIngredient(tabs);

    if (nextItem) {
      setTabs([...tabs, nextItem]);
      setSelectedTab(nextItem);
    }
  };

  return (
    <div className=" flex h-44 w-full flex-col overflow-hidden bg-amber-700">
      <nav className="grid h-[44px] w-full overflow-hidden rounded-sm rounded-bl-none rounded-br-none border-red-600 bg-white p-2">
        <Reorder.Group
          as="ul"
          axis="x"
          onReorder={setTabs}
          className="grow-1 flex w-full flex-nowrap items-end justify-start pr-[10px]"
          values={tabs}
        >
          <AnimatePresence initial={false}>
            {tabs.map((item) => (
              <Tab
                key={item.label}
                item={item}
                isSelected={selectedTab === item}
                onClick={() => setSelectedTab(item)}
                onRemove={() => remove(item)}
              />
            ))}
          </AnimatePresence>
        </Reorder.Group>
      </nav>
    </div>
  );
}
