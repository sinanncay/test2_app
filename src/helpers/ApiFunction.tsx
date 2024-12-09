import axios from "axios";

const host = "https://www.omdbapi.com/?apikey=d52c62c3&";

export async function ApiFunction(url: string, data: {}, method: 'get' | 'post')  {
        try {
          const headers = {
            "Content-Type": "application/json"
          };
          let response = await axios[method](host + url, data, {headers});
           return response;
        } catch (error) {
          console.error(error);
        }

  }
