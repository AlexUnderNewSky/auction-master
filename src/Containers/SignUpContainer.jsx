    import {connect} from 'react-redux';
import SignUp from "../Components/LogIn/SignUp";
import {setUser} from "../Redux/profileReducer";

const mapStateToProps = (state) => {
    return {

    }
}

const SignUpContainer = connect(mapStateToProps, {setUser})(SignUp);

export default SignUpContainer