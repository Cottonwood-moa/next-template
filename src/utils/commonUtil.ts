export default {
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
   * @param {number} length
   * @returns {number} random number
   */
  randomNumber(length: number) {
    const result: number[] = [];

    for (let i = 0; i < length; i += 1) {
      const randomDigit = Math.floor(Math.random() * 10);
      result.push(randomDigit);
    }

    return Number(result.join(''));
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

  /**
   * @param {HTMLElement} element
   * @description 스크롤이 element 맨 아래 위치하는지 확인한다.
   * @returns  boolean
   */
  isScrollBottom(element: HTMLElement) {
    const { scrollTop, clientHeight, scrollHeight } = element;
    const isAtBottom =
      scrollTop + clientHeight >= scrollHeight || clientHeight === scrollHeight;
    return isAtBottom;
  },
};
