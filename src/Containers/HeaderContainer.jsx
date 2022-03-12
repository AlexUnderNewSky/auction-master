import Header from "../Components/Header/Header";
import {connect} from 'react-redux';
import {setUser} from '../Redux/profileReducer'

const mapStateToProps = (state) => {
    return {
        nickname: state.profile.user.nickname,
    }
}

const HeaderContainer = connect(mapStateToProps, {setUser})(Header);

export default HeaderContainer