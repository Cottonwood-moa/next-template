interface MainHeaderProps {
  setTheme: (theme: string) => void;
}
export default function MainHeader({ setTheme }: MainHeaderProps) {
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
   * @param {string} theme
   * @description theme 변경 이벤트
   */
  const onClickSelectTheme = (theme: string) => {
    setTheme(theme);
  };

  return (
    <label className="swap swap-rotate">
      <input type="checkbox" className="theme-controller" value="synthwave" />
      <div className="dropdown">
        <label tabIndex={0} className="btn m-1">
          Click
        </label>
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[1] block max-h-96 w-52 overflow-y-auto rounded-box bg-base-100 p-2 shadow"
        >
          {daisyUiThemeList.map((theme) => (
            <li key={theme}>
              <button type="button" onClick={() => onClickSelectTheme(theme)}>
                {theme}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </label>
  );
}
