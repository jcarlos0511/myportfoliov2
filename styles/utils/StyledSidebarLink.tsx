import { FC } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { UrlObject } from 'url'

interface Props {
  as?: string | UrlObject | undefined
  href: string
  className?: string
  handleSidebar: () => void
}

const StyledSidebarLink: FC<Props> = ({ as, children, className, href, handleSidebar }) => {
  return (
    <Link href={href} as={as} passHref>
      <a className={className}>
        <button type="button" onClick={handleSidebar}>
          {children}
          <div className="borders">
            <span className="border" />
            <span className="border" />
          </div>
        </button>
      </a>
    </Link>
  )
}

export default styled(StyledSidebarLink)`
  margin-bottom: 1.5rem;
  padding: 0.5rem 0;

  & > button {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-family: ${({ theme }) => theme.fontMono};
    padding: 0 0.5rem;
    width: 100%;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
    transform: translateY(0rem);
    transition: ${({ theme }) => theme.transition};
    letter-spacing: 0.1rem;

    & .borders {
      display: block;

      & .border {
        margin-left: 1.75rem;
        display: block;
        width: 45px;
        height: 2px;
        background-color: ${({ theme }) => theme.colors.fill};
        border-radius: ${({ theme }) => theme.borderRadius.default};
        transition: ${({ theme }) => theme.transition};
        transform: translateX(-30px);
        opacity: 0;
      }

      & .border:first-child {
        background-color: ${({ theme }) => theme.colors.fill};
        margin: 0.25rem 0 0.75rem;
        transform: translateX(30px);
      }
    }

    &:hover,
    &:focus {
      color: ${({ theme }) => theme.colors.white};
      transform: translateY(-0.7rem);
      outline: none;

      & .borders .border {
        transform: translateX(0px);
        opacity: 1;
      }
    }
  }

  &.active {
    & > button {
      color: ${({ theme }) => theme.colors.white};
      transform: translateY(-0.7rem);

      & .borders .border {
        transform: translateX(0px);
        opacity: 1;
      }
    }
  }
`
