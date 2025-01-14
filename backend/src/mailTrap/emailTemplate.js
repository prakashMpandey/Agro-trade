export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF60, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">{verificationCode}</span>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>farm mitra</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const AUCTION_WINNER_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Congratulations - Auction Won!</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">🎉 Congratulations!</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Dear {winnerName},</p>
    <p>Great news! You've won the auction for:</p>
    
    <div style="background-color: #ffffff; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <h2 style="color: #4CAF50; margin: 0 0 10px 0;">{productName}</h2>
      <p style="margin: 5px 0;"><strong>Your Winning Bid:</strong> ₹{bidAmount}</p>
      <p style="margin: 5px 0;"><strong>Quantity:</strong> {quantity} kg</p>
    </div>

    <div style="background-color: #ffffff; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <h3 style="color: #4CAF50; margin: 0 0 10px 0;">Farmer Details</h3>
      <p style="margin: 5px 0;"><strong>Name:</strong> {farmerName}</p>
      <p style="margin: 5px 0;"><strong>Contact:</strong> {farmerEmail}</p>
      <p style="margin: 5px 0;"><strong>Location:</strong> {farmerLocation}</p>
    </div>

    <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <h3 style="color: #856404; margin: 0 0 10px 0;">Next Steps</h3>
      <ol style="margin: 0; padding-left: 20px;">
        <li>Contact the farmer within 24 hours</li>
        <li>Arrange for pickup/delivery of the produce</li>
        <li>Complete the payment process</li>
      </ol>
    </div>

    <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
    
    <div style="text-align: center; margin-top: 30px;">
      <a href="{supportUrl}" 
         style="background-color: #4CAF50; 
                color: white; 
                padding: 12px 25px; 
                text-decoration: none; 
                border-radius: 5px; 
                font-weight: bold;">
        Contact Support
      </a>
    </div>

    <p style="margin-top: 30px;">Best regards,<br>Farm Mitra Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message. Please do not reply to this email.</p>
    <p>© {currentYear} Farm Mitra. All rights reserved.</p>
  </div>
</body>
</html>
`;

export const AUCTION_COMPLETION_TEMPLATE=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Congratulations - Your auction completed successfully!</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">🎉 Congratulations!</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Dear {farmerName},</p>
    <p>Great news! Your auction for {productName} completed successfully:</p>

    <div style="background-color: #ffffff; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <h3 style="color: #4CAF50; margin: 0 0 10px 0;">Winner Details</h3>
      <p style="margin: 5px 0;"><strong>Name:</strong> {winnerName}</p>
      <p style="margin: 5px 0;"><strong>Email:</strong> {winnerEmail}</p>
      <p style="margin: 5px 0;"><strong>Contact:</strong> {winnerContact}</p>
      <p style="margin: 5px 0;"><strong>Location:</strong> {winnerLocation}</p>
    </div>

    <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <h3 style="color: #856404; margin: 0 0 10px 0;">Next Steps</h3>
      <ol style="margin: 0; padding-left: 20px;">
        <li>Contact the winner within 24 hours</li>
        <li>Arrange for pickup/delivery of the produce</li>
        <li>Complete the payment process</li>
      </ol>
    </div>

    <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
    
    <div style="text-align: center; margin-top: 30px;">
      <a href="{supportUrl}" 
         style="background-color: #4CAF50; 
                color: white; 
                padding: 12px 25px; 
                text-decoration: none; 
                border-radius: 5px; 
                font-weight: bold;">
        Contact Support
      </a>
    </div>

    <p style="margin-top: 30px;">Best regards,<br>Farm Mitra Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message. Please do not reply to this email.</p>
    <p>© {currentYear} Farm Mitra. All rights reserved.</p>
  </div>
</body>
</html>`