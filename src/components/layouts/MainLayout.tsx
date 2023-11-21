import useLocalStorageWithSync from '@/hooks/useLocalStorageWithSync';
import MainHeader from '../headers/MainHeader';

interface MainLayoutProps {
  children: React.ReactNode;
}
export default function MainLayout({ children }: MainLayoutProps) {
  const [_value, setValue] = useLocalStorageWithSync('theme');

  const setThemeFn = (newTheme: string) => {
    setValue(newTheme);
  };
  return (
    <>
      <MainHeader setTheme={setThemeFn} />
      <div className="p-4">{children}</div>
    </>
  );
}
