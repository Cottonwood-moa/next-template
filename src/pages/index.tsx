import MainLayout from '@/components/layouts/MainLayout';
import PageTransition from '@/components/layouts/PageTransition';
import {
  useGetMockPost,
  usePostMockPost,
  MockPost,
  MockPostResponse,
} from '@/services/mockPostService';
import commonUtil from '@/utils/commonUtil';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const { data: postResponse, mutate: getPost } = useGetMockPost();
  const { data: addPostRes, mutation: addPost } = usePostMockPost();

  const handleClick = () => {
    router.push('/template');
  };

  const postRequest = () => {
    const newPost: MockPost = {
      userId: commonUtil.randomNumber(2),
      title: `${commonUtil.randomNumber(2)} post`,
      body: 'post 내용',
    };
    addPost(newPost);
  };

  useEffect(() => {}, [addPostRes, getPost]);

  return (
    <MainLayout>
      <PageTransition>
        <div className="h-full min-h-[100vh] w-full overflow-y-auto">
          {!isEmpty(postResponse) &&
            postResponse.posts.map((post) => (
              <div key={post.id}>{post.id}</div>
            ))}
          {process.env.NEXT_PUBLIC_TAG}
          <button type="button" className="btn" onClick={handleClick}>
            template
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => getPost({ ...(postResponse as MockPostResponse) })}
          >
            mutate
          </button>
          <button type="button" className="btn" onClick={postRequest}>
            post
          </button>
        </div>
      </PageTransition>
    </MainLayout>
  );
}
