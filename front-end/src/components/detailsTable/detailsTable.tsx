import React, { useEffect, useState } from 'react'; // we need this to make JSX compile
import EventsPie from '../EventsPie/EventsPie';
import EventsTable from '../EventsTable/EventsTable';
import SelectCareRecipients from '../SelectCareRecipient/SelectCareRecipient';
import SubTitle from '../SubTitle';
// import styled from 'styled-components';

// const DetailsContainer = styled.div`
//   background-color: #CF2D0A;
//   height: 350px;
//   width: 200;
// `;

function detailsTable() {
  const [idCr, setIdCr] = useState<string>('');
  const [eventType, setEventType] = useState<string>('');
  
  let onSelectId = (id: string) => {
    setIdCr(id);
    console.log('setting id as-:', id);
  };

  let pieClicked = (event: string) => {
    setEventType(event);
  };

  useEffect(() => {
  }, [idCr]);

  return (
  <div>
    {
      <div>
        <SubTitle>Select the care recipient from the list</SubTitle>
        <SelectCareRecipients onSelectId={onSelectId}/>
        <div>
          <EventsPie idCr={idCr} pieClicked={pieClicked}/>
          <EventsTable idCr={idCr} eventType={eventType}/>
        </div>

      </div>
    }
    
  </div>
  );
  
}

export default detailsTable;