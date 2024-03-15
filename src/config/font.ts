import {
  Inter,
  Montserrat_Alternates as montserratAlternates,
} from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });
export const titleFonts = montserratAlternates({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: 'normal',
});
