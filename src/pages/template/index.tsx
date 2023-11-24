import { loadingStore } from '@/atom/atom';
import { alertFireSelector } from '@/atom/alertAtom';
import Dialog from '@/components/common/Dialog';
import MainLayout from '@/components/layouts/MainLayout';
import commonUtil from '@/utils/commonUtil';
import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import PageTransition from '@/components/layouts/PageTransition';
import {
  MockPostResponse,
  useGetMockPost,
  usePostMockPost,
} from '@/services/mockPostService';
import ReactTooltip from 'react-tooltip';
import useIsMounted from '@/hooks/useIsMounted';

const Template: NextPage = () => {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [test, setTest] = useState('테스트');
  const alertFire = useSetRecoilState(alertFireSelector);
  const setLoading = useSetRecoilState(loadingStore);
  const isMounted = useIsMounted();
  /**
   * @description post list (get)
   */
  const {
    data: postResponse,
    isLoading: _postListLoading,
    mutate: getPost,
  } = useGetMockPost({ test });

  /**
   * @description add post (post)
   */
  const {
    data: addPostRes,
    error,
    isLoading: _addPostLoading,
    mutation: addPost,
  } = usePostMockPost();

  /**
   * @description add Alert Event handler
   */
  const addAlert = () => {
    alertFire([
      {
        message: `${commonUtil.getRandomEmoji()}동해물과 백두산이 마르고 삼천이 보전하세.`,
        type: 'info',
        life: 40000,
      },
      {
        message: `${commonUtil.getRandomEmoji()}동해물과 백두산이 마르고 삼천이 보전하세.`,
        type: 'success',
        life: 40000,
      },
      {
        message: `${commonUtil.getRandomEmoji()}동해물과 백두산이 마르고 삼천이 보전하세.`,
        type: 'warning',
        life: 40000,
      },
      {
        message: `${commonUtil.getRandomEmoji()}동해물과 백두산이 마르고 삼천이 보전하세.`,
        type: 'error',
        life: 40000,
      },
    ]);
  };

  /**
   * @description go to home
   */
  const handleClick = () => {
    router.push('/');
  };

  /**
   * @description go to post
   */
  const onClickPost = () => {
    router.push('/post/1');
  };

  /**
   * @description add Post Event handler
   */
  const postRequest = () => {
    const newPost = {
      userId: commonUtil.randomNumber(2),
      title: `${commonUtil.randomNumber(2)} post`,
      body: 'post 내용',
    };
    addPost(newPost);
  };

  /**
   * @description add Post result detector
   */
  useEffect(() => {
    if (error) {
      alertFire([
        {
          message: '포스트 등록 요청 중 에러가 발생했습니다.',
          type: 'error',
        },
      ]);
    }

    if (addPostRes) {
      alertFire([
        {
          message: '포스트를 등록하였습니다.',
          type: 'info',
        },
      ]);
    }
  }, [addPostRes, error, alertFire]);

  return (
    <MainLayout>
      <PageTransition>
        <div className="h-full min-h-[100vh] w-full gap-2 overflow-y-auto">
          <button type="button" className="btn" onClick={handleClick}>
            /
          </button>
          <button type="button" className="btn" onClick={onClickPost}>
            /post
          </button>
          <button
            type="button"
            className="btn font-gugi"
            onClick={() => dialogRef?.current?.showModal()}
          >
            open modal
          </button>
          <button type="button" className="btn" onClick={addAlert}>
            Alert 추가
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
              }, 2000);
            }}
          >
            Loading on/off
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
          <button
            type="button"
            className="btn"
            onClick={() => setTest(commonUtil.randomString(12))}
          >
            test
          </button>
          <ReactTooltip type="error">tooltip</ReactTooltip>
          <Dialog ref={dialogRef} header="Dialog">
            테스트
          </Dialog>
          {/* <PostCard /> */}
        </div>
      </PageTransition>
    </MainLayout>
  );
};

export default Template;
