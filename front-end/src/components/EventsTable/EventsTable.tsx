import axios from 'axios';
import React, { useEffect, useState } from 'react';
 
type tableProps = {
    idCr: string,
    eventType: string
};

function EventsTable(Props: tableProps) {
    
    interface POSTI {
        payload: string;
    }
    const defaultPosts: POSTI = {
        payload: ''
    };
    const [tableData, setTableData]: [POSTI[], (tableData: POSTI[]) => void] = useState([defaultPosts]);
    const [loading, setLoading] = useState(true);
    const [error, setError]: [string, (error: string) => void] = React.useState('');
    const [tableTitles, setTableTitles]: [string[], (tableTitles: string[]) => void] = useState(['']);
    const [tableValues, setTableValues]: [string[][], (tableValues: string[][]) => void] = useState([['']]);

    useEffect(() => {
        console.log('-----------> lfjfn' , Props , loading);
        axios
          .get<POSTI[]>(`http://localhost:8000/getdataforcarerecipientidandevent?cr_id='${Props.idCr}'&event_type='${
              Props.eventType}'`,
           {
            headers: {
              'Content-Type': 'application/json'
            },
        })
        .then(response => {
            console.log(response);
            if (response.data.length !== 0 ) {               
                setTableData(response.data);
                setTableTitles(Object.keys(JSON.parse(response.data[0].payload)));

                let tv: string[][] = [];
                response.data.map(entry => {
                    let val: string[] = Object.values(JSON.parse(entry.payload));
                    tv.push(val);
                });
                console.log('tableValues---> ', tv);
                setTableValues(tv);
                
            }
            setLoading(false);
        })
        .catch(ex => {
            const er = ex.response.status === 404 ? 'Resource Not found' : 'An unexpected error has occurred';
            setError(er);
            setLoading(false);
        });
    }, [Props.idCr, Props.eventType]);

    return(
        <div>
            {tableData.length !== 0 && <table>
                <tbody>
                    <tr>{tableTitles.map((item, i) => <td key={i}>{item}</td>)}</tr>
                    {tableValues.map((row, i2) => <tr key={i2}>{row.map((td, i3) => <td key={i3}>{td}</td>)}</tr>)}
                </tbody>
                
            </table>
            }
            {error && <div> error </div>}
        </div>
    );  
}

export default EventsTable;