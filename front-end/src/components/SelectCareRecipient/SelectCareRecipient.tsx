import React, { useEffect } from 'react';
import axios from 'axios';

interface ONCLICKPROPS {
    onSelectId: (text: string) => void;
}

function SelectCareRecipients(Props: ONCLICKPROPS) {
    interface CRLISTTYPE {
        care_recipient_id: string;
    }

    const defaultList: CRLISTTYPE[] = [];
    const [crList, setCrList]: [CRLISTTYPE[], (crList: CRLISTTYPE[]) => void] = React.useState(defaultList);
    const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
    const [error, setError]: [string, (error: string) => void] = React.useState('');

    useEffect(() => {
        axios
          .get<CRLISTTYPE[]>('http://localhost:8000/getcarerecipients', {
            headers: {
              'Content-Type': 'application/json'
            },
        })
        .then(response => {
            setCrList(response.data);
            setLoading(false);
        })
        .catch(ex => {
            const er = ex.response.status === 404 ? 'Resource Not found' : 'An unexpected error has occurred';
            setError(er);
            setLoading(false);
        });
    }, [loading]);
    
    let onCareRecipientSelect = (e: React.FormEvent<HTMLSelectElement>) => {
        var crId: string = e.currentTarget.value;
        Props.onSelectId(crId);
    };
    
    return(
        <div>
            {!loading && <select id="careRecipients" onChange={onCareRecipientSelect}>
                {crList.map((item, i) => (
                    <option value={item.care_recipient_id} key={i}>{item.care_recipient_id}</option>
                ))}
            </select>}
            {loading && <div>Loading please wait..</div>}
            {!loading && error && <p className="error">{error}</p>}
        </div>
    );
}

export default SelectCareRecipients;