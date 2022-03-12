import Profile from "../Components/Profile/Profile";
import {connect} from 'react-redux';
import {setUser} from '../Redux/profileReducer'

const mapStateToProps = (state) => {
    return {
        user: state.profile.user,
    }
}

const CreateLotContainer = connect(mapStateToProps, {setUser})(Profile);

export default CreateLotContainer