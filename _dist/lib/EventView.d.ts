import React from 'react';
import { EventObject } from './type/EventObject';
interface EventBoxViewProps {
    eventObj: EventObject;
    isShowTitle: boolean;
    isStart?: boolean;
}
export declare const EventBoxView: React.FC<EventBoxViewProps>;
export {};
