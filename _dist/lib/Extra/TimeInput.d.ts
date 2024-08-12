/// <reference types="react" />
import './TimeInput.css';
interface TimeInputProps {
    onChange: (value: string) => void;
    value: string;
}
declare function TimeInput({ onChange, value }: TimeInputProps): JSX.Element;
export default TimeInput;
