import { PageTileComponent } from '../style';

import { Card, Divider, CardHeader, IconButton } from '@mui/material';
import axios from '../../utils/axios.config.ts';
import { useEffect, useState } from 'react';
import RequestDetail from '../support/request-detail.tsx';
import { useTheme } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { withSnackbar } from '../../utils/snackbar-hook';
import { useSelector } from 'react-redux';
import { getUserIdFromStorage } from '../../utils/functions.ts';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '../../components/grid/grid';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import PrintIcon from '@mui/icons-material/Print';

import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
const ProductDetails = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState(undefined);
  const [commodities, setCommodities] = useState(undefined);

  const { user } = useSelector((state: any) => state?.user);
  useEffect(() => {
    if (!id) {
      navigate('/');
    }
    getRequestDetail();
  }, []);

  const getRequestDetail = async () => {
    try {
      const response = await axios.post('/Support/GetRequestDetails', {
        userId: user?.id ?? getUserIdFromStorage(),
        requestId: id,
      });
      setDetail(response.data.model);
      setCommodities(response.data.model.commodities);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const columns: GridColDef[] = [
    {
      field: 'commodity',
      headerName: 'نام کالا',
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'requiredDate',
      headerName: 'تاریخ نیاز',
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ value }) => (
        <span>{new Date(value).toLocaleDateString('fa-IR').toString()}</span>
      ),
    },
    {
      field: 'count',
      headerName: 'تعداد مورد نیاز',
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'newcount',
      headerName: 'تعداد تایید شده ',
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ value }) => <p>{value || 0}</p>,
    },
    {
      field: 'approveState',
      headerName: ' وضعیت تایید ',
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
      align: 'center',
      headerAlign: 'center',
    },

    {
      field: 'actions',
      headerName: 'عملیات',
      description: 'ActionColumn',
      sortable: false,
      minWidth: 150,
      flex: 1,
      filterable: false,
      hideSortIcons: true,
      type: 'actions',
      cellClassName: 'actions',
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            color="inherit"
          />
        </>
      ),
    },
  ];
  const handleDownloadPDF = async () => {
    await axios.post(
      '/Support/PrintRequestDetails',
      {
        userId: user?.id ?? getUserIdFromStorage(),
        requestId: id,
      },
      {
        responseType: 'arraybuffer',
      }
    );
  };
  return (
    <Card>
      <PageTileComponent __text={document.title} />

      <RequestDetail detail={detail} />
      <Divider sx={{ marginTop: 6.5, marginBottom: 2 }} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <CardHeader
          style={{ textAlign: 'right' }}
          title="لیست کالا ها"
          titleTypographyProps={{ variant: 'h6' }}
        />
        <IconButton
          color="success"
          onClick={handleDownloadPDF}
          sx={{
            mr: 10,
          }}
        >
          <PrintIcon />
        </IconButton>
      </div>
      {commodities && (
        <Grid
          rowIdFields={['requestCaseRowCommodityId']}
          columns={columns}
          rows={commodities.map((row, index) => ({ id: index, ...row }))}
          pagination={{}}
        ></Grid>
      )}
    </Card>
  );
};
export default withSnackbar(ProductDetails);
