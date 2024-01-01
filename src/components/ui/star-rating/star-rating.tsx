import Star from './star/star'

type StarRatingProps = {
  grade: number
}

const StarRating = ({ grade }: StarRatingProps) => {
  return (
    <div>
      <Star count={5} size={40} value={grade} activeColor={'gold'} inactiveColor={'#ddd'} />
    </div>
  )
}

export default StarRating
