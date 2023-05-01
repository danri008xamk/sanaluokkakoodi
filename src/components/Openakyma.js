import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { format } from "date-fns";


function Openakyma(props) {
    return(
        <Container maxWidth="sm">
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Oppilas</TableCell>
                            <TableCell>Luokka</TableCell>
                            <TableCell>Löydetyt sanat</TableCell>
                            <TableCell>Väärät sanat</TableCell>
                            <TableCell>Palautettu</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {props.vastaukset.map((vastaus) => {
                            return(
                                <TableRow 
                                    sx={vastaus.oikeinVastattu / props.oikeidenMaara < 0.5 || vastaus.vaarinVastattu >=4
                                        ?{backgroundColor: "#ffa7a1"}
                                        : (vastaus.oikeinVastattu === props.oikeidenMaara
                                            ?{backgroundColor: "#baffc0"}
                                            :{backgroundColor: "grey"}
                                        )                  
                                    }
                                    key={vastaus.id}
                                >
                                    <TableCell>{vastaus.nimi}</TableCell>
                                    <TableCell>{vastaus.luokka}</TableCell>
                                    <TableCell>{vastaus.oikeinVastattu} / {props.oikeidenMaara}</TableCell>
                                    <TableCell>{vastaus.vaarinVastattu}</TableCell>
                                    <TableCell>{format(vastaus.aika, "dd.MM.yyyy kk:mm")}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default Openakyma;