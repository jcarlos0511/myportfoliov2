import { FC, useState, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'
import { DataModel } from '@lib/data'
import sr, { srConfig } from '@utils/sr'
import { Icon, Title } from '@components/common'
import { breakpoints, mixins } from 'styles'

const StyledContent = styled.section`
  width: 100%;
  min-height: 100vh;
  padding: 5rem 0;
  flex-direction: column;

  & h2,
  & h3,
  & h4 {
    text-align: center;
    text-transform: capitalize;
  }

  & h3 {
    font-weight: 500;
  }

  ${mixins.flexLeft};
`
const StyledBody = styled.div`
  @media (min-width: ${breakpoints.lg}) {
    width: 90%;
  }

  @media (min-width: ${breakpoints['2xl']}) {
    width: 100%;
  }
`

const StyledProjects = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  margin: 3rem 0;

  @media (min-width: ${breakpoints.md}) {
    gap: 1.5rem;
  }

  @media (min-width: ${breakpoints.xl}) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
`

const StyledTechnologies = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(140px, 250px));
  row-gap: 1rem;
  margin: 1.5rem auto;
  font-family: var(--font-mono);
  font-size: ${({ theme }) => theme.fontSizes.sm};
  justify-content: center;
  text-transform: capitalize;

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
interface Props {
  projects: DataModel
}

const Projects: FC<Props> = ({ projects, children }) => {
  const [inProp, setInProp] = useState(false)

  useEffect(() => {
    setInProp(true)
  }, [])

  const ref = useRef<HTMLElement | any>(null)

  useEffect(() => {
    sr().reveal(ref.current, srConfig())
  }, [])

  return (
    <CSSTransition in={inProp} timeout={250} classNames="fade">
      <StyledContent id="projects">
        <Title title={projects.header} />
        <br />

        <StyledBody>
          <p>{projects.bodyPrev}</p>
          <br />
          <p>Here are a few technologies I&apos;ve been working with recently :</p>
        </StyledBody>

        <StyledTechnologies>
          {projects.technologies.map((tech) => (
            <li key={tech.name}>
              <span>
                <Icon name={tech.name} />
              </span>
              {tech.name}
            </li>
          ))}
        </StyledTechnologies>

        <br />
        <h3>{projects.headerAfter}</h3>

        <StyledProjects ref={ref}>
          {children}
          {/* <StyledProject>project2</StyledProject>
        <StyledProject>journal</StyledProject>
        <StyledProject>catwiki</StyledProject>
        <StyledProject>weather</StyledProject>
        <StyledProject>rock-paper-scissors</StyledProject> */}
        </StyledProjects>
      </StyledContent>
    </CSSTransition>
  )
}

export default Projects
