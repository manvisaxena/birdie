import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
 
type tableProps = {
    idCr: string,
    eventType: string
};

const TableView = styled.div`
    width: 100%;
`;
const Td = styled.td`
    text-align: left;
    padding: 8px;
`;
const Th = styled.th`
    border-bottom: 1px solid #000000;
    text-align: left;
    padding: 8px;
`;
const Tr = styled.tr`
    border-bottom: 1px solid #000000;
`;
const InfoBox = styled.div`
    border: none;
`;

function EventsTable(Props: tableProps) {
    
    interface POSTI {
        payload: string;
    }
    // const defaultPosts: POSTI = {
    //     payload: ''
    // };
    let defaultMaps: Map<string, string>[] = [];
    // const [tableData, setTableData]: [POSTI[], (tableData: POSTI[]) => void] = useState([defaultPosts]);
    const [loading, setLoading] = useState(true);
    const [error, setError]: [string, (error: string) => void] = React.useState('');
    const [tableTitles, setTableTitles]: [Map<string, string>, 
        (tableTitles: Map<string, string>) => void] = useState(new Map());
    const [tableValues, setTableValues]: [Map<string, string>[], 
    (tableValues: Map<string, string>[]) => void] = useState(defaultMaps);

    useEffect(() => {
        setLoading(true);
        axios
          .get<POSTI[]>(`http://localhost:8000/getdataforcarerecipientidandevent?cr_id='${Props.idCr}'&event_type='${
              Props.eventType}'`,
           {
            headers: {
              'Content-Type': 'application/json'
            },
        })
        .then(response => {
            console.log('0------------', response.data.length );
            if (response.data.length !== 0 ) {               
                // setTableData(response.data);

                let tv: Map<string, string>[] = [];
                let tt: Map<string, string> = new Map();

                for (let i = 0; i < response.data.length; i++) {
                    const obj = JSON.parse(response.data[i].payload);
                    
                    let tableMapValue: Map<string, string> = new Map();

                    const keysArray = Object.keys(obj);

                    keysArray.map(key => {
                        tableMapValue.set(key, obj[key]);
                    });
                    tv.push(tableMapValue);

                    // tt = tableTitles;
                    keysArray.map(key => {
                        if (!Array.from(tt.keys()).includes(key)) {
                            tt.set(key, key);
                        }
                        return key;
                    });

                }

                console.log('tv Values------------> ', tv , Array.from(tv[0].keys()) );
                
                console.log('tt values------------>', tt , Array.from(tt.keys()));
                setTableTitles(tt);
                setTableValues(tv);
                
                setLoading(false);
                
            }
        })
        .catch(ex => {
            const er = ex.response.status === 404 ? 'Resource Not found' : 'An unexpected error has occurred';
            setError(er);
            setLoading(false);
        });
    }, [Props.idCr, Props.eventType]);
    console.log('tableTitles--: ', tableTitles, tableValues, tableTitles.size);

    return(
        <TableView>
            {!loading && tableValues.length !== 0 && tableTitles.size !== 0 && <table> 
                <tbody>
                <Tr>
                    {Array.from(tableTitles.keys()).map((item, i) => <Th key={i}>{item}</Th>)}
                </Tr>
                {tableValues.map((row, i2) => <Tr key={i2}>
                    {Array.from(tableTitles.keys()).map((key, i3) => 
                    <Td key={i3}> {row.get(key)}{key}</Td>)
                    }
                </Tr>)}
                </tbody>
            </table>
            }
            {loading && <InfoBox>Loading please wait..</InfoBox>}
            {!loading && error && <InfoBox> error </InfoBox>}
        </TableView>
    );  
}

// function union_arrays (x: string[], y: string[]) {
//     var obj = {};
//     for (var i = x.length-1; i >= 0; -- i)
//        obj[x[i]] = x[i];
//     for (var i = y.length-1; i >= 0; -- i)
//        obj[y[i]] = y[i];
//     var res = []
//     for (var k in obj) {
//       if (obj.hasOwnProperty(k))  // <-- optional
//         res.push(obj[k]);
//     }
//     return res;
//   }

export default EventsTable;