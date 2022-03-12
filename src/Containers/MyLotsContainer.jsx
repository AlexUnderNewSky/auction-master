import MyLots from "../Components/Profile/MyLots/MyLots";
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        id: state.profile.user.userId,
    }
}

const LoginContainer = connect(mapStateToProps, {})(MyLots);

export default LoginContainer