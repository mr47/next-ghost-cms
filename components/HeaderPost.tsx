import { GhostSettings } from 'lib/ghost'
import { SiteNav } from '@components/SiteNav'

interface HeaderPostProps {
  settings: GhostSettings,
  title?: string
  sticky: any
}

export const HeaderPost = ({ settings, title, sticky }: HeaderPostProps) => (
  <header className="site-header" >
    <div className={`outer site-nav-main ${sticky && sticky.currentClass}`}>
      <div className="inner">
        <SiteNav {...{ settings }} className="site-nav" postTitle={title} />
      </div>
    </div>
  </header>
)
