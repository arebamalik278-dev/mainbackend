const transporter = require('../config/email');

const sendEmail = async (options) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${options.to}`);
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
};

// Send order confirmation email to customer
const sendOrderConfirmationEmail = async (user, order) => {
  const itemsList = order.items
    .map(item => `<li>${item.name} - Qty: ${item.quantity} - $${item.price}</li>`)
    .join('');

  const html = `
    <h2>Order Confirmation</h2>
    <p>Dear ${user.name},</p>
    <p>Thank you for your order! Your order has been successfully placed.</p>
    <h3>Order Details:</h3>
    <p><strong>Order ID:</strong> ${order._id}</p>
    <p><strong>Total Amount:</strong> $${order.totalAmount}</p>
    <p><strong>Status:</strong> ${order.status}</p>
    <h4>Items:</h4>
    <ul>${itemsList}</ul>
    <h4>Shipping Address:</h4>
    <p>${order.shippingAddress.street}, ${order.shippingAddress.city}, 
       ${order.shippingAddress.state} ${order.shippingAddress.zipCode}, 
       ${order.shippingAddress.country}</p>
    <p>We will notify you when your order is shipped.</p>
    <p>Thank you for shopping with us!</p>
  `;

  return sendEmail({
    to: user.email,
    subject: `Order Confirmation - #${order._id}`,
    text: html
  });
};

// Send new order notification to admin
const sendAdminOrderNotificationEmail = async (user, order) => {
  const itemsList = order.items
    .map(item => `<li>${item.name} - Qty: ${item.quantity} - $${item.price}</li>`)
    .join('');

  const html = `
    <h2>New Order Received</h2>
    <p>A new order has been placed on your store.</p>
    <h3>Customer Details:</h3>
    <p><strong>Name:</strong> ${user.name}</p>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Phone:</strong> ${user.phone}</p>
    <h3>Order Details:</h3>
    <p><strong>Order ID:</strong> ${order._id}</p>
    <p><strong>Total Amount:</strong> $${order.totalAmount}</p>
    <p><strong>Status:</strong> ${order.status}</p>
    <h4>Items:</h4>
    <ul>${itemsList}</ul>
    <h4>Shipping Address:</h4>
    <p>${order.shippingAddress.street}, ${order.shippingAddress.city}, 
       ${order.shippingAddress.state} ${order.shippingAddress.zipCode}, 
       ${order.shippingAddress.country}</p>
    <p>Please log in to your admin dashboard to process this order.</p>
  `;

  return sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: `New Order Received - #${order._id}`,
    text: html
  });
};

// Send OTP email
const sendOTPEmail = async (email, otp) => {
  const html = `
    <h2>OTP Verification</h2>
    <p>Your OTP for verification is:</p>
    <h1 style="font-size: 48px; letter-spacing: 10px; color: #4CAF50;">${otp}</h1>
    <p>This OTP will expire in 5 minutes.</p>
    <p>If you didn't request this OTP, please ignore this email.</p>
  `;

  return sendEmail({
    to: email,
    subject: 'OTP Verification',
    text: html
  });
};

module.exports = {
  sendEmail,
  sendOrderConfirmationEmail,
  sendAdminOrderNotificationEmail,
  sendOTPEmail
};

