import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
 
type tableProps = {
    idCr: string,
    eventType: string
};

const TableView = styled.table`
    background-color: #07f6f6;
    width: 100%;
    border: 1px solid #000000;
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

                let tv: string[][] = [];
                let tt: string[] = [];
                // response.data.map(entry => {
                //     let val: string[] = Object.values(JSON.parse(entry.payload));
                //     tv.push(val);
                // });

                for (let i = 0; i < response.data.length; i++) {
                    const element = response.data[i];
                    const obj = JSON.parse(element.payload);
                    console.log(obj.keys );
                    const ar1 = Object.keys(JSON.parse(obj);

                    if( ar1 == tableTitles){

                        let val: string[] = Object.values(obj);
                        tv.push(val);
                    }
                    else{
                        setTableTitles(union_arrays(ar1, tableTitles));
                        tv.push('');
                    };


                }

                console.log('tableValues------------> ', tv , tableTitles);
                
                // setTableTitles(tt);
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
    console.log('tableTitles--: ', tableData , tableTitles, tableValues);

    return(
        <TableView>
            {tableData.length !== 0 && tableTitles[0] !== '' && <table>
                <tbody>
                    {tableTitles.map((item, i) => <Th key={i}><Td key={i}>{item}</Td></Th>)}
                    {tableValues.map((row, i2) => <Tr key={i2}>{row.map((td, i3) => <Td key={i3}>{td}</Td>)}</Tr>)}
                </tbody>
                
            </table>
            }
            {error && <div> error </div>}
        </TableView>
    );  
}

function union_arrays (x: string[], y: string[]) {
    var obj = {};
    for (var i = x.length-1; i >= 0; -- i)
       obj[x[i]] = x[i];
    for (var i = y.length-1; i >= 0; -- i)
       obj[y[i]] = y[i];
    var res = []
    for (var k in obj) {
      if (obj.hasOwnProperty(k))  // <-- optional
        res.push(obj[k]);
    }
    return res;
  }

export default EventsTable;