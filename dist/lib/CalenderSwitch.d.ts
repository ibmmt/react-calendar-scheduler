/// <reference types="react" />
import { CalenderType } from './type/Calendar';
interface CalendarSwitchProps {
    calenderType: CalenderType;
    calendarSwitchOptions?: CalenderType[];
    handleCalendarTypeChange: (type: CalenderType) => void;
}
export default function CalendarSwitch({ calenderType, calendarSwitchOptions, handleCalendarTypeChange, }: CalendarSwitchProps): JSX.Element;
export {};
