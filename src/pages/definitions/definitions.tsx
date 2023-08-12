import {Grid as CardGrid} from "@mui/material";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getAllProjects} from "../../redux/features/definitionSlicer.ts";
import {toast} from "react-toastify";

const Definitions = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProjects());
    }, [])
    return (
        <CardGrid
            item
            xs={12}
            sx={{
                borderRadius: 2,
                boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.1)",
                marginBottom: "10px",
            }}
        >
            sss
        </CardGrid>
    );
};
export default Definitions;
