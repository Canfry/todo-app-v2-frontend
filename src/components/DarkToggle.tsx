import { MdDarkMode, MdLightMode } from 'react-icons/md';
import type { DarkmodeProps } from './Header';

export default function DarkToggle({
  isDarkmode,
  setIsDarkmode,
}: DarkmodeProps) {
  function toggle() {
    setIsDarkmode(!isDarkmode);
  }
  return (
    <>
      {isDarkmode === true ? (
        <button onClick={toggle}>
          <MdDarkMode className='text-3xl' />
        </button>
      ) : (
        <button onClick={toggle}>
          <MdLightMode className='text-3xl text-yellow-300' />
        </button>
      )}
    </>
  );
}
