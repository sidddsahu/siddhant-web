

const Contact = require("../models/contactModel");
const emailService = require("../utils/emailService");

const contactController = {
  // Submit contact form
  submitContact: async (req, res) => {
    try {
      const { fullName, email, phone, address, message } = req.body;

      // Get client info (safe)
      const ipAddress =
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.socket.remoteAddress ||
        "Unknown";

      const userAgent = req.headers["user-agent"] || "Unknown";

      // Save contact
      const contact = await Contact.create({
        fullName,
        email,
        phone: phone || null,
        address: address || null,
        message,
        ipAddress,
        userAgent
      });

      // Try sending email (NON-BLOCKING)
      try {
        await emailService.sendContactEmail({
          fullName,
          email,
          phone,
          address,
          message,
          ipAddress,
          userAgent
        });
      } catch (emailError) {
        console.error("Email sending failed:", emailError.message);
        // Do NOT throw — DB save already successful
      }

      return res.status(201).json({
        success: true,
        message: "Message sent successfully! We will contact you soon.",
        data: {
          id: contact._id,
          name: contact.fullName,
          email: contact.email,
          submittedAt: contact.createdAt
        }
      });

    } catch (error) {
      console.error("Contact submission error:", error);

      if (error.name === "ValidationError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: Object.values(error.errors).map((err) => err.message)
        });
      }

      return res.status(500).json({
        success: false,
        message: "Failed to submit contact form",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : undefined
      });
    }
  },

  // Test email service
  testEmailService: async (req, res) => {
    try {
      const result = await emailService.testConnection();
      res.json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Email service test failed",
        error: error.message
      });
    }
  },

  // Admin: Get all contacts
  getAllContacts: async (req, res) => {
    try {
      const { page = 1, limit = 10, status, search } = req.query;
      const skip = (page - 1) * limit;

      const query = {};
      if (status) query.status = status;

      if (search) {
        query.$or = [
          { fullName: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { message: { $regex: search, $options: "i" } }
        ];
      }

      const contacts = await Contact.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .select("-__v -userAgent");

      const total = await Contact.countDocuments(query);

      res.json({
        success: true,
        data: contacts,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch contacts"
      });
    }
  },

  // Admin: Mark as read
  markAsRead: async (req, res) => {
    try {
      const contact = await Contact.findByIdAndUpdate(
        req.params.id,
        {
          status: "read",
          readAt: new Date()
        },
        { new: true }
      );

      if (!contact) {
        return res.status(404).json({
          success: false,
          message: "Contact not found"
        });
      }

      res.json({
        success: true,
        message: "Marked as read",
        data: contact
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to update contact"
      });
    }
  }
};

module.exports = contactController;



// const Contact = require("../models/contactModel");
// const emailService = require("../utils/emailService");

// const contactController = {

//   // ================= SUBMIT CONTACT =================
//   submitContact: async (req, res) => {
//     try {
//       const { fullName, email, phone, address, message } = req.body;

//       const ipAddress =
//         req.headers["x-forwarded-for"]?.split(",")[0] ||
//         req.socket.remoteAddress ||
//         "Unknown";

//       const userAgent = req.headers["user-agent"] || "Unknown";

//       const contact = await Contact.create({
//         fullName,
//         email,
//         phone: phone || null,
//         address: address || null,
//         message,
//         ipAddress,
//         userAgent,
//         status: "unread"
//       });

//       // Non-blocking email
//       emailService
//         .sendContactEmail({
//           fullName,
//           email,
//           phone,
//           address,
//           message,
//           ipAddress,
//           userAgent
//         })
//         .catch((err) => {
//           console.error("Email error:", err.message);
//         });

//       return res.status(201).json({
//         success: true,
//         message: "Message sent successfully!",
//         data: {
//           id: contact._id,
//           name: contact.fullName,
//           email: contact.email,
//           submittedAt: contact.createdAt
//         }
//       });

//     } catch (error) {
//       console.error("Submit error:", error);

//       return res.status(500).json({
//         success: false,
//         message: "Failed to submit contact form"
//       });
//     }
//   },

//   // ================= ADMIN GET ALL CONTACTS =================
//   getAllContacts: async (req, res) => {
//     try {
//       const page = Number(req.query.page) || 1;
//       const limit = Number(req.query.limit) || 10;
//       const skip = (page - 1) * limit;
//       const { search, status } = req.query;

//       const query = {};

//       if (status) query.status = status;

//       if (search) {
//         query.$or = [
//           { fullName: { $regex: search, $options: "i" } },
//           { email: { $regex: search, $options: "i" } },
//           { message: { $regex: search, $options: "i" } }
//         ];
//       }

//       const contacts = await Contact.find(query)
//         .sort({ createdAt: -1 })
//         .skip(skip)
//         .limit(limit)
//         .select("-__v");

//       const total = await Contact.countDocuments(query);

//       res.status(200).json({
//         success: true,
//         data: contacts,
//         pagination: {
//           total,
//           page,
//           limit,
//           totalPages: Math.ceil(total / limit)
//         }
//       });

//     } catch (error) {
//       console.error("Admin fetch error:", error);
//       res.status(500).json({
//         success: false,
//         message: "Failed to fetch contacts"
//       });
//     }
//   },

//   // ================= MARK AS READ =================
//   markAsRead: async (req, res) => {
//     try {
//       const contact = await Contact.findByIdAndUpdate(
//         req.params.id,
//         {
//           status: "read",
//           readAt: new Date()
//         },
//         { new: true }
//       );

//       if (!contact) {
//         return res.status(404).json({
//           success: false,
//           message: "Contact not found"
//         });
//       }

//       res.json({
//         success: true,
//         message: "Marked as read",
//         data: contact
//       });

//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: "Failed to update contact"
//       });
//     }
//   },

//   // ================= EMAIL TEST =================
//   testEmailService: async (req, res) => {
//     try {
//       const result = await emailService.testConnection();
//       res.json(result);
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: "Email service test failed"
//       });
//     }
//   }
// };

// module.exports = contactController;
