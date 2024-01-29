import { useNavigate } from 'react-router-dom'

import { Button } from '../../components/ui/button'
import { Body1 } from '../../components/ui/typography/typography'

import s from './not-found.module.scss'

import error404 from '@/common/imgs/404.png'

const NotFound = () => {
  const navigate = useNavigate()

  const backToHome = () => navigate('/')

  return (
    <div className={s.notFound}>
      <div className={s.notFound__content}>
        <img src={error404} alt="page not found" />
        <Body1> Sorry! Page not found!</Body1>
        <Button callBack={backToHome} variant="purple">
          Back to home page
        </Button>
      </div>
    </div>
  )
}

export default NotFound
