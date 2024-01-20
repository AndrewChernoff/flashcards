import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import s from './skeleton.module.scss'

const SkeletonCard = () => {
  return (
    <SkeletonTheme highlightColor="#333">
      <Skeleton count={1} duration={4} className={s.table} />
      <Skeleton count={5} duration={4} className={s.card} />
    </SkeletonTheme>
  )
}

export default SkeletonCard
