import * as Radio from '@radix-ui/react-radio-group'

import s from './radio-group.module.scss'

type RadioProps = {
  isDisabled?: boolean
  callBack: (value: string) => void
}

const RadioGroup = ({ isDisabled, callBack }: RadioProps) => {
  const items = [
    { title: 'Did not know', value: '1' },
    { title: 'Forgot', value: '2' },
    { title: 'A lot of thoughts', value: '3' },
    { title: 'Confused', value: '4' },
    { title: 'Knew the answer', value: '5' },
  ]

  return (
    <form className={s.radio__group}>
      <Radio.Root
        className={s.radio__group_root}
        aria-label="View density"
        onValueChange={e => callBack(e)}
      >
        {items.map((el: any) => {
          return (
            <div key={el.value + el.title} className={s.radio}>
              <Radio.Item
                className={s.radio__group_item}
                value={el.value}
                id={el.title}
                disabled={isDisabled}
              >
                <Radio.Indicator className={s.radio__group_indicator} />
              </Radio.Item>
              <label className={s.label} htmlFor={el.title}>
                {el.title}
              </label>
            </div>
          )
        })}
      </Radio.Root>
    </form>
  )
}

export default RadioGroup
