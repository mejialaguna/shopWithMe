import { cn } from '@/utils/cn';
import { AnimatePresence, motion } from 'framer-motion';

export const Card = ({
  title,
  description,
  children,
  hoveredIndex,
  idx,
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
  hoveredIndex?: number | null;
  idx?: number;
}) => {
  return (
    <>
      <AnimatePresence>
        {hoveredIndex === idx && (
          <motion.span
            className='absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl'
            layoutId='hoverBackground'
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.15 },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.15, delay: 0.2 },
            }}
          />
        )}
      </AnimatePresence>
      <div
        className={cn(
          'rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20'
        )}
      >
        <div className='relative z-50'>
          <div className='p-4 flex flex-col'>{children}</div>
          <h4 className={cn('text-zinc-100 font-bold tracking-wide mt-4')}>
            {title}
          </h4>
          <p
            className={cn(
              'mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm'
            )}
          >
            {description}
          </p>
        </div>
      </div>
    </>
  );
};
