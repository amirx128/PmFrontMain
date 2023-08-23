import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    Grid,
    InputAdornment,
    ListItemText,
    TextField,
    Typography
} from "@mui/material";
import Divider from "@mui/material/Divider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import {useCallback, useEffect, useState} from "react";
import {makeTree} from "../../utils/tree.ts";
import {Search} from "@mui/icons-material";
import {useSelector} from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

export const CommodityCard = ({commodity, setSelectedCommodity,setAddCommodityDialog}) => {
    const {
        commoditiesOnTree,
    } = useSelector((state: any) => state.definition);

    const [term,setTerm] = useState('');
    const generateTree = (item,isTree:boolean=true) => {
        if (item?.children && isTree) {
            return (
                <TreeItem key={item?.id} sx={{color: "rgb(62, 104, 168)"}} nodeId={item?.id?.toString()} label={item?.serchableName}>
                    {item?.children?.map(subItem => generateTree(subItem))}
                </TreeItem>
            );
        } else {
            return <TreeItem key={item?.id} sx={{color: "rgb(62, 104, 168)"}} nodeId={item?.id?.toString()} label={item?.serchableName}/>;
        }
    }

    const getTreeDate = useCallback(() => {
        let datas = commoditiesOnTree?.data?.filter(item => item?.serchableName?.includes(term));
        let theTree = makeTree(datas);
        if(datas?.length > 1 && (theTree?.items?.length && theTree?.items[0]?.children)){
            return makeTree(datas).items.map(item => generateTree(item));
        }else {
            return datas.map(item => generateTree(item,false));
        }
    }, [term]);



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
                    <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",width: "100%"}}>
                        <Typography sx={{whiteSpace:"nowrap"}} variant={"subtitle1"}>زیر شاخه </Typography>
                        <TextField size={"small"}  value={term} onChange={(e) => setTerm(e.target?.value)} placeholder={'جستجو'} sx={{my:1,maxWidth: "150px"}}/>
                    </Box>
                    <TreeView defaultSelected={[commodity?.id?.toString()]} expanded={Object.values(commodity?.parents).map((item:any) => item?.id?.toString())}
                              defaultCollapseIcon={<ExpandMoreIcon/>}
                              defaultExpandIcon={<ChevronLeftIcon/>}
                              sx={{flexGrow: 1}}>
                        {
                            commoditiesOnTree?.data?.length && getTreeDate()
                        }
                    </TreeView>
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