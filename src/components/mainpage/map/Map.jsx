import {
  GoogleMap,
  InfoWindow,
  Marker,
  MarkerF,
  InfoWindowF,
  useLoadScript,
} from "@react-google-maps/api";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  useAuthStore,
  useCreateEntry,
  useEntries,
  useEntryInfoWindow,
  useInsertStore,
  useProfileInStore,
  useSelectCategory,
} from "../../../state/AppState";
import { getEntriesQ } from "../../../queries/EntriesQueries";
import LoadingSpinner from "../../utils/LoadingSpinner";
import Cookies from "js-cookie";
import { newShade } from "../../../utils/colorShade";

const Map = () => {
  const isLoggedIn = useAuthStore((state) => state.updateIsLoggedIn);
  const profileInsert = useProfileInStore((state) => state.toggleProfileInsert);
  const signleInsert = useInsertStore((state) => state.toggleInsert);
  const selectCategory = useSelectCategory((state) => state.selectCategory);
  const entries = useEntries((state) => state);
  const createEntry = useCreateEntry((state) => state);

  const center = useMemo(() => ({ lat: 35.3376536, lng: 25.1309503 }), []);

  const [markers, setMarkers] = useState([{ center: center, color: "" }]);
  const [lastMarker, setLastMarker] = useState(-1);

  const popInfoWindow = useEntryInfoWindow((state) => state.entry)
  const isInfowOpened = useEntryInfoWindow((state) => state.isOpen)

  useEffect(() => {
    if(isInfowOpened){
    onMarkerClick({
      center: {lat: +popInfoWindow.lat, lng: +popInfoWindow.long},
      color: popInfoWindow.color,
      marker: popInfoWindow
    });
  }
  }, [isInfowOpened]);

  const pinBackground = useMemo(
    () => ({
      background: createEntry.entry.color,
      borderColor: newShade(createEntry.entry.color, 15),
      glyphColor: newShade(createEntry.entry.color, 15),
    }),
    [createEntry.entry.color],
  );

  const addMarker = (ev) => {
    if (profileInsert) {
      createEntry.updateEntry({
        lat: ev.latLng.toJSON().lat,
        long: ev.latLng.toJSON().lng,
      });

      // Update the lastMarker state with the new marker
      setLastMarker({ center: ev.latLng.toJSON(), color: pinBackground });

      setMarkers([
        ...markers,
        { center: ev.latLng.toJSON(), color: pinBackground },
      ]);
    }

    if (signleInsert) {
      createEntry.updateEntry({
        lat: ev.latLng.toJSON().lat,
        long: ev.latLng.toJSON().lng,
      });

      // Update the lastMarker state with the new marker
      setLastMarker({ center: ev.latLng.toJSON(), color: pinBackground });

      setMarkers([
        ...markers,
        { center: ev.latLng.toJSON(), color: pinBackground },
      ]);
    }
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOLE_MAPS_KEY,
  });

  const { data, refetch, isLoading } = getEntriesQ(selectCategory?.pub_id);

  const [activeMarker, setActiveMarker] = useState(null);
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  const onMarkerClick = (marker) => {
    console.log(marker)
    setActiveMarker(marker);
    setShowInfoWindow(true);
  };

  const onInfoWindowClose = () => {
    setActiveMarker(null);
    setShowInfoWindow(false);
  };

  useEffect(() => {
    if (data && data !== undefined) {
      setMarkers([]);
      data.forEach((entry) => {
        const pinBackground = {
          background: entry.color,
          borderColor: newShade(entry.color, 15),
          glyphColor: newShade(entry.color, 15),
        };
        setMarkers((prevMarkers) => [
          ...prevMarkers,
          {
            center: { lat: +entry.lat, lng: +entry.long },
            color: pinBackground,
            marker: entry,
          },
        ]);

        // console.log(
        //   `The profileInsert is ${pinBackground.borderColor} and the singleInsett is ${pinBackground.background}`,
        // );
      });
      entries.updateEntries(data);
    }
  }, [data]);


  useEffect(() => {
    refetch();
  }, [selectCategory]);

  if (data === 401) {
    Cookies.remove("jwtToken");
    isLoggedIn(false);
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="relative">
      {!isLoaded ? (
        <h1 className="justify-center items-center">Map is Loading...</h1>
      ) : (
        <div className="bg-white">
          {/* <h1 className='justify-center items-center'>Map is LOADED...</h1> */}
          <div className="h-screen">
            <GoogleMap
              zoom={10}
              center={center}
              mapContainerClassName="w-full h-full drop-shadow-lg rounded-lg"
              onClick={addMarker}
            >
              {markers.map((point, index) => {
                return (
                  <MarkerF
                    key={index}
                    position={point.center}
                    onLoad={(marker) => {
                      const customIcon = (opts) =>
                        Object.assign(
                          {
                            path: "M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z",
                            fillColor: point.color.background,
                            fillOpacity: 1,
                            strokeColor: point.color.borderColor,
                            strokeWeight: 2,
                            scale: 2,
                            anchor: new google.maps.Point(10, 20),
                          },
                          opts,
                        );
                      marker.setIcon(
                        customIcon({
                          background: point.color.background,
                          strokeColor: point.color.borderColor,
                        }),
                      );
                      marker.addListener("click", () => {
                        console.log("Marker clicked!");
                        onMarkerClick(point);
                      });
                      // onClick={onMarkerClick}
                      // return markerLoadHandler(marker, place);
                    }}
                  />
                );
              })}
              {activeMarker ? (
                <InfoWindowF
                  position={activeMarker.center}
                  onCloseClick={() => onInfoWindowClose()}
                  visible={showInfoWindow}
                  disableAutoPan={false}
                >
                  <div>
                    {
                      Object.entries(activeMarker.marker).map(
                        ([key, value]) => (
                          <p key={key}>{`${key}: ${value}`}</p>
                        ),
                      )
                      // .join("\n")
                    }
                  </div>
                </InfoWindowF>
              ) : (
                <></>
              )}
            </GoogleMap>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
