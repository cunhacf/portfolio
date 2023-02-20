import styled from 'styled-components';

import { helpers } from '@/components/theme';

import IconArrowRightRound from '@root/public/img/icon-arrow-right-round.svg';

interface Props {
  event: SanityEvent;
}

const Wrap = styled.div`
  padding: 0 ${props => props.theme.helpers.toRem(30)} ${props => props.theme.helpers.toRem(30)};
  position: relative;
  z-index: 1;

  @media screen and (max-width: 960px) {
    text-align: center;
  }
`;

const City = styled.div`
  ${props => props.theme.helpers.fontSize(44)}
  font-weight: 600;
  color: ${props => props.theme.colors.secondaryAlt};

  @media screen and (max-width: 1200px) {
    ${props => props.theme.helpers.fontSize(34)}
  }
`;

const Location = styled.div`
  ${props => props.theme.helpers.fontSize(25)}
  font-weight: 600;

  @media screen and (max-width: 1200px) {
    ${props => props.theme.helpers.fontSize(18)}
  }
`;

const EventDate = styled.div`
  margin-top: ${props => props.theme.helpers.toRem(-80)};
  position: relative;
  white-space: nowrap;
  z-index: -1;

  @media screen and (max-width: 1200px) {
    margin-top: ${props => props.theme.helpers.toRem(-40)};
  }
`;

const Day = styled.span`
  display: inline-block;
  vertical-align: middle;
  ${props => props.theme.helpers.fontSize(384)}
  font-weight: 900;
  color: ${props => props.theme.colors.secondary};

  @media screen and (max-width: 1200px) {
    ${props => props.theme.helpers.fontSize(224)}
  }
`;

const Month = styled.span`
  margin: 0 0 ${props => props.theme.helpers.toRem(34)} ${props => props.theme.helpers.toRem(-154)};
  display: inline-block;
  vertical-align: bottom;
  ${props => props.theme.helpers.fontSize(127)}
  font-weight: 900;
  text-transform: uppercase;

  @media screen and (max-width: 1200px) {
    margin: 0 0 ${props => props.theme.helpers.toRem(34)} ${props => props.theme.helpers.toRem(-94)};
    ${props => props.theme.helpers.fontSize(60)}
  }
`;

const Tickets = styled.div`
  margin-top: ${props => props.theme.helpers.toRem(-56)};

  @media screen and (max-width: 1200px) {
    margin-top: ${props => props.theme.helpers.toRem(-36)};
  }

  a {
    display: inline-flex;
    align-items: center;
    ${props => props.theme.helpers.fontSize(31)}
    font-weight: 600;
    line-height: ${props => props.theme.helpers.toRem(28)};
    color: ${props => props.theme.colors.secondaryAlt};

    @media screen and (max-width: 1200px) {
      ${props => props.theme.helpers.fontSize(24)}
      line-height: ${props => props.theme.helpers.toRem(21)};
    }

    &:hover,
    &:focus {
      color: ${props => props.theme.colors.main};

      svg {
        fill: ${props => props.theme.colors.main};
      }
    }

    svg {
      margin-left: ${props => props.theme.helpers.toRem(10)};
      vertical-align: top;
      fill: ${props => props.theme.colors.secondary};
      transition: inherit;

      @media screen and (max-width: 1200px) {
        width: ${props => props.theme.helpers.toRem(40)};
        height: ${props => props.theme.helpers.toRem(40)};
      }
    }
  }
`;

const Event = ({ event }: Props): JSX.Element => {
  const parsedDate = new Date(event.date + 'T00:00');
  const day = Intl.DateTimeFormat('pt-BR', { day: '2-digit' }).format(parsedDate);
  const month = Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(parsedDate).replace('.', '');

  return (
    <Wrap>
      <City>{event.city}</City>

      <Location>{event.location}</Location>

      <EventDate>
        <Day>{day}</Day>
        <Month>{month}</Month>
      </EventDate>

      {event.ticketsUrl && <Tickets>
        <a href={event.ticketsUrl} target="_blank" rel="noopener noreferrer">
          <span>Comprar<br/> Ingresso</span>
          <IconArrowRightRound
            width={helpers.toRem(50)}
            height={helpers.toRem(50)} />
        </a>
      </Tickets>}
    </Wrap>
  );
};

export default Event;
