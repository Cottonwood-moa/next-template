import { commonRequestGet } from '@/axios/axiosRequest';
import MainLayout from '@/components/layouts/MainLayout';
import PageTransition from '@/components/layouts/PageTransition';
import { MockPostResponse, MockPost } from '@/services/mockPostService';
import { isEmpty } from 'lodash';
import { useEffect, useRef } from 'react';
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
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

  const { data, size, setSize } = useSWRInfinite<MockPostResponse>(
    getKey,
    commonRequestGet,
    {
      revalidateFirstPage: false,
    },
  );

  const onScrollEvent = () => {
    const element = pageRef.current as HTMLElement;
    const { scrollTop, clientHeight, scrollHeight } = element;
    const isAtBottom =
      scrollTop + clientHeight >= scrollHeight || clientHeight === scrollHeight;

    if (isAtBottom) {
      setSize(size + 1);
    }
  };

  useEffect(() => {
    setSize(5);
  }, [setSize]);

  return (
    <MainLayout>
      <PageTransition>
        <div
          ref={pageRef}
          className="h-[calc(100vh-48px)] w-full overflow-y-auto p-4"
          onScroll={onScrollEvent}
        >
          <button type="button" className="btn" onClick={onScrollEvent}>
            클릭
          </button>
          {data &&
            data.map((postBatch) => (
              <div key={postBatch.skip}>
                {postBatch.posts.map((post: MockPost) => (
                  <div key={post.id}>
                    <div>{post.title}</div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </PageTransition>
    </MainLayout>
  );
}
