'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const options = [
  { label: 'kid', value: 'kid' },
  { label: 'men', value: 'men' },
  { label: 'women', value: 'women' },
  { label: 'unisex', value: 'unisex' },
];

interface Props {
  initialgenre: string | '';
}

export const SelectGenre = ({ initialgenre }: Props) => {
  const [genderType, setGenderType] = useState(initialgenre || 'Gender');
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const handleSelectChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedGender = event.target.value;
      setGenderType(selectedGender); // Update local state

       let newUrl;

       if (selectedGender === 'all') {
         newUrl = pathName;
       } else {
         const params = new URLSearchParams(searchParams.toString());
         params.delete('page');
         params.set('gender', selectedGender);
         newUrl = `${pathName}?${params.toString()}`;
       }
      window.location.href = newUrl;
    },
    [searchParams, pathName]
  );

  return (
    <div className='flex flex-col'>
      <label htmlFor='genderType'>Filter by Gender</label>
      <select
        id='genderType'
        value={genderType}
        onChange={handleSelectChange}
        className='border border-gray-300 rounded-md shadow-sm p-1.5 focus:outline-none text-center'
      >
        <option value='all'>All</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
