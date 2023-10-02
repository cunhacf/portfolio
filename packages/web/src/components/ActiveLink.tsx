import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link, { LinkProps } from 'next/link';

interface Props extends LinkProps {
  className?: string;
  strict?: boolean;
  strictPag?: boolean;
  children?: JSX.Element[] | JSX.Element | string;
}

// https://github.com/vercel/next.js/blob/canary/examples/active-class-name/components/ActiveLink.js
const ActiveLink = ({ children, className = '', href, strict = false, strictPag = false, ...props }: Props) => {
  const pathname = usePathname();
  const [path, setPath] = useState('/');
  const url = props.as || href || '/';
  const startsWithRegex = new RegExp('^' + url + '(?!-)');
  const startsWithRegexPaged = new RegExp('^' + url + '(?!-)/\\d+');

  // Wait for the browser to load to get the correct pathname
  useEffect(() => {
    if (!pathname) return;

    setPath(pathname);
  }, [pathname]);

  let newClassName = className;

  if (
    (strict && (path === url || startsWithRegexPaged.test(path))) ||
    ((!strict && !strictPag) && startsWithRegex.test(path)) ||
    (strictPag && path === url)
  ) newClassName += ' active';

  return (
    <Link href={href} className={newClassName} {...props}>
      {children}
    </Link>
  );
};

export default ActiveLink;
