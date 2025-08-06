import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Swiper as SwiperClass } from 'swiper/types';
import styled from 'styled-components';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ReactComponent as ArrowIcon } from '../assets/icons/ArrowIcon.svg';
import { Event } from '../mocks/historicalDates.mock';
import { MOBILE } from '../styles/breakpoints';
import useIsDevice from '../hooks/useDevice';

type Props = {
  events: Event[];
};

const EventsSwiper: React.FC<Props> = ({ events }) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const { isMobile } = useIsDevice();

  useEffect(() => {
    if (swiperRef.current) {
      if ('slideTo' in swiperRef.current) {
        swiperRef.current.slideTo(0);
      }
    }
  }, [events]);
  return (
    <SwiperContainer>
      <NavButton className="swiper-button-prev">
        <ArrowIcon />
      </NavButton>
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={isMobile ? 1.5 : 3}
        onSwiper={(swiperInstance: SwiperClass) => {
          swiperRef.current = swiperInstance;
          swiperInstance.slideTo(0);
        }}
        spaceBetween={isMobile ? 25 : 80}
        navigation={
          !isMobile
            ? {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }
            : false
        }
        grabCursor={true}
        style={{
          paddingRight: isMobile ? '0' : '10px',
        }}
        pagination={
          isMobile
            ? {
                clickable: true,
                el: '.swiper-pagination',
              }
            : false
        }
      >
        {events.map((event, i) => (
          <SwiperSlide key={i}>
            <EventCard>
              <Title>{event.title}</Title>
              <Description>{event.description}</Description>
            </EventCard>
          </SwiperSlide>
        ))}
      </Swiper>

      <NavButton className="swiper-button-next">
        <ArrowIcon />
      </NavButton>
      <PaginationContainer>
        <div className="swiper-pagination" />
      </PaginationContainer>
    </SwiperContainer>
  );
};

export default EventsSwiper;

const SwiperContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  box-sizing: border-box;
  padding: 0 40px;
  @media screen and (max-width: ${MOBILE}px) {
    padding: 0;
    .swiper-slide {
      &:not(.swiper-slide-active) {
        opacity: 0.4;
      }
    }
  }
`;

const NavButton = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  box-shadow: 0px 0px 15px 0px rgba(56, 119, 238, 0.1);
  background: rgb(255, 255, 255);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  & svg {
    width: 5px;
    height: 10px;
  }
  &.swiper-button-prev {
    left: -20px;
    & > svg {
      transform: rotate(180deg);
    }
  }

  &.swiper-button-next {
    right: 0;
  }

  &:after {
    display: none;
  }
  @media screen and (max-width: ${MOBILE}px) {
    display: none;
  }
`;

const EventCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 135px;
  @media screen and (max-width: ${MOBILE}px) {
    height: auto;
  }
`;

const Title = styled.div`
  color: rgb(56, 119, 238);
  font-family:
    Bebas Neue,
    sans-serif;
  font-size: 25px;
  font-weight: 400;
  line-height: 120%;
  text-align: left;
  text-transform: uppercase;
  @media screen and (max-width: ${MOBILE}px) {
    font-size: 16px;
  }
`;

const Description = styled.div`
  color: rgb(66, 86, 122);
  font-family:
    PT Sans,
    sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  text-align: left;
  @media screen and (max-width: ${MOBILE}px) {
    font-size: 14px;
    line-height: 145%;
  }
`;

const PaginationContainer = styled.div`
  display: none;
  @media screen and (max-width: ${MOBILE}px) {
    position: absolute;
    display: flex;
    width: 100%;
    bottom: -110px;
    .swiper-pagination-bullet {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      opacity: 0.4;
      background: rgb(66, 86, 122);
    }

    .swiper-pagination-bullet-active {
      opacity: 1 !important;
    }

    .swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet {
      margin: 0 !important;
      transition: all 0.5s ease !important;
    }

    .swiper-pagination-bullets.swiper-pagination-horizontal {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;
      bottom: 0;
    }
  }
`;
