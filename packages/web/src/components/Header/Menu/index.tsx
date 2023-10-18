import Link from 'next/link';
import styled from 'styled-components';

import ActiveLink from '@/components/ActiveLink';
import { useTranslation } from '@/components/Translation';

interface Props {
  items: SanityNavigation[];
  className?: string;
}

interface ItemProps {
  open?: boolean;
}

const Wrap = styled.nav`
  @media screen and (max-width: 640px) {
    display: none;
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

const Menu = ({ items, className }: Props) => {
  const { locale } = useTranslation();

  const getPagePrefix = (type: string) => {
    switch (type) {
      case 'blogPost':
        return `/${locale}/blog`;

      default:
        return `/${locale}/`;
    }
  };

  return (
    <Wrap className={className}>
      <Items>
        {items.map(item => (
          <Item key={`menu-${item._id}`}>
            {item.external ? (
              <Link
                href={item.externalUrl as string}>

                {item.title}
              </Link>
            ) : (
              <ActiveLink
                href={`${getPagePrefix(item.internalPage?._type as string)}/${item.internalPage?.slug.current}`}>

                {item.title}
              </ActiveLink>
            )}
          </Item>
        ))}
      </Items>
    </Wrap>
  );
};

export default Menu;
