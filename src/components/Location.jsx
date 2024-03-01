import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addResults } from '../shared/store/modules/list';
import * as S from '../styles/common';
import { useNavigate } from 'react-router';
import { connection } from '../shared/store/modules/listConnection';

const Location = () => {
  const navigate = useNavigate();

  //검색기능
  const search = useSelector((state) => state.search);
  console.log(search);

  //카드 리스트 연결
  const selector = useSelector((state) => state.connection);
  console.log(selector);

  const dispatch = useDispatch();

  const [isClick, setIsClick] = useState(false);
  const [info, setInfo] = useState();
  const [map, setMap] = useState();
  const [markers, setMarkers] = useState([]);

  const [location, setLocation] = useState({
    center: {
      lat: 37.566826,
      lng: 126.9786567
    },
    errMsg: null
  });

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation((prev) => ({
            ...prev,
            center: { lat: latitude, lng: longitude }
          }));
        },
        (err) => {
          console.log(err.message);
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.log('Geolocation을 지원하지 않습니다.');
    }
  }, []);

  useEffect(() => {
    if (!map || !location.center.lat || !location.center.lng) return;

    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(
      '카페',
      (data, status) => {
        console.log('카페 검색 결과:', data);
        // 카페 카테고리만 필터링
        const cafeData = data.filter((item) => item.category_group_name === '카페');
        dispatch(addResults(cafeData));

        if (status === window.kakao.maps.services.Status.OK) {
          const bounds = new window.kakao.maps.LatLngBounds();
          let newMarkers = [];

          for (var i = 0; i < Math.min(15, cafeData.length); i++) {
            newMarkers.push({
              position: {
                lat: cafeData[i].y,
                lng: cafeData[i].x
              },
              content: cafeData[i].place_name,
              address: cafeData[i].address_name,
              id: cafeData[i].id,
              phone: cafeData[i].phone
            });
            bounds.extend(new window.kakao.maps.LatLng(cafeData[i].y, cafeData[i].x));
          }

          setMarkers(newMarkers);
          map.setBounds(bounds);
          console.log('설정된 마커:', newMarkers);
        }
      },
      {
        location: new window.kakao.maps.LatLng(location.center.lat, location.center.lng),
        radius: 1000
      }
    );
  }, [map, location.center.lat, location.center.lng, search]);

  //지도 드래그시 마크 변경
  const handleDragEnd = () => {
    const center = map.getCenter();
    setLocation({
      center: { lat: center.getLat(), lng: center.getLng() }
    });
  };

  const handleClickEvent = () => {
    setIsClick(false);
    dispatch(connection(false));
  };

  const handleMarkerClickEvent = (marker) => {
    setIsClick(true);
    setInfo(marker);
  };

  return (
    <S.MapWrapper>
      <Map
        center={location.center}
        style={{
          width: '100%',
          height: '100vh'
        }}
        level={3}
        onCreate={setMap}
        onDragEnd={handleDragEnd}
        onClick={handleClickEvent}
      >
        {markers.map((marker) => (
          <CustomOverlayMap key={`marker-${marker.id}`} position={marker.position}>
            <MapMarker
              position={marker.position}
              onClick={() => {
                handleMarkerClickEvent(marker);
              }}
            >
              {(selector.isClick && selector.id === marker.id) || (isClick && info.content === marker.content) ? (
                <S.MapMarkerStyle>
                  <h2>{marker.content}</h2>
                  <p>{marker.address}</p>
                  <div>
                    <button
                      onClick={() => {
                        navigate(`/detail/${marker.id}`);
                      }}
                    >
                      더보기
                    </button>
                  </div>
                </S.MapMarkerStyle>
              ) : null}
            </MapMarker>
          </CustomOverlayMap>
        ))}
      </Map>
    </S.MapWrapper>
  );
};

export default Location;
