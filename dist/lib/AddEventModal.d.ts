import React from 'react';
import { EventObjectInput } from './type/EventObject';
interface Props {
    show: boolean;
    handleClose: () => void;
    handleAddEvent: (event: EventObjectInput) => void;
    handleDeleteEvent: (sc_app__id: number) => void;
    eventObj: EventObjectInput;
}
declare const AddEventModal: React.FC<Props>;
export default AddEventModal;
