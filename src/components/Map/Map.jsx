import { GoogleMap, Marker } from "@react-google-maps/api";
import React from "react";
import s from "./Map.module.css";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControle: false,
  rotateControl: false,
  streetViewControl: false,
  clicableIcons: false,
  keyboardShortcuts: false,
  scrollwheel: true,
  disableDoubleClickZoom: false,
  fullscreenControl: false,
};

export const MODES = {
  MOVE: 0,
  SET_MARKER: 1
}

const Map = ({ center, places, setTarget, mode, setModal, setTargetPlace }) => {

  const mapRef = React.useRef(undefined);

  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    mapRef.current = undefined;
  }, []);

  const mapClick = (location) => {
    if (mode === MODES.SET_MARKER) {
      setModal(true)
      setTargetPlace({
        lat: location.latLng.lat(),
        lng: location.latLng.lng()
      })
    }
  }

  return (
    <div className={s.container}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
        onClick={mapClick}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultOptions}
      >
        {places && places.map((el)=>{
          return (
            <Marker key={el.id} position={el.coordinates} onClick={()=>setTarget(el.id)}/>
          )
        })}
      </GoogleMap>
    </div>
  );
};

export default Map;
