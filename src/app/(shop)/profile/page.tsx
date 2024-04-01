import { auth } from '@/auth.config';
import { Title } from '@/components/ui/Title';
import { redirect } from 'next/navigation';

export default async function () {
  const session = await auth();
  // console.log(session)

  if (!session?.user) redirect('/');
  return (
    <div>
      <Title
        title='Perfil'
        subTitle={session?.user?.name as string}
        customClasses=' items-center'
      />
    </div>
  );
}