import React, { useState, useEffect } from "react";
import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from './colorHelpers';
import { Routes, Route, useParams, useLocation, Outlet } from 'react-router-dom';
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import NotFound from "./NotFound";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './App.css';


function App() {

  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));

  const [state, setState] = useState({
    palettes: savedPalettes || seedColors
  });

  const { palettes } = state;

  const findPalette = id => palettes.find(palette => palette.id === id);

  const PaletteWrapper = () => {
    const id = useLocation().pathname.replace("/palette/", "");

    const palette = generatePalette(findPalette(id))

    return <Palette palette={palette} />;
  };

  const SingleWrapper = () => {
    const { colorId, paletteId } = useParams();

    const palette = generatePalette(findPalette(paletteId))

    return <SingleColorPalette palette={palette} colorId={colorId} />
  };

  const handleSavePalette = (newPalette) => {
    setState({
      palettes: [...palettes, newPalette]
    });
  };

  useEffect(() => {
    window.localStorage.setItem("palettes", JSON.stringify(palettes));
  }, [palettes]);

  const removePalette = (id) => {
    setState(st => ({
      palettes: st.palettes.filter(palette => palette.id !== id)
    }));
  }

  const MainWrapper = () => {
    const pathname = useLocation().pathname;
    return (
      <TransitionGroup>
        <CSSTransition key={pathname} classNames='fade' timeout={500}>
          <Outlet />
        </CSSTransition>
      </TransitionGroup>
    );
  };

  return (
    <div>
      <Routes>
        <Route element={<MainWrapper />}>
          <Route path="/" element={<PaletteList removePalette={removePalette} palettes={palettes} />} />
          <Route path="/palette/new" element={<NewPaletteForm palettes={palettes} handleSavePalette={handleSavePalette} />} />
          <Route path="/palette/:paletteId">
            <Route index element={<PaletteWrapper />} />
            <Route path='/palette/:paletteId/:colorId' element={<SingleWrapper />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
