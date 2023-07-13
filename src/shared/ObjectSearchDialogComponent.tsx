import CustomDialogComponent from "index/components/common/CustomDialogComponent";
import * as React from "react";
import ObjectSearchComponent from "./ObjectSearch";

interface ObjectSearchDialogComponentProps {
  onClose: Function;
  tableName: string;
  title: string;
  variant?: "lg" | "md" | "sm" | "xl" | "xs";
  data?: {
    isFinistedProducts?: boolean;
    showListDropDown?: boolean;
    disableList?: boolean;
    filterByList?: boolean;
    selectedType?: string;
    methodListName?: string;
    autoLoad?: boolean;
  };
}

const ObjectSearchDialogComponent: React.FunctionComponent<
  ObjectSearchDialogComponentProps
> = ({ data, onClose, tableName, title, variant = "lg" }) => {
  return (
    <React.Fragment>
      <CustomDialogComponent
        title={title}
        onClose={() => onClose()}
        isOpen={true}
        fullWidth
        variant={variant}
        hideCloseButton
      >
        <ObjectSearchComponent
          data={data}
          onClose={(data: any) => onClose(data)}
          tableName={tableName}
        />
      </CustomDialogComponent>
    </React.Fragment>
  );
};

export default ObjectSearchDialogComponent;
