import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function Like() {
  const toggleLike = () => {};
  return (
    <>
      <button type="button" onClick={toggleLike} className="mt-5">
        {true ? (
          <FaHeart className="hover:text-red-600 text-red-500" />
        ) : (
          <FaRegHeart className="hover:text-red-600" />
        )}
      </button>
    </>
  );
}
