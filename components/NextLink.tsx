import Link from 'next/link'
import { Node } from 'unist'

import { RenderContent } from '@components/RenderContent'

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

  return (
    <>
      {!!href && (
        <Link href={href} legacyBehavior>
            <RenderContent htmlAst={child} />
        </Link>
      )}
    </>
  )
}
