import styled from "styled-components";
import { Box } from "@mui/material";

function PageTileComponent(__title) {
  return (
    <div className="mb-20 mt-6 text-3xl flex justify-center">
      <p className="border border-slate-500 p-6"> {__title.__text} </p>
    </div>
  );
}



export { PageTileComponent };


