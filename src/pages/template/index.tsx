import { loadingStore } from '@/atom/atom';
import { alertFireSelector } from '@/atom/alertAtom';
import Dialog from '@/components/common/Dialog';
import MainLayout from '@/components/layouts/MainLayout';
import commonUtil from '@/utils/commonUtil';
import { NextPage } from 'next';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import PageTransition from '@/components/layouts/PageTransition';
import {
  MockPostResponse,
  useGetMockPost,
  usePostMockPost,
} from '@/services/mockPostService';
import Tooltip from '@/components/common/Tooltip';
import dynamic from 'next/dynamic';
import { NextPageWithLayout } from '../_app';

// const WordCloud = dynamic(() => import('@/components/common/WordCloud'));
const Template: NextPageWithLayout = () => {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const alertFire = useSetRecoilState(alertFireSelector);
  const setLoading = useSetRecoilState(loadingStore);

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
        life: 2000,
      },
      {
        message: `${commonUtil.getRandomEmoji()}동해물과 백두산이 마르고 삼천이 보전하세.`,
        type: 'success',
        life: 2000,
      },
      {
        message: `${commonUtil.getRandomEmoji()}동해물과 백두산이 마르고 삼천이 보전하세.`,
        type: 'warning',
        life: 2000,
      },
      {
        message: `${commonUtil.getRandomEmoji()}동해물과 백두산이 마르고 삼천이 보전하세.`,
        type: 'error',
        life: 2000,
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

  const tooltip = () => (
    <>
      <div>테스트1</div>
      <div>테스트2</div>
      <div>테스트3</div>
      <div>테스트4</div>
      <div>테스트5</div>
    </>
  );

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
    <div className="h-[100vh] w-full gap-2 overflow-y-auto">
      {/* <WordCloud
            width={1000}
            height={500}
            words="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lectus enim, commodo id consectetur nec, scelerisque sed purus. Praesent dapibus a ligula ut ultricies. Phasellus blandit bibendum nulla, eget pulvinar velit facilisis ut. Mauris scelerisque elit quis tellus interdum, ac dictum lorem fringilla. Praesent vitae nisl consequat, aliquet nisl eget, efficitur sapien. Cras vitae odio sagittis mi aliquet laoreet. Praesent eleifend purus nec eros eleifend faucibus. Sed posuere sagittis nisi ac fringilla. Nullam porttitor imperdiet mi quis molestie. Duis sit amet est posuere, pellentesque lectus non, sodales eros. Maecenas mattis dapibus libero, et imperdiet lorem luctus eget. Nam hendrerit eleifend pharetra. Integer iaculis erat in tortor volutpat cursus. Nunc ac leo mauris.
            Suspendisse et fringilla arcu. Suspendisse eu metus imperdiet lectus rhoncus porta vel bibendum erat. Morbi rutrum augue justo, ac auctor dolor placerat et. Nulla nec tortor sodales, pellentesque urna non, volutpat est. Mauris gravida lectus nisi, mollis mollis sapien sodales faucibus. Integer egestas mattis ligula, nec facilisis sapien consequat sit amet. Suspendisse potenti. Phasellus eros risus, mollis at velit eget, congue condimentum dolor. Donec enim risus, convallis eget turpis nec, sollicitudin rutrum elit. Suspendisse tincidunt ullamcorper lacus in hendrerit. Integer scelerisque fringilla turpis, a rhoncus enim interdum ut. Proin sed laoreet leo, sed sollicitudin est. Nullam nec mauris in velit rutrum dignissim non eu velit. Etiam turpis ex, mollis non mi in, mattis iaculis arcu.
            Vivamus odio tellus, auctor vehicula massa ut, tempor faucibus risus. Ut egestas purus quis lobortis vestibulum. Etiam orci tortor, maximus ut convallis ut, bibendum in mauris. Aenean a dui commodo, porta orci blandit, vehicula odio. Sed ut ex hendrerit, ultrices augue ac, elementum velit. Nunc placerat tempor nunc, id volutpat erat interdum et. Etiam ac dapibus ipsum. Donec a lectus quis orci porta tincidunt nec eget leo. Donec vitae augue fringilla, commodo erat viverra, laoreet magna. Vivamus aliquam egestas eros et auctor. In quis augue sodales ipsum fermentum sollicitudin. Fusce sagittis tellus finibus urna viverra dapibus. Aliquam erat volutpat. Integer efficitur lectus vel eros interdum placerat eu non enim. Donec at elit consectetur, egestas tellus vel, lobortis eros.
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis rutrum sodales urna, eu faucibus lacus ultricies a. Maecenas dapibus tristique dictum. Proin id eros massa. Morbi vel suscipit erat, venenatis porttitor tellus. Nunc tincidunt suscipit venenatis. Ut egestas, nulla sed tincidunt rutrum, velit dolor pellentesque dolor, vel tristique purus sem id ligula. Nullam quis massa lorem.
            In faucibus lectus justo, id consectetur enim pulvinar a. Vestibulum tellus purus, scelerisque quis malesuada eu, mattis vitae nulla. Nulla in condimentum augue, non maximus nulla. Integer id elit congue, tristique elit vel, malesuada lectus. Phasellus blandit ipsum non nulla placerat, ut sollicitudin mauris facilisis. Integer venenatis mollis mi. Suspendisse a sem euismod quam bibendum euismod. Etiam eget ante nec mauris pretium interdum. Suspendisse in aliquet turpis."
          /> */}
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
      <button type="button" className="btn" onClick={postRequest}>
        post
      </button>
      <Dialog ref={dialogRef} header="Dialog">
        테스트
      </Dialog>
      <Tooltip message={tooltip()}>
        <button type="button" className="btn">
          툴팁 테스트
        </button>
      </Tooltip>
      {/* <PostCard /> */}
    </div>
  );
};

Template.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Template;
