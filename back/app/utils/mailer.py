"""
Email utility — mirrors the Node.js nodemailer transporter.
Uses aiosmtplib for async sending via Gmail SMTP.
"""

import os
import aiosmtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


EMAIL_USER = os.getenv("EMAIL_USER", "")
EMAIL_PASS = os.getenv("EMAIL_PASS", "")
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "")


async def send_inquiry_mail(inquiry: dict) -> None:
    """
    Fire-and-forget email to ADMIN_EMAIL when a new inquiry is submitted.
    Mirrors the sendInquiryMail function in inquiry.controllers.ts.
    """
    if not all([EMAIL_USER, EMAIL_PASS, ADMIN_EMAIL]):
        print("WARNING: Email env vars not set, skipping mail send.")
        return

    contact = inquiry.get("phone") or inquiry.get("kakao") or "N/A"
    student_name = inquiry.get("studentName", "Unknown")

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"New Inquiry from {student_name}"
    msg["From"] = f"Doum Inquiry <{EMAIL_USER}>"
    msg["To"] = ADMIN_EMAIL

    html_body = f"""
    <h3>New Inquiry</h3>
    <p><strong>Name:</strong> {student_name}</p>
    <p><strong>Contact:</strong> {contact}</p>
    <p><strong>Message:</strong></p>
    <p>{inquiry.get("message", "")}</p>
    """

    msg.attach(MIMEText(html_body, "html"))

    try:
        await aiosmtplib.send(
            msg,
            hostname="smtp.gmail.com",
            port=587,
            start_tls=True,
            username=EMAIL_USER,
            password=EMAIL_PASS,
        )
        print("Inquiry email sent successfully.")
    except Exception as err:
        print(f"Email send failed: {err}")
