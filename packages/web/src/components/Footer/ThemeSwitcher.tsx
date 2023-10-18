import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useTranslation } from '@/components/Translation';

import IconSun from '@/assets/img/icon-sun.svg';
import IconMoon from '@/assets/img/icon-moon.svg';

type AppTheme = 'light' | 'dark' | string;

const Wrap = styled.div`
  display: inline-block;

  @media screen and (max-width: 960px) {
    margin: 20px 0;
  }
`;

const Toggler = styled.button`
  padding: 0;
  display: block;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;

  svg {
    vertical-align: top;
  }
`;

const ThemeSwitcher = () => {
  const { t } = useTranslation();
  const [theme, setTheme] = useState<AppTheme>();

  useEffect(() => {
    if (!window) return;

    const preferredTheme: AppTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const storageTheme: AppTheme = localStorage.getItem('theme') as string;

    setTheme(storageTheme || preferredTheme || 'light');
  }, []);

  useEffect(() => {
    if (!theme) return;

    localStorage.setItem('theme', theme);
    window.dispatchEvent(new Event('storage'));
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Wrap>
      <Toggler
        title={`${theme === 'light' ? t('enable') : t('disable')} ${t('darkMode')}`}
        onClick={handleThemeToggle}>

        {theme === 'light' ? (
          <IconMoon
            width="20"
            height="20" />
        ) : (
          <IconSun
            width="20"
            height="20" />
        )}
      </Toggler>
    </Wrap>
  );
};

export default ThemeSwitcher;
