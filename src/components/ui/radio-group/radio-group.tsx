import * as Radio from '@radix-ui/react-radio-group'

import s from './radio-group.module.scss'

type RadioProps = {
  isDisabled?: boolean
  items: any[]
}

const RadioGroup = ({ isDisabled, items }: RadioProps) => (
  <form>
    <Radio.Root
      className={s.RadioGroupRoot}
      aria-label="View density"
      onValueChange={e => console.log(e)}
    >
      {items.map((el: any) => {
        return (
          <div key={el.id} className={s.radio}>
            <Radio.Item className={s.RadioGroupItem} value={el.title} id="r1" disabled={isDisabled}>
              <Radio.Indicator className={s.RadioGroupIndicator} />
            </Radio.Item>
            <label className={s.Label} htmlFor="r1">
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
