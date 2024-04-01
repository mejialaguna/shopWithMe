
import { titleFonts } from '@/config/font';
import { LoginForm } from './ui/LoginForm';

export default function () {
  return (
    <main className='flex flex-col min-h-screen pt-32 sm:pt-52'>
      <h1 className={`${titleFonts.className} text-4xl mb-5`}>Login</h1>

      <LoginForm />
    </main>
  );
}
