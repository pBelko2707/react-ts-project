import React, { useState } from 'react';
import styled from 'styled-components';
import { MOBILE } from '../styles/breakpoints';
import EventsSwiper from './EventsSwiper';
import NavigationButtons from './NavigationButtons';
import CircleNav from './CircleNav';
import AnimatedYears from './AnimatedYears';
import { timeData } from '../mocks/historicalDates.mock';

const Main: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleIndexChange = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < timeData.length) {
      setActiveIndex(newIndex);
    }
  };
  return (
    <Container>
      <ContentContainer>
        <LeftContent>
          <TitleContainer>
            <TitleBlock>
              <Title>Исторические даты</Title>
            </TitleBlock>
          </TitleContainer>
        </LeftContent>
        <RightContent />
        <WrapperCircle>
          <CircleNav
            count={timeData.length}
            active={activeIndex}
            onChange={handleIndexChange}
            names={timeData.map((item) => item.name)}
          />
        </WrapperCircle>
        <WrapperAnimatedYears>
          <AnimatedYears timeData={timeData} activeIndex={activeIndex} />
        </WrapperAnimatedYears>
      </ContentContainer>
      <SliderContainer>
        <LeftContent>
          <WrapperNavigationButtons>
            <NavigationButtons
              activeIndex={activeIndex}
              totalItems={timeData.length}
              onSlideChange={handleIndexChange}
            />
          </WrapperNavigationButtons>
        </LeftContent>
        <WrapperSwiper>
          <ContainerSwiper>
            <EventsSwiper events={timeData[activeIndex].events} />
          </ContainerSwiper>
        </WrapperSwiper>
      </SliderContainer>
    </Container>
  );
};

export default Main;

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1440px;
  flex-direction: column;
  position: relative;
  @media screen and (max-width: ${MOBILE}px) {
    max-width: 100%;
  }
`;
const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-left: 1px solid rgba(66, 86, 122, 0.1);
  border-right: 1px solid rgba(66, 86, 122, 0.1);
  border-bottom: 1px solid rgba(66, 86, 122, 0.1);
  box-sizing: border-box;
  @media screen and (max-width: ${MOBILE}px) {
    border: none;
    padding: 60px 20px 0 20px;
    display: flex;
    flex-direction: column;
    gap: 56px;
  }
`;

const LeftContent = styled.div`
  display: flex;
  border-right: 1px solid rgba(66, 86, 122, 0.1);
  box-sizing: border-box;
  @media screen and (max-width: ${MOBILE}px) {
    border: none;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  margin-top: 170px;
  padding-left: 80px;
  margin-bottom: 176px;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: -1px;
    top: 50%;
    transform: translateY(-50%);
    height: 120px;
    width: 5px;
    background: linear-gradient(to bottom, rgb(56, 119, 238), rgb(239, 93, 168));
  }
  @media screen and (max-width: ${MOBILE}px) {
    &::before {
      display: none;
    }
    padding: 0;
    margin: 0;
  }
`;

const TitleBlock = styled.div`
  display: flex;
  text-align: left;
  max-width: 353px;
  @media screen and (max-width: ${MOBILE}px) {
    max-width: 123px;
  }
`;

const Title = styled.h1`
  margin: 0;
  color: rgb(66, 86, 122);
  font-family:
    PT Sans,
    sans-serif;
  font-size: 56px;
  font-weight: 700;
  line-height: 120%;
  @media screen and (max-width: ${MOBILE}px) {
    font-size: 20px;
  }
`;

const RightContent = styled.div`
  display: flex;
  @media screen and (max-width: ${MOBILE}px) {
    display: none;
  }
`;

const SliderContainer = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: grid;
  position: relative;
  grid-template-columns: 1fr 1fr;
  border-left: 1px solid rgba(66, 86, 122, 0.1);
  border-right: 1px solid rgba(66, 86, 122, 0.1);
  border-bottom: 1px solid rgba(66, 86, 122, 0.1);
  @media screen and (max-width: ${MOBILE}px) {
    border: none;
    display: flex;
    flex-direction: column-reverse;
    padding: 20px 0 20px 20px;
  }
`;

const WrapperCircle = styled.div`
  display: flex;
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  top: 215px;
  z-index: 9;
  @media screen and (max-width: ${MOBILE}px) {
    display: none;
  }
`;

const WrapperAnimatedYears = styled.div`
  display: flex;
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  top: 400px;
  @media screen and (max-width: ${MOBILE}px) {
    position: relative;
    left: inherit;
    top: inherit;
    transform: none;
    border-bottom: 1px solid rgb(199, 205, 217);
    padding-bottom: 57px;
    justify-content: center;
  }
`;

const WrapperNavigationButtons = styled.div`
  display: flex;
  margin: 217px 0 295px 80px;
  @media screen and (max-width: ${MOBILE}px) {
    margin: 78px 0 0 0;
  }
`;

const WrapperSwiper = styled.div`
  display: flex;
  position: absolute;
  bottom: 100px;
  background: transparent;
  width: 100%;
  @media screen and (max-width: ${MOBILE}px) {
    position: relative;
    bottom: initial;
  }
`;

const ContainerSwiper = styled.div`
  display: flex;
  width: 100%;
  padding: 0 40px 0 40px;
  box-sizing: border-box;
  @media screen and (max-width: ${MOBILE}px) {
    padding: 0;
  }
`;
