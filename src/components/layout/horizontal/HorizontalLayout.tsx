// React Imports
import type { ReactNode } from 'react'

type HorizontalLayoutProps = {
  header?: ReactNode
  children: ReactNode
  footer?: ReactNode
}

const HorizontalLayout = (props: HorizontalLayoutProps) => {
  // Props
  const { header, footer, children } = props

  return (
    <div>
        {header || null}
        {children}
        {footer || null}
    </div>
  )
}

export default HorizontalLayout
