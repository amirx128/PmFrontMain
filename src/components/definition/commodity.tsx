import {Box, Button, Grid, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import {useCallback, useEffect} from "react";
import {makeTree} from "../../utils/tree.ts";

export const CommodityCard = ({commodity, setSelectedCommodity,setAddCommodityDialog}) => {

    const generateTree = (item,isTree:boolean=true) => {
        if (item?.children && isTree) {
            return (
                <TreeItem sx={{color: "rgb(62, 104, 168)"}} nodeId={item?.id} label={item?.serchableName}>
                    {item?.children?.map(subItem => generateTree(subItem))}
                </TreeItem>
            );
        } else {
            return <TreeItem sx={{color: "rgb(62, 104, 168)"}} nodeId={item?.id} label={item?.serchableName}/>;
        }
    }

    const getTreeDate = useCallback(() => {
        return makeTree(Object.values(commodity?.parents)).items.map(item => generateTree(item));
    }, [commodity]);

    return (
        <Grid item sm={6} xs={12}>
            <Box sx={{
                width: "100%",
                height: "100%",
                border: "2px solid #607D8B",
                borderRadius: 2,
                p: 1
            }}>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography variant={"subtitle1"}>{commodity?.serchableName}</Typography>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography sx={{whiteSpace:"nowrap"}} variant={"subtitle1"}>واحد :</Typography>
                    <Typography variant={"subtitle1"}  sx={theme => ({color: theme.palette.secondary.dark})}>{commodity?.unit}</Typography>
                </Box>
                <Box display={"flex"} flexDirection={"column"} alignItems={"flex-start"}>
                    <Typography sx={{whiteSpace:"nowrap"}} variant={"subtitle1"}>زیر شاخه : </Typography>
                    <Box>
                        <TreeView
                            defaultCollapseIcon={<ExpandMoreIcon/>}
                            defaultExpandIcon={<ChevronLeftIcon/>}
                            expanded={Object.values(commodity?.parents).map((item:any) => item?.id)}
                            sx={{flexGrow: 1}}>
                            {
                                commodity?.parents?.length && getTreeDate()
                            }
                        </TreeView>
                    </Box>
                </Box>
                <Divider sx={{my:1}} />
                <Button color={"warning"} variant={"contained"} fullWidth={true} onClick={() => {
                    setSelectedCommodity(commodity);
                    setAddCommodityDialog(true);
                }}>
                    ویرایش
                </Button>
            </Box>
        </Grid>
    )
}