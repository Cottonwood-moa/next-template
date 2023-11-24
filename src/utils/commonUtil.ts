export default {
  /**
   * @param {string} url 변환 받을 url
   * @returns {URL} 변환된 URL
   */
  toUrl: (url: string): URL => new URL(url, import.meta.url),
  /**
   * @param {string} key
   * @returns icon-{key}.svg
   */
  getIcon: (key: string) => {
    // const path = new URL(`@/assets/icons/`, import.meta.url)
    if (key === 'egov-ingress') {
      return `/src/assets/icons/icon-istio.svg`;
    }
    if (key.includes('egov')) {
      return `/src/assets/icons/icon-egov.svg`;
    }
    return `/src/assets/icons/icon-${key}.svg`;
  },
  /**
   * @returns 지정된 colorset 반환
   */
  getColorSet: () => [
    'rgba(97, 186, 66, 0.6)',
    'rgba(239, 168, 27, 0.6)',
    'rgba(218, 137, 195, 0.6)',
    'rgba(89, 134, 222, 0.6)',
  ],
  /**
   * @param len
   * @returns
   */
  randomString(len: number) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < len; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },
  /**
   *
   * @param length
   * @returns
   */
  randomNumber(length: number) {
    const result: number[] = [];

    for (let i = 0; i < length; i += 1) {
      const randomDigit = Math.floor(Math.random() * 10);
      result.push(randomDigit);
    }

    return Number(result.join(''));
  },
  /**
   * @description 날짜를 입력받아 최근 1달 이내 날짜일 경우 true를 반환한다.
   */
  isWithinLastMonth(inputDateString: string): boolean {
    const currentDate = new Date();
    const inputDate = new Date(inputDateString);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);
    return inputDate >= oneMonthAgo && inputDate <= currentDate;
  },

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  },
  /**
   * @returns 무작위 이모지를 반환한다.
   */
  getRandomEmoji(): string {
    const emojis: string[] = [
      '😀',
      '😃',
      '😄',
      '😁',
      '😆',
      '😅',
      '😂',
      '🤣',
      '😊',
      '😇',
      '🙂',
      '🙃',
      '😉',
      '😌',
      '😍',
      '🥰',
      '😘',
      '😗',
      '😙',
      '😚',
      '😋',
      '😛',
      '😝',
      '😜',
      '🤪',
      '🤨',
      '🧐',
      '🤓',
      '😎',
      '🤩',
      '🥳',
      '😏',
      '😒',
      '😞',
      '😔',
      '😟',
      '😕',
      '🙁',
      '☹️',
      '😣',
      '😖',
      '😫',
      '😩',
      '🥺',
      '😢',
      '😭',
      '😤',
      '😠',
      '😡',
      '🤬',
      '🤯',
      '😳',
      '🥵',
      '🥶',
      '😱',
      '😨',
      '😰',
      '😥',
      '😓',
      '🤗',
      '🤔',
      '🤭',
      '🤫',
      '🤥',
      '😶',
      '😐',
      '😑',
      '😬',
      '🙄',
      '😯',
      '💀',
      '☠️',
      '👽',
      '👾',
      '🤖',
      '🎃',
      '😺',
      '😸',
      '😹',
      '😻',
      '😦',
      '😧',
      '😮',
      '😲',
      '🥴',
      '🤢',
      '🤧',
      '😷',
      '🤒',
      '🤕',
      '🤑',
      '🤠',
      '😈',
      '👿',
      '🤡',
      '💩',
      '👻',
    ];
    const randomIndex: number = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
  },
  /**
   * @param {string} value
   * @description value를 클립보드에 복사한다.
   */
  async copyCodeToClipboard(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch (err) {
      return false;
    }
  },
};
