#!/usr/bin/env node

const { api } = require("./api.js");
const axios = require('axios');

let search = "";
for(let i = 2; i < process.argv.length - 1; ++i){
	search += process.argv[i] + " ";
}
search += process.argv[process.argv.length - 1]

let type = "video";
let numResult = 10;
let searchResult;

function videoSearch (key, search, max){
	var url = "https://www.googleapis.com/youtube/v3/search?key=" + key + "&type=video&part=snippet&maxResults=" + max + "&q=" + search
	return axios.get(url)
		.then((response) =>{
			return response.data.items;
		})

}


console.log(search);

videoSearch(api, search, numResult).then(data =>{
	for(let i =0; i < data.length; i++){
		console.log(data[i].id.videoId + " " + data[i].snippet.title);
	}
})
