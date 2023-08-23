import {Box, Button, Dialog, DialogContent, DialogTitle, Grid, ListItemText, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useState} from "react";
import {
    clearSelectedCommodity,
    GetAllBusinessRoles,
    GetAllCommodities,
    GetAllCommodityOnTree,
    GetAllPleaseOfUse,
    GetAllProducers,
    GetAllSuppliers, GetOneCommodityDetails
} from "../../redux/features/definitionSlicer.ts";
import {Add, AddBox, BorderColor, Inventory} from "@mui/icons-material";
import {AddCommodity} from "../../components/definition/addCommodity.tsx";
import {CommodityCard} from "../../components/definition/commodity.tsx";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TreeItem from "@mui/lab/TreeItem";
import {makeTree} from "../../utils/tree.ts";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import TreeView from "@mui/lab/TreeView";

const Commodities = () => {
    const dispatch = useDispatch<any>();
    const {
        commodities,
        commoditiesOnTree
    } = useSelector((state: any) => state.definition);

    const [addCommodityDialog, setAddCommodityDialog] = useState<boolean>(false);
    const [selectedCommodity, setSelectedCommodity] = useState(null);

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

    useEffect(() => {
        if(selectedCommodity?.id) {
            dispatch(GetOneCommodityDetails(selectedCommodity?.id));
        }
    }, [selectedCommodity]);

    useEffect(() => {
        if(!addCommodityDialog){
            //@ts-ignore
            dispatch(clearSelectedCommodity());
        }
    }, [addCommodityDialog]);


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
    }, [term,commoditiesOnTree]);

    const [showActionDialog,setShowActionDialog] = useState(null);
    const [parent,setParent] = useState(null);


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
                    <Box sx={{textAlign:"left"}}>
                        <TreeView onNodeSelect={(event, nodeIds) => {
                            setShowActionDialog(nodeIds);
                        }} expanded={Object.values(commoditiesOnTree?.data).map((item:any) => item?.id?.toString())}
                                  defaultCollapseIcon={<ExpandMoreIcon/>}
                                  defaultExpandIcon={<ChevronLeftIcon/>}
                                  sx={{flexGrow: 1}}>
                            {
                                commoditiesOnTree?.data?.length && getTreeDate()
                            }
                        </TreeView>
                    </Box>
                </Box>
            </Grid>
            <AddCommodity addCommodityDialog={addCommodityDialog} parent={parent} onClose={commodityOnClose}/>
            <Dialog maxWidth={"xs"} fullWidth={true} open={!!showActionDialog} onClose={() => setShowActionDialog(null)}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {
                            setParent(showActionDialog);
                            setShowActionDialog(null);
                            setAddCommodityDialog(true);
                        }}>
                            <ListItemIcon>
                                <AddBox />
                            </ListItemIcon>
                            <ListItemText primary="افزودن" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem onClick={() => {
                        setParent(null);
                        let find = commodities?.data?.filter(item => item?.id == showActionDialog);
                        if(find){
                            setSelectedCommodity(find[0]);
                            setShowActionDialog(null);
                            setAddCommodityDialog(true);
                        }
                    }} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <BorderColor />
                            </ListItemIcon>
                            <ListItemText primary="ویرایش" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Dialog>
        </Grid>
    );
};
export default Commodities;
