import ServiceAPI from '../index';

import type { GetAllCitiesResponse } from './CityService.types';

class CityService extends ServiceAPI {
  public static getAllCities() {
    return this.get<GetAllCitiesResponse>('/city');
  }
}

export default CityService;
