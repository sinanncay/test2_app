import  React,{useEffect} from 'react';
import './DataGridComponent.css'
import { DataGrid, GridFilterModel, useGridApiRef } from '@mui/x-data-grid';
import { Grid } from '@mui/joy';
import Chip from '@mui/material/Chip';
import { Button } from '@mui/material';

interface Props {
  DataColumn:[],
  DataRows: [],
  totalDataCount: string,
  onFilterCall?: (title: string, page: number, year: string, type: string) => void
}

function DataGridComponent({DataColumn, DataRows, totalDataCount, onFilterCall}: Props) {
  const apiRef = useGridApiRef();
  const [paginationModel, setPaginationModel] = React.useState({ pageSize: 10, page: 1 });
  const [rowData, setRowData]          = React.useState<any[]>([]);
  const [columns, setColumnsData]      = React.useState<[]>([]);
  const [totalRowCount, setRowCount]   = React.useState(0);
  const [filterTitle, setFilterTitle]  = React.useState("");
  const [filterYear, setFilterYear]    = React.useState("");
  const [filterType, setFilterType]    = React.useState("");
  const [buttonDisabled, setButtonDisabled]    = React.useState(true);
    
    useEffect(() => {
      setColumnsData(DataColumn);
      setRowData(DataRows);
    },[DataColumn]);

    useEffect(() => {
      if(DataRows){
         var tempData = DataRows;
         tempData.map((x: any) => {x.id = x.imdbID});
         setRowData(tempData);
      }else {
        setRowData([]);
      }
         setRowCount(parseInt(totalDataCount));
         apiRef.current.setRowCount(totalRowCount);
    },[DataRows]);

    useEffect(() => {
      if(filterType === "" && filterYear === "" && filterTitle===""){
        setButtonDisabled(true);
      }else {
        setButtonDisabled(false);
      }
    },[filterType, filterYear, filterTitle]);

    
  const onFilterChange = React.useCallback((filterModel: GridFilterModel) => {
    if(filterModel.items.length > 0 ){
      if(filterModel.items[0].field === 'Title' ){
        setFilterTitle(filterModel.items[0].value)
      }else if(filterModel.items[0].field === 'Year' ){
        setFilterYear(filterModel.items[0].value)
      }else if(filterModel.items[0].field === 'Type' ){
        setFilterType(filterModel.items[0].value)
      }
    }
      
  }, []);

  function clearFilters() {
    setFilterTitle("");
    setFilterType("");
    setFilterYear("");
    apiRef.current.setFilterModel({ items: [] });
    if(onFilterCall){
      onFilterCall("",  1, "", "");
    }
  }

  function paginationFun(params:any) {
    setPaginationModel(params);
    if(onFilterCall){
      onFilterCall(filterTitle, params.page + 1, filterYear, filterType);
    }
  }


  return (
    <>
          <Grid container spacing={2}>
            <Grid  xs={12} sm={12} md={6} lg={6} xl={6} >
              <div className='divLeft'><h2>Filters</h2></div>
               <div className='divLeft'>
                 { filterTitle !== "" ? (<Chip label={`Title: ${filterTitle}`} variant="outlined" onDelete={() => {setFilterTitle(""); apiRef.current.setFilterModel({ items: [] }); if(onFilterCall){onFilterCall("",  1, filterType, filterYear)} }} />) : (<></>) }
                 { filterType !== "" ? (<Chip label={`Type: ${filterType}`} variant="outlined" onDelete={() => {setFilterType(""); apiRef.current.setFilterModel({ items: [] }); if(onFilterCall){ onFilterCall(filterTitle,  1, "", filterYear)} }} />) : (<></>) }
                 { filterYear !== "" ? (<Chip label={`Year: ${filterYear}`} variant="outlined" onDelete={() => {setFilterYear(""); apiRef.current.setFilterModel({ items: [] }); if(onFilterCall){onFilterCall(filterTitle,  1, filterType, "")}}} />) : (<></>) }
               </div>
            </Grid>
            <Grid  xs={12} sm={12} md={6} lg={6} xl={6} style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '4.5rem' }}>
                <Grid container spacing={2} >
                  <Grid  xs={12} sm={12} md={12} lg={12} xl={12} >
                     <Button variant="contained" color="primary" disabled={buttonDisabled} onClick={() => onFilterCall ? onFilterCall(filterTitle, 1, filterYear, filterType) : null}>FILTER DATAGRID</Button> <Button variant="contained" color="warning" onClick={() => clearFilters()}>RESET FILTERS</Button>                 
                  </Grid>
                </Grid>
            </Grid>
             <DataGrid
                    apiRef={apiRef}
                    columns={columns}
                    rows={rowData}
                    rowCount={totalRowCount}
                    getRowId={(row: any) => row.imdbID}
                    filterMode="server"
                    paginationMode="server"
                    paginationModel={paginationModel}
                    onFilterModelChange={onFilterChange}
                    onPaginationModelChange={(event) => paginationFun(event)}
                    pageSizeOptions={[10]}
                    loading={false}
         />
          </Grid>
         
</>
        
      
  );
}

export default DataGridComponent;