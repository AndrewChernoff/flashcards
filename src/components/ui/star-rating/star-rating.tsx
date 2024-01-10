import Star from './star/star'

type StarRatingProps = {
  grade: number
}

const StarRating = ({ grade }: StarRatingProps) => {
  return (
    <>
      <Star count={5} size={16} value={grade} activeColor={'gold'} inactiveColor={'#ddd'} />
    </>
  )
}

export default StarRating
