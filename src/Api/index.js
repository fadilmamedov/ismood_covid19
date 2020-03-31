import axios from 'axios';

const fetchTotalInformation = async () => {
  const response = await axios.get('http://covidapi.ismood.com:8000/total-info?country_name=greece', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ZmFkaWw6aXNjb3Y0NTZA',
    }
  });

  return response;
};

export { fetchTotalInformation };
