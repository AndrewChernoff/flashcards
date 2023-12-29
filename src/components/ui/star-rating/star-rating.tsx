import { useState } from 'react'

import Star from './star/star'

type StarRatingProps = {
  grade: number
}

const StarRating = ({ grade }: StarRatingProps) => {
  // Get the rating from a db if required.
  // The value 3 is just for testing.
  const [rating, setRating] = useState(grade)

  const handleChange = (value: any) => {
    setRating(value)
  }

  console.log(rating)

  return (
    <div>
      <Star
        count={5}
        size={40}
        value={rating}
        activeColor={'gold'}
        inactiveColor={'#ddd'}
        onChange={handleChange}
      />
    </div>
  )
}

export default StarRating
