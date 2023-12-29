import s from './star.module.scss'

const Star = ({ count, value, inactiveColor, size = 24, activeColor, onChange }: any) => {
  // short trick
  const stars = Array.from({ length: count }, () => '🟊')

  // Internal handle change function
  const handleChange = (value: any) => {
    onChange(value + 1)
  }

  return (
    <div>
      {stars.map((star, index) => {
        let style = inactiveColor

        if (index < value) {
          style = activeColor
        }

        return (
          <span
            className={s.star}
            key={index}
            style={{ color: style, width: size, height: size, fontSize: size }}
            onClick={() => handleChange(index)}
          >
            {star}
          </span>
        )
      })}
    </div>
  )
}

export default Star
