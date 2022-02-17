module.exports = mongoose => {
    const transaction = mongoose.model(
      "Transactions",
      mongoose.Schema(
        {
          meterNumber: String,
          currentElectricityToken: String,
          DaysRemaining: Number
        },
        { timestamps: true }
      )
    );
    return transaction;
  };