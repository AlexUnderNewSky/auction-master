import RouteController from "../RouterController";
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        id: state.profile.user.userId
    }
}

const CreateLotContainer = connect(mapStateToProps, {})(RouteController);

export default CreateLotContainer