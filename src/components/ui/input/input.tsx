import { ChangeEvent, forwardRef, memo, useState } from 'react'

/* import { Path } from 'react-hook-form' */

import eye from '../../../common/imgs/eye.png'

import s from './input.module.scss'

/* interface IFormValues {
  email: string
  password: string
  rememberMe: boolean
} */

export interface InputProps {
  isSearch: boolean
  label?: string
  placeholder?: string
  type: 'password' | 'text' | 'email' | 'file'
  error?: string
  isDisabled?: boolean
  className?: string
  value?: string
  id?: string
  onValueChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    value,
    onValueChange,
    className,
    isSearch,
    label,
    isDisabled,
    error,
    placeholder,
    type,
    id,
    ...rest
  } = props

  const [passwordShown, setPasswordShown] = useState(false)

  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }

  // eslint-disable-next-line no-nested-ternary
  const inputType = type === 'password' ? (passwordShown ? 'text' : 'password') : type
  const inputClassname = isSearch ? `${s.input__normal} ${s.input__search}` : `${s.input__normal}`

  const errorInputClassname = s.input__error /* `${s.input__error} ${s.input__search}` */

  if (type === 'file') {
    return (
      <div className={s.file}>
        <label htmlFor={id} className={s.file__label}>
          Change Cover
        </label>
        <input
          tabIndex={0}
          disabled={isDisabled}
          type={inputType}
          className={s.file__input}
          placeholder={placeholder}
          ref={ref}
          value={value}
          id={id}
          onChange={onValueChange}
          {...rest}
        />
      </div>
    )
  }

  return (
    <div className={`${s.inputBlock} ${className}`}>
      {label /* && !error */ && <label htmlFor="input-field">{label}</label>}

      <div className={s.input}>
        {isSearch && <div className={s.input__search_img}></div>}

        <input
          disabled={isDisabled}
          type={inputType}
          className={error ? errorInputClassname : inputClassname}
          placeholder={placeholder}
          ref={ref}
          value={value}
          onChange={onValueChange}
          {...rest}
        />
        {type === 'password' && (
          <button type={'button'} className={s.showPassword} onClick={togglePassword}>
            <img src={eye} />
          </button>
        )}

        {isSearch && <button className={s.clearBtn}>x</button>}
      </div>
      {error && <p>{error}</p>}
    </div>
  )
})

export default memo(Input)
