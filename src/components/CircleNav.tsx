import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

type Props = {
  count: number;
  active: number;
  names: string[];
  onChange: (index: number) => void;
};

const CircleNav: React.FC<Props> = ({ count, active, names, onChange }) => {
  const radius = 265;
  const angleOffset = -Math.PI / 4;

  const circleRef = useRef<HTMLDivElement | null>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const nameRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    nameRefs.current.forEach((ref) => {
      if (ref) {
        gsap.set(ref, { opacity: 0 });
      }
    });

    if (circleRef.current) {
      const targetAngle = -active * (360 / count);

      const rotationTween = gsap.to(circleRef.current, {
        rotation: targetAngle,
        duration: 1,
        ease: 'power2.out',
        transformOrigin: 'center center',
        onUpdate: () => {
          dotsRef.current.forEach((dot, index) => {
            if (dot && circleRef.current) {
              const currentRotation = gsap.getProperty(circleRef.current, 'rotation') as number;
              gsap.set(dot, {
                rotation: -currentRotation,
                transformOrigin: 'center center',
              });
              const nameRef = nameRefs.current[index];
              if (nameRef) {
                gsap.set(nameRef, { opacity: 0 });
              }
            }
          });
        },
        onComplete: () => {
          const activeNameRef = nameRefs.current[active];
          if (activeNameRef) {
            gsap.to(activeNameRef, {
              opacity: 1,
              duration: 0.1,
              ease: 'power1.out',
            });
          }
        },
      });

      return () => {
        rotationTween.kill();
      };
    }
  }, [active, count]);

  const setDotRef = (el: HTMLDivElement | null, index: number) => {
    dotsRef.current[index] = el;
  };

  const setNameRef = (el: HTMLDivElement | null, index: number) => {
    nameRefs.current[index] = el;
  };

  return (
    <CircleContainer ref={circleRef}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (2 * Math.PI * i) / count + angleOffset;
        const x = radius + radius * Math.cos(angle);
        const y = radius + radius * Math.sin(angle);

        return (
          <Dot ref={(el) => setDotRef(el, i)} key={i} x={x} y={y} active={i === active} onClick={() => onChange(i)}>
            <DotNumber active={i === active}>{i + 1}</DotNumber>
            <ActiveName ref={(el) => setNameRef(el, i)} style={{ opacity: 0 }}>
              {names[i]}
            </ActiveName>
          </Dot>
        );
      })}
    </CircleContainer>
  );
};

export default CircleNav;

const CircleContainer = styled.div`
  position: relative;
  border: 1px solid rgb(66, 86, 122, 0.2);
  width: 530px;
  height: 530px;
  margin: 0 auto;
  border-radius: 50%;
  box-sizing: border-box;
`;

const ActiveName = styled.div`
  position: absolute;
  left: 76px;
  font-family:
    PT Sans,
    sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  color: rgb(66, 86, 122);
`;

const Dot = styled.div.attrs<{ x: number; y: number; active: boolean }>(({ x, y }) => ({
  style: {
    left: `${x}px`,
    top: `${y}px`,
  },
}))<{ x: number; y: number; active: boolean }>`
  position: absolute;
  width: ${({ active }) => (active ? '56px' : '6px')};
  height: ${({ active }) => (active ? '56px' : '6px')};
  background: ${({ active }) => (active ? 'rgb(244, 245, 249)' : 'rgb(66, 86, 122)')};
  border: ${({ active }) => (active ? '1px solid rgba(48, 62, 88, 0.5)' : 'none')};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-sizing: border-box;

  &:hover {
    width: 56px;
    height: 56px;
    border: 1px solid rgba(48, 62, 88, 0.5);
    background: rgb(244, 245, 249);
    & > div {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const DotNumber = styled.div<{ active: boolean }>`
  font-family: 'PT Sans', sans-serif;
  color: rgb(66, 86, 122);
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  opacity: ${({ active }) => (active ? 1 : 0)};
  transform: scale(${({ active }) => (active ? 1 : 0.5)});
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  user-select: none;
`;
