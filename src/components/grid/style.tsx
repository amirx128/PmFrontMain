import { styled } from "styled-components";

const GridWrapper =
    styled('div')<any>(({ theme }) => ({
        marginTop:'20px',
        '.muirtl-wop1k0-MuiDataGrid-footerContainer, .muirtl-jdgsj4-MuiDataGrid-root': {
            borderColor: 'transparent !important'
        },
        '.MuiDataGrid-columnHeaders': {
            backgroundColor: `${theme.palette.grey['100']} !important`
        },
        '.MuiDataGrid-columnHeaderTitle':{
            fontFamily:'IRANSans !important'
        }
    }))

export { GridWrapper }