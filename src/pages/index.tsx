import MainLayout from '@/components/layouts/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      <div className="h-full min-h-[100vh] w-full overflow-y-auto">
        {process.env.NEXT_PUBLIC_TAG}
      </div>
    </MainLayout>
  );
}
