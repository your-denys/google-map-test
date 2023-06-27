import { useJsApiLoader } from "@react-google-maps/api";
import Map, { MODES } from "./components/Map/Map";
import { API_KEY } from "./consts";
import s from "./App.module.css"
import { useCallback, useState } from "react";
import { Places, center } from "./data"
import image from "./img1.jpg"
import Modal from "./components/Modal/Modal";


function App() {

  const [places, setPlaces] = useState(Places)
  const [mode, setMode] = useState(MODES.MOVE)
  const [modal, setModal] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [targetPlace, setTargetPlace] = useState({
    lat: null,
    lng: null
  })

  function setTarget(id) {
    setPlaces((prew) => {
      return prew.map((el) => {
        if (el.id === id) {
          return { ...el, target: true }
        } else {
          return { ...el, target: false }
        }
      })
    })
  }

  const toggleMode = useCallback(() => {
    switch (mode) {
      case MODES.MOVE:
        setMode(MODES.SET_MARKER)
        break;
      case MODES.SET_MARKER:
        setMode(MODES.MOVE)
        break;
      default:
        setMode(MODES.MOVE)
    }
  }, [mode])

  const addNewPlace = () => {
    if (title !== "" && description !== "") {
      setPlaces((prew) => [
        ...places, {
          id: Date.now(),
          title: title,
          description: description,
          img: 'img1.jpg',
          coordinates: targetPlace,
          target: false
        }
      ]) 
      setModal(false)
      setDescription("")
      setTitle("")
    } else {
      alert("write something")
    }
  }


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY
  })

  return (
    <div className={s.container}>
      <div className={s.leftBar}>
        {places && places.map((el) => {
          return (
            <div key={el.id} onClick={() => setTarget(el.id)}>
              <img src={image} alt="img" />
              <p>{el.title}</p>
            </div>
          )
        })}
      </div>
      <div className={s.add}>
        <button onClick={toggleMode}>Add an ad?</button>
        {mode === MODES.SET_MARKER && <div>Select a place on the map</div>}
      </div>
      {isLoaded ? <Map center={center} places={places} setTarget={setTarget} mode={mode} setModal={setModal} setTargetPlace={setTargetPlace} /> : <h1>Loading...</h1>}
      {modal && <Modal setModal={setModal} title={title} description={description} setTitle={setTitle} setDescription={setDescription} addNewPlace={addNewPlace} />}
      {
        places && places.filter((it) => it.target).map((el) => {
          return (
            <div key={el.id} className={s.rightBar}>
              <img src={image} alt="img" />
              <p>{el.title}</p>
              <p>{el.description}</p>
              <button onClick={() => console.log("Submit an ad " + el.id)}> Submit an ad </button>
            </div>
          )
        }
        )
      }
    </div>
  );
}

export default App;
