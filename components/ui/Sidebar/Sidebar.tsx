import { FC, useEffect, useRef } from 'react'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import type { BodyScrollOptions } from 'body-scroll-lock'
import Portal from '@reach/portal'
import styled from 'styled-components'
import { Section } from 'pages'
import { breakpoints, mixins } from 'styles'
import { StyledSidebarLink } from 'styles/utils'

const StyledContent = styled.aside`
  background-color: ${({ theme }) => theme.colors.secondaryBg};
  padding: 1rem;
  position: fixed;
  /* width: 100%; */
  height: 100vh;
  width: min(75vw, 375px);
  top: 0;
  right: 0;

  & ul {
    ${mixins.flexCenter};

    flex-direction: column;
    height: 100%;
  }
`

const StyledWrapper = styled(StyledContent)`
  display: none;
  padding: 0;

  @media (min-width: ${breakpoints.lg}) {
    display: block;
    width: min(12.5vw, 200px);
  }

  @media (min-width: ${breakpoints.xl}) {
    width: min(10vw, 200px);
  }
`

interface Props {
  open: boolean
  onClose: () => void
}

const options: BodyScrollOptions = {
  reserveScrollBarGap: true,
}

const sidebarLinks: Section[] = ['about', 'projects', 'contact']

const Sidebar: FC<Props> = ({ open = false, onClose }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      if (open) {
        disableBodyScroll(ref.current, options)
      } else {
        enableBodyScroll(ref.current)
      }
    }

    return () => clearAllBodyScrollLocks()
  }, [open])

  // !error to link menu... try use route( to fix) :C

  return (
    <Portal>
      {open ? (
        <StyledContent ref={ref}>
          <ul>
            <li>
              <StyledSidebarLink href="/" handleSidebar={() => onClose()} forwardedAs="/">
                home
              </StyledSidebarLink>
            </li>
            {sidebarLinks.map((link) => (
              <li key={link}>
                <StyledSidebarLink
                  href={`/${link}`}
                  handleSidebar={() => onClose()}
                  forwardedAs={`/${link}`}
                >
                  {link}
                </StyledSidebarLink>
              </li>
            ))}
          </ul>
        </StyledContent>
      ) : (
        <StyledWrapper>
          <ul>
            <li>
              <StyledSidebarLink href="/" handleSidebar={() => onClose()} forwardedAs="/">
                home
              </StyledSidebarLink>
            </li>
            {sidebarLinks.map((link) => (
              <li key={link}>
                <StyledSidebarLink
                  href={`/${link}`}
                  handleSidebar={() => onClose()}
                  forwardedAs={`/${link}`}
                >
                  {link}
                </StyledSidebarLink>
              </li>
            ))}
          </ul>
        </StyledWrapper>
      )}
    </Portal>
  )
}

export default Sidebar
