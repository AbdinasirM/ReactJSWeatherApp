from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import json
from json import JSONEncoder

class SimpleJSONEncoder(JSONEncoder):
    def default(self, o):
        try:
            return super().default(o)
        except TypeError:
            return str(o)

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost",
    "http://localhost:5173",  # Add the frontend URL where your React app is hosted
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_KEY = 'd5ffba93b768ebae63009b9d4f7b061b'
OPENWEATHERMAP_URL = 'https://api.openweathermap.org/data/2.5/weather'

class WeatherRequestModel(BaseModel):
    city: str
    state: str
    country: str

@app.post("/getweatherdata")
async def get_weather_data(request_data: WeatherRequestModel):
    city_query = f"{request_data.city},{request_data.state},{request_data.country}"

    params = {
        'q': city_query,
        'appid': API_KEY,
        'units': 'imperial',
    }

    try:
        response = requests.get(OPENWEATHERMAP_URL, params=params)
        response.raise_for_status()
        weather_data = response.json()

        # Use a simple JSON encoder to handle circular references
        weather_data_str = json.dumps(weather_data, cls=SimpleJSONEncoder)
        return json.loads(weather_data_str)
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error fetching weather data: {str(e)}")
