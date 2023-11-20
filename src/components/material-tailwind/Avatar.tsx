import {
  Avatar as MuiAvatar,
  AvatarProps as MuiAvatarProps,
} from '@material-tailwind/react';

interface AvatarItem extends MuiAvatarProps {
  src: string;
  alt: string;
}
interface AvatarProps {
  avatar: AvatarItem;
}
export default function Avatar({ avatar }: AvatarProps) {
  return (
    <MuiAvatar
      src={avatar.src}
      alt={avatar.alt}
      size={avatar.size}
      variant={avatar.variant}
      color={avatar.color}
      withBorder={avatar.withBorder}
      className={avatar.className}
    />
  );
}
