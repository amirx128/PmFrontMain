import { ReactElement } from "react";
import HomePage from "../pages/home/home";
import LoginPage from "../pages/login/login";
import ProductRequestForm from "../pages/product-request/product-request-form/product-request-form";
import Definitions from "../pages/definitions/definitions.tsx";
import Users from "../pages/users/user";
import ApproveRequestList from "../pages/support/approve/approve-list";
import FinalApproveRequestList from "../pages/support/finalApprove/finalApproveList";
import ApproveDetail from "../pages/support/approve/approve-detail";
import FinalApproveDetail from "../pages/support/finalApprove/final-approve-detail";
import Roles from "../pages/roles/roles.tsx";
import Commodities from "../pages/commodities/commodities.tsx";
import ProductDetails from "../pages/product-details/product-details.tsx";
import RequesterUser from "../pages/product/RequesterUser.tsx";
import RequestCase from "../pages/product/RequestCase.tsx";
import LogisticsQueue from "../pages/purchase/LogisticsQueue.tsx";
import LogisticsSendItems from "../pages/purchase/LogisticsSendItems.tsx";
import FinancialQueue from "../pages/purchase/FinancialQueue.tsx";
import FinancialsSendItems from "../pages/purchase/FinancialsSendItems.tsx";
import ApproveQueue from "../pages/purchase/ApproveQueue.tsx";
import ApproveSendItems from "../pages/purchase/ApproveSendItems.tsx";
import ApprovedList from "../pages/support/approved/ApprovedList.tsx";
import FinalApprovedList from "../pages/support/finalApproved/FinalApprovedList.tsx";
import SupplierQList from "../pages/supplier/SupplierQList.tsx";
import SupplierSentItemList from "../pages/supplier/SupplierSentItemList.tsx";
import WarehouseQList from "../pages/warehouse/WarehouseQList.tsx";
import WarehouseSentItemList from "../pages/warehouse/WarehouseSentItemList.tsx";
import ExitWarehouseQList from "../pages/warehouse/ExitWarehouseQList.tsx";
import ExitWarehouseSentItemList from "../pages/warehouse/ExitWarehouseSentItemList.tsx";
import LogisticsDetails from "../pages/purchase/LogisticsDetails.tsx";
import SupplierList from "../pages/users/SupplierList.tsx";
import FinancialDetails from "../pages/purchase/FinancialDetails.tsx";
import PurchaseApproveDetails from "../pages/purchase/ApproveDetials.tsx";
import CommodityTransactions from "../pages/commodities/CommodityTransactions.tsx";
import SupplierDetails from "../pages/warehouse/supplierDetails.tsx";
import WarehouseDetails from "../pages/warehouse/WarehouseDetails.tsx";
import ExitWarehouseDetails from "../pages/warehouse/ExitWarehouseDetails.tsx";
import RequesterUserDetails from "../pages/warehouse/RequesterUserDetails.tsx";
import Profile from "../pages/profile/profile.tsx";
import OriginalItemListQC from "../pages/QC/originalItem.tsx";
import AddOriginalItem from "../pages/QC/addOriginalItem.tsx";
import EditOriginalItem from "../pages/QC/editOriginalItem.tsx";
import SubItemsQCList from "../pages/QC/subItem.tsx";
import AddSubItem from "../pages/QC/addSubItem.tsx";
import EditSubItem from "../pages/QC/editSubItem.tsx";
export enum Layouts {
  AUTH = "auth",
  MAIN = "main",
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
    path: "/",
    component: <HomePage />,
    layout: Layouts.MAIN,
    protected: true,
    title: "داشبورد",
  },
  {
    path: "/profile",
    component: <Profile />,
    layout: Layouts.MAIN,
    protected: true,
    title: "در صف تحویل",
  },
  {
    path: "/users",
    component: <Users />,
    layout: Layouts.MAIN,
    protected: true,
    title: " >  کاربران",
  },
  {
    path: "/roles",
    component: <Roles />,
    layout: Layouts.MAIN,
    protected: true,
    title: " >  نقش ها",
  },
  {
    path: "/supportApprove",
    component: <ApproveRequestList />,
    layout: Layouts.MAIN,
    protected: true,
    title: " >   تایید شده ها",
  },
  {
    path: "/supportApproveDetail/:id",
    component: <ApproveDetail />,
    layout: Layouts.MAIN,
    protected: true,
    title: " >    جزئیات درخواست ",
  },
  {
    path: "/supportFinalApproveDetail/:id",
    component: <FinalApproveDetail />,
    layout: Layouts.MAIN,
    protected: true,
    title: " >    جزئیات درخواست تصویب ",
  },
  {
    path: "/product-details/:id",
    component: <ProductDetails />,
    layout: Layouts.MAIN,
    protected: true,
    title: " >    جزئیات کالا ها ",
  },
  {
    path: "/supportFinalApprove",
    component: <FinalApproveRequestList />,
    layout: Layouts.MAIN,
    protected: true,
    title: " >   تایید نهایی شده ها",
  },
  {
    path: "/productRequest",
    component: <ProductRequestForm />,
    layout: Layouts.MAIN,
    protected: true,
    title: " >  درخواست کالا",
  },
  {
    path: "/commodities",
    component: <Commodities />,
    layout: Layouts.MAIN,
    protected: true,
    title: " >  کالا ها",
  },
  {
    path: "/definitions",
    component: <Definitions />,
    layout: Layouts.MAIN,
    protected: true,
    title: " >  تعاریف",
  },
  {
    path: "/login",
    component: <LoginPage />,
    layout: Layouts.AUTH,
    protected: false,
    title: "برنامه ها",
  },
  {
    path: "/requesteruser",
    component: <RequesterUser />,
    layout: Layouts.MAIN,
    protected: true,
    title: "تحویل دریافت",
  },
  {
    path: "/requestcase-sentitem",
    component: <RequestCase />,
    layout: Layouts.MAIN,
    protected: true,
    title: "درخواست های ارسال شده",
  },
  {
    path: "/logistics/queue",
    component: <LogisticsQueue />,
    layout: Layouts.MAIN,
    protected: true,
    title: "تدارکات - در انتظار بررسی",
  },
  {
    path: "/logistics/send-items",
    component: <LogisticsSendItems />,
    layout: Layouts.MAIN,
    protected: true,
    title: "تدارکات - بررسی شده",
  },
  {
    path: "/logistics/details/:id",
    component: <LogisticsDetails />,
    layout: Layouts.MAIN,
    protected: true,
    title: "جزییات محصول",
  },
  {
    path: "/financial/details/:id",
    component: <FinancialDetails />,
    layout: Layouts.MAIN,
    protected: true,
    title: "جزییات محصول",
  },
  {
    path: "/approve/details/:id",
    component: <PurchaseApproveDetails />,
    layout: Layouts.MAIN,
    protected: true,
    title: "جزییات محصول",
  },
  {
    path: "/financials/queue",
    component: <FinancialQueue />,
    layout: Layouts.MAIN,
    protected: true,
    title: "مالی - بررسی شده",
  },
  {
    path: "/financials/send-items",
    component: <FinancialsSendItems />,
    layout: Layouts.MAIN,
    protected: true,
    title: "مالی - بررسی شده",
  },
  {
    path: "/approve/queue",
    component: <ApproveQueue />,
    layout: Layouts.MAIN,
    protected: true,
    title: "تایید خرید",
  },

  {
    path: "/approve/send-items",
    component: <ApproveSendItems />,
    layout: Layouts.MAIN,
    protected: true,
    title: "تایید شده ها",
  },
  {
    path: "/support/Approved-list",
    component: <ApprovedList />,
    layout: Layouts.MAIN,
    protected: true,
    title: "تایید شده ها",
  },
  {
    path: "/support/final-Approved-list",
    component: <FinalApprovedList />,
    layout: Layouts.MAIN,
    protected: true,
    title: "تایید نهایی شده ها",
  },
  {
    path: "/supplier/supplier-queue",
    component: <SupplierQList />,
    layout: Layouts.MAIN,
    protected: true,
    title: "در صف بررسی",
  },
  {
    path: "/supplier/supplier-sentitem",
    component: <SupplierSentItemList />,
    layout: Layouts.MAIN,
    protected: true,
    title: "در صف بررسی",
  },
  {
    path: "/supplier/details/:id",
    component: <SupplierDetails />,
    layout: Layouts.MAIN,
    protected: true,
    title: "در صف بررسی",
  },
  {
    path: "/warehosue/warehouse-queue",
    component: <WarehouseQList />,
    layout: Layouts.MAIN,
    protected: true,
    title: "در صف تحویل",
  },
  {
    path: "/warehouse/details/:id",
    component: <WarehouseDetails />,
    layout: Layouts.MAIN,
    protected: true,
    title: "در صف تحویل",
  },
  {
    path: "/exitwarehouse/details/:id",
    component: <ExitWarehouseDetails />,
    layout: Layouts.MAIN,
    protected: true,
    title: "در صف تحویل",
  },
  {
    path: "/requesterUser/details/:id",
    component: <RequesterUserDetails />,
    layout: Layouts.MAIN,
    protected: true,
    title: "در صف تحویل",
  },
  {
    path: "/warehosue/warehouse-sentitems",
    component: <WarehouseSentItemList />,
    layout: Layouts.MAIN,
    protected: true,
    title: "تحویل گرفته شده",
  },
  {
    path: "/warehosue/exitwarehouse-queue",
    component: <ExitWarehouseQList />,
    layout: Layouts.MAIN,
    protected: true,
    title: "در صف خروج",
  },
  {
    path: "/warehosue/exitwarehouse-sentitems",
    component: <ExitWarehouseSentItemList />,
    layout: Layouts.MAIN,
    protected: true,
    title: "خارج شده",
  },
  {
    path: "/supplier-list",
    component: <SupplierList />,
    layout: Layouts.MAIN,
    protected: true,
    title: "خارج شده",
  },
  {
    path: "/CommodityTransactions/:id",
    component: <CommodityTransactions />,
    layout: Layouts.MAIN,
    protected: true,
    title: "خارج شده",
  },
  //////////QC
  {
    path: "/qc/originalItems",
    component: <OriginalItemListQC />,
    layout: Layouts.MAIN,
    protected: true,
    title: "کنترل کیفیت",
  },
  {
    path: "/qc/originalItems/add",
    component: <AddOriginalItem />,
    layout: Layouts.MAIN,
    protected: true,
    title: "کنترل کیفیت",
  },
  {
    path: "/qc/originalItems/edit/:id",
    component: <EditOriginalItem />,
    layout: Layouts.MAIN,
    protected: true,
    title: "کنترل کیفیت",
  },
  ///////////////////
  {
    path: "/qc/subItems",
    component: <SubItemsQCList />,
    layout: Layouts.MAIN,
    protected: true,
    title: "کنترل کیفیت",
  },
  {
    path: "/qc/subItems/add",
    component: <AddSubItem />,
    layout: Layouts.MAIN,
    protected: true,
    title: "کنترل کیفیت",
  },
  {
    path: "/qc/subItems/edit/:id",
    component: <EditSubItem />,
    layout: Layouts.MAIN,
    protected: true,
    title: "کنترل کیفیت",
  },
];
