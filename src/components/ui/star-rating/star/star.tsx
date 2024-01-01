import s from './star.module.scss'

type StarProps = {
  count: number
  value: number
  inactiveColor: string
  size?: number
  activeColor: string
}

const Star = ({ count, value, inactiveColor, size = 24, activeColor }: StarProps) => {
  const stars = Array.from({ length: count }, () => '🟊')

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
          >
            {star}
          </span>
        )
      })}
    </div>
  )
}

export default Star
