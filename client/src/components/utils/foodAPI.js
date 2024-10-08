export const foodSearch = async (query) => {
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-app-id': import.meta.env.VITE_APP_NTX_ID,
      'x-app-key': import.meta.env.VITE_APP_NTX_KEY,
    },
    body: JSON.stringify({
      'query': query
    })
  }

  const response = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', options)
  const data = await response.json()
  const caloriesConsumed = data?.foods[0].nf_calories
  console.log(`You've successfully logged ${caloriesConsumed} calories!`)
  return caloriesConsumed
}