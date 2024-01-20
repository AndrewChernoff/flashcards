import { H1 } from '../typography/typography'

import s from './not-found.module.scss'
const NotFound = () => {
  return (
    <div>
      <H1 className={s.title}> The resource is not Found</H1>
    </div>
  )
}

export default NotFound
