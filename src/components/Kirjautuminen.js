import { Button, Drawer, TextField, Typography } from '@mui/material';
import { useState, useRef } from 'react';

function Kirjautuminen(props) {
    const [naytaSivupalkki, setNaytaSivupalkki] = useState(false);
    const [vaaraTunnus, setVaaraTunnus] = useState(false);

    const tunnus = useRef("");
    const salasana = useRef("");

    const kirjauduSisaan = (e) => {
        e.preventDefault();
        if(tunnus.current.value === "ope" && salasana.current.value === "testi") {
            props.setKirjautunut(true);
            setVaaraTunnus(false);
            setNaytaSivupalkki(false);
        } else {
            setVaaraTunnus(true);
        }
    }

    return(
        <div>
            <Button onClick={() => setNaytaSivupalkki(true)}>
                {props.kirjautunut
                ?"Käyttäjätunnus"
                :"Kirjaudu opettajana"}
            </Button>
            <Drawer
                anchor='left'
                open={naytaSivupalkki}
                onClose={() => setNaytaSivupalkki(false)}
                PaperProps={{sx:{padding: "20px", width: "250px"}}}
            >
                {props.kirjautunut
                ?<div>
                    <Typography>Olet kirjautunut sisään testitunnuksella.</Typography>
                    <Button onClick={() => props.setKirjautunut(false)}>Kirjaudu ulos</Button>
                </div>
                :<div>
                <form onSubmit={kirjauduSisaan}>
                    <Typography variant="h5" sx={{mb: 2}}>Kirjaudu sisään</Typography>
                    {vaaraTunnus
                    ?<Typography color="error">Väärä tunnus tai salasana</Typography>
                    :null}
                    <TextField inputRef={tunnus} fullWidth label="Käyttäjätunnus" />
                    <TextField inputRef={salasana} fullWidth type="password" label="Salasana" />
                    <Button type="submit" fullWidth variant="contained">Kirjaudu</Button>
                </form>
                <Typography variant="subtitle1" mt={2}>Testitunnukset:</Typography>
                <Typography variant="subtitle2">Käyttäjätunnus: ope</Typography>
                <Typography variant="subtitle2">Salasana: testi</Typography>
                </div>
                }
            </Drawer>
        </div>
    )
}

export default Kirjautuminen;