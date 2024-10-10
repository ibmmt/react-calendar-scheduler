/// <reference types="react" />
import { CalenderType } from './type/Calendar';
interface CalendarSwitchProps {
    calendarType: CalenderType;
    calendarViewOptions?: CalenderType[];
    onCalendarTypeChange: (type: CalenderType) => void;
}
export default function CalendarSwitch({ calendarType, calendarViewOptions, onCalendarTypeChange, }: CalendarSwitchProps): JSX.Element;
export { };

