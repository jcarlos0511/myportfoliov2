import { FC, useEffect, useRef } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { DataModel } from '@lib/models'
import { Title } from '@components/common'
import sr, { srConfig } from '@utils/sr'
import { breakpoints, mixins } from 'styles'
import { StyledSmallLink } from 'styles/utils'

const StyledContent = styled.section`
  width: 100%;
  min-height: 100vh;
  padding: 3rem 0;
  text-align: center;
  flex-direction: column;

  ${mixins.flexEvenly};
`

const StyledBody = styled.div`
  flex-direction: column;

  ${mixins.flexCenter};

  @media (min-width: ${breakpoints.xl}) {
    flex-direction: row;
  }
`

const StyledDescription = styled.div`
  text-align: right;
  margin: 2rem 0;

  @media (min-width: ${breakpoints.xl}) {
    flex: 1;
    margin-right: 2rem;
    width: 100%;
  }
`

interface Props {
  projects: DataModel
}

const ProjectsPreview: FC<Props> = ({ projects, children }) => {
  const ref = useRef<HTMLElement | any>(null)

  useEffect(() => {
    sr().reveal(ref.current, srConfig())
  }, [])

  return (
    <StyledContent id="projects" ref={ref}>
      <Title>
        <Link href="/projects">
          <a>
            <h2>{projects.headerPrev}</h2>
          </a>
        </Link>
      </Title>

      <StyledBody>
        <StyledDescription>
          <p>{projects.bodyPrev}</p>
          <br />
          <p>{projects.footerPrev}</p>
        </StyledDescription>

        {children}
      </StyledBody>

      <StyledSmallLink href="/projects" forwardedAs="/projects">
        {projects.linkPrev}
      </StyledSmallLink>
    </StyledContent>
  )
}

export default ProjectsPreview
