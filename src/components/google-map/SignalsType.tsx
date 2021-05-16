import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

export default function SignalsType({ changeSignalType, isInjured, isLost }: any) {
    return <ButtonGroup className="signals-type-holder" variant="contained" color="primary" aria-label="contained primary button group">
        <Button className={isInjured && !isLost ? "active" : ""} onClick={() => changeSignalType("injured")}> Injured animal </Button>
        <Button className={!isInjured && isLost ? "active" : ""} onClick={() => changeSignalType("lost")}> Lost animal </Button>
        <Button className={isInjured && isLost ? "active" : ""} onClick={() => changeSignalType("both")}> Both </Button>
    </ButtonGroup>
}