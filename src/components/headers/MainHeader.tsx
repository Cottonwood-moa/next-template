import { motion } from 'framer-motion';
import { capitalize } from 'lodash';
import { useRouter } from 'next/router';
import { DaisyUiTheme, MainHeaderProps } from '@@/components/headers/mainHeader';
import Svg from '../common/Svg';

export default function MainHeader({ theme, setTheme }: MainHeaderProps) {
  const router = useRouter();
  const daisyUiThemeList: DaisyUiTheme[] = [
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
  const onClickSelectTheme = (newTheme: DaisyUiTheme) => {
    setTheme(newTheme);
  };

  return (
    <div className="flex items-center justify-between bg-black pb-1 pl-3 pr-3 pt-1">
      {/* 왼쪽 컨텐츠 */}
      <div className="flex items-center">
        <button type="button" className="btn" onClick={() => router.push('/')}>
          go to home
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => router.push('/template')}
        >
          go to Template
        </button>
      </div>
      <div />
      {/* 오른쪽 컨텐츠 */}
      {/* Theme 변경 아이콘 */}
      <div className="flex items-center">
        {theme === 'light' && (
          <motion.div
            className="mr-4 flex h-7 w-7 cursor-pointer items-center justify-center"
            animate={{ opacity: 1, rotate: 360 }}
            onClick={() => onClickSelectTheme('dark')}
          >
            {/* icon-sun */}
            <Svg type="icon-sun" className="stroke-white" />
          </motion.div>
        )}
        {theme === 'dark' && (
          <motion.div
            className="mr-4 h-7 w-7 cursor-pointer items-center justify-center"
            animate={{ opacity: 1, rotate: 360 }}
            onClick={() => onClickSelectTheme('light')}
          >
            {/* icon-moon */}
            <Svg type="icon-moon" className="stroke-white" />
          </motion.div>
        )}
        {theme !== 'dark' && theme !== 'light' && (
          <motion.div
            className="mr-4 h-7 w-7 cursor-pointer items-center justify-center"
            animate={{ opacity: 1, rotate: 360 }}
            onClick={() => onClickSelectTheme('light')}
          >
            {/* icon-point-brush */}
            <Svg type="icon-point-brush" className="stroke-white" />
          </motion.div>
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
              className="menu dropdown-content z-20 block max-h-96 w-52 overflow-y-auto rounded-box bg-base-100 p-2 shadow"
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
