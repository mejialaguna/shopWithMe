import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  const session = await auth();

  if (session?.user.role !== 'admin') {
    redirect('/login');
  }

  redirect('/admin/users');
}
