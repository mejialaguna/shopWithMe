import { Size } from '@/interfaces';
interface SizeProp {
  selectedSize: Size | undefined;
  availableSizes: Size[];
  onSizeChanged: React.Dispatch<React.SetStateAction<Size | undefined>>;
  inStock: number;
  setShowToolTip: React.Dispatch<React.SetStateAction<boolean>>
}
export const SizeSelector = ({
  selectedSize,
  availableSizes,
  onSizeChanged,
  inStock,
  setShowToolTip,
}: SizeProp) => {
  const handleSizeChanged = (size: Size) => { 
    onSizeChanged(size);
    setShowToolTip(false);
  }
  return (
    <div className='my-5'>
      <h3 className='font-bold'>Sizes</h3>
      {availableSizes.map((size) => (
        <button
          disabled={inStock === 0}
          onClick={() => handleSizeChanged(size)}
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
