import React from "react";
import { MobileView, BrowserView } from "react-device-detect"
import SearchForm from "./SearchForm";
import ArchiveDelete from "./ArchiveDelete";
import SimpleFilters from "./SimpleFilters";

const HeaderList = () => (
  <>
    <MobileView>
      <div className="d-flex flex-column align-items-center">
        <div className="p2 col-example d-flex flex-row pb-3">
          <SearchForm />
        </div>
      </div>
      <div className="d-flex flex-row pb-2 justify-content-between">
        <div className="p2 col-example d-flex flex-row">
          <ArchiveDelete />
        </div>
        <div className="p2 mb-1 col-example d-flex flex-row">
          <SimpleFilters classname="mr-1" />
        </div>
      </div>
    </MobileView>
    <BrowserView>
      <div className="d-flex flex-column flex-lg-row flex-xl-row align-items-center justify-content-between">
        <div className="p2 col-example d-flex flex-row mb-3">
          <ArchiveDelete />
        </div>
        <div className="p2 d-flex flex-column flex-md-row pb-3">
          <div>
            <SimpleFilters classname="mr-1 d-flex flex-row mb-1"/>
          </div>
          <div>
            <SearchForm />
          </div>
        </div>
      </div>
    </BrowserView>
  </>
);

export default HeaderList;
