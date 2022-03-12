import Lot from '../Components/Lot/Lot'
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        uId: state.profile.user.userId
    }
}

const CreateLotContainer = connect(mapStateToProps, {})(Lot);

export default CreateLotContainer