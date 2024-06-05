import Link from 'next/link'
import { ReactFragment } from 'react'
import { NavItem } from '@lib/ghost'
import { useOverlay } from '@components/contexts/overlayProvider'

/**
 * Navigation component
 *
 * The Navigation component takes an array of your Ghost
 * navigation property that is fetched from the settings.
 * It differentiates between absolute (external) and relative link (internal).
 * You can pass it a custom class for your own styles, but it will always fallback
 * to a `site-nav-item` class.
 *
 */

interface NavigationProps {
  data?: NavItem[]
  navClass?: string
}

export const Navigation = ({ data, navClass }: NavigationProps) => {
  const items: ReactFragment[] = []
  const { handleOpen } = useOverlay()

  data?.map((navItem, i) => {
    if (navItem.url.match(/^\s?http(s?)/gi)) {
      items.push(
        <li key={i} className={`nav-${navItem.label.toLowerCase()}`} role="menuitem">
          <a className={navClass} href={navItem.url} target="_blank" rel="noopener noreferrer">
            {navItem.label}
          </a>
        </li>
      )
    } else {
      const portalLink  = navItem.url === '#/portal/' || navItem.url.indexOf('#/portal/') >= 0
      items.push(
        <li key={i} className={`nav-${navItem.label.toLowerCase()}`} role="menuitem">
          <div className={navClass}>
            <Link passHref href={navItem.url} { ...(portalLink ? { onClick: handleOpen } : {})}>
              {navItem.label}
            </Link>
          </div>
        </li>
      )
    }
  })

  return (
    <ul className="nav" role="menu">
      {items}
    </ul>
  )
}
