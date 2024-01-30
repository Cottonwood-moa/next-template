import { loadingStore } from '@/atom/atom';
import { commonRequestGet } from '@/axios/axiosRequest';
import PostCard from '@/components/common/PostCard';
import MainLayout from '@/components/layouts/MainLayout';
import { cloneDeep, isEmpty } from 'lodash';
import { useRef, useCallback, useEffect, useState, ReactElement } from 'react';
import { useSetRecoilState } from 'recoil';
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';
import { useScroll, useIntersectionObserver } from '@react-hooks-library/core';
import { AnimatePresence, motion } from 'framer-motion';
import Svg from '@/components/common/Svg';
import { useLocalStorage, useUpdateEffect } from 'usehooks-ts';
import { twMerge } from 'tailwind-merge';
import { alertFireSelector } from '@/atom/alertAtom';
import { MockPostResponse } from '@@/services/mockPostService.model';

export default function Home() {
  /* Loading */
  const setLoading = useSetRecoilState(loadingStore);
  /* pageRef */
  const pageRef = useRef<HTMLDivElement>(null);
  /* mount flag value */
  const isMounted = useRef(false);
  /* Infinite scroll flag ref */
  const scrollTriggerRef = useRef(null);
  /* scroll value */
  const [scroll, setScroll] = useState({ y: 0 });
  useScroll(pageRef, ({ scrollY }) => setScroll({ y: scrollY }));
  /* 최초 진입 시의 validating 인지 체크 용도 */
  const [isEndFirstValidate, setIsEndFirstValidate] = useState(false);
  /* layout  */
  const [storageLayout, setStorageLayout] = useLocalStorage('layout', true);
  const [layout, setLayout] = useState(true);

  /* alertStore */
  const alertFire = useSetRecoilState(alertFireSelector);
  /* 
    for render. 
    posts 에 데이터 쌓임.
    limit, total, skip은 마지막 요청 기준으로 업데이트 됨.  
  */
  const [parsedPosts, setParsedPosts] = useState({
    limit: 0,
    total: 0,
    skip: 0,
    posts: [],
  });
  /* 
    Infinite Scroll 위한 hook
    제공된 ref 가 viewPort에 들어오면 inView 가 true가 되고 벗어나면 false.
  */
  const { inView: isScrollTriggerRefInView } = useIntersectionObserver(
    scrollTriggerRef,
    {
      threshold: 1,
    },
  );

  /**
   * @description useSWRInfinite에 제공할 API 호출 주소 반환.
   */
  const getKey: SWRInfiniteKeyLoader = (
    pageIndex: number,
    previousPageData: MockPostResponse,
  ) => {
    if (previousPageData && pageIndex === 0) return null;
    if (previousPageData && isEmpty(previousPageData?.posts)) return null;
    return `${process.env.NEXT_PUBLIC_DUMMY}/posts?limit=${10}&skip=${
      pageIndex * 10
    }`;
  };

  /**
   * @description mock post list  호출.
   * https://swr.vercel.app/docs/pagination
   */
  const {
    data,
    size: _size,
    setSize,
    isLoading,
    isValidating,
  } = useSWRInfinite<MockPostResponse>(getKey, commonRequestGet, {
    revalidateFirstPage: false,
    initialSize: 1,
  });

  /**
   * @description layout을 변경한다.
   */
  const onClickLayoutTest = () => {
    setStorageLayout((prev) => !prev);
  };

  /**
   * @description 스크롤을 위로 올린다.
   */
  const onClickScrollUp = () => {
    pageRef.current.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  /**
   * @description post 데이터 세팅.
   */
  useEffect(() => {
    if (isEmpty(data)) return;
    let posts = [];
    const chore = {
      limit: 10,
      skip: 0,
      total: 0,
    };
    data.forEach((postBatch, idx: number) => {
      posts = [...posts, ...cloneDeep(postBatch.posts)];
      if (idx === data.length - 1) {
        chore.limit = postBatch.limit;
        chore.skip = postBatch.skip;
        chore.total = postBatch.total;
      }
    });

    setParsedPosts({
      ...chore,
      posts,
    });
  }, [data]);

  /**
   * @description scroll event
   * scroll 이 브라우저 최하단에 위치할 시 list를 추가 호출한다.
   * early return 조건
   * 1. isValidationg -> setSize로 swr 추가 호출할 경우 true
   * 2. post 갯수가 total에 도달했을 경우.
   */
  const fetchNextList = useCallback(async () => {
    if (isValidating) return;
    if (parsedPosts.posts.length === parsedPosts.total) return;
    await setSize((prev) => prev + 1);
  }, [setSize, isValidating, parsedPosts]);

  useEffect(() => {
    setLayout(storageLayout);
  }, [storageLayout]);

  /**
   * @description scroll change -> sessionStorage 저장.
   */
  useEffect(() => {
    if (!isMounted.current) return;
    sessionStorage.setItem('post_list_scroll_height', String(scroll.y));
  }, [scroll]);

  /**
   * @description 최초 진입 시 scroll restoration.
   */
  useEffect(() => {
    const scrollY = Number(sessionStorage.getItem('post_list_scroll_height'));
    setTimeout(() => {
      // 왜 인지 모르겠지만 실제 scroll 가능한 height와 pageRef.current.scrollHeight 간에 900px 정도의 차이가 있음
      // 그래서 -900으로 안맞춰주면 다른 페이지 이동 후 되돌아 왔을 때 스크롤이 정확이 restoration 되지 않음.
      if (!pageRef) return;
      const pageRefScrollHeight = pageRef.current.scrollHeight - 900;
      const toHeight = pageRefScrollHeight * scrollY;
      pageRef.current.scrollTo({
        top: toHeight,
        behavior: 'smooth',
      });
    }, 200);
  }, []);

  /**
   * @description list 추가 호출 직후 scrollY 업데이트를 위한 트리거.
   * 100ms 간격으로 3번 업데이트 함.
   */
  useEffect(() => {
    setLoading(isValidating);
    // mount 되지 않았다면 return 한다.
    if (!isMounted.current) return;
    // validating (setSize 종속 로딩 / 최초 진입에도 로딩됨)중이라면 return 한다.
    if (isValidating) return;
    // 최초 진입으로 validating 중이라면 return 한다. (최초에는 session에 저장되어 있는 scroll 을 적용해야하는데 아래로 덮어씌워지기 떄문.)
    if (!isEndFirstValidate) {
      setIsEndFirstValidate(true);
      return;
    }
    Array.from({ length: 3 }).forEach((_, idx) => {
      setTimeout(
        () => {
          pageRef.current.scrollTop -= 0.001;
        },
        (idx + 1) * 100,
      );
    });
  }, [isValidating]);

  /**
   * @description scrollTriggerRef 가 viewPort에 들어올 시 다음 list 호출.
   */
  useEffect(() => {
    if (isScrollTriggerRefInView) {
      fetchNextList();
    }
  }, [isScrollTriggerRefInView]);

  /**
   * @description mount 여부 flag value 할당.
   */
  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  /**
   * @description SWR loading <-> page loading 추적.
   */
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  return (
    <div
      ref={pageRef}
      className="flex h-[calc(100vh-50px)] w-full flex-col items-center overflow-y-scroll bg-base-100 p-8 "
    >
      {/* 스크롤 up */}
      <AnimatePresence>
        {scroll.y > 0 && (
          <motion.div
            initial={{ rotate: 180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 180, scale: 0 }}
            whileHover={{
              scale: 1.04,
            }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              duration: 0.2,
            }}
            typeof="button"
            className="fixed bottom-4 right-4 z-20 flex cursor-pointer items-center justify-center rounded-2xl bg-primary p-4 opacity-80"
            onClick={onClickScrollUp}
          >
            <Svg type="icon-arrow-up" className="stroke-primary-content" />
          </motion.div>
        )}
      </AnimatePresence>
      {/* 상단 배너 */}
      <div className="flex w-full justify-center">
        <motion.div
          layout
          initial={{ y: -300 }}
          animate={{ y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 220,
            damping: 20,
          }}
          className="mb-8 h-80 flex-1 bg-slate-900"
        >
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button type="button" className="btn" onClick={onClickLayoutTest}>
            <Svg type="icon-moon" />
          </button>
        </motion.div>
      </div>
      {/* Post list */}
      <div
        className={twMerge(
          layout
            ? 'testgrid grid w-full max-w-[2000px] grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
            : 'testlist grid w-full max-w-[2000px] grid-cols-1 gap-12',
        )}
      >
        {parsedPosts?.posts.map((post) => (
          <div
            key={post.id}
            className="flex w-full items-center justify-center"
          >
            <PostCard
              id={post.id}
              type={layout ? 'grid' : 'list'}
              title={post.title}
              body={post.body}
            />
          </div>
        ))}
      </div>
      <div ref={scrollTriggerRef} className="opacity-1 h-10 w-full opacity-0" />
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
