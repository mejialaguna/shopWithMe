import Image, { ImageProps } from 'next/image';

interface Props {
  src?: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
  style?: React.StyleHTMLAttributes<HTMLImageElement>['style'];
  width: number;
  height: number;
  additionalProps?: Partial<ImageProps> & React.HTMLAttributes<HTMLImageElement>
}

export const ProductImage = ({
  src,
  alt,
  className,
  style,
  width,
  height,
  additionalProps,
}: Props) => {

  const localSrc = src
    ? src.startsWith('http') || src.startsWith('blob')
      ? src
      : `/products/${src}`
    : '/imgs/placeholder.jpg';

  return (
    <Image
      src={localSrc}
      width={width}
      height={height}
      alt={alt}
      className={className}
      style={style}
      draggable={false}
      {...additionalProps}
    />
  );
};
