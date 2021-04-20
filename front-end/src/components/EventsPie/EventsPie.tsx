import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Doughnut } from 'react-chartjs-2';
import styled from 'styled-components';
 
type tableProps = {
    idCr: string,
    pieClicked: Function
};
const DoughnutContainer = styled.div`
    width: 1000px;
    margin-top: 10px;
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
        axios
          .get<POSTI[]>(`http://localhost:8000/getdataforcarerecipientid?cr_id='${Props.idCr}'`, {
            headers: {
              'Content-Type': 'application/json'
            },
        })
        .then(response => {
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
        let eventCount: number[] = [];
        let eventType: string[] = [];
        pieData.map((item, i) => {
            eventCount.push(item.event_count);
            eventType.push(item.event_type);
        });
        let generateColors = () => { 
            let colorArray: string[] = [];

            for ( let i = 0 ; i < 30 ; i++ ) {
                let rnum1 = 1 + ( i * 10 );
                let rnum2 = 150 + i;
                let rnum3 = 200 + i;
                colorArray.push( 'rgb(' + rnum2 + ', ' + rnum1 + ', ' + rnum3 );

            }

            return colorArray;
        };

        let data = {
            datasets: [{
                data: eventCount,
                backgroundColor: generateColors
            }],
        
            labels: eventType
        };

        return data;
    };

    let onPieClicked = (el: React.FormEvent<HTMLSelectElement>) => {
        Props.pieClicked(el[0]._view.label);
    };
    
    return(
        <div>
            {pieData.length !== 0 && !loading && <DoughnutContainer>
                <Doughnut 
                    data={transformData()} 
                    legend={{display: true, position: 'right'}} 
                    onElementsClick={onPieClicked} 
                />
            </DoughnutContainer>}
            {error && <div> {error} </div>}
        </div>
    );  
}

export default EventsPie;