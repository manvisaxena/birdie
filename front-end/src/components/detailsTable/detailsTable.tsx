import React, { useEffect, useState } from 'react'; // we need this to make JSX compile
import EventsPie from '../EventsPie/EventsPie';
import EventsTable from '../EventsTable/EventsTable';
import SelectCareRecipients from '../SelectCareRecipient/SelectCareRecipient';
import SubTitle from '../SubTitle';
import styled from 'styled-components';

const DetailsContainer = styled.div`
  
  width: 100%;
  display: flex;
  flex-direction: column;
  
  justify-content: left;
  align-items: left;
`;
const PieView = styled.div`
  height: 30%;
  padding: 10px;
  margin: 10 px;
  
`;
const TableView = styled.div`
  padding: 10px;
  margin: 10 px;
`;

function detailsTable() {
  const [idCr, setIdCr] = useState<string>('');
  const [eventType, setEventType] = useState<string>('');
  
  let onSelectId = (id: string) => {
    setIdCr(id);
    console.log('setting id as-:', id);
  };

  let pieClicked = (event: string) => {
    setEventType(event);
    console.log('setting event as-:', event);
  };

  useEffect(() => {
  }, [idCr]);

  return (
  <div>
    {
      <DetailsContainer>
        <PieView>
          <SubTitle>Select the care recipient from the list</SubTitle>
          <SelectCareRecipients onSelectId={onSelectId}/>
          <EventsPie idCr={idCr} pieClicked={pieClicked}/> 
        </PieView>
        {eventType !== '' && <TableView>
          <EventsTable idCr={idCr} eventType={eventType} />
        </TableView>        
        }
        
      </DetailsContainer>
    }
    
  </div>
  );
  
}

export default detailsTable;