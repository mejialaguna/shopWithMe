import { Title } from '@/components/ui/Title';
import { AddressForm } from './ui/AddressForm';
import { getCountries } from '@/actions/product/get-contries';

interface Country {
  name: string;
  id: string;
}
export default async function NamePage() {
  const countries: Country[] = await getCountries();

  return (
    <div className='flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0'>
      <div className='w-full  xl:w-[1000px] flex flex-col justify-center text-left'>
        <Title title='Address' customClasses='mb-4' />

        <AddressForm countries={countries} />
      </div>
    </div>
  );
}
