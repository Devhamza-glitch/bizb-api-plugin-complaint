import ReactionError from "@reactioncommerce/reaction-error";

export default {
    Mutation: {
        async sendComplintFrom(_, { name, phoneNumber, orderId, email, transicationDate, buyerOrSeller, complaintCategories, detailDescriptionOfComplaint, additionalComment, }, context, info) {
            const {
                collections: { Shops },
            } = context;
            const shop = await Shops.findOne({ shopType: "primary" });
            if (!shop) throw new ReactionError("not-found", "Shop not found");
            const emailBody = `Name: ${name}\nPhone Number: ${phoneNumber}
            \nOrder Id: ${orderId}
            \nEmail: ${email}
            \nDate of Transication: ${transicationDate}
            \nComplaint Categories: ${complaintCategories}
            \nBuyes / Seller: ${buyerOrSeller}
            \nDetail Decsciption: ${detailDescriptionOfComplaint}
            \Additional Comment: ${additionalComment}`;
            const sendEmailResult = await context.mutations.sendEmail(context, {
                to: shop.emails[0].address,
                data: emailBody,
                subject: "Complient Form Submission",
                fromShop: shop,
            })
            if (sendEmailResult) {
                return true;
            } else {
                throw new ReactionError("Failed", "Failed to send email. Try again later");
            }
        }
    }
}