import useLocalStorageWithSync from '@/hooks/useLocalStorageWithSync';
import MainHeader, { DaisyUiTheme } from '../headers/MainHeader';
import Alert from '../common/Alert';
import PageLoading from '../common/PageLoading';

interface MainLayoutProps {
  children: React.ReactNode;
  side?: React.ReactNode;
}
export default function MainLayout({ children, side }: MainLayoutProps) {
  const [theme, setTheme] = useLocalStorageWithSync('theme');
  return (
    <div className="w-full bg-base-100">
      <PageLoading />
      <MainHeader
        theme={theme || 'light'}
        setTheme={(newTheme: DaisyUiTheme) => setTheme(newTheme)}
      />
      {side}
      <div
        className={
          side
            ? 'absolute right-0 w-[calc(100%-100px)] bg-base-100'
            : 'absolute w-full bg-base-100'
        }
      >
        {children}
      </div>
      <Alert />
    </div>
  );
}
