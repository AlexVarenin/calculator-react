import './index.css';

const Button = ({ onClick, children, className }: { onClick?: () => void, className?: string, children: string }) => (
    <button className={`button ${ className }`} onClick={() => onClick && onClick() }>{ children }</button>
);

export default Button;
