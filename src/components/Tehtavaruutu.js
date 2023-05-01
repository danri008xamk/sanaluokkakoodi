import { Paper, Typography } from "@mui/material";

function Tehtavaruutu(props) {
    const aktivoiSana = (index) => {
        props.setTehtavateksti(props.tehtavateksti.map((sana, ind) => {
          if(ind === index) {
            sana.aktiivinen = !sana.aktiivinen;
          }
    
          return sana;
        }))
      }

    return(
        <Paper elevation={4} sx={{margin: 3, padding: 2}}>
            <Typography>
                {props.tehtavateksti.map((sana, index) => {
                    return <span 
                                className={sana.aktiivinen ? 'sana aktiivinenSana' : 'sana'} 
                                key={index}
                                id={index} 
                                onClick={() => aktivoiSana(index)}
                            >{sana.sana} </span>
                 })}
            </Typography>
        </Paper>
    )
}

export default Tehtavaruutu;