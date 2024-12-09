import { GridColDef, getGridStringOperators } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

export class RatingsModel {
  Source: string;
  Value: string; 
  constructor(Source: string, Value: string){
    this.Source = Source;
    this.Value = Value;
  }
}

export class MovieModel {
    imdbID: string;
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: RatingsModel[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
    
    constructor(imdbID: string, Title: string, Year: string, Rated: string, Released: string, Runtime: string, Genre: string,
                Director: string, Writer: string, Actors: string, Plot: string, Language: string, Country: string, Awards: string, 
                Poster: string, Ratings: RatingsModel[], Metascore: string, imdbRating: string, imdbVotes: string, Type: string, DVD: string,
                BoxOffice: string, Production: string, Website: string, Response: string) {

      this.imdbID = imdbID;
      this.Title = Title;
      this.Year = Year;
      this.Rated = Rated;
      this.Released = Released;
      this.Runtime = Runtime;
      this.Genre = Genre;
      this.Director = Director;
      this.Writer = Writer;
      this.Actors = Actors;
      this.Plot = Plot;
      this.Language = Language;
      this.Country = Country;
      this.Awards = Awards;
      this.Poster = Poster;
      this.Ratings = Ratings;
      this.Metascore = Metascore;
      this.imdbRating = imdbRating;
      this.imdbVotes = imdbVotes;
      this.Type = Type;
      this.DVD = DVD ;
      this.BoxOffice = BoxOffice;
      this.Production = Production;
      this.Website = Website;
      this.Response = Response ;
    }
}

  export function GetColumns()  {
    const stringOperators = getGridStringOperators().filter((op => ['contains'].includes(op.value)));
    var columns: GridColDef[] = [
        { field: 'id',  headerName: 'IMDB ID',  minWidth: 110, sortable: false, filterable: false, },
        {
            field: 'Poster',
            headerName: 'POSTER',
            filterable: false,
            sortable: false,
            minWidth: 130,
            renderCell: (params: any) => {
              return (
                  <img src={params.value} alt="" width={80} height={70} />
              );
            },
        },
        { field: 'Title', headerName: 'TITLE',  minWidth: 350, filterOperators: stringOperators },
        { field: 'Type',  headerName: 'TYPE',   minWidth: 140 },
        { field: 'Year',  headerName: 'RELAESE YEAR', minWidth: 140, filterOperators: stringOperators },
        {
            field: 'imdbID',
            headerName: 'MORE DETAILS',
            minWidth: 130,
            filterable: false,
            sortable: false,
            renderCell: (params: any) => {
              return (
                  <Link to={`/details/${params.value}`}>more details...</Link>
              );
            },
        },
      ];
      return columns;
  }

 