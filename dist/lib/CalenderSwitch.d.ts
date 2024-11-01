/// <reference types="react" />
interface CalendarSwitchProps {
    calenderType: string;
    handleCalendarTypeChange: (type: string) => void;
}
export default function CalendarSwitch({ calenderType, handleCalendarTypeChange, }: CalendarSwitchProps): JSX.Element;
export {};
