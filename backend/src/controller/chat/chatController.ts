import { Request, Response } from "express";
import Message from "../../models/messages/message";
import UserModule from "../../models/User/user";

import Doctor from "../../models/Doctor/Doctor";

// Existing getConversations (for Doctors -> fetching Users)
export const getConversations = async (req: Request, res: Response) => {
  try {
    const currentUserId = (req as any).user.id || (req as any).user._id;
    console.log("Fetching conversations for user:", currentUserId);

    // Aggregate to find unique chat partners and the latest message
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [{ fromUserId: currentUserId }, { toUserId: currentUserId }],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$fromUserId", currentUserId] },
              "$toUserId",
              "$fromUserId",
            ],
          },
          lastMessage: { $first: "$text" },
          createdAt: { $first: "$createdAt" },
        },
      },
      { $sort: { createdAt: -1 } },
    ]);
    
    console.log("Aggregated conversations:", conversations);

    // Populate user details for each conversation
    const populatedConversations = await Promise.all(
      conversations.map(async (conversation) => {
        let user = await UserModule.findById(conversation._id).select(
          "firstName lastName email"
        );
        
        // If not found in User, try Doctor (just in case, though this function is for Docs)
        if (!user) {
             // Fallback or specific logic
        }

        return {
          ...conversation,
          user: {
            name: user ? `${user.firstName} ${user.lastName}` : "Unknown User",
            avatar: "", // Add avatar logic if available
          },
        };
      })
    );

    res.status(200).json(populatedConversations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching conversations", error });
  }
};

// New: For Users -> fetching Doctors
export const getUserConversations = async (req: Request, res: Response) => {
  try {
    const currentUserId = (req as any).user.id || (req as any).user._id;

    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [{ fromUserId: currentUserId }, { toUserId: currentUserId }],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$fromUserId", currentUserId] },
              "$toUserId",
              "$fromUserId",
            ],
          },
          lastMessage: { $first: "$text" },
          createdAt: { $first: "$createdAt" },
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    const populatedConversations = await Promise.all(
      conversations.map(async (conversation) => {
        // Here we search Doctor collection
        let doctor = await Doctor.findById(conversation._id).select(
          "firstName lastName email imageUrl" 
        );

        return {
          ...conversation,
          user: {
            name: doctor ? `${doctor.firstName} ${doctor.lastName}` : "Unknown Doctor",
            avatar: (doctor as any)?.imageUrl || "",
          },
        };
      })
    );

    res.status(200).json(populatedConversations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user conversations", error });
  }
};
