import MyBets from "../Components/Profile/MyBets/MyBets";
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        betList: state.profile.user.betList,
        id: state.profile.user.userId,
    }
}

const LoginContainer = connect(mapStateToProps, {})(MyBets);

export default LoginContainer