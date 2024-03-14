import { titleFonts } from '../../../config/font';

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${titleFonts.className}`}
    >
      <h1>login page</h1>
    </main>
  );
}
