import { ReactElement } from 'react';
import HomePage from '../pages/home/home';
import LoginPage from '../pages/login/login';
import ProductRequestForm from '../pages/product-request/product-request-form/product-request-form';
import Definitions from '../pages/definitions/definitions.tsx';
import Users from '../pages/users/user';
import ApproveRequestList from '../pages/support/approve/approve-list';
import FinalApproveRequestList from '../pages/support/finalApprove/finalApproveList';
import ApproveDetail from '../pages/support/approve/approve-detail';
import FinalApproveDetail from '../pages/support/finalApprove/final-approve-detail';
import Roles from '../pages/roles/roles.tsx';
import Commodities from '../pages/commodities/commodities.tsx';
import ProductDetails from '../pages/product-details/product-details.tsx';
import RequesterUser from '../pages/product/RequesterUser.tsx';
import RequestCase from '../pages/product/RequestCase.tsx';
import LogisticsQueue from '../pages/purchase/LogisticsQueue.tsx';
import LogisticsSendItems from '../pages/purchase/LogisticsSendItems.tsx';
import FinancialQueue from '../pages/purchase/FinancialQueue.tsx';
import FinancialsSendItems from '../pages/purchase/FinancialsSendItems.tsx';
import ApproveQueue from '../pages/purchase/ApproveQueue.tsx';
import ApproveSendItems from '../pages/purchase/ApproveSendItems.tsx';
import ApprovedList from '../pages/support/approved/ApprovedList.tsx';
import FinalApprovedList from '../pages/support/finalApproved/FinalApprovedList.tsx';
import SupplierQList from '../pages/supplier/SupplierQList.tsx';
import SupplierSentItemList from '../pages/supplier/SupplierSentItemList.tsx';
import WarehouseQList from '../pages/warehouse/WarehouseQList.tsx';
import WarehouseSentItemList from '../pages/warehouse/WarehouseSentItemList.tsx';
import ExitWarehouseQList from '../pages/warehouse/ExitWarehouseQList.tsx';
import ExitWarehouseSentItemList from '../pages/warehouse/ExitWarehouseSentItemList.tsx';
import LogisticsDetails from '../pages/purchase/LogisticsDetails.tsx';
import SupplierList from '../pages/users/SupplierList.tsx';
import FinancialDetails from '../pages/purchase/FinancialDetails.tsx';
import PurchaseApproveDetails from '../pages/purchase/ApproveDetials.tsx';
import CommodityTransactions from '../pages/commodities/CommodityTransactions.tsx';
import SupplierDetails from '../pages/warehouse/supplierDetails.tsx';
import WarehouseDetails from '../pages/warehouse/WarehouseDetails.tsx';
import ExitWarehouseDetails from '../pages/warehouse/ExitWarehouseDetails.tsx';
import RequesterUserDetails from '../pages/warehouse/RequesterUserDetails.tsx';
import Profile from '../pages/profile/profile.tsx';
import OriginalItemListQC from '../pages/QC/originalItem.tsx';
import AddOriginalItem from '../pages/QC/addOriginalItem.tsx';
import EditOriginalItem from '../pages/QC/editOriginalItem.tsx';
import SubItemsQCList from '../pages/QC/subItem.tsx';
import AddSubItem from '../pages/QC/addSubItem.tsx';
import EditSubItem from '../pages/QC/editSubItem.tsx';
import UsabilitiesListQC from '../pages/QC/usabilities.tsx';
import AddUsability from '../pages/QC/addUsability.tsx';
import EditUsability from '../pages/QC/editUsability.tsx';
import ChecklistsListQC from '../pages/QC/checkLists.tsx';
import AddCheckListItem from '../pages/QC/addCheckList.tsx';
import EditCheckListItem from '../pages/QC/editCheckList.tsx';
import PurchaseForm from '../pages/purchase/PurchaseForm.tsx';
import WarhouseForm from '../pages/warehouse/WarhouseForm.tsx';
import CheckListInstancesList from '../pages/QC/checkListInstances.tsx';
import AddCheckListInstance from '../pages/QC/addCheckListInstance.tsx';
import EditCheckListInstance from '../pages/QC/editCheckListInstanceItem.tsx';
import QcGrid from '../components/qc-grid-pages/qcGrid.tsx';
import QcDetails from '../components/qc-grid-pages/qcDetails.tsx';
import CheckListInstancesListDuplicate from '../pages/QC/checkListInstancesDuplicate.tsx';
import QcEntryCheckList from '../components/qc-grid-pages/qcEntryChecklist.tsx';
import RequestCaseEdit from '../pages/product/RequestCaseEdit.tsx';
import ReportMain from '../pages/reporting/index.tsx';
export enum Layouts {
  AUTH = 'auth',
  MAIN = 'main',
}
export interface IRoute {
  path: string;
  component: ReactElement<any>;
  layout: Layouts;
  protected: boolean;
  title: string;
}
export const routes: IRoute[] = [
  {
    path: '/',
    component: <HomePage />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'داشبورد',
  },
  {
    path: '/profile',
    component: <Profile />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'پروفایل کاربری',
  },
  {
    path: '/users',
    component: <Users />,
    layout: Layouts.MAIN,
    protected: true,
    title: ' مدیریت کاربران',
  },
  {
    path: '/roles',
    component: <Roles />,
    layout: Layouts.MAIN,
    protected: true,
    title: ' >  نقش ها',
  },
  {
    path: '/supportApprove',
    component: <ApproveRequestList />,
    layout: Layouts.MAIN,
    protected: true,
    title: ' >   تایید شدیبیبه ها',
  },
  {
    path: '/supportApproveDetail/:id',
    component: <ApproveDetail />,
    layout: Layouts.MAIN,
    protected: true,
    title: '  تایید درخواست کالا',
  },
  {
    path: '/supportFinalApproveDetail/:id',
    component: <FinalApproveDetail />,
    layout: Layouts.MAIN,
    protected: true,
    title: ' تایید نهایی / تصویب درخواست کالا',
  },
  {
    path: '/product-details/:id',
    component: <ProductDetails />,
    layout: Layouts.MAIN,
    protected: true,
    title: ' جزئیات درخواست کالا',
  },
  {
    path: '/supportFinalApprove',
    component: <FinalApproveRequestList />,
    layout: Layouts.MAIN,
    protected: true,
    title: ' لیست انتظار تصویب درخواست کالا',
  },
  {
    path: '/productRequest',
    component: <ProductRequestForm />,
    layout: Layouts.MAIN,
    protected: true,
    title: '  ثبت درخواست جدید کالا',
  },
  {
    path: '/commodities',
    component: <Commodities />,
    layout: Layouts.MAIN,
    protected: true,
    title: '  مدیریت کالا',
  },
  {
    path: '/definitions',
    component: <Definitions />,
    layout: Layouts.MAIN,
    protected: true,
    title: ' تعاریف پایه',
  },
  {
    path: '/login',
    component: <LoginPage />,
    layout: Layouts.AUTH,
    protected: false,
    title: ' ورود',
  },
  {
    path: '/requesteruser',
    component: <RequesterUser />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'تحویل دریافت',
  },
  {
    path: '/requestcase-sentitem',
    component: <RequestCase />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'درخواست های ارسال شده',
  },
  {
    path: '/logistics/queue',
    component: <LogisticsQueue />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'تدارکات - در انتظار بررسی',
  },
  {
    path: '/logistics/send-items',
    component: <LogisticsSendItems />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'تدارکات - بررسی شده',
  },
  {
    path: '/logistics/details/:id',
    component: <LogisticsDetails />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'تدارکات خرید',
  },
  {
    path: '/financial/details/:id',
    component: <FinancialDetails />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'بررسی مالی خرید  ',
  },
  {
    path: '/approve/details/:id',
    component: <PurchaseApproveDetails />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'دستور خرید ',
  },
  {
    path: '/financials/queue',
    component: <FinancialQueue />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'مالی - بررسی شده',
  },
  {
    path: '/financials/send-items',
    component: <FinancialsSendItems />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'مالی - بررسی شده',
  },
  {
    path: '/approve/queue',
    component: <ApproveQueue />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'تایید خرید',
  },

  {
    path: '/approve/send-items',
    component: <ApproveSendItems />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'تایید شده ها',
  },
  {
    path: '/support/Approved-list',
    component: <ApprovedList />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'تایید شده ها',
  },
  {
    path: '/support/final-Approved-list',
    component: <FinalApprovedList />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'درخواست های تصویب شده کالا',
  },
  {
    path: '/supplier/supplier-queue',
    component: <SupplierQList />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'در صف بررسی',
  },
  {
    path: '/supplier/supplier-sentitem',
    component: <SupplierSentItemList />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'در صف بررسی',
  },
  {
    path: '/supplier/details/:id',
    component: <SupplierDetails />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'در صف بررسی',
  },
  {
    path: '/warehosue/warehouse-queue',
    component: <WarehouseQList />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'در صف تحویل',
  },
  {
    path: '/warehouse/details/:id',
    component: <WarehouseDetails />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'تحویل انبار',
  },
  {
    path: '/exitwarehouse/details/:id',
    component: <ExitWarehouseDetails />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'خروج از انبار',
  },
  {
    path: '/requesterUser/details/:id',
    component: <RequesterUserDetails />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'در صف تحویل',
  },
  {
    path: '/purchase/details/:id',
    component: <PurchaseForm />,
    layout: Layouts.MAIN,
    protected: true,
    title: ' حواله خرید',
  },
  {
    path: '/warehosue/warehouse-sentitems',
    component: <WarehouseSentItemList />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'تحویل گرفته شده',
  },
  {
    path: '/warehosue/exitwarehouse-queue',
    component: <ExitWarehouseQList />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'در صف خروج',
  },
  {
    path: '/warehosue/exitwarehouse-sentitems',
    component: <ExitWarehouseSentItemList />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'خارج شده',
  },
  {
    path: '/warehouse/detail/:id',
    component: <WarhouseForm />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'حواله ورود به انبار',
  },
  {
    path: '/exitWarehosue/detail/:id',
    component: <WarhouseForm mode="exitWarehouse" />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'خارج شده',
  },
  {
    path: '/supplier-list',
    component: <SupplierList />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'تامین کننده گان',
  },
  {
    path: '/CommodityTransactions/:id',
    component: <CommodityTransactions />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'تراکنش های کالا',
  },
  //////////QC
  {
    path: '/qc/originalItems',
    component: <OriginalItemListQC />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  {
    path: '/qc/originalItems/add',
    component: <AddOriginalItem />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  {
    path: '/qc/originalItems/edit/:id',
    component: <EditOriginalItem />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  ///////////////////
  {
    path: '/qc/subItems',
    component: <SubItemsQCList />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  {
    path: '/qc/subItems/add',
    component: <AddSubItem />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  {
    path: '/qc/subItems/edit/:id',
    component: <EditSubItem />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },

  /////////////////////
  {
    path: '/qc/defineUsability',
    component: <UsabilitiesListQC />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  {
    path: '/qc/defineUsability/add',
    component: <AddUsability />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  {
    path: '/qc/defineUsability/edit/:id',
    component: <EditUsability />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  ///////////////////////
  {
    path: '/qc/checkLists',
    component: <ChecklistsListQC />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  {
    path: '/qc/checkLists/add',
    component: <AddCheckListItem />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  {
    path: '/qc/checkLists/edit/:id',
    component: <EditCheckListItem />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  {
    path: '/qc/checkListInstances',
    component: <CheckListInstancesList />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  {
    path: '/qc/checkListInstancesDuplicate',
    component: <CheckListInstancesListDuplicate />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  {
    path: '/qc/checkListInstances/add',
    component: <AddCheckListInstance />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  {
    path: '/qc/checkListInstances/edit/:id',
    component: <EditCheckListInstance />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  //////////////////////////////
  {
    path: '/qc/ContractorAddDate',
    component: <QcGrid mode="contractor-add-date" key="contractor-add-date" />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  {
    path: '/qc/ContractorAddDate/edit/:id',
    component: <QcDetails mode="contractor" />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  {
    path: '/qc/ContractorAddDateSentItem',
    component: (
      <QcGrid
        mode="contractor-add-date-sent-item"
        key="contractor-add-date-sent-item"
      />
    ),
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  {
    path: '/qc/ContractorAddDateSentItem/edit/:id',
    component: <QcDetails mode="contractor" />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  /////////////////////////////////
  {
    path: '/qc/technialApprove',
    component: <QcGrid mode="technical-approve" key="technical-approve" />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  {
    path: '/qc/technialApprove/edit/:id',
    component: <QcDetails mode="technical" />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  {
    path: '/qc/technialApproveSentItem',
    component: <QcGrid mode="technical-sent-item" key="technical-sent-item" />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  {
    path: '/qc/technialApproveSentItem/edit/:id',
    component: <QcDetails mode="technical" />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  /////////////////////////////////
  {
    path: '/qc/qcDate',
    component: <QcGrid mode="qc-date" key="qc-date" />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  {
    path: '/qc/qcDate/edit/:id',
    component: <QcDetails mode="qc" />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  {
    path: '/qc/qcDateSentItem',
    component: <QcGrid mode="qc-date-sent-item" key="qc-date-sent-item" />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  {
    path: '/qc/qcDateSentItem/edit/:id',
    component: <QcDetails mode="qc" />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  /////////////////////////////////
  {
    path: '/qc/controlCheckList',
    component: <QcGrid mode="control-checklist" key="control-checklist" />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  {
    path: '/qc/controlCheckList/edit/:id',
    component: <QcDetails mode="control-checklist" />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  {
    path: '/qc/controlCheckListSentItem',
    component: (
      <QcGrid
        mode="control-checklist-sent-item"
        key="control-checklist-sent-item"
      />
    ),
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  {
    path: '/qc/controlCheckListSentItem/edit/:id',
    component: <QcDetails mode="control-checklist" />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  /////////////////////////////////
  {
    path: '/qc/managerControlCheckList',
    component: (
      <QcGrid
        mode="manager-control-checklist"
        key="manager-control-checklist"
      />
    ),
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  {
    path: '/qc/managerControlCheckList/edit/:id',
    component: <QcDetails mode="manager-control-checklist" />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  {
    path: '/qc/managerControlCheckListSentItem',
    component: (
      <QcGrid
        mode="manager-control-checklist-sent-item"
        key="manager-control-checklist-sent-item"
      />
    ),
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  {
    path: '/qc/managerControlCheckListSentItem/edit/:id',
    component: <QcDetails mode="manager-control-checklist" />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  /////////////////////////////////
  {
    path: '/qc/finalControlCheckList',
    component: (
      <QcGrid mode="final-control-checklist" key="final-control-checklist" />
    ),
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  {
    path: '/qc/finalControlCheckList/edit/:id',
    component: <QcDetails mode="final-control-checklist" />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  {
    path: '/qc/finalControlCheckListSentItem',
    component: (
      <QcGrid
        mode="final-control-checklist-sent-item"
        key="final-control-checklist-sent-item"
      />
    ),
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  {
    path: '/qc/finalControlCheckListSentItem/edit/:id',
    component: <QcDetails mode="final-control-checklist" />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  /////////////////////////////////
  /////////////////////////////////
  {
    path: '/qc/technicalOffice',
    component: <QcGrid mode="technical-office" key="technical-office" />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  {
    path: '/qc/technicalOfficeSentItem',
    component: (
      <QcGrid
        mode="technical-office-sent-item"
        key="technical-office-sent-item"
      />
    ),
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },

  /////////////////////////////////
  /////////////////////////////////
  {
    path: '/qc/contractorSetIsDone',
    component: (
      <QcGrid mode="contractor-set-is-done" key="contractor-set-is-done" />
    ),
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  {
    path: '/qc/contractorSetIsDoneSentItem',
    component: (
      <QcGrid
        mode="contractor-set-is-done-sent-item"
        key="contractor-set-is-done-sent-item"
      />
    ),
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  /////////////////////////////////
  {
    path: '/qc/entryCheckList',
    component: <QcGrid mode="entry-checklist" key="entry-checklist" />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  {
    path: '/qc/entryCheckListSentItem',
    component: (
      <QcGrid
        mode="entry-checklist-sent-item"
        key="entry-checklist-sent-item"
      />
    ),
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  ///////////////////////////////
  {
    path: '/qc/entryChecklist/:id/:mode',
    component: <QcEntryCheckList />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },
  /////////////////////////////
  {
    path: '/requestcase-sentitem/edit/:id',
    component: <RequestCaseEdit />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'کنترل کیفیت',
  },

  //////////////////////////////////
  {
    path: '/reporting',
    component: <ReportMain />,
    layout: Layouts.MAIN,
    protected: true,
    title: 'گزارشات',
  },
];
