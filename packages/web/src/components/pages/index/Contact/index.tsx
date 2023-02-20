import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import Section, { SectionContent, SectionHeader } from '@/components/Section';
import { Container } from '@/components/Layout';
import { helpers } from '@/components/theme';

import logo from '@root/public/img/logo-lb.png';
import LogoContratantes from '@root/public/img/logo-contratantes.svg';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Props {
  config: SanitySiteConfig;
  section: SanityHomeContact;
}

const Wrap = styled(Section)<Omit<Props, 'config'>>`
  margin: ${props => props.theme.helpers.toRem(-786)} 0 ${props => props.theme.helpers.toRem(33)};
  position: relative;
  overflow: hidden;
  z-index: 1;

  @media screen and (max-width: 1200px) {
    margin: ${props => props.theme.helpers.toRem(-400)} 0 ${props => props.theme.helpers.toRem(33)};
  }

  ${SectionContent} {
    display: grid;
    grid-column-gap: ${props => props.theme.helpers.toRem(16)};
    grid-template-columns: repeat(8, 1fr);

    @media screen and (max-width: 1200px) {
      display: block;
    }

    &:not(:last-child) {
      margin-bottom: ${props => props.theme.helpers.toRem(10)};
    }
  }
`;

const Logo = styled.div`
  margin: 0 ${props => props.theme.helpers.toRem(-35)} 0 auto;
  grid-column: 1 / span 4;

  @media screen and (max-width: 1200px) {
    margin: 0;
    text-align: center;
    overflow: hidden;
  }

  img {
    width: ${props => props.theme.helpers.toRem(1012)};
    height: ${props => props.theme.helpers.toRem(444)};
    margin: 0 ${props => props.theme.helpers.toRem(-32)} 0 ${props => props.theme.helpers.toRem(-128)};
    vertical-align: top;

    @media screen and (max-width: 1200px) {
      width: 100%;
      max-width: 500px;
      height: auto;
      margin: 0;
    }
  }
`;

const Contacts = styled.div`
  display: grid;
  grid-gap: ${props => props.theme.helpers.toRem(16)};
  grid-template-columns: repeat(4, 1fr);
  grid-column: 5 / span 4;

  @media screen and (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 40px;
  }
`;

const ContactColumn = styled.div`
  grid-column: auto / span 2;

  @media screen and (max-width: 1200px) {
    text-align: center;
  }

  h3 {
    margin: 0;
    ${props => props.theme.helpers.fontSize(65)}
    font-weight: 600;
  }

  ul {
    margin: ${props => props.theme.helpers.toRem(5)} 0 0;
    padding: 0;
    list-style: none;
  }

  li {
    margin: 0;
    padding: 0;
  }

  a {
    color: ${props => props.theme.colors.main};

    &:hover {
      color: ${props => props.theme.colors.secondary};
    }
  }

  .phone,
  .whatsapp {
    ${props => props.theme.helpers.fontSize(45)}
    font-weight: 700;

    small {
      margin-right: -0.1em;
      font-size: 0.622em;
    }
  }

  .email {
    ${props => props.theme.helpers.fontSize(28)}
    font-weight: 600;
  }

  .text {
    ${props => props.theme.helpers.fontSize(33)}
    font-weight: 700;
  }
`;

const Contratantes = styled.div`
  grid-column: 4 / span 2;
  text-align: center;

  @media screen and (max-width: 1200px) {
    margin-top: 60px;
  }

  @media screen and (max-width: 640px) {
    margin-top: 80px;
  }

  a {
    display: block;
    color: ${props => props.theme.colors.main};

    &:hover {
      color: ${props => props.theme.colors.secondary};
    }
  }

  p {
    margin: ${props => props.theme.helpers.toRem(30)} 0 0;
    ${props => props.theme.helpers.fontSize(20)}
    letter-spacing: 0.3em;
  }
`;

const Contact = ({ config, section }: Props): JSX.Element | null => {
  if (section?.disabled) return null;

  return (
    <Wrap
      id="contato"
      section={section}
      data-aos="fade">

      <Container>
        <SectionHeader>
          <h2 data-aos="fade-down" data-aos-delay="200">{section?.title || 'contato'}</h2>
        </SectionHeader>

        <SectionContent data-aos="fade-up" data-aos-delay="200">
          <Logo data-aos="fade-up" data-aos-delay="200">
            <Image
              width={1012}
              height={444}
              src={logo}
              alt="Logotipo" />
          </Logo>

          <Contacts>
            {section.contacts.map(contact => (
              <ContactColumn key={contact._key} data-aos="fade-up" data-aos-delay="400">
                <h3>{contact.title}</h3>

                <ul>
                  {contact.details.map(detail => (
                    <li key={detail._key}>
                      {detail.type === 'whatsapp' && (
                        <Link
                          className={detail.type}
                          href={`https://wa.me/+55${detail.prefix}${detail.value.replace(/[.\-() ]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer">

                          <small>{detail.prefix}</small> {detail.value}
                        </Link>
                      )}

                      {detail.type === 'phone' && (
                        <Link
                          className={detail.type}
                          href={`tel:${detail.prefix}${detail.value.replace(/[.\-() ]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer">

                          <small>{detail.prefix}</small> {detail.value}
                        </Link>
                      )}

                      {detail.type === 'email' && (
                        <Link
                          className={detail.type}
                          href={`mailto:${detail.value}`}
                          target="_blank"
                          rel="noopener noreferrer">

                          {detail.value}
                        </Link>
                      )}

                      {detail.type === 'text' && (
                        <span className={detail.type}>{detail.value}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </ContactColumn>
            ))}
          </Contacts>
        </SectionContent>

        {config?.urlContratantes && <SectionContent data-aos="fade" data-aos-delay="200">
          <Contratantes>
            <Link href={config.urlContratantes} target="_blank" rel="noopener noreferrer">
              <LogoContratantes
                width={helpers.toRem(274)}
                height={helpers.toRem(80)} />

              <p>acesso exclusivo</p>
            </Link>
          </Contratantes>
        </SectionContent>}
      </Container>
    </Wrap>
  );
};

export default Contact;
