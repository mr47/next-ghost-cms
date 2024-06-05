import React from 'react'
import rehypeReact, { Options } from 'rehype-react'
import * as prod from 'react/jsx-runtime'
import {unified} from 'unified'
import ReactGist from 'react-gist'

import { NextLink } from '@components/NextLink'
import { NextImage } from '@components/NextImage'

const gist_regex = /https:\/\/gist.github.com\/\S+\/([a-f0-9]+)\.js/g

type ScriptNode = {
  src: string
}

/* eslint-disable react/display-name */
const options: Options = {
  Fragment: React.Fragment,
  passNode: true,
  components: {
    a: (props) => <NextLink {...props} />,
    image: (props) => <NextImage {...props} />,
    script: (props) => {
      const properties = props as ScriptNode
      const myRegexp = new RegExp(gist_regex);
      const match = myRegexp.exec(properties.src);
      if (!!match && match.length > 1){
        return <ReactGist id={match[1]}/>
      }
      return null;
    }
  },
  jsx: prod.jsx as any, jsxs: prod.jsxs as any
}

const renderAst = unified().use(rehypeReact, options)

interface RenderContentProps {
  htmlAst: any | null
}

export const RenderContent = ({ htmlAst }: RenderContentProps) => {
  if (!htmlAst) return null
  return <>{renderAst.stringify(htmlAst)}</>
}
