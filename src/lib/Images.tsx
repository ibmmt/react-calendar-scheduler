// Importing image paths using ES6 module syntax
import closeIconImg from '../assets/img/close.png';
import leftIconImg from '../assets/img/left-arrow.png';
import rightIconImg from '../assets/img/right-arrow.png';





export const RightIcon = () => <img src={rightIconImg} alt="righticon" />;
export const LeftIcon = () => <img src={leftIconImg} alt="lefticon" />;

export const CrossIcon = () => <img src={closeIconImg} alt="close" />;
