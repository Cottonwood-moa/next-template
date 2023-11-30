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
    <div className="bg-base-100">
      <PageLoading />
      <MainHeader
        theme={theme || 'light'}
        setTheme={(newTheme: DaisyUiTheme) => setTheme(newTheme)}
      />
      <div className="bg-base-100">{side}</div>
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
