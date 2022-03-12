import FindLot from "../Components/FindLots/FindLot";
import {connect} from 'react-redux';
import {setLots} from '../Redux/lotsReducer'
const mapStateToProps = (state) => {
    return {
        lots: state.lots.lots,
    }
}

const CreateLotContainer = connect(mapStateToProps, {setLots})(FindLot);

export default CreateLotContainer