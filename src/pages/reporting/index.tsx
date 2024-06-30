import {
  Box,
  Button,
  Card,
  CardActions,
  Grid as CardGrid,
  CardHeader,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { GetAllSuppliers } from '../../redux/features/definitionSlicer';

import { GridColDef } from '@mui/x-data-grid';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { JalaliDatePickerNew } from '../../components/date-picker/date-picker.tsx';
import Grid from '../../components/grid/grid.tsx';
import Filter from '@mui/icons-material/FilterAlt';
import FilterOff from '@mui/icons-material/FilterAltOff';
import { useDispatch, useSelector } from 'react-redux';
import gridDict from '../../dictionary/gridDict.ts';
import { Row } from './style.tsx';
import {
  DownloadLogisticsQAction,
  GetLogisticsQAction,
} from '../../redux/features/purchaseSlicer.ts';
import { Link } from 'react-router-dom';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import TuneIcon from '@mui/icons-material/Tune';
import CustomizeGrid from '../../components/CustomizeGrid/CustomizeGrid.tsx';
import useCustomCol from '../../hooks/useCustomCol.tsx';
import { purchaseColumns } from '../../utils/gridColumns.ts';
import { GetAllRepoertsAndPropsAction } from '../../redux/features/reportingSlice.ts';
import SelectComponent from '../../components/select/selects.tsx';
import AutoCompleteComponent from '../../components/AutoComplete/AutoCompleteComponent.tsx';
import { LoadingButton } from '@mui/lab';
import axiosInstance from '../../utils/axios.config.ts';
import moment from 'moment';
import translate from './translate.ts';
import store from '../../redux/store';
import { Controller, useForm } from 'react-hook-form';
const ReportMain = () => {
  const { control } = useForm<any>();
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { ReportsAndProps } = useSelector((state: any) => state.reporting);
  const [selectedReport, setSelectedReport] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { suppliers } = useSelector((state: any) => state?.definition);

  const [data, setData] = useState<any>({
    PageIndex: 1,
    PageCount: 10,
    FromDate: moment().subtract(1, 'year'),
    ToDate: moment(),
  });
  const [reportData, setReportData] = useState([]);
  const initialFilter = useRef({
    fromDate: new Date().setMonth(new Date().getMonth() - 1),
    toDate: new Date(),
  });
  const columns: GridColDef[] = [
    {
      field: 'commodityFullName',
      headerName: translate.commodityFullName,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: 'deliveryCount',
      headerName: translate.deliveryCount,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: 'deliveryDate',
      headerName: translate.deliveryDate,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
      renderCell: ({ value }) => (
        <span>{new Date(value).toLocaleDateString('fa-IR').toString()}</span>
      ),
    },
    {
      field: 'onePlacePrice',
      headerName: translate.onePlacePrice,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: 'requestCount',
      headerName: translate.requestCount,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
    },
    {
      field: 'requestRegisterDate',
      headerName: translate.requestRegisterDate,
      flex: 1,
      minWidth: 150,
      editable: false,
      filterable: false,
      renderCell: ({ value }) => (
        <span>{new Date(value).toLocaleDateString('fa-IR').toString()}</span>
      ),
    },

    {
      field: 'supplierName',
      headerName: translate.supplierName,
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: 'totalPrice',
      headerName: translate.totalPrice,
      minWidth: 150,
      sortable: false,
      filterable: false,
      flex: 1,
    },
    {
      field: 'unitCount',
      headerName: translate.unitCount,
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
    {
      field: 'usePlace',
      headerName: translate.usePlace,
      minWidth: 150,
      flex: 1,
      editable: false,
      filterable: false,
    },
  ];

  useEffect(() => {
    getList();
  }, []);
  useEffect(() => {
    getAllSupplires();
  }, []);
  const getAllSupplires = async () => {
    await dispatch(GetAllSuppliers());
  };
  const handleSortModelChange = async (sortArr) => {
    if (!sortArr.at(0)) {
      await handleSearchReports();
      return;
    }
    data.OrderBy = sortArr?.at(0).field;
    data.OrderType = sortArr?.at(0).sort;
    await handleSearchReports();
  };
  const getList = async () => {
    await dispatch(GetAllRepoertsAndPropsAction());
  };
  const handleChangeData = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSelectReport = (value) => {
    setSelectedReport(value);
  };
  const handleSearchReports = async () => {
    const curReport = ReportsAndProps.data?.find(
      (report) => report.id === selectedReport
    );
    setIsLoading(true);
    const result = await axiosInstance.post(curReport.reportAddress, {
      userId: '1',
      OrderBy: curReport.orderBy,
      OrderType: curReport.orderType,
      ...data,
    });
    setReportData(result.data?.model);
    setIsLoading(false);
  };
  const generateCustomeInput = (inp) => {
    switch (inp.propType) {
      case 'Date':
        return (
          <div>
            <JalaliDatePickerNew
              onChange={(val) => handleChangeData(inp.propName, val)}
              name={inp.propName}
              label={inp.propTitle}
              value={data[inp.propName]}
            />
          </div>
        );
      case 'string':
        return (
          <div>
            <TextField
              id={inp.propName}
              label={inp.propTitle}
              variant="outlined"
              onChange={(e) => handleChangeData(inp.propName, e.target.value)}
              value={data[inp.propName]}
            />
          </div>
        );
      case 'stringId':
        {
          if (inp.propName == 'SupplierId') {
            return (
              <div>
                <Box
                  sx={{
                    mb: 6.75,
                    display: 'flex',
                    alignItems: 'center',
                    flex: '1',
                  }}
                >
                  <Controller
                    control={control}
                    rules={{ required: ' approve state is required' }}
                    name="supporterId"
                    defaultValue={0}
                    render={({ field }) => (
                      <SelectComponent
                        label="تامین کننده"
                        valuefieldName="id"
                        labelFieldName="supplierName"
                        options={suppliers?.data}
                        field={field}
                      />
                    )}
                  />
                </Box>
              </div>
            )
          }
          return (
            <div>
              <TextField
                id={inp.propName}
                label={inp.propTitle}
                variant="outlined"
                onChange={(e) => handleChangeData(inp.propName, e.target.value)}
                value={data[inp.propName]}
              />
            </div>
          )
        };
      case 'long':
        return (
          <div>
            <TextField
              id={inp.propName}
              label={inp.propTitle}
              variant="outlined"
              type="number"
              onChange={(e) => handleChangeData(inp.propName, e.target.value)}
              value={data[inp.propName]}
            />
          </div>
        );
    }
  };
  return (
    <CardGrid
      item
      xs={12}
      sx={{
        borderRadius: 2,
        boxShadow: '0px 2px 10px 0px rgba(58, 53, 65, 0.1)',
        marginBottom: '10px',
      }}
    >
      <Card sx={{ borderRadius: 3 }} className="px-6">
        <CardHeader
          style={{ textAlign: 'right' }}
          title="گزارشات"
          titleTypographyProps={{ variant: 'h6' }}
        />

        <Box>
          <div className="w-1/2">
            <AutoCompleteComponent
              label="گزارشات"
              options={ReportsAndProps.data}
              changeHandler={handleSelectReport}
              id="reporting"
              value={selectedReport}
              dataLabel="reportTitle"
            />
          </div>
          {selectedReport && (
            <div className="grid grid-cols-3 gap-3 mt-6 gap-y-6">
              {ReportsAndProps.data
                ?.find((report) => report.id === selectedReport)
                ?.reportInputsResultModel.map((inp) => (
                  <div key={inp.propName}>{generateCustomeInput(inp)}</div>
                ))}
            </div>
          )}
        </Box>
        <CardActions className="flex justify-end">
          <LoadingButton
            color="primary"
            variant="outlined"
            onClick={handleSearchReports}
            disabled={!selectedReport}
          >
            جستجو
          </LoadingButton>
        </CardActions>
      </Card>
      <Card sx={{ borderRadius: 3 }}>
        <CardHeader
          style={{ textAlign: 'right' }}
          title={
            ReportsAndProps.data?.find((report) => report.id === selectedReport)
              ?.reportTitle
          }
          titleTypographyProps={{ variant: 'h6' }}
        />

        {columns && !!reportData.length && (
          <>
            <Grid
              columns={columns.filter((col) =>
                reportData
                  ?.map((rep) => Object.keys(rep))[0]
                  .some((rep) => rep === col.field)
              )}
              rows={
                reportData?.map((row, index) => ({ id: index, ...row })) ?? []
              }
              pagination={{ paginationModel: { pageSize: data.PageCount } }}
              onSortModelChange={handleSortModelChange}
            />
          </>
        )}
      </Card>
    </CardGrid>
  );
};
export default ReportMain;
