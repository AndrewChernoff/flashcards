import { useState } from 'react'

import * as Slider from '@radix-ui/react-slider'

import s from './slider.module.scss'

interface Props {
  value: number[]
}

function EditableSlider(props: Props) {
  const { value, ...rest } = props

  const [sliderValue, setSliderValue] = useState<number[]>(value)

  const handleSliderChange = (newValue: number[]) => {
    console.log(newValue)

    setSliderValue(newValue)
    //onChange(newValue)
  }

  return (
    <div className={s.slider}>
      <p>{value[0]}</p>
      <Slider.Root
        className={s.slider__root}
        onValueChange={handleSliderChange}
        {...rest}
        value={sliderValue}
        min={0}
        max={100}
        step={1}
      >
        <Slider.Track className={s.slider__track}>
          <Slider.Range className={s.slider__range} />
        </Slider.Track>
        {sliderValue.map((_, i) => (
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
