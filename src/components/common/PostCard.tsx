import { PostCardProps } from '@@/components/common/postCard';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function PostCard({ id, type, title, body }: PostCardProps) {
  const router = useRouter();
  const onClickPost = () => {
    router.push(`/post/${id}`);
  };
  return (
    <>
      {type === 'grid' && (
        <motion.div
          layoutId={String(id)}
          initial={{ scale: 0.4 }}
          animate={{ scale: 1 }}
          whileHover={{
            scale: 1.04,
          }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          onClick={onClickPost}
          className="h-[380px] w-[96%]  min-w-[300px] max-w-[400px] cursor-pointer rounded-2xl bg-primary-content"
        >
          <figure>
            <img
              className="h-[200px] w-full rounded-t-2xl object-cover"
              src="https://st.depositphotos.com/1032577/3572/i/450/depositphotos_35727883-stock-photo-black-background.jpg"
              alt="post"
            />
          </figure>
          <div className="h-[120px] bg-base-200 p-2">
            <div className="mb-2 line-clamp-2 text-xl font-bold">{title}</div>
            <div className="line-clamp-1">{body}</div>
          </div>
          <div className="h-[calc(100%-320px)] rounded-b-2xl bg-base-300 p-2">
            footer
          </div>
        </motion.div>
      )}
      {type === 'list' && (
        <motion.div
          layoutId={String(id)}
          initial={{ scale: 0.4 }}
          animate={{ scale: 1 }}
          whileHover={{
            scale: 1.02,
          }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          onClick={onClickPost}
          className="flex h-[200px] w-[96%] min-w-[300px] cursor-pointer rounded-2xl bg-primary-content"
        >
          <img
            className="h-full w-[340px] rounded-2xl object-cover"
            src="https://st.depositphotos.com/1032577/3572/i/450/depositphotos_35727883-stock-photo-black-background.jpg"
            alt="post"
          />
          <div className="flex-1 p-6">
            <div className="mb-2 line-clamp-1 text-xl font-bold">{title}</div>
            <div className="line-clamp-5">{body}</div>
          </div>
        </motion.div>
      )}
    </>
  );
}
