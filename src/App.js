import { useEffect, useState } from 'react';
import './App.css';
import Kirjautuminen from './components/Kirjautuminen';
import Openakyma from './components/Openakyma'
import Oppilasnakyma from './components/Oppilasnakyma';
import tehtavaJSON from './tehtavateksti.json';

function App() {
  let teksti = tehtavaJSON.teksti.split(" ");
  let oikeatSanat = tehtavaJSON.oikeat;

  const [kirjautunut, setKirjautunut] = useState(false);
  const [oppilaidenVastaukset, setOppilaidenVastaukset] = useState([]);

  const tallennaVastaukset = () => {
    localStorage.setItem("vastaukset", JSON.stringify(oppilaidenVastaukset))
  }

  const haeVastaukset = () => {
    if(localStorage.getItem("vastaukset")) {
      setOppilaidenVastaukset(JSON.parse(localStorage.getItem("vastaukset")))
    } else {
      setOppilaidenVastaukset([]);
    }
  }

  useEffect(() => {
    haeVastaukset();
  }, [])

  useEffect(() => {
    tallennaVastaukset();
  }, [oppilaidenVastaukset])

  return (
    <div>
    <Kirjautuminen kirjautunut={kirjautunut} setKirjautunut={setKirjautunut}  />
    {kirjautunut
    ? <Openakyma vastaukset={oppilaidenVastaukset} oikeidenMaara={oikeatSanat.length} />
    : <Oppilasnakyma 
        teksti={teksti} 
        oikeatSanat={oikeatSanat} 
        setOppilaidenVastaukset={setOppilaidenVastaukset} 
        oppilaidenVastaukset={oppilaidenVastaukset}
      />
    }
    </div>

  );
}

export default App;
