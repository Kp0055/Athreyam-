import { Request, Response } from "express";
import User from "../../models/User/user";
import Transaction from "../../models/User/Transaction";

const getWalletHistory = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id || (req as any).user._id;

    // 1. Fetch User Balance
    const user = await User.findById(userId).select("wallet");
    if (!user) {
         res.status(404).json({ message: "User not found" });
         return;
    }

    // 2. Fetch Transactions
    const transactions = await Transaction.find({ userId: userId }).sort({ date: -1 });

    res.status(200).json({
        balance: user.wallet || 0,
        transactions: transactions
    });

  } catch (error) {
    console.error("Get Wallet Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default getWalletHistory;
