import { AnimatePresence, Reorder, motion } from 'framer-motion';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useLocalStorage } from '@react-hooks-library/core';
import { Post } from '@/services/postService';
import { useRouter } from 'next/router';
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
    initial={{ y: 1 }}
    className={twMerge(
      'relative mx-1 flex h-[24px] w-full min-w-0 max-w-[400px] flex-1 cursor-pointer select-none items-center justify-between overflow-hidden rounded-t-xl bg-base-200 p-4',
      isSelected ? 'bg-base-100' : '',
    )}
    onClick={(event) => {
      event.stopPropagation();
      onClick();
    }}
  >
    <motion.span
      layout="position"
      className={twMerge('line-clamp-1', isSelected ? 'text-lg font-bold' : '')}
    >{`${item.id}`}</motion.span>
    <motion.div className="absolute bottom-0 right-3 top-0 flex flex-shrink-0 items-center justify-end">
      <motion.button
        onClick={(event) => {
          event.stopPropagation();
          onRemove();
        }}
        initial={false}
      >
        <Svg type="icon-close" />
      </motion.button>
    </motion.div>
  </Reorder.Item>
);

interface PostHeaderProps {
  currentPost: PostTabs;
}
/* PostHeader Component */
export default function PostHeader({ currentPost }: PostHeaderProps) {
  /* router */
  const router = useRouter();
  /* localStorage sync hook */
  const [visitedPostList, setVisitedPostList] = useLocalStorage(
    'visitedPosts',
    [],
    {
      serialize: JSON.stringify,
      deserialize: JSON.parse,
    },
  );
  /* selected tab */
  const [selectedTab, setSelectedTab] = useState(currentPost.id);

  /**
   * @description 해당 post로 이동한다.
   */
  const onClickPost = (item: PostTabs) => {
    setSelectedTab(item.id);
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
   */
  const remove = (item: PostTabs) => {
    const removedList = removeItem(visitedPostList, item);
    setVisitedPostList(removedList);
    if (removedList.length === 0) {
      router.push('/');
      return;
    }

    if (selectedTab === item.id) {
      router.push(removedList[0].id);
    }
  };

  return (
    <nav className="grid w-full overflow-hidden rounded-sm rounded-bl-none rounded-br-none bg-base-300 p-2 pb-0">
      <Reorder.Group
        as="ul"
        axis="x"
        onReorder={setVisitedPostList}
        className="grow-1 flex w-full flex-nowrap items-end justify-start pr-[10px]"
        values={visitedPostList}
      >
        <AnimatePresence initial={false}>
          {visitedPostList &&
            visitedPostList.map((item) => (
              <PostTab
                key={item.id}
                item={item}
                isSelected={selectedTab === item.id}
                onClick={() => onClickPost(item)}
                onRemove={() => remove(item)}
              />
            ))}
        </AnimatePresence>
      </Reorder.Group>
    </nav>
  );
}
