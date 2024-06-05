import Link from 'next/link'
import { Node } from 'unist'

import { RenderContent } from '@components/RenderContent'
import { useOverlay } from '@components/contexts/overlayProvider'

interface PropertyProps {
  href?: string
}

interface LinkNode extends Node {
  children: Node[]
  properties: PropertyProps
}

export const NextLink = (props: any) => {
  const node = props.node as LinkNode
  const { href } = node?.properties
  const [child] = node?.children
  const { handleOpen } = useOverlay()
  const portalLink  = href === '#/portal/'
  return (
    <>
      {href && (
        <Link href={href} { ...(portalLink ? { onClick: handleOpen } : {})}>
            <RenderContent htmlAst={child} />
        </Link>
      )}
    </>
  )
}
