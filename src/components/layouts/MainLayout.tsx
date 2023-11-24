import useLocalStorageWithSync from '@/hooks/useLocalStorageWithSync';
import MainHeader from '../headers/MainHeader';
import Alert from '../common/Alert';
import PageLoading from '../common/PageLoading';

interface MainLayoutProps {
  children: React.ReactNode;
}
export default function MainLayout({ children }: MainLayoutProps) {
  const [theme, setTheme] = useLocalStorageWithSync('theme');
  return (
    <>
      <PageLoading />
      <MainHeader
        theme={theme || 'light'}
        setTheme={(newTheme: string) => setTheme(newTheme)}
      />
      <div className="h-full overflow-y-auto p-4">{children}</div>
      <Alert />
    </>
  );
}
