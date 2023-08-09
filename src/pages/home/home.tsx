import {useSelector} from "react-redux";

const HomePage=()=>{
    const {user} = useSelector((state) => state.user)
    return (
        <h1>{user?.firstName}</h1>
    )
}
export default HomePage