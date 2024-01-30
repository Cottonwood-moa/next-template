import MainLayout from '@/components/layouts/MainLayout';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { motion } from 'framer-motion';
import { useScroll } from '@react-hooks-library/core';
import { ReactElement, useEffect, useRef, useState } from 'react';
import PostHeader from '@/components/headers/PostHeader';
import commonUtil from '@/utils/commonUtil';
import { useRecoilState } from 'recoil';
import { visitedPostAtom } from '@/atom/postAtom';
import { PostProps } from '@@/pages/post/post.model';

export default function PostDetailPage({ id, title, body }: PostProps) {
  const [visitedPostList, setVisitedPostList] = useRecoilState(visitedPostAtom);
  const pageRef = useRef();
  const [_scroll, setScroll] = useState({ y: 0 });
  useScroll(pageRef, ({ scrollY }) => setScroll({ y: scrollY }));

  useEffect(() => {
    if (!id) return;
    const checkExist = visitedPostList.some((post) => post.id === id);
    if (!checkExist) {
      setVisitedPostList((prev) => [...prev, { id, title }]);
    }
  }, [id]);
  // -translate - y - 14;
  return (
    <motion.div>
      <PostHeader currentPostId={id} />
      <div
        ref={pageRef}
        className="relative z-10 flex h-[calc(100vh-100px)] w-full -translate-y-4 transform flex-col items-center overflow-y-auto bg-base-100 px-48 pb-48 pt-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: -14 }}
          className="bg-base-100"
        >
          <div>{title}</div>
          <div>{body}</div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps: GetStaticProps = async (
  ctx: GetStaticPropsContext,
) => {
  console.log('하이킥 ctx', ctx);
  return {
    props: {
      id: ctx.params?.id,
      title: commonUtil.randomString(40),
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabiturfacilisis vel risus at aliquet. Etiam fringilla vehicula libero.vehicula in lectus at sollicitudin. Suspendisse pretium eumetus vel rutrum. Aliquam vitae accumsan dolor. Aliquam at elementum
      leo. Nullam non quam quis turpis malesuada lobortis. Nullam elit
      lorem, vestibulum condimentum viverra vitae, pretium ut velit. Ut
      orci nunc, luctus nec nunc sed, lobortis feugiat nisi. Maecenas
      tempor consectetur purus ut semper. Aliquam erat volutpat.Donec
      feugiat eu arcu non pretium. Interdum et malesuada fames ac ante
      ipsum primis in faucibus. Phasellus ultricies mattis orci eget
      rhoncus. Sed fringilla nibh ac facilisis accumsan. Phasellus eros
      felis, faucibus vitae felis in, tempor maximus lacus. Suspendisse
      potenti. In hac habitasse platea dictumst. Sed nec orci tristique,
      ultricies augue sed, iaculis nisl.Quisque ut ullamcorper elit. In
      porta eros nisi, in rutrum odio accumsan et. Mauris feugiat, tortor
      at porttitor molestie, felis ex vulputate odio, viverra vehicula
      magna metus sit amet lacus. Nunc scelerisque nec purus ac sagittis.
      Mauris viverra id erat quis sollicitudin. Nulla pharetra odio in
      ipsum porttitor, in vestibulum massa commodo. Nulla tellus augue,
      lacinia vel molestie ac, rhoncus sollicitudin eros. Pellentesque
      hendrerit mi at dolor pellentesque dapibus. In pellentesque
      vulputate diam, et venenatis nunc. Ut volutpat tincidunt pulvinar.
      Phasellus nec pulvinar tortor.Fusce faucibus ut nulla eu vestibulum.
      Donec imperdiet lobortis nisl, vel scelerisque nunc finibus ut.
      Quisque a ante tellus. Fusce sed consequat risus. Phasellus et lorem
      ultricies, tincidunt est sit amet, dapibus risus. Nam at hendrerit
      sapien, gravida tincidunt lacus. Cras tincidunt vitae metus nec
      tincidunt. Vivamus gravida eu tortor sed efficitur. Sed nec mauris
      sed neque fermentum blandit. Donec sit amet erat id libero feugiat
      tristique. Morbi nec varius diam. Suspendisse ac pulvinar mauris,
      nec viverra risus.Lorem ipsum dolor sit amet, consectetur adipiscing
      elit. Nam quis neque feugiat, gravida nisi ut, elementum arcu.
      Nullam iaculis, neque ut ullamcorper consequat, risus lorem mattis
      eros, eget elementum est est ut augue. Vestibulum risus nulla,
      commodo ut leo sollicitudin, feugiat tempus neque. Nam pretium ex id
      lacus volutpat, sit amet feugiat tortor lobortis. Integer massa
      odio, pretium eget accumsan nec, cursus id tortor. Nulla at nisi
      mauris. Fusce mattis nibh vel est tincidunt maximus. Vestibulum in
      molestie risus. Pellentesque hendrerit congue commodo. Quisque
      blandit leo diam, rhoncus dictum dui semper nec. Morbi nec interdum
      est. Vivamus elit tellus, sagittis ac tempus id, tincidunt rhoncus
      diam. Donec pretium enim ac elit finibus, eu malesuada ligula
      aliquet. Aenean dignissim metus ac fringilla venenatis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabiturfacilisis vel risus at aliquet. Etiam fringilla vehicula libero.vehicula in lectus at sollicitudin. Suspendisse pretium eumetus vel rutrum. Aliquam vitae accumsan dolor. Aliquam at elementum
      leo. Nullam non quam quis turpis malesuada lobortis. Nullam elit
      lorem, vestibulum condimentum viverra vitae, pretium ut velit. Ut
      orci nunc, luctus nec nunc sed, lobortis feugiat nisi. Maecenas
      tempor consectetur purus ut semper. Aliquam erat volutpat.Donec
      feugiat eu arcu non pretium. Interdum et malesuada fames ac ante
      ipsum primis in faucibus. Phasellus ultricies mattis orci eget
      rhoncus. Sed fringilla nibh ac facilisis accumsan. Phasellus eros
      felis, faucibus vitae felis in, tempor maximus lacus. Suspendisse
      potenti. In hac habitasse platea dictumst. Sed nec orci tristique,
      ultricies augue sed, iaculis nisl.Quisque ut ullamcorper elit. In
      porta eros nisi, in rutrum odio accumsan et. Mauris feugiat, tortor
      at porttitor molestie, felis ex vulputate odio, viverra vehicula
      magna metus sit amet lacus. Nunc scelerisque nec purus ac sagittis.
      Mauris viverra id erat quis sollicitudin. Nulla pharetra odio in
      ipsum porttitor, in vestibulum massa commodo. Nulla tellus augue,
      lacinia vel molestie ac, rhoncus sollicitudin eros. Pellentesque
      hendrerit mi at dolor pellentesque dapibus. In pellentesque
      vulputate diam, et venenatis nunc. Ut volutpat tincidunt pulvinar.
      Phasellus nec pulvinar tortor.Fusce faucibus ut nulla eu vestibulum.
      Donec imperdiet lobortis nisl, vel scelerisque nunc finibus ut.
      Quisque a ante tellus. Fusce sed consequat risus. Phasellus et lorem
      ultricies, tincidunt est sit amet, dapibus risus. Nam at hendrerit
      sapien, gravida tincidunt lacus. Cras tincidunt vitae metus nec
      tincidunt. Vivamus gravida eu tortor sed efficitur. Sed nec mauris
      sed neque fermentum blandit. Donec sit amet erat id libero feugiat
      tristique. Morbi nec varius diam. Suspendisse ac pulvinar mauris,
      nec viverra risus.Lorem ipsum dolor sit amet, consectetur adipiscing
      elit. Nam quis neque feugiat, gravida nisi ut, elementum arcu.
      Nullam iaculis, neque ut ullamcorper consequat, risus lorem mattis
      eros, eget elementum est est ut augue. Vestibulum risus nulla,
      commodo ut leo sollicitudin, feugiat tempus neque. Nam pretium ex id
      lacus volutpat, sit amet feugiat tortor lobortis. Integer massa
      odio, pretium eget accumsan nec, cursus id tortor. Nulla at nisi
      mauris. Fusce mattis nibh vel est tincidunt maximus. Vestibulum in
      molestie risus. Pellentesque hendrerit congue commodo. Quisque
      blandit leo diam, rhoncus dictum dui semper nec. Morbi nec interdum
      est. Vivamus elit tellus, sagittis ac tempus id, tincidunt rhoncus
      diam. Donec pretium enim ac elit finibus, eu malesuada ligula
      aliquet. Aenean dignissim metus ac fringilla venenatis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabiturfacilisis vel risus at aliquet. Etiam fringilla vehicula libero.vehicula in lectus at sollicitudin. Suspendisse pretium eumetus vel rutrum. Aliquam vitae accumsan dolor. Aliquam at elementum
      leo. Nullam non quam quis turpis malesuada lobortis. Nullam elit
      lorem, vestibulum condimentum viverra vitae, pretium ut velit. Ut
      orci nunc, luctus nec nunc sed, lobortis feugiat nisi. Maecenas
      tempor consectetur purus ut semper. Aliquam erat volutpat.Donec
      feugiat eu arcu non pretium. Interdum et malesuada fames ac ante
      ipsum primis in faucibus. Phasellus ultricies mattis orci eget
      rhoncus. Sed fringilla nibh ac facilisis accumsan. Phasellus eros
      felis, faucibus vitae felis in, tempor maximus lacus. Suspendisse
      potenti. In hac habitasse platea dictumst. Sed nec orci tristique,
      ultricies augue sed, iaculis nisl.Quisque ut ullamcorper elit. In
      porta eros nisi, in rutrum odio accumsan et. Mauris feugiat, tortor
      at porttitor molestie, felis ex vulputate odio, viverra vehicula
      magna metus sit amet lacus. Nunc scelerisque nec purus ac sagittis.
      Mauris viverra id erat quis sollicitudin. Nulla pharetra odio in
      ipsum porttitor, in vestibulum massa commodo. Nulla tellus augue,
      lacinia vel molestie ac, rhoncus sollicitudin eros. Pellentesque
      hendrerit mi at dolor pellentesque dapibus. In pellentesque
      vulputate diam, et venenatis nunc. Ut volutpat tincidunt pulvinar.
      Phasellus nec pulvinar tortor.Fusce faucibus ut nulla eu vestibulum.
      Donec imperdiet lobortis nisl, vel scelerisque nunc finibus ut.
      Quisque a ante tellus. Fusce sed consequat risus. Phasellus et lorem
      ultricies, tincidunt est sit amet, dapibus risus. Nam at hendrerit
      sapien, gravida tincidunt lacus. Cras tincidunt vitae metus nec
      tincidunt. Vivamus gravida eu tortor sed efficitur. Sed nec mauris
      sed neque fermentum blandit. Donec sit amet erat id libero feugiat
      tristique. Morbi nec varius diam. Suspendisse ac pulvinar mauris,
      nec viverra risus.Lorem ipsum dolor sit amet, consectetur adipiscing
      elit. Nam quis neque feugiat, gravida nisi ut, elementum arcu.
      Nullam iaculis, neque ut ullamcorper consequat, risus lorem mattis
      eros, eget elementum est est ut augue. Vestibulum risus nulla,
      commodo ut leo sollicitudin, feugiat tempus neque. Nam pretium ex id
      lacus volutpat, sit amet feugiat tortor lobortis. Integer massa
      odio, pretium eget accumsan nec, cursus id tortor. Nulla at nisi
      mauris. Fusce mattis nibh vel est tincidunt maximus. Vestibulum in
      molestie risus. Pellentesque hendrerit congue commodo. Quisque
      blandit leo diam, rhoncus dictum dui semper nec. Morbi nec interdum
      est. Vivamus elit tellus, sagittis ac tempus id, tincidunt rhoncus
      diam. Donec pretium enim ac elit finibus, eu malesuada ligula
      aliquet. Aenean dignissim metus ac fringilla venenatis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabiturfacilisis vel risus at aliquet. Etiam fringilla vehicula libero.vehicula in lectus at sollicitudin. Suspendisse pretium eumetus vel rutrum. Aliquam vitae accumsan dolor. Aliquam at elementum
      leo. Nullam non quam quis turpis malesuada lobortis. Nullam elit
      lorem, vestibulum condimentum viverra vitae, pretium ut velit. Ut
      orci nunc, luctus nec nunc sed, lobortis feugiat nisi. Maecenas
      tempor consectetur purus ut semper. Aliquam erat volutpat.Donec
      feugiat eu arcu non pretium. Interdum et malesuada fames ac ante
      ipsum primis in faucibus. Phasellus ultricies mattis orci eget
      rhoncus. Sed fringilla nibh ac facilisis accumsan. Phasellus eros
      felis, faucibus vitae felis in, tempor maximus lacus. Suspendisse
      potenti. In hac habitasse platea dictumst. Sed nec orci tristique,
      ultricies augue sed, iaculis nisl.Quisque ut ullamcorper elit. In
      porta eros nisi, in rutrum odio accumsan et. Mauris feugiat, tortor
      at porttitor molestie, felis ex vulputate odio, viverra vehicula
      magna metus sit amet lacus. Nunc scelerisque nec purus ac sagittis.
      Mauris viverra id erat quis sollicitudin. Nulla pharetra odio in
      ipsum porttitor, in vestibulum massa commodo. Nulla tellus augue,
      lacinia vel molestie ac, rhoncus sollicitudin eros. Pellentesque
      hendrerit mi at dolor pellentesque dapibus. In pellentesque
      vulputate diam, et venenatis nunc. Ut volutpat tincidunt pulvinar.
      Phasellus nec pulvinar tortor.Fusce faucibus ut nulla eu vestibulum.
      Donec imperdiet lobortis nisl, vel scelerisque nunc finibus ut.
      Quisque a ante tellus. Fusce sed consequat risus. Phasellus et lorem
      ultricies, tincidunt est sit amet, dapibus risus. Nam at hendrerit
      sapien, gravida tincidunt lacus. Cras tincidunt vitae metus nec
      tincidunt. Vivamus gravida eu tortor sed efficitur. Sed nec mauris
      sed neque fermentum blandit. Donec sit amet erat id libero feugiat
      tristique. Morbi nec varius diam. Suspendisse ac pulvinar mauris,
      nec viverra risus.Lorem ipsum dolor sit amet, consectetur adipiscing
      elit. Nam quis neque feugiat, gravida nisi ut, elementum arcu.
      Nullam iaculis, neque ut ullamcorper consequat, risus lorem mattis
      eros, eget elementum est est ut augue. Vestibulum risus nulla,
      commodo ut leo sollicitudin, feugiat tempus neque. Nam pretium ex id
      lacus volutpat, sit amet feugiat tortor lobortis. Integer massa
      odio, pretium eget accumsan nec, cursus id tortor. Nulla at nisi
      mauris. Fusce mattis nibh vel est tincidunt maximus. Vestibulum in
      molestie risus. Pellentesque hendrerit congue commodo. Quisque
      blandit leo diam, rhoncus dictum dui semper nec. Morbi nec interdum
      est. Vivamus elit tellus, sagittis ac tempus id, tincidunt rhoncus
      diam. Donec pretium enim ac elit finibus, eu malesuada ligula
      aliquet. Aenean dignissim metus ac fringilla venenatis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabiturfacilisis vel risus at aliquet. Etiam fringilla vehicula libero.vehicula in lectus at sollicitudin. Suspendisse pretium eumetus vel rutrum. Aliquam vitae accumsan dolor. Aliquam at elementum
      leo. Nullam non quam quis turpis malesuada lobortis. Nullam elit
      lorem, vestibulum condimentum viverra vitae, pretium ut velit. Ut
      orci nunc, luctus nec nunc sed, lobortis feugiat nisi. Maecenas
      tempor consectetur purus ut semper. Aliquam erat volutpat.Donec
      feugiat eu arcu non pretium. Interdum et malesuada fames ac ante
      ipsum primis in faucibus. Phasellus ultricies mattis orci eget
      rhoncus. Sed fringilla nibh ac facilisis accumsan. Phasellus eros
      felis, faucibus vitae felis in, tempor maximus lacus. Suspendisse
      potenti. In hac habitasse platea dictumst. Sed nec orci tristique,
      ultricies augue sed, iaculis nisl.Quisque ut ullamcorper elit. In
      porta eros nisi, in rutrum odio accumsan et. Mauris feugiat, tortor
      at porttitor molestie, felis ex vulputate odio, viverra vehicula
      magna metus sit amet lacus. Nunc scelerisque nec purus ac sagittis.
      Mauris viverra id erat quis sollicitudin. Nulla pharetra odio in
      ipsum porttitor, in vestibulum massa commodo. Nulla tellus augue,
      lacinia vel molestie ac, rhoncus sollicitudin eros. Pellentesque
      hendrerit mi at dolor pellentesque dapibus. In pellentesque
      vulputate diam, et venenatis nunc. Ut volutpat tincidunt pulvinar.
      Phasellus nec pulvinar tortor.Fusce faucibus ut nulla eu vestibulum.
      Donec imperdiet lobortis nisl, vel scelerisque nunc finibus ut.
      Quisque a ante tellus. Fusce sed consequat risus. Phasellus et lorem
      ultricies, tincidunt est sit amet, dapibus risus. Nam at hendrerit
      sapien, gravida tincidunt lacus. Cras tincidunt vitae metus nec
      tincidunt. Vivamus gravida eu tortor sed efficitur. Sed nec mauris
      sed neque fermentum blandit. Donec sit amet erat id libero feugiat
      tristique. Morbi nec varius diam. Suspendisse ac pulvinar mauris,
      nec viverra risus.Lorem ipsum dolor sit amet, consectetur adipiscing
      elit. Nam quis neque feugiat, gravida nisi ut, elementum arcu.
      Nullam iaculis, neque ut ullamcorper consequat, risus lorem mattis
      eros, eget elementum est est ut augue. Vestibulum risus nulla,
      commodo ut leo sollicitudin, feugiat tempus neque. Nam pretium ex id
      lacus volutpat, sit amet feugiat tortor lobortis. Integer massa
      odio, pretium eget accumsan nec, cursus id tortor. Nulla at nisi
      mauris. Fusce mattis nibh vel est tincidunt maximus. Vestibulum in
      molestie risus. Pellentesque hendrerit congue commodo. Quisque
      blandit leo diam, rhoncus dictum dui semper nec. Morbi nec interdum
      est. Vivamus elit tellus, sagittis ac tempus id, tincidunt rhoncus
      diam. Donec pretium enim ac elit finibus, eu malesuada ligula
      aliquet. Aenean dignissim metus ac fringilla venenatis.`,
    },
    revalidate: 10,
  };
};

PostDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
