import Image from 'next/image'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import {
  FirebaseIcon,
  HtmlIcon,
  JavascriptIcon,
  NextjsIcon,
  NodejsIcon,
  ReactIcon,
  ReduxIcon,
  StyledComponentsIcon,
  TailwindcssIcon,
  TypescriptIcon,
} from '@components/icons'
import sr, { srConfig } from '@utils/sr'
import { breakpoints, mixins } from 'styles'
import { StyledTitle } from 'styles/utils'

const StyledContent = styled.section`
  width: 100%;
  min-height: 75vh;
  padding: 5rem 0;
`

const StyledWrapper = styled.div`
  margin: 2rem 0;
  flex-direction: column;

  ${mixins.flexCenter};

  @media (min-width: ${breakpoints.lg}) {
    flex-direction: row;
  }

  & .formattedImg {
    flex: 0 200px;
    width: 200px;
    filter: drop-shadow(0px 8px 16px #17375b);

    @media (min-width: ${breakpoints.md}) {
      width: 225px;
      flex: 0 225px;
    }

    @media (min-width: ${breakpoints.xl}) {
      width: 250px;
      flex: 0 250px;
    }

    & .rounded {
      border-radius: 50%;
    }
  }

  & .bio {
    flex: 1;
    width: 100%;
    margin: 3rem 0 0;

    @media (min-width: ${breakpoints.lg}) {
      margin: 0 0 0 3rem;
    }
  }
`

const StyledSkills = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(140px, 250px));
  row-gap: 1rem;
  margin: 1.5rem auto;
  font-family: ${({ theme }) => theme.fontMono};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  justify-content: center;

  & li {
    display: flex;
    align-items: center;

    & span {
      margin-right: 0.5rem;

      & svg {
        width: 24px;
        height: 24px;
      }
    }
  }
`

const About = () => {
  const ref = useRef<HTMLElement | any>(null)

  useEffect(() => {
    sr().reveal(ref.current, srConfig())
  }, [])

  return (
    <StyledContent id="about" ref={ref}>
      <StyledTitle>
        <h2>about</h2>
        <div className="borders">
          <span className="border" />
          <span className="border" />
        </div>
      </StyledTitle>
      <StyledWrapper>
        <div className="formattedImg">
          <Image
            loading="eager"
            className="rounded"
            alt="Avatar"
            unoptimized
            src="/me.jpg"
            width={300}
            height={300}
          />
        </div>

        <div className="bio">
          <div>
            <h3>Bachelor of Systems Engineering.</h3>
            <p>I&apos;m a weird guy who likes making weird things with web technologies.</p>
            <p>Here are a few that I&apos;ve been working with recently :</p>
          </div>
          <StyledSkills>
            <li>
              <span>
                <HtmlIcon />
              </span>
              HTML & (S)CSS
            </li>
            <li>
              <span>
                <JavascriptIcon />
              </span>
              Javascript (ES6+)
            </li>
            <li>
              <span>
                <FirebaseIcon />
              </span>
              Firebase
            </li>
            <li>
              <span>
                <NextjsIcon />
              </span>
              Next.js
            </li>
            <li>
              <span>
                <NodejsIcon />
              </span>
              Node.js
            </li>
            <li>
              <span>
                <ReactIcon />
              </span>
              React
            </li>
            <li>
              <span>
                <ReduxIcon />
              </span>
              Redux & Redux-thunk
            </li>
            <li>
              <span>
                <StyledComponentsIcon />
              </span>
              Styled Components
            </li>
            <li>
              <span>
                <TailwindcssIcon />
              </span>
              Tailwindcss
            </li>
            <li>
              <span>
                <TypescriptIcon />
              </span>
              Typescript
            </li>
          </StyledSkills>
        </div>
      </StyledWrapper>
    </StyledContent>
  )
}

export default About
