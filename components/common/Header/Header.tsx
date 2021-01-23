import { FC } from 'react'
import styled from 'styled-components'
import { useScroll } from '@lib/hooks'
import { useUI } from '@components/ui/context'
import { LogoButton, Sidebar } from '@components/ui'
import { MenuIcon } from '@components/icons'
import { breakpoints, mixins } from 'styles'

export const StyledContent = styled.header<{
  scrollY: number
  scrollDirection: string
  open: boolean
}>`
  background-color: rgba(20, 39, 61, 0.85);
  backdrop-filter: blur(8px);
  box-shadow: ${({ theme, scrollY, open }) =>
    scrollY === 0 || open ? 'none' : theme.shadows.header};
  position: fixed;
  transform: translateY(${({ scrollDirection }) => (scrollDirection === 'down' ? '-88px' : '0px')});
  transition: ${({ theme }) => theme.transition};
  top: 0;
  right: 0;
  width: 100%;
  z-index: 49;

  @media (min-width: ${breakpoints.lg}) {
    display: none;
  }

  & nav {
    max-width: 1100px;
    margin: 0 auto;

    ${mixins.flexBetween};

    & button {
      color: var(--big-stone);
    }

    & svg {
      width: 3rem;
      height: 3rem;
    }

    & p {
      color: var(--polo-blue);
    }
  }
`

interface Props {
  reload: () => void
}

const Header: FC<Props> = ({ reload }) => {
  const { displaySidebar, openSidebar, closeSidebar } = useUI()
  const { y, direction } = useScroll()

  return (
    <StyledContent scrollY={y} scrollDirection={direction} open={displaySidebar}>
      <nav>
        <LogoButton href="/" reload={reload} />
        <button type="button" onClick={openSidebar}>
          <span>
            <MenuIcon />
          </span>
        </button>
        {/* <MenuButton y={y} open={displaySidebar} onOpen={openSidebar} onClose={closeSidebar} /> */}
      </nav>
      <Sidebar open={displaySidebar} onClose={closeSidebar} />
    </StyledContent>
  )
}

export default Header
