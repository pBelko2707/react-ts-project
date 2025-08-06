import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ArrowIcon } from '../assets/icons/ArrowIcon.svg';
import { MOBILE } from '../styles/breakpoints';

type Props = {
  activeIndex: number;
  totalItems: number;
  onSlideChange: (index: number) => void;
};

const NavigationButtons: React.FC<Props> = ({ activeIndex, totalItems, onSlideChange }) => {
  return (
    <NavigationContainer>
      <Counter>
        {String(activeIndex + 1).padStart(2, '0')}/{String(totalItems).padStart(2, '0')}
      </Counter>
      <NavContainer>
        <NavButton
          onClick={() => onSlideChange(activeIndex - 1)}
          disabled={activeIndex === 0}
          style={{ transform: 'rotate(180deg)' }}
        >
          <ArrowIcon />
        </NavButton>
        <NavButton onClick={() => onSlideChange(activeIndex + 1)} disabled={activeIndex === totalItems - 1}>
          <ArrowIcon />
        </NavButton>
      </NavContainer>
    </NavigationContainer>
  );
};

export default NavigationButtons;

const NavButton = styled.button`
  background: transparent;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  border: 1px solid rgba(66, 86, 122, 0.5);
  padding: 0;
  &:hover {
    background: rgb(255, 255, 255);
    box-shadow: 0px 0px 15px 0px rgba(56, 119, 238, 0.1);
  }
  & svg {
    & > path {
      stroke: rgb(66, 86, 122);
    }
  }
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  @media screen and (max-width: ${MOBILE}px) {
    width: 25px;
    height: 25px;
    & svg {
      width: 4px;
      height: 6px;
    }
  }
`;

const NavContainer = styled.div`
  display: flex;
  gap: 20px;
  @media screen and (max-width: ${MOBILE}px) {
    gap: 8px;
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media screen and (max-width: ${MOBILE}px) {
    gap: 10px;
  }
`;

const Counter = styled.div`
  color: rgb(66, 86, 122);
  font-family:
    PT Sans,
    sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  text-align: left;
  @media screen and (max-width: ${MOBILE}px) {
  }
`;
