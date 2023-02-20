import { useRef, useState } from 'react';
import Link from 'next/link';
import { rgba } from 'polished';
import styled from 'styled-components';

import ActiveLink from '@/components/ActiveLink';

interface Props {
  items: SanityNavigation[];
  className?: string;
}

interface CollapsibleProps {
  open: boolean;
}

interface ItemProps {
  open?: boolean;
}

const Wrap = styled.nav`

`;

const Hamburger = styled.button`
  height: ${props => props.theme.helpers.toRem(38)};
  margin-right: ${props => props.theme.helpers.toRem(26)};
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;

  &:hover {
    span {
      background: ${props => props.theme.colors.secondary};
    }
  }

  @media screen and (max-width: 1200px) {
    margin: 10px 26px 10px 0;
  }

  span {
    height: ${props => props.theme.helpers.toRem(4)};
    margin: ${props => props.theme.helpers.toRem(4)} 0;
    display: block;
    background: ${props => props.theme.colors.main};
    transition: all 0.2s;

    &:nth-child(1) {
      width: ${props => props.theme.helpers.toRem(38)};
    }

    &:nth-child(2) {
      width: ${props => props.theme.helpers.toRem(25)};
    }

    &:nth-child(3) {
      width: ${props => props.theme.helpers.toRem(36)};
    }
  }
`;

const Collapsible = styled.div<CollapsibleProps>`
  max-width: ${props => props.open ? '100vw' : 0};
  display: flex;
  align-items: center;
  overflow: hidden;
  transition: max-width 0.3s ease-in-out, max-height 0.3s ease-in-out;

  @media screen and (max-width: 1200px) {
    max-height: ${props => props.open ? '100vw' : 0};
    align-items: flex-start;
  }
`;

const Close = styled.button`
  height: ${props => props.theme.helpers.toRem(38)};
  padding: 0 ${props => props.theme.helpers.toRem(26)};
  border: 0;
  background: transparent;
  cursor: pointer;
  transform: rotate(180deg);

  @media screen and (max-width: 1200px) {
    display: none;
  }

  &:hover {
    span {
      background: ${props => props.theme.colors.secondary};
    }
  }

  span {
    height: ${props => props.theme.helpers.toRem(2)};
    display: block;
    background: ${props => props.theme.colors.main};
    transform-origin: ${props => props.theme.helpers.toRem(3)};
    transition: all 0.2s;

    &:nth-child(1) {
      width: ${props => props.theme.helpers.toRem(9)};
      transform: rotate(45deg);
    }

    &:nth-child(2) {
      width: ${props => props.theme.helpers.toRem(7)};
      transform: rotate(-45deg);
    }
  }
`;

const Items = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
`;

const Item = styled.li<ItemProps>`
  margin: 0 20px;
  font-weight: 500;

  a {
    color: ${props => props.theme.colors.mainDark};

    &:hover {
      color: ${props => props.theme.colors.secondary};
    }
  }
`;

const Menu = ({ items, className }: Props): JSX.Element => {
  const [open, setOpen] = useState(true);

  const getPagePrefix = (type: string) => {
    switch (type) {
      case 'blogPost':
        return '/blog';

      default:
        return '';
    }
  };

  return (
    <Wrap className={className}>
      <Items>
        {items.map(item => (
          <Item key={`menu-${item._id}`}>
            {item.external ? (
              <Link
                href={item.externalUrl as string}
                onClick={() => setOpen(false)}>

                {item.title}
              </Link>
            ) : (
              <ActiveLink
                href={`${getPagePrefix(item.internalPage?._type as string)}/${item.internalPage?.slug.current}`}
                onClick={() => setOpen(false)}>

                <a>{item.title}</a>
              </ActiveLink>
            )}
          </Item>
        ))}
      </Items>
    </Wrap>
  );
};

export default Menu;
