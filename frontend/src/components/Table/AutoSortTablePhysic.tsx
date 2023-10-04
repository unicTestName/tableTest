import React, { ReactElement, useEffect, useState, useRef, useLayoutEffect } from "react";
import { MantineReactTable } from "mantine-react-table";
import styles from "./AutoSortTablePhysic.module.css";

export const DEFAUTL_LIMIT = 4;
export const DEFAUTL_SKIP = 0;

type AutoSortTableProps = {
  columns: any;
  tableRequest: () => Promise<any>;
  data: any;
  constColumnSizes?: Array<number>;
};
interface AutoSortTablePhysicProps extends AutoSortTableProps {
  height: number;
  width: number;
}

const AutoSortPhysic = ({
  height,
  width,
  data,
  tableRequest,
  columns,
  constColumnSizes,
}: AutoSortTablePhysicProps) => {

  const [requestLimitOffset, setrequestLimitOffset] = useState({
    limit: DEFAUTL_LIMIT,
    skip: DEFAUTL_SKIP,
  });

  useEffect(() => {
    handleCall();
  }, []);

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const handleCall = async (skip = DEFAUTL_SKIP, limit = DEFAUTL_LIMIT) => {
    tableRequest();
  };

  useEffect(() => {
    handleCall(requestLimitOffset.skip, requestLimitOffset.limit);
  }, [requestLimitOffset.skip]);



  // !!TODO think a bit more
  const autoFitDynamicColumnsWidth = () => {
    let calcConsColumnsWidth = 0;

    if (constColumnSizes) {
      constColumnSizes?.forEach((el) => {
        calcConsColumnsWidth = calcConsColumnsWidth + el;
      });
    }
    const numOfAutoSizedColumns = constColumnSizes
      ? columns.length - constColumnSizes.length
      : columns.length;

    return width / columns.length;
  };


  // !!TODO Query Lib should handle request states
  // !!TODO table shoud handle err and loading correctly
  
  const isFetching = false;
  const isLoading = false;
  if (!data) return <></>;

  // !!TODO migrate a part of table parameters to global <Table />
  // component parameters and describe  default values (for ex enableTopToolbar parameter)

  return (
    <>
    
      <MantineReactTable
        enableColumnFilters={true}
        enableGlobalFilter={true}
        enableColumnDragging={false}
        enableTopToolbar={true}
        mantineTableBodyRowProps={({ row }) => ({
          sx: {
            cursor: "pointer",
          },
        })}
        mantinePaginationProps={{
          rowsPerPageOptions: ["4"],
        }}
        columns={columns}
        data={data}
        enablePagination={true}
        enableColumnActions={true}
        state={{
          isLoading,
          showAlertBanner: false,
          showProgressBars: isFetching,
          columnSizing: {},
        }}
        defaultColumn={{
          maxSize: 400,
          minSize: 50,
          size: autoFitDynamicColumnsWidth(),
        }}
        layoutMode="grid"
        initialState={{ pagination: { pageIndex: 0, pageSize: 4 } }}
        mantineTableContainerProps={{
          ref: tableContainerRef, //get access to the table container element
          height: `${height}px`,
          sx: { width: `${width}px` }, //give the table a max height
        }}
        enableHiding={false}
        enableFullScreenToggle={false}
        enableBottomToolbar={true}
      />
    </>
  );
};

// !!TODO migrate to fitDimensions HOC helper
export default function AutoSortTable({ ...props }: AutoSortTableProps): ReactElement {
  const ref = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);

  useLayoutEffect(() => {
    if (!ref.current) return;
    setHeight(ref.current.offsetHeight);
    setWidth(ref.current.offsetWidth);
  }, []);

  return (
    <div className={styles.wrap} ref={ref}>
      <AutoSortPhysic height={height} width={width} {...props} />
    </div>
  );
}
