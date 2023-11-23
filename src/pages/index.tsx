import MainLayout from '@/components/layouts/MainLayout';
import PageTransition from '@/components/layouts/PageTransition';
import { useGetMockPost, usePostMockPost } from '@/services/postService';
import commonUtil from '@/utils/commonUtil';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const { data, isLoading, mutate } = useGetMockPost();
  const { res,  mutation } = usePostMockPost();

  const handleClick = () => {
    router.push('/template');
  };

  const postRequest = () => {
    const newPost = {
      "id": commonUtil.randomNumber(2),
      "title": `${commonUtil.randomNumber(2)} post`,
      "content": "post 내용"
    }
    mutation(newPost)
    console.log('하이킥 res', res);
    mutate([...data, newPost])
  }

  useEffect(() => {
    console.log('하이킥 data', data, isLoading);
  }, [data]);

  return (
    <MainLayout>
      <PageTransition>
        <div className="h-full min-h-[100vh] w-full overflow-y-auto">
          {!isEmpty(data) && data.posts.map((post) => <div key={post.id}>{post.id}</div>)}
          {process.env.NEXT_PUBLIC_TAG}
          <button type="button" className="btn" onClick={handleClick}>
            template
          </button>
          <button type="button" className="btn" onClick={() =>  mutate({...data})}>
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
