const request = require("supertest");

const db = require("../data/dbConfig");
const hobbitModel = require("./hobbitsModel");

afterEach(async () => {
  await db("hobbits").truncate();
});

describe("hobbits model", () => {
  it("should insert provided hobbit", async () => {
    const hobbit = await hobbitModel.insert({ name: "bilbo" });

    let hobbits = await db("hobbits");
    expect(hobbits).toHaveLength(1);
    expect(hobbit.name).toEqual("bilbo");

    await hobbitModel.insert({ name: "sam" });
    hobbits = await db("hobbits");
    expect(hobbits).toHaveLength(2);
  });
});
