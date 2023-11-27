import { loadingStore } from '@/atom/atom';
import { commonRequestGet } from '@/axios/axiosRequest';
import MainLayout from '@/components/layouts/MainLayout';
import PageTransition from '@/components/layouts/PageTransition';
import { MockPostResponse } from '@/services/mockPostService';
import commonUtil from '@/utils/commonUtil';
import { cloneDeep, debounce, isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { useRef, useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';

export default function Home() {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingStore);
  const pageRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);
  const [parsedPosts, setParsedPosts] = useState({
    limit: 0,
    total: 0,
    skip: 0,
    posts: [],
  });

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
    isLoading, // 최초 useSWRInfinite 이용 호출 시 또는 mutate 시?
    isValidating, // setSize로 추가 호출 시
  } = useSWRInfinite<MockPostResponse>(getKey, commonRequestGet, {
    revalidateFirstPage: false,
  });

  /**
   * @description scroll event
   * scroll 이 브라우저 최하단에 위치할 시 list를 추가 호출한다.
   */
  const onScrollEvent = useCallback(() => {
    // validating(불러오는 중)이면 return
    if (isValidating) return;
    // 잔여 posts 없을 시 return
    if (parsedPosts.posts.length === parsedPosts.total) return;
    // scroll bottom check 후 setSize 호출
    if (commonUtil.isScrollBottom(pageRef.current as HTMLElement)) {
      setSize((prev) => prev + 1);
    }
  }, [setSize, isValidating, parsedPosts]);

  /**
   * @description 최초 40개 세팅
   */
  useEffect(() => {
    if (isMounted.current) {
      setSize(4);
    }
    return () => {
      isMounted.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * @description 화면 확대 시 onScrollEvent 호출
   */
  useEffect(() => {
    const resizeHandler = debounce(() => {
      onScrollEvent();
    }, 200);
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, [onScrollEvent]);

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
   * @description SWR loading <-> page loading 추적.
   */
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  return (
    <MainLayout>
      <PageTransition>
        <div
          ref={pageRef}
          className="h-[calc(100vh-48px)] w-full overflow-y-auto p-4"
          onScroll={onScrollEvent}
        >
          <button
            type="button"
            className="btn"
            onClick={() => router.push('/template')}
          >
            go to Template
          </button>
          {parsedPosts?.posts.map((post) => (
            <div key={post.id}>
              <div>{post.id}</div>
            </div>
          ))}
        </div>
      </PageTransition>
    </MainLayout>
  );
}
