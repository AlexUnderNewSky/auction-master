import MyWins from "../Components/Profile/MyWins/MyWins";
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        id: state.profile.user.userId
    }
}

const LoginContainer = connect(mapStateToProps, {})(MyWins);

export default LoginContainer