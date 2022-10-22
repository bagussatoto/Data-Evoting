import axios from 'axios'

const baseURL = 'http://localhost:8080'

const createHeaders = () => {
   return {
      'content-type': 'application/json',
			'authorization': localStorage.getItem('$evote-token') || null
   }
}

export default {
    //METHOD GET
	get( extend = '', callback ) {
		axios.get(`${baseURL}/${extend}`, { headers: createHeaders() })
			.then(res => {
				const response = res.data
				//Success response
				if (response.code === 200) callback(response, true)
			})	
			.catch(err => {
				if (err.response) {
				  callback(err.response.data, false)
			    }
			})
	},
	//METHOD POST
	post( extend = '', body, callback ) {
		axios.post(`${baseURL}/${extend}`, body, { headers: createHeaders() })
		  .then(res => {
		  	if (res.data.code === 200) callback(res.data, true)
		  })
		  .catch(err => {
		  	if (err.response) {
			  callback(err.response.data.response, false)
		    }
		  })
	},
	
	//METHOD PUT
	put( extend = '', body, callback ){
	   axios.put(`${baseURL}/${extend}`, body, { headers: createHeaders() })
	      .then(res => {
	         if ( res.data.code === 200 ) callback(true, res.data)
	      })
	      .catch( err => {
	         if ( err.response ) callback(false, err.response.data.response)
	      })
	},
	
	//METHOD DELETE
	delete( extend = '', data, callback ){
	   axios.delete(`${baseURL}/${extend}`, { data, headers: createHeaders() })
	      .then(res => {
	         if ( res.data.code === 200 ) callback(true)
	      })
	      .catch(err => {
	         if ( err.response ) callback(false, `${err.response.data.mesasge} - ${err.response.data.response}`)
	      })
	}
}
