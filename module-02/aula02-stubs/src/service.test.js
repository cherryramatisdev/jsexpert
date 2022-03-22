import Service from "./service.js";
import aldeeran from "../mocks/aldeeran.json" assert { type: "json" };
import tatooine from "../mocks/tatooine.json" assert { type: "json" };
import sinon from "sinon";
import { deepStrictEqual } from "assert";

const BASE_URL_1 = "https://swapi.dev/api/planets/1";
const BASE_URL_2 = "https://swapi.dev/api/planets/2";

const mocks = { aldeeran, tatooine };

(async () => {
  // {
  //   const service = new Service();
  //   const withoutStub = await service.makeRequest(BASE_URL_2);
  //   console.log(JSON.stringify(withoutStub));
  // }

  {
    const service = new Service();
    const stub = sinon.stub(service, service.makeRequest.name);

    stub.withArgs(BASE_URL_1).resolves(mocks.tatooine);
    stub.withArgs(BASE_URL_2).resolves(mocks.aldeeran);

    {
      const expected = {
        name: "Tatooine",
        surfaceWater: "1",
        appearedIn: 5,
      };

      const results = await service.getPlanets(BASE_URL_1);
      deepStrictEqual(results, expected);
    }

    {
      const expected = {
        name: "Alderaan",
        surfaceWater: "40",
        appearedIn: 2,
      };

      const results = await service.getPlanets(BASE_URL_2);
      deepStrictEqual(results, expected);
    }
  }
})();
