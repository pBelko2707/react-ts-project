import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { YearRange } from '../mocks/historicalDates.mock';
import { MOBILE } from '../styles/breakpoints';

type AnimatedYearsProps = {
  timeData: YearRange[];
  activeIndex: number;
};

const AnimatedYears: React.FC<AnimatedYearsProps> = ({ activeIndex, timeData }) => {
  const startYearRef = useRef<HTMLSpanElement | null>(null);
  const endYearRef = useRef<HTMLSpanElement | null>(null);
  const prevIndexRef = useRef(activeIndex);

  useEffect(() => {
    const startElement = startYearRef.current;
    const endElement = endYearRef.current;

    if (!startElement || !endElement) return;

    if (prevIndexRef.current === activeIndex) return;

    const prevStart = timeData[prevIndexRef.current]?.startYear || 0;
    const prevEnd = timeData[prevIndexRef.current]?.endYear || 0;

    startElement.innerText = prevStart.toString();
    endElement.innerText = prevEnd.toString();

    gsap.to(startElement, {
      innerText: timeData[activeIndex].startYear,
      duration: 1,
      snap: { innerText: 1 },
      ease: 'power1.out',
      onUpdate: function () {
        const value = Math.floor(parseFloat(this.targets()[0].innerText));
        this.targets()[0].innerText = value.toString();
      },
    });

    gsap.to(endElement, {
      innerText: timeData[activeIndex].endYear,
      duration: 1,
      snap: { innerText: 1 },
      ease: 'power1.out',
      onUpdate: function () {
        const value = Math.floor(parseFloat(this.targets()[0].innerText));
        this.targets()[0].innerText = value.toString();
      },
    });

    prevIndexRef.current = activeIndex;
  }, [activeIndex, timeData]);

  return (
    <Years>
      <Year ref={startYearRef} color="blue">
        {timeData[activeIndex].startYear}
      </Year>
      <Year ref={endYearRef} color="pink">
        {timeData[activeIndex].endYear}
      </Year>
    </Years>
  );
};

export default AnimatedYears;

const Years = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  font-size: 64px;
  font-weight: bold;
  width: 973px;
  align-items: center;
  @media screen and (max-width: ${MOBILE}px) {
    width: 273px;
  }
`;

const Year = styled.span<{ color: 'blue' | 'pink' }>`
  color: ${({ color }) => (color === 'blue' ? 'rgb(93, 95, 239)' : 'rgb(239, 93, 168)')};
  font-family:
    PT Sans,
    sans-serif;
  font-size: 200px;
  font-weight: 700;
  line-height: 160px;
  text-align: center;
  @media screen and (max-width: ${MOBILE}px) {
    font-size: 56px;
    font-weight: 700;
    line-height: 72px;
  }
`;
