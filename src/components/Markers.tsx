import { useEffect, useCallback, Dispatch, SetStateAction } from "react";

interface MarkerProps {
  map: any;
  storeDatas: any[];
  setCurrentStore: Dispatch<SetStateAction<any>>;
}

export default function Markers({
  map,
  storeDatas,
  setCurrentStore,
}: MarkerProps) {
  const loadKakoMarkers = useCallback(() => {
    if (map) {
      storeDatas?.map((store) => {
        let imageSrc = store?.bizcnd_code_nm
            ? `/images/markers/${store?.bizcnd_code_nm}.png`
            : "/images/markers/default.png",
          imageSize = new window.kakao.maps.Size(35, 35),
          imageOption = { offset: new window.kakao.maps.Point(27, 69) };

        let markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        let markerPosition = new window.kakao.maps.LatLng(
          store?.y_dnts,
          store?.x_cnts
        );

        let marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        marker.setMap(map);

        let content = `<div class="infowindow">${store?.upso_nm}</div>`;

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
  }, [map, storeDatas, setCurrentStore]);

  useEffect(() => {
    loadKakoMarkers();
  }, [loadKakoMarkers, map]);
  return <></>;
}
