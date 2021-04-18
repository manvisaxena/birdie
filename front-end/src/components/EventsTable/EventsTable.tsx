import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Doughnut } from 'react-chartjs-2';
 
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
    // interface TABLEDATATYPE {
    //     id: string;
    //     alert_id: string;
    //     timestamp: string;
    //     alert_raised: string;
    //     care_recipient_id: string;
    //     observation_event_id: string;
    // }

    // const defaultPosts: TABLEDATATYPE = {
    //     id: '',
    //     alert_id: '',
    //     timestamp: '',
    //     alert_raised: '',
    //     care_recipient_id: '',
    //     observation_event_id: ''
    // };
    const [tableData, setTableData]: [POSTI[], (tableData: POSTI[]) => void] = useState([defaultPosts]);
    const [loading, setLoading] = useState(true);
    const [error, setError]: [string, (error: string) => void] = React.useState('');

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
            }
            setLoading(false);
        })
        .catch(ex => {
            const er = ex.response.status === 404 ? 'Resource Not found' : 'An unexpected error has occurred';
            setError(er);
            setLoading(false);
        });
    }, [Props.idCr, Props.eventType]);

    let transformData = () => {
        console.log('pie data to transform---- ', tableData);
        let eventCount: number[] = [];
        let eventType: string[] = [];
        if ( tableData.length !== 0 && tableData[0].payload !== '' ) {
            let tableTitle: string[] = Object.keys(JSON.parse(tableData[0].payload));
            // let tableValues: string[] = Object.values(JSON.parse(tableData[0].payload));

            console.log(tableTitle);
            let title = '';
            let valueArray: string[] = [];

            tableTitle.map((item: string) => {
                title = title + '<td>{' + item + '}</td>';
            });
            
            tableData.map((item) => {
                var tableVal = '';
                Object.values(JSON.parse(item.payload).map((val: string) => {
                    tableVal = tableVal + '<td>{' + val + '}</td>';
                }));
                valueArray.push(tableVal);
                
            });
            console.log('-**********->', tableTitle, valueArray);

        }
        
        let data = {
            datasets: [{
                data: eventCount
            }],
        
            labels: eventType,
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        };

        return data;
    };

    let onPieClicked = (el: React.FormEvent<HTMLSelectElement>) => {
        console.log(el[0]._view.label);
    };
    
    return(
        <div>
            {tableData.length !== 0 && <Doughnut data={transformData()} onElementsClick={onPieClicked} />}
            <table>
                <tr>
                    {
                        
                    }
                    
                </tr>
            </table>
            {error && <div> error </div>}
        </div>
    );  
}

export default EventsTable;