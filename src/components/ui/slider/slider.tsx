import * as Slider from '@radix-ui/react-slider'

import s from './slider.module.scss'

interface Props {
  value: number[]
  callback?: (value: number[]) => void
}

function EditableSlider({ value, callback, ...rest }: Props) {
  const handleSliderChange = (newValue: number[]) => {
    callback && callback(newValue)
  }

  return (
    <div className={s.slider}>
      <p>{value[0]}</p>
      <Slider.Root
        className={s.slider__root}
        onValueChange={handleSliderChange}
        {...rest}
        value={value}
        min={0}
        max={55}
        step={1}
      >
        <Slider.Track className={s.slider__track}>
          <Slider.Range className={s.slider__range} />
        </Slider.Track>
        {value.map((_, i) => (
          <Slider.Thumb key={i} className={s.slider__thumb}>
            <div className={s.slider__thumb_circle}></div>
          </Slider.Thumb>
        ))}
      </Slider.Root>
      <p>{value[1]}</p>
    </div>
  )
}

export default EditableSlider
