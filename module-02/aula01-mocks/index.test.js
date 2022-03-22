import { constants } from "./src/constants.js";
import File from "./src/file.js";
import { rejects, deepStrictEqual } from "assert";

const { error } = constants;

(async () => {
  {
    const filePath = "./mocks/emptyFile-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }

  {
    const filePath = "./mocks/fourItems-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }

  {
    const filePath = "./mocks/threeItems-valid.csv";
    const result = await File.csvToJson(filePath);
    const expected = [
      {
        name: "Cherry Ramatis",
        id: 123,
        profession: "Javascript Developer",
        birthday: 2001,
      },
      {
        name: "Erick Wendel",
        id: 321,
        profession: "Javascript Instructor",
        birthday: 1997,
      },
      {
        name: "Joaozinho",
        id: 231,
        profession: "Java Developer",
        birthday: 1992,
      },
    ];

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();
