declare module "react-stockcharts";
declare module "react-stockcharts/lib/axes";
declare module "react-stockcharts/lib/scale";
declare module "react-stockcharts/lib/helper";
declare module "react-gauge-chart";
declare module "react-stockcharts/lib/utils";
declare module "react-stockcharts/lib/series";
declare module "nprogress";

declare namespace NodeJS {
  interface ProcessEnv {
    COINRANKING_API_KEY: string;
    NEXT_PUBLIC_TAAPI_API_KEY: string;
  }
}
