import { Button, Container, Dialog, DialogTitle, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Tehtavaruutu from './Tehtavaruutu';
import Tietolomake from './Tietolomake';
import VastauksenTarkistus from './VastauksenTarkistus';
import {v4 as uuid} from 'uuid';

function Oppilasnakyma(props) {
    
    const[tehtavateksti, setTehtavateksti] = useState(props.teksti.map((sana) => {
        return {
          sana: sana,
          oikeaVastaus: props.oikeatSanat.includes(sana),
          aktiivinen: false
        }
      }));

      const [vastaaja, setVastaaja] = useState("");
      const [luokka, setLuokka] = useState("");
      const [tiedotOk, setTiedotOk] = useState(false);

      useEffect(() => {
        if(vastaaja.length > 1 && luokka) {
          setTiedotOk(true);
        } else {
          setTiedotOk(false);
        }
      }, [vastaaja, luokka])

      const[tarkistettuVastaus, setTarkistettuVastaus] = useState({});
      const[naytaTarkistus, setNaytaTarkistus] = useState(false);

      const tarkistaVastaus = () => {
        let oikeinVastattu = tehtavateksti.filter((sana) => sana.oikeaVastaus && sana.aktiivinen);
        let eiLoydetyt = tehtavateksti.filter((sana) => sana.oikeaVastaus && !sana.aktiivinen);
        let vaarinVastattu = tehtavateksti.filter((sana) => !sana.oikeaVastaus && sana.aktiivinen);
    
        setTarkistettuVastaus({
          oikeinVastattu: oikeinVastattu,
          eiLoydetyt: eiLoydetyt,
          vaarinVastattu: vaarinVastattu
        })
    
        props.setOppilaidenVastaukset([...props.oppilaidenVastaukset, {
          nimi: vastaaja,
          luokka: luokka,
          aika: new Date().getTime(),
          oikeinVastattu: oikeinVastattu.length,
          vaarinVastattu: vaarinVastattu.length,
          id: uuid()
        }])
    
        setNaytaTarkistus(true);
      }

      const tyhjennaVastaukset = () => {
        setTehtavateksti(tehtavateksti.map((sana) => {sana.aktiivinen = false; return sana;}))
        setVastaaja("");
        setLuokka("");
        setTiedotOk(false);
        setNaytaTarkistus(false);
      }

    return (
    <Container maxWidth="sm">
        <Tietolomake vastaaja={vastaaja} setVastaaja={setVastaaja} setLuokka={setLuokka} luokka={luokka}/>
        <Typography align="center" variant='h4' sx={{mb: 2}}>Etsi tekstistä adjektiivit.</Typography>
        <Tehtavaruutu tehtavateksti={tehtavateksti} setTehtavateksti ={setTehtavateksti}/>
        <Button fullWidth variant="contained" disabled={!tiedotOk} onClick={tarkistaVastaus}>Lähetä vastaus</Button>
        <Dialog open={naytaTarkistus} onClose={tyhjennaVastaukset}>
        <DialogTitle>Vastauksesi</DialogTitle>  
        <VastauksenTarkistus 
            oikeinVastattu={tarkistettuVastaus.oikeinVastattu} 
            oikeidenMaara={props.oikeatSanat.length}
            eiLoydetyt={tarkistettuVastaus.eiLoydetyt}
            vaarinVastattu={tarkistettuVastaus.vaarinVastattu}  
        />
        </Dialog>
    </Container>
    )
}

export default Oppilasnakyma;