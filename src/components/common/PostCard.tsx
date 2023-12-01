import { motion } from 'framer-motion';

interface PostCardProps {
  id: number;
  title?: string;
  body?: string;
}
export default function PostCard({ id, title, body }: PostCardProps) {
  return (
    <motion.div
      initial={{ scale: 0.4, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{
        scale: 1.06,
      }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
      className="h-[380px] w-[96%] min-w-[300px] rounded-md bg-primary-content"
    >
      <figure>
        <img
          className="h-[200px] w-full max-w-[450px] rounded-md object-cover"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg"
          alt="post"
        />
      </figure>
      <div className="h-[120px] bg-slate-600">body</div>
      <div className="h-[calc(100%-320px)] bg-slate-800">footer</div>
    </motion.div>
  );
}
