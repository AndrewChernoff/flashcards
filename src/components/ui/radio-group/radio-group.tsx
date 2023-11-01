import * as Radio from '@radix-ui/react-radio-group'

import s from './radio-group.module.scss'

type RadioProps = {
  isDisabled?: boolean
  items: any[]
}

const RadioGroup = ({ isDisabled, items }: RadioProps) => (
  <form className={s.radio__group}>
    <Radio.Root
      className={s.radio__group_root}
      aria-label="View density"
      onValueChange={e => console.log(e)}
    >
      {items.map((el: any) => {
        return (
          <div key={el.id} className={s.radio}>
            <Radio.Item
              className={s.radio__group_item}
              value={el.title}
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
      {/* <div style={{ display: 'flex', alignItems: 'center' }}>
        <Radio.Item className={s.RadioGroupItem} value="default" id="r1" disabled={isDisabled}>
          <Radio.Indicator className={s.RadioGroupIndicator} />
        </Radio.Item>
        <label className={s.Label} htmlFor="r1">
          Default
        </label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Radio.Item className={s.RadioGroupItem} value="comfortable" id="r2" disabled={isDisabled}>
          <Radio.Indicator className={s.RadioGroupIndicator} />
        </Radio.Item>
        <label className={s.Label} htmlFor="r2">
          Comfortable
        </label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Radio.Item className={s.RadioGroupItem} value="compact" id="r3" disabled={isDisabled}>
          <Radio.Indicator className={s.RadioGroupIndicator} />
        </Radio.Item>
        <label className={s.Label} htmlFor="r3">
          Compact
        </label>
      </div> */}
    </Radio.Root>
  </form>
)

export default RadioGroup
