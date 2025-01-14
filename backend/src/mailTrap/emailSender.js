import ApiError from "../utilities/ApiError.utils.js"
import { VERIFICATION_EMAIL_TEMPLATE,PASSWORD_RESET_REQUEST_TEMPLATE,PASSWORD_RESET_SUCCESS_TEMPLATE, AUCTION_WINNER_TEMPLATE } from "./emailTemplate.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail=async(email,verificationCode)=>{
    const recipient=[{email}]

    try {
        const response=await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"verify your email",
            html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationCode),
            category:"Email verification"
        })

        console.log("email sent successfully")
    } catch (error) {
        console.log("error sending verification code",error);
        throw new ApiError(400,`ERROR SENDING VERIFICATION EMAIL${error}`)
    }
}

export const sendWelcomeEmail=async(email,name)=>{

  
    const recipient=[{email}];

    try {
        const response=await mailtrapClient.send({
            from:sender,
            to:recipient,
            template_uuid: "1d6d4f4d-da09-4d2a-b407-e50a3bee1b7b",
         template_variables: {
      "name": name
            }

        })

        console.log("welcome email sent successfully")
    } catch (error) {
      console.log("cannot send welcome email",{error})
        
    }
}

export const sendResetPasswordEmail=async(email,resetURL)=>{
    const recipient=[{email}];

    try {
        const response=await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"reset the password",
            html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL),
            category:"reset password"


        })


        console.log("reset password email sent successfully")
    } catch (error) {

        console.log("reset password email cannot be sent")
        throw new ApiError(400,"password cannot be reset")
    }
}

export const sendResetPasswordSuccessfulEmail=async(email)=>{

    const recipient=[{email}]

    try {
        const response= mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"password resetted successfully",

            html:PASSWORD_RESET_SUCCESS_TEMPLATE,
            category:"reset password successful"

        })
        

        console.log("password reset successful")
    } catch (error) {
        console.log("password cannot be reset")
        throw new ApiError(400,"password reset email cannot be sent")
    
}}

export const sendWinnerEmail=async(auction)=>{

    const recipient=auction.highestBidder.email;

    // console.log("sending winning email :",auction)

    try {

        const emailContent=AUCTION_WINNER_TEMPLATE.replace('{winnerName}',auction.highestBidder.username || "goku")
        .replace('{productName}',auction.product.p_name  || "goku")
        .replace('{bidAmount}',auction.highestBid  || "goku")
        .replace('{quantity}',auction.product.p_qty  || "goku")
        .replace('{farmerName}',auction.farmer .username || "goku")
        .replace('{farmerEmail}', auction.farmer.email)
        // .replace('{farmerLocation}', auction.farmer.location || 'Not specified')
        .replace('{supportUrl}', `${process.env.FRONTEND_URL}/support`)
        .replace('{currentYear}', new Date().getFullYear());
        

        const response=await mailtrapClient.send({
            from:sender,
            to:[{email:"prakashmanipandey685@gmail.com"}],
            subject:`Congratulations! You've Won the Auction for `,
            html:AUCTION_WINNER_TEMPLATE,
            category:"auction winning email"

        })

        console.log("winning email sent successfully",response)
    } catch (error) {

        console.log("winning email cannot be sent")
        throw new ApiError(500,"winning email cannot be sent",error)
    
        
    }



}
export const sendCompletionEmail=async(auction)=>{

    const recipient=auction.highestBidder.email;

    // console.log("sending winning email :",auction)

    try {

        const emailContent=AUCTION_COMPLETION_TEMPLATE.replace('{winnerName}',auction.highestBidder.username || "goku")
        .replace('{productName}',auction.product.p_name  || "goku")
        .replace('{bidAmount}',auction.highestBid  || "goku")
        // .replace('{quantity}',auction.product.p_qty  || "goku")
        .replace('{farmerName}',auction.farmer .username || "goku")
        .replace('{winnerEmail}', auction.highestBidder.email)
        // .replace('{farmerLocation}', auction.farmer.location || 'Not specified')
        // .replace('{supportUrl}', `${process.env.FRONTEND_URL}/support`)
        .replace('{currentYear}', new Date().getFullYear());
        

        const response=await mailtrapClient.send({
            from:sender,
            to:[{email:"prakashmanipandey685@gmail.com"}],
            subject:`Congratulations! Auction completed successfully `,
            html:AUCTION_COMPLETION_TEMPLATE,
            category:"auction completion email"

        })

        console.log("completion email sent successfully",response)
    } catch (error) {

        console.log("completion email cannot be sent")
        throw new ApiError(500,"completion email cannot be sent",error)
    
        
    }



}

