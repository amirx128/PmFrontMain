import {Box, Button, Grid, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
    GetAllBusinessRoles,
    GetAllCommodities,
    GetAllCommodityOnTree,
    GetAllPleaseOfUse,
    GetAllProducers,
    GetAllSuppliers
} from "../../redux/features/definitionSlicer.ts";
import {Add, Inventory} from "@mui/icons-material";
import {AddCommodity} from "../../components/definition/addCommodity.tsx";
import {CommodityCard} from "../../components/definition/commodity.tsx";

const Commodities = () => {
    const dispatch = useDispatch<any>();
    const {
        commodities
    } = useSelector((state: any) => state.definition);

    const [addCommodityDialog, setAddCommodityDialog] = useState<boolean>(false);

    useEffect(() => {
        // @ts-ignore
        dispatch(GetAllCommodities());
        // @ts-ignore
        dispatch(GetAllBusinessRoles())
        // @ts-ignore
        dispatch(GetAllProducers())
        // @ts-ignore
        dispatch(GetAllSuppliers())
        // @ts-ignore
        dispatch(GetAllPleaseOfUse())
        dispatch(GetAllCommodityOnTree({
            commodityName: '',
            code: '',
            projectId: undefined
        }))
    }, [dispatch])

    const commodityOnClose = () => {
        setAddCommodityDialog(false);
    };
    return (
        <Grid
            container
        >
            <Grid item xs={12}>
                <Box sx={{
                    borderRadius: 2,
                    boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.1)",
                    p: 2,
                    width: "100%",
                    mb: 2
                }}>
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mb={1}>
                        <Typography sx={{display: "flex", alignItems: "center", mb: 1}}>
                            <Inventory/>
                            کالا ها
                        </Typography>

                        <Button size={"small"} startIcon={<Add/>} variant={"outlined"} color={"secondary"}
                                onClick={() => setAddCommodityDialog(true)}>
                            افزودن
                        </Button>
                    </Box>
                    <Grid container spacing={1}>
                        {
                            commodities?.data?.length > 0 ? commodities?.data?.map(commodity =>
                                <CommodityCard commodity={commodity} addCommodityDialog={addCommodityDialog}
                                               key={commodity?.id}/>) : (
                                <Typography>اطلاعاتی برای نمایش وجود ندارد</Typography>)
                        }
                    </Grid>
                </Box>
            </Grid>
            <AddCommodity addCommodityDialog={addCommodityDialog} onClose={commodityOnClose}/>
        </Grid>
    );
};
export default Commodities;
