const request = require("supertest");
const chai = require("chai");
const http = require("chai-http");

const { expect } = chai;

const db = require("../app/models");
const transaction = db.transactions;
const app = require("../app");
const { mongoose } = require("../app/models");

chai.use(http);

describe("transaction endpoint", () => {
    let updatedTurtorial = {
        _id: "4665ytuugi86886000",
        meterNumber: "12335",
        currentElectricityToken: "094756",
        ramainingDays: 7,
    };

    let data = [
        {
            _id: "4882200e85yytii999",
            meterNumber: "98456",
            currentElectricityToken: "324566",
            ramainingDays: 6,
        },
        {
            _id: "4882200e85ytteeetii999",
            meterNumber: "85858",
            currentElectricityToken: "817598",
            ramainingDays: 7,
        },
    ];

    let emptyArr = [];

    test("GET /api/transactions --> should return 200 on sucess", async () => {
        jest.spyOn(transaction, "find").mockReturnValue(Promise.resolve(data));
        const res = await chai.request(app).get("/api/transactions");
        expect(res.status).to.equal(200);
        await mongoose.disconnect();
    });

    test("GET /api/transactions --> should return meterNumber at index 0 of the body returned", async () => {
        jest.spyOn(transaction, "find").mockReturnValue(Promise.resolve(data));
        const res = await chai.request(app).get("/api/transactions");
        expect(res.body[0].meterNumber).to.equal("react native");
    });

    test("GET /api/transactions --> should return 404 if there is no empty data", async () => {
        jest.spyOn(transaction, "find").mockReturnValue(Promise.resolve(emptyArr));
        const res = await chai.request(app).get("/api/transactions");
        expect(res.status).to.equal(404);
    });

    it("GET /api/transactions/:id --> should return transaction by id successfully", async () => {
        let transaction = {
            _id: "4665ytuugi86886000",
            meterNumber: "Test native",
            currentElectricityToken: "mobile development",
            ramainingDays: false,
        };
        jest.spyOn(transaction, "findById").mockReturnValue(
            Promise.resolve(transaction)
        );
        const response = await request(app).get("/api/transactions/dSDSAFDSDSDAS");
        expect(response.statusCode).to.equal(200);
        expect(response.body.meterNumber).to.equal("Test native");
    });

    test("PUT /api/transactions/:id -->should return 201 if the turtorial is updated", async () => {
        jest.spyOn(transaction, "findByIdAndUpdate").mockReturnValue(
            Promise.resolve(updatedTurtorial)
        );
        const res = await chai
            .request(app)
            .put("/api/transactions/:4665ytuugi86886000");
        expect(res.body.message).to.equal("transaction was updated successfully.");
    });

    test("PUT /api/transactions/:id --> should return 404 if no data was given", async () => {
        jest.spyOn(transaction, "findByIdAndUpdate").mockReturnValue(
            Promise.resolve(null)
        );
        const res = await chai
            .request(app)
            .put("/api/transactions/:4665ytuugi86886000");
        expect(res.body.message).to.equal("Not Found");
    });

    it("POST /api/transactions --> should create transaction successfully", async () => {
        jest.spyOn(transaction, "create").mockReturnValue(Promise.resolve(true));

        const res = await request(app).post("/api/transactions/").send({
            meterNumber: "Test transaction",
            currentElectricityToken: "Test transaction currentElectricityToken",
            ramainingDays: true,
        });

        expect(res.statusCode).to.equal(201);
    });

    it("POST /api/transactions --> should not create transaction if meterNumber is missing", async () => {
        const res = await request(app).post("/api/transactions/").send({
            meterNumber: "",
            currentElectricityToken: "Test transaction currentElectricityToken",
            ramainingDays: true,
        });
        expect(res.statusCode).to.equal(400);
        expect(res.body.message).to.equal("meterNumber can not be empty!");
    });

    it("DELETE /api/transactions/:id -->should delete one transaction successfully", async () => {
        jest.spyOn(transaction, "findByIdAndRemove").mockReturnValue(
            Promise.resolve(true)
        );

        const res = await request(app).post("/api/transactions/").send({
            meterNumber: "Test transaction",
            currentElectricityToken: "Test transaction currentElectricityToken",
            ramainingDays: true,
        });

        const id = res.body.id;
        const response = await request(app).delete("/api/transactions/" + id);
        expect(response.statusCode).to.equal(200);
        expect(response.body.message).to.equal(
            "transaction was deleted successfully!"
        );
    });

    it("DELETE /api/transactions --> should delete all transactions successfully", async () => {
        jest.spyOn(transaction, "deleteMany").mockReturnValue(
            Promise.resolve(true)
        );
        const response = await request(app).delete("/api/transactions/");
        expect(response.statusCode).to.equal(200);
        expect(response.body.message).to.equal(
            "transactions were deleted successfully!"
        );
    });
});