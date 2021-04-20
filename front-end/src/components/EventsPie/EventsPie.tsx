import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Doughnut } from 'react-chartjs-2';
import styled from 'styled-components';
 
type tableProps = {
    idCr: string,
    pieClicked: Function
};
const DoughnutContainer = styled.div`
    background-color: #07f6f6;
    width: 100%;
    border: 1px solid #000000;
`;

function EventsPie(Props: tableProps) {
    
    interface POSTI {
        event_count: number;
        event_type: string;
    }

    const defaultPosts: POSTI = {
        event_count: 0,
        event_type: ''
    };
    const [pieData, setpieData]: [POSTI[], (pieData: POSTI[]) => void] = useState([defaultPosts]);
    const [loading, setLoading] = useState(true);
    const [error, setError]: [string, (error: string) => void] = React.useState('');

    useEffect(() => {
        console.log('-----------> lfjfn' , Props , loading);
        axios
          .get<POSTI[]>(`http://localhost:8000/getdataforcarerecipientid?cr_id='${Props.idCr}'`, {
            headers: {
              'Content-Type': 'application/json'
            },
        })
        .then(response => {
            console.log(response);
            setpieData(response.data);
            setLoading(false);
        })
        .catch(ex => {
            const er = ex.response.status === 404 ? 'Resource Not found' : 'An unexpected error has occurred';
            setError(er);
            setLoading(false);
        });
    }, [Props.idCr]);

    let transformData = () => {
        console.log('pie data to transform---- ', pieData);
        let eventCount: number[] = [];
        let eventType: string[] = [];
        pieData.map((item, i) => {
            eventCount.push(item.event_count);
            eventType.push(item.event_type);
        });

        let data = {
            datasets: [{
                data: eventCount
            }],
        
            labels: eventType,
            options: {
                legend: {
                    display: false
                }
            }
        };

        return data;
    };

    let onPieClicked = (el: React.FormEvent<HTMLSelectElement>) => {
        Props.pieClicked(el[0]._view.label);
    };
    
    return(
        <div>
            {pieData.length !== 0 && !loading && <DoughnutContainer>
                <Doughnut data={transformData()} legend={{display: false}} onElementsClick={onPieClicked} />
            </DoughnutContainer>}
            {error && <div> {error} </div>}
        </div>
    );  
}

export default EventsPie;