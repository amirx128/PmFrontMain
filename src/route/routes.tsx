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
];
