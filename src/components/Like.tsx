import { useQuery } from "react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { StoreType } from "@/interface";
import { toast } from "react-toastify";

interface LikeProps {
  storeId: number;
}

export default function Like({ storeId }: LikeProps) {
  const { data: session } = useSession();

  const fetchStore = async () => {
    const { data } = await axios(`/api/stores?id=${storeId}`);
    return data as StoreType;
  };

  const { data: store, refetch } = useQuery(
    `like-store-${storeId}`,
    fetchStore,
    {
      enabled: !!storeId,
      refetchOnWindowFocus: false,
    }
  );

  const toggleLike = async () => {
    if (session?.user && store) {
      try {
        const like = await axios.post("/api/likes", {
          storeId: store.id,
        });

        if (like.status === 201) {
          toast.success("해당 맛집을 찜했습니다.");
        } else {
          toast.warn("해당 맛집의 찜을 취소했습니다.");
        }
        refetch();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <button type="button" onClick={toggleLike} className="mt-5">
        {store?.likes?.length ? (
          <FaHeart className="hover:text-red-600 text-red-500" />
        ) : (
          <FaRegHeart className="hover:text-red-600" />
        )}
      </button>
    </>
  );
}
