import { CalenderType } from './type/Calendar';

interface CalendarSwitchProps {
  calendarType: CalenderType;
  calendarViewOptions?: CalenderType[];
  onCalendarTypeChange: (type: CalenderType) => void;
}

export default function CalendarSwitch({
  calendarType,
  calendarViewOptions,
  onCalendarTypeChange,
}: CalendarSwitchProps) {
  return (
    <div className="ib__sc__calendar_switch">
      <select
        value={calendarType}
        onChange={(e) => onCalendarTypeChange(e.target.value as CalenderType)}
        className="ib__sc__select"
      >
        {calendarViewOptions?.map((type, index) => (
          <option key={index} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
