import SaveImg from '../../../assets/images/save.png';
import './index.css';

const Screen = ({ value, onClick }: { value: string; onClick: () => void }) => {
    return (
        <div className="screen-wrapper">
            <button className="save-button" onClick={ () => onClick() }>
                <img title="save result" width="20px" height="20px" src={ SaveImg } alt="save"></img>
            </button>
            <div>{ value }</div>
        </div>
    );
};

export default Screen;
