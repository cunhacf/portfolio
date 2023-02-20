import { useRef, useState } from 'react';
import styled from 'styled-components';
import Slider, { Settings as SliderSettings } from 'react-slick';
import { rgba } from 'polished';

import Section, { SectionContent, SectionHeader } from '@/components/Section';
import { Container } from '@/components/Layout';
import { helpers } from '@/components/theme';

import sanityImage from '@root/utils/sanityImage';

import IconArrowRightRound from '@root/public/img/icon-arrow-right-round.svg';
import IconDiscography from '@root/public/img/icon-discography.svg';

import Record from './Record';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Props {
  section: SanityHomeDiscography;
  records?: SanityRecord[];
}

const Wrap = styled(Section)<Props>`
  margin-top: ${props => props.theme.helpers.toRem(83)};
  padding: ${props => props.theme.helpers.toRem(645)} 0 ${props => props.theme.helpers.toRem(136)};
  position: relative;
  overflow: hidden;
  background: url(${props => props.section.bg ? sanityImage(props.section.bg).url() : ''}) top center no-repeat;
  background-size: contain;
  z-index: 1;

  @media screen and (max-width: 1200px) {
    margin-top: 0;
    padding: 180px 0 0;
    z-index: 2;
  }

  &:before {
    content: '';
    width: 99999px;
    height: ${props => props.theme.helpers.toRem(1038)};
    position: absolute;
    top: ${props => props.theme.helpers.toRem(570)};
    left: 60%;
    border-radius: ${props => props.theme.helpers.toRem(30)};
    background: ${props => rgba(props.theme.colors.mainDark, 0.7)};
    z-index: -1;
  }

  ${SectionHeader} {
    display: flex;
    justify-content: flex-end;
  }
`;

const RecordList = styled(Slider)`
  margin-top: ${props => props.theme.helpers.toRem(-4)};
`;

const DiscographyButton = styled.div`
  margin-top: ${props => props.theme.helpers.toRem(-88)};
  position: relative;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-auto-rows: minmax(0, auto);
  grid-gap: ${props => props.theme.helpers.toRem(16)};
  grid-template-areas:
    'none none none none none none button-wrap button-wrap'
  ;
  z-index: 1;

  @media screen and (max-width: 1200px) {
    margin-top: 40px;
    display: flex;
    justify-content: center;
  }

  .button-wrap {
    padding: 0 0 0 ${props => props.theme.helpers.toRem(40)};
    grid-area: button-wrap;

    @media screen and (max-width: 1200px) {
      padding: 0;
    }

    button {
      padding: 0;
      border: 0;
      display: flex;
      align-items: center;
      cursor: pointer;
      background: transparent;
      color: ${props => props.theme.colors.secondary};
      transition: all 0.2s;

      &:hover {
        color: ${props => props.theme.colors.main};

        span {
          background: ${props => props.theme.colors.main};
        }
      }

      svg {
        vertical-align: top;
      }

      span {
        margin-left: ${props => props.theme.helpers.toRem(15)};
        padding: ${props => props.theme.helpers.toRem(12)} ${props => props.theme.helpers.toRem(20)};
        border-radius: ${props => props.theme.helpers.toRem(10)};
        font-family: General Sans;
        ${props => props.theme.helpers.fontSize(25)}
        font-weight: 600;
        background: ${props => props.theme.colors.secondary};
        color: ${props => props.theme.colors.mainDark};
        transition: all 0.2s;
      }
    }
  }
`;

const SliderControls = styled.div`
  margin-top: ${props => props.theme.helpers.toRem(65)};
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

const Discography = ({ section, records }: Props): JSX.Element | null => {
  const sliderRef = useRef<Slider>(null);

  const [currentSlide, setCurrentSlide] = useState(0);

  if (!records?.length || section?.disabled) return null;

  const sliderSettings: SliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
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
        return records.length - 1;
      } else {
        return currentSlide - 1;
      }
    });
  };

  const sliderPrev = () => {
    sliderRef.current?.slickPrev();

    setCurrentSlide(currentSlide => {
      if (currentSlide === records.length - 1) {
        return 0;
      } else {
        return currentSlide + 1;
      }
    });
  };

  return (
    <Wrap
      id="discografia"
      section={section}
      data-aos="fade">

      <Container>
        <SectionHeader>
          <h2 data-aos="fade-down" data-aos-delay="200">{section?.title || 'discografia'}</h2>
        </SectionHeader>

        <SectionContent>
          <RecordList
            {...sliderSettings}
            ref={sliderRef}>

            {records.map(record => <Record key={record._id} record={record} />)}
          </RecordList>

          <DiscographyButton
            data-aos="fade-up"
            data-aos-delay="200">

            <div className="button-wrap">
              <button onClick={() => sliderNext()}>
                <IconDiscography
                  width={helpers.toRem(81)}
                  height={helpers.toRem(81)} />

                <span>conheça a discografia</span>
              </button>
            </div>
          </DiscographyButton>

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
              {records.map((record, index) => (
                <div key={`dot-${record._id}`} className={`dot ${currentSlide === index ? 'active' : ''}`}>
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

export default Discography;
