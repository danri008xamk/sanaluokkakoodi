import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

function Tietolomake(props) {
    return (
        <div>
            <TextField onChange={(e) => props.setVastaaja(e.target.value)} fullWidth label="Oma nimi" sx={{mb: 3}}/>
            <FormControl fullWidth sx={{mb: 2}}>
                <InputLabel id="luokkaid">Luokka</InputLabel>
                <Select 
                    fullWidth
                    label="Luokka" 
                    labelId="luokkaid" 
                    value={props.luokka} 
                    onChange={(e) => props.setLuokka(e.target.value)}
                >
                    <MenuItem value="7A">7A</MenuItem>
                    <MenuItem value="7B">7B</MenuItem>
                    <MenuItem value="7C">7C</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default Tietolomake;