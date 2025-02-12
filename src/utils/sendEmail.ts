import axios from "axios";

export function sendEmail(body:any){

    let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://privatechauffeurbackend.netlify.app/send-email',
    headers: { 
        'Content-Type': 'application/json'
    },
    data : JSON.stringify(body)
    };

    axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
        return response.data;
    })
    .catch((error) => {
        console.log(error);
        return error;
    });

}