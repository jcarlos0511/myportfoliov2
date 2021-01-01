import { FC, useEffect, useRef } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { DataModel } from 'pages'
import { GithubIcon } from '@components/icons'
import sr, { srConfig } from '@utils/sr'
import { breakpoints, mixins } from 'styles'
import { StyledTitle } from 'styles/utils'

const StyledContent = styled.section`
  width: 100%;
  min-height: 100vh;
  padding: 3rem 0;
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

const StyledProject = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.card};
  min-height: 375px;
  box-shadow: ${({ theme }) => theme.shadows.card};

  & .project-screenshot {
    display: flex;

    & a {
      display: flex;

      & .formatted {
        border-top-right-radius: ${({ theme }) => theme.borderRadius.card};
        border-top-left-radius: ${({ theme }) => theme.borderRadius.card};
        opacity: 0.6;

        :hover {
          opacity: 1;
        }
      }
    }
  }

  & .project-info {
    background-color: ${({ theme }) => theme.colors.secondaryBg};
    border-bottom-right-radius: ${({ theme }) => theme.borderRadius.card};
    border-bottom-left-radius: ${({ theme }) => theme.borderRadius.card};

    & .project-info-header {
      padding: 1rem 1.5rem 0.5rem;

      ${mixins.flexBetween};

      & a {
        width: 24px;
        height: 24px;
      }
    }

    & .project-info-body {
      padding: 0.5rem 1.5rem 0.5rem;
    }

    & .project-info-footer {
      border-top: 1px solid #3a96dd;
      padding: 0.5rem 1.5rem 1rem;

      & ul {
        flex-wrap: wrap;
        font-size: ${({ theme }) => theme.fontSizes.sm};
        line-height: ${({ theme }) => theme.lineHeights.sm};
        font-family: ${({ theme }) => theme.fontMono};

        ${mixins.flexAround};
      }
    }
  }
`
interface Props {
  projects: DataModel
}

const Projects: FC<Props> = ({ projects }) => {
  // categorizar por app, landing page
  const ref = useRef<HTMLElement | any>(null)

  useEffect(() => {
    sr().reveal(ref.current, srConfig())
  }, [])

  return (
    <StyledContent id="projects" ref={ref}>
      <StyledTitle>
        <h2>{projects.header}</h2>
        <div className="borders">
          <span className="border" />
          <span className="border" />
        </div>
      </StyledTitle>

      <h3>{projects.body}</h3>

      <StyledProjects>
        {projects.apps.map((app) => (
          <StyledProject key={app.appName}>
            <div className="project-screenshot">
              <a href="https://weather-app-nu-gold.vercel.app/" aria-label={`${app.appName} link`}>
                <Image
                  src="/projects/weather-app.png"
                  className="formatted"
                  width={580}
                  height={380}
                  loading="eager"
                  unoptimized
                />
              </a>
            </div>
            <div className="project-info">
              <div className="project-info-header">
                <h4>{app.appName}</h4>

                <a
                  href="https://github.com/jcarlos0511/weather-app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>
                    <GithubIcon />
                  </span>
                </a>
              </div>
              <div className="project-info-body">
                <p>{app.appDescription}</p>
              </div>
              <div className="project-info-footer">
                <ul>
                  {app.technologies.map((tech) => (
                    <li key={tech.name}>{tech.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </StyledProject>
        ))}
        {/* <StyledProject>project2</StyledProject>
        <StyledProject>journal</StyledProject>
        <StyledProject>catwiki</StyledProject>
        <StyledProject>weather</StyledProject>
        <StyledProject>rock-paper-scissors</StyledProject> */}
      </StyledProjects>
    </StyledContent>
  )
}

export default Projects
