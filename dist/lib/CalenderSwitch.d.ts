/// <reference types="react" />
interface CalendarSwitchProps {
    calenderType: string;
    handleClanderTypeChange: (type: string) => void;
}
export default function CalendarSwitch({ calenderType, handleClanderTypeChange, }: CalendarSwitchProps): JSX.Element;
export {};
