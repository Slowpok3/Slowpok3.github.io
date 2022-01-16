import pkg from 'axios';
const { Axios } = pkg;

// async function getCall(){
//     let response = await fetch('http://127.0.0.1:5000/api/get-json');
//     let data = await response.json()
//     console.log("yo")
//     return data;
  
// }

// getCall().then((data) => console.log(data));



pkg.get("https://localhost:5000/Questions", {parameters: {"postTitile" : "bruh"}}).then(response => {
    console.log(response.data);
})