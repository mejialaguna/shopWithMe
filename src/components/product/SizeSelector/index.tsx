import { Size } from '@/interfaces';

interface SizeProp {
  selectedSize: Size;
  availableSizes: Size[];
  onSizeChanged: React.Dispatch<React.SetStateAction<Size>>;
  inStock: number;
}
export const SizeSelector = ({
  selectedSize = 'XS',
  availableSizes,
  onSizeChanged,
  inStock,
}: SizeProp) => {
  return (
    <div className='my-5'>
      <h3 className='font-bold'>Sizes</h3>
      {availableSizes.map((size) => (
        <button
          disabled={inStock === 0}
          onClick={() => onSizeChanged(size)}
          key={size}
          className={`relative mx-1 hover:underline hover:underline-offset-4 text-lg
          ${size === selectedSize ? 'underline underline-offset-4' : ''} ${
            inStock === 0
              ? `after:absolute after:w-[1px] after:h-4 after:bg-stone-950 text-zinc-400
              after:rounded-full after:rotate-45 after:left-[7px] after:top-[5px]`
              : ''
          }`}
        >
          {size}
        </button>
      ))}
    </div>
  );
};
