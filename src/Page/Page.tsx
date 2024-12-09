import React, {useEffect} from 'react';
import './page.css'
import DataGridComponent from '../components/DataGridComponent';
import { GetColumns } from '../model/MovieModel';
import { ApiFunction } from '../helpers/ApiFunction';
import { Alert, Snackbar } from '@mui/material';



function Page() {
  const [rowData, setRowData] = React.useState<[]>([]);
  const [columns, setColumnsData] = React.useState<any>([]);
  let [totalDataCount, setTotalDataCount] = React.useState("");
  const [openSnackBar, setSnackBar] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

   useEffect(() => {
     if(columns && columns.length === 0){
         const temp =  GetColumns();
         setColumnsData(temp);
       }
     if(rowData && rowData.length === 0){
        dataCallApi("", 1, "", "");
     }   
   },[]);

   async function dataCallApi(title?: string, page?: number, year?: string, type?: string ) {
    var url = "";
    if(title){ url += `&s=${title}` }else { url = 's=Pokemon'; } // default call pokemon
    if(page){ url += `&page=${page}`}else { url += `&page=1` }
    if(year){ url += `&y=${year}`}
    if(type){ url += `&type=${type}`}

    const response = await ApiFunction(url, {}, "get");
        if(response?.status === 200){
          if(response.data.Response !== 'False'){ // its binded False
             totalDataCount = response.data.totalResults;
             setTotalDataCount(response.data.totalResults)
             setRowData(response.data.Search);
          }else {
            setErrorMessage(response.data.Error);
            setSnackBar(true);
            setRowData([]);
          }
      }
   }

  return (
    <div className='Page'>
      <div className='sizegrid'>
         <DataGridComponent DataColumn={columns} DataRows={rowData} totalDataCount={totalDataCount} onFilterCall={(title: string ,page: number, year: string, type: string) => (dataCallApi(title, page, year, type))}/>
         <Snackbar
            open={openSnackBar}
            autoHideDuration={4000}
            onClose={() => setSnackBar(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
              <Alert
                 onClose={() => setSnackBar(false)}
                 severity="error"
                 variant="filled"
                 sx={{ width: '100%' }}
               >
                {errorMessage}
               </Alert>
          </Snackbar>
      </div>
    </div>
  )
}

export default Page;