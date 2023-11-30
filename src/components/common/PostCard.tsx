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
      className="h-[380px] w-full min-w-[300px] rounded-md bg-primary-content p-2"
    >
      <figure>
        <img
          className="h-[240px] w-full rounded-md object-cover"
          src="https://www.creativefabrica.com/wp-content/uploads/2023/09/20/Youtube-Thumbnail-Design-Template-Graphics-79693258-1.jpg"
          alt="post"
        />
      </figure>
      <span>{id}</span>
    </motion.div>
  );
}
