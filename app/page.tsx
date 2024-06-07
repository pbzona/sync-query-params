import { StateForm } from '@/components/state-form';
import { getApiUrl } from '@/lib/utils';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] };
}) {
  // Normalize the option search params to make sure it's always an array
  const params = searchParams.option ? [...searchParams.option] : [];
  const newParams = new URLSearchParams();

  if (params.length > 0) {
    params.forEach(option => {
      newParams.append('option', option);
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="mb-4">
        <Suspense fallback={<p>Loading</p>}>
          <StateForm />
        </Suspense>
      </div>
      <div className="text-white border-1 border-white p-6 rounded">
        <Suspense fallback={<p>Loading</p>}>
          <ServerRequest params={newParams} />
        </Suspense>
      </div>
    </main>
  );
}

async function ServerRequest({ params }: { params?: URLSearchParams }) {
  if (!params) {
    params = new URLSearchParams();
  }

  const baseUrl = getApiUrl();
  const res = await fetch(`${baseUrl}/api?${params.toString()}`, {
    method: 'GET',
  });

  const options = await res.json();

  return (
    <pre>
      <span className="text-sky-700">From server:</span>{' '}
      {options && JSON.stringify(options, null, 2)}
    </pre>
  );
}
