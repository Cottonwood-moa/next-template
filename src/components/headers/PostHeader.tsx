import { AnimatePresence, Reorder, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { Post } from '@/services/postService';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { visitedPostAtom } from '@/atom/postAtom';
import Svg from '../common/Svg';

type PostTabs = Pick<Post, 'id' | 'title'>;

interface PostTabProps {
  item: PostTabs;
  isSelected: boolean;
  onClick: () => void;
  onRemove: () => void;
}
/* post header 종속 컴포넌트 (post tab) */
export const PostTab = ({
  item,
  onClick,
  onRemove,
  isSelected,
}: PostTabProps) => (
  <Reorder.Item
    value={item}
    id={item.id}
    initial={{ opacity: 0, y: 30 }}
    animate={{
      opacity: 1,
      y: 0,
      transition: { duration: 0.15 },
    }}
    className={twMerge(
      'relative mx-1 flex h-[48px] w-full min-w-0 max-w-[1200px] flex-1 cursor-pointer select-none justify-between overflow-hidden rounded-t-xl bg-base-200 px-4',
      isSelected ? 'min-w-[300px] bg-base-100' : '',
    )}
    onClick={(event) => {
      event.stopPropagation();
      onClick();
    }}
  >
    <span
      className={twMerge(
        'mr-5 overflow-hidden overflow-ellipsis whitespace-nowrap',
        isSelected ? 'font-bold' : '',
      )}
    >
      {item.id} {item.title}
    </span>
    <div className="absolute right-3 top-[2px] flex flex-shrink-0 items-center justify-end">
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onRemove();
        }}
      >
        <Svg type="icon-close" />
      </button>
    </div>
  </Reorder.Item>
);

interface PostHeaderProps {
  currentPostId: string;
}
/* PostHeader Component */
export default function PostHeader({ currentPostId }: PostHeaderProps) {
  /* router */
  const router = useRouter();
  const [visitedPostList, setVisitedPostList] = useRecoilState(visitedPostAtom);
  /**
   * @description 해당 post로 이동한다.
   */
  const onClickPost = (item: PostTabs) => {
    router.push(item.id);
  };

  /**
   * @description onRemove 메소드에 사용 (filter function)
   */
  const removeItem = ([...arr]: PostTabs[], item: PostTabs) => {
    const removedList = arr.filter((post) => post.id !== item.id);
    return removedList;
  };

  /**
   * @description 열려있는 post tab 중 해당 item을 삭제한다.
   * 열려있는 post 가 없다면 home으로 이동한다.
   * 열려잇는 post를 닫는다면 list의 0번째 post로 이동한다.
   */
  const remove = (item: PostTabs) => {
    if (!item) return;
    const removedList = removeItem(visitedPostList, item);
    setVisitedPostList(removedList);
    if (removedList.length === 0) {
      router.push('/');
      return;
    }

    if (currentPostId === item.id) {
      router.push(removedList[0].id);
    }
  };

  useEffect(() => {}, [visitedPostList]);

  const closeAll = () => {
    setVisitedPostList([]);
    router.push('/');
  };
  return (
    <div className="relative grid w-full overflow-hidden rounded-sm rounded-bl-none rounded-br-none bg-base-300 p-2 pb-0">
      <Reorder.Group
        as="ul"
        axis="x"
        onReorder={setVisitedPostList}
        className="grow-1 flex w-full max-w-[1200px] flex-nowrap items-end justify-start pr-[10px]"
        values={visitedPostList}
      >
        <AnimatePresence initial={false}>
          {visitedPostList.map((item) => (
            <PostTab
              key={item.id}
              item={item}
              isSelected={currentPostId === item.id}
              onClick={() => onClickPost(item)}
              onRemove={() => remove(item)}
            />
          ))}
        </AnimatePresence>
      </Reorder.Group>
      <AnimatePresence>
        {visitedPostList.length > 1 && (
          <motion.button
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.2, delay: 0.2 },
            }}
            exit={{ opacity: 0, y: 100 }}
            className="btn absolute right-4 flex bg-base-100"
            type="button"
            onClick={closeAll}
          >
            <span>모두 닫기</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
