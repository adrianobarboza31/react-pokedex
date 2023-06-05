import "./App.css";
import img from "./pokedex (1).png";
import React, { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [index, setIndex] = useState(1);
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [imgload, setImgload] = useState(false);
  const pimg =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
    index +
    ".png";
  const api = "https://pokeapi.co/api/v2/pokemon?limit=151%27";
  const vai = async () => {
    const response = await axios.get(api);
    console.log(response.data.results);
    setData(response.data.results);
    setLoad(true);
  };

  useEffect(() => {
    vai();
  }, []);
  const cerca = (e) => {
    // console.log(e.target.value);
    let cerc = e.target.value;
    let ind =
      data.find((el) => {
        return el.name == cerc;
      }) ||
      data.find((el) => {
        return el.name.includes(cerc);
      });
    console.log(ind);
    if (ind) {
      const indic = data.indexOf(ind) || 1;
      setIndex(indic + 1);
    }
  };
  return (
    <>
      <div className="sfondo">
        <div className="relativ">
          <img onLoad={() => setImgload(!imgload)} src={img}></img>
          <div className="imgp">
            <img src={pimg}></img>
          </div>
          <div className={imgload ? "scritta" : "hidden"}>
            {load ? data[index - 1].name : "loading"}
          </div>
          <div>
            <button
              className="avanti"
              onClick={() => setIndex(index == data.length ? 1 : index + 1)}
            >
              avanti
            </button>
            <button
              className="indietro"
              onClick={() => setIndex(index == 1 ? data.length : index - 1)}
            >
              indietro
            </button>
          </div>
          <div className="input">
            <input name="n" onChange={cerca} type="text"></input>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
