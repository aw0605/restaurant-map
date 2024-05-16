import { StoreType } from "@/interface";
import { useEffect, useCallback, Dispatch, SetStateAction } from "react";

interface MarkerProps {
  map: any;
  stores: StoreType[];
  setCurrentStore: Dispatch<SetStateAction<any>>;
}

export default function Markers({ map, stores, setCurrentStore }: MarkerProps) {
  const loadKakoMarkers = useCallback(() => {
    if (map) {
      stores?.map((store) => {
        let imageSrc = store?.category
            ? `/images/markers/${store?.category}.png`
            : "/images/markers/default.png",
          imageSize = new window.kakao.maps.Size(35, 35),
          imageOption = { offset: new window.kakao.maps.Point(27, 69) };

        let markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        let markerPosition = new window.kakao.maps.LatLng(
          store?.lat,
          store?.lng
        );

        let marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        marker.setMap(map);

        let content = `<div class="infowindow">${store?.name}</div>`;

        let customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
          xAnchor: 0.6,
          yAnchor: 1.25,
        });

        window.kakao.maps.event.addListener(marker, "mouseover", function () {
          customOverlay.setMap(map);
        });

        window.kakao.maps.event.addListener(marker, "mouseout", function () {
          customOverlay.setMap(null);
        });

        window.kakao.maps.event.addListener(marker, "click", function () {
          setCurrentStore(store);
        });
      });
    }
  }, [map, stores, setCurrentStore]);

  useEffect(() => {
    loadKakoMarkers();
  }, [loadKakoMarkers, map]);
  return <></>;
}
