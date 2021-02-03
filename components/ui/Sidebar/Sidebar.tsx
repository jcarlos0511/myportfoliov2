import { FC, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import type { BodyScrollOptions } from 'body-scroll-lock'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Portal from '@reach/portal'
import styled from 'styled-components'
import getSlug from '@lib/getSlug'
import { CrossButton } from '@components/ui'
import { useOnClickOutside } from '@lib/hooks'
import { breakpoints, mixins } from 'styles'
import { StyledSidebarLink } from 'styles/utils'

const StyledContent = styled.aside`
  background-color: var(--blue-zodiac);
  box-shadow: var(--sidebar-shadow);
  padding: 1rem;
  position: fixed;
  height: 100vh;
  width: min(75vw, 375px);
  top: 0;
  right: 0;
  z-index: 99;

  @media (min-width: ${breakpoints.sm}) {
    padding: 1rem 3rem;
  }

  & > ul {
    flex-direction: column;
    height: 100%;

    ${mixins.flexCenter};
  }
`

const StyledWrapper = styled(StyledContent)`
  display: none;
  padding: 0;

  @media (min-width: ${breakpoints.lg}) {
    display: block;
    width: min(12.5vw, 200px);
  }
`

interface Props {
  open: boolean
  onClose: () => void
}

const options: BodyScrollOptions = {
  reserveScrollBarGap: true,
}

interface Links {
  name: string
  href: string
}

const sidebarLinks: Links[] = [
  { name: 'home', href: '/' },
  { name: 'about', href: '/about' },
  { name: 'projects', href: '/projects' },
  { name: 'contact', href: '/contact' },
]

const Sidebar: FC<Props> = ({ open = false, onClose }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 500)
    return () => clearTimeout(timeout)
  }, [])

  const { pathname } = useRouter()
  const activeLink = getSlug(pathname)

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

  // close sidebar when sidebarLink is clicked
  useEffect(() => {
    if (activeLink || activeLink === '') {
      onClose()
    }
  }, [activeLink])

  const handleOnClickOutSide = () => {
    onClose()
  }

  useOnClickOutside(ref, handleOnClickOutSide)

  const sidebarLink = (name: string, href: string) => (
    <StyledSidebarLink className={activeLink === getSlug(href) ? 'active' : ''} href={href}>
      {name}
    </StyledSidebarLink>
  )

  return (
    <Portal>
      {open ? (
        <StyledContent ref={ref}>
          <CrossButton onClose={onClose} />

          <ul>
            {sidebarLinks.map((link) => (
              <li key={link.name}>{sidebarLink(link.name, link.href)}</li>
            ))}
          </ul>
        </StyledContent>
      ) : (
        <StyledWrapper>
          <ul>
            <TransitionGroup component={null}>
              {isMounted &&
                sidebarLinks.map((link, i) => (
                  <CSSTransition key={link.name} classNames="faderight" timeout={600}>
                    <li style={{ transitionDelay: `${i * 1}00ms` }}>
                      {sidebarLink(link.name, link.href)}
                    </li>
                  </CSSTransition>
                ))}
            </TransitionGroup>
          </ul>
        </StyledWrapper>
      )}
    </Portal>
  )
}

export default Sidebar
