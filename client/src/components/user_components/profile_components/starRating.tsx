import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
interface StarRatingProps {
  rating: number;
}
const StartRating: React.FC<StarRatingProps> = ({ rating,  }) => {
    const ratingStar = Array.from({ length: 5 }, (elem:string, i) => {
      const number = 0.5 + i;
    return (
      <span key={i}>
        <p className="hidden">{ elem}</p>
        {rating >= i + 1 ? (
          <FaStar className="text-yellow-200" />
        ) : rating >= number ? (
          <FaStarHalfAlt className="text-yellow-200" />
        ) : (
          <FaRegStar className="text-yellow-200" />
        )}
      </span>
    );
  });

  return (
    <>
      <div className="flex">
        {ratingStar}
      </div>
    </>
  );
};

export default StartRating;
