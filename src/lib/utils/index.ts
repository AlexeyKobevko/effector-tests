/**
 * The function accepts a number and an array with nominative, genitive
 * singular, and genitive plural word forms. Returns the numeral in the desired
 * declension.
 * @param {number} numeral
 * @param {Array<String>>} forms
 * @returns {string}
 */
import { RefObject, useEffect } from 'react';

export const pluralForm = (numeral: number, forms: string[]): string => {
  return numeral % 10 === 1 && numeral % 100 !== 11
    ? forms[0]
    : numeral % 10 >= 2 && numeral % 10 <= 4 && (numeral % 100 < 10 || numeral % 100 >= 20)
    ? forms[1]
    : forms[2];
};

/**
 * The function replace all %s from str to rest elements
 */
export const parseString = (str: string, ...rest: (string | number)[]): string => {
  let i = 0;
  return str.replace(/%s/g, () => String(rest[i++]));
};

/**
 * This function for catching a click outside the block.
 * @param ref useRef() to block
 * @param clickOutSide function to be called when clicked outside the block
 * @returns void
 */

type outerClickProps = {
  ref: RefObject<HTMLDivElement>;
  clickOutSide?: () => void;
};

export const useOuterClick = ({ ref, clickOutSide }: outerClickProps) => {
  const handleClick = (e: MouseEvent) => {
    const targetEl = e.target as Node;
    const currentEl = ref.current;
    if (currentEl && targetEl && !currentEl?.contains(targetEl)) {
      clickOutSide && clickOutSide();
    }
  };

  useEffect(() => {
    if (!clickOutSide) {
      return;
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [clickOutSide, ref]);
};

/**
 * The function toggle overflow-hidden on html tag
 */
export const htmlOverflowHidden = (isActive: boolean) => {
  const html = document.documentElement;

  if (isActive) {
    html.classList.add('overflow-hidden');
  } else {
    html.classList.remove('overflow-hidden');
  }
};

/**
 * The function checking params and blocking non-digits signs
 * @param value
 */
export const transformInputValue = (value: string): string => {
  const onlyNumbers = value.match(/\d*/);
  if (onlyNumbers) {
    return onlyNumbers.join();
  }
  return '';
};

/**
 * The function return phone mask depending on maxLength of phone number
 */
export const phoneMask = (phone, maxLength) => {
  const phoneChange = phone.replace(/\D/g, '').replace(/^(\d)/, '($1');
  switch (maxLength) {
    case 13:
      return phoneChange
        .replace(/^(\(\d)(\d)/, '$1) $2')
        .replace(/(\d{3})(\d{1,5})/, '$1-$2')
        .replace(/(-\d{2})(\d)/, '$1-$2');
    case 14:
      return phoneChange
        .replace(/^(\(\d{2})(\d)/, '$1) $2')
        .replace(/(\d{3})(\d{1,5})/, '$1-$2')
        .replace(/(-\d{2})(\d)/, '$1-$2');
    case 15:
      return phoneChange
        .replace(/^(\(\d{3})(\d)/, '$1) $2')
        .replace(/(\d{3})(\d{1,5})/, '$1-$2')
        .replace(/(-\d{2})(\d)/, '$1-$2');
  }
};

/**
 * The function return true when classname not including exception else false
 */
export const checkClassName = (className: string, exceptions: string): boolean => {
  const classNameArr = className.split(' ');
  const exceptionsArr = exceptions.split(' ');

  return !classNameArr.some((str) => exceptionsArr.some((ex) => str.startsWith(ex)));
};

/**
 * The function setting intersection observer for element with selector
 * @param selector
 * @param callback
 * @param rootMargin
 * @param threshold
 */

type SetObserverProps = {
  selector: string;
  rootMargin?: string;
  threshold?: number;
  callback: (entries: IntersectionObserverEntry[]) => void;
};

export const setObserver = ({
  selector,
  callback,
  rootMargin = '20px',
  threshold = 1.0,
}: SetObserverProps): void => {
  const global = typeof window !== 'undefined' && window;
  if (global) {
    const targets = document.querySelectorAll(selector);
    const options = {
      rootMargin,
      threshold,
    };

    const observer = new IntersectionObserver(callback, options);
    !!targets &&
      targets.forEach((t) => {
        observer.observe(t);
      });
  }
};

/**
 * Enables smooth scroll for all browsers
 * @param to window offset you want to scroll to
 * @param duration duration for smooth scroll in ms
 * @param context what you want to scroll
 * @param verticalScroll true if you want vertical scroll
 * */

const easeInOutCubic = (t) => {
  return -t * (t - 2);
};

const position = (start, end, elapsed, duration) => {
  if (elapsed > duration) return end;
  return start + (end - start) * easeInOutCubic(elapsed / duration);
};

export const smoothScroll = (
  to: number,
  duration: number,
  context: any,
  verticalScroll?: boolean
) => {
  if (context && typeof window !== 'undefined') {
    const start = verticalScroll ? context.scrollTop : context.scrollLeft;
    const timeout = (fn) => {
      setTimeout(fn, 15);
    };
    const clock = Date.now();
    const requestAnimationFrame = window.requestAnimationFrame || timeout;

    const step = () => {
      const elapsed = Date.now() - clock;
      if (verticalScroll) {
        context.scrollTo(0, position(start, to, elapsed, duration));
      } else {
        context.scrollTo(position(start, to, elapsed, duration), 0);
      }
      if (elapsed < duration) {
        requestAnimationFrame(step);
      }
    };
    step();
  }
};
