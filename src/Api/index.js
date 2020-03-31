import axios from 'axios';

const fetchTotalInformation = async () => {
  const response = await axios.get('https://covidapi.ismood.com/total-info?country_name=greece', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ZmFkaWw6aXNjb3Y0NTZA',
    }
  });
  console.log('[user]', { response });
  return response;
};

export { fetchTotalInformation };
