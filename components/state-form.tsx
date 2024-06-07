'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';

export function StateForm() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selected, setSelected] = useState<string[]>([]);

  // Sync selected checkbox state with URL params
  useEffect(() => {
    if (searchParams.get('option')) {
      const options = searchParams.getAll('option');
      setSelected(options);
    }
  }, [searchParams]);

  // Sync URL params with selected checkbox state
  useEffect(() => {
    const params = new URLSearchParams();
    selected.forEach(option => {
      params.append('option', option);
    });

    const href = `${pathname}?${params.toString()}`;
    router.push(href);
  }, [selected]);

  const handleCheckboxChange: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = event.target;

    setSelected(prev => {
      if (checked) {
        return [...prev, name];
      }
      return prev.filter(option => option !== name);
    });
  };
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 min-w-[240px]">
      <h3 className="text-lg font-semibold mb-4">Filter Options</h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="option-a"
            name="a"
            onChange={handleCheckboxChange}
            checked={selected?.includes('a')}
          ></input>
          <label htmlFor="option-a">A</label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="option-b"
            name="b"
            onChange={handleCheckboxChange}
            checked={selected?.includes('b')}
          ></input>
          <label htmlFor="option-b">B</label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="option-c"
            name="c"
            onChange={handleCheckboxChange}
            checked={selected?.includes('c')}
          ></input>
          <label htmlFor="option-c">C</label>
        </div>
      </div>
    </div>
  );
}
