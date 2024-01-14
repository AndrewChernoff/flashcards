import { ChangeEvent, forwardRef } from 'react'

import s from './fileinput.module.scss'

type FileinputProps = {
  onImgChange: (e: ChangeEvent<HTMLInputElement>) => void
  title: string
  id: string
  className: string
}

const Fileinput = forwardRef<HTMLInputElement, FileinputProps>((props, ref) => {
  const { onImgChange, title, id, className, ...rest } = props

  return (
    <div className={s.file}>
      <label htmlFor={id} className={s.file__label}>
        {title}
      </label>
      {
        <input
          onChange={onImgChange}
          type={'file'}
          className={className}
          id={id}
          ref={ref}
          {...rest}
        />
      }
    </div>
  )
})

export default Fileinput
