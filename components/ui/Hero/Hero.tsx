/* eslint-disable react/no-array-index-key */
import { FC, useEffect, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styled, { keyframes } from 'styled-components'
import { DataModel } from '@lib/models'
import { I18nWidget } from '@components/common'
import { breakpoints, mixins } from 'styles'

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const StyledContent = styled.section`
  width: 100%;
  min-height: 100vh;
  padding: 5rem 0;
  flex-direction: column;
  position: relative;

  & h1 {
    font-size: clamp(
      ${({ theme }) => theme.fontSizes.lg},
      5vw,
      ${({ theme }) => theme.fontSizes['2xl']}
    );
    line-height: ${({ theme }) => theme.lineHeights.lg};
  }

  & h2 {
    font-size: clamp(
      ${({ theme }) => theme.fontSizes['2xl']},
      7vw,
      ${({ theme }) => theme.fontSizes['5xl']}
    );
    line-height: ${({ theme }) => theme.lineHeights['2xl']};
    text-transform: capitalize;
  }

  & h3 {
    color: var(--athens-gray);
    font-size: clamp(
      ${({ theme }) => theme.fontSizes['4xl']},
      8vw,
      ${({ theme }) => theme.fontSizes['7xl']}
    );
    line-height: ${({ theme }) => theme.lineHeights['4xl']};
    text-transform: capitalize;

    & .pulse {
      animation: 1000ms ${fadeIn} ease-in-out infinite alternate;
    }
  }

  & h4 {
    font-size: clamp(
      ${({ theme }) => theme.fontSizes['3xl']},
      7vw,
      ${({ theme }) => theme.fontSizes['6xl']}
    );
    line-height: ${({ theme }) => theme.lineHeights['3xl']};
  }

  & p {
    margin-top: 1rem;
    max-width: 400px;
    width: 100%;
  }

  ${mixins.flexLeft};

  @media (min-width: ${breakpoints.sm}) {
    & h1,
    & h2,
    & h3,
    & h4 {
      line-height: ${({ theme }) => theme.lineHeights['5xl']};
    }

    & p {
      max-width: 450px;
    }
  }

  @media (min-width: ${breakpoints.md}) {
    & p {
      max-width: 500px;
    }
  }

  @media (min-width: ${breakpoints.lg}) {
    & p {
      max-width: 550px;
    }
  }

  @media (min-width: ${breakpoints.xl}) {
    & p {
      max-width: 600px;
    }
  }
`
interface Props {
  hero: DataModel
}

const Hero: FC<Props> = ({ hero }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 1)
    return () => clearTimeout(timeout)
  }, [])

  const first = <h1>{hero.headerBefore}</h1>
  const second = <h2>{hero.headerAfter}</h2>
  const third = (
    <h3>
      {hero.header}
      <span className="pulse">.</span>
    </h3>
  )
  const fourth = <h4>{hero.body}</h4>
  const fith = <p>{hero.footer}</p>

  const items = [first, second, third, fourth, fith]

  return (
    <>
      <StyledContent>
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition
                key={i}
                classNames={i % 2 === 0 ? 'fadeleft' : 'faderight'}
                timeout={800}
              >
                <div style={{ transitionDelay: `${i * 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      </StyledContent>
      <I18nWidget />
    </>
  )
}

export default Hero
