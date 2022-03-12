import CreateLot from "../Components/CreateLot/CreateLot";
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        id: state.profile.user.userId,
    }
}

const CreateLotContainer = connect(mapStateToProps, {})(CreateLot);

export default CreateLotContainer