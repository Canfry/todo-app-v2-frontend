import DarkToggle from './DarkToggle';

export interface DarkmodeProps {
  isDarkmode: boolean;
  setIsDarkmode: (isDarkmode: boolean) => void;
}

export default function Header({ isDarkmode, setIsDarkmode }: DarkmodeProps) {
  return (
    <div className='dark:bg-slate-900 dark:text-white w-full h-40'>
      <div className='w-[80%] m-auto h-full flex items-center justify-center gap-16'>
        <h1 className='text-5xl'>FRYTASK</h1>
        <DarkToggle isDarkmode={isDarkmode} setIsDarkmode={setIsDarkmode} />
      </div>
    </div>
  );
}
