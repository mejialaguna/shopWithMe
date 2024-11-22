interface BadgeProps {
  isPaid: boolean | undefined;
  children: JSX.Element;
}

export default function ({isPaid, children}: BadgeProps) {
  return (
    <div
      className={`flex items-center rounded-lg py-2 px-3.5 text-xs
              font-bold text-white mb-5 ${!isPaid ? 'bg-red-400' : 'bg-green-700'}`}
    >
      {children}
      <span className='mx-2'>{!isPaid ? 'Pending' : 'Paid'}</span>
    </div>
  );
}
