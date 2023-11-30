import { loadingStore } from '@/atom/atom';
import { commonRequestGet } from '@/axios/axiosRequest';
import PostCard from '@/components/common/PostCard';
import MainLayout from '@/components/layouts/MainLayout';
import SideMenu from '@/components/menu/SideMenu';
import { MockPostResponse } from '@/services/mockPostService';
import { cloneDeep, isEmpty } from 'lodash';
import { useRef, useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';
import { useScroll, useIntersectionObserver } from '@react-hooks-library/core';

export default function Home() {
  const setLoading = useSetRecoilState(loadingStore);
  const pageRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);
  const scrollTriggerRef = useRef(null);
  const [scroll, setScroll] = useState({ y: 0 });

  useScroll(pageRef, ({ scrollY }) => setScroll({ y: scrollY }));

  const [parsedPosts, setParsedPosts] = useState({
    limit: 0,
    total: 0,
    skip: 0,
    posts: [],
  });
  const { inView: isScrollTriggerRefInView } = useIntersectionObserver(
    scrollTriggerRef,
    {
      threshold: 0.5,
    },
  );
  /**
   * @description useSWRInfinite에 제공할 API 호출 주소를 반환한다.
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
   * @description mock post list  호출
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
    initialSize: 2,
  });

  /**
   * @description post 데이터 세팅
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

  /**
   * @description scrollTriggerRef 가 viewPort에 들어올 시 다음 list 호출.
   */
  useEffect(() => {
    if (isScrollTriggerRefInView) {
      fetchNextList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScrollTriggerRefInView]);

  useEffect(() => {
    if (!isMounted.current) return;
    sessionStorage.setItem('post_list_scroll_height', String(scroll.y));
  }, [scroll]);

  useEffect(() => {
    const scrollY = Number(sessionStorage.getItem('post_list_scroll_height'));
    setTimeout(() => {
      const pageRefScrollHeight = pageRef.current.scrollHeight;
      const toHeight = pageRefScrollHeight * scrollY;
      console.log(
        '하이킥 scrollY',
        scrollY,
        pageRef.current.clientHeight,
        pageRef.current.offsetHeight,
        pageRef.current.scrollHeight,
        toHeight,
      );
      pageRef.current.scrollTo({
        top: toHeight,
        behavior: 'smooth',
      });
    }, 200);
  }, []);

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
    <MainLayout side={<SideMenu />}>
      <div
        ref={pageRef}
        className="h-[calc(100vh-48px)] w-full overflow-y-scroll bg-base-100 p-4"
      >
        <div className="grid w-full grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {parsedPosts?.posts.map((post) => (
            <div
              key={post.id}
              className="flex w-full items-center justify-center"
            >
              <PostCard id={post.id} />
            </div>
          ))}
        </div>
        <div
          ref={scrollTriggerRef}
          className="opacity-1 h-10 w-full bg-red-400 opacity-0"
        />
      </div>
    </MainLayout>
  );
}
