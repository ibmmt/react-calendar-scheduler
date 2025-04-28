import './TimeInput.css';
interface TimeInputProps {
    onChange: (value: string) => void;
    value: string;
}
declare function TimeInput({ onChange, value }: TimeInputProps): import("react/jsx-runtime").JSX.Element;
export default TimeInput;
