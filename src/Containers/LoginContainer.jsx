import Login from "../Components/LogIn/LogIn";
import {connect} from 'react-redux';
import {setUser} from "../Redux/profileReducer";


const mapStateToProps = (state) => {
    return {

    }
}

const LoginContainer = connect(mapStateToProps, {setUser})(Login);

export default LoginContainer