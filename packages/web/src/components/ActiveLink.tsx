import React, { Children, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link, { LinkProps } from 'next/link';

interface Props extends LinkProps {
  strict?: boolean;
  strictPag?: boolean;
}

// https://github.com/vercel/next.js/blob/canary/examples/active-class-name/components/ActiveLink.js
const ActiveLink = ({ children, href, strict = false, strictPag = false, onClick, ...props }: React.PropsWithChildren<Props>): JSX.Element => {
  const { asPath } = useRouter();
  const [path, setPath] = useState('/');
  const child = Children.only(children) as React.DetailedReactHTMLElement<any, HTMLElement>;
  const childClassName = child.props.className || '';
  const url = props.as || href || '/';
  const startsWithRegex = new RegExp('^' + url + '(?!-)');
  const startsWithRegexPaged = new RegExp('^' + url + '(?!-)/\\d+');

  // Wait for the browser to load to get the correct asPath
  useEffect(() => {
    if (!asPath) return;

    setPath(asPath);
  }, [asPath]);

  let className = childClassName;

  if (
    (strict && (path === url || startsWithRegexPaged.test(path))) ||
    ((!strict && !strictPag) && startsWithRegex.test(path)) ||
    (strictPag && path === url)
  ) className = `${childClassName} active`.trim();

  return (
    <Link href={href} {...props} legacyBehavior>
      {React.cloneElement(child, { className: className || null, onClick })}
    </Link>
  );
};

export default ActiveLink;
