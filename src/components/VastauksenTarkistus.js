import { DialogContent, List, ListItem, Typography } from "@mui/material";

function VastauksenTarkistus(props) {
    return (
        <DialogContent>
            <Typography>Löysit {props.oikeinVastattu.length} / {props.oikeidenMaara} etsittävää sanaa.</Typography>
            {props.eiLoydetyt.length > 0
            ?<div>
                <Typography color="primary">Löytämättä jäi:</Typography>
                <List dense>
                {props.eiLoydetyt.map((sana) => <ListItem key={sana.sana}><Typography>{sana.sana}</Typography></ListItem>)}
                </List> 
            </div>
            : null
            }
            {props.oikeinVastattu.length === props.oikeidenMaara && props.vaarinVastattu.length === 0
            ? <Typography>Sait kaikki oikein. Hienoa!</Typography>
            : <div>
                <Typography color="error">Väärät sanat:</Typography>
                <List dense>
                 {props.vaarinVastattu.map((sana) => <ListItem key={sana.sana}><Typography>{sana.sana}</Typography></ListItem>)}
                </List> 
            </div>
            }
        </DialogContent>
    )
}

export default VastauksenTarkistus;