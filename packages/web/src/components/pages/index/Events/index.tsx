import { useRef, useState } from 'react';
import styled from 'styled-components';
import Slider, { Settings as SliderSettings } from 'react-slick';

import Section, { SectionContent, SectionHeader } from '@/components/Section';
import { Container } from '@/components/Layout';
import { helpers } from '@/components/theme';

import sanityImage from '@root/utils/sanityImage';
import useMedia from '@root/utils/useMedia';

import IconArrowRightRound from '@root/public/img/icon-arrow-right-round.svg';

import Event from './Event';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Props {
  section: SanityHomeEvents;
  events?: SanityEvent[];
}

const Wrap = styled(Section)<Props>`
  margin-top: ${props => props.theme.helpers.toRem(-276)};
  padding: ${props => props.theme.helpers.toRem(612)} 0 ${props => props.theme.helpers.toRem(440)};
  position: relative;
  background: url(${props => props.section.bg ? sanityImage(props.section.bg).url() : ''}) top center no-repeat;
  background-size: contain;
  z-index: 1;

  @media screen and (max-width: 1200px) {
    margin-top: -100px;
    padding: 0 0 ${props => props.theme.helpers.toRem(200)};
    background-size: cover;
  }

  @media screen and (max-width: 960px) {
    background: none
  }

  @media screen and (max-width: 640px) {
    margin-top: 0;
  }
`;

const EventList = styled(Slider)`
  margin-top: ${props => props.theme.helpers.toRem(87)};
  padding: 0 ${props => props.theme.helpers.toRem(112)};

  @media screen and (max-width: 1200px) {
    margin-top: ${props => props.theme.helpers.toRem(40)};
    padding: 0  ${props => props.theme.helpers.toRem(160)} 0 0;
  }

  @media screen and (max-width: 960px) {
    padding: 0;
  }
`;

const SliderControls = styled.div`
  display: flex;
  justify-content: center;

  .slider-btn {
    margin: 0 ${props => props.theme.helpers.toRem(19)};
    padding: 0;
    border: 0;
    background: transparent;
    color: ${props => props.theme.colors.secondaryAlt};
    cursor: pointer;

    &:hover,
    &:focus {
      color: ${props => props.theme.colors.secondary};
    }

    svg {
      vertical-align: top;
    }

    &.prev {
      svg {
        transform: rotate(-180deg);
      }
    }
  }

  .slider-dots {
    display: flex;
    align-items: center;

    div {
      margin: 0 ${props => props.theme.helpers.toRem(19)};

      button {
        width: ${props => props.theme.helpers.toRem(14)};
        height: ${props => props.theme.helpers.toRem(14)};
        padding: 0;
        display: block;
        border: ${props => props.theme.helpers.toRem(2)} solid ${props => props.theme.colors.secondaryAlt};
        border-radius: 100%;
        background: transparent;
      }

      &.active {
        button {
          background: ${props => props.theme.colors.secondary};
        }
      }
    }
  }
`;

const Events = ({ section, events }: Props): JSX.Element | null => {
  const sliderRef = useRef<Slider>(null);
  const slidesToShow = useMedia<number>(['(min-width: 1201px)', '(min-width: 769px)', '(min-width: 1px)'], [3, 2, 1], 3);

  const [currentSlide, setCurrentSlide] = useState(0);

  if (!events?.length || section?.disabled) return null;

  const sliderSettings: SliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow,
    slidesToScroll: 1,
    afterChange: (index) => setCurrentSlide(index)
  };

  const sliderGoToIndex = (index: number) => {
    sliderRef.current?.slickGoTo(index);
    setCurrentSlide(index);
  };

  const sliderNext = () => {
    sliderRef.current?.slickNext();

    setCurrentSlide(currentSlide => {
      if (currentSlide === 0) {
        return events.length - 1;
      } else {
        return currentSlide - 1;
      }
    });
  };

  const sliderPrev = () => {
    sliderRef.current?.slickPrev();

    setCurrentSlide(currentSlide => {
      if (currentSlide === events.length - 1) {
        return 0;
      } else {
        return currentSlide + 1;
      }
    });
  };

  return (
    <Wrap
      id="agenda"
      section={section}
      data-aos="fade">

      <Container>
        <SectionHeader>
          <h2 data-aos="fade-down" data-aos-delay="200">{section?.title || 'agenda'}</h2>
        </SectionHeader>

        <SectionContent data-aos="fade-up">
          {events.map(event => (
            <script
              key={`event-schema-${event._id}`}
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: `
                  {
                    "@context": "https://schema.org",
                    "@type": "MusicEvent",
                    "name": "${event.city}",
                    "url" : "${event.ticketsUrl}",
                    "startDate" : "${event.date}",
                    "location" : {
                        "@type" : "Place",
                        "name" : "${event.location}"
                    }
                  }
                `
              }} />
          ))}

          <EventList
            {...sliderSettings}
            ref={sliderRef}>

            {events.map(event => <Event data-aos="fade" key={event._id} event={event} />)}
            {events.length < slidesToShow && ((new Array(slidesToShow - events.length).fill('')).map((_, index) => <div key={`fake-event-${index}`}></div>))}
          </EventList>

          <SliderControls>
            <button
              className="slider-btn prev"
              title="Anterior"
              onClick={() => sliderPrev()}>

              <IconArrowRightRound
                width={helpers.toRem(28)}
                height={helpers.toRem(28)} />
            </button>

            <div className="slider-dots">
              {events.map((event, index) => (
                <div key={`dot-${event._id}`} className={`dot ${currentSlide === index ? 'active' : ''}`}>
                  <button onClick={() => sliderGoToIndex(index)}></button>
                </div>
              ))}
            </div>

            <button
              className="slider-btn next"
              title="Próximo"
              onClick={() => sliderNext()}>

              <IconArrowRightRound
                width={helpers.toRem(28)}
                height={helpers.toRem(28)} />
            </button>
          </SliderControls>
        </SectionContent>
      </Container>
    </Wrap>
  );
};

export default Events;
