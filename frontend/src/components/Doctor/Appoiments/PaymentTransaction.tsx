import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaUser,
  FaMoneyBill,
  FaVideo,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

// Define the type for a transaction
interface Transaction {
  patientName: string;
  consultationType: string;
  paymentStatus: string;
  fee: number;
}

const PaymentTransaction = () => {
  const [paymentTransactions, setPaymentTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/doctor/paymentTranscation",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.message || "Failed to fetch transactions.", {
            duration: 3000,
          });
          return;
        }

        setPaymentTransactions(data);

        if (data.length === 0) {
          toast("No payment transactions found.", {
            icon: "📭",
            duration: 3000,
          });
        } else {
          toast.success("Payment transactions loaded successfully!", {
            duration: 3000,
          });
        }
      } catch (error) {
        console.error("Server error:", error);
        toast.error("Unable to load transactions. Please try again later.", {
          duration: 3000,
        });
      }
    };

    fetchTransactions();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "text-green-700";
      case "pending":
        return "text-yellow-600";
      case "failed":
        return "text-red-700";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-8 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-300 pb-4">
        Payment Transactions
      </h2>

      {paymentTransactions.length === 0 ? (
        <div className="text-center text-gray-500">No transactions available.</div>
      ) : (
        paymentTransactions.map((transaction, idx) => (
          <div
            key={idx}
            className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-all space-y-4 bg-slate-100"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 text-gray-700">
                <FaUser />
                <span className="font-medium">Patient</span>
              </div>
              <span className="font-semibold text-gray-900">{transaction.patientName}</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 text-gray-700">
                <FaVideo />
                <span className="font-medium">Consultation Type</span>
              </div>
              <span className="font-semibold text-gray-900">{transaction.consultationType}</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                {transaction.paymentStatus.toLowerCase() === "paid" ? (
                  <FaCheckCircle className="text-green-700" />
                ) : (
                  <FaTimesCircle className="text-red-700" />
                )}
                <span className="text-gray-700 font-medium">Payment Status</span>
              </div>
              <span className={`font-semibold ${getStatusColor(transaction.paymentStatus)}`}>
                {transaction.paymentStatus}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 text-gray-700">
                <FaMoneyBill />
                <span className="font-medium">Amount</span>
              </div>
              <span className="font-semibold text-gray-900">₹{transaction.fee}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PaymentTransaction;
