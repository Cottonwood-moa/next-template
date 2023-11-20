import { Breadcrumbs as MuiBreadcrumbs } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface BreadcrumbsProps {
  link: {
    url: string;
    label: string;
  }[];
}
export default function Breadcrumbs({ link }: BreadcrumbsProps) {
  const router = useRouter();
  return (
    <MuiBreadcrumbs>
      {link.map((item) => (
        <Link key={item.label} href={item.url}>
          <span
            className={router.asPath === item.url ? 'font-bold' : 'opacity-60'}
          >
            {item.label}
          </span>
        </Link>
      ))}
    </MuiBreadcrumbs>
  );
}
