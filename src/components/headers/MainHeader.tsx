import { AnimatePresence, motion } from 'framer-motion';
import { capitalize } from 'lodash';
import Svg from '../common/Svg';

interface MainHeaderProps {
  theme: string;
  setTheme: (theme: string) => void;
}
export default function MainHeader({ theme, setTheme }: MainHeaderProps) {
  const daisyUiThemeList = [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
    'dim',
    'nord',
    'sunset',
  ];
  /**
   * @param {string} newTheme
   * @description theme 변경 이벤트
   */
  const onClickSelectTheme = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <div className="flex items-center justify-between bg-warning-content pb-1 pl-3 pr-3 pt-1">
      {/* 왼쪽 컨텐츠 */}
      <div />
      {/* 오른쪽 컨텐츠 */}
      {/* Theme 변경 아이콘 */}
      <div className="flex items-center">
        {theme === 'light' && (
          <AnimatePresence>
            <motion.div
              className="mr-4 flex h-7 w-7 cursor-pointer items-center justify-center"
              animate={{ opacity: 1, rotate: 360 }}
              onClick={() => onClickSelectTheme('dark')}
            >
              {/* icon-sun */}
              <Svg type="icon-sun" />
            </motion.div>
          </AnimatePresence>
        )}
        {theme === 'dark' && (
          <AnimatePresence>
            <motion.div
              className="mr-4 h-7 w-7 cursor-pointer items-center justify-center"
              animate={{ opacity: 1, rotate: 360 }}
              onClick={() => onClickSelectTheme('light')}
            >
              {/* icon-moon */}
              <Svg type="icon-moon" />
            </motion.div>
          </AnimatePresence>
        )}
        {theme !== 'dark' && theme !== 'light' && (
          <AnimatePresence>
            <motion.div
              className="mr-4 h-7 w-7 cursor-pointer items-center justify-center"
              animate={{ opacity: 1, rotate: 360 }}
              onClick={() => onClickSelectTheme('light')}
            >
              {/* icon-point-brush */}
              <Svg type="icon-point-brush" />
            </motion.div>
          </AnimatePresence>
        )}
        {/* Theme 변경 Dropdown */}
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            className="theme-controller"
            value="synthwave"
          />
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-sm m-1 font-gugi">
              {capitalize(theme)}
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] block max-h-96 w-52 overflow-y-auto rounded-box bg-base-100 p-2 shadow"
            >
              {daisyUiThemeList.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => onClickSelectTheme(item)}
                  >
                    {capitalize(item)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </label>
      </div>
    </div>
  );
}
