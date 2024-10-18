import React from 'react';
import { EventObjectInput } from './type/EventObject';
import { Team } from './type/team';
interface Props {
    show: boolean;
    handleClose: () => void;
    handleAddEvent: (event: EventObjectInput) => void;
    onDeleteEvent: (sc_app__id: number) => void;
    eventObj: EventObjectInput;
    teams?: Team[];
}
declare const AddEventModal: React.FC<Props>;
export default AddEventModal;
